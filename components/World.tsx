import { useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { Euler, Mesh, Quaternion, Vector3 } from 'three'
import { processFPS } from './processFPS'

const q1 = new Quaternion()
const q2 = new Quaternion()
const q3 = new Quaternion()
const v1 = new Vector3()
const v2 = new Vector3()
const v3 = new Vector3()
const e1 = new Euler()
const e2 = new Euler()
const e3 = new Euler()

export const World = () => {
  const bodyOneRef = useRef<Mesh>(null)
  const boneRef = useRef<Mesh>(null)
  const bodyTwoRef = useRef<Mesh>(null)
  const pointerRef = useRef<{ movementX: number; movementY: number }>({
    movementX: 0,
    movementY: 0,
  })

  useEffect(() => {
    window.addEventListener('pointermove', (e) => {
      pointerRef.current.movementX = e.movementX
      pointerRef.current.movementY = e.movementY
    })

    return () => {
      window.removeEventListener('pointermove', () => {})
    }
  }, [])

  useFrame(() => {
    const { current: bodyOne } = bodyOneRef
    const { current: bone } = boneRef
    const { current: bodyTwo } = bodyTwoRef
    const { current: pointer } = pointerRef
    if (!bodyOne || !bodyTwo || !bone || !pointer) return
    const { movementY } = pointer

    const verticalQuat = processFPS({ movementY })
    bodyTwo.setRotationFromQuaternion(verticalQuat)

    pointer.movementX = 0
    pointer.movementY = 0
  })
  return (
    <>
      <ambientLight intensity={1} />
      <mesh position={[2, 0, 0]} ref={bodyOneRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshPhongMaterial color="hotpink" transparent opacity={0.5} />
        <mesh rotation={[0, Math.PI / 4, 0]} ref={boneRef}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial color="red" />
        </mesh>
      </mesh>

      <mesh
        position={[-2, 0, 0]}
        rotation={[Math.PI / 4, 0, 0]}
        ref={bodyTwoRef}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="blue" />
      </mesh>
    </>
  )
}
