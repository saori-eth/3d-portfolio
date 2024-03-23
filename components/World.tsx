import { Environment, Grid, OrbitControls } from '@react-three/drei'
import { Avatar } from './Avatar'

export const World = () => {
  return (
    <>
      <Environment files="skybox/night_sky.hdr" background={true} />;
      <Avatar />
    </>
  )
}
