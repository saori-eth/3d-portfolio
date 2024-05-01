import { MeshReflectorMaterial } from '@react-three/drei'
import { Avatar } from './Avatar'
import { Skybox } from './Skybox'

export const World = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <Skybox />
      <Avatar />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.5, -0]}>
        <planeGeometry args={[100, 100]} />
        <MeshReflectorMaterial
          metalness={0.5}
          roughness={0.5}
          mirror={0.5}
          color={'#a0a0a0'}
        />
      </mesh>
    </>
  )
}
