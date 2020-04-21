varying vec2 vUv;

uniform vec3 color1;
uniform vec3 color2;
uniform float bend;

void main() {
  float degToRad = 0.01745329;
  float colorMix = vUv.y - vUv.x + bend;

  gl_FragColor.a = 1.0;
  gl_FragColor.rgb = mix(color1, color2, colorMix);
}
