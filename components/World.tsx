import { Environment, Grid, OrbitControls } from "@react-three/drei";
import { Avatar } from "./Avatar";

export const World = () => {
  return (
    <>
      <Environment files="skybox/night_sky.hdr" background={true} />;
      <Avatar />
      <group position={[0, 0, 0]}>
        <Grid args={[10, 10]} />
      </group>
    </>
  );
};
