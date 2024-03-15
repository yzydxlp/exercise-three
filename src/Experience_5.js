import React, { useRef, useState, useEffect, useMemo } from "react";
import { OrbitControls, useGLTF } from "@react-three/drei";
import {
  Physics,
  RigidBody,
  Debug,
  CuboidCollider,
  BallCollider,
  CylinderCollider,
  InstancedRigidBodies,
} from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Perf } from "r3f-perf";

const Experience = () => {
  const [hitSound, setHitSound] = useState(
    () => new Audio("/mixkit-basketball-ball-bouncing-2085.wav")
  );
  const cube = useRef();
  const cubes = useRef();
  const twister = useRef();
  const hourse = useGLTF("./Horse.glb");
  const flower = useGLTF("./Flower.glb");
  const cubeJump = () => {
    const mass = cube.current.mass();
    cube.current.applyImpulse({ x: 0, y: 5 * mass, z: 0 });
    cube.current.applyTorqueImpulse({
      x: Math.random() - 0.5,
      y: Math.random() - 0.5,
      z: Math.random() - 0.5,
    });
  };

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const eulerRotation = new THREE.Euler(0, time * 3, 0);
    const quaternionRotation = new THREE.Quaternion();
    quaternionRotation.setFromEuler(eulerRotation);
    twister.current.setNextKinematicRotation(quaternionRotation);
    const angle = time * 0.5;
    const x = Math.cos(angle) * 2;
    const z = Math.sin(angle) * 2;
    twister.current.setNextKinematicTranslation({ x, y: -0.8, z });
  });

  const collisionEnter = () => {
    // 撞击声音
    // hitSound.currentTime = 0;
    // hitSound.volume = Math.random();
    // hitSound.play();
  };
  const cubesCount = 200;
  const cubesTransforms = useMemo(() => {
    const positions = [];
    const rotations = [];
    const scales = [];
    for (let i = 0; i < cubesCount; i++) {
      positions.push([
        (Math.random() - 0.5) * 8,
        6 + i * 0.2,
        (Math.random() - 0.5) * 8,
      ]);
      rotations.push([0, 0, 0]);
      scales.push([
        0.2 + Math.random() * 0.8,
        0.2 + Math.random() * 0.8,
        0.2 + Math.random() * 0.8,
      ]);
    }

    return { positions, rotations, scales };
  }, []);
  // useEffect(() => {
  //   for (let i = 0; i < cubesCount; i++) {
  //     const matrix = new THREE.Matrix4();
  //     matrix.compose(
  //       new THREE.Vector3(i * 2, 0, 0),
  //       new THREE.Quaternion(),
  //       new THREE.Vector3(1, 1, 1)
  //     );
  //     cubes.current.setMatrixAt(i, matrix);
  //   }
  // }, []);
  return (
    <>
      {/* 监控 */}
      <Perf position="top-left" />
      <OrbitControls makeDefault />
      {/* 灯光 */}
      {/* 平行光 */}
      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
      {/* 环境光 */}
      <ambientLight intensity={0.5} color="0x404040" />
      <Physics>
        <Debug />
        <RigidBody colliders="ball" restitution={1}>
          <mesh castShadow position={[-1.5, 2, 0]}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody>
        <RigidBody
          position={[1.5, 2, 0]}
          ref={cube}
          gravityScale={1}
          restitution={0}
          friction={0.7}
          colliders={false}
          // 刚体发生碰撞时触发
          onCollisionEnter={collisionEnter}
          // 刚体分离时触发
          // onCollisionExit={() => console.log("exit")}
          // onSleep={() => console.log("sleep")}
          // onWake={() => console.log("wake")}
        >
          <mesh castShadow onClick={cubeJump}>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
          <CuboidCollider args={[0.5, 0.5, 0.5]} mass={2} />
        </RigidBody>

        {/* 地板   */}
        <RigidBody type="fixed" friction={0.7}>
          <mesh receiveShadow position-y={-1.25}>
            <boxGeometry args={[10, 0.5, 10]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>
        {/* 墙壁 */}
        <RigidBody type="fixed">
          <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, 5.5]} />
          <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, -5.5]} />
          <CuboidCollider args={[0.5, 2, 5]} position={[5.5, 1, 0]} />
          <CuboidCollider args={[0.55, 2, 5]} position={[-5.5, 1, 0]} />
        </RigidBody>
        <RigidBody
          position={[0, -0.8, 0]}
          friction={0}
          type="kinematicPosition"
          ref={twister}
        >
          <mesh castShadow scale={[0.4, 0.4, 3]}>
            <boxGeometry />
            <meshStandardMaterial color="red" />
          </mesh>
        </RigidBody>
        <RigidBody position={[0, 3, 0]} colliders="hull">
          <primitive object={flower.scene} scale={5} position={[0, -0.5, 0]} />
          {/* <CylinderCollider args={[0.5, 0.5, 1]} /> */}
        </RigidBody>
        <InstancedRigidBodies
          positions={cubesTransforms.positions}
          rotations={cubesTransforms.rotations}
          scales={cubesTransforms.scales}
        >
          <instancedMesh castShadow args={[null, null, cubesCount]} ref={cubes}>
            <boxGeometry />
            <meshStandardMaterial color="tomato" />
          </instancedMesh>
        </InstancedRigidBodies>
      </Physics>
    </>
  );
};

export default Experience;
