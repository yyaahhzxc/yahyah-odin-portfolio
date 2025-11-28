import React, { useState, useEffect } from 'react';
import { Box, Typography, Chip, Stack, Avatar, Button, Grid, useMediaQuery, useTheme, Theme, Snackbar } from '@mui/material';
import { BentoGrid, BentoTile } from '../components/BentoGrid';
import { Magnetic } from '../components/Magnetic';
import { useNavigate } from 'react-router-dom';
import { motion, Variants, AnimatePresence, LayoutGroup } from 'framer-motion';
import { 
  Brush, GitHub, LinkedIn, AutoAwesome, Email, Terminal, Facebook, Storage, Description, Settings, Group
} from '@mui/icons-material';

const textContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const slideUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 15 } },
  exit: { opacity: 0, y: -50 }
};

const slideDown: Variants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 15 } },
  exit: { opacity: 0, y: 50 }
};

const slideRight: Variants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 50, damping: 20 } }
};

const slideLeft: Variants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 50, damping: 20 } }
};

// --- DATA ---
const skillCategories = [
  { name: 'Programming', icon: <Terminal fontSize="inherit" />, skills: ['Frontend Dev', 'UI/UX Design', 'Quality Assurance'] },
  { name: 'Admin Tools', icon: <Settings fontSize="inherit" />, skills: ['MS Office', 'Google Workspace', 'Notion'] },
  { name: 'Creative', icon: <Brush fontSize="inherit" />, skills: ['Figma', 'Canva', 'OBS Studio', 'VS Code'] },
  { name: 'Functional', icon: <Group fontSize="inherit" />, skills: ['Leadership', 'Project Mgmt', 'Tech Writing'] },
];

// UPDATED WORK IMAGES FOR MARQUEE
const workImages = [
  '/Thumbnails/ACES DOTA 2 Postings_compress-page01.webp',
  '/Thumbnails/BAHAGHARI Vivant - General Assembly Presentation Slides_page1.webp',
  '/Thumbnails/CSSEC Committee Recruitment_compress-page01.webp',
  '/Thumbnails/Gender and Development E-Magazine-page01.webp',
  '/Thumbnails/Payment Tracker - High Fidelity Wireframe_page1.webp',
  '/Thumbnails/TESDA Website Revamped - High Fidelity Wireframe-page01.webp',
  '/Thumbnails/White Teeth Dental Clinic Main Modules - High-Fidelity Wireframe_page2.webp',
  '/Thumbnails/Palaro 2025 Recruitment Boosting PubMats_page1.webp'
];

// ADDED MISSING VARIABLE
const timelineItems = [
  { year: '2025', label: 'Cluster Head' },
  { year: '2024', label: 'Associate EVP' },
  { year: '2023', label: 'Creative Lead' },
  { year: '2022', label: 'Tech Prod' },
  { year: '2021', label: 'BS CS Begins' },
];

const ROLES = [
  "Associate to the External Vice President - CSSEC",
  "Overall Assistant Head - CS Cluster",
  "Cluster Liaison Head",
  "Cluster Head",
  "Assistant Head - PSITS AdDU CS",
  "Head - Event Tech Productions",
  "Associate External Affairs Director - IT Week 2025"
];

// --- COMPONENTS ---

// Animated Profile Picture Component
const ProfileAnimation = () => {
  const [index, setIndex] = useState(0);
  const theme = useTheme<Theme>(); 
  const images = ["/Pictures/odin_formal.jpg", "/Pictures/odin_informal.jpg"]; 

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000); 
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <Box 
        sx={{ 
            position: 'relative', 
            width: { xs: 120, md: 160 }, 
            height: { xs: 120, md: 160 }, 
            flexShrink: 0,
            borderRadius: '50%',
            cursor: 'pointer',
            '&::before': {
                content: '""',
                position: 'absolute',
                inset: '-4px',
                borderRadius: '50%',
                // @ts-ignore
                background: theme.custom?.borderGradient || theme.palette.primary.main,
                animation: 'spinBorder 4s linear infinite',
                zIndex: 0,
                opacity: 0,
                transition: 'opacity 0.3s ease',
            },
            '&:hover::before': {
                opacity: 1,
            }
        }}
    >
      <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'background.paper', borderRadius: '50%', zIndex: 1 }} />

      <Box sx={{ position: 'relative', zIndex: 2, width: '100%', height: '100%', overflow: 'hidden', borderRadius: '50%' }}>
          <AnimatePresence mode="popLayout">
            <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            style={{ position: 'absolute', inset: 0 }}
            >
            <Avatar 
                src={images[index]} 
                sx={{ 
                    width: '100%', 
                    height: '100%', 
                    bgcolor: 'primary.main',
                    fontSize: '3.5rem' 
                }}
            >
                YO
            </Avatar>
            </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default function Home() {
  const navigate = useNavigate();
  const theme = useTheme<Theme>();
  const isDark = theme.palette.mode === 'dark';
  
  const [toastOpen, setToastOpen] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);

  // Seamless looping gradient
  const textGradient = isDark 
    ? 'linear-gradient(to right, #4C1D95, #3B82F6, #00E5FF, #4C1D95)' 
    : 'linear-gradient(to right, #F472B6, #A78BFA, #22D3EE, #F472B6)';

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleContactClick = (title: string, link: string) => {
    if (title === 'Email') {
        navigator.clipboard.writeText(link);
        setToastOpen(true);
    } else {
        window.open(link, '_blank');
    }
  };

  const handleViewCV = () => {
      window.open('/CV/Odin_CV.pdf', '_blank');
  };

  return (
    <motion.div 
        initial="hidden" 
        animate="visible" 
        exit="exit" 
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
    >
      <Box className="noise-overlay" />

      <Box sx={{ maxWidth: '1600px', margin: '0 auto', px: { xs: 2, md: 6 }, position: 'relative', zIndex: 1, py: 2 }}>
        <BentoGrid>
          
          {/* --- ROW 1: PROFILE BANNER --- */}
          <Grid item xs={12} md={12} component={motion.div} variants={slideDown}>
            <BentoTile alwaysActive sx={{ minHeight: { xs: 'auto', md: '260px' }, display: 'flex', alignItems: 'center', background: theme.palette.background.paper, py: { xs: 4, md: 0 } }}>
               <Box sx={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 3, md: 4 }, px: 2 }}>
                  
                  <ProfileAnimation />

                  <Box sx={{ flexGrow: 1, width: '100%', textAlign: { xs: 'center', md: 'left' }, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: { xs: 'center', md: 'flex-start' } }}>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'space-between', width: '100%', mb: 1, flexWrap: 'wrap', gap: 1 }}>
                        <Box component={motion.div} variants={textContainer} initial="hidden" animate="visible">
                          {/* LIQUID GRADIENT TEXT */}
                          <Typography 
                            variant="h1" 
                            sx={{ 
                                fontSize: { xs: '2rem', md: '4.5rem' }, 
                                lineHeight: 1, 
                                fontWeight: 800, 
                                letterSpacing: '-0.03em',
                                background: textGradient, 
                                backgroundSize: '200% auto',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                animation: 'textFlow 4s linear infinite reverse', 
                                filter: isDark ? 'drop-shadow(0 0 10px rgba(0, 229, 255, 0.5))' : 'none'
                            }}
                          >
                              Yahyah Odin
                          </Typography>
                        </Box>
                        <Typography variant="h4" color="text.secondary" sx={{ fontWeight: 600, opacity: 0.6, ml: { xs: 0, md: 'auto' } }}>Davao City, PH</Typography>
                    </Box>
                    <Box sx={{ width: '100%', height: '1px', bgcolor: 'divider', mb: 2, display: { xs: 'none', md: 'block' } }} />
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        width: '100%', 
                        color: 'text.secondary', 
                        fontSize: { xs: '1rem', md: '1.2rem' }, 
                        lineHeight: 1.6, 
                        display: 'block',
                        textAlign: { xs: 'center', md: 'justify' }
                      }}
                    >
                      Junior CS Student at Ateneo de Davao University. Associate to the External Vice President of CSSEC. Specialized in UI/UX, QA, and Creative Leadership.
                    </Typography>
                  </Box>
               </Box>
            </BentoTile>
          </Grid>

          {/* --- ROW 2: CORE --- */}
          
          {/* TOOLKIT */}
          <Grid item xs={12} md={4} component={motion.div} variants={slideRight}>
             <BentoTile title="Toolkit" sx={{ minHeight: '340px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 1, height: '100%', justifyContent: 'center' }}>
                   {skillCategories.map((cat) => (
                     <Box key={cat.name}>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, opacity: 0.7, fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.05em' }}>{cat.icon} {cat.name.toUpperCase()}</Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                           {cat.skills.map((skill) => (
                              <Box key={skill} sx={{ px: 1.5, py: 0.5, bgcolor: 'action.hover', border: '1px solid', borderColor: 'divider', borderRadius: 1, fontSize: '0.8rem', fontWeight: 600, color: 'text.primary' }}>{skill}</Box>
                           ))}
                        </Box>
                     </Box>
                   ))}
                </Box>
             </BentoTile>
          </Grid>

          {/* CENTER CARD */}
          <Grid item xs={12} md={4} component={motion.div} variants={slideUp}>
            <BentoTile sx={{ height: '100%', minHeight: '340px', background: theme.custom?.iridescentGradient || theme.palette.primary.main, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: 'none', boxShadow: isDark ? '0 20px 50px -10px rgba(0, 229, 255, 0.3)' : '0 20px 50px -10px rgba(217, 70, 239, 0.3)' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', px: 2 }}>
                    <LayoutGroup>
                        <motion.div layout style={{ marginBottom: '16px' }}>
                            <Typography variant="h6" sx={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.5)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                Yahyah Odin
                            </Typography>
                        </motion.div>
                        
                        <Box sx={{ minHeight: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                          <AnimatePresence mode="popLayout">
                            <motion.div
                              key={roleIndex}
                              layout 
                              initial={{ opacity: 0, y: 20, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -20, scale: 0.95 }}
                              transition={{ duration: 0.4, ease: "easeInOut" }}
                              style={{ width: '100%' }}
                            >
                              <Typography 
                                variant="h3" 
                                sx={{ 
                                    color: isDark ? 'white' : 'rgba(0,0,0,0.8)', 
                                    fontWeight: 800, 
                                    fontSize: { xs: '1.8rem', md: '2.5rem' },
                                    lineHeight: 1.2, 
                                    textShadow: isDark ? '0 4px 20px rgba(0,0,0,0.2)' : 'none' 
                                }}
                              >
                                  {ROLES[roleIndex]}
                              </Typography>
                            </motion.div>
                          </AnimatePresence>
                        </Box>
                    </LayoutGroup>
                </Box>
            </BentoTile>
          </Grid>

          {/* CONNECT */}
          <Grid item xs={12} md={4} component={motion.div} variants={slideLeft}>
               <Box sx={{ 
                   display: 'grid', 
                   gridTemplateColumns: '1fr 1fr', 
                   gridTemplateRows: '1fr 1fr', 
                   gap: 2, 
                   height: '100%',
                   minHeight: { xs: '340px', md: 'auto' } 
               }}>
                 {[
                    { icon: <GitHub sx={{ fontSize: 80 }} />, link: 'https://github.com/yyaahhzxc/', label: 'yyaahhzxc', title: 'GitHub' },
                    { icon: <Facebook sx={{ fontSize: 80 }} />, link: 'https://www.facebook.com/odin.yahyah/', label: 'Yahyah Odin', title: 'Facebook' }, 
                    { icon: <LinkedIn sx={{ fontSize: 80 }} />, link: 'https://www.linkedin.com/in/yahyah-odin-1083b2373/', label: 'Yahyah Odin', title: 'LinkedIn' },
                    { icon: <Email sx={{ fontSize: 80 }} />, link: 'yahyahodin@gmail.com', label: 'yahyahodin@gmail.com', title: 'Email' }
                 ].map((item, i) => (
                       <Box 
                           key={i} 
                           onClick={() => handleContactClick(item.title, item.link)} 
                           sx={{ 
                               width: '100%', 
                               height: '100%', 
                               perspective: '1000px', 
                               cursor: 'pointer', 
                               '&:hover .flipper': { transform: 'rotateY(180deg)' } 
                           }}
                       >
                          <Box 
                              className="flipper" 
                              sx={{ 
                                  width: '100%', 
                                  height: '100%', 
                                  position: 'relative', 
                                  transformStyle: 'preserve-3d', 
                                  transition: 'transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)',
                              }}
                          >
                             {/* FRONT */}
                             <Box sx={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'action.hover', border: '1px solid', borderColor: 'divider', borderRadius: 4 }}>
                                <Box sx={{ color: 'text.primary' }}>{item.icon}</Box>
                             </Box>
                             {/* BACK */}
                             <Box sx={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', bgcolor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)', border: '1px solid', borderColor: 'divider', borderRadius: 4, gap: 1, p: 1, textAlign: 'center' }}>
                                <Typography variant="h5" fontWeight={800}>{item.title}</Typography>
                                <Typography variant="body1" sx={{ wordBreak: 'break-word', fontSize: '0.8rem', fontWeight: 700 }}>{item.label}</Typography>
                             </Box>
                          </Box>
                       </Box>
                 ))}
             </Box>
          </Grid>

          {/* --- ROW 3 --- */}
          
          {/* VIEW CV */}
          <Grid item xs={12} md={4} component={motion.div} variants={slideRight}>
             <BentoTile onClick={handleViewCV} sx={{ background: theme.palette.background.paper, border: '1px solid', borderColor: 'divider', height: '100%', minHeight: '280px', overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ position: 'absolute', inset: 0, overflow: 'hidden', opacity: 0.25, maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)', display: 'flex', alignItems: 'center', zIndex: 0 }}>
                    <motion.div 
                        animate={{ x: ["0%", "-50%"] }} 
                        transition={{ duration: 40, ease: "linear", repeat: Infinity }} 
                        style={{ display: 'flex', whiteSpace: 'nowrap' }} 
                    >
                        {[...timelineItems, ...timelineItems].map((item, i) => (
                            <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2, filter: 'blur(1px)', mr: 10 }}> 
                                <Typography variant="h3" sx={{ fontWeight: 800, color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.15)' }}>{item.year}</Typography>
                                <Box sx={{ width: 60, height: 3, bgcolor: 'divider' }} />
                                <Typography variant="h4" sx={{ fontWeight: 700, textTransform: 'uppercase', color: 'text.secondary', opacity: 0.8 }}>{item.label}</Typography>
                            </Box>
                        ))}
                    </motion.div>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: 1, height: '100%', width: '100%' }}>
                   <Typography variant="h3" sx={{ mb: 1, fontWeight: 700 }}>View CV</Typography>
                   <Button variant="contained" size="large" sx={{ borderRadius: 50, px: 4 }}>Read Now</Button>
                </Box>
             </BentoTile>
          </Grid>

          {/* VIEW WORKS */}
          <Grid item xs={12} md={8} component={motion.div} variants={slideLeft}>
             <BentoTile 
                 title="Latest Works" 
                 link="/portfolio" 
                 onClick={() => navigate('/portfolio')} 
                 sx={{ 
                     background: theme.palette.background.paper,
                     color: 'text.primary',
                     minHeight: '280px', 
                     position: 'relative', 
                     overflow: 'hidden', 
                     display: 'flex', 
                     alignItems: 'stretch',
                     pl: 0 
                 }}
             >
                <Box sx={{ position: 'absolute', top: 0, left: 0, width: '200%', height: '100%', opacity: 0.3, display: 'flex', maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)' }}>
                    <motion.div 
                        animate={{ x: ["0%", "-50%"] }} 
                        transition={{ duration: 30, ease: "linear", repeat: Infinity }} 
                        style={{ display: 'flex', width: '100%' }} 
                    >
                        {[...workImages, ...workImages].map((img, i) => (
                            <Box key={i} component="img" src={img} sx={{ width: '12.5%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)', opacity: 0.7 }} />
                        ))}
                    </motion.div>
                </Box>
                
                <Box sx={{ position: 'relative', zIndex: 2, width: '100%', pointerEvents: 'none', px: 0, pt: 4, pb: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                   <Typography variant="h2" sx={{ opacity: 1, mb: 2, fontWeight: 800 }}>Explore Selected Projects</Typography>
                   <Button sx={{ 
                       color: isDark ? 'white' : 'black', 
                       bgcolor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)', 
                       backdropFilter: 'blur(10px)', 
                       px: 3, 
                       py: 1, 
                       borderRadius: 50, 
                       pointerEvents: 'auto', 
                       border: '1px solid transparent', 
                       '&:hover': { bgcolor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)', boxShadow: '0 0 20px rgba(255,255,255,0.3)', borderColor: 'rgba(255,255,255,0.5)' } 
                   }}>View Gallery</Button>
                </Box>
             </BentoTile>
          </Grid>

          <Grid item xs={12}><Stack direction="row" justifyContent="space-between" sx={{ px: 2, py: 2, opacity: 0.5 }}><Typography variant="caption">© 2025 Yahyah Odin</Typography><Typography variant="caption">Davao City</Typography></Stack></Grid>
        </BentoGrid>
      </Box>

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
    </motion.div>
  );
}