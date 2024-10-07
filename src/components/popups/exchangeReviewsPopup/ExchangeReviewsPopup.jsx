'use client'

import styles from './ExchangeReviewsPopup.module.css'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import PopupSkeleton from '@/components/popups/popupSkeleton/PopupSkeleton.jsx'
import ReviewsFilterDropdown from '@/components/dropdowns/reviewsFilterDropdown/ReviewsFilterDropdown'
import ExchangeReviewCard from '@/components/cards/exchangeReviewCard/ExchangeReviewCard'
import RateExchangePopup from '@/components/popups/rateExchangePopup/RateExchangePopup'
import StarsViewer from '@/components/stars/starsViewer/StarsViewer'

const ExchangeReviewsPopup = ({ showPopup, setShowPopup, exchange, removeBackground }) => {
  const { t } = useTranslation()

  const [showRateExchangePopup, setShowRateExchangePopup] = useState(false)
  const [editingReviewId, setEditingReviewId] = useState(null)

  const reviews = [ // assuming that the reviews are in a separate endpoint refering to the exchange id
    {id: 1, rating: 4, time: 3, typeTime: 'month', user: 34525, username: 'Stephan Volynets', text: 'Good for starting, but centralized. Reliable since books are public. Higher ups may insider trade.', canEdit: false},
    {id: 2, rating: 5, time: 1, typeTime: 'week', user: 65411, username: 'Emily Johnson', text: 'Excellent platform. User-friendly interface and low fees. Highly recommended for both beginner and advanced traders.', canEdit: false},
    {id: 3, rating: 3, time: 6, typeTime: 'month', user: 9874, username: 'Michael Smith', text: 'Works well overall, but customer support could be improved. Sometimes they take too long to respond to queries.', canEdit: true},
    {id: 4, rating: 5, time: 2, typeTime: 'year', user: 51319, username: 'Sarah Thompson', text: 'I\'ve been using Binance for a while and never had any issues. Great variety of cryptocurrencies and useful tools.', canEdit: false},
    {id: 5, rating: 4, time: 3, typeTime: 'month', user: 34525, username: 'Stephan Volynets', text: 'Good for starting, but centralized. Reliable since books are public. Higher ups may insider trade.', canEdit: false},
  ]

  const handleEditReview = (reviewId) => {
    setEditingReviewId(reviewId)
  }

  if (showPopup) {
    return (
      <PopupSkeleton 
        setShowPopup={setShowPopup} 
        removeBackground={removeBackground}  
        logo={exchange.logo}
        title={exchange.name}
        hide={showRateExchangePopup || editingReviewId !== null}
      >
        <>
          <div className={styles.middle}>
            <div className={styles.reviewsContainer}>
              <div className={styles.reviews}>
                <p className={styles.reviewsAverage}>{exchange.rating}</p>
                <StarsViewer reviewAverage={exchange.rating} />
                <p className={styles.reviewsCounter}>({exchange.reviewCount})</p>
              </div>
              <ReviewsFilterDropdown />
            </div>
            <div className={styles.reviewsCardsContainer}>
              {reviews.map(review => (
                <ExchangeReviewCard
                  key={review.id}
                  review={review}
                  exchange={exchange}
                  onEditReview={handleEditReview}
                  showEditRateExchangePopup={editingReviewId === review.id}
                  setShowEditRateExchangePopup={(show) => {
                    if (!show) setEditingReviewId(null)
                  }}
                />
              ))}
            </div>
          </div>
          <div className={styles.bottom}>
            <button className={styles.button} onClick={() => setShowRateExchangePopup(true)}>{t('rate exchange')}</button>
          </div>
          <RateExchangePopup 
            showPopup={showRateExchangePopup} 
            setShowPopup={setShowRateExchangePopup} 
            logo={exchange.logo}
            exchange={exchange.name}
          />
        </>
      </PopupSkeleton>
    )
  }
}

export default ExchangeReviewsPopup
