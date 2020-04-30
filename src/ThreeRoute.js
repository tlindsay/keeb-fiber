import React from 'react';
import { Route } from 'react-router-dom';
import { Canvas } from 'react-three-fiber';

export default function ThreeRoute({ component: Component, ...rest }) {
  return (
    <Route {...rest} render={(props) =>
      <Canvas
        camera={{ position: [1, 1, 3] }}
        style={{ background: 'cyan' }}
        gl2={true}
        {...props}
      >
        <Component {...props}/>
      </Canvas>
    }/>
  );
}
