"use client";

import styles from "./dashboard.module.css";

import { useState, useEffect, useCallback } from "react";
import { useTranslation, Trans } from "react-i18next";
import { formatThousands } from "@/utils/formatThousands";

import TopBar from "@/components/topBar/TopBar";
import Carrousel from "@/components/carrousel/Carrousel";
import Footer from "@/components/footer/Footer";
import CryptoCard from "@/components/cards/cryptoCard/CryptoCard";
import PlusIcon from "@/components/icons/plusIcon";
import CryptoFilterDropdown from "@/components/dropdowns/cryptoFilterDropdown/CryptoFilterDropdown";
import FiatFilterDropdown from "@/components/dropdowns/fiatFilterDropdown/FiatFilterDropdown";
import DollarIcon from "@/components/icons/dollarIcon";
import FilterIcon from "@/components/icons/filterIcon";
import MainCryptosPopup from "@/components/popups/mainCryptosPopup/MainCryptosPopup";
import FiltersPopup from "@/components/popups/filtersPopup/FiltersPopup";
import ExchangeTable from "@/components/tables/exchangeTable/ExchangeTable";
import { useSocket } from "@/context/SocketContext";
import axios from "axios";

const Dashboard = () => {
  const { t } = useTranslation();
  const socket = useSocket();

  const [showMainCryptosPopup, setShowMainCryptosPopup] = useState(false);
  const [showFiltersPopup, setShowFiltersPopup] = useState(false);

  const [selectedCrypto, setSelectedCrypto] = useState(1);
  const [selectedFiat, setSelectedFiat] = useState(1);
  const [amount, setAmount] = useState("");
  const [socketExchanges, setSocketExchanges] = useState([]);
  const [exchangeReviews, setExchangeReviews] = useState([]);

  const cryptos = [
    // cryptos example data for cards
    {
      name: "Bitcoin",
      symbol: "BTC",
      logo: "/img/bitcoin-logo.png",
      currentPrice: 65286.4,
      lastPrice: 65750.6,
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      logo: "/img/ethereum-logo.png",
      currentPrice: 3456.78,
      lastPrice: 3400.21,
    },
    {
      name: "Stellar",
      symbol: "XLM",
      logo: "/img/stellar-logo.png",
      currentPrice: 0.1234,
      lastPrice: 0.1234,
    },
  ];

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/,/g, "");

    // handle case when there for example user sets a point after some numbers there arent any numbers yet
    if (value === "" || /^\d*\.?\d*$/.test(value) || /^\d+\.$/.test(value)) {
      setAmount(formatThousands(value));
    }
  };

  const updateSocketExchanges = useCallback((newData) => {
    setSocketExchanges((prevExchanges) => {
      const index = prevExchanges.findIndex(
        (exchange) =>
          exchange.symbol === newData.symbol &&
          exchange.exchange === newData.exchange
      );

      if (index !== -1) {
        // replace the existing object
        const updatedExchanges = [...prevExchanges];
        updatedExchanges[index] = newData;
        return updatedExchanges;
      } else {
        // add the new object
        return [...prevExchanges, newData];
      }
    });
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("message", (data) => {
        updateSocketExchanges(data);
      });
    }

    return () => {
      if (socket) {
        socket.off("message");
      }
    };
  }, [socket, updateSocketExchanges]);

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_API_BASE_URL + "/ratings/average", {
        headers: {
          "X-API-KEY": process.env.NEXT_PUBLIC_BACKEND_API_KEY,
        },
      })
      .then((res) => {
        setExchangeReviews(res.data);
      });
  }, []);

  return (
    <>
      <TopBar />
      <main className={styles.main}>
        <Carrousel />
        <h1 className={styles.title}>
          <Trans
            i18nKey="homepage title"
            components={[<span className={styles.highlight} key="highlight" />]}
          />
        </h1>
        <h2 className={styles.subtitle}>{t("homepage subtitle")}</h2>
        <div className={styles.cryptoCardsContainer}>
          {cryptos.map((crypto, index) => (
            <CryptoCard key={index} crypto={crypto} />
          ))}
          <button
            onClick={() => setShowMainCryptosPopup(true)}
            className={styles.addCardButton}
          >
            <PlusIcon />
          </button>
        </div>
        <div className={styles.filters}>
          <CryptoFilterDropdown
            selectedCrypto={selectedCrypto}
            setSelectedCrypto={setSelectedCrypto}
          />
          <FiatFilterDropdown
            selectedFiat={selectedFiat}
            setSelectedFiat={setSelectedFiat}
          />
          <div className={styles.amountFilterContainer}>
            <DollarIcon className={styles.dollarIcon} />
            <input
              type="text"
              inputMode="decimal"
              className={styles.amountFilter}
              placeholder="1,247.45"
              value={amount}
              onChange={handleAmountChange}
            />
          </div>
          <button
            className={styles.filterButton}
            onClick={() => setShowFiltersPopup(true)}
          >
            {t("filter")} <FilterIcon />
          </button>
        </div>

        <div className={styles.selectedCrypto}>
          <img
            className={styles.cryptoLogo}
            src={cryptos[0].logo}
            alt={`${cryptos[0].name} logo`}
          />
          <p className={styles.cryptoName}>{cryptos[0].name}</p>
          <p className={styles.cryptoExchanges}>
            {
              socketExchanges?.filter(
                (exchange) => exchange.symbol === "BTCUSDT"
              )?.length
            }{" "}
            exchanges
          </p>
        </div>
        <div className={styles.tableContainer}>
          <ExchangeTable
            exchanges={socketExchanges}
            cryptoName={cryptos[0].name}
            exchangeReviews={exchangeReviews}
          />
        </div>
        <Carrousel invertDots={true} />
      </main>

      <Footer />

      <MainCryptosPopup
        showPopup={showMainCryptosPopup}
        setShowPopup={setShowMainCryptosPopup}
      />
      <FiltersPopup
        showPopup={showFiltersPopup}
        setShowPopup={setShowFiltersPopup}
      />
    </>
  );
};

export default Dashboard;
