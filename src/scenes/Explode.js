import React, { useState } from 'react';
import { Dom, useFrame, useUpdate } from 'react-three-fiber';
import { OrbitControls } from 'drei';
import * as Three from 'three';
import random from 'random';
import { useMidiInputs, usePitchbend } from 'react-riffs';

import fragmentShader from '../shaders/expFrag.glsl';
import vertexShader from '../shaders/expVert.glsl';

const { BackSide, BufferAttribute, DoubleSide, Vector3 } = Three;

const randomUnitVector = () => {
  return new Vector3(
    random.float(-1, 1),
    random.float(-1, 1),
    random.float(-1, 1)
  ).normalize().toArray();
}

export default function(props) {
  const shader = {
    uniforms: {
      explosion: { type: "f", value: 1.0 }
    },
    fragmentShader,
    vertexShader,
    side: DoubleSide
  };

  const [midiInput] = useMidiInputs();
  const bend = usePitchbend(midiInput);

  const ref = useUpdate((geometry) => {
    const positions = geometry.getAttribute("position");
    const triangleCount = positions.count / 3;

    const randomDirections = [];
    const randomStrengths = [];
    for (let i = 0; i < triangleCount; i++) {
      // Get a random unit vector
      const dir = randomUnitVector();

      // Triplicate it and turn into a flat list of x, y, z, x, y, z...
      const directions = [dir, dir, dir].flat();

      // Concat into array
      randomDirections.push(...directions);

      // Do the same but with the 1 random strength float
      const str = random.float();
      randomStrengths.push(str, str, str);
    }

    // Define the attributes
    const randomDirectionsAttribute = new BufferAttribute(
      new Float32Array(randomDirections),
      3
    );
    geometry.addAttribute("randomDirection", randomDirectionsAttribute);

    const randomStrengthsAttribute = new BufferAttribute(
      new Float32Array(randomStrengths),
      1
    );
    geometry.addAttribute("randomStrength", randomStrengthsAttribute);
  }, []);

  return (
    <>
      <OrbitControls />
      <gridHelper />
      <mesh>
        <icosahedronBufferGeometry ref={ref} attach="geometry" args={[1, 4]} />
        <shaderMaterial
          attach="material"
          args={[shader]}
          uniforms-explosion-value={Math.abs(bend)}
        />
      </mesh>
    </>
  );
}
