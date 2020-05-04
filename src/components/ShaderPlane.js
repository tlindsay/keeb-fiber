import React from 'react';
import * as Three from 'three';
import { useUpdate } from 'react-three-fiber';

import { usePitchbend, useClock } from 'react-riffs';
import niceColors from 'nice-color-palettes';

import fragmentShader from '../shaders/waveFrag.glsl';
import vertexShader from '../shaders/bendVert.glsl';

const { DoubleSide } = Three;

export default function ShaderPlane(props) {
  const shader = {
    uniforms: {
      color1: { type: "vec3", value: new Three.Color(0x000000) },
      color2: { type: "vec3", value: new Three.Color(0xffffff)},
      clock: { type: "f", value: 0.0 },
      bend: { type: "f", value: 0.5 }
    },
    fragmentShader,
    vertexShader
  };

  let bend = usePitchbend(props.midiInput);
  let [clock] = useClock(props.midiInput);
  let [color1, color2] = niceColors[6];

  let mesh = useUpdate((geometry) => {
    let modClock = clock / 1000;
    geometry.rotation.x = Math.sin(modClock);
    geometry.rotation.y = bend;
  }, [bend, clock]);

  return (
    <mesh
      {...props}
      ref={mesh}
    >
      <planeBufferGeometry attach="geometry" args={[5, 5, 5, 100]} />
      <shaderMaterial
        attach="material"
        args={[shader]}
        side={DoubleSide}
        uniforms-color1-value={color1}
        uniforms-color2-value={color2}
        uniforms-bend-value={bend}
        uniforms-clock-value={clock}
      />
    </mesh>
  );
}
