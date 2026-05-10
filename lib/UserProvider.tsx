'use client'

import { createContext, useEffect, useState } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '@/lib/firebase'

type UserContextValue = User | null | undefined

export const UserContext = createContext<UserContextValue | 'unset'>('unset')

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserContextValue>(undefined)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser)
    return unsubscribe
  }, [])

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}
