'use client'
import { Canvas } from '@react-three/fiber'
import {
  Loader,
  OrbitControls,
  PerspectiveCamera,
  ScrollControls,
} from '@react-three/drei'
import { Suspense, useEffect, useState } from 'react'
import { World } from './World'
import { GUI } from './GUI'
import { useProgress } from '@react-three/drei'

interface ExperienceProps {
  setLoaded: (loaded: boolean) => void
}

const Experience = (props: ExperienceProps) => {
  const { setLoaded } = props
  const { progress } = useProgress()
  useEffect(() => {
    if (progress === 100) {
      setLoaded(true)
    }
  }, [progress])
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
          <ScrollControls pages={2} damping={0.1}>
            <GUI />
          </ScrollControls>
          <PerspectiveCamera
            makeDefault
            position={[0.5, 1.25, 2]}
            fov={mobile ? 60 : 50}
          />
          <World mobile={mobile} />
        </Suspense>
      </Canvas>
    </>
  )
}

export default Experience
