import React, { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";

const CustomObject = () => {
  const geometryRef = useRef(null);

  const verticesCounts = 10 * 3;

  const positions = useMemo(() => {
    const positions = new Float32Array(verticesCounts * 3);
    positions?.forEach((item, index) => {
      positions[index] = (Math.random() - 0.5) * 3;
    });
    return positions;
  }, [verticesCounts]);

  useEffect(() => {
    geometryRef.current.computeVertexNormals();
  }, []);
  return (
    <mesh>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach="attributes-position"
          count={verticesCounts}
          itemSize={3}
          array={positions}
        />
      </bufferGeometry>
      <meshStandardMaterial color="hotpink" side={THREE.DoubleSide} />
    </mesh>
  );
};

export default CustomObject;
