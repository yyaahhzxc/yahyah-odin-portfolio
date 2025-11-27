
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface GlitchTextProps {
  text: string;
  speed?: number;
  className?: string;
  sx?: any; // Allow MUI sx prop for styling flexibility
}

const CHARS = "-_~`!@#$%^&*()+=[]{}|;:,.<>?/0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const GlitchText: React.FC<GlitchTextProps> = ({ text, speed = 30, className, sx }) => {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startScramble = () => {
    let iteration = 0;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(prev => 
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }

      iteration += 1 / 3; // Controls how fast the real text is revealed
    }, speed);
  };

  return (
    <motion.span
      onHoverStart={startScramble}
      className={className}
      style={{ display: 'inline-block', ...sx }} // Ensure it acts like a block for hover detection
    >
      {displayText}
    </motion.span>
  );
};
