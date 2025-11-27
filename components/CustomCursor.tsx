import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useTheme, useMediaQuery, GlobalStyles } from '@mui/material';

export const CustomCursor = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery('(pointer: fine)');
  const isDarkMode = theme.palette.mode === 'dark';
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // THE "SETTLED" PHYSICS CONFIG
  const springConfig = { damping: 25, stiffness: 400, mass: 0.2 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    if (!isDesktop) return;

    document.body.style.cursor = 'none';

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' ||
        target.closest('a') || 
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.classList.contains('clickable') ||
        target.classList.contains('MuiButtonBase-root');

      setIsHovering(!!isClickable);
    };

    const handleMouseOut = () => setIsHovering(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, isDesktop]);

  if (!isDesktop) return null;

  // DYNAMIC COLORS BASED ON THEME
  // Light Mode: Black Border, Darker Smoked Glass Fill
  const cursorColor = isDarkMode ? 'white' : 'black';
  const glassFill = isDarkMode 
    ? 'rgba(255, 255, 255, 0.1)' 
    : 'rgba(0, 0, 0, 0.15)'; // Darker fill for light mode visibility
  
  const shadowColor = isDarkMode ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.2)';

  return (
    <>
      <GlobalStyles styles={{
        '*': {
          cursor: 'none !important',
        },
        'body': {
          cursor: 'none !important',
        }
      }} />

      <motion.div
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 2147483647,
          pointerEvents: 'none',
        }}
      >
        <motion.div
          animate={{
            scale: isClicking ? 0.9 : isHovering ? 1.05 : 1,
            rotate: 0, 
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              filter: `drop-shadow(0 2px 4px ${shadowColor})`,
            }}
          >
            <path
              d="M5.5 2L13 28L16.5 17.5L27.5 13.5L5.5 2Z" 
              stroke={cursorColor} 
              strokeWidth="2.5"
              fill={glassFill}     
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>
    </>
  );
};