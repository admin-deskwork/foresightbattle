import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/router'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async () => {
    setError('')
    const { error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: 'https://foresightbattle.vercel.app/predict'
      }
    })

    if (error) {
      setError(error.message)
    } else {
      setSent(true)
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>Login</h2>

      {sent ? (
        <p>Check your email for the login link.</p>
      ) : (
        <>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: 10, width: '300px', marginBottom: 10 }}
          />
          <br />

          <button onClick={handleLogin} style={{ padding: '10px 20px' }}>
            Send Login Link
          </button>

          {error && <p style={{ color: 'red' }}>{error}</p>}
        </>
      )}
    </div>
  )
}
