🎬 CineScope — Movie Discovery Web App

CineScope is a modern, responsive React web application that lets users search, explore, and filter trending movies in an elegant cinematic interface.
It’s built with React, TailwindCSS, and React Router to ensure smooth navigation and vibrant visuals.

🚀 Features

✅ Real-time Movie Search — Instantly filters through movies as you type
✅ Responsive UI — Works flawlessly on desktop, tablet, and mobile
✅ Linear Gradient Themes — Uses vivid color transitions (bg-linear-to-r, bg-linear-to-b)
✅ Dynamic Movie Cards — Displays 8 random movies on the homepage
✅ Dedicated Pages — Includes Home, About, Movies, and Contact
✅ React Router Navigation — Seamless routing between pages
✅ Filter Button (All Movies Page) — Allows filtering movies by genre or rating
✅ Clean, Minimal, and Cinematic Design

🛠️ Tech Stack
Technology	Purpose
React.js (Vite)	Frontend framework
TailwindCSS	Styling and responsiveness
React Router DOM	Client-side routing
Movies JSON File	Data source for movie details
JavaScript (ES6+)	Core logic and interactivity
📁 Folder Structure
cinescope/
├── public/
│   └── movies.json          # Movie data
├── src/
│   ├── components/
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   ├── Home.jsx
│   │   ├── MovieCards.jsx
│   │   ├── NavBar.jsx
│   │   └── AllMoviesPage.jsx
│   ├── movies.js            # Exports movies array
│   ├── App.jsx              # Main layout
│   ├── index.css            # Tailwind base styles
│   ├── main.jsx             # Entry point with React Router setup
│   └── assets/              # Images, icons, etc.
├── package.json
├── tailwind.config.js
└── README.md

⚙️ Installation & Setup

Step 1: Clone the repository

git clone https://github.com/sulemangulzar/react-movies-website
cd cinescope


Step 2: Install dependencies

npm install


Step 3: Run the development server

npm run dev


Step 4: Open in browser

http://localhost:5173

