import React from "react";

interface LoadingProps {
  loadingProgress: number;
}

export const Loading: React.FC<LoadingProps> = ({ loadingProgress }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black flex justify-center items-center text-white text-2xl">
      <div className="absolute bottom-0 left-0 p-4 flex items-center">
        <span>Loading</span>
        <span className="ml-2">{Math.round(loadingProgress * 100)}%</span>
      </div>
    </div>
  );
};
