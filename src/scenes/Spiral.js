import React, { useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import OrbitControls from '../components/OrbitControls';

export default function Spiral(props) {
  let mesh = useRef();
  useFrame(() => (mesh.current.rotation.y += 0.01));

  return (
    <>
      <OrbitControls />
      <gridHelper />
      <mesh ref={mesh}>
        <sphereBufferGeometry attach="geometry" args={[2, 64, 64]} />
        <meshNormalMaterial attach="material" wireframe={true} />
      </mesh>
    </>
  );
}
