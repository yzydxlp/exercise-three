import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  OrbitControls,
  RandomizedLight,
  useHelper,
  AccumulativeShadows,
  MeshReflectorMaterial,
  BakeShadows,
  Sky,
  Environment,
  Lightformer,
} from "@react-three/drei";
import { useControls } from "leva";
import * as THREE from "three";
import { Perf } from "r3f-perf";

const HDRI = "./evening_road_01_2k.hdr";

const Experience = () => {
  const cubeRef = useRef();
  const directionalLight = useRef();
  useHelper(directionalLight, THREE.DirectionalLightHelper, 1);
  useFrame((state, delta) => {
    // const time = state.clock.elapsedTime;
    // cubeRef.current.position.x = 2 + Math.sin(time);
    cubeRef.current.rotation.y += delta * 0.2;
  });

  const { color, opacity, blur } = useControls("contact shadows", {
    color: "#1d8f75",
    opacity: {
      value: 0.4,
      min: 0,
      max: 1,
    },
    blur: {
      value: 2.8,
      min: 0,
      max: 10,
    },
  });

  const { sunPosition } = useControls("sky", {
    sunPosition: {
      value: [1, 2, 3],
    },
  });

  const { envMapIntensity } = useControls("environment", {
    envMapIntensity: {
      value: 1,
      min: 0,
      max: 12,
    },
  });
  return (
    <>
      {/* 用于静止阴影 */}
      {/* <BakeShadows /> */}

      <Environment
        background
        // files={[
        //   "./pisa/px.png",
        //   "./pisa/nx.png",
        //   "./pisa/py.png",
        //   "./pisa/ny.png",
        //   "./pisa/pz.png",
        //   "./pisa/nz.png",
        // ]}
        files={HDRI}
      >
        <Lightformer position-z={-5} scale={10} color="red" />
        {/* <mesh position-z={-5} scale={10}>
          <planeGeometry />
          <meshBasicMaterial color="red" />
        </mesh> */}
      </Environment>

      <color args={["ivory"]} attach="background" />

      <Perf position="top-left" />

      <OrbitControls makeDefault />

      {/* <AccumulativeShadows
        position={[0, -0.99, 0]}
        scale={10}
        color="#316d39"
        opacity={0.8}
        frames={Infinity}
        temporal
        blend={100}
      >
        <RandomizedLight
          position={[1, 2, 3]}
          amount={8} // 灯光数
          radius={1}
          ambient={0.5}
          intensity={1}
          bias={0.001}
        />
      </AccumulativeShadows> */}

      <ContactShadows
        position={[0, -0.99, 0]}
        scale={10}
        resolution={512}
        far={5}
        opacity={opacity}
        blur={blur}
        color={color}
        frames={1}
      />

      {/* 灯光 */}
      {/* 平行光 */}
      {/* <directionalLight
        ref={directionalLight}
        position={sunPosition}
        intensity={1.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={5}
        shadow-camera-right={5}
        shadow-camera-bottom={-5}
        shadow-camera-left={-5}
      /> */}
      {/* 环境光 */}
      {/* <ambientLight intensity={0.5} /> */}

      {/* <Sky sunPosition={sunPosition} /> */}
      <mesh castShadow position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial
          color="orange"
          envMapIntensity={envMapIntensity}
        />
      </mesh>

      <mesh castShadow scale={1.5} position-x={2} ref={cubeRef}>
        <boxGeometry />
        <meshStandardMaterial
          color="mediumpurple"
          envMapIntensity={envMapIntensity}
        />
      </mesh>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
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
