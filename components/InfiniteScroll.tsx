
import React from 'react';
import { Box } from '@mui/material';

interface InfiniteScrollProps {
  children: React.ReactNode;
  direction?: 'left' | 'right';
  speed?: 'slow' | 'normal' | 'fast';
}

export const InfiniteScroll: React.FC<InfiniteScrollProps> = ({ 
  children, 
  direction = 'left',
  speed = 'normal'
}) => {
  const animationClass = direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right';
  
  return (
    <Box 
      className="scroll-container"
      sx={{ 
        width: '100%', 
        overflow: 'hidden', 
        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
      }}
    >
      <Box className={`scroll-content ${animationClass}`}>
        {children}
        {/* Duplicate content for seamless loop */}
        {children}
      </Box>
    </Box>
  );
};
