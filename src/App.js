import React, { useEffect, useRef, useState } from 'react';
import { useMidiInputs, useMidiNotes } from 'react-riffs';
import { Canvas, Dom } from 'react-three-fiber';
import { makeNoise4D } from 'open-simplex-noise';
import Box from './components/Box';
import './styles/App.css';

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
