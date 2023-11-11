import React from 'react';
import { Canvas, useFrame } from "@react-three/fiber"


const HelloThree1: React.FC = () => {
  return (
    <div id="canvas-container">
    <Canvas>
      <ambientLight intensity={0.1} />
      <directionalLight color="red" position={[0, 0, 5]} />
      <mesh>
        <boxGeometry />
        <meshStandardMaterial />
      </mesh>
    </Canvas>
    </div>
  );
};

export default HelloThree1;