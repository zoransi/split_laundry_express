# Split Laundry Express

Split Laundry Express is an integrated digital ecosystem for a laundry service business based in Split, Croatia, primarily serving tourists, local residents, and businesses.

## Project Overview

This project consists of two main components:
1. **Web Application** - React/TypeScript frontend with Express backend
2. **Mobile Application** - Flutter-based cross-platform application

The system enables users to easily order laundry services, track orders in real-time, manage subscriptions, and supports multiple languages (Croatian, English, German, Italian).

## Key Features

- User registration and account management (B2C and B2B)
- Service catalog with detailed descriptions and pricing
- Order placement and tracking
- Subscription service management
- Payment processing and invoicing
- Loyalty programs and referrals
- Multi-language support
- Admin dashboard for order and user management
- Delivery staff interface for route optimization and order status updates

## Technology Stack

### Web Application
- **Frontend**: React.js with TypeScript, TailwindCSS
- **Backend**: Node.js/Express
- **Database**: PostgreSQL
- **Authentication**: JWT, OAuth
- **Payment Processing**: Stripe
- **Cloud Infrastructure**: AWS
- **Containerization**: Docker

### Mobile Application
- **Framework**: Flutter (Dart)
- **State Management**: Riverpod
- **Navigation**: Auto Route
- **Storage**: Shared Preferences, Hive
- **API Integration**: Dio
- **Push Notifications**: Firebase Cloud Messaging

## Project Structure

```
split_laundry_express/
├── backend/               # Express.js backend
│   ├── config/            # Configuration files
│   ├── controllers/       # Request handlers
│   ├── middleware/        # Express middleware
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── services/          # Business logic
│   └── utils/             # Utility functions
│
├── frontend/              # React.js frontend
│   ├── public/            # Static files
│   └── src/               # Source files
│       ├── assets/        # Images, fonts, etc.
│       ├── components/    # Reusable components
│       ├── contexts/      # React contexts
│       ├── hooks/         # Custom hooks
│       ├── layouts/       # Page layouts
│       ├── locales/       # Translation files
│       ├── pages/         # Page components
│       ├── services/      # API services
│       ├── styles/        # Global styles
│       ├── types/         # TypeScript types
│       └── utils/         # Utility functions
│
├── mobile/                # Flutter mobile application
│   ├── android/           # Android specific files
│   ├── ios/               # iOS specific files
│   └── lib/               # Dart source files
│       ├── config/        # App configuration
│       ├── core/          # Core utilities
│       ├── data/          # Data layer
│       ├── domain/        # Domain layer
│       ├── l10n/          # Localization
│       ├── presentation/  # UI layer
│       └── services/      # Service layer
│
└── docs/                  # Documentation
```

## Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn
- Flutter (latest stable)
- Docker and Docker Compose
- PostgreSQL

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start development server
npm run dev
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Mobile Setup
```bash
# Navigate to mobile directory
cd mobile

# Get dependencies
flutter pub get

# Run the app in development mode
flutter run
```

### Docker Setup (Full Stack)
```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down
```

## Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd frontend
npm test
```

### Mobile Testing
```bash
cd mobile
flutter test
```

## Deployment

Detailed deployment instructions can be found in the [deployment documentation](./docs/DEPLOYMENT.md).

## Contributing

Please read the [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- ROADMAP.md for the comprehensive project specifications
- All contributors and stakeholders involved in the project 