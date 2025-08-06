# Overview

TopZoneID is a gaming credit top-up platform built for Indonesian gamers. It provides a fast and secure way to purchase in-game currency for popular mobile games like Mobile Legends, Free Fire, and PUBG Mobile. The application features a modern React frontend with a Node.js/Express backend, designed for both desktop and mobile users with responsive design principles.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: Wouter for lightweight client-side routing
- **UI Framework**: Radix UI primitives with shadcn/ui components for accessible, customizable interface
- **Styling**: Tailwind CSS with CSS variables for theming and responsive design
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Form Handling**: React Hook Form with Zod validation for type-safe form management

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules for modern JavaScript features
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Schema Validation**: Zod for runtime type validation and data parsing
- **API Design**: RESTful API endpoints with proper HTTP status codes and error handling
- **Development Server**: Custom Vite integration for hot module replacement in development

## Data Storage
- **Database**: PostgreSQL as the primary database (configured via Drizzle config)
- **ORM**: Drizzle ORM with PostgreSQL dialect for database operations
- **Migrations**: Drizzle Kit for database schema migrations
- **Development Storage**: In-memory storage implementation for development/testing

## Database Schema Design
- **Games**: Core game catalog with slugs, descriptions, and popularity flags
- **Packages**: In-game currency packages with pricing and popularity indicators
- **Orders**: Complete order lifecycle tracking with status management
- **Testimonials**: Customer feedback system with ratings
- **FAQs**: Content management for frequently asked questions

## Authentication & Security
- Session-based authentication (evidenced by connect-pg-simple for PostgreSQL session storage)
- CORS and security headers configuration
- Input validation and sanitization through Zod schemas
- Environment-based configuration for secure credential management

## UI/UX Architecture
- **Design System**: Consistent component library based on Radix UI primitives
- **Theming**: CSS custom properties for light/dark mode support
- **Typography**: Poppins font family for modern, clean appearance
- **Responsive Design**: Mobile-first approach with Tailwind's responsive utilities
- **Accessibility**: Radix UI components provide built-in accessibility features

## Development Workflow
- **Hot Reload**: Vite development server with HMR for instant feedback
- **Type Safety**: Full TypeScript coverage across frontend, backend, and shared schemas
- **Code Organization**: Shared schema definitions between frontend and backend
- **Build Process**: Separate build steps for client (Vite) and server (esbuild)

# External Dependencies

## Database Infrastructure
- **Neon Database**: Serverless PostgreSQL database (@neondatabase/serverless)
- **Connection Pooling**: Built-in connection management for serverless environments

## UI Component Libraries
- **Radix UI**: Complete set of unstyled, accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Lucide React**: Modern icon library for consistent iconography
- **Embla Carousel**: Touch-friendly carousel component for mobile optimization

## Development Tools
- **Replit Integration**: Specialized plugins for Replit development environment
- **ESBuild**: Fast JavaScript bundler for production server builds
- **PostCSS**: CSS processing with Tailwind CSS integration

## Form & Validation
- **React Hook Form**: Performant form library with minimal re-renders
- **Hookform Resolvers**: Integration layer for Zod validation schemas

## Utility Libraries
- **date-fns**: Lightweight date manipulation library
- **clsx & class-variance-authority**: Conditional CSS class management
- **nanoid**: Secure URL-friendly unique ID generator

## Payment Integration
- Payment method configuration for Indonesian market (QRIS, DANA, OVO, Bank Transfer)
- WhatsApp integration for customer support and order notifications

## Third-party Services
- **WhatsApp Business API**: Customer communication and support
- **Social Media Integration**: Links to Facebook, Twitter, Instagram, YouTube for marketing