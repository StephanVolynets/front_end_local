'use client'

import styles from './Carrousel.module.css'

import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

const Carrousel = () => {
  const { t } = useTranslation()

  const [currentAdIndex, setCurrentAdIndex] = useState(0)

  const ads = [
    { img: "/img/ad-example-1.png", alt: t('Cripto Ad 1') },
    { img: "/img/ad-example-2.png", alt: t('Cripto Ad 2') },
    { img: "/img/ad-example-1.png", alt: t('Cripto Ad 1') },
    { img: "/img/ad-example-2.png", alt: t('Cripto Ad 2') },
    { img: "/img/ad-example-1.png", alt: t('Cripto Ad 1') },
    { img: "/img/ad-example-2.png", alt: t('Cripto Ad 2') },
  ]

  const intervalRef = useRef(null)

  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length)
    }, 5000) // Change the ad every 5 seconds
  }

  useEffect(() => {
    startInterval()

    return () => clearInterval(intervalRef.current)
  }, [])

  // if user clicks on a dot, stop the interval and start it again
  const handleDotClick = (index) => {
    setCurrentAdIndex(index)
    clearInterval(intervalRef.current)
    startInterval()
  }

  return (
    <aside className={styles.adBanner}>
      <div className={styles.adCarouselContainer}>
        <div
          className={styles.adCarousel}
          style={{
            transform: `translateX(calc(-${currentAdIndex * 100}% - ${currentAdIndex * 20}px))`,
          }}
        >
          {ads.map((ad, index) => (
            <img
              key={index}
              className={`${styles.adImg} ${index === currentAdIndex ? styles.active : ''}`}
              src={ad.img}
              alt={ad.alt}
            />
          ))}
        </div>
      </div>
      <div className={styles.adDots}>
        {ads.map((_, index) => (
          <span
            key={index}
            className={`${styles.adDot} ${index === currentAdIndex ? styles.activeDot : ''}`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </aside>
  )
}

export default Carrousel
