// WORK
function WorkPage({ openContact }) {
  const cases = [
    { id: "northwind", client: "Northwind", title: "A reimagined onboarding kit", scope: "Merch, Packaging, Logistics", year: "2025", tone: "warm", ratio: "16 / 10", span: 2, cap: "NORTHWIND — KIT 01" },
    { id: "halcyon",  client: "Halcyon",   title: "Global launch, in 14 cities", scope: "Events, Production", year: "2025", tone: "ink", ratio: "4 / 5", span: 1, cap: "HALCYON — LAUNCH" },
    { id: "meridian", client: "Meridian",  title: "Company store, end-to-end", scope: "IEX Platform, Fulfillment", year: "2024", tone: "stone", ratio: "4 / 5", span: 1, cap: "MERIDIAN — STORE" },
    { id: "volta",    client: "Volta",     title: "A material study in textiles", scope: "Design, Production", year: "2024", tone: "paper", ratio: "16 / 10", span: 2, cap: "VOLTA — TEXTILES" },
    { id: "atlas",    client: "Atlas Foundry", title: "Year-end gifting, 6,400 boxes", scope: "Gifting, Logistics", year: "2024", tone: "warm", ratio: "4 / 5", span: 1, cap: "ATLAS — GIFTING" },
    { id: "coperni",  client: "Coperni Bank", title: "A new identity, applied", scope: "Identity, Merch", year: "2023", tone: "ink", ratio: "4 / 5", span: 1, cap: "COPERNI — IDENTITY" },
  ];

  return (
    <div className="page-enter" data-screen-label="Work">

      <section className="sec-pad-xl" style={{ paddingTop: "calc(var(--xxl) + 40px)" }}>
        <div className="container">
          <Reveal><div className="mono" style={{ marginBottom: 24 }}>— Work / 240+ partnerships</div></Reveal>
          <Reveal delay={1}>
            <h1 className="display">
              Proof of <span className="serif-it">execution.</span>
            </h1>
          </Reveal>
        </div>
      </section>

      <hr className="divider" />

      {/* Case grid */}
      <section className="sec-pad-lg">
        <div className="container-wide">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, gridAutoRows: "minmax(0, auto)" }}>
            {cases.map((c, i) => (
              <Reveal key={c.id} delay={Math.min((i % 3) + 1, 4)}
                style={{ gridColumn: c.span === 2 ? "span 2" : "span 1" }}>
                <CaseCard c={c} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* Selected detailed case study */}
      <section className="sec-pad-xl">
        <div className="container">
          <Reveal><SectionMeta num="01" label="Selected — case study" /></Reveal>
        </div>

        <div style={{ height: "var(--md)" }} />

        <div className="container">
          <Reveal delay={1}>
            <div className="row between" style={{ alignItems: "flex-end", flexWrap: "wrap", gap: 24 }}>
              <h2 className="h1" style={{ maxWidth: "16ch", margin: 0 }}>
                Northwind — onboarding, made permanent.
              </h2>
              <div className="mono">2025 / IE-NW-014</div>
            </div>
          </Reveal>
        </div>

        <div style={{ height: "var(--lg)" }} />

        <div className="container-wide">
          <Reveal>
            <ImagePlaceholder tone="warm" ratio="21 / 9" caption="NORTHWIND — HERO STILL" rightMeta="CS / 01" />
          </Reveal>
        </div>

        <div style={{ height: "var(--lg)" }} />

        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }}>
            <Reveal>
              <div className="mono">— Brief</div>
              <p className="body" style={{ marginTop: 16, fontSize: 18, lineHeight: 1.55, maxWidth: "36ch" }}>
                Replace 14 disconnected vendors with one studio.
                Make every new hire feel chosen on day one.
              </p>
            </Reveal>
            <Reveal delay={1}>
              <div className="mono">— Result</div>
              <p className="body" style={{ marginTop: 16, fontSize: 18, lineHeight: 1.55, maxWidth: "36ch" }}>
                A single onboarding system, shipped to 22 countries.
                86% retention at six months.
              </p>
            </Reveal>
          </div>
        </div>

        <div style={{ height: "var(--lg)" }} />

        <div className="container-wide">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <Reveal><ImagePlaceholder tone="paper" ratio="4 / 5" caption="DETAIL — APPAREL" rightMeta="CS / 02" /></Reveal>
            <Reveal delay={1}><ImagePlaceholder tone="stone" ratio="4 / 5" caption="DETAIL — KIT INTERIOR" rightMeta="CS / 03" /></Reveal>
          </div>
        </div>

        <div style={{ height: "var(--lg)" }} />

        <div className="container">
          <Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderTop: "1px solid var(--rule)" }}>
              {[
                ["22", "Countries"],
                ["6,400", "Kits / quarter"],
                ["86%", "6-mo retention"],
                ["−42%", "Vendor cost"],
              ].map(([n, l], i) => (
                <div key={i} style={{
                  padding: "32px 0",
                  borderRight: i < 3 ? "1px solid var(--rule)" : "0",
                  borderBottom: "1px solid var(--rule)",
                  paddingLeft: i === 0 ? 0 : 24,
                }}>
                  <div style={{ fontSize: "clamp(40px, 5vw, 64px)", fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1 }}>{n}</div>
                  <div className="mono" style={{ marginTop: 12 }}>{l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <hr className="divider" />

      {/* Testimonials */}
      <section className="sec-pad-xl">
        <div className="container">
          <Reveal><SectionMeta num="02" label="What partners say" /></Reveal>
        </div>

        <div style={{ height: "var(--lg)" }} />

        <div className="container">
          <div className="col gap-lg">
            {[
              {
                q: "Imprint Engine quietly replaced a function we used to staff with twelve people. The output is better.",
                n: "Director of Brand",
                c: "Northwind",
              },
              {
                q: "They are the rare partner who understands that restraint is a feature.",
                n: "VP People",
                c: "Halcyon",
              },
              {
                q: "Six countries, one launch, zero issues. The first time we've ever said that.",
                n: "Head of Communications",
                c: "Meridian",
              },
            ].map((t, i) => (
              <Reveal key={i} delay={Math.min(i + 1, 3)}>
                <blockquote style={{
                  margin: 0,
                  padding: "var(--lg) 0",
                  borderTop: "1px solid var(--rule)",
                  display: "grid",
                  gridTemplateColumns: "60px 1fr 200px",
                  gap: 32,
                  alignItems: "start",
                }}>
                  <span className="mono">0{i + 1}</span>
                  <p style={{
                    margin: 0,
                    fontFamily: "var(--serif)",
                    fontSize: "clamp(28px, 3.2vw, 44px)",
                    lineHeight: 1.15,
                    letterSpacing: "-0.015em",
                    fontStyle: "italic",
                    fontWeight: 400,
                    maxWidth: "30ch",
                    textWrap: "balance",
                  }}>
                    “{t.q}”
                  </p>
                  <div className="col" style={{ alignItems: "flex-start", paddingTop: 12 }}>
                    <div className="body-sm" style={{ fontWeight: 500 }}>{t.n}</div>
                    <div className="mono" style={{ marginTop: 6 }}>{t.c}</div>
                  </div>
                </blockquote>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider" />

      <section className="sec-pad-xl">
        <div className="container">
          <Reveal><div className="mono">— Next</div></Reveal>
          <Reveal delay={1}>
            <h2 className="display" style={{ marginTop: 24, maxWidth: "14ch" }}>
              Yours could be <span className="serif-it">next.</span>
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <div style={{ marginTop: 48 }}>
              <Button onClick={openContact}>Start a project</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function CaseCard({ c }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a
      href="#work"
      onClick={(e) => e.preventDefault()}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="col gap-md"
      style={{ display: "flex", textDecoration: "none", color: "inherit" }}
    >
      <div style={{
        transition: "transform 700ms cubic-bezier(.2,.7,0,1)",
        transform: hover ? "translateY(-4px)" : "none",
      }}>
        <ImagePlaceholder tone={c.tone} ratio={c.ratio} caption={c.cap} rightMeta={c.year} />
      </div>
      <div className="row between" style={{ alignItems: "baseline" }}>
        <div className="mono">{c.client} · {c.scope}</div>
        <div className="mono">{c.year}</div>
      </div>
      <h3 style={{
        margin: 0,
        fontSize: "clamp(20px, 1.7vw, 26px)",
        fontWeight: 500,
        letterSpacing: "-0.02em",
        lineHeight: 1.15,
        maxWidth: "26ch",
      }}>{c.title}</h3>
    </a>
  );
}

window.WorkPage = WorkPage;
