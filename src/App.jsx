import { BrowserRouter , Routes, Route } from "react-router"
import { ThemeProvider } from "./contexts/index"
import { CardsDetails } from "./components/CardsDetails"
import { Home } from "../src/Home/index"
import "./App.css"

function App() {
  return (

    <BrowserRouter>
      <ThemeProvider >
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/pokemon/:name" element={<CardsDetails/>}/>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
