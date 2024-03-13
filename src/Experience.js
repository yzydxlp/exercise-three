import React, { useRef } from "react";
import {
  OrbitControls,
  TransformControls,
  PivotControls,
  Html,
  Text,
  Float,
  MeshReflectorMaterial,
} from "@react-three/drei";

const Experience = () => {
  const cuteRef = useRef();
  const sphereRef = useRef();
  return (
    <>
      <OrbitControls makeDefault />
      {/* 灯光 */}
      {/* 平行光 */}
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      {/* 环境光 */}
      <ambientLight intensity={0.5} color="0x404040" />
      <PivotControls
        anchor={[0, 0, 0]}
        axisColors={["#9381ff", "#ff4d6d", "#7ae582"]}
        depthTest={false}
        scale={2}
      >
        <mesh position-x={-2} ref={sphereRef}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
          <Html
            wrapperClass="label"
            position={[1, 1, 0]}
            center
            distanceFactor={8}
            occlude={[cuteRef, sphereRef]}
          >
            这是个圆
          </Html>
        </mesh>
      </PivotControls>

      <mesh scale={1.5} position-x={2} ref={cuteRef}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>
      <TransformControls object={cuteRef} />

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

      <Float speed={5} floatIntensity={2}>
        <Text
          font="../Bangers.ttf"
          fontSize={1}
          color="salmon"
          position={[0, 2, 0]}
          maxWidth={3}
          textAlign="center"
        >
          Test Hello
          {/* <meshStandardMaterial /> */}
        </Text>
      </Float>
    </>
  );
};

export default Experience;
