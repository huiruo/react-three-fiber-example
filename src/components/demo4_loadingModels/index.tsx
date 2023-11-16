import React, { Suspense } from 'react';
import * as THREE from "three";
import { Canvas, useLoader } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { DDSLoader } from "three-stdlib";

THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());

const Scene = () => {
  const materials = useLoader(MTLLoader, "Poimandres.mtl");
  const obj = useLoader(OBJLoader, "Poimandres.obj", (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });

  console.log('Scene:', obj);
  return <primitive object={obj} scale={0.4} />;
};

export const LoadingModels: React.FC = () => {
  return (
    <div style={{ height: '1000px', width: '1000px', background: '#ffeb3b' }}>
      <Canvas>
        <Suspense fallback={null}>
          <Scene />
          <OrbitControls />
          <Environment preset="sunset" background />
        </Suspense>
      </Canvas>
    </div>
  );
};
