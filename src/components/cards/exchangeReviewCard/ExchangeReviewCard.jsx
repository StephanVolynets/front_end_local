"use client";

import styles from "./ExchangeReviewCard.module.css";

import { useTranslation } from "react-i18next";

import StarsViewer from "@/components/stars/starsViewer/StarsViewer";
import EditRateExchangePopup from "@/components/popups/editRateExchangePopup/EditRateExchangePopup";
import { formatDistanceToNow, parseISO } from "date-fns";

const ExchangeReviewCard = ({
  exchange,
  review,
  onEditReview,
  showEditRateExchangePopup,
  setShowEditRateExchangePopup,
}) => {
  const { t } = useTranslation();

  const {
    rating,
    updated_at,
    typeTime,
    user_id,
    user_name,
    review: reviewText,
  } = review;

  const actualUser = 65411; // assuming random id of user in session

  const getTimeString = (time) => {
    const date = parseISO(time);
    const timeAgo = formatDistanceToNow(date, { addSuffix: true });
    return t("time_ago", { timeAgo });
  };

  const handleEditClick = () => {
    onEditReview(review.id);
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.top}>
          <p className={styles.rating}>{rating} / 5</p>
          <StarsViewer reviewAverage={rating} className={styles.starsViewer} />
          <p className={styles.time}>{getTimeString(updated_at)}</p>
          {user_id === actualUser ? (
            <button className={styles.editButton} onClick={handleEditClick}>
              {t("Edit")}
            </button>
          ) : (
            <p className={styles.user}>
              {t("by")} {user_name}
            </p>
          )}
        </div>
        <p className={styles.text}>{reviewText}</p>
        {user_id === actualUser ? (
          <button className={styles.editButtonHidden} onClick={handleEditClick}>
            {t("Edit")}
          </button>
        ) : (
          <p className={styles.userHidden}>
            {t("by")} {user_name}
          </p>
        )}
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
  );
};

export default ExchangeReviewCard;
