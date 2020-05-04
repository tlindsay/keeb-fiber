#pragma glslify: faceNormal = require('glsl-face-normal');
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vViewPos;

void main() {
  vec3 color = faceNormal(vViewPos);
  gl_FragColor = vec4(color, 1.0);
}
