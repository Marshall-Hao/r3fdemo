import {
  OrbitControls,
  Text3D,
  Center,
  useMatcapTexture,
} from "@react-three/drei";
import { Perf } from "r3f-perf";

export default function Experience6() {
  // * will get texture from repo directly
  const [matcapTexture] = useMatcapTexture(
    "7B5254_E9DCC7_B19986_C8AC91",
    // * texture width
    256
  );

  return (
    <>
      <Perf position="top-left" />
      <OrbitControls makeDefault />
      // * must have font as json format
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
        >
          HELLO R3F
          <meshMatcapMaterial
            matcap={matcapTexture}
          ></meshMatcapMaterial>
        </Text3D>
      </Center>
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
        >
          <torusGeometry args={[1, 0.6, 16, 32]} />
          <meshMatcapMaterial matcap={matcapTexture} />
        </mesh>
      ))}
    </>
  );
}
