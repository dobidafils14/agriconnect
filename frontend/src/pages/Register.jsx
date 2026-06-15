import { useState } from "react";
import { register } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nom: "",
    email: "",
    password: "",
    role: "acheteur",
    telephone: ""
  });

  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const handle = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    setError("");

    try {
      const res = await register(form);
      setMsg(res.data.message);
      setTimeout(() => navigate("/"), 1500);
    } catch (e) {
      setError(e.response?.data?.message || "Erreur.");
    }
  };

  return (
    <div style={styles.bg}>
      <div style={styles.card}>
        <h1 style={styles.logo}>🌾 AgriConnect</h1>

        <h2 style={styles.title}>Créer un compte</h2>

        <input
          style={styles.input}
          name="nom"
          placeholder="Votre nom complet"
          value={form.nom}
          onChange={handle}
        />

        <input
          style={styles.input}
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handle}
        />

        <input
          style={styles.input}
          name="password"
          type="password"
          placeholder="Mot de passe"
          value={form.password}
          onChange={handle}
        />

        <input
          style={styles.input}
          name="telephone"
          placeholder="Téléphone (ex: +237600000000)"
          value={form.telephone}
          onChange={handle}
        />

        <select
          style={styles.input}
          name="role"
          value={form.role}
          onChange={handle}
        >
          <option value="acheteur">Acheteur</option>
          <option value="producteur">Producteur</option>
        </select>

        {error && <p style={styles.error}>{error}</p>}
        {msg && <p style={styles.success}>{msg}</p>}

        <button style={styles.btn} onClick={submit}>
          Créer mon compte
        </button>

        <Link to="/" style={styles.lnk}>
          ← Déjà un compte ? Se connecter
        </Link>
      </div>
    </div>
  );
}

const styles = {
  bg: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg,#2D6A4F,#52B788)"
  },

  card: {
    background: "#fff",
    borderRadius: 16,
    padding: "40px 36px",
    width: 400,
    boxShadow: "0 8px 32px rgba(0,0,0,0.15)"
  },

  logo: {
    textAlign: "center",
    fontSize: 26,
    color: "#2D6A4F",
    marginBottom: 4
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1D3557",
    marginBottom: 20,
    textAlign: "center"
  },

  input: {
    width: "100%",
    padding: "11px 14px",
    margin: "0 0 12px",
    borderRadius: 8,
    border: "1px solid #ccc",
    fontSize: 14,
    display: "block"
  },

  btn: {
    width: "100%",
    padding: "12px",
    background: "#2D6A4F",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontSize: 15,
    fontWeight: "bold",
    cursor: "pointer",
    marginBottom: 14
  },

  lnk: {
    display: "block",
    textAlign: "center",
    color: "#2D6A4F",
    fontSize: 13
  },

  error: {
    color: "#C0392B",
    fontSize: 13,
    marginBottom: 10,
    textAlign: "center"
  },

  success: {
    color: "#2D6A4F",
    fontSize: 13,
    marginBottom: 10,
    textAlign: "center"
  }
};