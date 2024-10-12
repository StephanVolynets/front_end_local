export const cryptoNameToSymbol = (cryptoName) => {
  if (cryptoName === "bitcoin") return "BTCUSDT";
  if (cryptoName === "ethereum") return "ETHUSDT";
  if (cryptoName === "solana") return "SOLUSDT";
  if (cryptoName === "stellar") return "XLMUSDT";
  if (cryptoName === "dogecoin") return "DOGEUSDT";
  else return null;
};
