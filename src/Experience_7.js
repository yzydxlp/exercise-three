import React from "react";
import { OrbitControls } from "@react-three/drei";
import { Physics, Debug } from "@react-three/rapier";
import Level, { BlockAxe, BlockSpinner, BlockLimbo } from "./Level";
import Lights from "./Lights";
import Player from "./Player";

const Experience = () => {
  return (
    <>
      {/* <OrbitControls makeDefault /> */}
      <Physics>
        {/* <Debug /> */}
        <Lights />
        <Level />
        <Player />
      </Physics>
    </>
  );
};

export default Experience;
