"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  CameraControls,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";
import { Fisheye } from "../Fisheye";
const config = require("../../next.config");
import Archer from "./archer";
function MeshComponent() {
  const fileUrl = `${config.basePath}/arch.glb`;
  const mesh = useRef<Mesh>(null!);
  const gltf = useLoader(GLTFLoader, fileUrl);
  useFrame(() => {
    // mesh.current.rotation.y += 0.01;
  });

  const [active, setActive] = useState(false);
  console.log(gltf);
  const actions = [
    "Run Forward",
    "Death",
    "Draw Arrow",
    "Standing Idle",
    "Dance Pose",
  ];
  const [randomNumber, setRandomNumber] = useState(0);
  const [action, setAction] = useState(actions[randomNumber]);
  const generateRandomNumber = () => {
    const randomNumber = Math.floor(Math.random() * actions.length);
    console.log("Random Number:", randomNumber);
    setRandomNumber(randomNumber);
    const newAction = actions[randomNumber];
    console.log("New Action:", newAction);
    setAction(newAction);
  };

  return (
    <group
      scale={30}
      position={[0, 0, -5]}
      rotation={[0, 0, 0]}
      // onClick={() => generateRandomNumber()}
    >
      {/* <Archer action={action} /> */}
      <Archer />
    </group>
  );
}

export function Shiba() {
  return (
    <div className="flex justify-center items-center h-screen">
      {/* <Canvas className="h-full w-full"> */}
      <Canvas flat className="h-full w-full" camera={{ position: [0, 0, 30] }}>
        <Fisheye zoom={0}>
          <CameraControls minPolarAngle={0} maxPolarAngle={Math.PI / 1.6} />
          <ambientLight intensity={(Math.PI / 2) * 5} />

          <pointLight position={[1, 1, 1]} />
          <MeshComponent />

          {/* <Environment preset="city" background blur={10} /> */}
          <color attach="background" args={["white"]} />
          <PerspectiveCamera makeDefault position={[0, 0, 18.5]} />
        </Fisheye>
      </Canvas>
    </div>
  );
}
function usePrevious(action: string) {
  throw new Error("Function not implemented.");
}
