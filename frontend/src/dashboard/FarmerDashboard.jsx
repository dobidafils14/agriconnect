import { useEffect, useState } from "react";
import { getMyProducts, deleteProduct, createProduct } from "../services/productService";
import Loader from "../components/Loader";

export default function FarmerDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [msg, setMsg] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const [form, setForm] = useState({
    titre: "",
    description: "",
    prix: "",
    unite: "kg",
    quantite: "",
    categorie: "agriculture",
    telephone: "",
    imageUrl: ""
  });

  const load = () => {
    setLoading(true);
    getMyProducts()
      .then((r) => setProducts(r.data.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handle = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const submit = async () => {
    const fd = new FormData();

    Object.entries(form).forEach(([k, v]) => {
      fd.append(k, v);
    });

    if (imageFile) {
      fd.append("image", imageFile);
    }

    try {
      await createProduct(fd);

      setMsg("Produit publié avec succès !");
      setShowForm(false);

      setForm({
        titre: "",
        description: "",
        prix: "",
        unite: "kg",
        quantite: "",
        categorie: "agriculture",
        telephone: "",
        imageUrl: ""
      });

      setImageFile(null);

      load();
    } catch (e) {
      setMsg(e.response?.data?.message || "Erreur.");
    }
  };

  const del = async (id) => {
    if (!window.confirm("Supprimer ce produit ?")) return;

    await deleteProduct(id);
    load();
  };

  if (loading) return <Loader />;

  return (
    <div style={{ maxWidth: 960, margin: "30px auto", padding: "0 16px" }}>
      <div style={styles.header}>
        <h1 style={styles.title}>📊 Tableau de bord Producteur</h1>

        <button
          style={styles.addBtn}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "✕ Annuler" : "+ Publier un produit"}
        </button>
      </div>

      {msg && <div style={styles.flash}>{msg}</div>}

      {showForm && (
        <div style={styles.form}>
          <h2 style={styles.formTitle}>Nouveau produit</h2>

          <div style={styles.grid2}>
            <div>
              <label style={styles.label}>Titre *</label>
              <input
                style={styles.input}
                name="titre"
                value={form.titre}
                onChange={handle}
              />
            </div>

            <div>
              <label style={styles.label}>Catégorie *</label>
              <select
                style={styles.input}
                name="categorie"
                value={form.categorie}
                onChange={handle}
              >
                <option value="agriculture">Agriculture</option>
                <option value="elevage">Élevage</option>
              </select>
            </div>

            <div>
              <label style={styles.label}>Prix * (FCFA)</label>
              <input
                style={styles.input}
                name="prix"
                type="number"
                value={form.prix}
                onChange={handle}
              />
            </div>

            <div>
              <label style={styles.label}>Unité</label>
              <select
                style={styles.input}
                name="unite"
                value={form.unite}
                onChange={handle}
              >
                {["kg", "litre", "pièce", "sac", "boîte", "lot"].map((u) => (
                  <option key={u}>{u}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={styles.label}>Quantité disponible</label>
              <input
                style={styles.input}
                name="quantite"
                type="number"
                value={form.quantite}
                onChange={handle}
              />
            </div>

            <div>
              <label style={styles.label}>Téléphone vendeur</label>
              <input
                style={styles.input}
                name="telephone"
                placeholder="+237600000000"
                value={form.telephone}
                onChange={handle}
              />
            </div>
          </div>

          <label style={styles.label}>Description</label>

          <textarea
            style={{ ...styles.input, resize: "vertical" }}
            name="description"
            rows={3}
            value={form.description}
            onChange={handle}
          />

          <label style={styles.label}>📷 Photo (Caméra)</label>
          <input
            type="file"
            accept="image/*"
            capture="environment"
            style={styles.input}
            onChange={(e) => setImageFile(e.target.files[0])}
          />

          <label style={styles.label}>🎥 Vidéo</label>
          <input
            type="file"
            accept="video/*"
            capture="environment"
            style={styles.input}
          />

          <label style={styles.label}>🖼 Galerie</label>
          <input
            type="file"
            accept="image/*"
            style={styles.input}
            onChange={(e) => setImageFile(e.target.files[0])}
          />

          <label style={styles.label}>Image depuis une URL</label>
          <input
            style={styles.input}
            name="imageUrl"
            placeholder="https://..."
            value={form.imageUrl}
            onChange={handle}
          />

          <button style={styles.submitBtn} onClick={submit}>
            Publier le produit
          </button>
        </div>
      )}

      <h2 style={styles.sectionTitle}>
        Mes produits ({products.length})
      </h2>

      {products.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            color: "#888",
            padding: 40
          }}
        >
          Aucun produit publié pour l'instant.
        </p>
      ) : (
        <div style={styles.table}>
          <div style={styles.tableHeader}>
            <span style={{ flex: 3 }}>Produit</span>
            <span style={{ flex: 1 }}>Catégorie</span>
            <span style={{ flex: 1 }}>Prix</span>
            <span style={{ flex: 1 }}>Stock</span>
            <span style={{ flex: 1 }}>Actions</span>
          </div>

          {products.map((p) => (
            <div key={p.id} style={styles.tableRow}>
              <span style={{ flex: 3, fontWeight: "bold" }}>
                {p.titre}
              </span>

              <span style={{ flex: 1 }}>
                {p.categorie === "agriculture" ? "🌱" : "🐄"} {p.categorie}
              </span>

              <span
                style={{
                  flex: 1,
                  color: "#2D6A4F",
                  fontWeight: "bold"
                }}
              >
                {Number(p.prix).toLocaleString()} F
              </span>

              <span style={{ flex: 1 }}>
                {p.quantite} {p.unite}
              </span>

              <span style={{ flex: 1 }}>
                <button
                  style={styles.delBtn}
                  onClick={() => del(p.id)}
                >
                  🗑 Supprimer
                </button>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    flexWrap: "wrap",
    gap: 12
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1D3557"
  },

  addBtn: {
    padding: "10px 20px",
    background: "#2D6A4F",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: 15
  },

  flash: {
    background: "#D8F3DC",
    color: "#2D6A4F",
    padding: "10px 16px",
    borderRadius: 8,
    marginBottom: 16,
    textAlign: "center"
  },

  form: {
    background: "#fff",
    borderRadius: 14,
    padding: 24,
    marginBottom: 28,
    boxShadow: "0 2px 12px rgba(0,0,0,.08)"
  },

  formTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1D3557",
    marginBottom: 16
  },

  grid2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
    marginBottom: 12
  },

  label: {
    display: "block",
    fontSize: 13,
    color: "#555",
    marginBottom: 4,
    marginTop: 8
  },

  input: {
    width: "100%",
    padding: "10px 14px",
    borderRadius: 8,
    border: "1px solid #ccc",
    fontSize: 14
  },

  submitBtn: {
    marginTop: 16,
    padding: "12px 28px",
    background: "#2D6A4F",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: 15
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1D3557",
    marginBottom: 16
  },

  table: {
    background: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    boxShadow: "0 2px 10px rgba(0,0,0,.07)"
  },

  tableHeader: {
    display: "flex",
    background: "#1D3557",
    color: "#fff",
    padding: "12px 16px",
    fontWeight: "bold",
    fontSize: 14
  },

  tableRow: {
    display: "flex",
    padding: "12px 16px",
    borderBottom: "1px solid #f0f0f0",
    alignItems: "center",
    fontSize: 14
  },

  delBtn: {
    background: "#FADBD8",
    color: "#C0392B",
    border: "none",
    padding: "6px 12px",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 13
  }
};