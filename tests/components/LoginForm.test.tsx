import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import LoginForm from "@/components/LoginForm"

describe("LoginForm", () => {
  it("renders the heading", () => {
    render(<LoginForm />)
    expect(screen.getByRole("heading", { name: /log in to your account/i })).toBeInTheDocument()
  })

  it("renders email and password fields", () => {
    render(<LoginForm />)
    expect(screen.getByLabelText("Email")).toBeInTheDocument()
    expect(screen.getByLabelText("Password")).toBeInTheDocument()
  })

  it("renders the Log In submit button", () => {
    render(<LoginForm />)
    expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument()
  })

  it("renders the switch link to /signup", () => {
    render(<LoginForm />)
    const link = screen.getByRole("link", { name: /sign up/i })
    expect(link).toHaveAttribute("href", "/signup")
  })

  it("logs email and password to console on submit", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {})
    const user = userEvent.setup()
    render(<LoginForm />)
    await user.type(screen.getByLabelText("Email"), "test@example.com")
    await user.type(screen.getByLabelText("Password"), "secret123")
    await user.click(screen.getByRole("button", { name: /log in/i }))
    expect(spy).toHaveBeenCalledWith({ email: "test@example.com", password: "secret123" })
    spy.mockRestore()
  })
})
