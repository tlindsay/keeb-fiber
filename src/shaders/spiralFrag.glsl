precision highp float;

#pragma glslify: aastep = require('glsl-aastep');

varying vec2 vUv;
uniform float stepThreshold;

float plot(vec2 st, float pct) {
  return smoothstep(pct - stepThreshold / 10.0, pct, st.y) -
         smoothstep(pct, pct + stepThreshold / 10.0, st.y);
}

void main() {
  vec3 red = vec3(vUv.x, vUv.y, vUv.y);
  vec3 blue = vec3(vUv.y, vUv.x, vUv.x);
  float diff = abs(vUv.x - sin(vUv.y * 6.0));
  vec3 color = (diff > 0.5) ? red : blue;

  float y = vUv.x;
  float pct = plot(vUv.xy, y);
  color = (1.0 - pct)*color + pct*vec3(0.0, 1.0, 0.0);

  /* if (vUv.x == aastep(stepThreshold, 0.0)) color = vec3(0.0, 1.0, 0.0); */
  if (vUv.y == aastep(stepThreshold, 0.0)) color = vec3(1.0, 1.0, 0.0);
  gl_FragColor = vec4(color, 1.0);
  if (aastep(stepThreshold, diff) == 0.0) discard;
}
