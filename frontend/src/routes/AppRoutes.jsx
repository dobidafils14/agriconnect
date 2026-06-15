import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import ProducerProfile from "../pages/ProducerProfile";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";

import FarmerDashboard from "../dashboard/FarmerDashboard";
import BuyerDashboard from "../dashboard/BuyerDashboard";
import AdminDashboard from "../dashboard/AdminDashboard";

import Stats from "../pages/Stats";
import Settings from "../pages/Settings";
import About from "../pages/About";

import { useAuth } from "../context/AuthContext";

export default function AppRoutes() {
  const { user } = useAuth();

  const Dashboard =
    user?.role === "admin"
      ? AdminDashboard
      : user?.role === "acheteur"
      ? BuyerDashboard
      : FarmerDashboard;

  return (
    <>
      <Navbar />

      <main style={{ minHeight: "80vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/agriculture"
            element={<Products categorie="agriculture" />}
          />

          <Route
            path="/elevage"
            element={<Products categorie="elevage" />}
          />

          <Route
            path="/produit/:id"
            element={<ProductDetails />}
          />

          <Route
            path="/producteur/:id"
            element={<ProducerProfile />}
          />

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/statistiques"
            element={<Stats />}
          />

          <Route
            path="/parametres"
            element={<Settings />}
          />

          <Route
            path="/a-propos"
            element={<About />}
          />

          <Route
            path="/inscription"
            element={<Register />}
          />

          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </main>

      <Footer />
    </>
  );
}