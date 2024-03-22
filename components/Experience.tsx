"use client";
import { Canvas } from "@react-three/fiber";
import { Loader, PerspectiveCamera, Stats } from "@react-three/drei";
import { Suspense } from "react";
import { World } from "./World";

const Experience = () => {
  return (
    <>
      <Loader />
      <Canvas>
        <PerspectiveCamera makeDefault position={[0.5, 1.5, 2]} />
        <Suspense fallback={null}>
          <World />
        </Suspense>
      </Canvas>
    </>
  );
};

export default Experience;
