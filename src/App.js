import logo from './logo.svg';
import './App.css';
import Weather from './components/weather'
import LocationToLatLng from './components/geocoding';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Weather />
      </header>
    </div>
  );
}

export default App;
