import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { useTheme, useMediaQuery, Theme } from '@mui/material';

const generateSphere = (count: number, radius: number) => {
  const points = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
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
  const theme = useTheme<Theme>();
  const isDark = theme.palette.mode === 'dark';
  
  // OPTIMIZATION: Reduce particle count on mobile
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const count = isMobile ? 400 : 2000;
  
  const sphere = useMemo(() => generateSphere(count, 1.5), [count]);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 15;
      ref.current.rotation.y -= delta / 20;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      {/* FIX: Added key={count} to force re-mount when particle count changes */}
      <Points 
        key={count} 
        ref={ref} 
        positions={sphere} 
        stride={3} 
        frustumCulled={false} 
        {...props}
      >
        <PointMaterial
          transparent
          color={isDark ? "#ffffff" : "#000000"}
          size={0.002}
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
      <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 2]}> 
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Background3D;