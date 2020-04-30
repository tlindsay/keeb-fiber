import React, { useEffect, useRef, useState } from 'react';
import * as riffs from 'react-riffs';
import { Dom } from 'react-three-fiber';
import { makeNoise4D } from 'open-simplex-noise';
import OrbitControls from '../components/OrbitControls';
import Box from '../components/Box';
import ShaderPlane from '../components/ShaderPlane';
import Text from '../components/Text';
import '../styles/App.css';

const { useMidiInputs, useNotes: useMidiNotes } = riffs;

function Scratch() {
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
    <>
      <Dom>
        <h1>yo 🛹</h1>
      </Dom>
      <Text position={[3, 3, 4]}>Thomas Patrick Lindsay</Text>
      <OrbitControls />
      <axesHelper />
      <gridHelper />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {boxes.map(({k, p}) => <Box key={k} position={p} midiInput={midiInput} />)}
      <ShaderPlane position={[0, 0, -2]} midiInput={midiInput} />
    </>
  );
}

export default Scratch;
