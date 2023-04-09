import { useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  meshBounds,
  // * for complex geometries
  useBVH,
} from "@react-three/drei";
import { useRef } from "react";

export default function Experience8() {
  const cube = useRef();
  const hamburger = useGLTF("./hamburger.glb");

  useFrame((state, delta) => {
    cube.current.rotation.y += delta * 0.2;
  });

  const eventHandler = (e) => {
    cube.current.material.color.set(
      // * hsl good for 0 ~ 1
      `hsl(${Math.random() * 360}, 100%, 75%)`
    );
  };

  return (
    <>
      <OrbitControls makeDefault />

      <directionalLight
        position={[1, 2, 3]}
        intensity={1.5}
      />
      <ambientLight intensity={0.5} />

      <mesh
        position-x={-2}
        onClick={(e) => {
          // * prevent event bubble
          e.stopPropagation();
        }}
      >
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh
        ref={cube}
        position-x={2}
        scale={1.5}
        onClick={eventHandler}
        // * virtual boundes sphere, perf optimization
        raycast={meshBounds}
        // onDoubleClick={eventHandler}
        // onContextMenu={eventHandler}
        // onPointerDown
        // onPointerUp
        // onPointerMove
        // onPointerMissed
        // * change the cursor shape
        onPointerEnter={() => {
          document.body.style.cursor = "pointer";
        }}
        onPointerLeave={() => {
          document.body.style.cursor = "default";
        }}
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

      <primitive
        scale={0.25}
        object={hamburger.scene}
        position-y={0.5}
        // * will click the gourp of meshes together, because the ray will through the meshes
        onClick={(event) => {
          event.stopPropagation();
          console.log(event.object.name);
        }}
      ></primitive>
    </>
  );
}
