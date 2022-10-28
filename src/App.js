import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [money, setMoney] = useState(0);
  const [selectedCoin, setSelectedCoin] = useState(1);

  const onChangeSelect = (event) => {
    setSelectedCoin(event.target.value);
  }

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json)
        setLoading(false);
      });
  }, []);

  const onChange = (event) => {
    setMoney(event.target.value);
  }

  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>

      {loading ? <strong>Loading..</strong> :
        <div>
          <p>
            <select onChange={onChangeSelect}>
              {coins.map((coin) =>
                <option key={coin.id} value={coin.quotes.USD.price}>
                  {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price} USD
                </option>
              )}
            </select>
            <input onChange={onChange} value={money} type="number" placeholder="your money" />
            <br />
            <strong>{money / selectedCoin}</strong>
          </p>
        </div>
      }

    </div>
  )
}

export default App;
