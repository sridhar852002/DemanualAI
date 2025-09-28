# Demanual Calendar

A Google Calendar-like event management application built with React, Next.js, and Firebase Authentication.

## Features

- 🔐 **Firebase Authentication** - Email/Password and Google Sign-In
- 📅 **Calendar View** - Google Calendar-like interface with month navigation
- ➕ **Event Management** - Create, edit, and delete events
- 🎨 **Color-coded Events** - Customize event colors
- 💾 **Local Storage** - Events persist in browser storage
- 📱 **Responsive Design** - Works on desktop and mobile devices

## Tech Stack

- **Frontend**: React 18, Next.js 14, TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth
- **Date Handling**: date-fns
- **Icons**: Lucide React
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase project

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd demanual-calendar
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase:
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication with Email/Password and Google Sign-In
   - Get your Firebase configuration

4. Configure environment variables:
   - Copy `.env.local.example` to `.env.local`
   - Add your Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Sign Up/Login**: Create an account or sign in with Google
2. **Navigate Calendar**: Use arrow buttons to navigate between months
3. **Create Events**: Click on any date to create a new event
4. **Edit Events**: Click on existing events to edit or delete them
5. **View Events**: See all upcoming events in the sidebar

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

Make sure to add all Firebase configuration variables in your Vercel project settings.

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── auth/              # Authentication pages
│   ├── calendar/          # Calendar page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── auth/              # Authentication components
│   ├── calendar/          # Calendar components
│   └── ProtectedRoute.tsx # Route protection
├── contexts/              # React contexts
│   ├── AuthContext.tsx    # Authentication context
│   └── EventContext.tsx   # Event management context
├── lib/                   # Utility libraries
│   └── firebase.ts        # Firebase configuration
└── types/                 # TypeScript type definitions
    └── event.ts           # Event types
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.