"use client";
import { Canvas } from "@react-three/fiber";
import { Loader, Stats } from "@react-three/drei";
import { Suspense } from "react";
import { World } from "./World";

const Experience = () => {
  return (
    <>
      <Loader />
      <Canvas>
        <Suspense fallback={null}>
          <World />
        </Suspense>
      </Canvas>
    </>
  );
};

export default Experience;
