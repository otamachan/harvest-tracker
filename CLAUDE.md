# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Japanese vegetable harvest tracking web application built with React 18 + TypeScript. The app allows users to record daily vegetable harvests (cucumbers 🥒, eggplants 🍆, peppers 🫑) and view yearly statistics. Data is stored in AWS DynamoDB via Amplify Gen 2 and the app is deployed on AWS Amplify.

## Common Development Commands

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm start

# Run tests
npm test

# Production build
npm run build

# Serve production build locally
npx serve -s build

# Start Amplify sandbox (local DynamoDB)
npm run amplify:sandbox

# Deploy to AWS Amplify
npm run amplify:deploy
```

## Architecture

### Core Components
- **App.tsx**: Main application with tab navigation (stats/input/list/login)
- **HarvestForm**: Form for recording harvests with date, vegetable type, and count
- **HarvestList**: Displays all harvest records with delete functionality
- **YearlyStats**: Shows yearly harvest statistics grouped by vegetable type
- **LoginForm**: Authentication interface

### Key Hooks
- **useAmplifyData**: Data management using AWS Amplify GraphQL API and DynamoDB
- **useAuth**: Mock authentication system with hardcoded credentials
- **useDynamicOGP**: Updates page meta tags based on harvest data

### Data Flow
- All harvest data (`HarvestRecord[]`) is managed via AWS Amplify and DynamoDB
- Data persists automatically via Amplify GraphQL API
- Components communicate through props and callbacks
- Authentication state controls form visibility
- Real-time data synchronization with cloud database

### Types
- `HarvestRecord`: Core data structure with id, date, vegetable type, and count
- `VegetableType`: Union type for supported vegetables ('きゅうり' | 'なす' | 'ピーマン')
- `YearlyStats`: Aggregated harvest data by year and vegetable type

### Styling
- Uses inline CSS throughout the application
- No external CSS framework dependencies
- Responsive design with max-width container

## Amplify Gen 2 Backend

### Backend Configuration
- **amplify/backend.ts**: Main backend configuration
- **amplify/data/resource.ts**: DynamoDB schema and GraphQL API definition
- **src/amplify_outputs.json**: Generated configuration (will be replaced during deployment)

### Local Development
Use `npm run amplify:sandbox` to start a local development environment with:
- Local DynamoDB instance
- GraphQL API endpoint
- Real-time subscriptions

### Deployment
The app deploys to AWS Amplify using:
1. **amplify.yml**: Build configuration for static hosting
2. **Amplify Gen 2**: Automatic backend deployment with DynamoDB and AppSync API
3. Use `npm run amplify:deploy` for production deployment