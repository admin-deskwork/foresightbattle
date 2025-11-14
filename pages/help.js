import Navbar from '../components/Navbar'
import AssistantChat from '../components/AssistantChat'


export default function Help(){
return (
<div style={{minHeight:'100vh',background:'#030511',color:'#e6eef8'}}>
<Navbar />
<div style={{padding:30,maxWidth:800,margin:'0 auto'}}>
<h2>Help & Support</h2>
<p>If you face problems, ask the Foresight Assistant below. For verified site issues the assistant will create a ticket and notify admin.</p>
<AssistantChat />
</div>
</div>
)
}
