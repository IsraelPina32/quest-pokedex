import { ThemeProvider } from "./contexts/index"
import { Home } from "../src/Home/index"
import "./App.css"

function App() {
  return (
    <div>
      <ThemeProvider >
        <Home />
      </ThemeProvider>
    </div>
  )
}

export default App
