import { useProgress } from '@react-three/drei'
import { useEffect, useState } from 'react'

export const LoadingScreen = () => {
  const { progress, item } = useProgress()
  const [items, setItems] = useState<string[]>([])

  useEffect(() => {
    if (item) {
      const fileName = item.split('/')
      setItems((prev) => [...prev, fileName[fileName.length - 1]])
    }
  }, [item])

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-start items-start bg-black text-white text-2xl">
      <div className="pl-8 pt-8 text-lime-500 font-mono">
        <div>Loading...</div>
        <div className="w-full bg-gray-500" style={{ width: 300 }}>
          <div
            className="bg-lime-500 h-4"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </div>
      </div>
    </div>
  )
}
