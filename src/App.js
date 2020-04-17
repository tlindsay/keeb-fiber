import React, { useEffect, useRef, useState } from 'react';
import { useMidiInputs } from 'react-midi-context';
import { Canvas, useFrame } from 'react-three-fiber';
import './App.css';

function Box(props) {
  const mesh = useRef();
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={e => setActive(!active)}
      onPointerOver={e => setHover(true)}
      onPointerOut={e => setHover(false)}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color={hovered ? 'hotpink' : 'skyblue'} />>
    </mesh>
  );
}

function App() {
  const [midiInput] = useMidiInputs({ debug: true });
  const [boxes, setBoxes] = useState([]);

  useEffect(() => {
    midiInput.addListener('noteon', 'all', (e) => {
      // setBoxes(prevBoxes => [...prevBoxes, <Box position])
    });
  })

  return (
    <>
      yo 🛹
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
      </Canvas>
    </>
  )
}

export default App;
