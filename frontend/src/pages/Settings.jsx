import { useState, useEffect } from "react";
import { useAuth }  from "../context/AuthContext";
import api from "../services/api";

export default function Settings() {
  const { user, updateUser } = useAuth();
  const [tab,     setTab]     = useState("profil");
  const [profile, setProfile] = useState({ nom:"", telephone:"", email:"" });
  const [pwd,     setPwd]     = useState({ oldPassword:"", newPassword:"", confirm:"" });
  const [imageFile,setImageFile] = useState(null);
  const [imageUrl, setImageUrl]  = useState("");
  const [theme,   setTheme]   = useState(localStorage.getItem("theme") || "clair");
  const [langue,  setLangue]  = useState(localStorage.getItem("langue") || "fr");
  const [notif,   setNotif]   = useState(localStorage.getItem("notif") !== "false");
  const [msg,     setMsg]     = useState("");
  const [error,   setError]   = useState("");

  useEffect(() => {
    api.get("/users/profile").then(r => {
      const d = r.data.data;
      setProfile({ nom: d.nom, telephone: d.telephone || "", email: d.email });
    });
  }, []);

  const flash = (m, isErr=false) => {
    isErr ? setError(m) : setMsg(m);
    setTimeout(() => { setMsg(""); setError(""); }, 3000);
  };

  // ── Sauvegarde profil ──────────────────────────────────────
  const saveProfile = async () => {
    const form = new FormData();
    form.append("nom",       profile.nom);
    form.append("telephone", profile.telephone);
    if (imageFile) form.append("photo", imageFile);
    else if (imageUrl) form.append("photo", imageUrl);
    try {
      const res = await api.put("/users/profile", form, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      // ✅ Met à jour le contexte avec le nom ET la photo
      updateUser({
        nom:   profile.nom,
        photo: res.data.photo || user.photo
      });
      flash("Profil mis à jour !");
    } catch(e) { flash(e.response?.data?.message || "Erreur.", true); }
  };

  // ── Changement mot de passe ────────────────────────────────
  const savePassword = async () => {
    if (pwd.newPassword !== pwd.confirm) return flash("Les mots de passe ne correspondent pas.", true);
    try {
      await api.put("/users/change-password", { oldPassword: pwd.oldPassword, newPassword: pwd.newPassword });
      flash("Mot de passe changé !");
      setPwd({ oldPassword:"", newPassword:"", confirm:"" });
    } catch(e) { flash(e.response?.data?.message || "Erreur.", true); }
  };

  // ── Thème ──────────────────────────────────────────────────
  const saveTheme = (t) => {
    setTheme(t);
    localStorage.setItem("theme", t);
    document.body.style.background = t === "sombre" ? "#1a1a2e" : "#F4F9F4";
    document.body.style.color      = t === "sombre" ? "#eee"    : "#1A1A1A";
    flash("Thème appliqué !");
  };

  // ── Langue ─────────────────────────────────────────────────
  const saveLangue = (l) => {
    setLangue(l);
    localStorage.setItem("langue", l);
    flash("Langue sauvegardée (actualiser pour appliquer).");
  };

  // ── Notifications ──────────────────────────────────────────
  const toggleNotif = () => {
    const next = !notif;
    setNotif(next);
    localStorage.setItem("notif", next.toString());
    flash(next ? "Notifications activées." : "Notifications désactivées.");
  };

  const tabs = [
    { key:"profil",        label:"👤 Profil"       },
    { key:"securite",      label:"🔒 Sécurité"      },
    { key:"apparence",     label:"🎨 Apparence"     },
    { key:"notifications", label:"🔔 Notifications" },
    { key:"langue",        label:"🌍 Langue"        },
    { key:"compte",        label:"⚠️ Compte"         },
  ];

  return (
    <div style={{ maxWidth:860, margin:"30px auto", padding:"0 16px" }}>
      <h1 className="page-title">⚙️ Paramètres</h1>

      {/* Tabs */}
      <div style={styles.tabBar}>
        {tabs.map(t => (
          <button key={t.key}
            style={{...styles.tabBtn, ...(tab===t.key ? styles.tabActive : {})}}
            onClick={() => setTab(t.key)}>
            {t.label}
          </button>
        ))}
      </div>

      {msg   && <div style={styles.success}>{msg}</div>}
      {error && <div style={styles.errorBox}>{error}</div>}

      <div style={styles.panel}>

        {/* PROFIL */}
        {tab === "profil" && (
          <div>
            <h2 style={styles.panelTitle}>Modifier mon profil</h2>

            {/* Aperçu photo actuelle */}
            <div style={{ textAlign:"center", marginBottom:16 }}>
              {user?.photo ? (
                <img
                  src={`http://localhost:5000${user.photo}`}
                  alt="Photo de profil"
                  style={{ width:90, height:90, borderRadius:"50%", objectFit:"cover", border:"3px solid #2D6A4F" }}
                />
              ) : (
                <div style={{ width:90, height:90, borderRadius:"50%", background:"#2D6A4F", color:"#fff",
                  display:"flex", alignItems:"center", justifyContent:"center", fontSize:36, fontWeight:"bold", margin:"0 auto" }}>
                  {user?.nom?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            <label style={styles.label}>Nom complet</label>
            <input style={styles.input} value={profile.nom}
              onChange={e => setProfile({...profile, nom:e.target.value})} />

            <label style={styles.label}>Téléphone</label>
            <input style={styles.input} value={profile.telephone}
              onChange={e => setProfile({...profile, telephone:e.target.value})}
              placeholder="+237600000000" />

            <label style={styles.label}>Email (non modifiable)</label>
            <input style={{...styles.input, background:"#f0f0f0"}} value={profile.email} disabled />

            <label style={styles.label}>Photo de profil — depuis la galerie</label>
            <input type="file" accept="image/*" style={styles.input}
              onChange={e => setImageFile(e.target.files[0])} />

            <label style={styles.label}>Photo de profil — depuis un lien URL</label>
            <input style={styles.input} placeholder="https://..." value={imageUrl}
              onChange={e => setImageUrl(e.target.value)} />

            <button style={styles.btn} onClick={saveProfile}>Sauvegarder le profil</button>
          </div>
        )}

        {/* SÉCURITÉ */}
        {tab === "securite" && (
          <div>
            <h2 style={styles.panelTitle}>Changer le mot de passe</h2>
            <label style={styles.label}>Ancien mot de passe</label>
            <input style={styles.input} type="password" value={pwd.oldPassword}
              onChange={e => setPwd({...pwd, oldPassword:e.target.value})} />
            <label style={styles.label}>Nouveau mot de passe</label>
            <input style={styles.input} type="password" value={pwd.newPassword}
              onChange={e => setPwd({...pwd, newPassword:e.target.value})} />
            <label style={styles.label}>Confirmer le nouveau mot de passe</label>
            <input style={styles.input} type="password" value={pwd.confirm}
              onChange={e => setPwd({...pwd, confirm:e.target.value})} />
            <button style={styles.btn} onClick={savePassword}>Changer le mot de passe</button>
          </div>
        )}

        {/* APPARENCE */}
        {tab === "apparence" && (
          <div>
            <h2 style={styles.panelTitle}>Thème de l'interface</h2>
            <p style={styles.desc}>Choisissez l'apparence qui vous convient.</p>
            <div style={styles.themeRow}>
              {["clair","sombre"].map(t => (
                <div key={t}
                  style={{...styles.themeCard, border: theme===t ? "3px solid #2D6A4F" : "3px solid #eee"}}
                  onClick={() => saveTheme(t)}>
                  <div style={{ fontSize:32 }}>{t==="clair" ? "☀️" : "🌙"}</div>
                  <span style={{ fontWeight:"bold", textTransform:"capitalize" }}>{t}</span>
                  {theme===t && <span style={{ color:"#2D6A4F", fontSize:12 }}>✓ Actif</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* NOTIFICATIONS */}
        {tab === "notifications" && (
          <div>
            <h2 style={styles.panelTitle}>Gestion des notifications</h2>
            <div style={styles.toggleRow}>
              <div>
                <strong>Notifications générales</strong>
                <p style={styles.desc}>Recevoir des alertes sur les nouveaux produits et messages.</p>
              </div>
              <div style={{...styles.toggle, background: notif ? "#2D6A4F" : "#ccc"}}
                onClick={toggleNotif}>
                <div style={{...styles.toggleDot, transform: notif ? "translateX(22px)" : "translateX(2px)"}} />
              </div>
            </div>
            <div style={styles.toggleRow}>
              <div>
                <strong>Emails de connexion</strong>
                <p style={styles.desc}>Recevoir un email à chaque connexion à votre compte.</p>
              </div>
              <div style={{...styles.toggle, background:"#ccc"}}>
                <div style={{...styles.toggleDot, transform:"translateX(2px)"}} />
              </div>
            </div>
          </div>
        )}

        {/* LANGUE */}
        {tab === "langue" && (
          <div>
            <h2 style={styles.panelTitle}>Langue de l'interface</h2>
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {[["fr","🇫🇷 Français"],["en","🇬🇧 English"],["ar","🇸🇦 العربية"]].map(([code,label]) => (
                <div key={code}
                  style={{...styles.langCard, border: langue===code ? "2px solid #2D6A4F" : "2px solid #eee"}}
                  onClick={() => saveLangue(code)}>
                  <span>{label}</span>
                  {langue===code && <span style={{ color:"#2D6A4F", fontWeight:"bold" }}>✓</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* COMPTE */}
        {tab === "compte" && (
          <div>
            <h2 style={{...styles.panelTitle, color:"#C0392B"}}>Zone dangereuse</h2>
            <div style={styles.dangerBox}>
              <h3 style={{ color:"#C0392B", marginBottom:8 }}>⚠️ Supprimer mon compte</h3>
              <p style={styles.desc}>Cette action est irréversible. Toutes vos données et produits seront supprimés définitivement.</p>
              <button style={styles.dangerBtn}
                onClick={() => { if(window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ?")) flash("Fonctionnalité disponible bientôt."); }}>
                Supprimer mon compte
              </button>
            </div>
            <div style={{...styles.dangerBox, marginTop:16}}>
              <h3 style={{ color:"#E9A820", marginBottom:8 }}>📤 Exporter mes données</h3>
              <p style={styles.desc}>Télécharger une copie de toutes vos données personnelles.</p>
              <button style={{...styles.dangerBtn, background:"#E9A820"}}
                onClick={() => flash("Export en cours de développement.")}>
                Exporter mes données
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

const styles = {
  tabBar:     { display:"flex", flexWrap:"wrap", gap:8, marginBottom:24 },
  tabBtn:     { padding:"8px 16px", borderRadius:8, border:"1px solid #ddd", background:"#fff", cursor:"pointer", fontSize:14 },
  tabActive:  { background:"#2D6A4F", color:"#fff", border:"1px solid #2D6A4F", fontWeight:"bold" },
  panel:      { background:"#fff", borderRadius:14, padding:28, boxShadow:"0 2px 12px rgba(0,0,0,.08)" },
  panelTitle: { fontSize:20, fontWeight:"bold", color:"#1D3557", marginBottom:20 },
  label:      { display:"block", fontSize:13, color:"#555", marginBottom:4, marginTop:12 },
  input:      { width:"100%", padding:"11px 14px", borderRadius:8, border:"1px solid #ccc", fontSize:14, display:"block" },
  btn:        { marginTop:20, padding:"12px 28px", background:"#2D6A4F", color:"#fff", border:"none", borderRadius:8, fontSize:15, fontWeight:"bold", cursor:"pointer" },
  success:    { background:"#D8F3DC", color:"#2D6A4F", padding:"10px 16px", borderRadius:8, marginBottom:16, textAlign:"center" },
  errorBox:   { background:"#FADBD8", color:"#C0392B", padding:"10px 16px", borderRadius:8, marginBottom:16, textAlign:"center" },
  desc:       { color:"#888", fontSize:13, marginTop:4 },
  themeRow:   { display:"flex", gap:20, marginTop:16 },
  themeCard:  { flex:1, background:"#F4F9F4", borderRadius:12, padding:24, textAlign:"center", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:8 },
  toggleRow:  { display:"flex", justifyContent:"space-between", alignItems:"center", padding:"16px 0", borderBottom:"1px solid #eee" },
  toggle:     { width:48, height:26, borderRadius:13, cursor:"pointer", position:"relative", transition:"background .3s" },
  toggleDot:  { position:"absolute", top:3, width:20, height:20, background:"#fff", borderRadius:"50%", transition:"transform .3s" },
  langCard:   { padding:"14px 20px", borderRadius:10, cursor:"pointer", display:"flex", justifyContent:"space-between", background:"#F4F9F4" },
  dangerBox:  { background:"#FFF5F5", borderRadius:10, padding:20, border:"1px solid #FADBD8" },
  dangerBtn:  { marginTop:12, padding:"10px 20px", background:"#C0392B", color:"#fff", border:"none", borderRadius:8, fontWeight:"bold", cursor:"pointer" },
};