'use client'

import styles from './Pastnamehere.module.css'

import PopupSkeleton from '@/components/popups/popupSkeleton/PopupSkeleton.jsx'

const Pastnamehere = ({ showPopup, setShowPopup }) => {
  if (showPopup) {
    return (
      <PopupSkeleton setShowPopup={setShowPopup}>
        <>
          <div className={styles.middle}>
          </div>
        </>
      </PopupSkeleton>
    )
  }
}

export default Pastnamehere
