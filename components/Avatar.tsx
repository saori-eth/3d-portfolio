import { useClips } from "@/hooks/useClips";
import { useVRMloader } from "@/hooks/useVRMLoader";
import { useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Object3D } from "three";
import { degToRad } from "three/src/math/MathUtils.js";

export const Avatar = () => {
  const vrm = useVRMloader("/avatar/avatar.vrm");
  const clips = useClips(vrm);
  const { mixer, actions } = useAnimations(clips, vrm.scene);
  const lookAtTarget = useRef<Object3D>();

  useEffect(() => {
    const target = lookAtTarget.current;
    if (!target || !vrm.lookAt) return console.error("No lookAtTarget found");
    vrm.lookAt.target = target;
    const onMouseMove = (e: MouseEvent) => {
      target.position.x =
        10.0 * ((e.clientX - 0.5 * window.innerWidth) / window.innerHeight);
      target.position.y =
        -10.0 * ((e.clientY - 0.5 * window.innerHeight) / window.innerHeight);
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  useEffect(() => {
    if (!actions.idle) return console.error("No idle animation found");
    actions.idle.play();
  }, [actions]);

  useFrame((_, delta) => {
    vrm.update(delta);
    mixer.update(delta);
  });

  return (
    <group rotation={[0, degToRad(45), 0]}>
      <primitive object={new Object3D()} ref={lookAtTarget} />
      <primitive object={vrm.scene} />
    </group>
  );
};
