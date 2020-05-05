precision highp float;

#pragma glslify: aastep = require('glsl-aastep');

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
uniform float stepThreshold;

float plot(vec2 st, float pct) {
  return smoothstep(pct - stepThreshold, pct, st.y) -
         smoothstep(pct, pct + stepThreshold, st.y);
}

void main() {
  vec3 color = vec3(vUv.x, vUv.y, vUv.y);
  vec3 green = vec3(0.0, 1.0, 0.0);
  float line = plot(mod(vUv.xy * 6.0, 1.0), vUv.x);
  float coord = vUv.y;

  /* color -= color*line; */
  /* color += line*green; */

  /* color = green; */

  float w = gl_FragCoord.w;
  float x = vPosition.x * w;
  float y = vPosition.y * w;
  float z = vPosition.z * w;
  gl_FragColor = vec4(x, y, z, 1.0);

  if ((aastep(line, stepThreshold) + coord) < 0.1) discard;
}
