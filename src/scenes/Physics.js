import React, { useState, useEffect } from 'react';
import { Dom, useFrame } from 'react-three-fiber';
import { useMidiInputs, useNote } from 'react-riffs';
import { OrbitControls } from 'drei';
import { Physics } from 'use-cannon';
import * as Three from 'three';
import Box from '../components/Box';
import Plane from '../components/PhysicsPlane';
import { hsl } from '../utils';

export default function() {
  const [midiInput] = useMidiInputs();
  const [note, isOn] = useNote(midiInput);
  const [boxes, setBoxes] = useState([]);
  const geometry = new Three.BoxBufferGeometry(1, 1, 1);

  useEffect(() => {
    let color = 'pink';
    if (note.data) color = hsl(...note.data);
    if (isOn) setBoxes([...boxes, <Box geometry={geometry} color={color} />]);
  }, [note, isOn, boxes, geometry]);

  useFrame(({ clock }) => {

  });

  return (
    <Physics>
      <OrbitControls />
      <hemisphereLight intensity={0.35} />
      <spotLight
        position={[5, 5, 5]}
        angle={0.3}
        penumbra={1}
        intensity={2}
        castShadow
        shadow-mapSize-width={256}
        shadow-mapSize-height={256}
      />
      {boxes}
      <Plane />
    </Physics>
  );
}
