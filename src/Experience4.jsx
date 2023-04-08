import { useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  useHelper,
  BakeShadows,
  SoftShadows,
  // * only for plane shadow
  AccumulativeShadows,
  RandomizedLight,
  ContactShadows,
  Sky,
  Environment,
  Lightformer,
} from "@react-three/drei";
import { useRef } from "react";
import { Perf } from "r3f-perf";
import { DirectionalLightHelper } from "three";
import { useControls } from "leva";

function Experience4() {
  const directionalLight = useRef();
  useHelper(directionalLight, DirectionalLightHelper, 2);
  const cube = useRef();

  useFrame((state, delta) => {
    // const time = state.clock.elapsedTime;
    // cube.current.position.x = 2 + Math.sin(time);
    cube.current.rotation.y += delta;
  });

  const { color, opacity, blur } = useControls(
    "contact shadows",
    {
      color: "#1d8f75",
      opacity: { value: 0.4, min: 0, max: 1 },
      blur: { value: 2.8, min: 0, max: 10 },
    }
  );

  const { sunPosition } = useControls("sky", {
    sunPosition: { value: [1, 2, 3] },
  });

  const {
    envMapIntensity,
    envMapHeight,
    envMapRadius,
    envMapScale,
  } = useControls("environment map", {
    envMapIntensity: { value: 7, min: 0, max: 12 },
    envMapHeight: { value: 7, min: 0, max: 100 },
    envMapRadius: { value: 28, min: 10, max: 1000 },
    envMapScale: { value: 100, min: 10, max: 1000 },
  });
  return (
    <>
      <Environment
        // * make as bg env
        background
        // files={[
        //   "./environmentMaps/2/px.jpg",
        //   "./environmentMaps/2/nx.jpg",
        //   "./environmentMaps/2/py.jpg",
        //   "./environmentMaps/2/ny.jpg",
        //   "./environmentMaps/2/pz.jpg",
        //   "./environmentMaps/2/nz.jpg",
        // ]}
        preset="sunset"
        // * feels like on the ground
        ground={{
          height: envMapHeight,
          radius: envMapRadius,
          scale: envMapScale,
        }}

        // files="./environmentMaps/the_sky_is_on_fire_2k.hdr"
      >
        {/* <color
          args={["#000000"]}
          attach="background"
        ></color> */}
        {/* <mesh position-z={-5} scale={10}>
          <planeGeometry></planeGeometry>
          <meshBasicMaterial
            color={[10, 0, 0]}
          ></meshBasicMaterial>
        </mesh> */}
        {/* // * simulate as a light in the env
        <Lightformer
          position-z={-5}
          scale={10}
          color="red"
          intensity={10}
          form="ring"
        ></Lightformer> */}
      </Environment>
      {/* // * only baking the shadow at begining,once only // *
  ,optimization */}
      {/* <BakeShadows></BakeShadows> */}
      {/* <SoftShadows
        frustum={3.75}
        size={0.005}
        near={9.5}
        samples={17}
        rings={11}
      /> */}
      <Perf position="top-left" />
      <OrbitControls makeDefault></OrbitControls>
      {/* // * accumulate multiple shadow renders,composed of a
      // *bunch of renders from various angles //* doing own
      // *thing on the side, need seperate lights */}
      {/* <AccumulativeShadows
        position={[0, -0.99, 0]}
        scale={10}
        color="#316d39"
        opacity={0.8}
        // * How many shadow renders to do
        // * solve if the obj is moving, it wont render after, so infinity render
        frames={1000}
        // * spread the renders times in different frame
        temporal
        // * how many renders per frame, default 20
        // blend={100}
      >
        <RandomizedLight
          position={[1, 2, 3]}
          amount={8}
          radius={1}
          ambient={0.5}
          intensity={1}
          // * control if the shadow on itself?
          bias={0.001}
        ></RandomizedLight>
      </AccumulativeShadows> */}
      // * for ambient
      <ContactShadows
        position={[0, -0.99, 0]}
        scale={10}
        resolution={512}
        far={5}
        color={color}
        opacity={opacity}
        blur={blur}
        // * only render on once ,first frame
        frames={1}
      ></ContactShadows>
      {/* <directionalLight
        castShadow
        ref={directionalLight}
        position={sunPosition}
        intensity={1.5}
        // * means show.mapSize.set
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={5}
        shadow-camera-right={5}
        shadow-camera-bottom={-5}
        shadow-camera-left={-5}
      ></directionalLight> */}
      {/* <ambientLight intensity={0.5}></ambientLight> */}
      {/* <Sky sunPosition={sunPosition}></Sky> */}
      <mesh position-x={-2} position-y={1} castShadow>
        <sphereGeometry />
        <meshStandardMaterial
          color="orange"
          // * env map project to the material ,cause some color effect
          envMapIntensity={envMapIntensity}
        />
      </mesh>
      <mesh
        castShadow
        rotation-y={Math.PI * 0.25}
        position-x={2}
        position-y={1}
        scale={1.5}
        ref={cube}
      >
        <boxGeometry />
        <meshStandardMaterial
          color="mediumpurple"
          envMapIntensity={envMapIntensity}
        />
      </mesh>
      <mesh
        // receiveShadow

        position-y={0}
        rotation-x={-Math.PI * 0.5}
        scale={10}
      >
        <planeGeometry />
        <meshStandardMaterial
          color="greenyellow"
          envMapIntensity={envMapIntensity}
        />
      </mesh>
    </>
  );
}

export default Experience4;
