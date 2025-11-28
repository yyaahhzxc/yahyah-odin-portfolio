import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { useTheme } from '@mui/material';

// Custom generator to ensure perfect array alignment (Fixes NaN error)
const generateSphere = (count: number, radius: number) => {
  const points = new Float32Array(count * 3); // Exact multiple of 3
  for (let i = 0; i < count; i++) {
    // Uniform random distribution within a sphere
    const r = radius * Math.cbrt(Math.random());
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);
    
    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);
    
    points[i * 3] = x;
    points[i * 3 + 1] = y;
    points[i * 3 + 2] = z;
  }
  return points;
};

const Stars = (props: any) => {
  const ref = useRef<any>();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
  // Generate 2000 particles (Safe, performant, and valid)
  const sphere = useMemo(() => generateSphere(2000, 1.5), []);

  useFrame((state, delta) => {
    if (ref.current) {
      // Slow, premium drift rotation
      ref.current.rotation.x -= delta / 15;
      ref.current.rotation.y -= delta / 20;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color={isDark ? "#ffffff" : "#000000"}
          size={0.002} // Very fine, high-end dust size
          sizeAttenuation={true}
          depthWrite={false}
          opacity={isDark ? 0.8 : 0.5}
        />
      </Points>
    </group>
  );
};

const Background3D = () => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.6, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Background3D;