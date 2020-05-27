in vec3 vOriginalPosition;
uniform float explosion;

void main() {
  vec3 color = normalize(vOriginalPosition) *(explosion) + 0.5;

  gl_FragColor = vec4(color, 1.0);
}
