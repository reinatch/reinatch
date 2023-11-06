import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { AnimationAction, AnimationMixer } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
interface ModelProps {
  action: string;
}
function Modeli() {
  const gltf = useGLTF("/archer-animation.glb");
  alert(gltf);
  return <primitive object={gltf.scene} />;
}
export default function Model({ action }: ModelProps): JSX.Element {
  const group = useRef<THREE.Group>();
  const previousAction = usePrevious(action);
  const mixer = useRef<AnimationMixer>(null);
  const modelReady = useRef<boolean>(false);
  const animationActions = useRef<AnimationAction[]>([]);
  const activeAction = useRef<AnimationAction>(null);
  const lastAction = useRef<AnimationAction>(null);
  const gltfLoader = useRef<GLTFLoader>(new GLTFLoader());
  const { nodes, materials, animations } = useGLTF("/archer-animation.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (previousAction) {
      actions[previousAction].fadeOut(0.2);
      actions[action].stop();
    }
    actions[action].play();
    actions[action].fadeIn(0.2);
  }, [actions, action, previousAction]);

  return (
    <group ref={group} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        <primitive object={nodes.Hips} />
        <skinnedMesh
          geometry={nodes.Erika_Archer_Body_Mesh.geometry}
          material={materials.Body_MAT}
          skeleton={nodes.Erika_Archer_Body_Mesh.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Erika_Archer_Clothes_Mesh.geometry}
          material={materials.Akai_MAT}
          skeleton={nodes.Erika_Archer_Clothes_Mesh.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Erika_Archer_Eyelashes_Mesh.geometry}
          material={materials.Lashes_MAT}
          skeleton={nodes.Erika_Archer_Eyelashes_Mesh.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Erika_Archer_Eyes_Mesh.geometry}
          material={materials.EyeSpec_MAT}
          skeleton={nodes.Erika_Archer_Eyes_Mesh.skeleton}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/archer-animation.glb");

function usePrevious<T>(value: T): React.MutableRefObject<T> {
  const ref = useRef<T>(null);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref;
}
