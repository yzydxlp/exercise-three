import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  useHelper,
  MeshReflectorMaterial,
  BakeShadows,
} from "@react-three/drei";
import * as THREE from "three";
import { Perf } from "r3f-perf";

const Experience = () => {
  const cubeRef = useRef();
  const directionalLight = useRef();
  useHelper(directionalLight, THREE.DirectionalLightHelper, 1);
  useFrame((state, delta) => {
    cubeRef.current.rotation.y += delta * 0.2;
  });
  return (
    <>
      <BakeShadows />

      <color args={["ivory"]} attach="background" />

      <Perf position="top-left" />

      <OrbitControls makeDefault />
      {/* 灯光 */}
      {/* 平行光 */}
      <directionalLight
        ref={directionalLight}
        position={[1, 2, 3]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={5}
        shadow-camera-right={5}
        shadow-camera-bottom={-5}
        shadow-camera-left={-5}
      />
      {/* 环境光 */}
      <ambientLight intensity={0.5} />
      <mesh castShadow position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh castShadow scale={1.5} position-x={2} ref={cubeRef}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh
        receiveShadow
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={10}
      >
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
        {/* <MeshReflectorMaterial
          resolution={512}
          blur={[1000, 1000]}
          mixBlur={1}
          mirror={0.5}
          color="greenyellow"
        /> */}
      </mesh>
    </>
  );
};

export default Experience;
