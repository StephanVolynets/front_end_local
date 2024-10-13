"use client";

import styles from "./RateExchangePopup.module.css";

import { useTranslation, Trans } from "react-i18next";
import { useState, useEffect } from "react";

import PopupSkeleton from "@/components/popups/popupSkeleton/PopupSkeleton.jsx";
import StarsSelector from "@/components/stars/starsSelector/StarsSelector";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

const RateExchangePopup = ({
  showPopup,
  setShowPopup,
  exchange,
  logo,
  getExchangeReviews = () => {},
}) => {
  const { t } = useTranslation();
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [active, setActive] = useState(false);
  const { user } = useAuth();

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  // checks if user setted rate and text to unlock button
  useEffect(() => {
    if (rating > 0 && text.length > 0) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [rating, text]);

  // reset values when close the popup
  useEffect(() => {
    if (!showPopup) {
      setRating(0);
      setText("");
      setActive(false);
    }
  }, [showPopup]);

  const handleSendReview = async () => {
    const userId = await getUserId(user.email);
    console.log("userId", userId, exchange, rating, text);

    const payload = {
      exchangeName: exchange,
      userId: userId.user_id,
      rating: rating,
      review: text,
    };
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/ratings`,
      payload,
      {
        headers: {
          "X-API-Key": process.env.NEXT_PUBLIC_BACKEND_API_KEY,
        },
      }
    );

    setShowPopup(false);
    getExchangeReviews(exchange?.exchange);
  };

  const getUserId = async (email) => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/user-with-email`,
      {
        params: {
          email,
        },
        headers: {
          "X-API-Key": process.env.NEXT_PUBLIC_BACKEND_API_KEY,
        },
      }
    );

    return response.data;
  };

  if (showPopup) {
    return (
      <PopupSkeleton
        setShowPopup={setShowPopup}
        removeBackground={true}
        title={t("Rate exchange")}
      >
        <>
          <div className={styles.middle}>
            <StarsSelector
              onRatingChange={handleRatingChange}
              className={styles.starsSelectable}
            />
            <label className={styles.label}>{t("review")}</label>
            <textarea
              className={styles.input}
              placeholder={t(
                "share your experience with this exchange and help others."
              )}
              rows="4"
              maxLength="1000"
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
            <p className={styles.disclaimer}>
              <Trans
                i18nKey="by submitting your review, you agree to our Privacy Policy."
                components={[
                  <a
                    href="https://silicore.io/privacy-policy"
                    target="_blank"
                    className={styles.underline}
                    key="underline"
                  />,
                ]}
              />
            </p>
          </div>
          <div className={styles.bottom}>
            <div className={styles.exchangeContainer}>
              <p className={styles.hiddenText}>Exchange</p>
              <div className={styles.exchange}>
                <img
                  className={styles.exchangeLogo}
                  src={`${logo}`}
                  alt={`${exchange} logo`}
                ></img>
                <p className={styles.exchangeName}>{exchange}</p>
              </div>
            </div>
            <button
              disabled={!active}
              onClick={handleSendReview}
              className={`${styles.button} ${active && styles.active}`}
            >
              {t("Send review")}
            </button>
          </div>
        </>
      </PopupSkeleton>
    );
  }

  return null;
};

export default RateExchangePopup;
