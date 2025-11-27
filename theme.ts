import { createTheme, alpha, ThemeOptions, PaletteMode } from '@mui/material';

const DARK_BG = '#050505'; 
// UPDATED: Softer light background (less sharp white)
const LIGHT_BG = '#F0F2F5'; 

// Main Gradient
const DARK_IRIDESCENT_GRADIENT = 'linear-gradient(135deg, #4C1D95 0%, #3B82F6 50%, #00E5FF 100%)';
const LIGHT_IRIDESCENT_GRADIENT = 'linear-gradient(135deg, #F472B6 0%, #A78BFA 50%, #22D3EE 100%)';

// Rotating Gradient for Borders
const DARK_BORDER_GRADIENT = 'conic-gradient(from 0deg, #4C1D95, #3B82F6, #00E5FF, #4C1D95)';
const LIGHT_BORDER_GRADIENT = 'conic-gradient(from 0deg, #F472B6, #A78BFA, #22D3EE, #F472B6)';

declare module '@mui/material/styles' {
    interface Theme {
      custom: {
        iridescentGradient: string;
        borderGradient: string;
      };
    }
    interface ThemeOptions {
      custom?: {
        iridescentGradient?: string;
        borderGradient?: string;
      };
    }
}

const getDesignTokens = (mode: PaletteMode): ThemeOptions => {
  const isDark = mode === 'dark';

  return {
    palette: {
      mode,
      background: {
        default: isDark ? DARK_BG : LIGHT_BG,
        paper: isDark ? '#0A0A0A' : '#FFFFFF', 
      },
      text: {
        // UPDATED: Darker text in light mode
        primary: isDark ? '#FFFFFF' : '#000000', 
        secondary: isDark ? '#A1A1AA' : '#404040',
      },
      primary: {
        main: isDark ? '#00C9FF' : '#D946EF', 
      },
      action: {
        hover: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
      },
    },
    custom: {
        iridescentGradient: isDark ? DARK_IRIDESCENT_GRADIENT : LIGHT_IRIDESCENT_GRADIENT,
        borderGradient: isDark ? DARK_BORDER_GRADIENT : LIGHT_BORDER_GRADIENT,
    },
    typography: {
      fontFamily: '"Outfit", "Helvetica", "Arial", sans-serif',
      h1: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, letterSpacing: '-0.03em' },
      h2: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, letterSpacing: '-0.02em' },
      h3: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600 },
      h4: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600 },
      h5: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600 },
      h6: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.08em' },
      button: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, textTransform: 'none' },
      subtitle2: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600 },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: { transition: 'background-color 0.4s ease, color 0.4s ease' },
          '@keyframes spinBorder': {
            '0%': { transform: 'rotate(0deg)' },
            '100%': { transform: 'rotate(360deg)' },
          },
          '@keyframes textFlow': {
            '0%': { backgroundPosition: '0% center' },
            '100%': { backgroundPosition: '200% center' },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backdropFilter: 'blur(20px)',
            border: '1px solid',
            borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)', 
            borderRadius: 24,
            boxShadow: isDark ? '0 10px 40px -10px rgba(0,0,0,0.5)' : '0 10px 30px -10px rgba(217, 70, 239, 0.15)',
            overflow: 'hidden',
            transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
            position: 'relative',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { borderRadius: 8, fontFamily: '"Space Grotesk", sans-serif', fontWeight: 500, border: '1px solid', borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)', background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)' },
          outlined: { borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.12)' }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: 50, padding: '12px 28px', boxShadow: 'none', '&:hover': { boxShadow: 'none' } },
          contained: { 
            background: isDark ? '#00E5FF' : '#D946EF', 
            color: isDark ? '#000000' : '#FFFFFF', 
            '&:hover': { background: isDark ? alpha('#00E5FF', 0.8) : alpha('#D946EF', 0.8) } 
           },
          outlined: { borderColor: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)', borderWidth: '1.5px', '&:hover': { borderWidth: '1.5px', borderColor: isDark ? '#FFFFFF' : '#000000', background: 'transparent' } },
        },
      },
    },
  };
}

export const lightTheme = createTheme(getDesignTokens('light'));
export const darkTheme = createTheme(getDesignTokens('dark'));