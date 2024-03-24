import { Avatar } from './Avatar'
import { Skybox } from './Skybox'

export const World = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <Skybox />
      <Avatar />
    </>
  )
}
