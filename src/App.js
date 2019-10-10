import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import api from "./services/api";

import moment from "moment";
import { Line, Chart } from "react-chartjs-2";

import currencies from "./supported-currencies.json";

import "./App.css";
function App() {
  const defaultCurrency = "BRL";
  const [currency, setCurrency] = useState(defaultCurrency);
  const [bpi, setBpi] = useState(null);

  Chart.defaults.global.defaultFontColor = "#000";
  Chart.defaults.global.defaultFontSize = 16;

  useEffect(() => {
    const getBitCoinData = async () => {
      await api
        .get(`bpi/historical/close.json`, {
          params: {
            currency
          }
        })
        .then(({ data }) => {
          setBpi(data.bpi);
        })
        .catch(e => {
          return e;
        });
    };

    getBitCoinData();
  }, [currency]);
  const onCurrencySelect = e => {
    setCurrency(e.target.value);
  };

  const formatChartData = () => {
    return {
      labels: Object.keys(bpi).map(date => moment(date).format("ll")),
      datasets: [
        {
          label: "bitcoin",
          fill: true,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapborderCapStyleStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: Object.keys(bpi).map(key => {
            return bpi[key];
          })
        }
      ]
    };
  };
  if (bpi) {
    return (
      <div className="app">
        <Header title="OLA" />

        <div className="select-container">
          <span style={{ fontSize: 18, fontFamily: "bungee" }}>
            {" "}
            Select your currency:{" "}
          </span>

          <select value={currency} onChange={onCurrencySelect}>
            {currencies.map((obj, index) => {
              return (
                <option key={`${index}-${obj.country}`} value={obj.currency}>
                  {obj.country}{" "}
                </option>
              );
            })}
          </select>

          {currency !== defaultCurrency && (
            <div>
              <button
                className="reset"
                onClick={() => {
                  setCurrency(defaultCurrency);
                }}
                style={{ color: "black", fontSize: 16, fontFamily: "bungee" }}
              >
                {" "}
                [CLICK HERE TO RESET]{" "}
              </button>
            </div>
          )}
        </div>

        <div>
          <Line data={formatChartData()} height={250} />
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <Header title="OLA" />
    </div>
  );
}

export default App;
