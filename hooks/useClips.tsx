import { loadAnim } from "../utils";
import { VRM } from "@pixiv/three-vrm";
import { useState, useEffect } from "react";
import { AnimationClip } from "three";

const animationMap = {
  idle: "/avatar/idle.fbx",
};

export const useClips = (avatar: VRM): AnimationClip[] => {
  const [clips, setClips] = useState<AnimationClip[]>([]);

  useEffect(() => {
    Object.entries(animationMap).forEach(([name, url]) => {
      loadAnim(url, avatar).then((clip) => {
        if (!clip) return;
        clip.name = name;
        setClips((clips) => [...clips, clip]);
      });
    });
  }, []);

  return clips;
};
