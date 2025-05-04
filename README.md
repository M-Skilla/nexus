# Nexus - Joint Examination Management System

Nexus is a web application designed to streamline the management of joint examinations for schools. It allows educational institutions to collaboratively enter student marks for shared exams and provides comprehensive analytics and reporting features.

## Features

- **Joint Examination Management:** Create and manage joint examinations involving multiple schools.
- **Mark Entry:** Intuitive interface for schools to enter student marks for each subject in a joint exam.
- **Analytics & Reporting:** Generate detailed reports and analytics based on:
  - Individual student performance.
  - Overall joint examination results.
  - Performance per subject across participating schools.
- **School Management:** Manage participating schools within the system.
- **User Authentication:** Secure login for school administrators and staff.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Backend & Database:** [Supabase](https://supabase.io/)
- **UI Components:** [Shadcn UI](https://ui.shadcn.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Package Manager:** [pnpm](https://pnpm.io/)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (Version >= 18.x recommended)
- [pnpm](https://pnpm.io/installation)
- [Supabase Account](https://supabase.com/) & Project Setup

### Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd nexus
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file in the root directory and add your Supabase project URL and anon key:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
   # Add any other required environment variables
   ```

   You can find these in your Supabase project settings.

4. **Set up Supabase database:**

   - Ensure you have the necessary tables and RLS policies set up in your Supabase project. You might need to run SQL migration scripts if provided (check for a `supabase/migrations` directory or setup instructions).

5. **Run the development server:**

   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure (Overview)

```
.
├── app/                  # Next.js App Router: Pages, Layouts, API Routes
│   ├── (auth)/           # Authentication related pages (Login, Register)
│   ├── (main)/           # Main application layout and pages after login
│   ├── api/              # API routes (if any)
│   └── ...
├── components/           # Shared UI components
│   ├── ui/               # Shadcn UI components
│   └── ...
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions, types, data fetching logic
├── public/               # Static assets
├── supabase/             # Supabase client, middleware, types, migrations (if any)
├── styles/               # Global styles
├── next.config.js        # Next.js configuration
├── tsconfig.json         # TypeScript configuration
├── package.json          # Project dependencies and scripts
└── README.md             # This file
```

## Contributing

Contributions are welcome! Please follow standard fork & pull request workflows. Ensure your code adheres to the project's linting rules (`pnpm lint`).

## License

[Specify License Here - e.g., MIT]
