'use client'

import React, { useRef } from 'react'
import styles from './Slider.module.css'

const Slider = ({ elements }) => {
  const sliderRef = useRef(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  const handleMouseDown = (e) => {
    isDragging.current = true
    sliderRef.current.classList.add(styles.grabbing)
    startX.current = e.pageX - sliderRef.current.offsetLeft
    scrollLeft.current = sliderRef.current.scrollLeft
  }

  const handleMouseLeave = () => {
    isDragging.current = false
    sliderRef.current.classList.remove(styles.grabbing)
  }

  const handleMouseUp = () => {
    isDragging.current = false
    sliderRef.current.classList.remove(styles.grabbing)
  }

  const handleMouseMove = (e) => {
    if (!isDragging.current) return
    e.preventDefault()
    const x = e.pageX - sliderRef.current.offsetLeft
    const walk = (x - startX.current)
    sliderRef.current.scrollLeft = scrollLeft.current - walk
  }

  // Handle touch events in mobile devices
  const handleTouchStart = (e) => {
    isDragging.current = true
    sliderRef.current.classList.add(styles.grabbing)
    startX.current = e.touches[0].pageX - sliderRef.current.offsetLeft
    scrollLeft.current = sliderRef.current.scrollLeft
  }

  const handleTouchEnd = () => {
    isDragging.current = false
    sliderRef.current.classList.remove(styles.grabbing)
  }

  const handleTouchMove = (e) => {
    if (!isDragging.current) return
    const x = e.touches[0].pageX - sliderRef.current.offsetLeft
    const walk = (x - startX.current)
    sliderRef.current.scrollLeft = scrollLeft.current - walk
  }

  return (
    <div className={styles.sliderContainer}>
      <div
        className={styles.slider}
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
      >
        {elements.map((element, index) => (
          <p key={index} className={styles.element}>{element}</p>
        ))}
        <div className={styles.shadow}></div>
      </div>
    </div>
  )
}

export default Slider
