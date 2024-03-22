import { Environment } from "@react-three/drei";

export const World = () => {
  return (
    <>
      <Environment files="night_sky.hdr" background={true} />;
    </>
  );
};
