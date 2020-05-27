import React, { useEffect, useRef, useState } from 'react';
import { useFrame } from 'react-three-fiber';
import { HTML, OrbitControls, TransformControls } from 'drei';
import * as Three from 'three';
import { useMidiInputs, usePitchbend } from 'react-riffs';

import fragmentShader from '../shaders/standardFrag.glsl';
import vertexShader from '../shaders/rippleDecay.glsl';

const { DoubleSide } = Three;

export default function(props) {
  const shader = {
    uniforms: {
      bend: { type: 'f', value: 0 },
      time: { type: 'f', value: 0 }
    },
    fragmentShader,
    vertexShader,
    side: DoubleSide
  };

  const control = useRef();
  useEffect(() => control.current.setMode("rotate"), []);

  const [time, setTime] = useState(0);
  useFrame(({ clock }) => setTime(clock.elapsedTime));

  const [midiInput] = useMidiInputs();
  const bend = usePitchbend(midiInput);

  return (
    <>
      <OrbitControls />
      <TransformControls ref={control}>
        <mesh rotation={[-(Math.PI / 2), 0, 0]}>
          <HTML style={{ color: 'white' }}>{bend}</HTML>
          <planeBufferGeometry attach="geometry" args={[5, 5, 50, 100]} />
          <shaderMaterial
            attach="material"
            args={[shader]}
            uniforms-time-value={time}
            uniforms-bend-value={bend}
          />
        </mesh>
      </TransformControls>
    </>
  );
}
