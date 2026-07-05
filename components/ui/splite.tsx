'use client'

import { Suspense, lazy } from 'react'

// `@splinetool/react-spline` pulls a heavy WebGL runtime; lazy-load it so the
// chunk is only fetched when a SplineScene actually mounts.
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  /** A `prod.spline.design/.../scene.splinecode` URL. */
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <span className="loader" />
        </div>
      }
    >
      <Spline scene={scene} className={className} />
    </Suspense>
  )
}
