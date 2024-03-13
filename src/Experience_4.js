import React from "react";
import { useLoader } from "@react-three/fiber";
import { OrbitControls, MeshReflectorMaterial } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useControls, button } from "leva";

const Experience = () => {
  const model = useLoader(GLTFLoader, "./Horse.glb");
  console.log(model);
  return (
    <>
      {/* 监控 */}
      <Perf position="top-left" />
      <OrbitControls makeDefault />
      {/* 灯光 */}
      {/* 平行光 */}
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      {/* 环境光 */}
      <ambientLight intensity={0.5} color="0x404040" />

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        {/* <meshStandardMaterial color="greenyellow" /> */}
        <MeshReflectorMaterial
          resolution={512}
          blur={[1000, 1000]}
          mixBlur={1}
          mirror={0.5}
          color="greenyellow"
        />
      </mesh>
      <primitive object={model.scene} scale={0.01} position={[0, -1, 0]} />
    </>
  );
};

export default Experience;
