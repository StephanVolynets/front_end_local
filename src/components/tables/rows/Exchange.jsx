"use client";

import styles from "./Exchange.module.css";

import StarsViewer from "@/components/stars/starsViewer/StarsViewer";

import { useState } from "react";

import { formatThousands } from "@/utils/formatThousands";
import ExchangeReviewsPopup from "@/components/popups/exchangeReviewsPopup/ExchangeReviewsPopup";
import SimpleArrowIcon from "@/components/icons/simpleArrowIcon";
import ExchangeDetailsPopup from "@/components/popups/exchangeDetailsPopup/ExchangeDetailsPopup";

const ExchangeRow = ({ exchange, onClick }) => {
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
            US$ {formatThousands(exchange?.buyPrice)}
          </p>
        </td>
        <td className={styles.column3} data-label="Spread">
          <p className={styles.spread}>{exchange?.spread}%</p>
        </td>
        <td className={styles.column4} data-label="Sell price">
          <p className={styles.sellPrice}>
            US$ {formatThousands(exchange?.sellPrice)}
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
