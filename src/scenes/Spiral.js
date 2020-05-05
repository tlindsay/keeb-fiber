import React, { useEffect, useRef, useState } from 'react';
import * as Three from 'three';
import { Dom, useFrame } from 'react-three-fiber';
import { useMidiInputs, usePitchbend } from 'react-riffs';
import OrbitControls from '../components/OrbitControls';

import fragmentShader from '../shaders/spiralFrag2.glsl';
import vertexShader from '../shaders/standardVert.glsl';

export default function Spiral(props) {
  let [midiInput] = useMidiInputs();
  let bend = usePitchbend(midiInput);
  let [stepThreshold, setThreshold] = useState(0.5);
  const shader = {
    fragmentShader,
    vertexShader,
    uniforms: {
      stepThreshold: { type: 'f', value: stepThreshold }
    }
  };

  let mesh = useRef();
  useFrame(() => {
    mesh.current.rotation.y += 0.01;
    mesh.current.scale.y = (bend + 1);
  });

  useEffect(() => { setThreshold((bend - 1) / -2) }, [bend]);

  return (
    <>
      <Dom prepend={true}>
        <div>
          <input
            type="number"
            value={stepThreshold}
            onChange={e => setThreshold(e.target.value)}
          />
        </div>
        <input
          type="range"
          value={stepThreshold}
          min={0}
          max={1}
          step={0.01}
          onChange={e => setThreshold(e.target.value)}
        />
      </Dom>
      <OrbitControls />
      <gridHelper />
      <ambientLight />
      <mesh ref={mesh}>
        <sphereBufferGeometry attach="geometry" args={[2, 64, 64]} />
        <shaderMaterial
          args={[shader]}
          attach="material"
          side={Three.DoubleSide}
        />
      </mesh>
    </>
  );
}
