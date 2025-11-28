import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Typography, useTheme, Theme } from '@mui/material';

export const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme<Theme>();

  useEffect(() => {
    // Check if user has visited this session
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (hasVisited) {
      setIsLoading(false);
      return;
    }

    // 2.2s timer for the reveal animation
    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem('hasVisited', 'true');
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            // @ts-ignore
            backgroundColor: theme.palette.background.default,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ overflow: 'hidden', textAlign: 'center' }}>
             {/* NAME REVEAL (Slide Up) */}
             <motion.div
               initial={{ y: 40, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ duration: 1, ease: "easeOut" }}
             >
               <Typography 
                 variant="h1" 
                 sx={{ 
                   fontSize: { xs: '2.5rem', md: '5rem' }, 
                   fontWeight: 800, 
                   letterSpacing: '-0.02em',
                   fontFamily: '"Space Grotesk", sans-serif',
                   // Use the custom gradient
                   // @ts-ignore
                   background: theme.custom?.iridescentGradient || theme.palette.primary.main,
                   WebkitBackgroundClip: 'text',
                   WebkitTextFillColor: 'transparent',
                   filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.2))'
                 }}
               >
                  Yahyah Odin
               </Typography>
             </motion.div>

             {/* SUBTITLE FADE IN */}
             <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.5, duration: 0.8 }}
             >
                <Typography 
                    variant="overline" 
                    sx={{ 
                      color: 'text.secondary', 
                      letterSpacing: '0.3em',
                      mt: 2,
                      display: 'block',
                      fontSize: '0.9rem',
                      fontWeight: 600
                    }}
                >
                    PORTFOLIO 2025
                </Typography>
             </motion.div>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
};