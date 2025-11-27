
import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from "framer-motion";
import { Box, Typography } from "@mui/material";

// Helper to wrap value within a range
const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

interface VelocityScrollProps {
  text: string;
  baseVelocity?: number;
}

export function VelocityScroll({ text, baseVelocity = 3 }: VelocityScrollProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  // Adjust these values based on the text length/font size to prevent gaps
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    // Change direction based on scroll direction
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <Box sx={{ overflow: "hidden", py: 4, whiteSpace: "nowrap", display: "flex", userSelect: 'none' }}>
      <motion.div style={{ x, display: "flex", gap: "30px" }}>
         {[...Array(6)].map((_, i) => (
             <Typography 
                key={i} 
                variant="h1" 
                sx={{ 
                    fontSize: { xs: '4rem', md: '8rem' }, 
                    fontWeight: 800, 
                    textTransform: 'uppercase',
                    color: 'transparent',
                    WebkitTextStroke: '1px rgba(125,125,125,0.2)',
                    opacity: 0.6,
                    fontFamily: '"Space Grotesk", sans-serif',
                    transition: 'opacity 0.3s',
                    '&:hover': {
                        opacity: 1,
                        WebkitTextStroke: '1px rgba(255,255,255,0.8)',
                    }
                }}
             >
                {text}
             </Typography>
         ))}
      </motion.div>
    </Box>
  );
}
