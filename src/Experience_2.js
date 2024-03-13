import React from "react";
import { OrbitControls, MeshReflectorMaterial } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { useControls, button } from "leva";
import Cube from "./Cube";

const Experience = () => {
  const { perfVisible } = useControls({
    perfVisible: true,
  });

  const { position, color, visiblel, myInterval, clickMe, choice } =
    useControls("sphere", {
      position: {
        value: { x: -2, y: 0 },
        step: 0.01,
        joystick: "invertY",
      },
      color: "red",
      visiblel: true,
      myInterval: {
        min: 0,
        max: 10,
        value: [4, 5],
      },
      clickMe: button(() => {
        console.log("ok");
      }),
      choice: { options: ["a", "b", "c"] },
    });
  const { scalle } = useControls("cube", {
    scale: {
      value: 1.5,
      stpe: 0.01,
    },
  });
  return (
    <>
      {/* 监控 */}
      {perfVisible ? <Perf position="top-left" /> : null}
      <OrbitControls makeDefault />
      {/* 灯光 */}
      {/* 平行光 */}
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      {/* 环境光 */}
      <ambientLight intensity={0.5} color="0x404040" />

      <mesh position={[position.x, position.y, 0]} visible={visiblel}>
        <sphereGeometry />
        <meshStandardMaterial color={color} />
      </mesh>

      <Cube scale={2} />

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
