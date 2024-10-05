'use client'

import styles from './PopupSkeleton.module.css'
import React, { useEffect, useState } from 'react'
import CloseIcon from '@/components/icons/closeIcon'
import ReactDOM from 'react-dom'

const PopupSkeleton = ({ children, setShowPopup, closePopup, setClosePopup, hide, removeBackground, width, logo, title }) => {
  const [reverseAnimation, setReverseAnimation] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // if user goes back and the popup is open, close the popup, no history.
  useEffect(() => {
    setIsClient(true)
    document.body.style.overflow = 'hidden'

    window.history.pushState(null, null, window.location.pathname)

    const handlePopState = (event) => {
      event.preventDefault()
      handleClose()
    }

    window.addEventListener('popstate', handlePopState)
    return () => {
      document.body.style.overflow = 'auto'
      window.removeEventListener('popstate', handlePopState)
    }
  }, [setShowPopup, closePopup, setClosePopup, hide, removeBackground])

  const handleClose = () => {
    setReverseAnimation(true)
    setTimeout(() => {
      setShowPopup(false)
      if (closePopup) {
        setClosePopup(false)
      }
      document.body.style.overflow = 'auto'
    }, 400)
  }

  useEffect(() => {
    if (closePopup) {
      handleClose()
    }
  }, [closePopup])

  return (
    <>
      {isClient && ReactDOM.createPortal(
        <div className={`${styles.popupBackground} ${reverseAnimation ? styles.disabledBackground : ''} ${removeBackground ? styles.removeBackground : ''}`}>
          <div className={`${styles.popupBody} ${reverseAnimation ? styles.disabledBody : ''} ${hide && styles.hideBody}`} style={{ width: width }}>
            <div className={styles.top}>
              <div className={styles.topLeft}>{logo && <img src={`${logo}`}></img>}{title}</div>
              <button className={styles.closeIconButton} onClick={handleClose}>
                <CloseIcon className={styles.closeIcon} />
              </button>
            </div>
            <div className={styles.popupContent}>
              {children}
            </div>
          </div>
        </div>, document.body
      )}
    </>
  )
}

export default PopupSkeleton
