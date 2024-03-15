import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody, useRapier } from "@react-three/rapier";
import { useKeyboardControls } from "@react-three/drei";
import * as RAPIER from "@dimforge/rapier3d-compat";
import * as THREE from "three";

export default function Player() {
  const body = useRef();
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const { rapier, world } = useRapier();
  const rapierWorld = world.raw();

  const [smoothedCameraPositon] = useState(() => new THREE.Vector3(10, 10, 10));
  const [smoothedCameraTarget] = useState(() => new THREE.Vector3());

  const jump = () => {
    const origin = body.current.translation();
    origin.y -= 0.31;
    const direction = { x: 0, y: -1, z: 0 };
    const ray = new rapier.Ray(origin, direction);
    const hit = rapierWorld.castRay(ray, 10, true);
    if (hit.toi < 0.15) {
      body.current.applyImpulse({ x: 0, y: 0.5, z: 0 });
    }
  };
  useEffect(() => {
    const unsubscribeJump = subscribeKeys(
      (state) => state.jump,
      (value) => {
        if (value) {
          jump();
        }
      }
    );
    return () => unsubscribeJump();
  }, []);

  useFrame((state, delta) => {
    const { forward, backward, leftward, rightward, jump } = getKeys();
    /**每个电脑的帧率不同，例如，一帧=60次，意味着如果不做处理
     * 性能差的电脑一帧只会作用50次，而性能高的电脑一帧回作用70次
     * 这样每次按下按钮，物体在不同电脑上受到的力不同，行驶的距离也不同
     * */
    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = 0.6 * delta;
    const torqueStrength = 0.2 * delta;

    if (forward) {
      impulse.z -= impulseStrength;
      torque.x -= torqueStrength;
    }
    if (rightward) {
      impulse.x += impulseStrength;
      torque.z -= torqueStrength;
    }
    if (backward) {
      impulse.z += impulseStrength;
      torque.x += torqueStrength;
    }
    if (leftward) {
      impulse.x -= impulseStrength;
      torque.z += torqueStrength;
    }

    body.current.applyImpulse(impulse);
    body.current.applyTorqueImpulse(torque);

    /**
     * 相机跟随
     *
     */
    const bodyPosition = body.current.translation();

    const cameraPosition = new THREE.Vector3();
    cameraPosition.copy(bodyPosition);
    cameraPosition.z += 2.25;
    cameraPosition.y += 0.65;

    const cameraTarget = new THREE.Vector3();
    cameraTarget.copy(bodyPosition);
    cameraTarget.y += 0.25;

    smoothedCameraPositon.lerp(cameraPosition, 5 * delta);
    smoothedCameraTarget.lerp(cameraTarget, 5 * delta);

    state.camera.position.copy(smoothedCameraPositon);
    state.camera.lookAt(smoothedCameraTarget);
  });
  return (
    <RigidBody
      linearDamping={0.5}
      angularDamping={0.5}
      ref={body}
      position={[0, 1, 0]}
      colliders="ball"
      restitution={0.2}
      friction={1}
    >
      <mesh castShadow>
        <icosahedronGeometry args={[0.3, 1]} />
        <meshStandardMaterial color="mediumpurple" flatShading />
      </mesh>
    </RigidBody>
  );
}
