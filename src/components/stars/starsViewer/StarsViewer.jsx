'use client'

import styles from './StarsViewer.module.css'

import StarIcon from '@/components/icons/starIcon'

const StarsViewer = ({ reviewAverage }) => {

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
    <div className={styles.stars}>{renderStars()}</div>
  )
}

export default StarsViewer
