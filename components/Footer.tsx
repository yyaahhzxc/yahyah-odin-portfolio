import React, { useState } from 'react';
import { Grid, Stack, Typography, IconButton, Box, Snackbar, useTheme } from '@mui/material';
import { Email, GitHub, Facebook, LinkedIn } from '@mui/icons-material';
import { BentoTile } from './BentoGrid';
import { motion } from 'framer-motion';

// FIX: Use motion.create() instead of motion() to silence warning
const MotionIconButton = motion.create(IconButton);

export const Footer = () => {
  const theme = useTheme();
  const [toastOpen, setToastOpen] = useState(false);

  const socials = [
    { icon: <GitHub />, link: 'https://github.com/yyaahhzxc/' },
    { icon: <Facebook />, link: 'https://www.facebook.com/odin.yahyah/' },
    { icon: <LinkedIn />, link: 'https://www.linkedin.com/in/yahyah-odin-1083b2373/' },
  ];

  const handleEmailClick = () => {
    navigator.clipboard.writeText('yahyahodin@gmail.com');
    setToastOpen(true);
  };

  return (
    <>
        <Grid 
        container 
        spacing={2} 
        alignItems="stretch"
        component={motion.div as any}
        variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
        }}
        sx={{ mt: 8 }}
        >
            <Grid item xs={12} md={6}>
                <BentoTile onClick={handleEmailClick}>
                    <Stack direction="column" justifyContent="center" height="100%" gap={1}>
                        <Stack direction="row" alignItems="center" gap={2}>
                            <Email sx={{ color: 'primary.main' }} />
                            {/* RESPONSIVE FONT SIZE */}
                            <Typography 
                                variant="h5" 
                                fontWeight={700}
                                sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}
                            >
                                yahyahodin@gmail.com
                            </Typography>
                        </Stack>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.85rem', sm: '1rem' } }}>
                            Click to copy email. Feel free to reach out for collaborations!
                        </Typography>
                    </Stack>
                </BentoTile>
            </Grid>
            
            <Grid item xs={12} md={6}>
                <BentoTile>
                    <Stack 
                        direction={{ xs: 'column', sm: 'row' }} // Stack vertically on mobile
                        justifyContent={{ xs: 'center', sm: 'space-between' }} 
                        alignItems="center" 
                        height="100%"
                        gap={2}
                    >
                        <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>© 2025 Yahyah Odin</Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ opacity: 0.7, display: 'block' }}>Davao City, Philippines</Typography>
                        </Box>
                        
                        <Stack direction="row" gap={1}>
                            {socials.map((social, i) => (
                                <MotionIconButton 
                                    key={i} 
                                    onClick={() => window.open(social.link, '_blank')}
                                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(0, 201, 255, 0.1)' }} 
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                    sx={{ 
                                        border: '1px solid', 
                                        borderColor: 'divider',
                                        color: 'text.secondary',
                                        '&:hover': { borderColor: 'primary.main', color: 'primary.main' }
                                    }}
                                >
                                    {social.icon}
                                </MotionIconButton>
                            ))}
                        </Stack>
                    </Stack>
                </BentoTile>
            </Grid>
        </Grid>

        {/* TOAST NOTIFICATION */}
        <Snackbar 
            open={toastOpen} 
            autoHideDuration={3000} 
            onClose={() => setToastOpen(false)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
            <Box
                sx={{ 
                    px: 3, 
                    py: 1.5, 
                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(20, 20, 25, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 4,
                    color: 'text.primary',
                    fontWeight: 600,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2
                }}
            >
                <Typography variant="body2" fontWeight={600}>Email copied to clipboard!</Typography>
            </Box>
        </Snackbar>
    </>
  );
};