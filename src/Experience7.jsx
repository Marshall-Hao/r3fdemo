import {
  useGLTF,
  useTexture,
  OrbitControls,
  Center,
  Sparkles,
  shaderMaterial,
} from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";

import portalVertexShader from "./shaders/portal/vertex.glsl";
import portalFragmentShader from "./shaders/portal/fragment.glsl";
import { Color } from "three";

import { useRef } from "react";

const PortalSMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new Color("#ffffff"),
    uColorEnd: new Color("#000000"),
  },
  portalVertexShader,
  portalFragmentShader
);

// * good for multiple use
extend({ PortalSMaterial });

export default function Experience7() {
  const { nodes } = useGLTF("./model/portal.glb");
  // * contain all the mesh nodes
  // console.log(nodes);

  // * import texture
  const bakedTexture = useTexture("./model/baked.jpg");
  console.log(bakedTexture);
  // * texture y coordinates that need to be flipped.,its reversed as the browser,let it not fliped
  bakedTexture.flipY = false;

  const portalSMaterial = useRef();
  useFrame((state, delta) => {
    portalSMaterial.current.uTime += delta;
  });

  return (
    <>
      {/* // *attach scene.background */}
      <color args={["#030202"]} attach="background"></color>
      <OrbitControls makeDefault />
      <Center>
        <mesh geometry={nodes.baked.geometry}>
          <meshBasicMaterial
            map={bakedTexture}
            // map-flipY={false}
          ></meshBasicMaterial>
        </mesh>

        <mesh
          geometry={nodes.poleLightA.geometry}
          // * use the color from it self
          position={nodes.poleLightA.position}
        >
          <meshBasicMaterial color="#ffffe5"></meshBasicMaterial>
        </mesh>

        <mesh
          geometry={nodes.poleLightB.geometry}
          // * use the position from it self
          position={nodes.poleLightB.position}
        >
          <meshBasicMaterial color="#ffffe5"></meshBasicMaterial>
        </mesh>

        <mesh
          geometry={nodes.portalLight.geometry}
          position={nodes.portalLight.position}
          // * use the rotation from itself
          rotation={nodes.portalLight.rotation}
        >
          {/* <meshBasicMaterial color="#ffffff" /> */}
          {/* <shaderMaterial
            vertexShader={portalVertexShader}
            fragmentShader={portalFragmentShader}
            uniforms={{
              uTime: { value: 0 },
              uColorStart: { value: new Color("#ffffff") },
              uColorEnd: { value: new Color("#000000") },
            }}
          ></shaderMaterial> */}
          // * extend has to be camelCase
          <portalSMaterial
            ref={portalSMaterial}
          ></portalSMaterial>
        </mesh>

        <Sparkles
          size={6}
          scale={[4, 2, 4]}
          position-y={1}
          speed={0.2}
          count={40}
        ></Sparkles>
      </Center>
    </>
  );
}
