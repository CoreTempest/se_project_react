import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import WeatherCard from "../WeatherCard/WeatherCard";

function App() {
  return (
    <div className="app">
      <div className="app__content">
        <Header />
        <Main />
      </div>
    </div>
  );
}

export default App;
