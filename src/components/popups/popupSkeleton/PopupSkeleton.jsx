'use client'

import styles from './PopupSkeleton.module.css'
import React, { useEffect, useState } from 'react'
import CloseIcon from '@/components/icons/closeIcon'
import ReactDOM from 'react-dom'
import SilicoreLogo from '@/components/icons/silicoreLogo'

const PopupSkeleton = ({ children, setShowPopup, closePopup, setClosePopup, width }) => {
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
  }, [setShowPopup, closePopup, setClosePopup])

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
        <div className={`${styles.popupBackground} ${reverseAnimation ? styles.disabledBackground : ''}`}>
          <div className={`${styles.popupBody} ${reverseAnimation ? styles.disabledBody : ''}`} style={{ width: width }}>
            <div className={styles.top}>
              <SilicoreLogo className={styles.logo} />
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
