import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LogIn from "./pages/Login/Login";
import ProtectedRoute from "./features/authentication/ProtectedRoute/ProtectedRoute";
import Homepage from "./pages/Homepage/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/home" element={<ProtectedRoute />}>
          <Route index element={<Homepage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
