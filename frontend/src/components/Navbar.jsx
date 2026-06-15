import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate("/"); };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>🌾 AgriConnect</Link>
      <div style={styles.links}>
        <Link to="/agriculture" style={styles.link}>🌱 Agriculture</Link>
        <Link to="/elevage"     style={styles.link}>🐄 Élevage</Link>
        <Link to="/dashboard"   style={styles.link}>📊 Tableau de bord</Link>
        <Link to="/statistiques"style={styles.link}>📈 Statistiques</Link>
        <Link to="/parametres"  style={styles.link}>⚙️ Paramètres</Link>
        <Link to="/a-propos"    style={styles.link}>ℹ️ À propos</Link>
      </div>
      <div style={styles.user}>
        <span style={styles.userName}>👤 {user?.nom}</span>
        <button onClick={handleLogout} style={styles.btn}>Déconnexion</button>
      </div>
    </nav>
  );
}

const styles = {
  nav:      { display:"flex", alignItems:"center", justifyContent:"space-between", background:"#2D6A4F", padding:"12px 24px", flexWrap:"wrap", gap:8 },
  logo:     { color:"#fff", fontWeight:"bold", fontSize:22, textDecoration:"none" },
  links:    { display:"flex", gap:16, flexWrap:"wrap" },
  link:     { color:"#D8F3DC", textDecoration:"none", fontSize:14, fontWeight:500 },
  user:     { display:"flex", alignItems:"center", gap:12 },
  userName: { color:"#fff", fontSize:14 },
  btn:      { background:"#E76F51", color:"#fff", border:"none", padding:"6px 14px", borderRadius:6, cursor:"pointer", fontWeight:"bold" },
};