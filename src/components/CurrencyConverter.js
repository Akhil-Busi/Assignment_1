import React, { useState, useEffect } from "react";
import "./CurrencyConverter.css"; // Import styles

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);

  useEffect(() => {
    fetch(`https://api.exchangerate-api.com/v4/latest/USD`)
      .then((response) => response.json())
      .then((data) => {
        setCurrencies(Object.keys(data.rates));
        convertCurrency(amount, fromCurrency, toCurrency, data.rates);
      });
  }, []);

  const convertCurrency = async (amount, from, to, rates = null) => {
    if (!rates) {
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${from}`
      );
      const data = await response.json();
      rates = data.rates;
    }
    const rate = rates[to];
    setConvertedAmount((amount * rate).toFixed(2));
  };

  useEffect(() => {
    convertCurrency(amount, fromCurrency, toCurrency);
  }, [amount, fromCurrency, toCurrency]);

  return (
    <div className="converter">
      <h2>Currency Converter</h2>
      <div className="input-group">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
          {currencies.map((currency) => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
      </div>

      <div className="input-group">
        <input type="text" value={convertedAmount} disabled />
        <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
          {currencies.map((currency) => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CurrencyConverter;
