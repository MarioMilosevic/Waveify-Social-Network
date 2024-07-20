import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./pages/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Home from "./pages/Home/Home";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<LogIn />} />
        <Route element={<ProtectedRoute />}>
          <Route path={"/home"} element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
