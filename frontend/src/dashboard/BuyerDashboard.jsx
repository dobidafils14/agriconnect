import { useEffect, useState } from "react";
import { getMessages } from "../services/messageService";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

export default function BuyerDashboard() {
  const [messages, setMessages] = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    getMessages().then(r => setMessages(r.data.data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <div style={{ maxWidth:900, margin:"30px auto", padding:"0 16px" }}>
      <h1 style={styles.title}>🛒 Mon espace Acheteur</h1>
      <div style={styles.grid}>
        <Link to="/agriculture" style={styles.card}>
          <span style={styles.icon}>🌱</span>
          <span style={styles.cardLabel}>Parcourir l'Agriculture</span>
        </Link>
        <Link to="/elevage" style={styles.card}>
          <span style={styles.icon}>🐄</span>
          <span style={styles.cardLabel}>Parcourir l'Élevage</span>
        </Link>
        <Link to="/statistiques" style={styles.card}>
          <span style={styles.icon}>📈</span>
          <span style={styles.cardLabel}>Mes statistiques</span>
        </Link>
        <Link to="/parametres" style={styles.card}>
          <span style={styles.icon}>⚙️</span>
          <span style={styles.cardLabel}>Paramètres</span>
        </Link>
      </div>
      <h2 style={styles.sectionTitle}>📨 Mes messages reçus ({messages.length})</h2>
      {messages.length === 0
        ? <p style={{ color:"#888", textAlign:"center", padding:30 }}>Aucun message reçu.</p>
        : messages.map((m,i) => (
          <div key={i} style={styles.msgCard}>
            <strong>{m.expediteur}</strong>
            {m.produit && <span style={styles.badge}> à propos de : {m.produit}</span>}
            <p style={styles.msgText}>{m.contenu}</p>
            <small style={styles.date}>{new Date(m.created_at).toLocaleString("fr-FR")}</small>
          </div>
        ))
      }
    </div>
  );
}

const styles = {
  title:        { fontSize:24, fontWeight:"bold", color:"#1D3557", marginBottom:24 },
  grid:         { display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:32 },
  card:         { background:"#fff", borderRadius:12, padding:28, textAlign:"center", boxShadow:"0 2px 10px rgba(0,0,0,.08)", textDecoration:"none", display:"flex", flexDirection:"column", alignItems:"center", gap:10 },
  icon:         { fontSize:40 },
  cardLabel:    { color:"#1D3557", fontWeight:"bold", fontSize:15 },
  sectionTitle: { fontSize:18, fontWeight:"bold", color:"#1D3557", marginBottom:16 },
  msgCard:      { background:"#fff", borderRadius:10, padding:16, marginBottom:12, boxShadow:"0 1px 6px rgba(0,0,0,.06)" },
  badge:        { background:"#D8F3DC", color:"#2D6A4F", padding:"2px 8px", borderRadius:12, fontSize:12, marginLeft:8 },
  msgText:      { color:"#555", margin:"8px 0 4px", fontSize:14 },
  date:         { color:"#aaa", fontSize:12 },
};