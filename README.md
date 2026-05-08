# 🛹 SkateKarnataka Platform

An industrial-grade web platform designed for the Karnataka skating community. The platform serves as a central hub for students, teachers, and administrators, offering features like question banks, leaderboards, circulars, and comprehensive profile management.

## 🌟 Key Features

- **Multi-Role Access Control**: Dedicated portals for Students and Teachers with tailored dashboards.
- **Interactive Question Bank & Tests**: Robust examination system with strict category logic and performance tracking ("Need-To-Improve" feature).
- **Dynamic Leaderboards**: Real-time ranking system for standalone and purchased tests.
- **Circulars Management**: Integrated announcement system with media/image upload capabilities.
- **Secure Authentication**: Robust login system with OTP verification and secure account deletion workflows (KRSA ID integration).
- **Premium User Interface**: Fluid animations and micro-interactions powered by GSAP and Framer Motion, with full light/dark theme support.
- **Responsive Design**: Mobile-first architecture built with Tailwind CSS, ensuring a seamless experience across all devices.

## 🛠️ Technology Stack

- **Frontend Framework**: [React 19](https://react.dev/) + [Vite 8](https://vitejs.dev/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [GSAP](https://gsap.com/) & [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Utility & UI**: `lodash`, `react-countup`, `react-spinners`, `react-intersection-observer`

## 📦 Prerequisites

Before running the project locally, ensure you have the following installed:
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (v9.0.0 or higher)

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SkateKarnataka
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

## 📁 Project Structure

```text
SkateKarnataka/
├── public/               # Static assets
├── src/
│   ├── assets/           # Images, fonts, and global styles
│   ├── components/       # Reusable UI components (e.g., Navbar, Cards)
│   ├── pages/            # Page-level components (Login, Profile, Leaderboard)
│   ├── store/            # State management (e.g., circulars-store)
│   ├── utils/            # Helper functions and API services
│   ├── App.jsx           # Main application routing and entry point
│   └── main.jsx          # React DOM rendering
├── package.json          # Project dependencies and scripts
├── vite.config.js        # Vite configuration
└── tailwind.config.js    # Tailwind CSS configuration
```

## 📜 Available Scripts

- `npm run dev`: Starts the local development server with Hot Module Replacement (HMR).
- `npm run build`: Compiles and bundles the application for production.
- `npm run lint`: Analyzes the code using ESLint to identify and report patterns/errors.
- `npm run preview`: Bootstraps a local web server to serve the production build.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is proprietary and confidential. Unauthorized copying of this file, via any medium, is strictly prohibited.