import React, {useEffect, useRef, useState} from 'react';
import {Mesh, MeshBasicMaterial, MeshStandardMaterial, TextureLoader, CanvasTexture} from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import GrassImage from './material/grass.jpg';
import './App.css';

const Box: React.FC = () => {
  const ref = useRef<Mesh>();
  const [active, setActive] = useState(false);

  const loader = new TextureLoader();
  const grassMaterial = new MeshStandardMaterial({
    map: loader.load(GrassImage),
    roughness: 0.5,
    metalness: 0.7,
  })

  const solidOrangeMaterial = new MeshStandardMaterial({
    color: 'orange',
    roughness: 0.5,
    metalness: 0.7,
  })

  useFrame(() => {
    if (ref?.current !== undefined) {
      ref.current.rotation.x += 0.003;
      ref.current.rotation.y += 0.003;
      ref.current.rotation.z += 0.002;
    }
  });

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <mesh
      ref={ref}
      scale={1}
      onClick={handleClick}
      material={active ? grassMaterial : solidOrangeMaterial}
    >
      <icosahedronGeometry args={[2, 1]} />
    </mesh>
  );
};

const App: React.FC = () => (
  <Canvas>
    <ambientLight />
    <pointLight position={[10, 10, 10]} />
    <Box/>
  </Canvas>
);

export default App;
