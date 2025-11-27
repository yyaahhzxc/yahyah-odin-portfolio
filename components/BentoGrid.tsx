import React from 'react';
import { Box, Card, Typography, Grid, useTheme, Theme } from '@mui/material';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

interface BentoTileProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  link?: string;
  onClick?: () => void;
  background?: string;
  gradient?: boolean;
  alwaysActive?: boolean;
  sx?: any;
}

// FIX: Use motion.create()
const MotionCard = motion.create(Card);

export const BentoTile: React.FC<BentoTileProps> = ({ 
  children, 
  title, 
  subtitle, 
  icon, 
  link, 
  onClick, 
  background, 
  gradient,
  alwaysActive,
  sx = {}
}) => {
  const theme = useTheme<Theme>(); 
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const spotlightColor = theme.palette.mode === 'dark' 
    ? 'rgba(255, 255, 255, 0.1)' 
    : 'rgba(0, 0, 0, 0.05)';

  return (
    <MotionCard
      onMouseMove={handleMouseMove}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      onClick={onClick}
      className="group relative"
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative', 
        cursor: (link || onClick) ? 'pointer' : 'default',
        background: background,
        overflow: 'hidden', 
        ...sx,
        
        // ROTATING BORDER LAYER
        '&::before': {
            content: '""',
            position: 'absolute',
            width: '150vmax', 
            height: '150vmax',
            left: '50%',
            top: '50%',
            marginLeft: '-75vmax',
            marginTop: '-75vmax', 
            background: theme.custom.borderGradient,
            animation: 'spinBorder 4s linear infinite', 
            zIndex: 0,
            opacity: alwaysActive ? 1 : 0,
            transition: 'opacity 0.3s ease',
        },
        // INNER MASK
        '&::after': {
             content: '""',
             position: 'absolute',
             inset: '2px', 
             borderRadius: '22px',
             background: background || theme.palette.background.paper,
             zIndex: 0,
        },
        
        '&:hover::before, &:active::before, &:focus-within::before': {
            opacity: 1,
        }
      }}
    >
      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              ${spotlightColor},
              transparent 80%
            )
          `,
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {gradient && !alwaysActive && (
         <Box sx={{
           position: 'absolute',
           top: 0,
           left: 0,
           right: 0,
           height: '4px',
           background: theme.custom.iridescentGradient,
           zIndex: 2
         }} />
      )}

      <Box sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 2, height: '100%' }}>
        {(title || icon) && (
            <Box sx={{ mb: 2 }}>
                {icon && <Box sx={{ mb: 1.5, color: 'text.primary' }}>{icon}</Box>}
                {title && <Typography variant="h6" color="text.secondary" sx={{ opacity: 0.8, fontSize: '0.85rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{title}</Typography>}
                {subtitle && <Typography variant="h3" sx={{ mt: 0.5 }}>{subtitle}</Typography>}
            </Box>
        )}
        
        <Box sx={{ flex: 1, width: '100%' }}>
          {children}
        </Box>
      </Box>
    </MotionCard>
  );
};

interface BentoGridProps {
  children: React.ReactNode;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ children }) => {
  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Grid 
        container 
        spacing={2}
        alignItems="stretch"
        component={motion.div as any}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        {children}
      </Grid>
    </Box>
  );
};