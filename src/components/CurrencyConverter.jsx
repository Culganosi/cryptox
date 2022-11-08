import ExchangeRate from "./ExchangeRate";
import { useState } from "react";
import axios from "axios";

export default function CurrencyConverter() {
  const currencies = ["BTC", "ETH", "USD", "XRP", "LTC", "ADA"];
  const [chosenPrimary, setChosenPrimary] = useState("BTC");
  const [chosenSecondary, setChosenSecondary] = useState("BTC");
  const [amount, setAmount] = useState(1);
  const [exchangedData, setExchangedData] = useState({
    primaryCurrency: "BTC",
    secondaryCurrency: "BTC",
    exchangeRate: 0,
  });
  const [result, setResult] = useState(0);

  const convert = () => {
    const options = {
      method: "GET",
      url: "http://localhost:8000/convert",
      params: {
        to_currency: chosenSecondary,
        function: "CURRENCY_EXCHANGE_RATE",
        from_currency: chosenPrimary,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setResult(response.data * amount);
        setExchangedData({
          primaryCurrency: chosenPrimary,
          secondaryCurrency: chosenSecondary,
          exchangeRate: response.data,
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  return (
    <div className="currency-converter">
      <h2>CurrencyConverter</h2>
      <div className="input-box">
        <table>
          <tbody>
            <tr>
              <td>Primary Currency:</td>
              <td>
                <input
                  type="number"
                  name="currency-amount-1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </td>
              <td>
                <select
                  value={chosenPrimary}
                  name="currency-option-1"
                  className="currency-options"
                  onChange={(e) => setChosenPrimary(e.target.value)}
                >
                  {currencies.map((currency, _index) => (
                    <option key={_index}>{currency}</option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td>Secondary Currency:</td>
              <td>
                <input
                  type="number"
                  name="currency-amount-2"
                  value={result}
                  disabled={true}
                />
              </td>
              <td>
                <select
                  value={chosenSecondary}
                  name="currency-option-2"
                  className="currency-options"
                  onChange={(e) => setChosenSecondary(e.target.value)}
                >
                  {currencies.map((currency, _index) => (
                    <option key={_index}>{currency}</option>
                  ))}
                </select>
              </td>
            </tr>
          </tbody>
        </table>

        <button id="convert-button" onClick={convert}>
          Convert
        </button>
      </div>
      <ExchangeRate exchangedData={exchangedData} />
    </div>
  );
}
