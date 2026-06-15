import { useEffect, useState } from "react";
import api from "../services/api";
import Loader from "../components/Loader";

export default function AdminDashboard() {
  const [users,   setUsers]   = useState([]);
  const [stats,   setStats]   = useState(null);
  const [loading, setLoading] = useState(true);

  const load = () => {
    Promise.all([
      api.get("/users/all"),
      api.get("/products/stats-globales")
    ]).then(([u, s]) => {
      setUsers(u.data.data);
      setStats(s.data.data);
    }).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const deleteUser = async (id) => {
    if (!window.confirm("Supprimer cet utilisateur ?")) return;
    await api.delete(`/users/${id}`);
    load();
  };

  if (loading) return <Loader />;

  return (
    <div style={{ maxWidth:1000, margin:"30px auto", padding:"0 16px" }}>
      <h1 style={styles.title}>🔧 Administration AgriConnect</h1>

      {stats && (
        <div style={styles.statsGrid}>
          {[
            ["👥","Utilisateurs",   stats.total_users],
            ["📦","Produits",        stats.total_products],
            ["🌾","Agriculteurs",    stats.total_agriculteurs],
            ["🐄","Éleveurs",        stats.total_eleveurs],
            ["🛒","Acheteurs",       stats.total_acheteurs],
          ].map(([icon,label,val],i) => (
            <div key={i} style={styles.statCard}>
              <span style={styles.statIcon}>{icon}</span>
              <span style={styles.statVal}>{val ?? 0}</span>
              <span style={styles.statLabel}>{label}</span>
            </div>
          ))}
        </div>
      )}

      <h2 style={styles.sectionTitle}>👥 Gestion des utilisateurs ({users.length})</h2>
      <div style={styles.table}>
        <div style={styles.tableHeader}>
          <span style={{flex:2}}>Nom</span>
          <span style={{flex:2}}>Email</span>
          <span style={{flex:1}}>Rôle</span>
          <span style={{flex:1}}>Téléphone</span>
          <span style={{flex:1}}>Action</span>
        </div>
        {users.map(u => (
          <div key={u.id} style={styles.tableRow}>
            <span style={{flex:2,fontWeight:"bold"}}>{u.nom}</span>
            <span style={{flex:2,color:"#555",fontSize:13}}>{u.email}</span>
            <span style={{flex:1}}>
              <span style={{...styles.roleBadge, background:
                u.role==="admin"?"#1D3557": u.role==="agriculteur"?"#2D6A4F":
                u.role==="eleveur"?"#E9A820":"#457B9D", color:"#fff"}}>
                {u.role}
              </span>
            </span>
            <span style={{flex:1,fontSize:13}}>{u.telephone || "—"}</span>
            <span style={{flex:1}}>
              <button style={styles.delBtn} onClick={()=>deleteUser(u.id)}>🗑</button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  title:        { fontSize:24, fontWeight:"bold", color:"#1D3557", marginBottom:24 },
  statsGrid:    { display:"flex", flexWrap:"wrap", gap:16, marginBottom:32 },
  statCard:     { background:"#fff", borderRadius:12, padding:20, flex:1, minWidth:140, textAlign:"center", boxShadow:"0 2px 10px rgba(0,0,0,.08)", display:"flex", flexDirection:"column", gap:6 },
  statIcon:     { fontSize:28 },
  statVal:      { fontSize:32, fontWeight:"bold", color:"#1D3557" },
  statLabel:    { fontSize:12, color:"#888" },
  sectionTitle: { fontSize:18, fontWeight:"bold", color:"#1D3557", marginBottom:16 },
  table:        { background:"#fff", borderRadius:12, overflow:"hidden", boxShadow:"0 2px 10px rgba(0,0,0,.07)" },
  tableHeader:  { display:"flex", background:"#1D3557", color:"#fff", padding:"12px 16px", fontWeight:"bold", fontSize:14 },
  tableRow:     { display:"flex", padding:"12px 16px", borderBottom:"1px solid #f0f0f0", alignItems:"center", fontSize:14 },
  roleBadge:    { padding:"3px 10px", borderRadius:12, fontSize:12, fontWeight:"bold" },
  delBtn:       { background:"#FADBD8", color:"#C0392B", border:"none", padding:"6px 10px", borderRadius:6, cursor:"pointer" },
};