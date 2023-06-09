import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  CineonToneMapping,
  ACESFilmicToneMapping,
  sRGBEncoding,
  Color,
} from "three";
import "./App.css";
import Experience1 from "./experience1";
import Experience2 from "./experience2";
import Experience3 from "./Experience3";
import Experience4 from "./Experience4";
import Stage1 from "./Stage1";
import Experience5 from "./Experience5";
import Experience6 from "./Experience6";
import Experience7 from "./Experience7";
import Experience8 from "./Experience8";
import Experience from "./basic";
import Experience9 from "./Experience9";
import PhysicsExperience from "./Physics/Physics";

function App() {
  // const created = ({ gl, scene }) => {
  //   // * set webgl scene bg color
  //   // gl.setClearColor("#ff0000", 1);
  //   //  * set scene bg color
  //   scene.background = new Color("red");
  // };

  return (
    <Canvas
      // * prevent the r3f default toneMapping
      flat
      shadows
      // * handle pixelration, if 3 * 3 , it will render 9 times, bad performance, restricts it
      dpr={[1, 2]}
      // * no tone Mapping
      // flat
      // * always the same, no matther far near the angle
      // orthographic
      gl={{
        antialias: true,
        // * for tone HDR ~ LDR
        toneMapping: ACESFilmicToneMapping,
        // * the way to encode and decode colors in a more optimisticed way
        outputEncoding: sRGBEncoding,
      }}
      camera={{
        fov: 45,
        // * default zoom
        // zoom: 100,
        near: 0.1,
        far: 200,
        position: [3, 2, 6],
      }}
      // * created lifeCycle
      // onCreated={created}
    >
      {/* <scene></scene> */}
      {/* // * attach to the scene background attr */}
      {/* <color attach="background" args={["salmon"]}></color> */}
      {/* <Experience1></Experience1> */}
      {/* <Experience2></Experience2> */}
      {/* <Experience3></Experience3> */}
      {/* <Experience4></Experience4> */}
      {/* <Stage1></Stage1> */}
      {/* <Experience5></Experience5> */}
      {/* <Experience6></Experience6> */}
      {/* <Experience7></Experience7> */}
      {/* <Experience8></Experience8> */}
      {/* <Experience9></Experience9> */}
      <PhysicsExperience></PhysicsExperience>
    </Canvas>
  );
}

export default App;
