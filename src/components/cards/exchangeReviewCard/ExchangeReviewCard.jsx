'use client'

import styles from './ExchangeReviewCard.module.css'

import { useTranslation } from 'react-i18next'

import StarsViewer from '@/components/stars/starsViewer/StarsViewer'
import EditRateExchangePopup from '@/components/popups/editRateExchangePopup/EditRateExchangePopup'

const ExchangeReviewCard = ({ exchange, review, onEditReview, showEditRateExchangePopup, setShowEditRateExchangePopup }) => {
  const { t } = useTranslation()

  const { rating, time, typeTime, user, username, text } = review

  const actualUser = 65411 // assuming random id of user in session

  const getTimeString = (time, typeTime) => {
    const translatedType = t(typeTime, { count: time })
    return `${time} ${translatedType}`
  }

  const handleEditClick = () => {
    onEditReview(review.id)
  }

  return (
    <>
      <div className={styles.card}>
        <div className={styles.top}>
          <p className={styles.rating}>{rating} / 5</p>
          <StarsViewer reviewAverage={rating} className={styles.starsViewer}/>
          <p className={styles.time}>{getTimeString(time, typeTime)} {t('ago')}</p>
          {user === actualUser
            ? <button className={styles.editButton} onClick={handleEditClick}>{t('Edit')}</button>
            : <p className={styles.user}>{t('by')} {username}</p>
          }
        </div>
        <p className={styles.text}>{text}</p>
        {user === actualUser
          ? <button className={styles.editButtonHidden} onClick={handleEditClick}>{t('Edit')}</button>
          : <p className={styles.userHidden}>{t('by')} {username}</p>
        }
      </div>
      <EditRateExchangePopup 
        showPopup={showEditRateExchangePopup} 
        setShowPopup={setShowEditRateExchangePopup} 
        exchangeId={exchange.id}
        exchangeLogo={exchange.logo}
        exchangeName={exchange.name}
        review={review}
      />
    </>
  )
}

export default ExchangeReviewCard
