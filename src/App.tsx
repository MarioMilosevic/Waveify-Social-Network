import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./pages/Login/Login";
import Home from "./pages/Home/Home";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<LogIn/> } />
        <Route path={"/home"} element={<Home/> } />
      </Routes>
    </BrowserRouter>
  )


}

export default App;
