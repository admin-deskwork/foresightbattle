import { supabase } from '../../lib/supabaseClient'
import OpenAI from 'openai'


const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })


export default async function handler(req,res){
if(req.method !== 'POST') return res.status(405).end()
const { question } = req.body
// keep it safe: short answer and don't include secrets
try{
const prompt = `You are a support assistant for ForesightBattle. Help the user resolve site-related issues. If issue requires admin, say 'ADMIN_REQUIRED'.\nQuestion: ${question}`
const r = await client.responses.create({ model: 'gpt-4o-mini', input: prompt, max_tokens: 300 })
const answer = r.output ? r.output[0].content[0].text : 'Sorry, I could not answer.'
// log ticket
await supabase.from('support_tickets').insert([{ question, ai_response: answer }])
// if answer contains ADMIN_REQUIRED create admin task
if(answer.includes('ADMIN_REQUIRED')){
await supabase.from('admin_tasks').insert([{ type:'SUPPORT', payload:{ question }, ai_rationale: answer, confidence:0.8 }])
}
res.json({ answer
