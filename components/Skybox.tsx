import { useTexture } from '@react-three/drei'

export const Skybox = () => {
  const texture = useTexture('skybox/skybox.png')
  return (
    <mesh>
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial map={texture} side={2} />
    </mesh>
  )
}
