'use client'

import styles from './EditRateExchangePopup.module.css'

import { useTranslation, Trans } from 'react-i18next'
import { useState, useEffect } from 'react'

import PopupSkeleton from '@/components/popups/popupSkeleton/PopupSkeleton.jsx'
import StarsSelector from '@/components/stars/starsSelector/StarsSelector'

const EditRateExchangePopup = ({ showPopup, setShowPopup, exchangeLogo, exchangeName, review }) => {
  const { t } = useTranslation()
  const [rating, setRating] = useState(review.rating)
  const [text, setText] = useState(review.text)
  const [active, setActive] = useState(false)

  const handleSave = () => {
    const reviewId = review.id
    // send review logic
    setShowPopup(false)
  }

  const handleDelete = () => {
    // delete review logic
    setShowPopup(false)
  }

  const handleRatingChange = (newRating) => {
    setRating(newRating)
  }

  const handleTextChange = (e) => {
    setText(e.target.value)
  }

  // checks if user setted rate and text to unlock button
  useEffect(() => {
    const hasChanges = rating !== review.rating || text !== review.text
    const isValid = rating > 0 && text.length > 0
    setActive(hasChanges && isValid)
  }, [rating, text, review.rating, review.text])

  // reset values when close the popup
  useEffect(() => {
    if (!showPopup) {
      setRating(review.rating)
      setText(review.text)
    }
  }, [showPopup, review])

  if (showPopup) {
    return (
      <PopupSkeleton setShowPopup={setShowPopup} removeBackground={true} title={t('edit review')}>
        <>
          <div className={styles.middle}>
            <StarsSelector 
              onRatingChange={handleRatingChange} 
              className={styles.starsSelectable} 
              initialRating={rating}
            />
            <label className={styles.label}>{t('review')}</label>
            <textarea
              className={styles.input}
              placeholder={t('share your experience with this exchange and help others.')}
              rows="4"
              maxLength="1000"
              onChange={handleTextChange}
              value={text}
            />
            <p className={styles.disclaimer}>
              <Trans 
                i18nKey="by submitting your review, you agree to our Privacy Policy." 
                components={[<a href='https://silicore.io/privacy-policy' target='_blank' className={styles.underline} key="underline" />]}
              />
            </p>
          </div>
          <div className={styles.bottom}>
            <div className={styles.exchangeContainer}>
              <p className={styles.hiddenText}>Exchange</p>
              <div className={styles.exchange}>
                <img className={styles.exchangeLogo} src={`${exchangeLogo}`} alt={`${exchangeName} logo`}></img>
                <p className={styles.exchangeName}>{exchangeName}</p>
              </div>
            </div>
            <div className={styles.buttons}>
              <button onClick={handleDelete} className={styles.buttonDelete}>{t('delete')}</button>
              <button disabled={!active} onClick={handleSave} className={`${styles.button} ${active && styles.active}`}>{t('save')}</button>
            </div>
          </div>
        </>
      </PopupSkeleton>
    )
  }

  return null
}

export default EditRateExchangePopup
