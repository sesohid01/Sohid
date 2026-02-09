
import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, Instances, Instance, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const Group = 'group' as any;
const Mesh = 'mesh' as any;
const IcosahedronGeometry = 'icosahedronGeometry' as any;
const MeshBasicMaterial = 'meshBasicMaterial' as any;
const AmbientLight = 'ambientLight' as any;
const PointLight = 'pointLight' as any;
const Color = 'color' as any;

// Low-overhead particles for depth
const Dust = () => {
  const count = 1000;
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [(Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40],
        scale: Math.random() * 0.02
      });
    }
    return temp;
  }, []);

  return (
    <Instances range={count}>
      <IcosahedronGeometry args={[1, 0]} />
      <MeshBasicMaterial color="#d4af37" transparent opacity={0.15} />
      {particles.map((p, i) => (
        <Instance key={i} position={p.position as any} scale={p.scale} />
      ))}
    </Instances>
  );
};

const LuxuryCore = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const outerRef = useRef<THREE.Mesh>(null!);
  
  const geometries = useMemo(() => ({
    inner: new THREE.IcosahedronGeometry(2.5, 0),
    outer: new THREE.IcosahedronGeometry(3.2, 1),
  }), []);

  const materials = useMemo(() => ({
    inner: new THREE.MeshStandardMaterial({
      color: "#ffffff",
      metalness: 1,
      roughness: 0.2,
      emissive: "#d4af37",
      emissiveIntensity: 0.1,
    })
  }), []);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.12;
      meshRef.current.rotation.y = time * 0.18;
    }
    if (outerRef.current) {
      outerRef.current.rotation.z = -time * 0.06;
      outerRef.current.rotation.y = -time * 0.1;
    }
  });

  return (
    <Group>
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
        <Mesh 
          ref={meshRef} 
          geometry={geometries.inner} 
          material={materials.inner}
        />
        
        <Mesh ref={outerRef} geometry={geometries.outer}>
          <MeshTransmissionMaterial 
            samples={3} // Critical for FPS - keep low
            resolution={128} // Lower res = better performance, still looks premium blurred
            thickness={1}
            anisotropy={0.2}
            ior={1.1}
            distortion={0.15}
            distortionScale={0.4}
            temporalDistortion={0.05}
            color="#d4af37"
            opacity={0.3}
            transparent
            metalness={0.6}
            roughness={0.1}
          />
        </Mesh>
      </Float>
    </Group>
  );
};

const Experience: React.FC = () => {
  const mainGroup = useRef<THREE.Group>(null!);
  const { viewport } = useThree();

  useFrame((state) => {
    if (mainGroup.current) {
      // Extremely smooth 120Hz-ready lerping
      const targetX = state.mouse.x * (viewport.width / 12);
      const targetY = state.mouse.y * (viewport.height / 12);
      
      mainGroup.current.position.x = THREE.MathUtils.lerp(mainGroup.current.position.x, targetX, 0.04);
      mainGroup.current.position.y = THREE.MathUtils.lerp(mainGroup.current.position.y, targetY, 0.04);
      
      mainGroup.current.rotation.y = THREE.MathUtils.lerp(mainGroup.current.rotation.y, state.mouse.x * 0.1, 0.03);
      mainGroup.current.rotation.x = THREE.MathUtils.lerp(mainGroup.current.rotation.x, -state.mouse.y * 0.1, 0.03);
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={45} />
      <Color attach="background" args={['#050505']} />
      
      <AmbientLight intensity={0.6} />
      <PointLight position={[10, 10, 10]} intensity={50} color="#d4af37" />
      <PointLight position={[-10, -5, 0]} intensity={30} color="#ffffff" />
      
      <Group ref={mainGroup}>
        <LuxuryCore />
        <Dust />
      </Group>
    </>
  );
};

export default Experience;
