"use client";

import styles from "./Exchange.module.css";

import StarsViewer from "@/components/stars/starsViewer/StarsViewer";
import { formatCurrency } from "@/utils/currencyConverter";

import { useState } from "react";

import ExchangeReviewsPopup from "@/components/popups/exchangeReviewsPopup/ExchangeReviewsPopup";
import SimpleArrowIcon from "@/components/icons/simpleArrowIcon";
import ExchangeDetailsPopup from "@/components/popups/exchangeDetailsPopup/ExchangeDetailsPopup";

const ExchangeRow = ({ exchange, onClick, currency = 'USD' }) => {
  const [showReviewsPopup, setShowReviewsPopup] = useState(false);

  const handleRatingClick = (e) => {
    e.stopPropagation();
    setShowReviewsPopup(true);
  };

  return (
    <>
      <tr className={styles.row} onClick={onClick}>
        <td className={styles.column1} data-label="Rating">
          <div className={styles.column1Content}>
            <img className={styles.logo} src={exchange?.logo} alt="" />
            <p className={styles.name}>{exchange?.displayName}</p>
            <StarsViewer
              reviewAverage={exchange?.rating}
              className={styles.starsViewer}
            />
            <p className={styles.rating} onClick={handleRatingClick}>
              {exchange?.rating} ({exchange?.reviewCount})
            </p>
          </div>
        </td>
        <td className={styles.column2} data-label="Buy price">
          <p className={styles.buyPrice}>
            {formatCurrency(exchange?.buyPrice, currency)}
          </p>
        </td>
        <td className={styles.column3} data-label="Spread">
          <p
            className={`${
              exchange?.spread > 0
                ? styles.highSpread
                : exchange?.spread < 0
                ? styles.lowSpread
                : styles.spread
            }`}
          >
            {exchange?.spread}%
          </p>
        </td>
        <td className={styles.column4} data-label="Sell price">
          <p className={styles.sellPrice}>
            {formatCurrency(exchange?.sellPrice, currency)}
          </p>
        </td>
        <td>
          <SimpleArrowIcon className={styles.simpleArrowIcon} />
        </td>
      </tr>
      <ExchangeReviewsPopup
        showPopup={showReviewsPopup}
        setShowPopup={setShowReviewsPopup}
        exchange={exchange}
      />
    </>
  );
};

export default ExchangeRow;