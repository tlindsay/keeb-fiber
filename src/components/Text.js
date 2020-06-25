import React, { useState, useMemo } from 'react';
import * as Three from 'three';
import fantasque from '../fonts/fantasque';

const { FontLoader } = Three;

export default function Text({ children, vAlign = 'center', hAlign = 'center', size = 1, color = '#000000', position, ...props }) {
  const [font] = useState(() => new FontLoader().parse(fantasque));
  const textConfig = useMemo(
    () => ({
      font,
      size: 1,
      height: 1,
      curveSegments: 32
    }),
    [font]
  );

  return (
    <mesh>
      <textGeometry attach="geometry" position={position} args={[children, textConfig]} />
      <meshNormalMaterial attach="material" side={Three.DoubleSide} />
    </mesh>
  );
}
