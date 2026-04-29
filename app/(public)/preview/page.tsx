// preview page for newly created UI components
import Avatar from "@/components/Avatar"

export default function PreviewPage() {
  return (
    <div className="page-content">
      <h2>Preview</h2>

      <section>
        <h3>Avatar</h3>
        <p>Single-word name (first letter only):</p>
        <Avatar name="alice" />
        <p>PascalCase name (first two uppercase letters):</p>
        <Avatar name="JohnDoe" />
        <Avatar name="MikeSmith" />
      </section>
    </div>
  )
}
