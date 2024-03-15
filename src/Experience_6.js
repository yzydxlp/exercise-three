import React, { useRef, useState } from "react";
import * as THREE from "three";
import { Perf } from "r3f-perf";
import { OrbitControls, useCursor } from "@react-three/drei";
import {
  EffectComposer,
  Glitch,
  Vignette,
  Outline,
  Selection,
  Select,
} from "@react-three/postprocessing";

const Experience = () => {
  const [hovered, setHovered] = useState(false);
  const cuteRef = useRef();
  const sphereRef = useRef();
  useCursor(hovered);
  return (
    <>
      {/* 监控 */}
      <Perf position="top-left" />
      {/* 轨道控制器 */}
      <OrbitControls makeDefault />

      {/* 灯光 */}
      {/* 平行光 */}
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      {/* 环境光 */}
      <ambientLight intensity={0.5} color="0x404040" />
      {/* 球体 */}

      <Selection>
        <EffectComposer multisampling={8} autoClear={false}>
          <Outline
            blur
            visibleEdgeColor="white"
            edgeStrength={100}
            width={1000}
          />
        </EffectComposer>
        <Select enabled={hovered}>
          <mesh
            ref={sphereRef}
            position-x={-2}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHovered(true);
            }}
            onPointerOut={(e) => setHovered(false)}
          >
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>
        </Select>

        {/* 正方体 */}
        <Select enabled={hovered}>
          <mesh
            ref={cuteRef}
            scale={1.5}
            position-x={2}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHovered(true);
            }}
            onPointerOut={(e) => setHovered(false)}
          >
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
        </Select>
      </Selection>

      {/* 底板 */}
      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
};

export default Experience;
