# MemeHub - Social Meme Platform

[![React](https://img.shields.io/badge/React-18.3.1-61dafb)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.1-38b2ac)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router-6.22.3-CA4245)](https://reactrouter.com/)
[![Lucide React](https://img.shields.io/badge/Lucide_React-0.344.0-lightblue)](https://lucide.dev/)

MemeHub is a modern, feature-rich social platform for creating, sharing, and discovering memes. This frontend-only project showcases advanced React patterns, state management, and responsive design principles using localStorage for data persistence.

![MemeHub Screenshot](https://placehold.co/800x450/purple/white?text=MemeHub+Screenshot)

## 🚀 Features

- **User Authentication** - Client-side user registration and login simulation
- **Meme Creation** - Interactive meme creation with text overlay and image upload
- **Social Features** - Comments, upvotes, sharing, and bookmarking
- **Feed Management** - Trending, newest, and categorized meme feeds
- **Profiles & Stats** - User profiles with statistics and achievement badges
- **Dark Mode** - Full light/dark theme support throughout the application
- **Responsive Design** - Optimized for mobile, tablet, and desktop devices
- **Local Storage** - Client-side data persistence for a seamless experience

## 🔧 Tech Stack

- **Frontend Framework**: React 18 with Hooks
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: React Router v6 for declarative routing
- **Styling**: TailwindCSS for utility-first styling
- **State Management**: Context API with custom hooks pattern
- **UI Components**: Custom components with Lucide React icons
- **Data Persistence**: 100% localStorage for a backend-free experience
- **Icons & UI**: Lucide React for consistent iconography

## 📂 Project Structure

```
MemeHub/
├── public/                          # Static assets
├── src/                             # Source code
│   ├── components/                  # Reusable UI components
│   │   ├── Auth/                    # Authentication-related components
│   │   │   ├── AuthForms.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── Dashboard/               # Dashboard components
│   │   │   ├── MemePerformance.jsx
│   │   │   └── StatsCard.jsx
│   │   ├── Layout/                  # Layout components (header, footer, etc.)
│   │   │   ├── Footer.jsx
│   │   │   ├── Layout.jsx
│   │   │   └── Navbar.jsx
│   │   └── Meme/                    # Meme-specific components
│   │       ├── CommentSection.jsx
│   │       ├── MemeCard.jsx
│   │       └── MemeCreator.jsx
│   ├── context/                     # React Context for state management
│   │   ├── MemeContext.jsx          # Meme data & operations
│   │   └── UserContext.jsx          # User authentication & preferences
│   ├── data/                        # Mock data for development
│   ├── pages/                       # Page components for routing
│   │   ├── AuthPage.jsx
│   │   ├── BookmarksPage.jsx
│   │   ├── CreateMemePage.jsx
│   │   ├── CreatePage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── Leaderboard.jsx
│   │   ├── MemeDetailsPage.jsx
│   │   ├── NotFoundPage.jsx
│   │   └── ProfilePage.jsx
│   ├── App.jsx                      # Main application component
│   ├── index.css                    # Global styles
│   └── main.jsx                     # Application entry point
├── index.html                       # HTML entry
├── package.json                     # Project metadata and dependencies
├── package-lock.json                # Dependency lock file
├── tailwind.config.js               # TailwindCSS configuration
├── postcss.config.js                # PostCSS configuration
└── README.md                        # Project overview and instructions
```

## 💡 Implementation Highlights

### Context-Based State Management

The app employs a clean and maintainable state management approach using React Context API and custom hooks:

- **UserContext** - Handles authentication, user data, preferences, and bookmarks
- **MemeContext** - Manages meme creation, retrieval, and interactions

This pattern allows for:
1. Reduced prop drilling across components
2. Centralized data management
3. Easy state access throughout the component tree

```jsx
// Example of custom hook usage
const { currentUser, isAuthenticated } = useUser();
const { memes, createMeme, upvoteMeme } = useMeme();
```

### LocalStorage for Data Persistence

MemeHub uses localStorage to simulate a backend experience without requiring any server:

```jsx
// Example from MemeContext.jsx
const saveMemes = (updatedMemes) => {
  try {
    localStorage.setItem(MEME_STORAGE_KEY, JSON.stringify(updatedMemes));
    setMemes(updatedMemes);
  } catch (error) {
    console.error('Error saving memes:', error);
  }
};
```

### Responsive Design

MemeHub implements a mobile-first design approach using TailwindCSS:

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {memes.map((meme) => (
    <MemeCard key={meme.id} meme={meme} />
  ))}
</div>
```

## 🚀 Getting Started
### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/memehub.git
   cd memehub
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Available Scripts

The project includes several npm scripts to help your development workflow:

- **`npm run dev`**: Starts the development server with hot-reloading
- **`npm run build`**: Builds the app for production to the `dist` folder
- **`npm run preview`**: Previews the production build locally
- **`npm run lint`**: Runs ESLint to check for code issues

### Key Packages

- **React 18.3.1**: Modern UI library for building user interfaces
- **React Router 6.22.3**: Declarative routing for React applications
- **Vite 5.4.2**: Next generation frontend tooling for faster development
- **TailwindCSS 3.4.1**: Utility-first CSS framework
- **Lucide React 0.344.0**: Beautiful & consistent icon set

## 📝 Code Quality Principles

- **Separation of Concerns**: Clear responsibilities for each component/module
- **DRY (Don't Repeat Yourself)**: Shared utility functions and common components
- **Component Reusability**: Flexible props API for all components
- **Performance**: Optimized rendering with proper state management
- **Maintainability**: Consistent code style and documentation

## 🧪 Future Enhancements

- **PWA Support**: Add Progressive Web App capabilities
- **Advanced Animations**: Enhance user experience with subtle animations
- **Accessibility**: Improve screen reader support and keyboard navigation
- **Image Optimizations**: Implement lazy loading and responsive images
- **Expanded Meme Features**: Add templates and more text customization options
- **Enhanced Social Features**: Implement follow/unfollow functionality

## 🙏 Acknowledgments

- React team for the amazing library
- TailwindCSS for the utility-first CSS framework
- Lucide for the beautiful icon set
- All contributors to the open-source libraries used in this project 