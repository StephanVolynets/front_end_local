"use client";

import styles from "./LoggedDropdown.module.css";

import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

import UserIcon from "@/components/icons/userIcon";
import LogoutIcon from "@/components/icons/logoutIcon";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabaseClient";

const LoggedDropdown = () => {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const { user, setUser } = useAuth();
  const dropdownRef = useRef(null);

  const username = user?.user_metadata?.full_name.split(" ")[0] || "";

  const logout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error logging out:", error);
    } else {
      console.log("User logged out successfully");
      setUser(null);
      window.location.reload();
    }
  };

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

  const handleToggle = async () => {
    if (!user) {
      authenticateWithOAuth();
      return;
    }

    if (isOpen) {
      setIsClosing(true);
      await logout();
      setIsOpen(false);
      setIsClosing(false);
    } else {
      setIsOpen(true);
    }
  };

  const handleLogout = () => {
    // logout logic
    console.log("logout");
    handleToggle();
  };

  // close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button
        className={`${styles.dropButton} ${
          isOpen ? styles.dropButtonOpen : ""
        }`}
        onClick={handleToggle}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <UserIcon />
        {!!user ? username : t("login")}
      </button>
      {(isOpen || isClosing) && (
        <ul
          className={`${styles.dropdownContent} ${
            isClosing ? styles.disabledDropdownContent : ""
          }`}
          role="listbox"
        >
          <li role="option" className={styles.dropdownSelectContainer}>
            <button className={styles.dropdownSelect} onClick={handleLogout}>
              <LogoutIcon />
              {t("logout")}
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default LoggedDropdown;
