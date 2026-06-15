import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import SearchBar   from "../components/SearchBar";
import Loader      from "../components/Loader";

export default function Products({ categorie }) {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    setLoading(true);
    getProducts(categorie)
      .then(r => { setProducts(r.data.data); setFiltered(r.data.data); })
      .finally(() => setLoading(false));
  }, [categorie]);

  const onSearch = (q) => {
    setFiltered(products.filter(p =>
      p.titre.toLowerCase().includes(q.toLowerCase()) ||
      p.vendeur?.toLowerCase().includes(q.toLowerCase())
    ));
  };

  const icon  = categorie === "agriculture" ? "🌱" : "🐄";
  const label = categorie === "agriculture" ? "Produits Agricoles" : "Produits d'Élevage";

  if (loading) return <Loader />;

  return (
    <div>
      <div style={{ background: categorie==="agriculture" ? "#2D6A4F" : "#457B9D", color:"#fff", textAlign:"center", padding:"40px 20px" }}>
        <h1 style={{ fontSize:30, fontWeight:"bold" }}>{icon} {label}</h1>
        <p style={{ opacity:.85, marginTop:8 }}>{filtered.length} produit(s) disponible(s)</p>
      </div>
      <SearchBar onSearch={onSearch} />
      <div className="card-grid">
        {filtered.length === 0
          ? <p style={{ textAlign:"center", color:"#888", padding:40 }}>Aucun produit trouvé.</p>
          : filtered.map(p => <ProductCard key={p.id} product={p} />)
        }
      </div>
    </div>
  );
}