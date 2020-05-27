uniform float time;
uniform float bend;

out vec3 vNormal;
out vec2 vUv;
out vec3 vPosition;
out vec3 vViewPos;

// https://medium.com/@joshmarinacci/water-ripples-with-vertex-shaders-6a9ecbdf091f

void main() {
  vec3 transformed = position;
  float dx = position.x;
  float dy = position.y;
  float freq = sqrt(dx*dx + dy*dy); // Pythag?
  float amp = 0.1;
  float angle = -time * 5.0 + freq * 6.0;
  transformed.z += sin(angle) * amp;

  vec3 objectNormal = normalize(vec3(0.0, -amp * freq * cos(angle), 1.0));

  vec4 pos = vec4(transformed, 1.0);
  vec4 mpos = modelViewMatrix * pos;

  vPosition = transformed;
  vUv = uv;
  vNormal = normalMatrix * objectNormal;
  vViewPos = -mpos.xyz;
  gl_Position = projectionMatrix * mpos;
}

