import React, { StrictMode } from "react";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
// import Experience from "./Experience.js";
// import Experience from "./Experience_2.js";
import Experience from "./Experience_3.js";
import { createRoot } from "react-dom/client";
import * as THREE from "three";
import "./style.css";

const root = createRoot(document.getElementById("root"));
const cameraSettings = {
  fov: 45,
  near: 0.1,
  far: 200,
  position: [-4, 3, 6],
};

const created = ({ gl, scene }) => {
  // gl.setClearColor("lightblue");
  scene.background = new THREE.Color("lightblue");
};
root.render(
  <StrictMode>
    <Leva collapsed />
    <Canvas
      flat
      camera={cameraSettings}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        outputColorSpace: THREE.sRGBEncoding,
      }}
      onCreated={created}
    >
      <Experience />
    </Canvas>
  </StrictMode>
);
