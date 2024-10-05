'use client'

import StarsViewer from '@/components/stars/starsViewer/StarsViewer'
import styles from './ExchangeReviewCard.module.css'

import { useTranslation } from 'react-i18next'

const ExchangeReviewCard = ({ review }) => {
  const { t } = useTranslation()
  const { rating, time, typeTime, user, username, text } = review

  const actualUser = 65411 // id of user in session

  const getTimeString = (time, typeTime) => {
    const translatedType = t(typeTime, { count: time })
    return `${time} ${translatedType}`
  }

  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <p className={styles.rating}>{rating} / 5</p>
        <StarsViewer reviewAverage={rating} className={styles.stars}/>
        <p className={styles.time}>{getTimeString(time, typeTime)} {t('ago')}</p>
        {user === actualUser
          ? <button className={styles.editButton}>{t('Edit')}</button>
          : <p className={styles.user}>{t('by')} {username}</p>
        }
      </div>
      <p className={styles.text}>{text}</p>
      {user === actualUser
        ? <button className={styles.editButtonHidden}>{t('Edit')}</button>
        : <p className={styles.userHidden}>{t('by')} {username}</p>
      }
    </div>
  )
}

export default ExchangeReviewCard
