import React, { useRef, useState, Suspense, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import styled from "styled-components";
import { BufferGeometry, Float32BufferAttribute } from "three";

const StyledCanvasWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  will-change: transform;
`;

const Stars = (props) => {
  const ref = useRef();
  const [isVisible, setIsVisible] = useState(true);
  
  // Optimize: Reduce number of stars and memoize geometry
  const sphereGeometry = useMemo(() => {
    const geometry = new BufferGeometry();
    const sphereData = random.inSphere(new Float32Array(1500), { radius: 1.2 });
    geometry.setAttribute('position', new Float32BufferAttribute(sphereData, 3));
    return geometry;
  }, []);

  // Pause animation when not visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  useFrame((state, delta) => {
    if (ref.current && isVisible) {
      // Slow down rotation for better performance
      ref.current.rotation.x -= delta / 25;
      ref.current.rotation.y -= delta / 35;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <points ref={ref} frustumCulled {...props}> 
        <primitive object={sphereGeometry} attach="geometry" />
        <PointMaterial
          attach="material" 
          transparent
          color="#f272c8"
          size={0.004}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </points>
    </group>
  );
};

const StyledStarsCanvas = () => {
  return (
    <StyledCanvasWrapper>
      <Canvas 
        camera={{ position: [0, 0, 1] }}
        gl={{ 
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: false
        }}
        frameloop="demand"
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
        <Preload all />
      </Canvas>
    </StyledCanvasWrapper>
  );
};

export default StyledStarsCanvas;
