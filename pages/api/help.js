import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { question } = req.body;
  if (!question) {
    return res.status(400).json({ error: 'Question is required' });
  }

  try {
    // Fake AI logic for now — we upgrade later
    let answer = "Thank you for your message. I will forward this to the admin.";

    // If the question includes something serious, mark as admin task
    if (answer.includes('ADMIN_REQUIRED')) {
      await supabase.from('admin_tasks').insert([
        {
          type: 'SUPPORT',
          payload: { question },
          ai_rationale: answer,
          confidence: 0.8
        }
      ]);
    }

    return res.status(200).json({ answer });
  } catch (err) {
    return res.status(500).json({ error: 'Server error', details: err.message });
  }
}
