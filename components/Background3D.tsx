import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '@mui/material';

export const Background3D = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  
  // Refs to hold 3D objects so we can update them without re-rendering
  const sceneRef = useRef<THREE.Scene | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const linesRef = useRef<THREE.LineSegments | null>(null);

  // Initialize Scene ONCE
  useEffect(() => {
    if (!mountRef.current) return;

    // SCENE SETUP
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // PARTICLES
    const particleCount = 60;
    const particlesGroup = new THREE.Group();
    const particleGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const particleMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xffffff // Default color, will update dynamically
    });

    const particleMeshes: THREE.Mesh[] = [];
    const particleData: { velocity: THREE.Vector3 }[] = [];

    for (let i = 0; i < particleCount; i++) {
      const mesh = new THREE.Mesh(particleGeometry, particleMaterial);
      
      const x = (Math.random() - 0.5) * 40;
      const y = (Math.random() - 0.5) * 40;
      const z = (Math.random() - 0.5) * 10;
      
      mesh.position.set(x, y, z);
      
      const velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        0
      );

      particleMeshes.push(mesh);
      particleData.push({ velocity });
      particlesGroup.add(mesh);
    }
    scene.add(particlesGroup);
    
    // Store refs for color updates
    // @ts-ignore
    particlesRef.current = { material: particleMaterial, children: particleMeshes } as any;

    // LINES
    const lineMaterial = new THREE.LineBasicMaterial({ 
      color: 0x00C9FF, // Default
      transparent: true, 
      opacity: 0.15 
    });
    const linesGeometry = new THREE.BufferGeometry();
    const linesMesh = new THREE.LineSegments(linesGeometry, lineMaterial);
    scene.add(linesMesh);
    linesRef.current = linesMesh;

    // MOUSE
    const mouse = new THREE.Vector2(9999, 9999);
    const onMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    // ANIMATION LOOP
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      particlesGroup.rotation.y += 0.0005;
      linesMesh.rotation.y += 0.0005;

      const positions: number[] = [];
      const mouseVec = new THREE.Vector3(mouse.x * 20, mouse.y * 20, 0);

      particleMeshes.forEach((mesh, i) => {
        const data = particleData[i];
        mesh.position.add(data.velocity);

        if (mesh.position.x > 25 || mesh.position.x < -25) data.velocity.x *= -1;
        if (mesh.position.y > 25 || mesh.position.y < -25) data.velocity.y *= -1;

        const distToMouse = mesh.position.distanceTo(mouseVec);
        if (distToMouse < 4) {
             const repulsion = mesh.position.clone().sub(mouseVec).normalize().multiplyScalar(0.02);
             mesh.position.add(repulsion);
        }

        for (let j = i + 1; j < particleCount; j++) {
            const meshB = particleMeshes[j];
            const dist = mesh.position.distanceTo(meshB.position);
            if (dist < 6) {
                positions.push(mesh.position.x, mesh.position.y, mesh.position.z);
                positions.push(meshB.position.x, meshB.position.y, meshB.position.z);
            }
        }
      });

      linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      linesGeometry.computeBoundingSphere();

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (mountRef.current) mountRef.current.removeChild(renderer.domElement);
      particleGeometry.dispose();
      particleMaterial.dispose();
      lineMaterial.dispose();
      linesGeometry.dispose();
    };
  }, []); 

  // DYNAMIC COLOR UPDATE (This runs when theme changes, WITHOUT re-mounting the canvas)
  useEffect(() => {
    if (!particlesRef.current || !linesRef.current) return;

    const targetColor = new THREE.Color(isDarkMode ? 0xffffff : 0x000000);
    const targetLineColor = new THREE.Color(isDarkMode ? 0x00C9FF : 0x8B5CF6); // Cyan in dark, Purple in light

    // @ts-ignore
    particlesRef.current.material.color.set(targetColor);
    // @ts-ignore
    linesRef.current.material.color.set(targetLineColor);
    // @ts-ignore
    linesRef.current.material.opacity = isDarkMode ? 0.15 : 0.1;

  }, [isDarkMode]);

  return (
    <div 
      ref={mountRef} 
      style={{ 
        position: 'fixed', 
        top: 0, left: 0, width: '100%', height: '100%', 
        zIndex: -1, pointerEvents: 'none', opacity: 0.6 
      }} 
    />
  );
};