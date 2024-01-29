"use client";
import { useRef, useEffect } from "react";
import { Driver } from "./driver";

export const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const driver = new Driver({ canvas });

    return () => {
      driver.destroy();
    };
  }, []);

  return <canvas ref={canvasRef} />;
};
