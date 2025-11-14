import Navbar from '../components/Navbar'
export default function Home(){
return (
<div style={{minHeight:'100vh',background:'#030511',color:'#e6eef8'}}>
<Navbar />
<main style={{padding:40,textAlign:'center'}}>
<h1 style={{fontSize:42,letterSpacing:1}}>ForesightBattle</h1>
<p style={{maxWidth:800,margin:'12px auto',color:'#cbd5e1'}}>Compete to predict the future. Submit predictions, earn reputation, and access premium AI insights.</p>
<div style={{marginTop:20}}>
<a href='/predict' style={{background:'#ff2d55',padding:'12px 22px',borderRadius:10,color:'#fff',textDecoration:'none',fontWeight:700}}>Start Predicting</a>
</div>
</main>
</div>
)
}
