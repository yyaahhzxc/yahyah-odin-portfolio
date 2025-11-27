import React, { useState, useMemo, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { lightTheme, darkTheme } from './theme';
import Home from './pages/Home';
import CV from './pages/CV';
import ProjectList from './pages/ProjectList';
import { NavBar } from './components/NavBar';
import { AnimatePresence } from 'framer-motion';
import { CustomCursor } from './components/CustomCursor';
import { Preloader } from './components/Preloader';
import { CommandPalette } from './components/CommandPalette';
import { Background3D } from './components/Background3D';

// Handle ESM imports for React Router v6
const { HashRouter, Routes, Route, useLocation } = ReactRouterDOM as any;

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/cv" element={<CV />} />
        <Route path="/portfolio" element={<ProjectList />} />
      </Routes>
    </AnimatePresence>
  );
};

export default function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  
  const theme = useMemo(() => (mode === 'dark' ? darkTheme : lightTheme), [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            setCmdOpen(true);
        }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Preloader />
      <CustomCursor />
      
      <HashRouter>
        <ScrollToTop />
        <Background3D />
        
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
          <NavBar 
            toggleTheme={toggleTheme} 
            mode={mode} 
            mobileOpen={mobileOpen}
            setMobileOpen={setMobileOpen}
            openCommandPalette={() => setCmdOpen(true)}
          />
          
          <Box component="main" sx={{ flexGrow: 1 }}>
            <AnimatedRoutes />
          </Box>
        </Box>

        <CommandPalette 
          open={cmdOpen} 
          onClose={() => setCmdOpen(false)}
          toggleTheme={toggleTheme}
          mode={mode}
        />
      </HashRouter>
    </ThemeProvider>
  );
}