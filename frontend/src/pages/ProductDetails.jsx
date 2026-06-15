import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../services/productService";
import Loader from "../components/Loader";
import api    from "../services/api";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [note,    setNote]    = useState(5);
  const [comment, setComment] = useState("");
  const [msg,     setMsg]     = useState("");

  useEffect(() => {
    getProductById(id).then(r => setProduct(r.data.data));
    api.get(`/reviews/${id}`).then(r => setReviews(r.data.data));
  }, [id]);

  const submitReview = async () => {
    try {
      await api.post("/reviews", { product_id: id, note, commentaire: comment });
      setMsg("Avis ajouté !");
      api.get(`/reviews/${id}`).then(r => setReviews(r.data.data));
      setComment("");
    } catch(e) { setMsg(e.response?.data?.message || "Erreur."); }
  };

  if (!product) return <Loader />;

  const imgSrc = product.image
    ? `http://localhost:5000${product.image}`
    : "https://via.placeholder.com/600x350?text=Pas+d%27image";

  return (
    <div style={{ maxWidth:800, margin:"30px auto", padding:"0 16px" }}>
      <button onClick={() => navigate(-1)} style={styles.back}>← Retour</button>
      <div style={styles.card}>
        <img src={imgSrc} alt={product.titre} style={styles.img} />
        <div style={styles.body}>
          <span style={styles.badge}>{product.categorie === "agriculture" ? "🌱 Agriculture" : "🐄 Élevage"}</span>
          <h1 style={styles.titre}>{product.titre}</h1>
          <p style={styles.prix}>{Number(product.prix).toLocaleString()} FCFA / {product.unite}</p>
          <p style={styles.desc}>{product.description}</p>
          <div style={styles.meta}>
            <span>📦 Stock : {product.quantite}</span>
            <span>👤 {product.vendeur}</span>
          </div>
          <div style={styles.btns}>
            <a href={`tel:${product.telephone}`} style={{...styles.btn, background:"#2D6A4F"}}>📞 Appeler le vendeur</a>
            <a href={`https://wa.me/${product.telephone?.replace(/\D/g,"")}`}
               target="_blank" rel="noreferrer" style={{...styles.btn, background:"#25D366"}}>
              💬 Contacter sur WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Avis */}
      <div style={styles.reviewSection}>
        <h2 style={styles.reviewTitle}>⭐ Avis clients ({reviews.length})</h2>
        {reviews.map((r,i) => (
          <div key={i} style={styles.reviewCard}>
            <strong>{r.nom}</strong> — {"⭐".repeat(r.note)}
            <p style={{ margin:"4px 0 0", color:"#555", fontSize:14 }}>{r.commentaire}</p>
          </div>
        ))}
        <div style={styles.addReview}>
          <h3 style={{ marginBottom:10, color:"#1D3557" }}>Laisser un avis</h3>
          <select value={note} onChange={e=>setNote(e.target.value)} style={styles.select}>
            {[5,4,3,2,1].map(n=><option key={n} value={n}>{n} étoile{n>1?"s":""}</option>)}
          </select>
          <textarea rows={3} style={styles.textarea} placeholder="Votre commentaire..."
            value={comment} onChange={e=>setComment(e.target.value)} />
          {msg && <p style={{ color:"#2D6A4F", fontSize:13 }}>{msg}</p>}
          <button style={styles.btn2} onClick={submitReview}>Envoyer l'avis</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  back:          { background:"none", border:"none", color:"#2D6A4F", cursor:"pointer", fontSize:15, marginBottom:16, fontWeight:"bold" },
  card:          { background:"#fff", borderRadius:14, overflow:"hidden", boxShadow:"0 4px 20px rgba(0,0,0,0.1)", marginBottom:30 },
  img:           { width:"100%", height:320, objectFit:"cover" },
  body:          { padding:24 },
  badge:         { background:"#D8F3DC", color:"#2D6A4F", padding:"4px 12px", borderRadius:20, fontSize:13, fontWeight:"bold" },
  titre:         { fontSize:26, fontWeight:"bold", color:"#1D3557", margin:"12px 0 6px" },
  prix:          { fontSize:22, color:"#2D6A4F", fontWeight:"bold", marginBottom:12 },
  desc:          { color:"#555", lineHeight:1.7, marginBottom:16 },
  meta:          { display:"flex", gap:20, color:"#888", fontSize:14, marginBottom:20 },
  btns:          { display:"flex", gap:12, flexWrap:"wrap" },
  btn:           { padding:"12px 20px", borderRadius:8, color:"#fff", textDecoration:"none", fontWeight:"bold", fontSize:15 },
  reviewSection: { background:"#fff", borderRadius:14, padding:24, boxShadow:"0 2px 12px rgba(0,0,0,0.08)" },
  reviewTitle:   { fontSize:20, color:"#1D3557", marginBottom:16 },
  reviewCard:    { borderBottom:"1px solid #eee", paddingBottom:12, marginBottom:12 },
  addReview:     { marginTop:20, background:"#F4F9F4", borderRadius:10, padding:16 },
  select:        { width:"100%", padding:"10px", marginBottom:10, borderRadius:8, border:"1px solid #ccc", fontSize:14 },
  textarea:      { width:"100%", padding:"10px", borderRadius:8, border:"1px solid #ccc", fontSize:14, resize:"vertical", marginBottom:10 },
  btn2:          { padding:"10px 24px", background:"#2D6A4F", color:"#fff", border:"none", borderRadius:8, fontWeight:"bold", cursor:"pointer" },
};