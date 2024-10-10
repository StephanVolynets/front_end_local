"use client";

import styles from "./template.module.css";

import "../i18n";
import { LanguageProvider, LanguageContext } from "@/context/LanguageContext";
import React, { useContext, useEffect } from "react";
import { SocketProvider } from "@/context/SocketContext";

export default function Template({ children }) {
  return (
    <LanguageProvider>
      <SocketProvider>
        <HtmlLanguage>
          <main className={styles.main}>{children}</main>
        </HtmlLanguage>
      </SocketProvider>
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
