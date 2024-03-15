import React from "react";
import { OrbitControls } from "@react-three/drei";
import { Physics, Debug } from "@react-three/rapier";
import Level, { BlockAxe, BlockSpinner, BlockLimbo } from "./Level";
import Lights from "./Lights";
import Player from "./Player";
import useGame from "./stores/useGame";
import Effects from "./Effects";

const Experience = () => {
  const blocksCount = useGame((state) => state.blocksCount);
  const blockSeed = useGame((state) => state.blockSeed);
  return (
    <>
      <color args={["#bdedfc"]} attach="background" />
      {/* <OrbitControls makeDefault /> */}
      <Physics>
        {/* <Debug /> */}
        <Lights />
        <Level count={blocksCount} seed={blockSeed} />
        <Player />
      </Physics>
      <Effects />
    </>
  );
};

export default Experience;
