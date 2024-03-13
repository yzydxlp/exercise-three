import React from "react";

const Cube = ({ scale = 1 }) => {
  return (
    <mesh scale={scale} position-x={2}>
      <boxGeometry />
      <meshStandardMaterial color="mediumpurple" />
    </mesh>
  );
};

export default Cube;
