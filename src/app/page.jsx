"use client";

import styles from "./dashboard.module.css";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useTranslation, Trans } from "react-i18next";
import { formatThousands } from "@/utils/formatThousands";
import { convertCurrency, formatCurrency } from "@/utils/currencyConverter";
import { debounce } from "@/utils/debounce";

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
import { useAuth } from "@/context/AuthContext";

const Dashboard = () => {
  const { t } = useTranslation();
  const socket = useSocket();
  const { selectedSymbol } = useAuth();
  const [showMainCryptosPopup, setShowMainCryptosPopup] = useState(false);
  const [showFiltersPopup, setShowFiltersPopup] = useState(false);

  const [selectedCrypto, setSelectedCrypto] = useState(1);
  const [selectedFiat, setSelectedFiat] = useState(1);
  const [selectedFiatCurrency, setSelectedFiatCurrency] = useState('USD');
  const [amount, setAmount] = useState("");
  const [socketExchanges, setSocketExchanges] = useState([]);
  const [exchangeReviews, setExchangeReviews] = useState([]);

  const cryptoPrices = {
    BTC: { current: 65286.4, last: 65750.6 },
    ETH: { current: 3456.78, last: 3400.21 },
    SOL: { current: 124.56, last: 120.34 }
  };

  const cryptos = useMemo(() => [
    {
      name: "Bitcoin",
      symbol: "BTC",
      logo: "/img/bitcoin-logo.png",
      currentPrice: cryptoPrices.BTC.current,
      lastPrice: cryptoPrices.BTC.last,
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      logo: "/img/ethereum-logo.png",
      currentPrice: cryptoPrices.ETH.current,
      lastPrice: cryptoPrices.ETH.last,
    },
    {
      name: "Solana",
      symbol: "SOL",
      logo: "/img/solana-logo.png",
      currentPrice: cryptoPrices.SOL.current,
      lastPrice: cryptoPrices.SOL.last,
    }
  ], []);

  const debouncedAmountUpdate = useCallback(
    debounce((value) => {
      setAmount(formatThousands(value));
    }, 300),
    []
  );

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/,/g, "");
    if (value === "" || /^\d*\.?\d*$/.test(value) || /^\d+\.$/.test(value)) {
      debouncedAmountUpdate(value);
    }
  };

  const updateSocketExchanges = useCallback((newData) => {
    setSocketExchanges((prevExchanges) => {
      const index = prevExchanges.findIndex(
        (exchange) =>
          exchange.symbol === newData.symbol &&
          exchange.exchange === newData.exchange
      );

      const convertedData = {
        ...newData,
        buyPrice: newData.buyPrice,
        sellPrice: newData.sellPrice
      };

      if (index !== -1) {
        const updatedExchanges = [...prevExchanges];
        updatedExchanges[index] = convertedData;
        return updatedExchanges;
      } else {
        return [...prevExchanges, convertedData];
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

  useEffect(() => {
    const currencies = {
      1: 'USD',
      2: 'EUR',
      3: 'GBP',
      4: 'JPY',
      5: 'AUD',
      6: 'CAD',
      7: 'CHF',
      8: 'CNY',
      9: 'MXN',
      10: 'ARS'
    };
    setSelectedFiatCurrency(currencies[selectedFiat] || 'USD');
  }, [selectedFiat]);

  const convertedCryptos = useMemo(() => 
    cryptos.map(crypto => ({
      ...crypto,
      currentPrice: convertCurrency(crypto.currentPrice, 'USD', selectedFiatCurrency),
      lastPrice: convertCurrency(crypto.lastPrice, 'USD', selectedFiatCurrency)
    }))
  , [cryptos, selectedFiatCurrency]);

  const convertedExchanges = useMemo(() => 
    socketExchanges.map(exchange => ({
      ...exchange,
      buyPrice: convertCurrency(exchange.buyPrice, 'USD', selectedFiatCurrency),
      sellPrice: convertCurrency(exchange.sellPrice, 'USD', selectedFiatCurrency)
    }))
  , [socketExchanges, selectedFiatCurrency]);

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
          {convertedCryptos.map((crypto, index) => (
            <CryptoCard 
              key={index} 
              crypto={crypto}
              currency={selectedFiatCurrency}
            />
          ))}
          <button
            onClick={() => setShowMainCryptosPopup(true)}
            className={styles.addCardButton}
            title={t("Add to watchlist")}
          >
            <div className={styles.addCardContent}>
              <PlusIcon />
              <span className={styles.addCardText}>{t("Add Crypto")}</span>
            </div>
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
            src={
              cryptos.find((crypto) => crypto.symbol === selectedSymbol).logo
            }
            alt={`${
              cryptos.find((crypto) => crypto.symbol === selectedSymbol).name
            } logo`}
          />
          <p className={styles.cryptoName}>
            {cryptos.find((crypto) => crypto.symbol === selectedSymbol).name}
          </p>
          <p className={styles.cryptoExchanges}>
            {
              convertedExchanges?.filter(
                (exchange) => exchange.symbol === selectedSymbol
              )?.length
            }{" "}
            exchanges
          </p>
        </div>
        <div className={styles.tableContainer}>
          <ExchangeTable
            exchanges={convertedExchanges}
            cryptoName={selectedSymbol}
            exchangeReviews={exchangeReviews}
            currency={selectedFiatCurrency}
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