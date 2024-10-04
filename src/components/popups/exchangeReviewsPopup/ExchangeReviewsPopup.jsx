'use client'

import styles from './ExchangeReviewsPopup.module.css'

import PopupSkeleton from '@/components/popups/popupSkeleton/PopupSkeleton.jsx'

const ExchangeReviewsPopup = ({ showPopup, setShowPopup }) => {
  if (showPopup) {
    return (
      <PopupSkeleton setShowPopup={setShowPopup} removeBackground={true}>
        <>
          <div className={styles.middle}>
          </div>
        </>
      </PopupSkeleton>
    )
  }
}

export default ExchangeReviewsPopup
