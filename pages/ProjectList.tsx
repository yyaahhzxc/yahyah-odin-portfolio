import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Box, Container, Typography, CardContent, Chip, ButtonBase, Grid, IconButton, useTheme, useMediaQuery, Stack, Theme, Divider, Backdrop } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Close, CalendarToday, Devices, Palette, Speed } from '@mui/icons-material';
import { Footer } from '../components/Footer';
import ProjectCard from '../components/ProjectCard'; 

// --- HELPER ---
const getImages = (folder: string, prefix: string, count: number, pad: boolean = false) => {
  return Array.from({ length: count }, (_, i) => {
    const num = pad ? String(i + 1).padStart(2, '0') : String(i + 1);
    return `/Portfolio - webp/${folder}/${prefix}${num}.webp`;
  });
};

// --- DATA ---
const projects = [
  { 
    id: 1, 
    title: 'ACES DOTA 2 Postings', 
    category: 'Socials', 
    year: '2025',
    fullDate: 'August 2025',
    image: '/Thumbnails/ACES DOTA 2 Postings_compress-page01.webp', 
    description: 'Promotional materials and event postings for the ACES DOTA 2 tournament.',
    challenge: 'Executing real-time publication materials under tight deadlines, requiring posts within 12 hours or immediately after match results while strictly adhering to the tournament template.',
    solution: 'Developed a high-efficiency workflow to produce accurate, high-quality graphics under pressure, ensuring rapid turnaround times while maintaining visual consistency with the established brand identity.',
    details: {
      label1: 'Event/Purpose', value1: 'ACES DOTA 2 Tournament',
      label2: 'Social Media', value2: 'Facebook Page',
      label3: 'Application', value3: 'Canva'
    },
    images: getImages('ACES DOTA 2 Postings', 'ACES DOTA 2 Postings_compress-page', 12, true)
  },
  { 
    id: 2, 
    title: 'BAHAGHARI Vivant GA', 
    category: 'Event Slides', 
    year: '2022',
    fullDate: 'January 2022',
    image: '/Thumbnails/BAHAGHARI Vivant - General Assembly Presentation Slides_page1.webp', 
    description: 'General Assembly presentation slides for BAHAGHARI Vivant.',
    challenge: 'Designing comprehensive General Assembly presentation slides that align with the specific "Vivant" theme and organizational branding kit.',
    solution: 'Exercised creative freedom to synthesize brand assets into a visually cohesive and aesthetically pleasing slide deck, ensuring all organizational data was presented clearly while strictly adhering to the thematic guidelines.',
    details: {
      label1: 'Event Name', value1: 'Vivant General Assembly',
      label2: 'Organization', value2: 'BAHAGHARI',
      label3: 'Application', value3: 'Canva'
    },
    images: getImages('BAHAGHARI Vivant - General Assembly Presentation Slides', 'BAHAGHARI Vivant - General Assembly Presentation Slides_page', 33, false)
  },
  { 
    id: 3, 
    title: 'CSSEC Recruitment', 
    category: 'Socials', 
    year: '2022',
    fullDate: 'July 2022',
    image: '/Thumbnails/CSSEC Committee Recruitment_compress-page01.webp', 
    description: 'Campaign materials for the Computer Studies Student Executive Council committee recruitment.',
    challenge: 'Creating engaging social media publicity materials to drive CS student applications for the Executive Council, strictly utilizing the provided theme and branding.',
    solution: 'Designed a series of informative and visually striking posters that clearly communicated committee roles and benefits, optimizing the layout for easy readability and maximum engagement on social platforms.',
    details: {
      label1: 'Event/Purpose', value1: 'Committee Recruitment',
      label2: 'Social Media', value2: 'Facebook / Instagram',
      label3: 'Application', value3: 'Figma / Canva'
    },
    images: getImages('CSSEC Committee Recruitment', 'CSSEC Committee Recruitment_compress-page', 9, true)
  },
  { 
    id: 4, 
    title: 'Gender & Dev E-Magazine', 
    category: 'Academics', 
    year: '2024',
    fullDate: 'May 2024',
    image: '/Thumbnails/Gender and Development E-Magazine-page01.webp', 
    description: 'An E-Magazine focusing on Gender and Development topics.',
    challenge: 'Producing a digital magazine focused on Gender and Development for a general audience while balancing extensive text content with visual elements.',
    solution: 'Conceptualized a unique LGBT-themed publication utilizing a ROYGBIV color progression for the pages. Each page was designed with a distinct layout to maintain reader interest while adhering to the overarching colorful theme.',
    details: {
      label1: 'Subject', value1: 'Gender & Development',
      label2: 'Output Type', value2: 'E-Magazine',
      label3: 'Application', value3: 'Canva'
    },
    images: getImages('Gender and Development E-Magazine', 'Gender and Development E-Magazine-page', 11, true)
  },
  { 
    id: 5, 
    title: 'Lead Series: Day 1', 
    category: 'Event Slides', 
    year: '2021',
    fullDate: 'September 2021',
    image: '/Thumbnails/Lead Series Presentation Slides - Day 1_page1.webp', 
    description: 'Presentation deck for the Lead Series Day 1 event.',
    challenge: 'Designing a massive presentation deck for a 3-day leadership event with a Mindanao-wide scope, requiring consistent branding across multiple days.',
    solution: 'Scaled the visual identity system to cover a multi-day itinerary. Created a comprehensive, professional slide deck that accommodated the expanded scope and audience, ensuring visual continuity and professional polish throughout the 3-day event.',
    details: {
      label1: 'Event Name', value1: 'Lead Series 2021',
      label2: 'Organization', value2: 'CSSEC',
      label3: 'Application', value3: 'Canva'
    },
    images: getImages('Lead Series Presentation Slides - Day 1', 'Lead Series Presentation Slides - Day 3 Part 1_page', 95, false)
  },
  { 
    id: 6, 
    title: 'Palaro 2025 PubMats', 
    category: 'Socials', 
    year: '2025',
    fullDate: 'August 2025',
    image: '/Thumbnails/Palaro 2025 Recruitment Boosting PubMats_page1.webp', 
    description: 'Publicity materials for the Palaro 2025 recruitment drive.',
    challenge: 'Driving student registration for intramural sports and building hype through a countdown campaign, all while strictly adhering to the cluster\'s branding guidelines.',
    solution: 'Created a cohesive "whole picture" carousel for Facebook displaying the event list. Designed a countdown series featuring individual athletes, team warm-ups, and nostalgic victory photos to build emotional connection and excitement.',
    details: {
      label1: 'Event/Purpose', value1: 'Palarong Atenista 2025',
      label2: 'Social Media', value2: 'Facebook Page',
      label3: 'Application', value3: 'Canva'
    },
    images: getImages('Palaro 2025 Recruitment Boosting PubMats', 'Palaro 2025 Recruitment Boosting PubMats_page', 9, false)
  },
  { 
    id: 7, 
    title: 'Payment Tracker App', 
    category: 'UI/UX', 
    year: '2025',
    fullDate: 'November 2025',
    image: '/Thumbnails/Payment Tracker - High Fidelity Wireframe_page1.webp', 
    description: 'High fidelity wireframes for a personal payment tracking application.',
    challenge: 'Designing the user interface for an Android-based personal payment collection application that is simple enough for everyday use.',
    solution: 'Produced high-fidelity Figma wireframes detailing all core user flows. Focused on a minimalist, intuitive UX/UI design to ensure ease of use for simple financial tracking tasks on mobile devices.',
    details: {
      label1: 'Platform', value1: 'Mobile (iOS/Android)',
      label2: 'Stack', value2: 'Figma Prototype',
      label3: 'Application', value3: 'Figma'
    },
    images: getImages('Payment Tracker - High Fidelity Wireframes', 'Payment Tracker - High Fidelity Wireframe_page', 14, false)
  },
  { 
    id: 8, 
    title: 'TESDA Website Revamp', 
    category: 'UI/UX', 
    year: '2025',
    fullDate: 'April 2025',
    image: '/Thumbnails/TESDA Website Revamped - High Fidelity Wireframe-page01.png', 
    description: 'A modern revamp of the TESDA website interface.',
    challenge: 'Revitalizing an outdated and cluttered government website to improve usability and accessibility without losing critical information.',
    solution: 'Reimagined the information architecture to reduce clutter and improve navigation. Delivered high-fidelity wireframes that presented a modern, clean, and accessible interface while retaining all necessary institutional information.',
    details: {
      label1: 'Platform', value1: 'Web / Desktop',
      label2: 'Stack', value2: 'Figma Design System',
      label3: 'Application', value3: 'Figma'
    },
    images: getImages('TESDA Website Revamped - High Fidelity Wireframes', 'TESDA Website Revamped - High Fidelity Wireframe-page', 13, true)
  },
  { 
    id: 9, 
    title: 'White Teeth Clinic', 
    category: 'UI/UX', 
    year: '2025',
    fullDate: 'November 2025',
    image: '/Thumbnails/White Teeth Dental Clinic Main Modules - High-Fidelity Wireframe_page2.webp', 
    description: 'Main modules design for a dental clinic management system.',
    challenge: 'Digitalizing manual, paper-based operations for a dental clinic as part of a major Software Engineering capstone project.',
    solution: 'Designed a comprehensive staff-facing application to streamline clinic operations. Created high-fidelity wireframes for key modules including Login, Admin Dashboard, Patient Records, Appointments, and Sales Reporting.',
    details: {
      label1: 'Platform', value1: 'Web App',
      label2: 'Stack', value2: 'React / Material UI',
      label3: 'Application', value3: 'Figma'
    },
    images: getImages('White Teeth Dental Clinic Main  Modules - High Fidelity Wireframes', 'White Teeth Dental Clinic Main Modules - High-Fidelity Wireframe_page', 5, false)
  },
  { 
    id: 10, 
    title: 'Volleyball Brochure', 
    category: 'Academics', 
    year: '2025',
    fullDate: 'January 2025',
    image: '/Thumbnails/PE 2237 - Volleyball Brochure_page1.webp', 
    description: 'Informational brochure for PE 2237 Volleyball course.',
    challenge: 'Creating an informative brochure highlighting the benefits of volleyball that is engaging enough for students to actually read.',
    solution: 'Adopted a dynamic "comic book" aesthetic to convey energy and movement. Leveraged advanced editing tools (background removal, duotone, halftone effects) to create a visually distinct and fun brochure.',
    details: {
      label1: 'Subject', value1: 'PE 2237 (Volleyball)',
      label2: 'Output Type', value2: 'Tri-fold Brochure',
      label3: 'Application', value3: 'Canva'
    },
    images: getImages('PE 2237 - Volleyball Brochure', 'PE 2237 - Volleyball Brochure_page', 2, false)
  }
];

const categories = ['All', 'UI/UX', 'Event Slides', 'Socials', 'Academics'];

// --- COMPONENT: LIGHTBOX (Fullscreen Viewer) ---
const ImageLightbox = ({ image, onClose }: { image: string | null, onClose: () => void }) => {
    const [scale, setScale] = useState(1);
    
    useEffect(() => setScale(1), [image]);

    if (!image) return null;

    const handleWheel = (e: React.WheelEvent) => {
        e.stopPropagation();
        const delta = e.deltaY * -0.001;
        const newScale = Math.min(Math.max(1, scale + delta), 3); // Max 3x zoom
        setScale(newScale);
    };

    return (
        <Backdrop 
            open={!!image} 
            onClick={onClose} 
            sx={{ 
                zIndex: 9999, 
                color: '#fff',
                bgcolor: 'rgba(0,0,0,0.95)',
                backdropFilter: 'blur(10px)'
            }}
        >
            <IconButton 
                onClick={onClose}
                sx={{ position: 'absolute', top: 20, right: 20, color: 'white', zIndex: 10 }}
            >
                <Close fontSize="large" />
            </IconButton>
            
            <Box sx={{ position: 'absolute', bottom: 30, left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.5)', pointerEvents: 'none' }}>
                <Typography variant="caption">Scroll to Zoom • Drag to Pan</Typography>
            </Box>

            <Box 
                onClick={(e) => e.stopPropagation()} 
                onWheel={handleWheel}
                sx={{ 
                    width: '100%', 
                    height: '100%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    overflow: 'hidden'
                }}
            >
                <motion.img
                    src={image}
                    drag
                    dragConstraints={{ left: -500 * (scale - 1), right: 500 * (scale - 1), top: -500 * (scale - 1), bottom: 500 * (scale - 1) }}
                    animate={{ scale }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    style={{ 
                        maxHeight: '90vh', 
                        maxWidth: '90vw',
                        cursor: scale > 1 ? 'grab' : 'default'
                    }}
                />
            </Box>
        </Backdrop>
    );
};

// --- MAIN PAGE COMPONENT ---
export default function ProjectList() {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  
  // FIX: Track 'top' and 'height' for multiline support on mobile
  const [pillStyle, setPillStyle] = useState({ left: 0, top: 0, width: 0, height: 0, opacity: 0 });
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const theme = useTheme<Theme>();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isDark = theme.palette.mode === 'dark';

  const filteredProjects = useMemo(() => {
    return activeTab === 'All' 
      ? projects 
      : projects.filter(p => p.category === activeTab);
  }, [activeTab]);

  const selectedProject = projects.find(p => p.id === selectedId);

  const handleSelectProject = useCallback((id: number) => {
    setSelectedId(id);
  }, []);

  // Escape Key Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxImage) setLightboxImage(null);
        else if (selectedId) setSelectedId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImage, selectedId]);

  // Tab Pill Animation Calculation (REFACTORED FOR MOBILE)
  useEffect(() => {
    const activeIndex = categories.indexOf(activeTab);
    // @ts-ignore
    const el = tabsRef.current[activeIndex];
    
    if (el) {
      setPillStyle({
        left: el.offsetLeft,
        top: el.offsetTop, // Crucial for vertical wrapping
        width: el.clientWidth,
        height: el.clientHeight, // Use actual button height
        opacity: 1
      });
    }
  }, [activeTab, isMobile]); // Recalculate on resize/mobile switch

  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedId]);

  return (
    <>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Container maxWidth="lg" sx={{ pt: 6, pb: 6 }}>
        <Box sx={{ mb: 8, textAlign: 'center' }}>
           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
               <Typography variant="h1" sx={{ mb: 2, fontSize: { xs: '3rem', md: '4.5rem' } }}>Highlighted Works</Typography>
               <Typography variant="h5" color="text.secondary" sx={{ maxWidth: '700px', mx: 'auto', lineHeight: 1.6, opacity: 0.8 }}>
                   Showcasing my best works for the past five years, from digital products to visual systems and technical experiments.
               </Typography>
           </motion.div>
        </Box>

        {/* TABS */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 8 }}>
          <Box 
              sx={{ 
                  p: 0.5, 
                  bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', 
                  backdropFilter: 'blur(10px)',
                  borderRadius: '50px',
                  display: 'inline-flex',
                  position: 'relative', 
                  border: '1px solid',
                  borderColor: 'divider',
                  flexWrap: 'wrap', // ALLOW WRAPPING ON MOBILE
                  justifyContent: 'center'
              }}
          >
              {/* PILL */}
              <Box
                component={motion.div}
                animate={pillStyle}
                initial={false} 
                transition={{ type: "spring", stiffness: 250, damping: 25 }}
                sx={{
                    position: 'absolute',
                    // Top/Left/Width/Height controlled by animation state
                    bgcolor: isDark ? 'rgba(255,255,255,0.2)' : 'background.paper',
                    borderRadius: '50px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    zIndex: 0,
                    pointerEvents: 'none'
                }}
              />

              {/* TAB BUTTONS */}
              {categories.map((cat, index) => {
                  const isSelected = activeTab === cat;
                  return (
                      <ButtonBase
                          key={cat}
                          ref={el => tabsRef.current[index] = el} 
                          disableRipple 
                          onClick={() => {
                              if (activeTab !== cat) {
                                  setActiveTab(cat);
                              }
                          }}
                          sx={{
                              px: 3,
                              py: 1,
                              borderRadius: '50px',
                              position: 'relative',
                              zIndex: 1, 
                              color: isSelected 
                                ? (isDark ? 'white' : 'black') 
                                : 'text.secondary',
                              transition: 'all 0.2s ease',
                              typography: 'button',
                              fontWeight: isSelected ? 700 : 500,
                              minWidth: 'auto',
                              '&:hover': {
                                bgcolor: isSelected 
                                    ? 'transparent' 
                                    : (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'), 
                              }
                          }}
                      >
                          {cat}
                      </ButtonBase>
                  )
              })}
          </Box>
        </Box>

        {/* Grid Container */}
        <Box sx={{ minHeight: '60vh' }}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                >
                    {/* REDUCED GAP TO FOOTER: sx={{ mb: 4 }} was 8 */}
                    <Grid container spacing={4} sx={{ mb: 4 }}>
                        {filteredProjects.map((project) => (
                            <ProjectCard 
                                key={project.id} 
                                project={project} 
                                onClick={() => handleSelectProject(project.id)} 
                            />
                        ))}
                    </Grid>
                </motion.div>
            </AnimatePresence>
        </Box>

        <Footer />
      </Container>

      {/* EXPANDED MODAL */}
      <AnimatePresence>
        {selectedId && selectedProject && (
          <Box
             sx={{
                position: 'fixed',
                inset: 0,
                zIndex: 1300,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: { xs: 2, md: 4 }
             }}
          >
            <Box 
               component={motion.div}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.15 }} 
               onClick={() => setSelectedId(null)}
               sx={{
                  position: 'absolute',
                  inset: 0,
                  bgcolor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.85)' : 'rgba(255,255,255,0.85)',
                  backdropFilter: 'blur(12px)',
                  pointerEvents: 'auto'
               }}
            />

            <Box
               component={motion.div}
               initial={{ opacity: 0, scale: 0.95, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95, y: 20 }}
               transition={{ type: "spring", damping: 25, stiffness: 350 }}
               sx={{
                  width: '100%',
                  maxWidth: '1600px', 
                  height: '100%',
                  maxHeight: '90vh',
                  bgcolor: 'background.paper',
                  borderRadius: { xs: 3, md: 4 },
                  overflow: 'hidden',
                  position: 'relative',
                  pointerEvents: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 50px 100px -20px rgba(0, 0, 0, 0.5)',
                  border: '1px solid',
                  borderColor: 'divider'
               }}
            >
               <IconButton 
                  onClick={() => setSelectedId(null)}
                  sx={{ 
                      position: 'absolute', 
                      right: 24, 
                      top: 24, 
                      zIndex: 10,
                      bgcolor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                      color: 'text.primary',
                      backdropFilter: 'blur(4px)',
                      '&:hover': { bgcolor: 'primary.main', color: 'white' }
                  }}
               >
                  <Close />
               </IconButton>

               <Box sx={{ overflowY: 'auto', flexGrow: 1, p: { xs: 4, md: 8 } }}>
                  
                  {/* HEADER */}
                  <Box sx={{ mb: 6, mt: 2 }}>
                      <Stack direction="row" alignItems="center" gap={2} mb={2}>
                        <Chip 
                            label={selectedProject.category} 
                            sx={{ 
                                bgcolor: 'primary.main', 
                                color: 'white', 
                                fontWeight: 700, 
                                borderRadius: 2,
                                height: 32
                            }} 
                        />
                        <Typography variant="h6" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                           <CalendarToday fontSize="small" /> {selectedProject.fullDate}
                        </Typography>
                      </Stack>
                      
                      <Typography variant="h2" sx={{ fontWeight: 800, fontSize: { xs: '2.5rem', md: '4rem' }, mb: 3, lineHeight: 1.1 }}>
                          {selectedProject.title}
                      </Typography>
                      
                      <Typography variant="h5" color="text.secondary" sx={{ maxWidth: '900px', lineHeight: 1.6 }}>
                          {selectedProject.description}
                      </Typography>
                  </Box>

                  <Divider sx={{ mb: 6 }} />

                  {/* METADATA */}
                  <Grid container spacing={4} sx={{ mb: 8 }}>
                    {selectedProject.details && (
                      <>
                        <Grid item xs={12} sm={4}>
                           <Typography variant="overline" color="text.secondary" fontWeight={700} letterSpacing={1.5}>
                               {selectedProject.details.label1}
                           </Typography>
                           <Typography variant="h6" fontWeight={600} mt={1}>{selectedProject.details.value1}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                           <Typography variant="overline" color="text.secondary" fontWeight={700} letterSpacing={1.5}>
                               {selectedProject.details.label2}
                           </Typography>
                           <Typography variant="h6" fontWeight={600} mt={1}>{selectedProject.details.value2}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                           <Typography variant="overline" color="text.secondary" fontWeight={700} letterSpacing={1.5}>
                               {selectedProject.details.label3}
                           </Typography>
                           <Typography variant="h6" fontWeight={600} mt={1}>{selectedProject.details.value3}</Typography>
                        </Grid>
                      </>
                    )}
                  </Grid>

                  {/* CHALLENGE / SOLUTION */}
                  <Grid container spacing={6} sx={{ mb: 8 }}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>The Challenge</Typography>
                        <Typography 
                            variant="body1" 
                            color="text.secondary" 
                            sx={{ lineHeight: 1.8, fontSize: '1.1rem', textAlign: 'justify' }} // Justified
                        >
                            {selectedProject.challenge}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>The Solution</Typography>
                        <Typography 
                            variant="body1" 
                            color="text.secondary" 
                            sx={{ lineHeight: 1.8, fontSize: '1.1rem', textAlign: 'justify' }} // Justified
                        >
                            {selectedProject.solution}
                        </Typography>
                    </Grid>
                  </Grid>

                  {/* GALLERY */}
                  <Typography variant="overline" display="block" sx={{ mb: 3, fontWeight: 700, letterSpacing: '0.1em', color: 'text.secondary' }}>
                      PROJECT GALLERY
                  </Typography>
                  <Grid container spacing={3}>
                      {selectedProject.images && selectedProject.images.map((img, i) => {
                          // DYNAMIC GRID SIZING
                          const imageCount = selectedProject.images.length;
                          const gridSize = imageCount <= 1 ? 12 : (imageCount === 2 ? 6 : 4);

                          return (
                            <Grid item xs={12} md={gridSize} key={i}>
                                <Box 
                                    // @ts-ignore
                                    component="img" 
                                    src={img} 
                                    loading="lazy"
                                    onClick={() => setLightboxImage(img)}
                                    sx={{ 
                                        width: '100%', 
                                        borderRadius: 4, 
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                                        transition: 'transform 0.3s ease',
                                        cursor: 'zoom-in',
                                        '&:hover': { transform: 'scale(1.02)' }
                                    }} 
                                />
                            </Grid>
                          )
                      })}
                  </Grid>
               </Box>
            </Box>
          </Box>
        )}
      </AnimatePresence>

      {/* FULLSCREEN LIGHTBOX */}
      <ImageLightbox 
        image={lightboxImage} 
        onClose={() => setLightboxImage(null)} 
      />

    </motion.div>
    </>
  );
}