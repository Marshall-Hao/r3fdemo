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

  // useFrame((state, delta) => {
  //   // cube.current.rotation.y += delta * 0.2;
  // });

  const cubeJump = () => {
    console.log("jump");
    const mass = cube.current.mass();
    // * 一个脉冲量
    // * use mass as a factor here,to simulate a feeling
    cube.current.applyImpulse({ x: 0, y: 5 * mass, z: 0 });
    // * 一个 转脉冲量
    cube.current.applyTorqueImpulse({
      x: Math.random() - 0.5,
      y: Math.random() - 0.5,
      z: Math.random() - 0.5,
    });
  };
  return (
    <>
      <OrbitControls makeDefault />

      <directionalLight
        castShadow
        position={[1, 2, 3]}
        intensity={1.5}
      />
      {/* // * ambient no shadow */}
      <ambientLight intensity={0.5} />
      <Physics gravity={[0, -9.08, 0]}>
        <Debug></Debug>
        <RigidBody
          //  * shape of the wrapper
          colliders="ball"
          position={[-1.5, 2, 0]}
        >
          <mesh
            //  position={[0, 4, 0]}
            castShadow
          >
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody>

        {/* <RigidBody
          // * fit the shape as much as possible
          // colliders="hull"
          // * avoid using it with dynamic body(fast moving),too fast, it will go through,
          // colliders="trimesh"
          colliders={false}
        > */}
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
        {/* <BallCollider args={[1.5]}></BallCollider>
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
        </RigidBody> */}
        <RigidBody
          ref={cube}
          position={[1.5, 2, 0]}
          // * independent grayity for individual object
          gravityScale={1}
          // * bounce rate
          restitution={1}
          friction={0.7}
          colliders={false}
        >
          {/* <mesh
            ref={cube}
            position={[2, 2, 0]}
            scale={1.5}
            castShadow
          >
            <boxGeometry args={[3, 2, 1]} />
            <meshStandardMaterial color="mediumpurple" />
          </mesh> */}

          <mesh
            // position={[2, 2, 3]}
            // scale={1.5}
            castShadow
            onClick={cubeJump}
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="mediumpurple" />
            <CuboidCollider
              mass={2}
              args={[0.5, 0.5, 0.5]}
            ></CuboidCollider>
          </mesh>
        </RigidBody>

        <RigidBody
          // * no go through,will stay there,but need rigid body to make collision
          type="fixed"
          // restitution={1}
          // * friction
          friction={0.7}
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
