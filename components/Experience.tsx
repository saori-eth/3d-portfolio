'use client'
import { Canvas } from '@react-three/fiber'
import { Loader, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Suspense, useEffect, useState } from 'react'
import { World } from './World'
import { GUI } from './GUI'

const Experience = () => {
  const [mobile, setMobile] = useState(window.innerWidth < 768)
  useEffect(() => {
    window.addEventListener('resize', () => {
      setMobile(window.innerWidth < 768)
    })
  }, [])
  return (
    <>
      <Loader />
      <Canvas>
        {/* <OrbitControls /> */}
        <Suspense fallback={null}>
          <GUI />
          <PerspectiveCamera
            makeDefault
            position={[0.5, 1.25, 2]}
            fov={mobile ? 60 : 50}
          />
          <World />
        </Suspense>
      </Canvas>
    </>
  )
}

export default Experience
