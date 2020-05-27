uniform float time;

out vec3 vNormal;
out vec2 vUv;
out vec3 vPosition;
out vec3 vViewPos;

void main() {
  vec3 transformed = position;
  float freq = 3.0;
  float amp = 0.5;
  float angle = (time + position.x) * freq;
  transformed.z += sin(angle) * amp;

  vec4 pos = vec4(transformed, 1.0);
  vec4 mpos = modelViewMatrix * pos;

  vPosition = transformed;
  vUv = uv;
  vNormal = normalMatrix * normalize(vec3(-amp * freq * cos(angle), 0.0, 1.0));
  vViewPos = -mpos.xyz;
  gl_Position = projectionMatrix * mpos;
}

