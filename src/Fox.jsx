import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect } from "react";
import { useControls } from "leva";

export default function Fox() {
  const fox = useGLTF("./Fox/glTF/Fox.gltf");
  // * add the animations in teh obj scene
  const animations = useAnimations(
    fox.animations,
    fox.scene
  );
  console.log(animations);

  const { animationsName } = useControls("animations", {
    animationsName: { options: animations.names },
  });

  // * incase no animations at first place
  useEffect(() => {
    // const action = animations.actions.Survey;
    // action.play();
    // setTimeout(() => {
    //   animations.actions.Walk.play();
    //   // * face one action to another action, prevent suddenly change
    //   animations.actions.Walk.crossFadeFrom(
    //     animations.actions.Survey,
    //     1
    //   );
    // }, 2000);
    const action = animations.actions[animationsName];
    // * if no fade, action will be mixed together
    // * re-start the animation , after fade out(stop)
    action.reset().fadeIn(0.5).play();
    return () => {
      // * if re-render, call the return fn,will a bit fade out
      action.fadeOut(0.5);
    };
  }, [animationsName]);
  return (
    <primitive
      object={fox.scene}
      scale={0.02}
      position={[-2.5, 0, 2.5]}
      rotation-y={0.3}
    />
  );
}

// * preload
useGLTF.preload("./Fox/glTF/Fox.gltf");
