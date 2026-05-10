import { render, renderHook, act } from '@testing-library/react'
import { User } from 'firebase/auth'
import { UserProvider } from '@/lib/UserProvider'
import { useUser } from '@/lib/useUser'

const mockUnsubscribe = vi.fn()
let authStateCallback: ((user: User | null) => void) | null = null

vi.mock('@/lib/firebase', () => ({
  auth: {},
}))

vi.mock('firebase/auth', () => ({
  onAuthStateChanged: vi.fn((_auth, callback) => {
    authStateCallback = callback
    return mockUnsubscribe
  }),
}))

function wrapper({ children }: { children: React.ReactNode }) {
  return <UserProvider>{children}</UserProvider>
}

beforeEach(() => {
  authStateCallback = null
  mockUnsubscribe.mockClear()
})

describe('useUser', () => {
  it('returns undefined before Firebase resolves', () => {
    const { result } = renderHook(() => useUser(), { wrapper })
    expect(result.current).toBeUndefined()
  })

  it('returns null when signed out', () => {
    const { result } = renderHook(() => useUser(), { wrapper })
    act(() => { authStateCallback!(null) })
    expect(result.current).toBeNull()
  })

  it('returns the user object when signed in', () => {
    const fakeUser = { uid: 'abc123', email: 'test@test.com' } as User
    const { result } = renderHook(() => useUser(), { wrapper })
    act(() => { authStateCallback!(fakeUser) })
    expect(result.current).toBe(fakeUser)
  })

  it('updates when auth state changes', () => {
    const fakeUser = { uid: 'abc123', email: 'test@test.com' } as User
    const { result } = renderHook(() => useUser(), { wrapper })
    act(() => { authStateCallback!(null) })
    expect(result.current).toBeNull()
    act(() => { authStateCallback!(fakeUser) })
    expect(result.current).toBe(fakeUser)
  })

  it('throws if called outside the provider', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => renderHook(() => useUser())).toThrow()
    consoleError.mockRestore()
  })

  it('unsubscribes the listener on unmount', () => {
    const { unmount } = renderHook(() => useUser(), { wrapper })
    unmount()
    expect(mockUnsubscribe).toHaveBeenCalledOnce()
  })
})
