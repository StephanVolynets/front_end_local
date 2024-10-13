"use client";

import styles from "./template.module.css";

import "../i18n";
import { LanguageProvider, LanguageContext } from "@/context/LanguageContext";
import React, { useContext, useEffect } from "react";
import { SocketProvider } from "@/context/SocketContext";
import { AuthProvider } from "@/context/AuthContext";

export default function Template({ children }) {
  return (
    <LanguageProvider>
      <AuthProvider>
        <SocketProvider>
          <HtmlLanguage>
            <main className={styles.main}>{children}</main>
          </HtmlLanguage>
        </SocketProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

const HtmlLanguage = ({ children }) => {
  const { selectedCountry } = useContext(LanguageContext);

  useEffect(() => {
    if (document && selectedCountry) {
      document.documentElement.lang = selectedCountry.language;
    }
  }, [selectedCountry]);

  return <>{children}</>;
};
