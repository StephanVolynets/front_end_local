"use client";

import styles from "./ExchangeTable.module.css";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import ExchangeRow from "@/components/tables/rows/Exchange";
import NoResults from "@/components/tables/noResults/NoResults";
import SortArrow from "@/components/icons/sortArrow";
import ExchangeDetailsPopup from "@/components/popups/exchangeDetailsPopup/ExchangeDetailsPopup";
import InfoIcon from "@/components/icons/infoIcon";
import { cryptoNameToSymbol } from "@/utils/cryptoNameToSymbol";
import axios from "axios";

const ExchangeTable = ({ exchanges, cryptoName, exchangeReviews }) => {
  const { t } = useTranslation();
  const [pairSymbol, setPairSymbol] = useState(null);
  const [exchangeDetails, setExchangeDetails] = useState({});
  const [exchangePayments, setExchangePayments] = useState({});
  const [exchangeNetworks, setExchangeNetworks] = useState({});

  const [sortState, setSortState] = useState({
    rating: null,
    buyPrice: null,
    spread: null,
    sellPrice: null,
  });

  const [selectedExchangeIndex, setSelectedExchangeIndex] = useState(null);

  const handleSort = (column, direction) => {
    setSortState((prevState) => {
      const newState = {
        rating: null,
        buyPrice: null,
        spread: null,
        sellPrice: null,
      };
      newState[column] = prevState[column] === direction ? null : direction;
      return newState;
    });
  };

  const getExchangeDetails = async (index) => {
    const exchangeName = exchanges[index].exchange;

    axios
      .get(
        process.env.NEXT_PUBLIC_API_BASE_URL +
          `/exchange-details/details?name=${exchangeName}`,
        {
          headers: {
            "X-API-Key": process.env.NEXT_PUBLIC_BACKEND_API_KEY,
          },
        }
      )
      .then((res) => {
        console.log("exchange details", res.data);
        setExchangeDetails(res.data);
      });
    axios
      .get(
        process.env.NEXT_PUBLIC_API_BASE_URL +
          `/exchange-details/payment-methods?name=${exchangeName}`,
        {
          headers: {
            "X-API-Key": process.env.NEXT_PUBLIC_BACKEND_API_KEY,
          },
        }
      )
      .then((res) => {
        setExchangePayments(res.data);
        setSelectedExchangeIndex(index);
      });
    axios
      .get(
        process.env.NEXT_PUBLIC_API_BASE_URL +
          `/exchange-networks/${exchangeName}`,
        {
          headers: {
            "X-API-Key": process.env.NEXT_PUBLIC_BACKEND_API_KEY,
          },
        }
      )
      .then((res) => {
        console.log("exchange networks", res.data);
        setExchangeNetworks(res.data);
      });
  };

  const goToPreviousExchange = () => {
    setSelectedExchangeIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
    getExchangeDetails(selectedExchangeIndex - 1);
  };

  const goToNextExchange = () => {
    setSelectedExchangeIndex((prevIndex) =>
      prevIndex < exchanges.length - 1 ? prevIndex + 1 : prevIndex
    );
    getExchangeDetails(selectedExchangeIndex + 1);
  };

  // calculate spread
  const calculateSpread = (buyPrice, sellPrice) => {
    return ((sellPrice - buyPrice) / buyPrice) * 100;
  };

  // function to get the rating for an exchange
  const getExchangeRating = (exchangeName) => {
    const review = exchangeReviews.find(
      (review) => review.name.toLowerCase() === exchangeName.toLowerCase()
    );
    return review ? review?.average : 0;
  };

  useEffect(() => {
    const cryptoSymbol = cryptoNameToSymbol(cryptoName.toUpperCase());
    setPairSymbol(cryptoSymbol);
  }, [cryptoName]);

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.headerTable}>
              <div className={styles.headerContent}>
                <SortArrows
                  column="rating"
                  sortState={sortState}
                  handleSort={handleSort}
                />
                {t("rating")}
              </div>
            </th>
            <th className={styles.headerTable}>
              <div className={styles.headerContent}>
                <SortArrows
                  column="buyPrice"
                  sortState={sortState}
                  handleSort={handleSort}
                />
                {t("buy price")}
              </div>
            </th>
            <th className={styles.headerTable}>
              <div className={styles.headerContent}>
                <SortArrows
                  column="spread"
                  sortState={sortState}
                  handleSort={handleSort}
                />
                {t("spread")}
                <InfoIcon className={styles.infoIcon} />
              </div>
            </th>
            <th className={styles.headerTable}>
              <div className={styles.headerContent}>
                <SortArrows
                  column="sellPrice"
                  sortState={sortState}
                  handleSort={handleSort}
                />
                {t("sell price")}
              </div>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {exchanges?.length === 0 ? (
            <tr>
              <td colSpan="5">
                <NoResults
                  title={t("no exchanges found")}
                  subtitle={t(
                    "sorry, we couldn't find any exchanges matching your criteria right now."
                  )}
                />
              </td>
            </tr>
          ) : (
            exchanges?.map((exchange, index) => {
              if (exchange?.symbol === pairSymbol) {
                return (
                  <ExchangeRow
                    key={exchange.exchange + index}
                    exchange={{
                      ...exchange,
                      rating: getExchangeRating(exchange.exchange),
                      spread: calculateSpread(
                        exchange.buyPrice,
                        exchange.sellPrice
                      ).toFixed(2),
                      reviewCount:
                        exchangeReviews.find(
                          (review) =>
                            review.name.toLowerCase() ===
                            exchange.exchange.toLowerCase()
                        )?.count || 0,
                      displayName:
                        exchangeReviews.find(
                          (review) =>
                            review.name.toLowerCase() ===
                            exchange.exchange.toLowerCase()
                        )?.display_name || exchange.exchange,
                      logo: `/img/exchanges/${exchange.exchange}.png`,
                    }}
                    onClick={() => {
                      getExchangeDetails(index);
                    }}
                  />
                );
              }
            })
          )}
        </tbody>
      </table>

      {selectedExchangeIndex !== null &&
        !!exchangeDetails &&
        !!exchangeNetworks && (
          <ExchangeDetailsPopup
            showPopup={selectedExchangeIndex !== null}
            setShowPopup={() => setSelectedExchangeIndex(null)}
            exchange={{
              ...exchanges[selectedExchangeIndex],
              rating: getExchangeRating(
                exchanges[selectedExchangeIndex].exchange
              ),
              spread: calculateSpread(
                exchanges[selectedExchangeIndex].buyPrice,
                exchanges[selectedExchangeIndex].sellPrice
              ).toFixed(2),
              reviewCount:
                exchangeReviews.find(
                  (review) =>
                    review.name.toLowerCase() ===
                    exchanges[selectedExchangeIndex].exchange.toLowerCase()
                )?.count || 0,
              logo: `/img/exchanges/${exchanges[selectedExchangeIndex].exchange}.png`,
              ...exchangeDetails,
              commission: {
                buying: `${exchangeDetails?.commission_for_buying || "0.1"}%`,
                selling: `${exchangeDetails?.commission_for_selling || "0.1"}%`,
              },
              displayName:
                exchangeReviews.find(
                  (review) =>
                    review.name.toLowerCase() ===
                    exchanges[selectedExchangeIndex]?.exchange.toLowerCase()
                )?.display_name || exchanges[selectedExchangeIndex]?.exchange,
              exchangeUrl:
                exchangeReviews.find(
                  (review) =>
                    review.name.toLowerCase() ===
                    exchanges[selectedExchangeIndex]?.exchange.toLowerCase()
                )?.exchange_url || "",
            }}
            goToPreviousExchange={goToPreviousExchange}
            goToNextExchange={goToNextExchange}
            isFirstExchange={selectedExchangeIndex === 0}
            isLastExchange={selectedExchangeIndex === exchanges.length - 1}
            exchangePayments={exchangePayments}
            exchangeNetworks={exchangeNetworks}
          />
        )}
    </>
  );
};

const SortArrows = ({ column, sortState, handleSort }) => (
  <div className={styles.arrows}>
    <SortArrow
      className={`${styles.sortArrowUp} ${
        sortState[column] === "asc" ? styles.activeUp : ""
      }`}
      onClick={() => handleSort(column, "asc")}
    />
    <SortArrow
      className={`${styles.sortArrowDown} ${
        sortState[column] === "desc" ? styles.activeDown : ""
      }`}
      onClick={() => handleSort(column, "desc")}
    />
  </div>
);

export default ExchangeTable;
