import React, { useState, useEffect, useMemo } from 'react';
import { 
  Dialog, 
  Box, 
  InputBase, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Typography, 
  useTheme, 
  Backdrop
} from '@mui/material';
import { 
  Search, 
  Home, 
  Work, 
  Description, 
  Email, 
  GitHub, 
  LinkedIn, 
  DarkMode, 
  LightMode,
  ArrowForward
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import * as ReactRouterDOM from 'react-router-dom';

const { useNavigate } = ReactRouterDOM as any;

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  toggleTheme: () => void;
  mode: 'light' | 'dark';
}

interface Action {
  id: string;
  label: string;
  icon: React.ReactNode;
  shortcut?: string;
  perform: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ open, onClose, toggleTheme, mode }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const actions: Action[] = useMemo(() => [
    { 
      id: 'home', 
      label: 'Go to Home', 
      icon: <Home fontSize="small" />, 
      perform: () => navigate('/') 
    },
    { 
      id: 'work', 
      label: 'View Portfolio', 
      icon: <Work fontSize="small" />, 
      perform: () => navigate('/portfolio') 
    },
    { 
      id: 'cv', 
      label: 'Read Resume / CV', 
      icon: <Description fontSize="small" />, 
      perform: () => navigate('/cv') 
    },
    { 
      id: 'theme', 
      label: `Switch to ${mode === 'dark' ? 'Light' : 'Dark'} Mode`, 
      icon: mode === 'dark' ? <LightMode fontSize="small" /> : <DarkMode fontSize="small" />, 
      perform: () => toggleTheme() 
    },
    { 
      id: 'email', 
      label: 'Copy Email Address', 
      icon: <Email fontSize="small" />, 
      perform: () => {
        navigator.clipboard.writeText('hello@alex.dev');
        // Could add a toast notification here
      }
    },
    { 
      id: 'github', 
      label: 'Open GitHub', 
      icon: <GitHub fontSize="small" />, 
      shortcut: '↵',
      perform: () => window.open('https://github.com', '_blank') 
    },
    { 
      id: 'linkedin', 
      label: 'Open LinkedIn', 
      icon: <LinkedIn fontSize="small" />, 
      shortcut: '↵',
      perform: () => window.open('https://linkedin.com', '_blank') 
    },
  ], [navigate, mode, toggleTheme]);

  const filteredActions = actions.filter(action => 
    action.label.toLowerCase().includes(query.toLowerCase())
  );

  // Reset selection when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredActions.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredActions.length) % filteredActions.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredActions[selectedIndex]) {
          filteredActions[selectedIndex].perform();
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, filteredActions, selectedIndex, onClose]);

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      TransitionComponent={motion.div as any}
      TransitionProps={{
        initial: { opacity: 0, scale: 0.95, y: -20 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.95, y: 20 },
      } as any}
      PaperProps={{
        sx: {
          backgroundColor: theme.palette.mode === 'dark' ? 'rgba(20, 20, 25, 0.85)' : 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(16px)',
          borderRadius: 3,
          backgroundImage: 'none',
          border: '1px solid',
          borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          overflow: 'hidden',
          mt: '-10vh' // Position slightly higher than center
        }
      }}
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          sx: { backgroundColor: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(2px)' }
        }
      }}
    >
      <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Search sx={{ color: 'text.secondary' }} />
          <InputBase
            autoFocus
            fullWidth
            placeholder="Type a command or search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            sx={{ 
              fontSize: '1.1rem',
              color: 'text.primary',
              fontFamily: '"Space Grotesk", sans-serif'
            }}
          />
          <Box 
            sx={{ 
              bgcolor: 'action.hover', 
              px: 0.8, 
              py: 0.2, 
              borderRadius: 1, 
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary' }}>ESC</Typography>
          </Box>
        </Box>
      </Box>

      <List sx={{ p: 1, maxHeight: '300px', overflowY: 'auto' }}>
        {filteredActions.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography color="text.secondary">No results found.</Typography>
          </Box>
        ) : (
          filteredActions.map((action, index) => (
            <ListItem
              key={action.id}
              onClick={() => {
                action.perform();
                onClose();
              }}
              onMouseEnter={() => setSelectedIndex(index)}
              sx={{
                borderRadius: 2,
                cursor: 'pointer',
                mb: 0.5,
                transition: 'all 0.1s ease',
                backgroundColor: index === selectedIndex 
                  ? (theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)') 
                  : 'transparent',
                borderLeft: '2px solid',
                borderColor: index === selectedIndex ? theme.palette.primary.main : 'transparent',
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: index === selectedIndex ? 'primary.main' : 'text.secondary' }}>
                {action.icon}
              </ListItemIcon>
              <ListItemText 
                primary={action.label} 
                primaryTypographyProps={{ 
                  fontWeight: index === selectedIndex ? 600 : 400,
                  color: index === selectedIndex ? 'text.primary' : 'text.primary'
                }}
              />
              {index === selectedIndex && (
                <ArrowForward fontSize="small" sx={{ opacity: 0.5 }} />
              )}
            </ListItem>
          ))
        )}
      </List>
      
      <Box sx={{ p: 1.5, borderTop: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="caption" color="text.secondary">
          <Box component="span" sx={{ fontWeight: 'bold' }}>↑↓</Box> to navigate
        </Typography>
        <Typography variant="caption" color="text.secondary">
          <Box component="span" sx={{ fontWeight: 'bold' }}>↵</Box> to select
        </Typography>
      </Box>
    </Dialog>
  );
}