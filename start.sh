#!/bin/bash

# Kill any process using port 5001
echo "Killing any process using port 5001..."
lsof -ti:5001 | xargs kill -9 2>/dev/null || true

# Kill any process using port 3000
echo "Killing any process using port 3000..."
lsof -ti:3000 | xargs kill -9 2>/dev/null || true

# Start backend server
echo "Starting backend server..."
cd backend
npm install
npm run dev &
BACKEND_PID=$!

# Wait for backend to start
sleep 5

# Start frontend server
echo "Starting frontend server..."
cd ../frontend
npm install
npm run build
serve -s build &
FRONTEND_PID=$!

# Function to handle script termination
cleanup() {
    echo "Shutting down servers..."
    kill $BACKEND_PID 2>/dev/null || true
    kill $FRONTEND_PID 2>/dev/null || true
    exit 0
}

# Set up trap for cleanup on script termination
trap cleanup SIGINT SIGTERM

# Keep script running
echo "Servers are running!"
echo "Frontend: http://localhost:3000"
echo "Backend: http://localhost:5001"
echo "Press Ctrl+C to stop servers"
wait 