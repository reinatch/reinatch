import React, { RefObject, useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { AnimationAction, AnimationMixer, Group } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
interface ModelProps {
  //   action: string;
}
export default function Model({}: ModelProps): JSX.Element {
  const group: RefObject<Group> = useRef<Group>(null);
  const gltf = useLoader(GLTFLoader, "/archer-animation.glb");
  const { actions } = useAnimations(gltf.animations, group);
  const actionss = [
    "Run Forward",
    "Death",
    "Draw Arrow",
    "Standing Idle",
    "Dance Pose",
  ];
  const [randomNumber, setRandomNumber] = useState(0);
  const [action, setAction] = useState(actionss[randomNumber]);
  const previousAction = usePrevious(action);

  useEffect(() => {
    // Set an initial animation action
    const initialAction = actions[action];
    if (initialAction) {
      initialAction.play();
      initialAction.fadeIn(0.2);
    }
  }, [action, actions]);
  const generateRandomNumber = () => {
    const randomNumber = Math.floor(Math.random() * actionss.length);
    console.log("Random Number:", randomNumber);
    setRandomNumber(randomNumber);
    const newAction = actionss[randomNumber];
    console.log("New Action:", newAction);

    // Access the current action and previous action from the actions object
    const currentAction = actions[newAction];
    const previousAction = actions[action];

    if (currentAction) {
      // Stop the previous action
      if (previousAction) {
        previousAction.stop();
        previousAction.fadeOut(0.2);
      }

      // Start the new action
      currentAction.play();
      currentAction.fadeIn(0.2);
      console.log("Playing animation: " + newAction);

      // Update the state
      setAction(newAction);
    }
  };

  //   const generateRandomNumber = () => {
  //     const randomNumber = Math.floor(Math.random() * actionss.length);
  //     console.log("Random Number:", randomNumber);
  //     setRandomNumber(randomNumber);
  //     const newAction = actionss[randomNumber];
  //     console.log("New Action:", newAction);
  //     setAction(newAction);
  //     const currentAction = actions[action];

  //       if (currentAction) {
  //         currentAction?.fadeOut(0.2);
  //         currentAction.paused = true; // Start or resume the animation
  //         console.log("Playing animation: " + action);
  //       }
  //       //    else {
  //       //     console.error("Action not found: " + action);
  //       //   }
  //       //   actions[action].play();
  //       //   actions[action].fadeIn(0.2);

  //     currentAction?.play();
  //     currentAction?.fadeIn(0.2);
  //     console.log("Current Action:", action);
  //   };
  //   useEffect(() => {
  //     if (previousAction.current !== null) {
  //       const currentAction = actions[action];
  //       // if (currentAction) {
  //       //   currentAction.fadeOut(0.2);
  //       //   currentAction.paused = false; // Start or resume the animation
  //       //   currentAction.fadeIn(0.2);
  //       //   console.log("Playing animation: " + action);
  //       // } else {
  //       //   console.error("Action not found: " + action);
  //       // }
  //       currentAction?.play();
  //       currentAction?.fadeIn(0.2);
  //     }
  //     console.log("Current Action:", action);
  //   }, [actions, action, previousAction]);

  return (
    <group ref={group} dispose={null} onClick={() => generateRandomNumber()}>
      <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        <primitive object={gltf.nodes.Hips} />
        <skinnedMesh
          geometry={
            (gltf.nodes.Erika_Archer_Body_Mesh as THREE.SkinnedMesh).geometry
          }
          material={gltf.materials.Body_MAT}
          skeleton={
            (gltf.nodes.Erika_Archer_Body_Mesh as THREE.SkinnedMesh).skeleton
          }
        />
        <skinnedMesh
          geometry={
            (gltf.nodes.Erika_Archer_Clothes_Mesh as THREE.SkinnedMesh).geometry
          }
          material={gltf.materials.Akai_MAT}
          skeleton={
            (gltf.nodes.Erika_Archer_Clothes_Mesh as THREE.SkinnedMesh).skeleton
          }
        />
        <skinnedMesh
          geometry={
            (gltf.nodes.Erika_Archer_Eyelashes_Mesh as THREE.SkinnedMesh)
              .geometry
          }
          material={gltf.materials.Lashes_MAT}
          skeleton={
            (gltf.nodes.Erika_Archer_Eyelashes_Mesh as THREE.SkinnedMesh)
              .skeleton
          }
        />
        <skinnedMesh
          geometry={
            (gltf.nodes.Erika_Archer_Eyes_Mesh as THREE.SkinnedMesh).geometry
          }
          material={gltf.materials.EyeSpec_MAT}
          skeleton={
            (gltf.nodes.Erika_Archer_Eyes_Mesh as THREE.SkinnedMesh).skeleton
          }
        />
      </group>
    </group>
  );
}

useGLTF.preload("/archer-animation.glb");

function usePrevious<T>(value: T): React.MutableRefObject<T | null> {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref;
}
