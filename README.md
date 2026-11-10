# StudioSpace

### Creative Workspace & Studio Booking Platform

**Live Website:** [StudioSpace](https://studiospace-frontend-azure.vercel.app/)

StudioSpace is a modern creative workspace marketplace designed to connect creators with professional studios and creative spaces. Users can discover workspaces, explore detailed studio information, and book spaces that match their creative needs. Studio owners can also showcase their spaces and manage their listings through a personalized platform.

---

## Overview

StudioSpace provides a centralized platform for discovering, listing, and booking creative workspaces. It focuses on delivering a smooth experience for both creators looking for suitable spaces and hosts who want to make their studios available.

The application features a responsive interface, secure authentication, dynamic studio exploration, personalized listing management, and an integrated booking experience.

## Core Features

- **Studio Discovery:** Explore a collection of creative workspaces across multiple categories.
- **Category-Based Exploration:** Browse Photo Studios, Film Stages, Podcast Rooms, Music Suites, and Art Workshops.
- **Studio Details:** View studio descriptions, images, amenities, hourly rates, security deposits, capacity, and location.
- **User Authentication:** Register and sign in using email/password or Google authentication.
- **Studio Listing:** Authenticated users can publish their own creative spaces with detailed information.
- **Listing Management:** View, update, and delete personal studio listings.
- **Workspace Booking:** Select preferred booking dates and time slots to reserve a studio.
- **Booking Management:** View booking history, monitor booking statuses, and cancel eligible bookings.
- **Protected Operations:** JWT-based authentication for selected sensitive operations.
- **Responsive Interface:** Optimized layouts for desktop, tablet, and mobile devices.
- **Interactive Feedback:** Toast notifications, loading indicators, confirmation dialogs, and meaningful empty states.

## Technology Stack

| Category | Technologies |
|---|---|
| Framework | Next.js |
| UI Library | React |
| Programming Language | TypeScript |
| Styling | Tailwind CSS |
| Component Library | HeroUI, DaisyUI |
| Authentication | Better Auth |
| API Communication | Fetch API |
| Token Verification | JWT |
| Icons | React Icons |
| Carousel | Swiper.js |
| Notifications | React Toastify |
| Deployment | Vercel |

## Application Architecture

The frontend follows the Next.js App Router architecture, with a modular component structure that separates application routes, reusable UI components, authentication utilities, and shared TypeScript definitions.

### Project Structure

```text
studiospace-client/
│
├── public/
│   ├── images/
│   ├── icons/
│   └── ...
│
├── src/
│   │
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/
│   │   │       └── [...all]/
│   │   │           └── route.ts
│   │   │
│   │   ├── add-new-studio/
│   │   │   └── page.tsx
│   │   │
│   │   ├── explore-studios/
│   │   │   ├── page.tsx
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx
│   │   │   └── edit/
│   │   │       └── [id]/
│   │   │           └── page.tsx
│   │   │
│   │   ├── my-listings/
│   │   │   └── page.tsx
│   │   │
│   │   ├── my-bookings/
│   │   │   └── page.tsx
│   │   │
│   │   ├── signin/
│   │   │   └── page.tsx
│   │   │
│   │   ├── signup/
│   │   │   └── page.tsx
│   │   │
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── not-found.tsx
│   │
│   ├── components/
│   │   ├── navbar/
│   │   ├── footer/
│   │   ├── home/
│   │   ├── exploreStudios/
│   │   ├── addNewStudio/
│   │   ├── myListings/
│   │   ├── myBookings/
│   │   └── ...
│   │
│   ├── lib/
│   │   ├── auth.ts
│   │   ├── auth-client.ts
│   │   └── ...
│   │
│   └── Type/
│       └── ...
│
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

### Directory Responsibilities

| Directory / File | Description |
|---|---|
| `src/app/` | Application pages and route definitions. |
| `src/app/api/auth/` | Authentication API route handler. |
| `src/components/` | Reusable interface components organized by feature. |
| `src/lib/` | Authentication configuration and shared utilities. |
| `src/Type/` | Shared TypeScript interfaces and type definitions. |
| `public/` | Static images, icons, and other assets. |
| `layout.tsx` | Root application layout and shared structure. |
| `page.tsx` | Main homepage. |
| `not-found.tsx` | Custom not-found page. |
| `next.config.ts` | Next.js application configuration. |

## Application Routes

| Route | Purpose | Access |
|---|---|---|
| `/` | Homepage and featured studios | Public |
| `/explore-studios` | Explore available studios | Public |
| `/explore-studios/[id]` | View individual studio details | Public |
| `/explore-studios/edit/[id]` | Update studio information | Authenticated |
| `/add-new-studio` | Publish a new studio listing | Authenticated |
| `/my-listings` | Manage personal studio listings | Authenticated |
| `/my-bookings` | Manage personal bookings | Authenticated |
| `/signin` | User sign-in | Public |
| `/signup` | User registration | Public |

## Application Workflow

### 1. Authentication Workflow

StudioSpace uses Better Auth to manage user authentication and sessions.

1. Users create an account or sign in using supported authentication methods.
2. Better Auth validates credentials and establishes an authenticated session.
3. When a protected operation is requested, the frontend retrieves a JWT.
4. The token is included in the request's Authorization header.
5. The server verifies the token using the authentication provider's public keys.
6. Successfully verified requests proceed to the corresponding operation.

```text
User
  |
  v
Sign In / Registration
  |
  v
Better Auth
  |
  v
Authenticated Session
  |
  v
JWT Generation
  |
  v
Protected API Request
  |
  v
Token Verification
  |
  v
Authorized Operation
```

### 2. Studio Discovery Workflow

1. Users navigate to the Explore Studios page.
2. The application retrieves available studio information.
3. Studio data is displayed through reusable studio cards.
4. Users can explore different studio categories.
5. Selecting a studio opens its dedicated details page.

### 3. Studio Listing Workflow

1. An authenticated user opens the Add New Studio page.
2. The user provides studio details, pricing, location, images, and amenities.
3. The application validates the submitted information.
4. The request is sent with the required authentication token.
5. The studio information is stored successfully.
6. A notification confirms the operation.

### 4. Listing Management Workflow

1. Users access their personal listings.
2. Existing studio information can be viewed and edited.
3. The edit interface loads the selected studio's current information.
4. Updated information is submitted and saved.
5. Users can remove a listing after confirming the deletion.

### 5. Booking Workflow

1. Users open a studio details page.
2. They select a preferred booking date and time.
3. The application validates the booking information.
4. An authenticated booking request is submitted.
5. The server verifies the request and checks for an existing pending booking.
6. Successful bookings are saved.
7. Users receive feedback about the booking result.

### 6. Booking Management Workflow

1. Users navigate to My Bookings.
2. Their booking information is displayed.
3. Booking statuses are presented for easy tracking.
4. Eligible bookings can be cancelled through the application.

## User Interface & Experience

StudioSpace is designed with an emphasis on clarity, consistency, and accessibility.

- Responsive layouts across different screen sizes.
- Consistent typography, spacing, and visual hierarchy.
- Reusable components for maintainable UI development.
- Clear navigation and intuitive user interactions.
- Meaningful feedback for successful and unsuccessful operations.
- Custom loading, empty, and error states.

## Installation & Local Development

### Prerequisites

- Node.js
- npm
- Git

### 1. Clone the Repository

```bash
git clone <repository-url>
```

### 2. Navigate to the Project Directory

```bash
cd studiospace-client
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

### 5. Production Build

To generate an optimized production build:

```bash
npm run build
```

To run the production build locally:

```bash
npm run start
```

## Future Enhancements

- Comprehensive user reviews and ratings.
- Advanced studio search and filtering.
- Integrated online payment functionality.
- Booking invoice generation.
- Wishlist and saved studios.
- Enhanced availability and scheduling management.

---

## Project Summary

| Attribute | Details |
|---|---|
| Project Name | StudioSpace |
| Project Type | Creative Workspace Marketplace |
| Application | Frontend Web Application |
| Framework | Next.js |
| Language | TypeScript |
| Authentication | Better Auth |
| Styling | Tailwind CSS |
| Deployment | Vercel |

---

<p align="center">
  **StudioSpace — Find Your Space. Create Your Vision.**
</p>