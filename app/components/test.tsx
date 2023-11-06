"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { CameraControls, Environment, OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";
import { Fisheye } from "../Fisheye";
const config = require("../../next.config");

function MeshComponent() {
  const fileUrl = `${config.basePath}/archer-animation.glb`;
  const mesh = useRef<Mesh>(null!);
  const gltf = useLoader(GLTFLoader, fileUrl);
  useFrame(() => {
    // mesh.current.rotation.y += 0.01;
  });
  const [active, setActive] = useState(false);
  console.log(gltf.scene);
  return (
    <mesh
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
    >
      <primitive object={gltf.scene} />
    </mesh>
  );
}

export function Shiba() {
  return (
    <div className="flex justify-center items-center h-screen">
      {/* <Canvas className="h-full w-full"> */}
      <Canvas className="h-full w-full" camera={{ position: [0, 0, 30] }}>
        <Fisheye zoom={0}>
          <ambientLight intensity={(Math.PI / 2) * 5} />

          <pointLight position={[1, 1, 1]} />
          <group scale={30} position={[0, 0, -5]} rotation={[0, 0, 0]}>
            <MeshComponent />
          </group>
          {/* <Environment preset="city" background blur={10} /> */}
          <color attach="background" args={["white"]} />
        </Fisheye>
        <CameraControls minPolarAngle={0} maxPolarAngle={Math.PI / 1.6} />
      </Canvas>
    </div>
  );
}
