import './App.css'
import Header from './components/Header'
import SearchAndCityList from './components/SearchAndCityList'
import Weather from './components/Weather'
function App() {
  
  return (
    
    <div className='bg-[#f8f9fa] w-screen h-screen'>
      <Header />
      <Weather />
      <SearchAndCityList />
    </div>
  )
}

export default App
