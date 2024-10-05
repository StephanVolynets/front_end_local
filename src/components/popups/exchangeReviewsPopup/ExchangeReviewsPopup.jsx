'use client'

import styles from './ExchangeReviewsPopup.module.css'

import StarsViewer from '@/components/stars/starsViewer/StarsViewer'

import { useTranslation } from 'react-i18next'

import PopupSkeleton from '@/components/popups/popupSkeleton/PopupSkeleton.jsx'
import ReviewsFilterDropdown from '@/components/dropdowns/reviewsFilterDropdown/ReviewsFilterDropdown'
import ExchangeReviewCard from '@/components/cards/exchangeReviewCard/ExchangeReviewCard'

const ExchangeReviewsPopup = ({ showPopup, setShowPopup }) => {
  const { t } = useTranslation()
  const exchange = 'Binance'
  const reviewAverage = 4.4
  const reviewCounter = 320

  const reviews = [
    {id: 1, rating: 4, time: 3, typeTime: 'month', user: 34525, username: 'Stephan Volynets', text: 'Good for starting, but centralized. Reliable since books are public. Higher ups may insider trade.', canEdit: false},
    {id: 2, rating: 5, time: 1, typeTime: 'week', user: 65411, username: 'Emily Johnson', text: 'Excellent platform. User-friendly interface and low fees. Highly recommended for both beginner and advanced traders.', canEdit: false},
    {id: 3, rating: 3, time: 6, typeTime: 'month', user: 9874, username: 'Michael Smith', text: 'Works well overall, but customer support could be improved. Sometimes they take too long to respond to queries.', canEdit: true},
    {id: 4, rating: 5, time: 2, typeTime: 'year', user: 51319, username: 'Sarah Thompson', text: 'I\'ve been using Binance for a while and never had any issues. Great variety of cryptocurrencies and useful tools.', canEdit: false},
  ]

  if (showPopup) {
    return (
      <PopupSkeleton 
        setShowPopup={setShowPopup} 
        removeBackground={true}  
        logo={<img src='/img/binance-logo-example.png'></img>}
        title={exchange}
      >
        <>
          <div className={styles.middle}>
            <div className={styles.reviewsContainer}>
              <div className={styles.reviews}>
                <p className={styles.reviewsAverage}>{reviewAverage}</p>
                <StarsViewer reviewAverage={reviewAverage} />
                <p className={styles.reviewsCounter}>({reviewCounter})</p>
              </div>
              <ReviewsFilterDropdown />
            </div>
            <div className={styles.reviewsCardsContainer}>
              {reviews.map(review => (
                <ExchangeReviewCard
                  key={review.id}
                  review={review}
                />
              ))}
            </div>
          </div>
          <div className={styles.bottom}>
            <button className={styles.button}>{t('rate exchange')}</button>
          </div>
        </>
      </PopupSkeleton>
    )
  }
}

export default ExchangeReviewsPopup
