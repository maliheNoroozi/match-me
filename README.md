# Match-Me Dating App

Match-Me is a modern dating platform built with Next.js 15, offering real-time messaging and a comprehensive user experience. This application allows users to connect, match, and communicate with potential partners in a seamless environment.

## 🚀 Features

- **User Authentication**: Secure sign-in and sign-up functionality using NextAuth.js
- **User Profiles**: Create and edit detailed profiles with photos and personal information
- **Member Discovery**: Browse through potential matches with customizable filters
- **Matching System**: Like profiles and get notified when there's a mutual match
- **Real-Time Messaging**: Instant chat functionality powered by Pusher
- **Message Management**: Organized inbox and outbox for tracking conversations
- **Image Uploads**: Seamless image uploading and management via Cloudinary
- **Responsive Design**: Beautiful UI built with Tailwind CSS and NextUI components

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: PostgreSQL via [Neon.tech](https://neon.tech/) (serverless PostgreSQL)
- **ORM**: [Prisma](https://www.prisma.io/) for database access and management
- **Authentication**: [NextAuth.js](https://next-auth.js.org/) for secure user authentication
- **Real-time Communication**: [Pusher](https://pusher.com/) for instant messaging
- **Media Management**: [Cloudinary](https://cloudinary.com/) for image uploads and optimization
- **UI Components**: [NextUI](https://nextui.org/) for modern UI components
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- **Form Management**: [React Hook Form](https://react-hook-form.com/) for efficient form handling
- **Validation**: [Zod](https://zod.dev/) for type-safe schema validation


## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js 18.x or later
- npm or yarn
- A Neon.tech account for PostgreSQL database
- A Pusher account for real-time functionality
- Git

## ⚙️ Environment Setup

Create a `.env.local` file in the root directory with the following variables:

DATABASE_URL="postgresql://[user]:[password]@[neon-hostname]/[db-name]"\
NEXTAUTH_SECRET="your-nextauth-secret"

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloudinary-name"\
NEXT_PUBLIC_CLOUDINARY_API_KEY="your-cloudinary-api-key"\
CLOUDINARY_API_SECRET="your-cloudinary-api-secret"\
CLOUDINARY_URL="your-cloudinary-url"\
UPLOAD_PRESET_NAME="your-upload-preset" # For unsigned uploads

PUSHER_APP_ID = "your-pusher-key"\
NEXT_PUBLIC_PUSHER_APP_KEY = "your-pusher-api-key"\
PUSHER_APP_SECRET = "your-pusher-secret"\
NEXT_PUBLIC_PUSHER_APP_CLUSTER = "your-pusher-cluster"

## 🚀 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/match-me.git
   cd match-me
   npm install
   npx prisma migrate dev
   npm run dev


Open http://localhost:3000 in your browser.

