varying vec3 vNormal;
varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vViewPos;

void main() {
  vec4 pos = vec4(position, 1.0);
  vec4 mpos = modelViewMatrix * pos;

  vPosition = position;
  vUv = uv;
  vNormal = normal;
  vViewPos = -mpos.xyz;
  gl_Position = projectionMatrix * mpos;
}

