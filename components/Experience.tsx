'use client'
import { Canvas } from '@react-three/fiber'
import { Loader, PerspectiveCamera } from '@react-three/drei'
import { Suspense } from 'react'
import { World } from './World'
import { GUI } from './GUI'

const Experience = () => {
  return (
    <>
      <Loader />
      <Canvas>
        <Suspense fallback={null}>
          <GUI />
          <PerspectiveCamera makeDefault position={[0.5, 1.25, 2]} />
          <World />
        </Suspense>
      </Canvas>
    </>
  )
}

export default Experience
