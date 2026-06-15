import { useEffect, useState } from "react";
import { useParams }           from "react-router-dom";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import Loader      from "../components/Loader";

export default function ProducerProfile() {
  const { id } = useParams();
  const [producer, setProducer] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get(`/users/profile`).then(r => setProducer(r.data.data));
    api.get(`/products?user_id=${id}`).then(r => setProducts(r.data.data));
  }, [id]);

  if (!producer) return <Loader />;

  return (
    <div style={{ maxWidth:900, margin:"30px auto", padding:"0 16px" }}>
      <div style={styles.header}>
        <div style={styles.avatar}>{producer.nom?.[0]?.toUpperCase()}</div>
        <div>
          <h1 style={styles.name}>{producer.nom}</h1>
          <p style={styles.role}>{producer.role}</p>
          <div style={styles.btns}>
            <a href={`tel:${producer.telephone}`} style={{...styles.btn, background:"#2D6A4F"}}>📞 Appeler</a>
            <a href={`https://wa.me/${producer.telephone?.replace(/\D/g,"")}`}
               target="_blank" rel="noreferrer" style={{...styles.btn, background:"#25D366"}}>💬 WhatsApp</a>
          </div>
        </div>
      </div>
      <h2 style={styles.sectionTitle}>Ses produits</h2>
      <div className="card-grid">
        {products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}

const styles = {
  header:       { background:"#fff", borderRadius:14, padding:24, display:"flex", gap:20, alignItems:"center", boxShadow:"0 2px 12px rgba(0,0,0,.08)", marginBottom:24 },
  avatar:       { width:80, height:80, borderRadius:"50%", background:"#2D6A4F", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:32, fontWeight:"bold" },
  name:         { fontSize:24, fontWeight:"bold", color:"#1D3557" },
  role:         { color:"#888", textTransform:"capitalize", marginBottom:12 },
  btns:         { display:"flex", gap:10 },
  btn:          { padding:"8px 18px", borderRadius:8, color:"#fff", textDecoration:"none", fontWeight:"bold", fontSize:14 },
  sectionTitle: { fontSize:20, color:"#2D6A4F", fontWeight:"bold", marginBottom:16 },
};