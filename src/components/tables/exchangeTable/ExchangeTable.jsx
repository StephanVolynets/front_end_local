"use client";

import styles from "./ExchangeTable.module.css";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import ExchangeRow from "@/components/tables/rows/Exchange";
import NoResults from "@/components/tables/noResults/NoResults";
import SortArrow from "@/components/icons/sortArrow";
import ExchangeDetailsPopup from "@/components/popups/exchangeDetailsPopup/ExchangeDetailsPopup";
import InfoIcon from "@/components/icons/infoIcon";
import { cryptoNameToSymbol } from "@/utils/cryptoNameToSymbol";

const ExchangeTable = ({ exchanges, cryptoName }) => {
  const { t } = useTranslation();
  const [pairSymbol, setPairSymbol] = useState(null);
  const [exchangeDetails, setExchangeDetails] = useState({});
  const supabase = createClientComponentClient();

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

    if (!exchangeDetails[exchangeName]) {
      const { data, error } = await supabase
        .from("exchanges")
        .select(
          `
          id,
          exchange_details (
            date_founded,
            company_country,
            monthly_active_users,
            range_of_employees,
            countries_available_in,
            states_available_in,
            commission_for_buying,
            commission_for_selling,
            has_kyc,
            is_anchor,
            x_link,
            instagram_link,
            linkedin_link,
          )
        `
        )
        .eq("name", exchangeName)
        .single();

      if (error) {
        console.error("Error fetching exchange details:", error);
      } else if (data) {
        console.log("THE DETAILS", data);
        setExchangeDetails((prevDetails) => ({
          ...prevDetails,
          [exchangeName]: data.exchange_details,
        }));
      }
    }

    setSelectedExchangeIndex(index);
  };

  const goToPreviousExchange = () => {
    setSelectedExchangeIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

  const goToNextExchange = () => {
    setSelectedExchangeIndex((prevIndex) =>
      prevIndex < exchanges.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  // calculate spread
  const calculateSpread = (buyPrice, sellPrice) => {
    return ((sellPrice - buyPrice) / buyPrice) * 100;
  };

  // generate random rating (for now)
  const generateRandomRating = () => {
    return (Math.random() * 4 + 1).toFixed(1);
  };

  useEffect(() => {
    const cryptoSymbol = cryptoNameToSymbol(cryptoName.toLowerCase());
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
                      rating: generateRandomRating(),
                      spread: calculateSpread(
                        exchange.buyPrice,
                        exchange.sellPrice
                      ).toFixed(2),
                      reviewCount: Math.floor(Math.random() * 1000),
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

      {selectedExchangeIndex !== null && (
        <ExchangeDetailsPopup
          showPopup={selectedExchangeIndex !== null}
          setShowPopup={() => setSelectedExchangeIndex(null)}
          exchange={{
            ...exchanges[selectedExchangeIndex],
            rating: generateRandomRating(),
            spread: calculateSpread(
              exchanges[selectedExchangeIndex].buyPrice,
              exchanges[selectedExchangeIndex].sellPrice
            ).toFixed(2),
            reviewCount: Math.floor(Math.random() * 1000),
            logo: `/img/exchanges/${exchanges[selectedExchangeIndex].exchange}.png`,
            ...exchangeDetails[exchanges[selectedExchangeIndex].exchange],
            commission: {
              buying:
                exchangeDetails[exchanges[selectedExchangeIndex].exchange]
                  ?.commission_buying || "0.1%",
              selling:
                exchangeDetails[exchanges[selectedExchangeIndex].exchange]
                  ?.commission_selling || "0.1%",
            },
          }}
          goToPreviousExchange={goToPreviousExchange}
          goToNextExchange={goToNextExchange}
          isFirstExchange={selectedExchangeIndex === 0}
          isLastExchange={selectedExchangeIndex === exchanges.length - 1}
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
