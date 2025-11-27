import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Box, Typography, Container, Stack, Slider, IconButton, Tooltip, useTheme, Paper, Button } from '@mui/material';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { ArrowBack, Refresh, Code, AutoFixHigh, Tune } from '@mui/icons-material';
import * as ReactRouterDOM from 'react-router-dom';
import { GlitchText } from '../components/GlitchText';

const { useNavigate } = ReactRouterDOM as any;

// Types for the simulation parameters
interface SimParams {
  speed: number;
  amplitude: number;
  frequency: number;
  noise: number;
}

export default function Lab() {
  const navigate = useNavigate();
  const mountRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  
  // Simulation State handled via Ref for the loop, State for the UI
  const paramsRef = useRef<SimParams>({
    speed: 1.0,
    amplitude: 1.5,
    frequency: 0.3,
    noise: 0.2
  });
  
  const [uiParams, setUiParams] = useState<SimParams>(paramsRef.current);

  const handleParamChange = (key: keyof SimParams) => (event: Event, value: number | number[]) => {
    const val = value as number;
    paramsRef.current = { ...paramsRef.current, [key]: val };
    setUiParams(prev => ({ ...prev, [key]: val }));
  };

  useEffect(() => {
    if (!mountRef.current) return;

    // --- SETUP ---
    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    const isDark = theme.palette.mode === 'dark';
    scene.background = new THREE.Color(isDark ? 0x050505 : 0xe0e0e0);
    scene.fog = new THREE.FogExp2(isDark ? 0x050505 : 0xe0e0e0, 0.02);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 15, 30);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // --- PARTICLES ---
    const cols = 100;
    const rows = 100;
    const numParticles = cols * rows;
    const spacing = 0.6;
    
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(numParticles * 3);
    const colors = new Float32Array(numParticles * 3);
    const initialY = new Float32Array(numParticles); // Store base Y to prevent drift

    const color1 = new THREE.Color(0x00C9FF); // Cyan
    const color2 = new THREE.Color(0xFF00CC); // Magenta

    let i = 0;
    for (let ix = 0; ix < cols; ix++) {
      for (let iy = 0; iy < rows; iy++) {
        // Center the grid
        const x = (ix * spacing) - ((cols * spacing) / 2);
        const z = (iy * spacing) - ((rows * spacing) / 2);
        const y = 0;

        positions[i] = x;
        positions[i + 1] = y;
        positions[i + 2] = z;
        
        initialY[i / 3] = y;

        // Gradient color based on position
        const mixedColor = color1.clone().lerp(color2, ix / cols);
        colors[i] = mixedColor.r;
        colors[i + 1] = mixedColor.g;
        colors[i + 2] = mixedColor.b;

        i += 3;
      }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true,
      opacity: 0.8
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // --- INTERACTION ---
    const mouse = new THREE.Vector2(9999, 9999);
    const raycaster = new THREE.Raycaster();
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0); // Ground plane for raycasting

    const onMouseMove = (event: MouseEvent) => {
      // Convert to Normalized Device Coordinates
      const ndcX = (event.clientX / window.innerWidth) * 2 - 1;
      const ndcY = -(event.clientY / window.innerHeight) * 2 + 1;
      
      raycaster.setFromCamera(new THREE.Vector2(ndcX, ndcY), camera);
      const target = new THREE.Vector3();
      raycaster.ray.intersectPlane(plane, target);
      
      if (target) {
        mouse.x = target.x;
        mouse.y = target.z; // Map 3D Z to 2D Y for calculation convenience
      }
    };

    window.addEventListener('mousemove', onMouseMove);

    // --- ANIMATION LOOP ---
    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      
      const time = clock.getElapsedTime();
      const positions = particles.geometry.attributes.position.array as Float32Array;
      const { speed, amplitude, frequency, noise } = paramsRef.current;

      let j = 0;
      for (let ix = 0; ix < cols; ix++) {
        for (let iy = 0; iy < rows; iy++) {
          const px = positions[j];
          const pz = positions[j + 2];
          
          // Wave calculation
          const dist = Math.sqrt(px * px + pz * pz);
          
          // Combine radial wave + directional wave
          let py = Math.sin(dist * frequency - (time * speed)) * amplitude;
          py += Math.cos(px * (frequency * 0.5) + (time * speed * 0.5)) * (amplitude * 0.5);

          // Interaction (Gravity Well)
          const dx = px - mouse.x;
          const dy = pz - mouse.y;
          const d = Math.sqrt(dx*dx + dy*dy);
          
          if (d < 8) {
             const force = (8 - d) / 8;
             py -= force * 3; // Push down
          }

          positions[j + 1] = py;
          j += 3;
        }
      }

      particles.geometry.attributes.position.needsUpdate = true;
      particles.rotation.y = time * 0.05; // Slow rotation

      renderer.render(scene, camera);
    };

    animate();

    // --- RESIZE ---
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
    };
  }, [theme.palette.mode]); // Re-init on theme change

  return (
    <Box sx={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', bgcolor: 'background.default' }}>
      
      {/* 3D Canvas Mount */}
      <div ref={mountRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }} />

      {/* Header Overlay */}
      <Box sx={{ position: 'absolute', top: 20, left: 20, zIndex: 10 }}>
         <Button 
            startIcon={<ArrowBack />} 
            onClick={() => navigate('/')}
            sx={{ color: 'text.primary', bgcolor: 'background.paper', mb: 2, backdropFilter: 'blur(10px)' }}
         >
            Return to Grid
         </Button>
         <Typography variant="h1" sx={{ fontSize: { xs: '2rem', md: '3rem' }, fontWeight: 700, pointerEvents: 'none' }}>
            <GlitchText text="LAB // 001" />
         </Typography>
         <Typography variant="caption" sx={{ letterSpacing: '0.2em', color: 'text.secondary', display: 'block' }}>
             INTERACTIVE SINE WAVE EXPERIMENT
         </Typography>
      </Box>

      {/* Control Panel */}
      <Paper
        elevation={0}
        component={motion.div}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        sx={{
            position: 'absolute',
            right: { xs: 0, md: 40 },
            bottom: { xs: 0, md: 40 },
            width: { xs: '100%', md: 320 },
            p: 3,
            bgcolor: 'rgba(10, 11, 16, 0.7)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: { xs: '24px 24px 0 0', md: 4 },
            color: 'white',
            zIndex: 10
        }}
      >
        <Stack direction="row" alignItems="center" gap={1} sx={{ mb: 3 }}>
            <Tune sx={{ color: '#00C9FF' }} />
            <Typography variant="h6" sx={{ fontWeight: 600, fontFamily: 'Space Grotesk' }}>PARAMETERS</Typography>
        </Stack>

        <Stack spacing={3}>
            <Box>
                <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                    <Typography variant="caption" sx={{ fontFamily: 'Space Grotesk' }}>WAVE SPEED</Typography>
                    <Typography variant="caption" sx={{ color: '#00C9FF' }}>{uiParams.speed.toFixed(1)}x</Typography>
                </Stack>
                <Slider 
                    value={uiParams.speed}
                    min={0} max={5} step={0.1}
                    onChange={handleParamChange('speed')}
                    sx={{ color: 'white', '& .MuiSlider-thumb': { borderRadius: 1 } }}
                />
            </Box>
            
            <Box>
                <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                    <Typography variant="caption" sx={{ fontFamily: 'Space Grotesk' }}>AMPLITUDE</Typography>
                    <Typography variant="caption" sx={{ color: '#FF00CC' }}>{uiParams.amplitude.toFixed(1)}</Typography>
                </Stack>
                <Slider 
                    value={uiParams.amplitude}
                    min={0} max={5} step={0.1}
                    onChange={handleParamChange('amplitude')}
                    sx={{ color: 'white', '& .MuiSlider-thumb': { borderRadius: 1 } }}
                />
            </Box>

            <Box>
                <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                    <Typography variant="caption" sx={{ fontFamily: 'Space Grotesk' }}>FREQUENCY</Typography>
                    <Typography variant="caption" sx={{ color: '#92FE9D' }}>{uiParams.frequency.toFixed(2)}</Typography>
                </Stack>
                <Slider 
                    value={uiParams.frequency}
                    min={0.01} max={1} step={0.01}
                    onChange={handleParamChange('frequency')}
                    sx={{ color: 'white', '& .MuiSlider-thumb': { borderRadius: 1 } }}
                />
            </Box>
        </Stack>
      </Paper>
    </Box>
  );
}