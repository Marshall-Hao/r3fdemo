import { OrbitControls } from "@react-three/drei";
import { useControls, button } from "leva";
import { Perf } from "r3f-perf";

function Experience3() {
  // * will cause re-render
  const { position, color } = useControls("sphere", {
    position: {
      value: { x: -2, y: 0 },
      min: -4,
      max: 4,
      step: 0.01,
    },
    visible: true,
    color: "#ff0000",
    myInterval: {
      min: 0,
      max: 10,
      value: [4, 5],
    },
    clickMe: button(() => {
      console.log("click me");
    }),
    choice: {
      options: ["a", "b", "c"],
    },
  });

  const { visible } = useControls("cube", {
    visible: true,
  });

  const { perfVisible } = useControls({
    perfVisible: false,
  });
  return (
    <>
      {perfVisible ? <Perf position="top-left" /> : null}

      <OrbitControls makeDefault></OrbitControls>

      <directionalLight
        position={[1, 2, 3]}
        intensity={1.5}
      ></directionalLight>
      <ambientLight intensity={0.5}></ambientLight>

      <mesh position={[position.x, position.y, 0]}>
        <sphereGeometry />
        <meshStandardMaterial color={color} />
      </mesh>

      <mesh
        rotation-y={Math.PI * 0.25}
        position-x={2}
        scale={1.5}
        visible={visible}
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
    </>
  );
}

export default Experience3;
