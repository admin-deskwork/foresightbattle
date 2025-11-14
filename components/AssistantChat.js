import { useState } from 'react'


export default function AssistantChat(){
const [q,setQ]=useState('')
const [reply,setReply]=useState('')
const [loading,setLoading]=useState(false)


async function send(e){
e?.preventDefault()
if(!q) return
setLoading(true)
const res = await fetch('/api/help',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({question:q})})
const data = await res.json()
setReply(data.answer)
setLoading(false)
}


return (
<div style={{background:'#071028',padding:16,borderRadius:10,color:'#fff'}}>
<h4>Foresight Assistant</h4>
<form onSubmit={send}>
<textarea value={q} onChange={(e)=>setQ(e.target.value)} rows={4} style={{width:'100%',padding:8}} placeholder='Describe your issue...'></textarea>
<div style={{display:'flex',gap:8,marginTop:8}}>
<button type='submit' disabled={loading} style={{background:'#ff2d55',color:'#fff',padding:'8px 12px',borderRadius:8}}>Ask</button>
</div>
</form>
{reply && <div style={{marginTop:12,background:'#001021',padding:10,borderRadius:8}}>{reply}</div>}
</div>
)
}
