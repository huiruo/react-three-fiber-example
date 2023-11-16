import React, { useState } from 'react';
import { Canvas, useFrame } from "@react-three/fiber"

function MyRotatingBox() {
  const myMesh = React.useRef<any>();
  const [active, setActive] = useState(false);

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    myMesh.current.rotation.x = a;
  });

  return (
    <mesh
      scale={active ? 2 : 1}
      onClick={() => setActive(!active)}
      ref={myMesh}
    >
      <boxGeometry />
      {/* <meshPhongMaterial color="royalblue" /> */}
      <meshPhongMaterial color="red" />
    </mesh>
  );
}

export const Demo3EventsInteraction: React.FC = () => {
  return (
    <div style={{ height: '600px', width: '600px', background: '#ffeb3b' }}>
      <Canvas>
        <MyRotatingBox />
        <ambientLight intensity={0.1} />
        <directionalLight />
      </Canvas>
    </div>
  );
};
