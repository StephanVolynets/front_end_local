'use client'

import styles from './StarsSelector.module.css'
import { useState, useEffect } from 'react'
import StarIcon from '@/components/icons/starIcon'

const StarsSelector = ({ className, onRatingChange, initialRating = 0 }) => {
  const [rating, setRating] = useState(initialRating)
  const [hover, setHover] = useState(0)

  useEffect(() => {
    setRating(initialRating)
  }, [initialRating])

  const handleClick = (value) => {
    setRating(value)
    if (onRatingChange) {
      onRatingChange(value)
    }
  }

  const renderStars = () => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          onClick={() => handleClick(i)}
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(0)}
        >
          <StarIcon fillPercentage={(hover || rating) >= i ? 100 : 0} />
        </span>
      )
    }
    return stars
  }

  return (
    <div className={styles.starsSelector}>
      <p className={styles.rating}>{hover || rating || '-'} / 5</p>
      <div className={`${styles.stars} ${className}`}>{renderStars()}</div>
    </div>
  )
}

export default StarsSelector
