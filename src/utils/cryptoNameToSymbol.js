export const cryptoNameToSymbol = (cryptoName) => {
  if (cryptoName === "BTC") return "BTCUSDT";
  if (cryptoName === "ETH") return "ETHUSDT";
  if (cryptoName === "SOL") return "SOLUSDT";
  if (cryptoName === "XLM") return "XLMUSDT";
  if (cryptoName === "DOGE") return "DOGEUSDT";
  else return null;
};
