import Navbar from '../components/Navbar'
import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'


export default function Login(){
const [email,setEmail]=useState('')
const [msg,setMsg]=useState('')
async function send(e){
e.preventDefault()
const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: process.env.NEXT_PUBLIC_APP_URL + '/login' } })
if(error) setMsg(error.message)
else setMsg('Check your email for the login link')
}
return (
<div style={{minHeight:'100vh',background:'#030511',color:'#e6eef8'}}>
<Navbar />
<div style={{padding:40,maxWidth:600,margin:'0 auto'}}>
<h2>Login</h2>
<form onSubmit={send}>
<input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='you@example.com' style={{width:'100%',padding:10,borderRadius:8,border:'1px solid #223'}} />
<div style={{marginTop:12}}>
<button style={{background:'#ff2d55',color:'#fff',padding:10,borderRadius:8}}>Send Magic Link</button>
</div>
</form>
<p style={{marginTop:12}}>{msg}</p>
</div>
</div>
)
}
