import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box, GlobalStyles } from '@mui/material';
import { lightTheme, darkTheme } from './theme';
import { NavBar } from './components/NavBar';
import { CustomCursor } from './components/CustomCursor';
import { Preloader } from './components/Preloader';
import { CommandPalette } from './components/CommandPalette';
import Background3D from './components/Background3D';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const CV = lazy(() => import('./pages/CV'));
const ProjectList = lazy(() => import('./pages/ProjectList'));

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  
  const location = useLocation(); 

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const openCommandPalette = () => {
    setCommandOpen(true);
  };

  // Dynamic Title Logic
  useEffect(() => {
    const path = location.pathname;
    switch(path) {
      case '/':
        document.title = `Yahyah Odin | Portfolio`;
        break;
      case '/portfolio':
        document.title = `My Works | Yahyah Odin`;
        break;
      case '/cv':
        document.title = `My Profile | Yahyah Odin`;
        break;
      default:
        document.title = `Yahyah Odin | Portfolio`;
    }
  }, [location]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setCommandOpen((open) => !open);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <ThemeProvider theme={mode === 'dark' ? darkTheme : lightTheme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          '::selection': {
            background: mode === 'dark' ? '#00E5FF' : '#D946EF',
            color: '#ffffff',
          },
          '::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '::-webkit-scrollbar-thumb': {
            background: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
            borderRadius: '4px',
          },
          '::-webkit-scrollbar-thumb:hover': {
            background: mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
          },
        }}
      />
      
      <CustomCursor />
      <Preloader />
      
      <Background3D />

      <Box sx={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <NavBar 
          toggleTheme={toggleTheme} 
          mode={mode} 
          mobileOpen={mobileOpen} 
          setMobileOpen={setMobileOpen}
          openCommandPalette={openCommandPalette}
        />
        
        <Box sx={{ flexGrow: 1 }}>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/portfolio" element={<ProjectList />} />
              <Route path="/cv" element={<CV />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </Suspense>
        </Box>
      </Box>

      {/* FIX: Passed required props matching CommandPalette.tsx interface */}
      <CommandPalette 
        open={commandOpen} 
        onClose={() => setCommandOpen(false)}
        toggleTheme={toggleTheme}
        mode={mode}
      />
    </ThemeProvider>
  );
}

export default App;