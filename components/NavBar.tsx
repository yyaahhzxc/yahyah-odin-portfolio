import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, IconButton, AppBar, Toolbar, Container, useMediaQuery, useTheme, Theme } from '@mui/material';
import { DarkMode, LightMode, Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { Magnetic } from './Magnetic';
import { GlitchText } from './GlitchText';

interface NavBarProps {
  toggleTheme: () => void;
  mode: 'light' | 'dark';
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  openCommandPalette: () => void; 
}

export const NavBar: React.FC<NavBarProps> = ({ toggleTheme, mode, mobileOpen, setMobileOpen }) => {
  const theme = useTheme<Theme>();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // UPDATED: "Résumé" -> "Profile"
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Profile', path: '/cv' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <AppBar 
      position="sticky" 
      color="transparent" 
      elevation={0} 
      sx={{ 
        backdropFilter: 'blur(12px)', 
        borderBottom: '1px solid',
        borderColor: 'divider',
        zIndex: 1100,
        background: mode === 'dark' ? 'rgba(3, 0, 20, 0.8)' : 'rgba(243, 240, 245, 0.8)' 
      }}
    >
      <Container maxWidth={false} sx={{ maxWidth: '1600px', px: { xs: 2, md: 6 } }}>
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', minHeight: '64px' }}>
          <Magnetic>
            <Box 
              component={Link} 
              to="/" 
              sx={{ 
                textDecoration: 'none', 
                color: 'text.primary', 
                fontWeight: 700, 
                fontFamily: 'Space Grotesk', 
                fontSize: '1.1rem',
                letterSpacing: '-0.02em',
                display: 'inline-block'
              }}
            >
              <GlitchText text="yahyah-odin.is-a.dev" />
            </Box>
          </Magnetic>

          {!isMobile ? (
            <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
              {navLinks.map((link) => (
                <Magnetic key={link.name}>
                  <Box 
                    component={Link} 
                    to={link.path} 
                    sx={{ 
                      position: 'relative',
                      textDecoration: 'none', 
                      color: isActive(link.path) ? 'text.primary' : 'text.secondary', 
                      fontWeight: 500,
                      fontSize: '0.9rem',
                      transition: 'color 0.2s',
                      display: 'inline-block',
                      '&:hover': { color: 'text.primary' }
                    }}
                  >
                    {link.name}
                    {isActive(link.path) && (
                      <Box 
                        component={motion.div}
                        layoutId="nav-underline"
                        sx={{
                          position: 'absolute',
                          bottom: -4,
                          left: 0,
                          right: 0,
                          height: 2,
                          borderRadius: 1,
                          bgcolor: 'primary.main'
                        }}
                      />
                    )}
                  </Box>
                </Magnetic>
              ))}
              
              <Box sx={{ width: 1, height: 24, bgcolor: 'divider' }} />

              <Magnetic>
                <IconButton onClick={toggleTheme} color="inherit" sx={{ ml: 1 }}>
                  {mode === 'dark' ? <LightMode fontSize="small" /> : <DarkMode fontSize="small" />}
                </IconButton>
              </Magnetic>
            </Box>
          ) : (
             <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton onClick={toggleTheme} color="inherit">
                  {mode === 'dark' ? <LightMode fontSize="small" /> : <DarkMode fontSize="small" />}
                </IconButton>
                <IconButton onClick={() => setMobileOpen(!mobileOpen)} color="inherit">
                  {mobileOpen ? <CloseIcon /> : <MenuIcon />}
                </IconButton>
             </Box>
          )}
        </Toolbar>
      </Container>
      
      <Box 
        component={motion.div}
        style={{ scaleX }}
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: theme.custom?.iridescentGradient || theme.palette.primary.main,
          transformOrigin: '0%',
          zIndex: 1200
        }}
      />
      
      <AnimatePresence>
        {isMobile && mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ 
              overflow: 'hidden', 
              background: mode === 'dark' ? 'rgba(3, 0, 20, 0.98)' : 'rgba(243, 240, 245, 0.98)',
              borderBottom: '1px solid rgba(125,125,125,0.1)'
            }}
          >
            <Container sx={{ py: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
               {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Box 
                    component={Link} 
                    to={link.path} 
                    onClick={() => setMobileOpen(false)}
                    sx={{ 
                      textDecoration: 'none', 
                      color: isActive(link.path) ? 'text.primary' : 'text.secondary', 
                      fontWeight: 600,
                      fontSize: '1.5rem',
                      fontFamily: 'Space Grotesk'
                    }}
                  >
                    {link.name}
                  </Box>
                </motion.div>
              ))}
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </AppBar>
  );
};