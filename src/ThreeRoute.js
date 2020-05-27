import React from 'react';
import { Route, useParams } from 'react-router-dom';
import { Canvas } from 'react-three-fiber';

export default async function ThreeRoute({ ...rest }) {
  const { id = 'scratch' } = useParams();
  const Component = await import(`./scenes/${id}`);
  return (
    <Route {...rest} render={(props) =>
      <>
        <Canvas
          camera={{ position: [1, 1, 3] }}
          gl2={true}
          {...props}
        >
          <color attach="background" args={['lightblue']} />
          <Component {...props}/>
        </Canvas>
      </>
    }/>
  );
}
