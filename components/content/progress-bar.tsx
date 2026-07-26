'use client'

import { motion, useScroll } from 'framer-motion'

export function ReadingProgressBar() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed left-0 top-0 z-50 h-1 origin-left bg-gradient-to-r from-[#22C55E] via-[#86efac] to-[#dcfce7]"
      style={{ scaleX: scrollYProgress }}
    />
  )
}
