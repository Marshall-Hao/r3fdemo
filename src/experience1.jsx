import {
  extend,
  useFrame,
  useThree,
} from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import CustomObject from "./CustomObject";

// * r3f use extend to make declare way <OrbitControls>
extend({ OrbitControls: OrbitControls });

function Experience1() {
  const cubeRef = useRef();
  const groupRef = useRef();
  // * get the gl render, camera, everything with useThree()
  const { camera, gl } = useThree();
  // * each frame
  // * delta -  each frame time]
  // * state contain camera ,gl，clock
  useFrame((state, delta) => {
    // * get the Mesh
    // * time after the begining
    // * let camera rotate through x,z , math problem
    // const angle = state.clock.elapsedTime;
    // state.camera.position.x = Math.sin(angle) * 8;
    // state.camera.position.z = Math.cos(angle) * 8;
    // state.camera.lookAt(0, 0, 0);
    // * rotating
    // cubeRef.current.rotation.y += delta;
    // groupRef.current.rotation.y += delta;
  });
  return (
    // * change the scale for the mesh
    // * args in array
    <>
      <orbitControls
        args={[camera, gl.domElement]}
      ></orbitControls>
      // * a bit fake without ambient light
      <directionalLight
        position={[1, 2, 3]}
        intensity={1.5}
      ></directionalLight>
      <ambientLight intensity={0.5}></ambientLight>
      <group ref={groupRef}>
        <mesh position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>

        <mesh
          ref={cubeRef}
          rotation-y={Math.PI * 0.25}
          position-x={2}
          scale={1.5}
        >
          <boxGeometry />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>

        <mesh
          position-y={-1}
          rotation-x={-Math.PI * 0.5}
          scale={10}
        >
          <planeGeometry />
          <meshStandardMaterial color="greenyellow" />
        </mesh>

        {/* <CustomObject></CustomObject> */}
      </group>
    </>
  );
}

export default Experience1;
