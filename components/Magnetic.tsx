
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticProps {
  children: React.ReactElement;
  strength?: number; // How far the element moves (default 0.2)
}

export const Magnetic: React.FC<MagneticProps> = ({ children, strength = 0.2 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    // @ts-ignore
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    setPosition({ x: middleX * strength, y: middleY * strength });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      style={{ display: 'inline-block' }}
    >
      {React.cloneElement(children, {
        // Ensure the child doesn't block pointer events if needed, 
        // though typically we want the interaction on the wrapper.
      })}
    </motion.div>
  );
};
