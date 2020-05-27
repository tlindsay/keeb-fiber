import React, { useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import { useBox } from 'use-cannon';
import * as Three from 'three';

export default function Box({ color = 'pink', position = [0, 5, 0], geometry = new Three.BoxBufferGeometry(1, 1, 1) }) {
  const [mesh] = useBox(() => ({ mass: 1, position }))

  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

  return (
    <mesh
      ref={mesh}
      geometry={geometry}
    >
      <meshLambertMaterial attach="material" color={color} />
    </mesh>
  );
}

