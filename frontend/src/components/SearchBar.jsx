import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState("");
  return (
    <div style={styles.wrap}>
      <input style={styles.input} placeholder="Rechercher un produit..." value={q}
        onChange={e => setQ(e.target.value)}
        onKeyDown={e => e.key === "Enter" && onSearch(q)} />
      <button style={styles.btn} onClick={() => onSearch(q)}>🔍 Rechercher</button>
    </div>
  );
}

const styles = {
  wrap:  { display:"flex", gap:8, margin:"20px auto", maxWidth:500 },
  input: { flex:1, padding:"10px 14px", borderRadius:8, border:"1px solid #ccc", fontSize:15 },
  btn:   { padding:"10px 20px", background:"#2D6A4F", color:"#fff", border:"none", borderRadius:8, cursor:"pointer", fontWeight:"bold" },
};