import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import {
  Debug,
  Physics,
  RigidBody,
} from "@react-three/rapier";

export default function PhysicsExperience() {
  const cube = useRef();

  useFrame((state, delta) => {
    // cube.current.rotation.y += delta * 0.2;
  });

  return (
    <>
      <OrbitControls makeDefault />

      <directionalLight
        position={[1, 2, 3]}
        intensity={1.5}
      />
      <ambientLight intensity={0.5} />
      <Physics>
        <Debug></Debug>
        <RigidBody>
          <mesh position={[-2, 2, 0]}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody>

        <mesh ref={cube} position={[2, 2, 0]} scale={1.5}>
          <boxGeometry />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>

        <RigidBody
          // * no go through,will stay there,but need rigid body to make collision
          type="fixed"
        >
          <mesh
            position-y={-1}
            rotation-x={-Math.PI * 0.5}
            scale={10}
          >
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>
      </Physics>
    </>
  );
}
