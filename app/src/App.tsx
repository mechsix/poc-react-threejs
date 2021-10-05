import React, {useRef} from 'react';
import {
  Mesh,
  Camera,
  Scene,
  MeshStandardMaterial,
  TextureLoader,
} from 'three';
import {
  useFrame,
} from '@react-three/fiber';
import {
  PerspectiveCamera,
  OrbitControls,
  useFBO,
} from '@react-three/drei';
import GrassImage from './material/grass.jpg';
import './App.css';

interface BoxProps {
  position: [x: number, y: number, z: number]
}

const Box: React.FC<BoxProps> = (props) => {
  const {position} = props
  const ref = useRef<Mesh>();

  const loader = new TextureLoader();
  const grassMaterial = new MeshStandardMaterial({
    map: loader.load(GrassImage),
    roughness: 0.5,
    metalness: 0.7,
  })

  useFrame(() => {
    if (ref?.current !== undefined) {
      ref.current.rotation.x += 0.003;
      // ref.current.rotation.y += 0.003;
      // ref.current.rotation.z += 0.002;
    }
  });

  return (
    <mesh
      position={position}
      ref={ref}
      scale={1}
      material={grassMaterial}
    >
      <boxGeometry args={[2, 2, 2]} />
    </mesh>
  );
};

const App: React.FC = () => {
  const virtualCamera = React.useRef<Camera>()
  const fbo = useFBO(150, 150)
  const [virtualScene] = React.useState(() => new Scene())

  useFrame(({ gl }) => {
    if (virtualCamera.current) {
      gl.setRenderTarget(fbo)
      gl.render(virtualScene, virtualCamera.current)

      gl.setRenderTarget(null)
    }
  })

  return (
    <>
      <PerspectiveCamera ref={virtualCamera} />
      <ambientLight />
      <pointLight position={[0, 0, 10]} />
      <Box position={[-3, 0, 3]}/>
      <Box position={[0, 0, -3]}/>
      <Box position={[3, 0, 0]}/>
      <OrbitControls
        camera={virtualCamera.current}
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
      />
    </>
  );
}

export default App;
