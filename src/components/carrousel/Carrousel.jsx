'use client'

import styles from './Carrousel.module.css'

import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

const Carrousel = ({ invertDots }) => {
  const { t } = useTranslation()

  const [currentAdIndex, setCurrentAdIndex] = useState(0)

  const ads = [ // you must use different imgs for desktop and mobile
    { img: "/img/ad-example-1.png", alt: t('Crypto Ad 1'), href: "https://www.cryptomkt.com/" },
    { img: "/img/ad-example-2.png", alt: t('Crypto Ad 2'), href: "https://www.okx.com/" },
    { img: "/img/ad-example-1.png", alt: t('Crypto Ad 1'), href: "https://www.cryptomkt.com/" },
    { img: "/img/ad-example-2.png", alt: t('Crypto Ad 2'), href: "https://www.okx.com/" },
    { img: "/img/ad-example-1.png", alt: t('Crypto Ad 1'), href: "https://www.cryptomkt.com/" },
    { img: "/img/ad-example-2.png", alt: t('Crypto Ad 2'), href: "https://www.okx.com/" },
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
    <aside className={`${styles.adBanner} ${invertDots && styles.invertBanner}`}>
      <div className={styles.adCarouselContainer}>
        <a
          className={styles.adCarousel}
          href="https://www.example.com"
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
        </a>
      </div>
      <div className={`${styles.adDots} ${invertDots && styles.invertDots}`}>
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
