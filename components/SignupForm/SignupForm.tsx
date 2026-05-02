'use client'

import { useState } from 'react'
import Link from 'next/link'
import Input from '@/components/Input'
import PasswordInput from '@/components/PasswordInput'
import Button from '@/components/Button'
import styles from './SignupForm.module.css'

export default function SignupForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    console.log({ email, password })
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
        <Button type="submit">Sign Up</Button>
      </form>
      <p className={styles.switchLink}>
        Already have an account? <Link href="/login">Log in</Link>
      </p>
    </div>
  )
}
