// https://medium.com/@joshmarinacci/water-ripples-with-vertex-shaders-6a9ecbdf091f
uniform float time;
uniform float bend;

out vec3 vNormal;
out vec2 vUv;
out vec3 vPosition;
out vec3 vViewPos;

vec3 wave(vec3 pos, float amp, float time, float decay) {
  float dx = pos.x;
  float dy = pos.y;
  float freq = sqrt(dx*dx + dy*dy) * 6.0;
  float dist = distance(vec3(0.0), pos) * decay;
  pos.z += amp * exp(-dist * decay) * sin(-time * 10.0 + freq);
  return pos;
}
vec3 waveNorm(vec3 pos, float amp, float time, float decay) {
  float dx = pos.x;
  float dy = pos.y;
  float freq = sqrt(dx*dx + dy*dy) * 6.0;
  float dist = distance(vec3(0.0), pos);
  return normalize(vec3(0.0, -amp * -dist * cos(-time * 10.0 + freq), 1.0));
}

void main() {
  vec3 transformed = wave(position, 0.1, time, bend * 2.0);
  vec3 objectNormal = waveNorm(position, 0.1, time, bend * 2.0);

  vec4 pos = vec4(transformed, 1.0);
  vec4 mpos = modelViewMatrix * pos;

  vPosition = transformed;
  vUv = uv;
  vNormal = normalMatrix * objectNormal;
  vViewPos = -mpos.xyz;
  gl_Position = projectionMatrix * mpos;
}

