precision highp float;

varying vec2 vUv;
varying vec3 vPosition;

void main() {
  const float R = 1.5;
  vec2 pos = vPosition.xy;

  float r = length(pos);
  float phi = atan(pos.y, pos.x);

  phi += 100.0 * r/R + 10.0;

  pos = r * vec2(cos(phi), sin(phi));

  if (r <= R) {
    vec2 tex = pos / (2.0 * R);
    gl_FragColor = vec4(tex, vPosition.z, 1.0);
  } else {
    gl_FragColor = vec4(pos, vPosition.z, 1.0);
  }
}
