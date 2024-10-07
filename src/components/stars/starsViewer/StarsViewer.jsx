'use client'

import { useState, useEffect } from 'react'
import styles from './StarsViewer.module.css'
import StarIcon from '@/components/icons/starIcon'

const StarsViewer = ({ reviewAverage, className }) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window?.innerWidth <= 380)
    }

    checkScreenWidth()
    window.addEventListener('resize', checkScreenWidth)

    return () => window?.removeEventListener('resize', checkScreenWidth)
  }, [])

  const renderStars = () => {
    const stars = []
    const fullStars = Math.floor(reviewAverage)
    const decimal = reviewAverage - fullStars

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<StarIcon key={i} fillPercentage={100} />)
      } else if (i === fullStars + 1 && decimal > 0) {
        stars.push(<StarIcon key={i} fillPercentage={decimal * 100} />)
      } else {
        stars.push(<StarIcon key={i} fillPercentage={0} />)
      }
    }
    return stars
  }

  return (
    <div className={`${styles.stars} ${className}`}>
      {isMobile ? renderStars()[0] : renderStars()}
    </div>
  )
}

export default StarsViewer
