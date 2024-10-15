"use client";

import styles from "./LoginButton.module.css";
import { useTranslation } from "react-i18next";
import { useState } from "react";

import LoginPopup from "@/components/popups/loginPopup/LoginPopup";
import { useAuth } from "@/context/AuthContext";

const LoginButton = () => {
  const { t } = useTranslation();
  const [showPopup, setShowPopup] = useState(false);
  const { user } = useAuth();

  return (
    <>
      <button
        className={styles.button}
        onClick={() => setShowPopup(!showPopup)}
      >
        {user ? user?.user_metadata?.full_name.split(" ")[0] : t("login")}
      </button>
      <LoginPopup showPopup={showPopup} setShowPopup={setShowPopup} />
    </>
  );
};

export default LoginButton;
