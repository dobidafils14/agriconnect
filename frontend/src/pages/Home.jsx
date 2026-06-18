import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";

export default function Home() {
  const [agri, setAgri] = useState([]);
  const [elev, setElev] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    Promise.all([
      getProducts("agriculture"),
      getProducts("elevage"),
    ])
      .then(([r1, r2]) => {
        setAgri(r1.data.data || []);
        setElev(r2.data.data || []);
      })
      .finally(() => setLoading(false));
  }, []);

  const filterProducts = (products) =>
    products.filter(
      (p) =>
        p.titre?.toLowerCase().includes(query.toLowerCase()) ||
        p.vendeur?.toLowerCase().includes(query.toLowerCase())
    );

  if (loading) return <Loader />;

  return (
    <div>

      <section style={styles.hero}>
        <div style={styles.overlay}>

          <h1 style={styles.heroTitle}>
            🌾 AgriConnect Cameroun
          </h1>

          <p style={styles.heroText}>
            Découvrez les meilleurs produits agricoles et d'élevage
            directement auprès des producteurs.
          </p>

          <p style={styles.heroText2}>
            Consultez librement les catalogues, comparez les prix,
            explorez les annonces et trouvez facilement ce dont vous avez besoin.
          </p>

          <div style={styles.heroButtons}>

            <Link to="/agriculture" style={styles.greenBtn}>
              🌱 Agriculture
            </Link>

            <Link to="/elevage" style={styles.yellowBtn}>
              🐄 Élevage
            </Link>

          </div>
        </div>
      </section>


      <section style={styles.stats}>

        <div style={styles.statCard}>
          <h2>{agri.length}</h2>
          <p>Produits agricoles</p>
        </div>

        <div style={styles.statCard}>
          <h2>{elev.length}</h2>
          <p>Produits d'élevage</p>
        </div>

        <div style={styles.statCard}>
          <h2>{agri.length + elev.length}</h2>
          <p>Produits disponibles</p>
        </div>

      </section>


      <SearchBar onSearch={setQuery} />


      <section style={styles.section}>

        <div style={styles.sectionHeader}>

          <h2>🌱 Produits Agricoles</h2>

          <Link to="/agriculture" style={styles.link}>
            Voir tout →
          </Link>

        </div>

        <p style={styles.subtitle}>
          Fruits, légumes, céréales, tubercules et autres produits agricoles.
        </p>


        <div className="card-grid">

          {filterProducts(agri)
            .slice(0, 8)
            .map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}

        </div>

      </section>



      <section style={styles.section}>

        <div style={styles.sectionHeader}>

          <h2>🐄 Produits d'Élevage</h2>

          <Link to="/elevage" style={styles.link}>
            Voir tout →
          </Link>

        </div>


        <p style={styles.subtitle}>
          Bovins, volailles, œufs, lait et produits dérivés.
        </p>


        <div className="card-grid">

          {filterProducts(elev)
            .slice(0, 8)
            .map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}

        </div>

      </section>



      <section style={styles.howItWorks}>

        <h2 style={styles.centerTitle}>
          🚀 Comment fonctionne AgriConnect ?
        </h2>


        <div style={styles.steps}>

          <div style={styles.step}>
            <h3>1️⃣ Explorer</h3>
            <p>
              Parcourez librement tous les produits disponibles.
            </p>
          </div>


          <div style={styles.step}>
            <h3>2️⃣ Comparer</h3>
            <p>
              Consultez les prix et les détails des annonces.
            </p>
          </div>


          <div style={styles.step}>
            <h3>3️⃣ Contacter</h3>
            <p>
              Connectez-vous uniquement lorsque vous souhaitez joindre un vendeur.
            </p>
          </div>

        </div>

      </section>



      <section style={styles.cta}>

        <h2>
          Vous êtes producteur ?
        </h2>

        <p>
          Créez votre compte et commencez à vendre vos produits dès aujourd'hui.
        </p>


        <Link to="/inscription" style={styles.ctaBtn}>
          Créer un compte gratuitement
        </Link>

      </section>


    </div>
  );
}



const styles = {

  hero: {
    background:
      "linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.55)), url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "520px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    textAlign: "center",
    padding: "40px 20px",
  },


  overlay: {
    maxWidth: "900px",
  },


  heroTitle: {
    fontSize: "52px",
    marginBottom: "20px",
    fontWeight: "bold",
  },


  heroText: {
    fontSize: "22px",
    marginBottom: "10px",
  },


  heroText2: {
    fontSize: "18px",
    opacity: 0.9,
    marginBottom: "30px",
  },


  heroButtons: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    flexWrap: "wrap",
  },


  greenBtn: {
    background: "#2D6A4F",
    color: "#fff",
    padding: "14px 28px",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: "bold",
  },


  yellowBtn: {
    background: "#E9C46A",
    color: "#1D3557",
    padding: "14px 28px",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: "bold",
  },


  stats: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
    padding: "40px 20px",
  },


  statCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    minWidth: "200px",
    textAlign: "center",
    boxShadow: "0 2px 10px rgba(0,0,0,.1)",
  },


  section: {
    padding: "20px",
  },


  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },


  subtitle: {
    color: "#666",
    marginBottom: "20px",
  },


  link: {
    color: "#2D6A4F",
    textDecoration: "none",
    fontWeight: "bold",
  },


  howItWorks: {
    background: "#F8F9FA",
    padding: "60px 20px",
    marginTop: "30px",
  },


  centerTitle: {
    textAlign: "center",
    marginBottom: "40px",
  },


  steps: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    flexWrap: "wrap",
  },


  step: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    width: "280px",
    textAlign: "center",
    boxShadow: "0 2px 10px rgba(0,0,0,.08)",
  },


  cta: {
    background: "#2D6A4F",
    color: "#fff",
    textAlign: "center",
    padding: "60px 20px",
    marginTop: "40px",
  },


  ctaBtn: {
    display: "inline-block",
    marginTop: "20px",
    background: "#fff",
    color: "#2D6A4F",
    padding: "14px 30px",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: "bold",
  },

};