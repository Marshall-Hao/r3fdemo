import { DoubleSide } from "three";
import { useMemo, useRef, useEffect } from "react";

function CustomObject() {
  const geometryRef = useRef();
  const verticesCount = 10 * 3;
  // * 10 triangles, 3 vertices per triangle, so per element per vertice

  // * optimization (everytime re-render, will be call again, stay same)
  const positionsMemo = useMemo(() => {
    const positon = new Float32Array(verticesCount * 3);

    for (let i = 0; i < verticesCount * 3; i++) {
      positon[i] = (Math.random() - 0.5) * 3;
    }
    return positon;
  }, []);

  const ref = (ele) => {
    // * first time might not rendered out, so need ? condition
    ele?.computeVertexNormals();
  };
  return (
    <mesh>
      <bufferGeometry ref={ref}>
        <bufferAttribute
          // * compile to geometry.attribute.position
          attach="attributes-position"
          count={verticesCount}
          // * take how many vertices
          itemSize={3}
          array={positionsMemo}
        ></bufferAttribute>
      </bufferGeometry>
      // * missing normal light, _I_
      <meshStandardMaterial
        color="red"
        // * can view from both side
        side={DoubleSide}
      ></meshStandardMaterial>
    </mesh>
  );
}

export default CustomObject;
