export default function Loader() {
  return (
    <div style={{ textAlign:"center", padding:40 }}>
      <div style={styles.spinner} />
      <p style={{ color:"#2D6A4F", marginTop:12 }}>Chargement...</p>
    </div>
  );
}

const styles = {
  spinner: {
    width:48, height:48, border:"5px solid #D8F3DC",
    borderTop:"5px solid #2D6A4F", borderRadius:"50%",
    animation:"spin 0.8s linear infinite", margin:"0 auto",
  }
};