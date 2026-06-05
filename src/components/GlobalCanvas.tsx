import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, Sparkles, PerspectiveCamera, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

// Particle system that responds to scroll
const CinematicParticles = () => {
  const ref = useRef<THREE.Points>(null);
  const count = 3000;

  const positions = useMemo(() => {
    const coords = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      coords[i * 3] = (Math.random() - 0.5) * 40;     
      coords[i * 3 + 1] = (Math.random() - 0.5) * 40; 
      coords[i * 3 + 2] = (Math.random() - 0.5) * 40; 
    }
    return coords;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
      ref.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#f59e0b"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.4}
      />
    </Points>
  );
};

// Abstract Floating Objects
const Spices = () => {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      // Gentle overall floating
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.5;
    }
  });

  return (
    <group ref={group}>
      {Array.from({ length: 40 }).map((_, i) => (
        <Float 
          key={i}
          speed={1 + Math.random() * 2} 
          rotationIntensity={2 + Math.random() * 3} 
          floatIntensity={2 + Math.random() * 2}
          position={[
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 30 - 5,
            (Math.random() - 0.5) * 15 - 5
          ]}
        >
          <mesh>
            <octahedronGeometry args={[Math.random() * 0.3 + 0.1, 0]} />
            <meshPhysicalMaterial 
              color={i % 3 === 0 ? "#d97706" : i % 3 === 1 ? "#b45309" : "#78350f"} 
              roughness={0.1}
              metalness={0.9}
              transparent
              opacity={0.9}
              envMapIntensity={2}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

// Camera Controller mapped to scroll
const CameraController = () => {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollY / height;
      
      // Camera moves deep into the scene based on scroll
      gsap.to(camera.position, {
        z: 5 - progress * 20, // Moves forward
        y: progress * 5,     // Moves up
        duration: 1,
        ease: 'power2.out',
        overwrite: 'auto'
      });
      
      gsap.to(camera.rotation, {
        x: -progress * 0.2, // Looks down slightly
        duration: 1,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [camera]);

  useFrame(() => {
    // Subtle parallax based on mouse
    camera.position.x += (mouse.current.x * 0.5 - camera.position.x) * 0.05;
  });

  return null;
};

export default function GlobalCanvas() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none w-full h-full bg-brand-dark overflow-hidden">
      <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: false }}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        <color attach="background" args={['#030303']} />
        
        <fogExp2 attach="fog" args={['#030303', 0.05]} />
        
        <ambientLight intensity={0.4} />
        <spotLight 
          position={[10, 20, 10]} 
          angle={0.3} 
          penumbra={1} 
          intensity={3} 
          color="#f59e0b" 
        />
        <pointLight position={[-10, -10, -5]} intensity={2} color="#ea580c" />
        <spotLight 
          position={[0, -20, -10]} 
          angle={0.5} 
          penumbra={1} 
          intensity={5} 
          color="#d97706" 
        />
        
        <CinematicParticles />
        <Spices />
        <Sparkles count={800} scale={20} size={1.5} speed={0.3} color="#fcd34d" opacity={0.3} />
        
        <Environment preset="city" />
        <CameraController />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60 mix-blend-multiply" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#030303]/50 to-[#030303]" />
    </div>
  );
}
