import React, { useEffect, useRef, useState } from 'react';
import { useFrame } from 'react-three-fiber';
import { usePitchBend } from 'react-riffs';

export default function Box(props) {
  const mesh = useRef();
  const bend = usePitchBend(props.midiInput);
  const [color, setColor] = useState('255,204,204');

  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

  useEffect(() => {
    setColor(props.position.map(p => Math.round(Math.abs((p + (bend * 10)) * 10))).join(','));
  }, [props.position, bend]);

  return (
    <mesh
      {...props}
      ref={mesh}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color={`rgb(${color})`} />>
    </mesh>
  );
}

