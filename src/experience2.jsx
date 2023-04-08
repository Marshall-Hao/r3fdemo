// * drei is a help pack for r3f and three
import {
  OrbitControls,
  TransformControls,
  PivotControls,
  Html,
  Text,
  Float,
  MeshReflectorMaterial,
} from "@react-three/drei";
import { useRef } from "react";

function Experience2() {
  const cubeRef = useRef();
  const sphereRef = useRef();
  /* // * even damping involved // * makeDefault this is
    the default control // * other control can deactivate
    while neccesary */
  return (
    <>
      <OrbitControls makeDefault></OrbitControls>
      <directionalLight
        position={[1, 2, 3]}
        intensity={1.5}
      ></directionalLight>
      <ambientLight intensity={0.5}></ambientLight>
      <group>
        {/* // * PivotControls is not a group obj */}
        {/* // * related value of the obj */}
        <PivotControls
          anchor={[0, 0, 0]}
          depthTest={false}
          lineWidth={4}
          axisColors={["#9381ff", "#ff4d6d", "#7ae582"]}
          scale={100}
          // * true than the scale will be px
          fixed={true}
        >
          <mesh ref={sphereRef} position-x={-2}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
            <Html
              position={[1, 1, 0]}
              wrapperClass="label" // * add clase
              distanceFactor={8} // *if too far
              center // * center it
              occlude={[sphereRef, cubeRef]} // * hide it when behind an obj
            >
              That's a sphere 👍
            </Html>
          </mesh>
        </PivotControls>
        {/* // * r3f is object inside an another obj, so can do */}
        {/* // * this way wrap inside the args */}
        <mesh
          ref={cubeRef}
          rotation-y={Math.PI * 0.25}
          scale={1.5}
          position-x={2}
        >
          <boxGeometry />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>
        {/* // * attach it to the actual object */}
        // * what attr to change
        <TransformControls
          object={cubeRef}
          mode="translate"
        ></TransformControls>
        <mesh
          position-y={-1}
          rotation-x={-Math.PI * 0.5}
          scale={10}
        >
          <planeGeometry />
          // * good for plane
          <MeshReflectorMaterial
            resolution={512}
            blur={[1000, 1000]}
            mixBlur={1}
            mirror={0.75}
            color="greenyellow"
          />
        </mesh>
        <Float speed={5} floatIntensity={2}>
          <Text
            fontSize={1}
            color="salmon"
            position-y={2}
            maxWidth={2}
            textAlign="center"
          >
            NOOOOO
          </Text>
        </Float>
      </group>
    </>
  );
}

export default Experience2;
