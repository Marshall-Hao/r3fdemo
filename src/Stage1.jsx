import { OrbitControls, Stage } from "@react-three/drei";
import { useRef } from "react";
function Stage1() {
  const cube = useRef();

  return (
    <>
      <OrbitControls makeDefault></OrbitControls>

      <Stage
        shadow={{ type: "contact", opacity: 0.2, blur: 3 }}
        environment="sunset"
        preset="portrait"
        intensity={2}
      >
        <mesh position-y={1} position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>

        <mesh
          ref={cube}
          position-y={1}
          position-x={2}
          scale={1.5}
        >
          <boxGeometry />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>
      </Stage>
    </>
  );
}

export default Stage1;
