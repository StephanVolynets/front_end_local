"use client";

import styles from "./GoogleButton.module.css";
import { useTranslation } from "react-i18next";
import { supabase } from "@/lib/supabaseClient";
import GoogleIcon from "@/components/icons/googleIcon";
import { useAuth } from "@/context/AuthContext";

const GoogleButton = () => {
  const { t } = useTranslation();
  const { user, setUser } = useAuth();

  const authenticateWithOAuth = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error logging out:", error);
    } else {
      console.log("User logged out successfully");
      setUser(null);
      window.location.reload();
    }
  };

  console.log("user", user);

  return (
    <button
      onClick={user ? handleLogout : authenticateWithOAuth}
      className={styles.googleButton}
      type="button"
    >
      {user ? (
        <span>Logout</span>
      ) : (
        <>
          <GoogleIcon className={styles.googleIcon} aria-hidden="true" />
          <span>{t("login-google")}</span>
        </>
      )}
    </button>
  );
};

export default GoogleButton;
