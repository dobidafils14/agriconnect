export default function About() {
  return (
    <div style={{ maxWidth:800, margin:"40px auto", padding:"0 16px" }}>
      <div style={styles.hero}>
        <h1 style={styles.title}>🌾 À propos d'AgriConnect</h1>
        <p style={styles.sub}>La plateforme qui rapproche le champ de l'assiette</p>
      </div>
      {[
        { icon:"🎯", title:"Notre mission", text:"AgriConnect a été créée pour éliminer les intermédiaires entre les producteurs agricoles et les acheteurs. Nous croyons en un commerce direct, transparent et équitable qui profite à la fois aux agriculteurs, aux éleveurs et aux consommateurs." },
        { icon:"🤝", title:"Comment ça marche ?", text:"Les agriculteurs et éleveurs publient leurs produits en quelques clics. Les acheteurs (particuliers, restaurateurs, grossistes) les trouvent facilement grâce à notre catalogue organisé, les contactent directement par téléphone ou WhatsApp, et passent commande." },
        { icon:"💡", title:"Nos valeurs", text:"Transparence, équité, soutien à l'agriculture locale et durable. Chaque produit publié sur AgriConnect est lié à un producteur réel que vous pouvez contacter directement." },
        { icon:"📞", title:"Nous contacter", text:"Pour toute question ou partenariat, écrivez-nous à : contact@agriconnect.cm — ou appelez le +237 600 000 000." },
      ].map((s,i) => (
        <div key={i} style={styles.card}>
          <h2 style={styles.cardTitle}>{s.icon} {s.title}</h2>
          <p style={styles.cardText}>{s.text}</p>
        </div>
      ))}
    </div>
  );
}

const styles = {
  hero:     { background:"linear-gradient(135deg,#2D6A4F,#52B788)", borderRadius:14, padding:"40px 24px", textAlign:"center", marginBottom:24, color:"#fff" },
  title:    { fontSize:30, fontWeight:"bold", marginBottom:10 },
  sub:      { fontSize:16, opacity:.9 },
  card:     { background:"#fff", borderRadius:12, padding:24, marginBottom:16, boxShadow:"0 2px 10px rgba(0,0,0,.07)" },
  cardTitle:{ fontSize:20, fontWeight:"bold", color:"#1D3557", marginBottom:10 },
  cardText: { color:"#555", lineHeight:1.8, fontSize:15 },
};