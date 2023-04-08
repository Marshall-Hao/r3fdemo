import {
  OrbitControls,
  Text3D,
  Center,
  useMatcapTexture,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Perf } from "r3f-perf";

import { useState, useEffect, useRef } from "react";
import {
  TorusGeometry,
  MeshMatcapMaterial,
  sRGBEncoding,
} from "three";
const torusGeometry = new TorusGeometry(1, 0.6, 16, 32);
const material = new MeshMatcapMaterial();

export default function Experience6() {
  // * will get texture from repo directly
  const [matcapTexture] = useMatcapTexture(
    "7B5254_E9DCC7_B19986_C8AC91",
    // * texture width
    256
  );
  const donutsGroup = useRef();

  useEffect(() => {
    // * need to mannually change the RGB encoding way
    matcapTexture.encoding = sRGBEncoding;
    // * and update
    matcapTexture.needsUpdate = true;
    material.matcap = matcapTexture;
    // * update
    material.needsUpdate = true;
  }, []);

  useFrame((state, delta) => {
    // * all the meshes under the group
    for (const donut of donutsGroup.current.children) {
      donut.rotation.y += delta * Math.random() * 10;
    }
  });
  // const [torusGeometry, setTorusGeometry] = useState();
  // const [material, setMaterial] = useState();
  return (
    <>
      <Perf position="top-left" />
      <OrbitControls makeDefault />
      // * must have font as json format
      {/* <torusGeometry
        // ! ref will call this fn,set this state to the obj value, good learn
        ref={setTorusGeometry}
        args={[1, 0.6, 16, 32]}
      />
      <meshMatcapMaterial
        ref={setMaterial}
        matcap={matcapTexture}
      /> */}
      <Center>
        <Text3D
          font="./fonts/helvetiker_regular.typeface.json"
          size={0.75}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
          material={material}
        >
          HELLO R3F
        </Text3D>
      </Center>
      <group ref={donutsGroup}>
        {[...Array(100)].map((i, index) => (
          <mesh
            key={index}
            position={[
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
            ]}
            scale={0.2 + Math.random() * 0.2}
            rotation={[
              Math.random() * Math.PI,
              Math.random() * Math.PI,
              0,
            ]}
            // * big optimization, will point to the same state,only 1 geometry for same obj
            geometry={torusGeometry}
            material={material}
          ></mesh>
        ))}
      </group>
    </>
  );
}
