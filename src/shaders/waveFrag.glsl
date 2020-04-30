varying vec2 vUv;

uniform vec3 color1;
uniform vec3 color2;
uniform float clock;

void main() {
  float degToRad = 0.01745329;
  float colorMix = vUv.y - vUv.x + cos(clock / 1000.0);

  vec3 color = mix(color1, color2, colorMix);

  gl_FragColor.a = 1.0;
  gl_FragColor.rgb = color;
}
