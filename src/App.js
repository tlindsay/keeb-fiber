import React, { useEffect, useRef, useState } from 'react';
import { useMidiInputs, useMidiNotes, usePitchBend } from 'react-riffs';
import { Canvas, Dom, useFrame } from 'react-three-fiber';
import { makeNoise4D } from 'open-simplex-noise';
import './App.css';

function Box(props) {
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

function App() {
  const [midiInput] = useMidiInputs({ debug: false });
  const notes = useMidiNotes(midiInput);
  const [boxes, setBoxes] = useState([]);
  const { current: noise4d } = useRef(makeNoise4D(Date.now()));

  useEffect(() => {
    setBoxes(notes.map(n => {
      let mod = noise4d(...n.data, n.note.number);
      let pos = Array.from(n.data);

      return {
        k: n.note.number,
        p: pos.map(d => d/10 * mod)
      };
    }));
  }, [notes, noise4d]);

  return (
    <Canvas>
      <Dom>
        <h1>yo 🛹</h1>
      </Dom>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {boxes.map(({k, p}) => <Box key={k} position={p} midiInput={midiInput} />)}
    </Canvas>
  );
}

export default App;
