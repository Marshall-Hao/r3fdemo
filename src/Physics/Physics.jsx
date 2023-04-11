import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import {
  Debug,
  Physics,
  RigidBody,
  CuboidCollider,
  BallCollider,
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
        castShadow
        position={[1, 2, 3]}
        intensity={1.5}
      />
      <ambientLight castShadow intensity={0.5} />
      <Physics>
        <Debug></Debug>
        <RigidBody
          //  * shape of the wrapper
          colliders="ball"
        >
          <mesh position={[0, 4, 0]} castShadow>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody>

        <RigidBody
          // * fit the shape as much as possible
          // colliders="hull"
          // * avoid using it with dynamic body(fast moving),too fast, it will go through,
          // colliders="trimesh"
          colliders={false}
        >
          {/* // * Cubid collider itself, args half depth x,y,z */}
          {/* <CuboidCollider
            args={[1.5, 1.5, 0.5]}
          ></CuboidCollider>
          <CuboidCollider
            args={[0.25, 1, 0.25]}
            position={[0, 0, 1]}
            rotation={[-Math.PI * 0.35, 0, 0]}
          ></CuboidCollider> */}
          {/*  // * generate the feeling of collision */}
          <BallCollider args={[1.5]}></BallCollider>
          <mesh
            castShadow
            // position={[0, 1, 0]}
            rotation={[Math.PI * 0.5, 0, 0]}
          >
            <torusGeometry
              args={[1, 0.5, 16, 32]}
            ></torusGeometry>
            <meshStandardMaterial color="mediumpurple"></meshStandardMaterial>
          </mesh>
        </RigidBody>
        {/* <RigidBody>
          <mesh
            ref={cube}
            position={[2, 2, 0]}
            scale={1.5}
            castShadow
          >
            <boxGeometry args={[3, 2, 1]} />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>

          <mesh
            ref={cube}
            position={[2, 2, 3]}
            scale={1.5}
            castShadow
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
        </RigidBody> */}

        <RigidBody
          // * no go through,will stay there,but need rigid body to make collision
          type="fixed"
        >
          <mesh position-y={-1.25} receiveShadow>
            <boxGeometry args={[10, 0.5, 10]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>
      </Physics>
    </>
  );
}
