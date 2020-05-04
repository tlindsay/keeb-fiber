precision highp float;

varying vec3 vNormal;
varying vec2 vUv;
varying vec3 vPosition;

uniform float bend;

void main() {
  vUv = uv;
  vPosition = position;
  vNormal = normal;

  vPosition.z = sin(position.y * (bend * 4.0));
  gl_Position = projectionMatrix * modelViewMatrix * vec4(vPosition, 1.0);
}
