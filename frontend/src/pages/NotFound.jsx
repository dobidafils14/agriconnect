import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{ textAlign:"center", padding:"80px 20px" }}>
      <div style={{ fontSize:80 }}>🌾</div>
      <h1 style={{ fontSize:36, color:"#1D3557", margin:"16px 0 8px" }}>Page introuvable</h1>
      <p style={{ color:"#888", marginBottom:24 }}>Cette page n'existe pas ou a été déplacée.</p>
      <Link to="/" style={{ padding:"12px 28px", background:"#2D6A4F", color:"#fff", borderRadius:10, fontWeight:"bold", fontSize:16 }}>
        Retour à l'accueil
      </Link>
    </div>
  );
}