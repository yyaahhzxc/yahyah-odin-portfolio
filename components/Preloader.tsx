import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Typography } from '@mui/material';
import { GlitchText } from './GlitchText';

export const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (hasVisited) {
      setIsLoading(false);
      return;
    }

    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
            sessionStorage.setItem('hasVisited', 'true');
          }, 800);
          return 100;
        }
        return prev + Math.floor(Math.random() * 3) + 1; 
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ 
            y: '-100%', 
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            backgroundColor: '#0A0B10',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            width: '100vw',  // Force full viewport width
            height: '100vh'
          }}
        >
          <Box sx={{ width: '100%', textAlign: 'center' }}>
             <Typography 
               variant="h1" 
               sx={{ 
                 fontSize: { xs: '3rem', md: '6rem' }, 
                 color: '#fff', 
                 fontWeight: 700, 
                 lineHeight: 1,
                 fontFamily: '"Space Grotesk", sans-serif',
                 display: 'block',
                 textAlign: 'center'
               }}
             >
                {Math.min(counter, 100)}%
             </Typography>
          
             <Typography 
                component="div" // Ensure block display for centering
                variant="overline" 
                sx={{ 
                  color: 'rgba(255,255,255,0.5)', 
                  letterSpacing: '0.2em',
                  fontFamily: '"Space Grotesk", sans-serif',
                  mt: 1,
                  textAlign: 'center',
                  width: '100%'
                }}
             >
                {counter < 100 ? (
                    <GlitchText text="SYSTEM INITIALIZING..." speed={50} />
                ) : (
                    <GlitchText text="ACCESS GRANTED" speed={50} />
                )}
             </Typography>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
};