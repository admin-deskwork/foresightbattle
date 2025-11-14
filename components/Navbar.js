import Link from 'next/link'
export default function Navbar(){
return (
<nav style={nav}>
<div style={brand}>Foresight<span style={{color:'#ff2d55'}}>Battle</span></div>
<div style={links}>
<Link href='/'><a style={a}>Home</a></Link>
<Link href='/predict'><a style={a}>Predict</a></Link>
<Link href='/help'><a style={a}>Help</a></Link>
<Link href='/login'><a style={cta}>Login</a></Link>
</div>
</nav>
)
}


const nav = {display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px 24px',background:'#0b0f1a',color:'#fff'}
const brand = {fontWeight:800,fontSize:20}
const links = {display:'flex',gap:12,alignItems:'center'}
const a = {color:'#cbd5e1',textDecoration:'none'}
const cta = {background:'#ff2d55',color:'#fff',padding:'8px 12px',borderRadius:8,textDecoration:'none'}
