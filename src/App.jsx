import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import { ThemeProvider } from "./contexts/index"
import { CardsDetails } from "./components/CardsDetails"
import { Home } from "../src/Home/index"
import "./App.css"

function App() {
  return (

    <BrowserRouter>
      <ThemeProvider >
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/pokemon/:name" element={<CardsDetails/>}/>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
