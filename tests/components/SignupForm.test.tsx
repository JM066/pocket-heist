import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import SignupForm from "@/components/SignupForm"

const mockCreateUser = vi.fn()

vi.mock('@/lib/firebase', () => ({ auth: {} }))
vi.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: (...args: unknown[]) => mockCreateUser(...args),
}))

beforeEach(() => mockCreateUser.mockResolvedValue({}))

describe("SignupForm", () => {
  it("renders the heading", () => {
    render(<SignupForm />)
    expect(screen.getByRole("heading", { name: /sign up for an account/i })).toBeInTheDocument()
  })

  it("renders email and password fields", () => {
    render(<SignupForm />)
    expect(screen.getByLabelText("Email")).toBeInTheDocument()
    expect(screen.getByLabelText("Password")).toBeInTheDocument()
  })

  it("renders the Sign Up submit button", () => {
    render(<SignupForm />)
    expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument()
  })

  it("renders the switch link to /login", () => {
    render(<SignupForm />)
    const link = screen.getByRole("link", { name: /log in/i })
    expect(link).toHaveAttribute("href", "/login")
  })

  it("calls createUserWithEmailAndPassword with email and password on submit", async () => {
    const user = userEvent.setup()
    render(<SignupForm />)
    await user.type(screen.getByLabelText("Email"), "new@example.com")
    await user.type(screen.getByLabelText("Password"), "newpass456")
    await user.click(screen.getByRole("button", { name: /sign up/i }))
    expect(mockCreateUser).toHaveBeenCalledWith({}, "new@example.com", "newpass456")
  })
})
