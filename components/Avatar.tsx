import { useClips } from '@/hooks/useClips'
import { useVRMloader } from '@/hooks/useVRMLoader'
import { SpotLight, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { Object3D } from 'three'
import { degToRad } from 'three/src/math/MathUtils.js'

export const Avatar = () => {
  const vrm = useVRMloader('/avatar/avatar.vrm')
  const clips = useClips(vrm)
  const { mixer, actions } = useAnimations(clips, vrm.scene)
  const lookAtTarget = useRef<Object3D>()
  const defaultLookAtTarget = {
    x: -0.717,
    y: 0.502,
  }

  useEffect(() => {
    const target = lookAtTarget.current
    if (!target || !vrm.lookAt) return console.error('No lookAtTarget found')
    target.position.set(defaultLookAtTarget.x, defaultLookAtTarget.y, 0)
    vrm.lookAt.target = target
    const onMouseMove = (e: MouseEvent) => {
      target.position.x =
        10.0 * ((e.clientX - 0.5 * window.innerWidth) / window.innerHeight)
      target.position.y =
        -10.0 * ((e.clientY - 0.5 * window.innerHeight) / window.innerHeight)
    }
    window.addEventListener('mousemove', onMouseMove)

    const neckBone = vrm.humanoid.getNormalizedBoneNode('neck')
    if (!neckBone) return console.error('No neck bone found')
    neckBone.rotation.y = degToRad(90)

    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  useEffect(() => {
    if (!actions.idle) return console.error('No idle animation found')
    actions.idle.setEffectiveTimeScale(0.5)
    actions.idle.play()
  }, [actions])

  useFrame((_, delta) => {
    vrm.update(delta)
    mixer.update(delta)
  })

  return (
    <>
      <primitive object={new Object3D()} ref={lookAtTarget} />

      <group position={[0.1, 0.5, 0]} rotation={[0, degToRad(45), 0]}>
        <primitive object={vrm.scene} />
      </group>

      <group position={[1, 2.25, 0]}>
        <SpotLight
          distance={5}
          angle={0.15}
          attenuation={2.75}
          anglePower={5}
        />
      </group>
    </>
  )
}
