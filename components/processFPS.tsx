import { PerspectiveCamera, Quaternion, Vector3 } from 'three'
import { clamp } from 'three/src/math/MathUtils.js'

const v1 = new Vector3()
const q1 = new Quaternion()
const q2 = new Quaternion()
let theta = 0
export const processFPS = ({
  movementY,
}: {
  movementY: number
}): Quaternion => {
  if (movementY) {
    q2.set(0, 0, 0, 1)
    const yh = movementY / window.innerHeight

    theta = clamp(theta + -yh * 5, -Math.PI / 3, Math.PI / 3)

    const qz = q1.setFromAxisAngle(v1.set(1, 0, 0), theta)

    q2.multiply(qz)
  }
  return q2
}
