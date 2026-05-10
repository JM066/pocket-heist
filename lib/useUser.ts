import { useContext } from 'react'
import { UserContext } from '@/lib/UserProvider'

export function useUser() {
  const value = useContext(UserContext)
  if (value === 'unset') {
    throw new Error('useUser must be used within a UserProvider')
  }
  return value
}
