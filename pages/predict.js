import Navbar from '../components/Navbar'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'


export default function Predict(){
const [text,setText]=useState('')
const [message,setMessage]=useState('')
const [list,setList]=useState([])


useEffect(()=>{fetchList()},[])
async function fetchList(){
const { data } = await supabase.from('predictions').select('*').order('created_at',{ascending:false}).limit(50)
setList(data||[])
}


async function submit(e){
e.preventDefault()
const user = (await supabase.auth.getUser()).data.user
if(!user) return setMessage('Please login')
const { error } = await supabase.from('predictions').insert([{ user_id:user.id, title:text }])
if(error) setMessage(error.message)
else { setMessage('Submitted'); setText(''); fetchList() }
}


return (
<div style={{minHeight:'100vh',background:'#030511',color:'#e6eef8'}}>
<Navbar />
<div style={{padding:30,maxWidth:900,margin:'0 auto'}}>
<h2>Prediction Arena</h2>
<form onSubmit={submit}>
<textarea value={text} onChange={(e)=>setText(e.target.value)} rows={4} style={{width:'100%',padding:12,borderRadius:8}} placeholder='Write your prediction...'></textarea>
<div style={{marginTop:10}}>
<button style={{background:'#ff2d55',padding:'10px 14px',borderRadius:8}}>Submit Prediction</button>
</div>
</form>
<p>{message}</p>
<div style={{marginTop:20}}>
{list.map(p=> (
<div key={p.id} style={{background:'#071028',padding:12,borderRadius:8,marginBottom:10}}>
<div style={{fontWeight:700}}>{p.title}</div>
<div style={{fontSize:12,color:'#9fb0d9'}}>{new Date(p.created_at).toLocaleString()}</div>
</div>
))}
</div>
</div>
</div>
)
}
