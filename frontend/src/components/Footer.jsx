import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>🌾 AgriConnect © 2026 — Plateforme de mise en relation agricole</p>
      <div style={styles.links}>
        <Link to="/a-propos"  style={styles.link}>À propos</Link>
        <Link to="/parametres"style={styles.link}>Paramètres</Link>
      </div>
    </footer>
  );
}

const styles = {
  footer: { background:"#1D3557", color:"#fff", textAlign:"center", padding:"20px", marginTop:40 },
  text:   { margin:0, fontSize:14 },
  links:  { display:"flex", justifyContent:"center", gap:20, marginTop:8 },
  link:   { color:"#A8DADC", fontSize:13, textDecoration:"none" },
};