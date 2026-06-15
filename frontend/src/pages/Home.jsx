import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import SearchBar   from "../components/SearchBar";
import Loader      from "../components/Loader";
import { Link }    from "react-router-dom";

export default function Home() {
  const [agri,    setAgri]    = useState([]);
  const [elev,    setElev]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [query,   setQuery]   = useState("");

  useEffect(() => {
    Promise.all([getProducts("agriculture"), getProducts("elevage")])
      .then(([r1, r2]) => { setAgri(r1.data.data); setElev(r2.data.data); })
      .finally(() => setLoading(false));
  }, []);

  const filter = (list) => list.filter(p =>
    p.titre.toLowerCase().includes(query.toLowerCase()) ||
    p.vendeur?.toLowerCase().includes(query.toLowerCase())
  );

  if (loading) return <Loader />;

  return (
    <div>
      {/* Hero */}
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>🌾 Bienvenue sur AgriConnect</h1>
        <p style={styles.heroSub}>La plateforme qui connecte agriculteurs, éleveurs et acheteurs</p>
        <div style={styles.heroBtns}>
          <Link to="/agriculture" style={{...styles.heroBtn, background:"#52B788"}}>🌱 Voir l'Agriculture</Link>
          <Link to="/elevage"     style={{...styles.heroBtn, background:"#E9C46A", color:"#1D3557"}}>🐄 Voir l'Élevage</Link>
        </div>
      </div>

      <SearchBar onSearch={setQuery} />

      {/* Section Agriculture */}
      <section>
        <h2 className="page-title">🌱 Produits Agricoles</h2>
        <p className="page-subtitle">Fruits, légumes, céréales et plus</p>
        <div className="card-grid">
          {filter(agri).slice(0,4).map(p => <ProductCard key={p.id} product={p} />)}
        </div>
        {agri.length > 4 && <div style={{textAlign:"center",marginBottom:24}}><Link to="/agriculture" style={styles.more}>Voir tous les produits →</Link></div>}
      </section>

      {/* Section Élevage */}
      <section>
        <h2 className="page-title">🐄 Produits d'Élevage</h2>
        <p className="page-subtitle">Viandes, lait, œufs et produits fermiers</p>
        <div className="card-grid">
          {filter(elev).slice(0,4).map(p => <ProductCard key={p.id} product={p} />)}
        </div>
        {elev.length > 4 && <div style={{textAlign:"center",marginBottom:24}}><Link to="/elevage" style={styles.more}>Voir tous les produits →</Link></div>}
      </section>
    </div>
  );
}

const styles = {
  hero:      { background:"linear-gradient(135deg,#2D6A4F,#52B788)", color:"#fff", textAlign:"center", padding:"60px 20px" },
  heroTitle: { fontSize:36, fontWeight:"bold", marginBottom:12 },
  heroSub:   { fontSize:18, marginBottom:28, opacity:.9 },
  heroBtns:  { display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap" },
  heroBtn:   { padding:"12px 28px", borderRadius:10, fontWeight:"bold", fontSize:16, color:"#fff", textDecoration:"none" },
  more:      { color:"#2D6A4F", fontWeight:"bold", fontSize:15 },
};