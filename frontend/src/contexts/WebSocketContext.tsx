import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

interface WebSocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  connectionError: string | null;
  reconnectAttempt: number;
  isReconnecting: boolean;
  reconnectSuccess: boolean;
  connectionQuality: 'good' | 'fair' | 'poor' | 'disconnected';
  retrySuggestion: string | null;
  connectionHistory: ConnectionHistoryPoint[];
  networkDiagnostics: NetworkDiagnostics;
  reconnect: () => void;
}

interface ConnectionHistoryPoint {
  timestamp: number;
  latency: number;
  quality: 'good' | 'fair' | 'poor' | 'disconnected';
}

interface NetworkDiagnostics {
  averageLatency: number;
  packetLoss: number;
  jitter: number;
  lastUpdate: number;
}

const RECONNECT_TIMEOUT = 10000; // 10 seconds timeout
const MAX_RECONNECT_ATTEMPTS = 5;
const PING_INTERVAL = 5000; // 5 seconds
const PING_TIMEOUT = 2000; // 2 seconds
const HISTORY_LENGTH = 20; // Keep last 20 measurements

const WebSocketContext = createContext<WebSocketContextType>({
  socket: null,
  isConnected: false,
  connectionError: null,
  reconnectAttempt: 0,
  isReconnecting: false,
  reconnectSuccess: false,
  connectionQuality: 'disconnected',
  retrySuggestion: null,
  connectionHistory: [],
  networkDiagnostics: {
    averageLatency: 0,
    packetLoss: 0,
    jitter: 0,
    lastUpdate: 0
  },
  reconnect: () => {},
});

export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [reconnectAttempt, setReconnectAttempt] = useState(0);
  const [isReconnecting, setIsReconnecting] = useState(false);
  const [reconnectSuccess, setReconnectSuccess] = useState(false);
  const [reconnectTimeout, setReconnectTimeout] = useState<NodeJS.Timeout | null>(null);
  const [connectionQuality, setConnectionQuality] = useState<'good' | 'fair' | 'poor' | 'disconnected'>('disconnected');
  const [retrySuggestion, setRetrySuggestion] = useState<string | null>(null);
  const [connectionHistory, setConnectionHistory] = useState<ConnectionHistoryPoint[]>([]);
  const [networkDiagnostics, setNetworkDiagnostics] = useState<NetworkDiagnostics>({
    averageLatency: 0,
    packetLoss: 0,
    jitter: 0,
    lastUpdate: 0
  });

  const createSocket = useCallback(() => {
    return io(process.env.REACT_APP_API_URL || 'http://localhost:5000', {
      transports: ['websocket'],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: MAX_RECONNECT_ATTEMPTS,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: RECONNECT_TIMEOUT,
    });
  }, []);

  const getDetailedErrorMessage = useCallback((error: Error | string) => {
    if (typeof error === 'string') return error;
    
    // Handle specific error types
    if (error.message.includes('xhr poll error')) {
      return 'Network error: Unable to reach the server. Please check your internet connection.';
    }
    if (error.message.includes('timeout')) {
      return 'Connection timeout: The server is taking too long to respond. Please try again.';
    }
    if (error.message.includes('transport error')) {
      return 'Connection error: Unable to establish a secure connection. Please try again.';
    }
    
    return `Connection error: ${error.message}`;
  }, []);

  const getRetrySuggestion = useCallback((error: Error | string): string => {
    if (typeof error === 'string') return '';
    
    if (error.message.includes('xhr poll error')) {
      return 'Try checking your internet connection and firewall settings.';
    }
    if (error.message.includes('timeout')) {
      return 'The server might be busy. Try again in a few moments.';
    }
    if (error.message.includes('transport error')) {
      return 'Try using a different network or disabling VPN if active.';
    }
    if (error.message.includes('not authorized')) {
      return 'Please refresh the page to re-authenticate.';
    }
    
    return 'Try refreshing the page or checking your network connection.';
  }, []);

  const calculateNetworkDiagnostics = useCallback((history: ConnectionHistoryPoint[]) => {
    if (history.length < 2) return;

    const latencies = history.map(point => point.latency);
    const averageLatency = latencies.reduce((a, b) => a + b, 0) / latencies.length;
    
    // Calculate jitter (standard deviation of latency)
    const jitter = Math.sqrt(
      latencies.reduce((acc, latency) => acc + Math.pow(latency - averageLatency, 2), 0) / latencies.length
    );

    // Calculate packet loss (percentage of timeouts)
    const packetLoss = (history.filter(point => point.latency > PING_TIMEOUT).length / history.length) * 100;

    setNetworkDiagnostics({
      averageLatency,
      packetLoss,
      jitter,
      lastUpdate: Date.now()
    });
  }, []);

  const updateConnectionQuality = useCallback((latency: number) => {
    const timestamp = Date.now();
    let quality: 'good' | 'fair' | 'poor' | 'disconnected' = 'disconnected';

    if (latency < 100) {
      quality = 'good';
    } else if (latency < 300) {
      quality = 'fair';
    } else {
      quality = 'poor';
    }

    setConnectionHistory(prev => {
      const newHistory = [
        ...prev,
        { timestamp, latency, quality }
      ].slice(-HISTORY_LENGTH);
      
      calculateNetworkDiagnostics(newHistory);
      return newHistory;
    });

    setConnectionQuality(quality);
  }, [calculateNetworkDiagnostics]);

  const setupSocketListeners = useCallback((socketInstance: Socket) => {
    socketInstance.on('connect', () => {
      console.log('Connected to WebSocket server');
      setIsConnected(true);
      setConnectionError(null);
      setReconnectAttempt(0);
      setIsReconnecting(false);
      setReconnectSuccess(true);
      setConnectionQuality('good');
      setRetrySuggestion(null);
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
        setReconnectTimeout(null);
      }
      // Reset success message after 3 seconds
      setTimeout(() => setReconnectSuccess(false), 3000);

      // Start ping interval
      const pingInterval = setInterval(() => {
        const start = Date.now();
        socketInstance.emit('ping', () => {
          const latency = Date.now() - start;
          updateConnectionQuality(latency);
        });
      }, PING_INTERVAL);

      return () => clearInterval(pingInterval);
    });

    socketInstance.on('disconnect', (reason) => {
      console.log('Disconnected from WebSocket server:', reason);
      setIsConnected(false);
      setConnectionQuality('disconnected');
      let errorMessage = 'Disconnected from server';
      
      // Add more context to the disconnect reason
      switch (reason) {
        case 'io server disconnect':
          errorMessage = 'Server closed the connection';
          setRetrySuggestion('The server closed the connection. Please try again in a few moments.');
          break;
        case 'io client disconnect':
          errorMessage = 'Client disconnected';
          setRetrySuggestion('You were disconnected. Please refresh the page to reconnect.');
          break;
        case 'ping timeout':
          errorMessage = 'Connection timed out';
          setRetrySuggestion('The connection timed out. Please check your network stability.');
          break;
        case 'transport close':
          errorMessage = 'Connection closed';
          setRetrySuggestion('The connection was closed. Please refresh the page to reconnect.');
          break;
        case 'transport error':
          errorMessage = 'Connection error';
          setRetrySuggestion('There was a connection error. Please check your network connection.');
          break;
        default:
          errorMessage = `Disconnected: ${reason}`;
          setRetrySuggestion('Please refresh the page to reconnect.');
      }
      
      setConnectionError(errorMessage);
      setIsReconnecting(false);
      setReconnectSuccess(false);
    });

    socketInstance.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
      const errorMessage = getDetailedErrorMessage(error);
      setConnectionError(errorMessage);
      setRetrySuggestion(getRetrySuggestion(error));
      setReconnectAttempt(prev => prev + 1);
      setIsReconnecting(false);
      setReconnectSuccess(false);
      setConnectionQuality('disconnected');
    });

    socketInstance.on('reconnect_attempt', (attemptNumber) => {
      console.log(`Attempting to reconnect (${attemptNumber})...`);
      setReconnectAttempt(attemptNumber);
      
      // Set timeout for this attempt
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }
      const timeout = setTimeout(() => {
        if (!isConnected) {
          setConnectionError(`Connection attempt ${attemptNumber} timed out after ${RECONNECT_TIMEOUT/1000} seconds`);
          setRetrySuggestion('The connection attempt timed out. Please check your network connection and try again.');
          setIsReconnecting(false);
        }
      }, RECONNECT_TIMEOUT);
      setReconnectTimeout(timeout);
    });

    socketInstance.on('reconnect_failed', () => {
      console.error('Failed to reconnect to WebSocket server');
      setConnectionError(`Failed to reconnect after ${MAX_RECONNECT_ATTEMPTS} attempts. Please check your connection and try again.`);
      setRetrySuggestion('Multiple reconnection attempts failed. Please check your network connection and refresh the page.');
      setIsReconnecting(false);
      setReconnectSuccess(false);
      setConnectionQuality('disconnected');
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
        setReconnectTimeout(null);
      }
    });
  }, [getDetailedErrorMessage, getRetrySuggestion, isConnected, reconnectTimeout, updateConnectionQuality]);

  const reconnect = useCallback(() => {
    if (socket) {
      socket.disconnect();
    }
    setIsReconnecting(true);
    setReconnectSuccess(false);
    setReconnectAttempt(0);
    setRetrySuggestion(null);
    const newSocket = createSocket();
    setupSocketListeners(newSocket);
    setSocket(newSocket);
    setConnectionError('Attempting to reconnect...');
  }, [socket, createSocket, setupSocketListeners]);

  useEffect(() => {
    const socketInstance = createSocket();
    setupSocketListeners(socketInstance);
    setSocket(socketInstance);

    return () => {
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }
      socketInstance.disconnect();
    };
  }, [createSocket, setupSocketListeners, reconnectTimeout]);

  return (
    <WebSocketContext.Provider value={{ 
      socket, 
      isConnected, 
      connectionError, 
      reconnectAttempt, 
      isReconnecting, 
      reconnectSuccess, 
      connectionQuality,
      retrySuggestion,
      connectionHistory,
      networkDiagnostics,
      reconnect 
    }}>
      {children}
    </WebSocketContext.Provider>
  );
}; 