import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Weather from './components/Weather';
import SearchAndCityList from './components/SearchAndCityList';

function App() {

    return (
        <Router>
            <div className="bg-[#f8f9fa] w-screen h-screen">
                <Header />
                <Weather />
                <SearchAndCityList />
            </div>
        </Router>
    );
}

export default App;
