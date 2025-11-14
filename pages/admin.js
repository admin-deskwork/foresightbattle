import Navbar from '../components/Navbar'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'


export default function Admin(){
const [user,setUser]=useState(null)
const [tasks,setTasks]=useState([])


useEffect(()=>{ supabase.auth.getUser().then(r=>setUser(r.data.user)); load() },[])
async function load(){ const { data } = await supabase.from('admin_tasks').select('*').order('created_at',{ascending:false}).limit(50); setTasks(data||[]) }


if(!user) return <div style={{padding:30}}>Please login as admin</div>
// NOTE: server-side check to restrict to owner required - implement after deploy
return (
<div style={{minHeight:'100vh',background:'#030511',color:'#e6eef8'}}>
<Navbar />
<div style={{padding:30,maxWidth:1000,margin:'0 auto'}}>
<h2>Admin Dashboard</h2>
<div>
<h3>AI Tasks</h3>
{tasks.map(t=> (
<div key={t.id} style={{background:'#071028',padding:12,borderRadius:8,marginBottom:8}}>
<b>{t.type}</b>
<div style={{color:'#9fb0d9'}}>{t.ai_rationale}</div>
<div>Confidence: {t.confidence}</div>
</div>
))}
</div>
</div>
</div>
)
}
