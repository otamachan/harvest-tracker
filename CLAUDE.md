# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Japanese vegetable harvest tracking web application built with React 18 + TypeScript. The app allows users to record daily vegetable harvests (cucumbers 🥒, eggplants 🍆, peppers 🫑) and view yearly statistics. Data is stored in localStorage and the app is deployed on AWS Amplify.

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
```

## Architecture

### Core Components
- **App.tsx**: Main application with tab navigation (stats/input/list/login)
- **HarvestForm**: Form for recording harvests with date, vegetable type, and count
- **HarvestList**: Displays all harvest records with delete functionality
- **YearlyStats**: Shows yearly harvest statistics grouped by vegetable type
- **LoginForm**: Authentication interface

### Key Hooks
- **useLocalStorage**: Persistent state management using browser localStorage
- **useAuth**: Mock authentication system with hardcoded credentials
- **useDynamicOGP**: Updates page meta tags based on harvest data

### Data Flow
- All harvest data (`HarvestRecord[]`) is managed in App.tsx state
- Data persists automatically via `useLocalStorage` hook
- Components communicate through props and callbacks
- Authentication state controls form visibility

### Types
- `HarvestRecord`: Core data structure with id, date, vegetable type, and count
- `VegetableType`: Union type for supported vegetables ('きゅうり' | 'なす' | 'ピーマン')
- `YearlyStats`: Aggregated harvest data by year and vegetable type

### Styling
- Uses inline CSS throughout the application
- No external CSS framework dependencies
- Responsive design with max-width container

## Deployment

The app deploys to AWS Amplify using the `amplify.yml` configuration. The build process uses `npm ci` for dependencies and `npm run build` for production artifacts.