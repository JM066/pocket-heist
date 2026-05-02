import { render, screen } from "@testing-library/react"
import Input from "@/components/Input"

describe("Input", () => {
  it("renders the label", () => {
    render(<Input id="email" label="Email" value="" onChange={() => {}} />)
    expect(screen.getByText("Email")).toBeInTheDocument()
  })

  it("associates label with input via id", () => {
    render(<Input id="email" label="Email" value="" onChange={() => {}} />)
    expect(screen.getByLabelText("Email")).toBeInTheDocument()
  })

  it("applies the given type to the input", () => {
    render(<Input id="email" label="Email" type="email" value="" onChange={() => {}} />)
    expect(screen.getByLabelText("Email")).toHaveAttribute("type", "email")
  })
})
