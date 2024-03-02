"use client";
import { useContext, useState, useEffect } from "react";
import { DriverContext } from "./driver/DriverContext";
import { Loading } from "./components/Loading";

export default function Home() {
  const [loadingProgress, setLoadingProgress] = useState(0);

  const driver = useContext(DriverContext);
  useEffect(() => {
    if (driver) {
      driver.onProgress((progress) => {
        setLoadingProgress(progress);
        console.log(progress);
      });
    }
  }, [driver]);
  return (
    <>
      {loadingProgress < 1 ? (
        <Loading loadingProgress={loadingProgress} />
      ) : null}
    </>
  );
}
