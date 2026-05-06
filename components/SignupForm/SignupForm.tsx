'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import Input from '@/components/Input'
import PasswordInput from '@/components/PasswordInput'
import Button from '@/components/Button'
import styles from './SignupForm.module.css'

export default function SignupForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    try {
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Sign up failed')
    }
  }

  return (
    <div className={styles.formCard}>
      <h1 className="form-title">Sign Up for an Account</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
        <PasswordInput
          id="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />
        {error && <p className={styles.error}>{error}</p>}
        <Button type="submit">Sign Up</Button>
      </form>
      <p className={styles.switchLink}>
        Already have an account? <Link href="/login">Log in</Link>
      </p>
    </div>
  )
}
