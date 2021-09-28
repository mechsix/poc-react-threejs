import React, { useRef, useState } from 'react';
import { Mesh } from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import './App.css';

const Box: React.FC = () => {
  const ref = useRef<Mesh>();
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame(() => {
    if (ref?.current !== undefined) {
      ref.current.rotation.x += 0.01;
    }
  });

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <mesh
      ref={ref}
      scale={active ? 1.5 : 1}
      onClick={handleClick}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
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
