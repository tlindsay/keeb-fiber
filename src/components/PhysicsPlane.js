import React from 'react';
import { usePlane } from 'use-cannon';

function Plane(props) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));
  const { color = 'lightblue' } = props;
  return (
    <mesh ref={ref}>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial attach="material" color={color}/>
    </mesh>
  );
}

export default Plane;
