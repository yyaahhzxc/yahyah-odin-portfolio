import React from 'react';
import { Box, CardContent, Typography, Grid, useTheme, Theme } from '@mui/material';
import { motion } from 'framer-motion';

// Define the shape of the Project data matching your ProjectList
export interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  image: string;
  description: string;
  details?: {
      label1: string; value1: string;
      label2: string; value2: string;
      label3: string; value3: string;
  };
}

interface ProjectCardProps {
  project: Project;
  onClick: () => void; 
}

// Static styles
const cardStyle = {
  position: 'relative' as const,
  height: '100%',
  width: '100%',
  cursor: 'pointer',
  borderRadius: '24px',
  overflow: 'hidden',
  backgroundColor: 'transparent',
  padding: '3px', 
  display: 'flex',
  flexDirection: 'column' as const,
  transition: 'transform 0.2s ease-out',
  willChange: 'transform', 
};

const ProjectCard: React.FC<ProjectCardProps> = React.memo(({ project, onClick }) => {
  const theme = useTheme<Theme>();

  return (
    <Grid 
      item 
      xs={12} sm={6} md={4} 
      component={motion.div}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }} 
    >
      <Box 
        onClick={onClick}
        className="project-card-group" 
        sx={{
          ...cardStyle,
          '&:hover': {
             transform: 'translateY(-8px)',
          },
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
              // @ts-ignore
              background: theme.custom?.borderGradient || theme.palette.primary.main,
              animation: 'spinBorder 4s linear infinite',
              animationPlayState: 'paused', 
              zIndex: 0,
              display: 'none', 
              opacity: 0, 
              transition: 'opacity 0.3s ease',
          },
          '&:hover::before': {
              display: 'block', 
              opacity: 1,
              animationPlayState: 'running', 
          }
        }}
      >
        {/* INNER CARD CONTENT */}
        <Box 
            sx={{ 
                bgcolor: 'background.paper', 
                borderRadius: '22px', 
                overflow: 'hidden',
                height: '100%',
                width: '100%',
                position: 'relative',
                zIndex: 1,
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Box sx={{ position: 'relative', height: 260, overflow: 'hidden' }}>
                <Box 
                  component="img"
                  src={project.image}
                  alt={project.title}
                  loading="eager" 
                  decoding="async" 
                  sx={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease',
                      '.project-card-group:hover &': {
                          transform: 'scale(1.05)'
                      }
                  }}
                />
            </Box>

            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>{project.title}</Typography>
                {/* INCREASED SIZE HERE */}
                <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ fontWeight: 500, fontSize: '0.95rem' }} 
                >
                    {project.category} • {project.year}
                </Typography>
            </CardContent>
        </Box>
      </Box>
    </Grid>
  );
});

export default ProjectCard;