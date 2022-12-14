import CurrencyConverter from "./components/CurrencyConverter";
import NewsFeed from "./components/NewsFeed";

function App() {
  return (
    <div className="app">
      <h1>Cristina's Crypto Corner</h1>
      <div className="app-wrapper">
        <CurrencyConverter />
        <NewsFeed />
      </div>
    </div>
  );
}

export default App;
