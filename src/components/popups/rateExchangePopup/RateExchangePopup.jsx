'use client'

import styles from './RateExchangePopup.module.css'

import { useTranslation, Trans } from 'react-i18next'
import { useState, useEffect } from 'react'

import PopupSkeleton from '@/components/popups/popupSkeleton/PopupSkeleton.jsx'
import StarsSelector from '@/components/stars/starsSelector/StarsSelector'

const RateExchangePopup = ({ showPopup, setShowPopup, exchange, logo }) => {
  const { t } = useTranslation()
  const [rating, setRating] = useState(0)
  const [text, setText] = useState('')
  const [active, setActive] = useState(false)

  const handleReview = () => {
    // send review logic
    setShowPopup(false)
  }

  const handleRatingChange = (newRating) => {
    setRating(newRating)
  }

  // checks if user setted rate and text to unlock button
  useEffect(() => {
    if (rating > 0 && text.length > 0) {
      setActive(true)
    } else {
      setActive(false)
    }
  }, [rating, text])

  // reset values when close the popup
  useEffect(() => {
    if (!showPopup) {
      setRating(0)
      setText('')
      setActive(false)
    }
  }, [showPopup])

  if (showPopup) {
    return (
      <PopupSkeleton setShowPopup={setShowPopup} removeBackground={true} title={t('Rate exchange')}>
        <>
          <div className={styles.middle}>
            <StarsSelector onRatingChange={handleRatingChange} className={styles.starsSelectable} />
            <label className={styles.label}>{t('review')}</label>
            <textarea
              className={styles.input}
              placeholder={t('share your experience with this exchange and help others.')}
              rows="4"
              maxLength="1000"
              onChange={(e) => setText(e.target.value)}
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
                <img className={styles.exchangeLogo} src={`${logo}`} alt={`${exchange} logo`}></img>
                <p className={styles.exchangeName}>{exchange}</p>
              </div>
            </div>
            <button disabled={!active} onClick={handleReview} className={`${styles.button} ${active && styles.active}`}>{t('Send review')}</button>
          </div>
        </>
      </PopupSkeleton>
    )
  }

  return null
}

export default RateExchangePopup
