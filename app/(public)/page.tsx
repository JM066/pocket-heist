// this page should be used only as a splash page to decide where a user should be navigated to
// when logged in --> to /heists
// when not logged in --> to /login

import { Clock8 } from "lucide-react";

export default function Home() {
  return (
    <div className="center-content">
      <div className="page-content">
        <h1>
          P
          <Clock8 className="logo" strokeWidth={2.75} />
          cket Heist
        </h1>

        <div>Steal the stapler. Own the office.</div>
        <p style={{ marginTop: "1.5rem" }}>
          Filler text is text that shares some characteristics of a real written
          text, but is random or otherwise generated. It may be used to display
          a sample of fonts, generate text for testing, or to spoof an e-mail
          spam filter.
        </p>
      </div>
    </div>
  );
}
