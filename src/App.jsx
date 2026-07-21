import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Loader   from './components/ui/Loader';
import Navbar   from './components/layout/Navbar';
import Footer   from './components/layout/Footer';
import Hero     from './sections/Hero';
import About from './sections/About';

const Districts    = lazy(() => import('./sections/Districts'));
const Disciplines  = lazy(() => import('./sections/Disciplines'));
const Download     = lazy(() => import('./sections/Download'));
const PrivacyPolicy      = lazy(() => import('./pages/PrivacyPolicy'));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'));
const DeleteAccount      = lazy(() => import('./pages/DeleteAccount'));

function LandingPage() {
  return (
    <>
      <Hero />
      <About />
      <Suspense fallback={null}>
        <Districts />
        <Disciplines />
        <Download />
      </Suspense>
    </>
  );
}

function AppShell() {
  const location = useLocation();

  // Instant scroll on navigation from sub-pages
  useEffect(() => {
    const target = location.state?.scrollTo;
    if (target) {
      // Small delay to ensure components are mounted, but much faster than before
      const timer = setTimeout(() => {
        document.querySelector(target)?.scrollIntoView({ behavior: 'auto' });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Loader />
      <Navbar />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/delete-account" element={<DeleteAccount />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppShell />
      </ThemeProvider>
    </BrowserRouter>
  );
}