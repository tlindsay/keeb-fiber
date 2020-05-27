import * as Three from 'three';
import random from 'random';

const {
  Vector3
} = Three;

function randomVector(min = -1, max = 1, offset = 1) {
  return new Vector3(
    random.float(min, max) * offset,
    random.float(min, max) * offset,
    random.float(min, max) * offset
  );
}

function hsl(h, s, l) {
  return `hsl(${h}, ${s}%, ${l}%)`;
}

export {
  randomVector,
  hsl
};
