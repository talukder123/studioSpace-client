# StudioSpace — Creative Workspace Marketplace

<p align="center">
  **Find Your Space. Create Your Vision.**
</p>

<p align="center">
  A peer-to-peer creative workspace marketplace built with Next.js, TypeScript, and Tailwind CSS.
</p>

<p align="center">
  <a href="https://studiospace-frontend-azure.vercel.app/">Live Website</a>
</p>

---

## 1. Project Overview

StudioSpace is a peer-to-peer creative workspace and studio-sharing marketplace that connects creative professionals with workspace owners.

The platform allows users to explore different types of creative spaces, view detailed studio information, and book suitable workspaces according to their requirements.

Studio owners can also register, authenticate, list their own studios, and manage their listings through a personalized dashboard.

The main goal of StudioSpace is to make finding and sharing creative workspaces easier through a centralized and user-friendly platform.

## 2. Live Application

**Frontend:** https://studiospace-frontend-azure.vercel.app/

**Backend API:** https://studiospace-backend-tawny.vercel.app/

**Frontend Hosting:** Vercel

**Backend Hosting:** Vercel

**Database:** MongoDB Atlas

## 3. Key Features

### Authentication & User Management
- User registration and login.
- Google authentication.
- Session management using Better Auth.
- JWT-based authentication for protected API operations.
- Personalized user profile and navigation.

### Studio Discovery
- Browse all available creative studios.
- Explore studios by category.
- View featured studios on the homepage.
- View studio ratings, hourly pricing, and location.
- Access detailed studio information.

### Studio Management
- Add new studio listings.
- Update existing studio information.
- View personal studio listings.
- Delete studio listings with confirmation.
- Manage studio amenities and workspace information.

### Booking Management
- Book a studio by selecting a date and time.
- Prevent duplicate pending bookings for a studio.
- View personal booking history.
- Check booking status.
- Cancel eligible bookings.

### User Experience
- Fully responsive interface.
- Interactive navigation and dropdown menus.
- Toast notifications for user feedback.
- Custom confirmation dialogs.
- Loading and empty states.
- Custom not-found page.

## 4. Technologies Used

| Category | Technologies |
|---|---|
| Framework | Next.js (App Router) |
| UI Library | React |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Components | HeroUI / DaisyUI (where used) |
| Authentication | Better Auth |
| API Communication | Fetch API |
| API Security | JWT, JOSE |
| Database | MongoDB |
| Icons | React Icons |
| Slider | Swiper.js |
| Notifications | React Toastify |
| Deployment | Vercel |

## 5. Project Folder Structure

The frontend follows the Next.js App Router architecture.

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
├── .env.local
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

### Folder & File Responsibilities

| Folder / File | Responsibility |
|---|---|
| `src/app/` | Application routes and pages |
| `src/app/api/auth/` | Better Auth API handler |
| `src/components/` | Reusable UI components |
| `src/lib/` | Authentication configuration and shared utilities |
| `src/Type/` | TypeScript interfaces and type definitions |
| `public/` | Static assets and images |
| `layout.tsx` | Root layout and shared application structure |
| `page.tsx` | Homepage |
| `not-found.tsx` | Custom 404 page |
| `next.config.ts` | Next.js configuration |

## 6. Application Routes

| Route | Description | Access |
|---|---|---|
| `/` | Homepage with featured studios and categories | Public |
| `/explore-studios` | Browse all studios | Public |
| `/explore-studios/[id]` | Individual studio details and booking | Public |
| `/explore-studios/edit/[id]` | Edit studio information | Authenticated |
| `/add-new-studio` | Add a new studio listing | Authenticated |
| `/my-listings` | Manage personal studio listings | Authenticated |
| `/my-bookings` | View personal bookings | Authenticated |
| `/signin` | User login | Public |
| `/signup` | User registration | Public |

## 7. Application Working Flow

### 7.1 Authentication Flow

StudioSpace uses Better Auth for user authentication and session management.

The authentication process works as follows:

1. A user registers or signs in using email/password or Google authentication.
2. Better Auth validates the user's credentials.
3. The authentication session is maintained by Better Auth.
4. When a protected operation is required, the frontend requests a JWT using `authClient.token()`.
5. The frontend sends the JWT to the backend through the Authorization header.
6. The backend verifies the token using the Better Auth JWKS endpoint.
7. If verification succeeds, the protected API operation proceeds.

**JWT Request Header:**

```http
Authorization: Bearer <JWT_TOKEN>
```

**Authentication Flow:**

```text
User
  |
  v
Sign In / Sign Up
  |
  v
Better Auth
  |
  v
Authenticated Session
  |
  v
Frontend Requests JWT
  |
  v
JWT Sent to Backend
  |
  v
Backend JWT Verification
  |
  v
Protected API Access
```

### 7.2 Studio Exploration Flow

1. The user visits the Explore Studios page.
2. The frontend requests studio information from the backend.
3. The backend retrieves studio documents from MongoDB.
4. Studio information is returned as JSON.
5. The frontend displays the studios using reusable Studio Card components.
6. The user can open an individual studio to view its details.

```text
Explore Studios Page
        |
        v
GET /studios
        |
        v
Express Backend
        |
        v
MongoDB Studios Collection
        |
        v
JSON Response
        |
        v
Studio Cards
        |
        v
Studio Details Page
```

### 7.3 Add Studio Flow

1. An authenticated user opens the Add New Studio page.
2. The user fills in the studio information.
3. The frontend validates the submitted form.
4. The frontend requests a JWT from Better Auth.
5. The studio information and JWT are sent to the backend.
6. The backend verifies the JWT.
7. The studio information is inserted into MongoDB.
8. A success or error notification is displayed.

**API:** `POST /add-new-studio`

### 7.4 Update Studio Flow

1. The user opens their studio listing.
2. The user selects the Edit option.
3. The existing studio information is loaded.
4. The user updates the required fields.
5. The frontend sends the updated information to the backend.
6. The backend updates the corresponding MongoDB document.
7. The updated information is displayed.

**API:** `PATCH /update-studio-info/:id`

### 7.5 Delete Studio Flow

1. The user selects the Delete option from a studio listing.
2. A confirmation dialog appears.
3. After confirmation, the frontend requests a JWT.
4. The frontend sends a DELETE request with the JWT.
5. The backend verifies the JWT.
6. The corresponding studio document is deleted from MongoDB.
7. The frontend refreshes the listing and displays a notification.

**API:** `DELETE /delete-studio/:id`

### 7.6 Studio Booking Flow

1. A user opens a studio details page.
2. The user selects a preferred booking date.
3. The user chooses the starting and ending time.
4. The frontend validates the booking information.
5. The frontend requests a JWT from Better Auth.
6. The booking information and JWT are sent to the backend.
7. The backend verifies the JWT and checks for an existing pending booking.
8. If the booking is accepted, a new booking document is inserted into MongoDB.
9. The user receives a success notification.

**API:** `POST /book-studio/:id`

### 7.7 My Bookings Flow

1. The authenticated user opens My Bookings.
2. The frontend requests the user's booking information.
3. The backend retrieves the matching booking documents.
4. The frontend displays booking details and their current statuses.
5. Eligible bookings can be cancelled.

**Related APIs:**
- `GET /my-bookings?email=:email`
- `PATCH /cancel-booking/:id`

## 8. Backend Integration

The frontend communicates with the StudioSpace Express.js backend through REST APIs.

The backend handles:
- HTTP requests and responses.
- MongoDB database operations.
- Studio and booking data management.
- JWT verification for selected protected operations.
- Duplicate booking checks.

The frontend uses the Fetch API to communicate with the backend.

The backend base URL is configured through an environment variable.

```env
NEXT_PUBLIC_API_URL=https://studiospace-backend-tawny.vercel.app
```

## 9. Environment Variables

Create a `.env.local` file in the project root.

```env
NEXT_PUBLIC_API_URL=your_backend_api_url

BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_better_auth_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

**Important:**
- Replace placeholder values with your actual credentials.
- Configure production environment variables in Vercel.
- Never expose secret credentials in client-side code.
- Do not commit `.env.local` to GitHub.

## 10. Installation & Local Setup

Follow these steps to run StudioSpace locally.

### Prerequisites

- Node.js
- npm
- Git
- MongoDB Atlas account
- Google OAuth credentials (if using Google Sign-In)

### Step 1: Clone the Repository

```bash
git clone <your-frontend-repository-url>
```

### Step 2: Navigate to the Project

```bash
cd studiospace-client
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Configure Environment Variables

Create `.env.local` and configure the required environment variables.

### Step 5: Start the Development Server

```bash
npm run dev
```

Open the following URL:

```text
http://localhost:3000
```

**Note:** The backend server must also be configured and running for API-dependent features to work locally.

## 11. Production Build

To create an optimized production build:

```bash
npm run build
```

To run the production build locally:

```bash
npm run start
```

## 12. Deployment

The StudioSpace frontend is deployed using Vercel.

Production URL:

https://studiospace-frontend-azure.vercel.app/

The production environment uses the deployed Express backend API and configured Better Auth credentials.

## 13. Future Improvements

- User reviews and a complete rating system.
- Advanced studio search and filtering.
- Online payment integration.
- Booking invoice generation.
- Wishlist functionality.
- Improved availability and scheduling management.

---

## 14. Project Information

**Project Name:** StudioSpace

**Project Type:** Full-Stack Web Application

**Frontend Framework:** Next.js

**Backend:** Express.js

**Database:** MongoDB

**Authentication:** Better Auth + JWT

**Deployment:** Vercel

**Live Application:** https://studiospace-frontend-azure.vercel.app/

---

**StudioSpace — Find Your Space. Create Your Vision.**