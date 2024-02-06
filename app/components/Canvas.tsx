"use client";
import { useRef, useEffect, useState } from "react";
import { DriverContext } from "../driver/DriverContext";
import { Driver } from "../driver";

export const Canvas = ({ children }: { children: React.ReactNode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [driver, setDriver] = useState<Driver | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const newDriver = new Driver({ canvas });
    setDriver(newDriver);

    return () => {
      newDriver.destroy();
    };
  }, []);

  return (
    <DriverContext.Provider value={driver}>
      <canvas ref={canvasRef} />
      {children}
    </DriverContext.Provider>
  );
};
