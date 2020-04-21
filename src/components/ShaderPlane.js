import React from 'react';
import * as Three from 'three';

import { usePitchBend } from 'react-riffs';
import niceColors from 'nice-color-palettes';

import fragmentShader from '../shaders/waveFrag.glsl';
import vertexShader from '../shaders/standardVert.glsl';

export default function ShaderPlane(props) {
  const shader = {
    uniforms: {
      color1: { type: "vec3", value: new Three.Color(0x000000) },
      color2: { type: "vec3", value: new Three.Color(0xffffff)},
      bend: { type: "f", value: 0.5 }
    },
    fragmentShader,
    vertexShader
  };

  let bend = usePitchBend(props.midiInput);
  let [color1, color2] = niceColors[6];

  return (
    <mesh {...props}>
      <planeBufferGeometry attach="geometry" args={[5, 5, 5]} />
      <shaderMaterial
        attach="material"
        args={[shader]}
        uniforms-color1-value={color1}
        uniforms-color2-value={color2}
        uniforms-bend-value={bend}
      />
    </mesh>
  );
}
