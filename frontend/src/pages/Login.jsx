import { useState } from "react";
import { useAuth }  from "../context/AuthContext";
import { login, resetPass } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { loginCtx } = useAuth();
  const navigate = useNavigate();
  const [mode,  setMode]  = useState("login"); // login | reset
  const [form,  setForm]  = useState({ email:"", password:"", newPassword:"" });
  const [msg,   setMsg]   = useState("");
  const [error, setError] = useState("");

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    setError(""); setMsg("");
    try {
      if (mode === "login") {
        const res = await login({ email: form.email, password: form.password });
        loginCtx(res.data.user, res.data.token);
        navigate("/");
      } else {
        const res = await resetPass({ email: form.email, newPassword: form.newPassword });
        setMsg(res.data.message);
        setMode("login");
      }
    } catch(e) {
      setError(e.response?.data?.message || "Erreur réseau.");
    }
  };

  return (
    <div style={styles.bg}>
      <div style={styles.card}>
        <h1 style={styles.logo}>🌾 AgriConnect</h1>
        <p style={styles.sub}>Plateforme agricole de mise en relation</p>

        {mode === "login" ? (
          <>
            <h2 style={styles.title}>Connexion</h2>
            <input style={styles.input} name="email"    type="email"    placeholder="Votre email"       value={form.email}    onChange={handle} />
            <input style={styles.input} name="password" type="password" placeholder="Votre mot de passe" value={form.password} onChange={handle} />
            {error && <p style={styles.error}>{error}</p>}
            {msg   && <p style={styles.success}>{msg}</p>}
            <button style={styles.btn} onClick={submit}>Se connecter</button>
            <div style={styles.links}>
              <Link to="/inscription" style={styles.lnk}>Créer un compte</Link>
              <button style={styles.ghost} onClick={() => setMode("reset")}>Mot de passe oublié ?</button>
            </div>
          </>
        ) : (
          <>
            <h2 style={styles.title}>Réinitialiser le mot de passe</h2>
            <input style={styles.input} name="email"       type="email"    placeholder="Votre email"          value={form.email}       onChange={handle} />
            <input style={styles.input} name="newPassword" type="password" placeholder="Nouveau mot de passe" value={form.newPassword}  onChange={handle} />
            {error && <p style={styles.error}>{error}</p>}
            {msg   && <p style={styles.success}>{msg}</p>}
            <button style={styles.btn} onClick={submit}>Réinitialiser</button>
            <button style={styles.ghost} onClick={() => setMode("login")}>← Retour à la connexion</button>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  bg:      { minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"linear-gradient(135deg,#2D6A4F,#52B788)" },
  card:    { background:"#fff", borderRadius:16, padding:"40px 36px", width:380, boxShadow:"0 8px 32px rgba(0,0,0,0.15)" },
  logo:    { textAlign:"center", fontSize:28, color:"#2D6A4F", marginBottom:4 },
  sub:     { textAlign:"center", fontSize:13, color:"#888", marginBottom:24 },
  title:   { fontSize:20, fontWeight:"bold", color:"#1D3557", marginBottom:20, textAlign:"center" },
  input:   { width:"100%", padding:"11px 14px", margin:"0 0 12px", borderRadius:8, border:"1px solid #ccc", fontSize:14, display:"block" },
  btn:     { width:"100%", padding:"12px", background:"#2D6A4F", color:"#fff", border:"none", borderRadius:8, fontSize:15, fontWeight:"bold", cursor:"pointer", marginBottom:14 },
  ghost:   { background:"none", border:"none", color:"#2D6A4F", cursor:"pointer", fontSize:13, textDecoration:"underline", display:"block", margin:"4px auto" },
  links:   { display:"flex", justifyContent:"space-between", alignItems:"center" },
  lnk:     { color:"#2D6A4F", fontSize:13, textDecoration:"underline" },
  error:   { color:"#C0392B", fontSize:13, marginBottom:10, textAlign:"center" },
  success: { color:"#2D6A4F", fontSize:13, marginBottom:10, textAlign:"center" },
};