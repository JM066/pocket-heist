import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import PasswordInput from "@/components/PasswordInput"

describe("PasswordInput", () => {
  it("renders the label", () => {
    render(<PasswordInput id="password" label="Password" value="" onChange={() => {}} />)
    expect(screen.getByText("Password")).toBeInTheDocument()
  })

  it("hides the password by default", () => {
    render(<PasswordInput id="password" label="Password" value="" onChange={() => {}} />)
    expect(screen.getByLabelText("Password")).toHaveAttribute("type", "password")
  })

  it("reveals the password when the toggle is clicked", async () => {
    const user = userEvent.setup()
    render(<PasswordInput id="password" label="Password" value="" onChange={() => {}} />)
    await user.click(screen.getByRole("button", { name: /show password/i }))
    expect(screen.getByLabelText("Password")).toHaveAttribute("type", "text")
  })

  it("hides the password again when toggled twice", async () => {
    const user = userEvent.setup()
    render(<PasswordInput id="password" label="Password" value="" onChange={() => {}} />)
    await user.click(screen.getByRole("button", { name: /show password/i }))
    await user.click(screen.getByRole("button", { name: /hide password/i }))
    expect(screen.getByLabelText("Password")).toHaveAttribute("type", "password")
  })
})
