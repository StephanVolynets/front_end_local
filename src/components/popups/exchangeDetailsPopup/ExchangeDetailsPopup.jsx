"use client";

import styles from "./ExchangeDetailsPopup.module.css";

import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

import PopupSkeleton from "@/components/popups/popupSkeleton/PopupSkeleton.jsx";
import StarsViewer from "@/components/stars/starsViewer/StarsViewer";
import Slider from "@/components/slider/Slider";

import WorldIcon from "@/components/icons/worldIcon";
import FingerprintIcon from "@/components/icons/fingerprintIcon";
import UsersIcon from "@/components/icons/usersIcon";
import BuildingIcon from "@/components/icons/buildingIcon";
import PointerIcon from "@/components/icons/pointerIcon";
import CalendarIcon from "@/components/icons/calendarIcon";
import XIcon from "@/components/icons/xIcon";
import InstagramIcon from "@/components/icons/instagramIcon";
import LinkedinIcon from "@/components/icons/linkedinIcon";
import ExchangeReviewsPopup from "@/components/popups/exchangeReviewsPopup/ExchangeReviewsPopup";
import RateExchangePopup from "@/components/popups/rateExchangePopup/RateExchangePopup";
import ArrowIcon from "@/components/icons/arrowIcon";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import LoginPopup from "../loginPopup/LoginPopup";

const ExchangeDetailsPopup = ({
  showPopup,
  setShowPopup,
  exchange,
  goToPreviousExchange,
  goToNextExchange,
  isFirstExchange,
  isLastExchange,
  exchangePayments,
  exchangeNetworks,
}) => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const [showReviewsPopup, setShowReviewsPopup] = useState(false);
  const [showRateExchangePopup, setShowRateExchangePopup] = useState(false);
  const [exchangeReviews, setExchangeReviews] = useState([]);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const getExchangeReviews = async (exchangeName) => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/ratings/${exchangeName}`,
      {
        headers: {
          "X-API-Key": process.env.NEXT_PUBLIC_BACKEND_API_KEY,
        },
      }
    );
    setExchangeReviews(res.data);
  };

  const handleRateExchange = () => {
    if (user) {
      setShowRateExchangePopup(true);
    } else {
      setShowLoginPopup(true);
    }
  };

  useEffect(() => {
    if (exchange.exchange) {
      getExchangeReviews(exchange.exchange);
    }
  }, [exchange.exchange, showReviewsPopup]);

  if (showPopup) {
    return (
      <PopupSkeleton
        setShowPopup={setShowPopup}
        logo={exchange.logo}
        title={exchange.name}
        hide={showReviewsPopup || showRateExchangePopup}
      >
        <>
          <div className={styles.middle}>
            <div className={styles.info}>
              {exchange.foundedIn && (
                <p className={styles.infoValue}>
                  <CalendarIcon aria-hidden="true" />
                  {t("founded in")} {exchange.foundedIn}
                </p>
              )}
              {exchange.place && (
                <p className={styles.infoValue}>
                  <PointerIcon aria-hidden="true" />
                  {exchange.place}
                </p>
              )}
              {exchange.users && (
                <p className={styles.infoValueMAU}>
                  <UsersIcon aria-hidden="true" />
                  {exchange.users} {t("monthly users")}
                </p>
              )}
              {exchange.users && (
                <p className={styles.infoValueMAUMobile}>
                  <UsersIcon aria-hidden="true" />
                  {exchange.users} {t("mau")}
                </p>
              )}
              {exchange.employees && (
                <p className={styles.infoValue}>
                  <BuildingIcon aria-hidden="true" />
                  {exchange.employees} {t("employees")}
                </p>
              )}
              {exchange.countries && (
                <p className={styles.infoValue}>
                  <WorldIcon aria-hidden="true" />
                  {exchange.countries} {t("countries")}
                </p>
              )}
              {exchange.kyc && (
                <p className={styles.infoValue}>
                  <FingerprintIcon aria-hidden="true" />
                  {t("has")} {exchange.kyc}
                </p>
              )}
            </div>
            <div className={styles.reviewsContainer}>
              <div className={styles.reviews}>
                <p className={styles.reviewsAverage}>{exchange.rating}</p>
                <StarsViewer reviewAverage={exchange.rating} />
                <p className={styles.reviewsCounter}>
                  ({exchange.reviewCount})
                </p>
              </div>
              <button
                onClick={() => setShowReviewsPopup(true)}
                className={styles.reviewsButton}
              >
                {t("see reviews")}
              </button>
            </div>
            <div className={styles.sliderContainer}>
              <p className={styles.label}>{t("networks")}</p>
              <Slider
                elements={
                  exchangeNetworks && exchangeNetworks.length > 0
                    ? exchangeNetworks?.map((network) => network.name)
                    : []
                }
              />
            </div>
            <div className={styles.comission}>
              <p className={styles.label}>{t("commission")}</p>
              <div className={styles.comissionValues}>
                <p className={styles.comissionValue}>
                  <span className={styles.comissionValueHighlight}>
                    {exchange.commission.buying}
                  </span>{" "}
                  {t("buying")}
                </p>
                <p className={styles.comissionValue}>
                  <span className={styles.comissionValueHighlight}>
                    {exchange.commission.selling}
                  </span>{" "}
                  {t("selling")}
                </p>
              </div>
            </div>
            <div
              className={styles.sliderContainer}
              style={{ paddingBottom: "0" }}
            >
              <p className={styles.label}>{t("payment methods")}</p>
              <Slider
                elements={exchangePayments?.map((paymentMethod) =>
                  t(`payment_methods.${paymentMethod}`)
                )}
              />
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.socialMedia}>
              <p className={styles.hiddenLabel}>Socials</p>
              <div className={styles.icons}>
                <a href={exchange?.x_link}>
                  <XIcon />
                </a>
                <a href={exchange?.instagram_link}>
                  <InstagramIcon />
                </a>
                <a href={exchange?.linkedin_link}>
                  <LinkedinIcon />
                </a>
              </div>
            </div>
            <div className={styles.buttons}>
              <button
                onClick={() => handleRateExchange()}
                className={styles.rateExchange}
              >
                {t("rate exchange")}
              </button>
              <a
                href={"https://binance.com"}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.openExchange}
              >
                {t("open")} {exchange.name}
              </a>
              <div className={styles.navigationButtons}>
                <button
                  onClick={goToPreviousExchange}
                  disabled={isFirstExchange}
                  className={`${styles.navButton} ${
                    isFirstExchange && styles.navButtonDisabled
                  }`}
                >
                  <ArrowIcon className={styles.arrowIcon} />
                  <p className={styles.mobileNavText}>{t("previous")}</p>
                </button>
                <button
                  onClick={goToNextExchange}
                  disabled={isLastExchange}
                  className={`${styles.navButton} ${
                    isLastExchange && styles.navButtonDisabled
                  }`}
                >
                  <p className={styles.mobileNavText}>{t("next")}</p>
                  <ArrowIcon className={styles.arrowIconRight} />
                </button>
              </div>
            </div>
          </div>

          <ExchangeReviewsPopup
            showPopup={showReviewsPopup}
            setShowPopup={setShowReviewsPopup}
            exchange={exchange}
            removeBackground={true}
            exchangeReviews={exchangeReviews}
          />
          <RateExchangePopup
            showPopup={showRateExchangePopup}
            setShowPopup={setShowRateExchangePopup}
            logo={exchange.logo}
            exchange={exchange.exchange}
            getExchangeReviews={getExchangeReviews}
          />
        </>
        <LoginPopup
          showPopup={showLoginPopup}
          setShowPopup={setShowLoginPopup}
        />
      </PopupSkeleton>
    );
  }

  return null;
};

export default ExchangeDetailsPopup;
