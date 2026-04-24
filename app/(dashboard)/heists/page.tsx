export default function HeistsPage() {
  return (
    <div className="page-content">
      <div className="page-intro">
        <h1>Mission Control</h1>
        <p>Welcome back, agent. Here's the latest intel on your ongoing operations. Stay sharp — every heist has a deadline, and the clock is always ticking.</p>
      </div>
      <div className="active-heists">
        <h2>Your Active Heists</h2>
      </div>
      <div className="assigned-heists">
        <h2>Heists You've Assigned</h2>
      </div>
      <div className="expired-heists">
        <h2>All Expired Heists</h2>
      </div>
    </div>
  )
}