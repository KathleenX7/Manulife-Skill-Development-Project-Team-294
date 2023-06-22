import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SearchPage from './components/SearchPage/SearchPage'
import BookList from './components/SearchPage/BookList'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SearchPage/>
      <BookList/>
    </>
  )
}

export default App
