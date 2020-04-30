precision highp float;

varying vec2 vUv;
uniform float bend;

void main() {
  vUv = uv;
  vec3 pos = position;
  pos.z = sin(position.y * (bend * 4.0));
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
