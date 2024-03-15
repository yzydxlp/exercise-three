import React, { StrictMode } from "react";
import { Canvas } from "@react-three/fiber";
import { SoftShadows } from "@react-three/drei";
import { Leva } from "leva";
import Experience from "./Experience_7.js";
import { KeyboardControls } from "@react-three/drei";
import { createRoot } from "react-dom/client";
import * as THREE from "three";
import "./style.css";
const root = createRoot(document.getElementById("root"));
const cameraSettings = {
  fov: 45,
  near: 0.1,
  far: 200,
  position: [2.5, 4, 6],
};

root.render(
  <KeyboardControls
    map={[
      { name: "forward", keys: ["ArrowUp", "KeyW"] },
      { name: "backward", keys: ["ArrowDown", "KeyS"] },
      { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
      { name: "rightward", keys: ["ArrowRight", "KeyD"] },
      { name: "jump", keys: ["Space"] },
    ]}
  >
    <Leva collapsed />
    <Canvas
      shadows={true}
      flat
      camera={cameraSettings}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        outputColorSpace: THREE.sRGBEncoding,
      }}
    >
      <SoftShadows size={5} samples={17} />
      <Experience />
    </Canvas>
  </KeyboardControls>
);
