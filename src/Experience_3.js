import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  TransformControls,
  PivotControls,
  Html,
  Text,
  Float,
  MeshReflectorMaterial,
} from "@react-three/drei";
import { Perf } from "r3f-perf";

const Experience = () => {
  const cubeRef = useRef();
  useFrame((state, delta) => {
    cubeRef.current.rotation.y += delta * 0.2;
  });
  return (
    <>
      <Perf position="top-left" />
      <OrbitControls makeDefault />
      {/* 灯光 */}
      {/* 平行光 */}
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      {/* 环境光 */}
      <ambientLight intensity={0.5} color="0x404040" />
      <mesh position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh scale={1.5} position-x={2} ref={cubeRef}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

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
    </>
  );
};

export default Experience;
