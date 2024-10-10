"use client";

import styles from "./dashboard.module.css";

import { useState } from "react";
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
import { useEffect } from "react";

const Dashboard = () => {
  const { t } = useTranslation();
  const socket = useSocket();

  const [showMainCryptosPopup, setShowMainCryptosPopup] = useState(false);
  const [showFiltersPopup, setShowFiltersPopup] = useState(false);

  const [selectedCrypto, setSelectedCrypto] = useState(1);
  const [selectedFiat, setSelectedFiat] = useState(1);
  const [amount, setAmount] = useState("");
  const [socketExchanges, setSocketExchanges] = useState([]);

  const exchanges = [
    // exchanges example data for table
    {
      name: "Binance",
      logo: "/img/binance-logo-example.png",
      rating: 4.2,
      reviewCount: 320,
      buyPrice: 65786.4,
      sellPrice: 65786.4,
      spread: 1.62,
      foundedIn: "2017",
      place: "Cayman Islands",
      employees: "12,000",
      kyc: "KYC",
      users: "128M+",
      countries: "140+",
      actualprice: 65286.4,
      lastprice: 65750.6,
      xUrl: "https://x.com/binance",
      instagramUrl: "https://instagram.com/binance",
      linkedinUrl: "https://linkedin.com/binance",
      networks: [
        "Polygon (MATIC)",
        "Ethereum (ETH)",
        "Binance (BSC)",
        "Avalanche (AVAX)",
        "Solana (SOL)",
        "Cardano (ADA)",
        "Polkadot (DOT)",
        "Chainlink (LINK)",
      ],
      paymentMethods: [
        "credit_card",
        "debit_card",
        "bank_transfer",
        "crypto_wallet",
      ],
      commission: {
        buying: "0.1%",
        selling: "0.1%",
      },
    },
    {
      name: "Binance",
      logo: "/img/binance-logo-example.png",
      rating: 2.1,
      reviewCount: 23,
      buyPrice: 65780.4,
      sellPrice: 65780.4,
      spread: 1.6,
      foundedIn: "2017",
      place: "Cayman Islands",
      employees: "12,000",
      kyc: "KYC",
      users: "128M+",
      countries: "140+",
      actualprice: 65280.4,
      lastprice: 65740.6,
      xUrl: "https://x.com/binance",
      instagramUrl: "https://instagram.com/binance",
      linkedinUrl: "https://linkedin.com/binance",
      networks: [
        "Polygon (MATIC)",
        "Ethereum (ETH)",
        "Binance (BSC)",
        "Avalanche (AVAX)",
        "Solana (SOL)",
        "Cardano (ADA)",
        "Polkadot (DOT)",
        "Chainlink (LINK)",
      ],
      paymentMethods: [
        "credit_card",
        "debit_card",
        "bank_transfer",
        "crypto_wallet",
      ],
      commission: {
        buying: "0.1%",
        selling: "0.1%",
      },
    },
    {
      name: "Binance",
      logo: "/img/binance-logo-example.png",
      rating: 3.9,
      reviewCount: 123,
      buyPrice: 65790.4,
      sellPrice: 65790.4,
      spread: 1.65,
      foundedIn: "2017",
      place: "Cayman Islands",
      employees: "12,000",
      kyc: "KYC",
      users: "128M+",
      countries: "140+",
      actualprice: 65290.4,
      lastprice: 65760.6,
      xUrl: "https://x.com/binance",
      instagramUrl: "https://instagram.com/binance",
      linkedinUrl: "https://linkedin.com/binance",
      networks: [
        "Polygon (MATIC)",
        "Ethereum (ETH)",
        "Binance (BSC)",
        "Avalanche (AVAX)",
        "Solana (SOL)",
        "Cardano (ADA)",
        "Polkadot (DOT)",
        "Chainlink (LINK)",
      ],
      paymentMethods: [
        "credit_card",
        "debit_card",
        "bank_transfer",
        "crypto_wallet",
      ],
      commission: {
        buying: "0.1%",
        selling: "0.1%",
      },
    },
    {
      name: "Binance",
      logo: "/img/binance-logo-example.png",
      rating: 1.7,
      reviewCount: 31,
      buyPrice: 65795.4,
      sellPrice: 65795.4,
      spread: 1.68,
      foundedIn: "2017",
      place: "Cayman Islands",
      employees: "12,000",
      kyc: "KYC",
      users: "128M+",
      countries: "140+",
      actualprice: 65295.4,
      lastprice: 65770.6,
      xUrl: "https://x.com/binance",
      instagramUrl: "https://instagram.com/binance",
      linkedinUrl: "https://linkedin.com/binance",
      networks: [
        "Polygon (MATIC)",
        "Ethereum (ETH)",
        "Binance (BSC)",
        "Avalanche (AVAX)",
        "Solana (SOL)",
        "Cardano (ADA)",
        "Polkadot (DOT)",
        "Chainlink (LINK)",
      ],
      paymentMethods: [
        "credit_card",
        "debit_card",
        "bank_transfer",
        "crypto_wallet",
      ],
      commission: {
        buying: "0.1%",
        selling: "0.1%",
      },
    },
    {
      name: "Binance",
      logo: "/img/binance-logo-example.png",
      rating: 4.7,
      reviewCount: 345,
      buyPrice: 65800.4,
      sellPrice: 65800.4,
      spread: 1.7,
      foundedIn: "2017",
      place: "Cayman Islands",
      employees: "12,000",
      kyc: "KYC",
      users: "128M+",
      countries: "140+",
      actualprice: 65300.4,
      lastprice: 65780.6,
      xUrl: "https://x.com/binance",
      instagramUrl: "https://instagram.com/binance",
      linkedinUrl: "https://linkedin.com/binance",
      networks: [
        "Polygon (MATIC)",
        "Ethereum (ETH)",
        "Binance (BSC)",
        "Avalanche (AVAX)",
        "Solana (SOL)",
        "Cardano (ADA)",
        "Polkadot (DOT)",
        "Chainlink (LINK)",
      ],
      paymentMethods: [
        "credit_card",
        "debit_card",
        "bank_transfer",
        "crypto_wallet",
      ],
      commission: {
        buying: "0.1%",
        selling: "0.1%",
      },
    },
  ];

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

  useEffect(() => {
    if (socket) {
      socket.on("message", (data) => {
        setSocketExchanges(data);
        console.log("Received message socket.io:", data);
      });
    }

    return () => {
      if (socket) {
        socket.off("message");
      }
    };
  }, [socket]);

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
            {exchanges?.length} exchanges
          </p>
        </div>
        <div className={styles.tableContainer}>
          <ExchangeTable exchanges={socketExchanges || exchanges} />
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
