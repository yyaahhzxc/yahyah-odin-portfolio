import React from 'react';
import { Box, Card, Typography, Grid, useTheme, Theme } from '@mui/material';
import { motion } from 'framer-motion';

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

  return (
    <MotionCard
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
        // Use transparent background to let the inner box handle the color
        background: 'transparent', 
        overflow: 'hidden', 
        padding: '3px', // Space for the border
        borderRadius: '24px', // Outer radius
        boxShadow: 'none', // Remove default shadow
        ...sx,
        
        // ROTATING BORDER LAYER (Consistent with ProjectList)
        '&::before': {
            content: '""',
            position: 'absolute',
            width: '150vmax', 
            height: '150vmax',
            left: '50%',
            top: '50%',
            marginLeft: '-75vmax',
            marginTop: '-75vmax', 
            // @ts-ignore
            background: theme.custom?.borderGradient || theme.palette.primary.main,
            animation: 'spinBorder 4s linear infinite', 
            zIndex: 0,
            opacity: alwaysActive ? 1 : 0, // Always show if active
            transition: 'opacity 0.3s ease',
        },
        // Hover state for border
        '&:hover::before': {
            opacity: 1,
        }
      }}
    >
      {/* INNER CARD CONTENT (The actual card background) */}
      <Box 
        sx={{ 
            flex: 1,
            background: background || theme.palette.background.paper,
            borderRadius: '21px', // Inner radius (Outer - padding)
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            p: 3,
            height: '100%',
            overflow: 'hidden'
        }}
      >
          {/* Gradient Top Line (Optional, kept for continuity) */}
          {gradient && !alwaysActive && (
             <Box sx={{
               position: 'absolute',
               top: 0,
               left: 0,
               right: 0,
               height: '4px',
               // @ts-ignore
               background: theme.custom?.iridescentGradient,
               zIndex: 2
             }} />
          )}

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