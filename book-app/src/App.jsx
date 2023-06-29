import './App.css'
import SearchPage from './components/SearchPage/SearchPage'
import ReadingPage from './components/ReadingPage/ReadingPage'
import {useState} from "react";
function App() {
  const [search, setSearch] = useState(true);
  const handleSwitchReading = () => {
    setSearch(false);
  }
  const handleSwitchSearch = () => {
    setSearch(true);
  }
  return (
    <>
      {search? <SearchPage goToReading = {handleSwitchReading}/>: <ReadingPage goToSearch = {handleSwitchSearch}/> }
    </>
  )
}

export default App
