import { useClips } from "@/hooks/useClips";
import { useVRMloader } from "@/hooks/useVRMLoader";
import { useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect } from "react";
export const Avatar = () => {
  const vrm = useVRMloader("/avatar/avatar.vrm");
  const clips = useClips(vrm);
  const { mixer, actions } = useAnimations(clips, vrm.scene);

  useEffect(() => {
    if (!actions.idle) return console.error("No idle animation found");
    actions.idle.play();
  }, [actions]);

  useFrame((_, delta) => {
    vrm.update(delta);
    mixer.update(delta);
  });

  return (
    <group rotation={[0, 45, 0]}>
      <primitive object={vrm.scene} />
    </group>
  );
};
