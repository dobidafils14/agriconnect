import { useEffect, useState } from "react";
import { getMyStats, getGlobalStats } from "../services/productService";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";

export default function Stats() {
  const { user } = useAuth();
  const [myStats,     setMyStats]     = useState(null);
  const [globalStats, setGlobalStats] = useState(null);

  useEffect(() => {
    getMyStats().then(r => setMyStats(r.data.data));
    if (user?.role === "admin") getGlobalStats().then(r => setGlobalStats(r.data.data));
  }, [user]);

  if (!myStats) return <Loader />;

  const cards = [
    { label:"Mes produits publiés", value: myStats.total_produits,   icon:"📦", color:"#2D6A4F" },
    { label:"Stock total",          value: myStats.total_stock ?? 0, icon:"🏪", color:"#457B9D" },
    { label:"Produits agriculture", value: myStats.total_agriculture, icon:"🌱", color:"#52B788" },
    { label:"Produits élevage",     value: myStats.total_elevage,     icon:"🐄", color:"#E9A820" },
  ];

  return (
    <div style={{ maxWidth:900, margin:"30px auto", padding:"0 16px" }}>
      <h1 className="page-title">📈 Statistiques</h1>
      <p className="page-subtitle">Vue d'ensemble de votre activité</p>

      <h2 style={styles.sectionTitle}>Mes statistiques</h2>
      <div style={styles.grid}>
        {cards.map((c,i) => (
          <div key={i} style={{...styles.card, borderTop:`4px solid ${c.color}`}}>
            <span style={styles.icon}>{c.icon}</span>
            <span style={styles.value}>{c.value ?? 0}</span>
            <span style={styles.label}>{c.label}</span>
          </div>
        ))}
      </div>

      {globalStats && (
        <>
          <h2 style={{...styles.sectionTitle, marginTop:32}}>Statistiques globales (Admin)</h2>
          <div style={styles.grid}>
            {[
              { label:"Utilisateurs total",   value:globalStats.total_users,        icon:"👥", color:"#1D3557" },
              { label:"Produits total",        value:globalStats.total_products,     icon:"🛒", color:"#2D6A4F" },
              { label:"Agriculteurs inscrits", value:globalStats.total_agriculteurs, icon:"🌾", color:"#52B788" },
              { label:"Éleveurs inscrits",     value:globalStats.total_eleveurs,     icon:"🐄", color:"#E9A820" },
              { label:"Acheteurs inscrits",    value:globalStats.total_acheteurs,    icon:"🧑‍💼",color:"#457B9D" },
            ].map((c,i) => (
              <div key={i} style={{...styles.card, borderTop:`4px solid ${c.color}`}}>
                <span style={styles.icon}>{c.icon}</span>
                <span style={styles.value}>{c.value ?? 0}</span>
                <span style={styles.label}>{c.label}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  sectionTitle: { fontSize:18, fontWeight:"bold", color:"#1D3557", marginBottom:16 },
  grid:   { display:"flex", flexWrap:"wrap", gap:20 },
  card:   { background:"#fff", borderRadius:12, padding:24, minWidth:180, flex:1, boxShadow:"0 2px 10px rgba(0,0,0,.08)", display:"flex", flexDirection:"column", alignItems:"center", gap:8 },
  icon:   { fontSize:32 },
  value:  { fontSize:36, fontWeight:"bold", color:"#1D3557" },
  label:  { fontSize:13, color:"#888", textAlign:"center" },
};