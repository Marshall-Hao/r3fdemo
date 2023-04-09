import { Effect } from "postprocessing";
import { Uniform } from "three";

// * const not writable, in :not change initial value, out: will change initial value
// * glsl ; is strict
// * inout both read and write
const fragmentShader = /* glsl */ `
  uniform float frequency;
  uniform float amplitude;
  uniform float offset;

  void mainUv(inout vec2 uv) {
    uv.y += sin(uv.x * frequency + offset) * amplitude; 
  }

  void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) 
  {
    // vec4 color = inputColor;
    // color.rgb *= vec3(0.8,1.0,0.5);
    // outputColor = color;
    outputColor = vec4(0.8, 1.0, 0.5, inputColor.a);
  }
`;

export default class DrunkEffect extends Effect {
  constructor({ frequency, amplitude, blendFunction }) {
    super("DrunkEffect", fragmentShader, {
      blendFunction: blendFunction,
      uniforms: new Map([
        ["frequency", new Uniform(frequency)],
        ["amplitude", new Uniform(amplitude)],
        ["offset", new Uniform(0)],
      ]),
    });
  }

  update(renderer, inputBuffer, deltaTime) {
    // * same as frame speed
    this.uniforms.get("offset").value += deltaTime;
  }
}
