import React, { StrictMode } from "react";
import { Canvas } from "@react-three/fiber";
import { SoftShadows } from "@react-three/drei";
import { Leva } from "leva";
import Experience from "./Experience_5.js";
import { createRoot } from "react-dom/client";
import * as THREE from "three";
import "./style.css";

new THREE.Color();

const root = createRoot(document.getElementById("root"));
const cameraSettings = {
  fov: 45,
  near: 0.1,
  far: 200,
  position: [-4, 3, 6],
};

root.render(
  <StrictMode>
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
  </StrictMode>
);
