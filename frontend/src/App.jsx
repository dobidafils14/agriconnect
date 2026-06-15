import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  const { user } = useAuth();

  if (user) {
    return <AppRoutes />;
  }

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/inscription" element={<Register />} />
    </Routes>
  );
}