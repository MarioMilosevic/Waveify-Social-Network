import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./pages/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<LogIn/> } />
        <Route path={"/home"} element={<ProtectedRoute/> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
