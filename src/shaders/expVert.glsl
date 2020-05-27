uniform float explosion;

attribute vec3 randomDirection;
attribute float randomStrength;

out vec3 vOriginalPosition;

void main () {
  vOriginalPosition = position.xyz;

  vec3 pos = position.xyz;

  pos += randomDirection * randomStrength * explosion;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos.xyz, 1.0);
}
