import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const imgSrc = product.image
    ? `http://localhost:5000${product.image}`
    : "https://via.placeholder.com/300x200?text=Pas+d%27image";


  const whatsappMessage = encodeURIComponent(
    `Bonjour ${product.vendeur},

Je suis intéressé par votre produit :

📦 Produit : ${product.titre}
💰 Prix : ${Number(product.prix).toLocaleString()} FCFA / ${product.unite}

J'ai trouvé cette annonce sur AgriConnect et je souhaiterais avoir plus d'informations.

Merci.`
  );


  const whatsappLink = `https://wa.me/${product.telephone?.replace(
    /\D/g,
    ""
  )}?text=${whatsappMessage}`;


  const requireLogin = (e) => {
    e.stopPropagation();

    if (!user) {
      alert(
        "Vous devez vous connecter ou créer un compte pour contacter un vendeur."
      );

      navigate("/connexion");
      return false;
    }

    return true;
  };


  const handleCall = (e) => {
    if (!requireLogin(e)) return;

    window.location.href = `tel:${product.telephone}`;
  };


  const handleWhatsApp = (e) => {
    if (!requireLogin(e)) return;

    window.open(whatsappLink, "_blank");
  };


  return (
    <div
      style={styles.card}
      onClick={() => navigate(`/produit/${product.id}`)}
    >

      <img
        src={imgSrc}
        alt={product.titre}
        style={styles.img}
      />


      <div style={styles.body}>

        <h3 style={styles.titre}>
          {product.titre}
        </h3>


        <p style={styles.vendeur}>
          👤 {product.vendeur}
        </p>


        <p style={styles.prix}>
          {Number(product.prix).toLocaleString()} FCFA / {product.unite}
        </p>


        <p style={styles.stock}>
          📦 Stock : {product.quantite}
        </p>


        <div style={styles.btns}>

          <button
            onClick={handleCall}
            style={{
              ...styles.btn,
              background: "#2D6A4F",
            }}
          >
            📞 Appeler
          </button>


          <button
            onClick={handleWhatsApp}
            style={{
              ...styles.btn,
              background: "#25D366",
            }}
          >
            💬 WhatsApp
          </button>


        </div>

      </div>

    </div>
  );
}



const styles = {

  card: {
    background: "#fff",
    borderRadius: 12,
    boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
    overflow: "hidden",
    cursor: "pointer",
    transition: "transform .2s",
    width: 280,
  },


  img: {
    width: "100%",
    height: 180,
    objectFit: "cover",
  },


  body: {
    padding: 14,
  },


  titre: {
    margin: "0 0 6px",
    fontSize: 16,
    color: "#1D3557",
    fontWeight: "bold",
  },


  vendeur: {
    margin: "0 0 4px",
    fontSize: 13,
    color: "#555",
  },


  prix: {
    margin: "0 0 4px",
    fontSize: 15,
    color: "#2D6A4F",
    fontWeight: "bold",
  },


  stock: {
    margin: "0 0 10px",
    fontSize: 12,
    color: "#888",
  },


  btns: {
    display: "flex",
    gap: 8,
  },


  btn: {
    flex: 1,
    textAlign: "center",
    padding: "8px 0",
    borderRadius: 6,
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: "bold",
  },

};