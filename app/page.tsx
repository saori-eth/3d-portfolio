'use client'
import dynamic from 'next/dynamic'
const Experience = dynamic(() => import('../components/Experience'), {
  ssr: false,
})
import { Header } from '@/components/Header'
import { useState } from 'react'

export default function Home() {
  const [loaded, setLoaded] = useState<boolean>(false)
  return (
    <>
      {loaded && <Header />}
      <Experience setLoaded={setLoaded} />
    </>
  )
}
