// Nav, Footer, ContactModal

const { useEffect: useEffectShell, useState: useStateShell } = React;

function Nav({ route, navigate, openContact }) {
  const [scrolled, setScrolled] = useStateShell(false);
  useEffectShell(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
  ["home", "Home"],
  ["services", "Services"],
  ["work", "Work"],
  ["about", "About"]];

  return (
    <header className={`nav${scrolled ? " scrolled" : ""}`}>
      <a href="#home" className="brand" onClick={(e) => {e.preventDefault();navigate("home");}}>
        <span className="glyph" />
        <span>Imprint Engine</span>
      </a>
      <nav className="nav-links">
        {links.map(([k, label]) =>
        <a
          key={k}
          href={`#${k}`}
          className={route === k ? "active" : ""}
          onClick={(e) => {e.preventDefault();navigate(k);}}>
          
            {label}
          </a>
        )}
      </nav>
      <button className="nav-cta" onClick={openContact}>Start a project</button>
    </header>);

}

function CursiveBigmark() {
  const wrapRef = React.useRef(null);
  const wrapRef2 = React.useRef(null);

  React.useEffect(() => {
    const els = [wrapRef.current, wrapRef2.current].filter(Boolean);
    if (!els.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("in");else
        e.target.classList.remove("in");
      });
    }, { threshold: 0.3 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: "0.1em", flexWrap: "nowrap", marginTop: 40, lineHeight: 1.15, overflow: "visible", paddingBottom: "0.2em" }}>
      <div className="bigmark" ref={wrapRef} aria-label="Imprint" style={{ marginTop: 0, width: "auto", padding: "0.18em 0 0.22em" }}>
        <span className="word">Imprint</span>
      </div>
      <div className="bigmark" ref={wrapRef2} aria-label="Engine" style={{ marginTop: 0, width: "auto", padding: "0.18em 0.4em 0.22em 0" }}>
        <span
          className="cursive"
          style={{
            fontFamily: "\"Instrument Serif\", Georgia, serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "1em",
            top: 0,
            letterSpacing: "-0.02em",
            display: "inline-block",
            lineHeight: 1.2,
            paddingBottom: "0.18em",
            paddingRight: "0.15em",
          }}
        >
          Engine
        </span>
      </div>
    </div>);

}

function Footer({ navigate, openContact }) {
  return (
    <footer className="footer">
      <div className="container">
        <CursiveBigmark />
        <div style={{ height: "var(--xl)" }} />
        <div className="footer-grid">
          <div>
            <h4>Studio</h4>
            <p className="body" style={{ maxWidth: "32ch", margin: 0, color: "var(--ink-2)" }}>
              A brand partner for global teams.
              Merch, production, logistics, and platform.
            </p>
            <div style={{ height: 24 }} />
            <button className="link-arrow" onClick={openContact}>
              Start a project <span className="a">→</span>
            </button>
          </div>
          <div>
            <h4>Pages</h4>
            <ul>
              <li><a href="#home" onClick={(e) => {e.preventDefault();navigate("home");}}>Home</a></li>
              <li><a href="#services" onClick={(e) => {e.preventDefault();navigate("services");}}>Services</a></li>
              <li><a href="#work" onClick={(e) => {e.preventDefault();navigate("work");}}>Work</a></li>
              <li><a href="#about" onClick={(e) => {e.preventDefault();navigate("about");}}>About</a></li>
            </ul>
          </div>
          <div>
            <h4>Offices</h4>
            <ul>
              <li>New York</li>
              <li>London</li>
              <li>Singapore</li>
              <li>Mexico City</li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:studio@imprintengine.co">studio@imprintengine.co</a></li>
              <li><a href="mailto:press@imprintengine.co">press@imprintengine.co</a></li>
              <li><a href="mailto:careers@imprintengine.co">careers@imprintengine.co</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Imprint Engine — All rights reserved</span>
          <span>Index / Legal / Privacy</span>
        </div>
      </div>
    </footer>);

}

function ContactModal({ open, onClose }) {
  const [submitted, setSubmitted] = useStateShell(false);
  useEffectShell(() => {
    if (!open) {setSubmitted(false);return;}
    const onKey = (e) => {if (e.key === "Escape") onClose();};
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);
  if (!open) return null;
  const submit = (e) => {e.preventDefault();setSubmitted(true);};
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <aside className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        {!submitted ?
        <>
            <div className="mono" style={{ marginTop: 6 }}>— Contact</div>
            <h2 className="h1" style={{ marginTop: 16, marginBottom: 12 }}>Start a project.</h2>
            <p className="lede" style={{ marginBottom: 32 }}>
              Tell us a little. We respond within one business day.
            </p>
            <form onSubmit={submit}>
              <div className="field">
                <label>Name</label>
                <input type="text" placeholder="First and last" required />
              </div>
              <div className="field">
                <label>Company</label>
                <input type="text" placeholder="Where you work" />
              </div>
              <div className="field">
                <label>Email</label>
                <input type="email" placeholder="you@company.com" required />
              </div>
              <div className="field">
                <label>Scope</label>
                <select defaultValue="">
                  <option value="" disabled>Choose one</option>
                  <option>Merch &amp; production</option>
                  <option>Brand design system</option>
                  <option>Company store / IEX platform</option>
                  <option>Global fulfillment</option>
                  <option>Something else</option>
                </select>
              </div>
              <div className="field">
                <label>Brief</label>
                <textarea placeholder="A few lines is enough." rows={3} />
              </div>
              <div style={{ height: 28 }} />
              <button type="submit" className="btn">Send brief <span className="arrow">→</span></button>
              <div style={{ height: 24 }} />
              <div className="mono" style={{ lineHeight: 1.8 }}>
                Or email <a href="mailto:studio@imprintengine.co" style={{ borderBottom: "1px solid currentColor" }}>studio@imprintengine.co</a>
              </div>
              <div style={{ height: 32 }} />
              <div className="row gap-md" style={{ borderTop: "1px solid var(--rule)", paddingTop: 16 }}>
                <div style={{ flex: 1 }}>
                  <div className="mono">New York</div>
                  <div className="body-sm" style={{ marginTop: 6 }}>120 Broadway, FL 22</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div className="mono">London</div>
                  <div className="body-sm" style={{ marginTop: 6 }}>14 Hanbury Street</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div className="mono">Singapore</div>
                  <div className="body-sm" style={{ marginTop: 6 }}>1 Marina Way</div>
                </div>
              </div>
            </form>
          </> :

        <div style={{ paddingTop: 80 }}>
            <div className="mono">— Received</div>
            <h2 className="h1" style={{ marginTop: 16 }}>Thank you.</h2>
            <p className="lede" style={{ marginTop: 16 }}>
              A producer will reach out within one business day.
            </p>
            <div style={{ height: 36 }} />
            <button className="btn ghost" onClick={onClose}>Close <span className="arrow">→</span></button>
          </div>
        }
      </aside>
    </div>);

}

Object.assign(window, { Nav, Footer, ContactModal });