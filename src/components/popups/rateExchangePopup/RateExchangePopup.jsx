'use client'

import styles from './RateExchangePopup.module.css'

import PopupSkeleton from '@/components/popups/popupSkeleton/PopupSkeleton.jsx'

const RateExchangePopup = ({ showPopup, setShowPopup }) => {
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

export default RateExchangePopup
