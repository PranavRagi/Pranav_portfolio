import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import styled from "styled-components";
import { BufferGeometry, Float32BufferAttribute } from "three";

const StyledCanvasWrapper = styled.div`
  width: 100%;
  height: auto;
  position: absolute;
  inset: 0;
  z-index: 0; /* Ensure it's behind other content */
  pointer-events: none; /* Allow mouse events (like scrolling) to pass through */
`;

const Stars = (props) => {
  const ref = useRef();
  const sphereGeometry = new BufferGeometry();
  const [sphereData] = useState(() =>
    random.inSphere(new Float32Array(5000), { radius: 1.2 })
  );
  sphereGeometry.setAttribute(
    'position',
    new Float32BufferAttribute(sphereData, 3)
  );

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <points ref={ref} frustumCulled {...props}> 
        <bufferGeometry attach="geometry" {...sphereGeometry} /> 
        <PointMaterial
          attach="material" 
          transparent
          color="#f272c8"
          size={0.002}
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
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
        <Preload all />
      </Canvas>
    </StyledCanvasWrapper>
  );
};

export default StyledStarsCanvas;
