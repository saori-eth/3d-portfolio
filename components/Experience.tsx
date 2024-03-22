"use client";
import { Canvas } from "@react-three/fiber";
import { Loader, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Suspense } from "react";
import { World } from "./World";
import { GUI } from "./GUI";

const Experience = () => {
  return (
    <>
      <Loader />
      <Canvas>
        <GUI />
        <PerspectiveCamera makeDefault position={[0.5, 1.25, 2]} />
        <Suspense fallback={null}>
          <World />
        </Suspense>
      </Canvas>
    </>
  );
};

export default Experience;
