// Currency conversion rates (example rates - in the future should be fetched from an API in production) 
const conversionRates = {
    USD: 1,
    EUR: 0.91,
    GBP: 0.79,
    JPY: 147.57,
    AUD: 1.52,
    CAD: 1.35,
    CHF: 0.87,
    CNY: 7.19,
    MXN: 17.15,
    ARS: 823.45
  };
  
  export const convertCurrency = (amount, fromCurrency = 'USD', toCurrency = 'USD') => {
    if (!amount) return amount;
    if (fromCurrency === toCurrency) return amount;
    
    const usdAmount = fromCurrency === 'USD' ? 
      amount : 
      amount / conversionRates[fromCurrency];
      
    return usdAmount * conversionRates[toCurrency];
  };
  
  export const formatCurrency = (amount, currency = 'USD') => {
    if (!amount) return '';
    
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  
    return formatter.format(amount);
  };
  
  export const getCurrencySymbol = (currency = 'USD') => {
    const symbols = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      JPY: '¥',
      AUD: 'A$',
      CAD: 'C$',
      CHF: 'Fr',
      CNY: '¥',
      MXN: '$',
      ARS: '$'
    };
    
    return symbols[currency] || currency;
  };