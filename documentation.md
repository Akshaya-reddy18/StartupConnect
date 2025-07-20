# StartupConnect Documentation

## Table of Contents
1. [Overview](#overview)
2. [Core Features](#core-features)
3. [Tech Stack](#tech-stack)
4. [Folder Structure](#folder-structure)
5. [Setup & Installation](#setup--installation)
6. [Usage](#usage)
7. [Environment Variables](#environment-variables)
8. [Supabase Integration](#supabase-integration)
9. [Database Schema](#database-schema)
10. [Contribution Guidelines](#contribution-guidelines)
11. [License](#license)
12. [Contact & Support](#contact--support)

---

## Overview
StartupConnect is a web platform that connects students with startups for real-world opportunities. It features AI-powered skill matching, personalized dashboards, and easy gig management. The platform is designed to help students gain practical experience and startups find top talent efficiently.

---

## Core Features
- **AI-Powered Matching:** Advanced algorithms analyze skills, interests, and project requirements to find perfect matches between students and startups.
- **Student Profiles:** Comprehensive profiles with skills, projects, availability, and career aspirations for better matching.
- **Startup Opportunities:** Browse and post internships and gigs from innovative startups across all industries.
- **Real-time Chat:** Integrated messaging system for seamless communication between students and startups.
- **Progress Tracking:** Monitor application status, project milestones, and career growth with detailed analytics.
- **Verified Opportunities:** All startups and opportunities are vetted to ensure quality and legitimacy.
- **Smart Notifications:** Personalized alerts for new opportunities, application updates, and skill matches.
- **Global Reach:** Connect with opportunities worldwide.
- **Secure Platform:** Enterprise-grade security for data and communications.
- **Analytics Dashboard:** Track success with detailed insights and performance metrics.

---

## Tech Stack
- **Frontend:** React, TypeScript, Vite, Tailwind CSS, shadcn/ui, Radix UI
- **State/Data:** React Query
- **Backend/DB:** Supabase (PostgreSQL, Auth, Realtime, Storage)
- **Icons:** Lucide React
- **Other:** ESLint, PostCSS

---

## Folder Structure
```
StartupConnect/
├── public/                # Static assets
├── src/
│   ├── assets/            # Images and media
│   ├── components/        # Reusable UI components
│   │   ├── dashboard/     # Dashboard components
│   │   ├── gigs/          # Gig-related components
│   │   ├── profile/       # Profile components
│   │   └── ui/            # UI primitives (shadcn/ui)
│   ├── hooks/             # Custom React hooks
│   ├── integrations/
│   │   └── supabase/      # Supabase client and types
│   ├── lib/               # Utility functions
│   ├── pages/             # Route-based pages
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # App entry point
│   └── index.css          # Global styles
├── supabase/              # Supabase config and migrations
├── test-data.sql          # Sample data for testing
├── package.json           # Project metadata and scripts
├── README.md              # Quick start guide
└── documentation.md       # (This file)
```

---

## Setup & Installation
### Prerequisites
- Node.js (v18 or higher)
- npm (comes with Node.js)

### Installation Steps
1. **Clone the repository:**
   ```sh
   git clone <YOUR_GIT_URL>
   cd StartupConnect
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Configure Supabase:**
   - Create a project at [Supabase](https://supabase.com/).
   - Copy your Supabase URL and Anon Key.
   - Update `src/integrations/supabase/client.ts` with your credentials.
4. **Set up the database:**
   - Run the SQL in `supabase/migrations/` to set up tables and types.
   - (Optional) Use `test-data.sql` to seed sample data.

---

## Usage
- **Start development server:**
  ```sh
  npm run dev
  ```
  The app will be available at [http://localhost:8080](http://localhost:8080) (or another port if 8080 is in use).

- **Build for production:**
  ```sh
  npm run build
  ```

- **Preview production build:**
  ```sh
  npm run preview
  ```

---

## Environment Variables
Create a `.env` file in the project root (if not present) and add:
```
VITE_SUPABASE_URL=<your-supabase-url>
VITE_SUPABASE_ANON_KEY=<your-supabase-anon-key>
```
These are used in `src/integrations/supabase/client.ts`.

---

## Supabase Integration
- **Auth:** Handles user authentication (students & startups).
- **Database:** Stores profiles, gigs, skills, applications, messages, etc.
- **Realtime:** Enables live chat and instant updates.
- **Storage:** (Optional) For user avatars, resumes, etc.

See `supabase/migrations/` for schema and `src/integrations/supabase/` for client code.

---

## Database Schema (Key Tables)
- **profiles:** User profiles (student/startup, bio, skills, etc.)
- **skills:** List of skills
- **user_skills:** Junction table for user skills
- **gigs:** Startup opportunities
- **gig_skills:** Required skills for gigs
- **applications:** Student applications to gigs
- **match_scores:** AI-calculated match scores
- **messages:** Chat messages between users

See `supabase/migrations/` for full schema.

---

## Contribution Guidelines
1. Fork the repository and create a new branch for your feature or bugfix.
2. Write clear, concise commit messages.
3. Ensure code passes linting (`npm run lint`).
4. Test your changes locally before submitting a PR.
5. Open a pull request with a detailed description of your changes.

---

## License
Specify your license here (e.g., MIT, Apache 2.0, etc.).

---

## Contact & Support
- For issues, open a GitHub issue in this repository.
- For questions or support, contact the maintainer or use the platform's support channels. 