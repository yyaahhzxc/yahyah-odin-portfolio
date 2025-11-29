import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Container, Stack, Avatar, Grid, Button, useTheme, Theme, ButtonBase, useMediaQuery, Divider } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Email, Phone, LocationOn, School, Star, Handyman, Business, EmojiEvents, Badge } from '@mui/icons-material';
import { Footer } from '../components/Footer';
import { Magnetic } from '../components/Magnetic';

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

// --- DATA ---

const education = [
    { school: "Ateneo de Davao University", degree: "Bachelor of Science in Computer Science", period: "2021 - Present" },
    { school: "Notre Dame of Cotabato", degree: "Senior High School (STEM)", period: "2019 - 2021" },
    { school: "Notre Dame of Cotabato", degree: "Junior High School", period: "2016 - 2019" }
];

const affiliations = [
  {
    org: "Computer Studies Student Executive Council",
    role: "Associate to the External Vice President",
    period: "2024 - Present",
    description: [
        "Managed the different external committees within the council.",
        "Facilitated communication between the council and external partners, sponsors, and other student organizations.",
        "Assisted the External Vice President in drafting official correspondence and managing partnership agreements.",
        "Crafted various emails, concept papers, and announcements within the council and cluster, and beyond the council.",
        "Communicated with the cluster dean and other key administrative people within the university for document approval."
    ]
  },
  {
    org: "Computer Studies Student Executive Council",
    role: "Member - Productions Committee",
    period: "2025 - Present",
    description: [
        "Facilitated in the technical productions of the organization-led events and programs.",
        "Assisted in script-writing, program flow alignment, and audio-visual presentations throughout the event timeline."
    ]
  },
  {
    org: "Computer Studies Student Executive Council",
    role: "Member - Communications Committee",
    period: "2024 - 2025",
    description: [
        "Crafted social media captions on the council social media platforms.",
        "Scheduled social media posts on the council social media platforms.",
        "Assisted in ensuring timely council social media posts.",
        "Participated in creating captions and posting in time-driven social media posts on live events."
    ]
  },
  {
    org: "Computer Studies Student Executive Council",
    role: "Member - Logistics Committee",
    period: "2024 - 2025",
    description: [
        "Assisted in planning and procuring materials needed for the different council and cluster events.",
        "Participated in regular inventory checks of the council."
    ]
  },
  {
    org: "Computer Studies Student Executive Council",
    role: "Member - Creatives Committee",
    period: "2024 - 2025",
    description: [
        "Created various social media post graphics.",
        "Created numerous presentation slides for various events throughout the year.",
        "Participated in creating graphics on time-driven social media posts on live events."
    ]
  },
  {
    org: "AdDU - BAHAGHARI",
    role: "Member - Productions Committee",
    period: "2021 - Present",
    description: [
        "Facilitated in the technical productions of the organization-led events and programs.",
        "Assisted in script-writing, program flow alignment, and audio-visual presentations throughout the event timeline."
    ]
  },
  {
    org: "Ateneo Cavalry Esports Society",
    role: "Member - Creatives Committee",
    period: "2025 - Present",
    description: [
        "Created various social media post graphics.",
        "Participated in creating graphics on time-driven social media posts on live events."
    ]
  },
  {
    org: "Council of Class Presidents",
    role: "Member - Computer Science 1A President",
    period: "2021 - 2022",
    description: [
        "Relayed announcements by the SAMAHAN and Council of Class Presidents to the class."
    ]
  },
  {
    org: "Book Lovers Club",
    role: "President - Notre Dame of Cotabato",
    period: "2016 - 2021",
    description: [
        "Led monthly meetings discussing different books read throughout the month.",
        "Organized book donations for the school library.",
        "Assisted in signing student clearance by ensuring active student membership."
    ]
  }
];

const awards = [
    { title: "With Honors", org: "Notre Dame of Cotabato - Senior High School", year: "2021" },
    { title: "With Honors", org: "Notre Dame of Cotabato - Junior High School", year: "2019" }
];

const experiences = [
  {
    role: "Overall Assistant Head - Computer Studies Cluster",
    event: "Palarong Atenista 2025",
    period: "July 2025 - Present",
    description: [
        "Participated in inter-cluster meetings for the event timeline.",
        "Facilitated cluster events for timeline alignment.",
        "Facilitated cluster participants for document approval and management.",
        "Crafted cluster tracker for events timeline, participant documents and requirements checklist, cluster committee trackers, events bracketing, and events standing.",
        "Coordinated practice schedules and communicated guidelines to participants to ensure compliance with event rules."
    ]
  },
  {
    role: "Cluster Liaison Head - Ecoteneo Student Unit",
    event: "Palarong Atenista 2024 & 2025",
    period: "July 2024 - Present",
    description: [
        "Bridged communication between Ecoteneo Student Unit and Computer Studies Student Executive Council for announcements, reminders, and real-time updates.",
        "Ensured cluster compliance on Ecoteneo guidelines and reminders throughout the event timeline.",
        "Retrieved Ecoteneo Student Unit-violating materials and paraphernalia for proper disposal."
    ]
  },
  {
    role: "Cluster Head",
    event: "UFest / UTAKAN / Cheerdance",
    period: "March 2024 - Present",
    description: [
        "Bridged communication between the overall event heads and the cluster technical working group and participants for announcements, reminders, and real-time updates.",
        "Facilitated cluster participants for document and requirement approval and management.",
        "Participated in guideline review and revisions in meetings."
    ]
  },
  {
    role: "Head - Event Technical Productions Committee",
    event: "Multiple Events (Iridescence, Cham Along, Purple Up, Vivant, LEAD)",
    period: "September 2021 - August 2025",
    description: [
        "Directed the technical flow of the event, managing audio-visual setups, cues, and transitions for a seamless production.",
        "Ensured different aspects of the productions team, such as script, hosts, audio and visual presentations, and program flow are properly implemented and reviewed.",
        "Supervised the technical committee and coordinated with logistics to ensure equipment readiness."
    ]
  },
  {
    role: "Assistant Head - PSITS AdDU CS Cluster",
    event: "Philippine Society of Information Technology Students 2025",
    period: "March 2025",
    description: [
        "Bridged communication between PSITS and CSSEC for announcements, reminders, and real-time updates.",
        "Participated in inter-school meetings for event timelines.",
        "Facilitated cluster events for timeline alignment.",
        "Facilitated cluster participants for document and requirement approval and management.",
        "Crafted cluster tracker for events timelines and participant documents."
    ]
  },
  {
    role: "Associate External Affairs Director",
    event: "IT Week 2025",
    period: "February 2025",
    description: [
        "Assisted in brainstorming event programs and contests.",
        "Assisted in contacting potential sponsors and speakers for the event.",
        "Assisted in crafting and refining sponsor packages.",
        "Bridged communication between sponsors and CSSEC for document and requirements approval, negotiations, and contract signing.",
        "Assisted in facilitating event timeline and management and ushering sponsors."
    ]
  },
  {
    role: "Member - Event Technical Productions Committee",
    event: "Pirates of the Chameleons / Fall Bytes",
    period: "August 2022",
    description: [
        "Assisted in presenting audio and visual presentations of the program.",
        "Assisted in ensuring proper program flow on event proper.",
        "Ushered hosts and speakers in their timing within the event."
    ]
  },
  {
    role: "Member - Creatives Committee",
    event: "Multiple Events (Iridescence, Cham Along, Vivant, LEAD)",
    period: "September 2021 - August 2025",
    description: [
        "Produced presentation slides for the event with the given branding kit.",
        "Assisted in crafting graphics for social media posts."
    ]
  }
];

const skills = {
    Professional: ["Detail-Oriented", "Project Management", "Communication", "Collaboration", "Leadership"],
    Functional: ["Technical Writing", "Proofreading", "Researching", "Copy Reading and Editing"],
    Technical: ["Frontend Development", "UI/UX Design", "Quality Assurance"],
    Tools: ["Microsoft Office", "Google Workspace", "Canva", "Figma", "Github", "OBS Studio", "Visual Studio Code"]
};

// --- COMPONENTS ---

// Custom "Skill Pill" style
const skillPillStyle = (theme: Theme) => ({
    px: 2,
    py: 1,
    borderRadius: '12px',
    border: '1px solid',
    borderColor: 'divider',
    bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
    color: 'text.primary',
    fontSize: '0.9rem',
    fontWeight: 500,
    fontFamily: 'Space Grotesk',
    transition: 'all 0.2s ease',
    '&:hover': {
        borderColor: 'primary.main',
        bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
        transform: 'translateY(-2px)'
    }
});

// --- UPDATED UNIFIED TIMELINE ITEM ---
const TimelineItem = ({ title, subtitle, period, description, icon, isFirst, isLast }: any) => {
    const theme = useTheme<Theme>();
    return (
        <Box 
            component={motion.div} 
            variants={itemVariants}
            sx={{ position: 'relative', pl: 4, pb: 6, '&:last-child': { pb: 0 } }}
        >
            {/* CONTINUOUS VERTICAL LINE */}
            <Box 
                sx={{ 
                    position: 'absolute', 
                    left: '7px', 
                    // LOGIC: If first, start at 16px (center of icon). Else start at 0 (connect from prev).
                    top: isFirst ? '16px' : 0, 
                    // LOGIC: If last, stop at 16px (center of icon). Else go to bottom (connect to next).
                    bottom: isLast ? 'auto' : 0, 
                    height: isLast ? '16px' : 'auto',
                    width: '2px', 
                    bgcolor: 'divider',
                }} 
            />
            
            {/* MARKER (ICON or DOT) */}
            {icon ? (
                // ICON MARKER
                <Box 
                    sx={{ 
                        position: 'absolute', 
                        // UPDATED: Centered 28px box on 8px axis -> left: 8 - 14 = -6px
                        left: -6, 
                        top: 2, // 2px + 14px (half height) = 16px CENTER
                        width: 28,
                        height: 28,
                        bgcolor: 'background.paper', 
                        borderRadius: '50%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        zIndex: 1,
                        border: '2px solid',
                        borderColor: 'background.paper',
                        color: 'primary.main',
                        boxShadow: theme.palette.mode === 'dark' ? '0 0 10px rgba(0,0,0,0.5)' : '0 2px 5px rgba(0,0,0,0.1)'
                    }}
                >
                    {React.cloneElement(icon, { sx: { fontSize: '18px' } })}
                </Box>
            ) : (
                // STANDARD DOT MARKER
                <Box 
                    sx={{ 
                        position: 'absolute', 
                        left: 0, 
                        top: '8px', // 8px + 8px (half height) = 16px CENTER
                        width: 16, 
                        height: 16, 
                        borderRadius: '50%', 
                        // @ts-ignore
                        background: theme.custom?.iridescentGradient || theme.palette.primary.main,
                        boxShadow: theme.palette.mode === 'dark' ? '0 0 12px rgba(0, 229, 255, 0.5)' : '0 0 12px rgba(217, 70, 239, 0.5)',
                        zIndex: 1,
                        border: '2px solid',
                        borderColor: 'background.paper'
                    }} 
                />
            )}

            <Typography variant="h5" sx={{ fontWeight: 700, lineHeight: 1.2, mb: 0.5 }}>{title}</Typography>
            <Typography variant="subtitle1" sx={{ color: 'primary.main', mb: 0.5, fontWeight: 600, fontFamily: 'Space Grotesk' }}>{subtitle}</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', display: 'block', mb: 2, fontStyle: 'italic' }}>{period}</Typography>
            {description && (
                <Box component="ul" sx={{ m: 0, pl: 2, color: 'text.secondary' }}>
                    {description.map((item: string, i: number) => (
                        <Typography component="li" variant="body1" key={i} sx={{ mb: 1, lineHeight: 1.6 }}>{item}</Typography>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default function CV() {
  const theme = useTheme<Theme>();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); 
  const isDark = theme.palette.mode === 'dark';
  
  const [activeTab, setActiveTab] = useState('Education');
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  
  const tabs = ['Education', 'Affiliations', 'Awards', 'Experience', 'Skills'];

  const [pillStyle, setPillStyle] = useState({ left: 0, top: 0, width: 0, height: 0, opacity: 0 });
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const activeIndex = tabs.indexOf(activeTab);
    const el = tabsRef.current[activeIndex];
    if (el) {
      setPillStyle({
        left: el.offsetLeft,
        top: el.offsetTop,
        width: el.clientWidth, 
        height: el.clientHeight,
        opacity: 1
      });
    }
  }, [activeTab]); 

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Container maxWidth="lg" sx={{ pt: { xs: 4, md: 8 }, pb: 8 }}>
          <Grid container spacing={8}>
              <Grid item xs={12} md={4}>
                  <Box sx={{ position: { md: 'sticky' }, top: 100, textAlign: { xs: 'center', md: 'left' } }}>
                      <Box sx={{ position: 'relative', display: 'inline-block', mb: 3 }}>
                         <Box className="profile-wrapper" sx={{ position: 'relative', display: 'inline-block', '&:hover .border-glow': { opacity: 1 } }}>
                             <Box className="border-glow" sx={{ position: 'absolute', inset: '-4px', borderRadius: '50%', 
                                // @ts-ignore
                                background: theme.custom?.borderGradient || theme.palette.primary.main, animation: 'spinBorder 4s linear infinite', zIndex: 0, opacity: 0, transition: 'opacity 0.3s ease' }} />
                             <Box sx={{ position: 'relative', zIndex: 1, borderRadius: '50%', bgcolor: 'background.paper' }}>
                                <Avatar src="/Pictures/odin_formal.jpg" sx={{ width: 200, height: 200, border: '4px solid', borderColor: 'background.paper', bgcolor: 'primary.main', fontSize: '4rem' }}>YO</Avatar>
                             </Box>
                         </Box>
                      </Box>
                      <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, letterSpacing: '-0.02em' }}>Yahyah Odin</Typography>
                      <Typography variant="h6" color="primary" sx={{ mb: 3, fontWeight: 600, fontFamily: 'Space Grotesk' }}>Associate to the External Vice President</Typography>
                      <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.8, fontSize: '1.05rem' }}>I am a junior Bachelor of Science in Computer Science student...</Typography>
                      <Divider sx={{ mb: 4 }} />
                      <Stack spacing={2} sx={{ mb: 4, alignItems: { xs: 'center', md: 'flex-start' } }}>
                          <Typography variant="body1" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}><Email color="primary" /> yahyahodin@gmail.com</Typography>
                          <Typography variant="body1" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}><Phone color="primary" /> +63 994 6311 997</Typography>
                          <Typography variant="body1" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}><LocationOn color="primary" /> Davao City</Typography>
                      </Stack>
                      <Magnetic strength={0.2}>
                        <Button variant="contained" startIcon={<Download />} fullWidth onClick={() => window.open('/CV/Odin_CV.pdf', '_blank')} sx={{ borderRadius: 2, py: 1.5, fontSize: '1rem', fontWeight: 700 }}>Download CV</Button>
                      </Magnetic>
                  </Box>
              </Grid>

              <Grid item xs={12} md={8}>
                 <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' }, mb: 6 }} onMouseLeave={() => setHoveredTab(null)}>
                     <Box sx={{ display: 'inline-flex', position: 'relative', p: 0.5, bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', borderRadius: '50px', border: '1px solid', borderColor: 'divider', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <Box component={motion.div} animate={pillStyle} initial={false} transition={{ type: "spring", stiffness: 250, damping: 25 }} sx={{ position: 'absolute', bgcolor: isDark ? 'rgba(255,255,255,0.2)' : 'background.paper', borderRadius: '50px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', zIndex: 0, pointerEvents: 'none' }} />
                        {tabs.map((tab, index) => {
                            const isSelected = activeTab === tab;
                            const isHovered = hoveredTab === tab;
                            return (
                                <ButtonBase
                                    key={tab}
                                    ref={(el: HTMLButtonElement | null) => { tabsRef.current[index] = el; }}
                                    disableRipple
                                    onClick={() => { if (activeTab !== tab) setActiveTab(tab); }}
                                    onMouseEnter={() => setHoveredTab(tab)}
                                    sx={{ px: 3, py: 1, borderRadius: '50px', position: 'relative', zIndex: 1, color: isSelected ? (isDark ? 'white' : 'black') : 'text.secondary', fontWeight: isSelected ? 700 : 500, fontSize: '1rem', fontFamily: 'Space Grotesk', transition: 'color 0.2s', whiteSpace: 'nowrap' }}
                                >
                                    {isHovered && !isSelected && (
                                        <Box component={motion.div} layoutId="hover-pill" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} sx={{ position: 'absolute', inset: 0, bgcolor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)', borderRadius: '50px', zIndex: -1 }} />
                                    )}
                                    {tab}
                                </ButtonBase>
                            );
                        })}
                     </Box>
                 </Box>

                 <AnimatePresence mode="wait">
                     <motion.div key={activeTab} variants={containerVariants} initial="hidden" animate="visible" exit={{ opacity: 0, y: 10, transition: { duration: 0.15 } }}>
                        
                        {/* EXPERIENCE (Standard dots) */}
                        {activeTab === 'Experience' && (
                            <Box>
                                {experiences.map((exp, i) => (
                                    <TimelineItem 
                                        key={i} 
                                        title={exp.role} 
                                        subtitle={exp.event} 
                                        period={exp.period} 
                                        description={exp.description}
                                        isFirst={i === 0}
                                        isLast={i === experiences.length - 1}
                                    />
                                ))}
                            </Box>
                        )}

                        {/* AFFILIATIONS (Standard dots) */}
                        {activeTab === 'Affiliations' && (
                            <Box>
                                {affiliations.map((aff, i) => (
                                    <TimelineItem 
                                        key={i} 
                                        title={aff.org} 
                                        subtitle={aff.role} 
                                        period={aff.period} 
                                        description={aff.description}
                                        isFirst={i === 0}
                                        isLast={i === affiliations.length - 1} 
                                    />
                                ))}
                            </Box>
                        )}

                        {/* EDUCATION (Icons) */}
                        {activeTab === 'Education' && (
                            <Box>
                                <Box sx={{ mb: 6 }}>
                                    <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 700, mb: 3 }}><School color="primary" /> Education</Typography>
                                    {education.map((edu, i) => (
                                        <TimelineItem 
                                            key={i}
                                            title={edu.school}
                                            subtitle={edu.degree}
                                            period={edu.period}
                                            icon={<School />} 
                                            isFirst={i === 0}
                                            isLast={i === education.length - 1}
                                        />
                                    ))}
                                </Box>
                            </Box>
                        )}

                        {/* AWARDS (Icons) */}
                        {activeTab === 'Awards' && (
                             <Box>
                                <Box>
                                    <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 700, mb: 3 }}><EmojiEvents color="primary" /> Awards</Typography>
                                    {awards.map((award, i) => (
                                        <TimelineItem 
                                            key={i}
                                            title={award.title}
                                            subtitle={award.org}
                                            period={award.year}
                                            icon={<Star />} 
                                            isFirst={i === 0}
                                            isLast={i === awards.length - 1}
                                        />
                                    ))}
                                </Box>
                            </Box>
                        )}

                        {/* SKILLS (Standard Grid) */}
                        {activeTab === 'Skills' && (
                            <Grid container spacing={6}>
                                <Grid item xs={12}>
                                    <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3, fontWeight: 700 }}><Business color="primary" /> Professional</Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>{skills.Professional.map(s => (<Box key={s} sx={skillPillStyle(theme)}>{s}</Box>))}</Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3, fontWeight: 700 }}><Badge color="primary" /> Functional</Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>{skills.Functional.map(s => (<Box key={s} sx={skillPillStyle(theme)}>{s}</Box>))}</Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3, fontWeight: 700 }}><Handyman color="primary" /> Technical & Tools</Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>{[...skills.Technical, ...skills.Tools].map(s => (<Box key={s} sx={skillPillStyle(theme)}>{s}</Box>))}</Box>
                                </Grid>
                            </Grid>
                        )}
                     </motion.div>
                 </AnimatePresence>
              </Grid>
          </Grid>
          <Box sx={{ mt: 8 }}><Footer /></Box>
      </Container>
    </motion.div>
  );
}