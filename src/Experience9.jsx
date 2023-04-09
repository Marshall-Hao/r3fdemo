import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import { Perf } from "r3f-perf";
import {
  EffectComposer,
  Vignette,
  Glitch,
  Noise,
  Bloom,
  DepthOfField,
  SSR,
} from "@react-three/postprocessing";
// * can install postprocessing self
import { BlendFunction, GlitchMode } from "postprocessing";
import { useControls } from "leva";

export default function Experience9() {
  const cube = useRef();

  useFrame((state, delta) => {
    cube.current.rotation.y += delta * 0.2;
  });

  const ssrProps = useControls("SSR Effect", {
    temporalResolve: true,
    STRETCH_MISSED_RAYS: true,
    USE_MRT: true,
    USE_NORMALMAP: true,
    USE_ROUGHNESSMAP: true,
    ENABLE_JITTERING: true,
    ENABLE_BLUR: true,
    temporalResolveMix: { value: 0.9, min: 0, max: 1 },
    temporalResolveCorrectionMix: {
      value: 0.25,
      min: 0,
      max: 1,
    },
    maxSamples: { value: 0, min: 0, max: 1 },
    resolutionScale: { value: 1, min: 0, max: 1 },
    blurMix: { value: 0.5, min: 0, max: 1 },
    blurKernelSize: { value: 8, min: 0, max: 8 },
    blurSharpness: { value: 0.5, min: 0, max: 1 },
    rayStep: { value: 0.3, min: 0, max: 1 },
    intensity: { value: 1, min: 0, max: 5 },
    maxRoughness: { value: 0.1, min: 0, max: 1 },
    jitter: { value: 0.7, min: 0, max: 5 },
    jitterSpread: { value: 0.45, min: 0, max: 1 },
    jitterRough: { value: 0.1, min: 0, max: 1 },
    roughnessFadeOut: { value: 1, min: 0, max: 1 },
    rayFadeOut: { value: 0, min: 0, max: 1 },
    MAX_STEPS: { value: 20, min: 0, max: 20 },
    NUM_BINARY_SEARCH_STEPS: { value: 5, min: 0, max: 10 },
    maxDepthDifference: { value: 3, min: 0, max: 10 },
    maxDepth: { value: 1, min: 0, max: 1 },
    thickness: { value: 10, min: 0, max: 10 },
    ior: { value: 1.45, min: 0, max: 2 },
  });

  return (
    <>
      {/* // * the default is transparent */}
      <color args={["#ffffff"]} attach="background"></color>
      <Perf position="top-left"></Perf>
      <OrbitControls makeDefault />
      {/* // * effect pass merge together */}
      <EffectComposer
        // * prevent aliasing effect
        multisampling={4}
      >
        {/* // * dark in the corner */}
        {/* <Vignette
          offset={0.3}
          darkness={0.9}
          // * blend effect together
          blendFunction={BlendFunction.NORMAL}
        ></Vignette> */}
        {/* <Glitch
          // * when time to happen
          delay={[0.5, 1]}
          duration={[0.1, 0.3]}
          strength={[0.2, 0.4]}
          // * the way how glitching
          mode={GlitchMode.CONSTANT_WILD}
        ></Glitch> */}
        {/* <Noise
          // * blend noise effect
          blendFunction={BlendFunction.SOFT_LIGHT}
          // * noise blend with color first , then the effect
          premultiply
        ></Noise> */}
        {/* <Bloom
          // * glow around the brightness
          mipmapBlur
          intensity={0.5}
          luminanceThreshold={0}
        ></Bloom> */}
        {/* <DepthOfField
          // * 斗鸡眼效果
          focusDistance={0.025}
          focalLength={0.025}
          bokehScale={6}
        ></DepthOfField> */}
        {/* <SSR {...ssrProps}></SSR> */}
      </EffectComposer>
      <directionalLight
        position={[1, 2, 3]}
        intensity={1.5}
      />
      <ambientLight intensity={0.5} />
      <mesh position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>
      <mesh ref={cube} position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial
          // * color too far
          // color={[5, 2, 1]}
          color="mediumpurple"
          // * the glow color
          // emissive="mediumpurple"
          // emissiveIntensity={2}
          // * no toneMapping,no hdr -> ldr, 0 ~ 1
          toneMapped={false}
        />
      </mesh>
      <mesh
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={10}
      >
        <planeGeometry />
        <meshStandardMaterial
          color="greenyellow"
          // metalness={0}
          // roughness={0}
        />
      </mesh>
    </>
  );
}
