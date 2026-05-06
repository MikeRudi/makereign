// ABOUT
function AboutPage({ openContact }) {
  return (
    <div className="page-enter" data-screen-label="About">

      <section className="sec-pad-xl" style={{ paddingTop: "calc(var(--xxl) + 40px)" }}>
        <div className="container">
          <Reveal><div className="mono" style={{ marginBottom: 24 }}>— About / Founded 2009</div></Reveal>
          <Reveal delay={1}>
            <h1 className="display" style={{ maxWidth: "14ch" }}>
              A studio for the <span className="serif-it">long-form.</span>
            </h1>
          </Reveal>
          <Reveal delay={2}>
            <p className="lede" style={{ marginTop: 48, maxWidth: "40ch" }}>
              We started in a garage with one screen press.
              Today we ship to 62 countries — same studio, same standards.
            </p>
          </Reveal>
        </div>

        <div style={{ height: "var(--xl)" }} />

        <Reveal delay={2}>
          <div className="container-wide">
            <ImagePlaceholder tone="paper" ratio="21 / 9" caption="STUDIO — BROOKLYN, FLOOR 04" rightMeta="ABOUT / 01" />
          </div>
        </Reveal>
      </section>

      <hr className="divider" />

      {/* Evolution */}
      <section className="sec-pad-xl">
        <div className="container">
          <Reveal><SectionMeta num="01" label="Evolution" /></Reveal>
          <Reveal delay={1}>
            <h2 className="h1" style={{ maxWidth: "18ch" }}>
              Seventeen years, six studios, one method.
            </h2>
          </Reveal>
        </div>

        <div style={{ height: "var(--lg)" }} />

        <div className="container">
          <ol style={{ listStyle: "none", margin: 0, padding: 0, borderTop: "1px solid var(--rule)" }}>
            {[
              ["2009", "Founded", "Brooklyn. One press, two founders."],
              ["2013", "Design studio", "First in-house design team."],
              ["2016", "London office", "Crossed the Atlantic."],
              ["2019", "Logistics arm", "Warehousing & global ship."],
              ["2022", "IEX platform", "Self-serve company stores."],
              ["2025", "62 countries", "Same studio, same standards."],
            ].map(([y, t, d], i) => (
              <Reveal key={y} delay={Math.min(i + 1, 4)}>
                <li style={{
                  borderBottom: "1px solid var(--rule)",
                  padding: "28px 0",
                  display: "grid",
                  gridTemplateColumns: "120px 1fr 1fr",
                  gap: 32,
                  alignItems: "baseline",
                }}>
                  <span className="mono" style={{ fontSize: 13, color: "var(--ink)" }}>{y}</span>
                  <h3 style={{
                    margin: 0,
                    fontSize: "clamp(24px, 2.6vw, 36px)",
                    fontWeight: 500,
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}>{t}</h3>
                  <p className="body" style={{ margin: 0, color: "var(--ink-2)", maxWidth: "30ch" }}>{d}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <hr className="divider" />

      {/* Values */}
      <section className="sec-pad-xl">
        <div className="container">
          <Reveal><SectionMeta num="02" label="Values" /></Reveal>
          <Reveal delay={1}>
            <h2 className="h1" style={{ maxWidth: "16ch" }}>
              Five things, held quietly.
            </h2>
          </Reveal>
        </div>

        <div style={{ height: "var(--lg)" }} />

        <div className="container">
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            borderTop: "1px solid var(--rule)",
          }}>
            {[
              ["Restraint", "Less, made better."],
              ["Craft", "The hand still matters."],
              ["Honesty", "About cost, time, and limits."],
              ["Permanence", "Things meant to last."],
              ["Service", "Quietly, on time."],
            ].map(([t, d], i) => (
              <Reveal key={t} delay={Math.min(i + 1, 4)}>
                <div style={{
                  padding: "var(--lg) var(--md) var(--xl) 0",
                  borderRight: i < 4 ? "1px solid var(--rule)" : "0",
                  paddingLeft: i === 0 ? 0 : 24,
                  minHeight: 320,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}>
                  <div className="mono">0{i + 1}</div>
                  <div>
                    <h3 style={{
                      margin: 0,
                      fontSize: "clamp(28px, 2.8vw, 40px)",
                      fontWeight: 500,
                      letterSpacing: "-0.025em",
                      lineHeight: 1,
                    }}>{t}</h3>
                    <p className="body" style={{ marginTop: 16, color: "var(--ink-2)", maxWidth: "20ch" }}>{d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* Global infrastructure */}
      <section className="sec-pad-xl bg-ink text-paper" style={{ "--rule": "rgba(244,242,238,0.12)" }}>
        <div className="container">
          <Reveal>
            <div className="sec-meta">
              <span className="num" style={{ color: "var(--paper)" }}>03</span>
              <span className="dot" style={{ background: "var(--paper)" }} />
              <span className="label" style={{ color: "rgba(244,242,238,0.6)" }}>Global infrastructure</span>
            </div>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="h1" style={{ maxWidth: "20ch", color: "var(--paper)" }}>
              Six studios. Twelve warehouses. Sixty-two countries.
            </h2>
          </Reveal>
        </div>

        <div style={{ height: "var(--lg)" }} />

        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderTop: "1px solid var(--rule)" }}>
            {[
              ["NYC", "New York", "HQ — design, ops"],
              ["LDN", "London", "EMEA hub"],
              ["SGP", "Singapore", "APAC fulfillment"],
              ["MEX", "Mexico City", "Production"],
            ].map(([code, name, role], i) => (
              <Reveal key={code} delay={Math.min(i + 1, 4)}>
                <div style={{
                  padding: "var(--lg) var(--md) var(--xl) 0",
                  borderRight: i < 3 ? "1px solid var(--rule)" : "0",
                  paddingLeft: i === 0 ? 0 : 24,
                  minHeight: 240,
                }}>
                  <div className="mono" style={{ color: "rgba(244,242,238,0.6)" }}>{code}</div>
                  <h3 style={{
                    margin: "var(--md) 0 8px",
                    fontSize: "clamp(28px, 2.6vw, 36px)",
                    fontWeight: 500,
                    letterSpacing: "-0.025em",
                    color: "var(--paper)",
                  }}>{name}</h3>
                  <div className="body-sm" style={{ color: "rgba(244,242,238,0.7)" }}>{role}</div>
                </div>
              </Reveal>
            ))}
          </div>

          <div style={{ height: "var(--xl)" }} />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 64, borderTop: "1px solid var(--rule)", paddingTop: "var(--lg)" }}>
            {[
              ["62", "Countries shipped"],
              ["3.4M", "Units / year"],
              ["12", "Warehouses"],
            ].map(([n, l], i) => (
              <Reveal key={l} delay={Math.min(i + 1, 4)}>
                <div>
                  <div style={{ fontSize: "clamp(48px, 6vw, 88px)", fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1, color: "var(--paper)" }}>{n}</div>
                  <div className="mono" style={{ marginTop: 16, color: "rgba(244,242,238,0.6)" }}>{l}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* Client logos */}
      <section className="sec-pad-xl">
        <div className="container">
          <Reveal><SectionMeta num="04" label="In good company" /></Reveal>
          <Reveal delay={1}>
            <h2 className="h1" style={{ maxWidth: "16ch" }}>
              Trusted by considered companies.
            </h2>
          </Reveal>
        </div>

        <div style={{ height: "var(--lg)" }} />

        <div className="container">
          <Reveal>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              borderTop: "1px solid var(--rule)",
              borderLeft: "1px solid var(--rule)",
            }}>
              {[
                ["Northwind", 0], ["Halcyon", 1], ["Meridian", 2], ["Volta", 3],
                ["Coperni", 4], ["Atlas", 5], ["Principle", 0], ["Field & Stone", 1],
                ["Marquee", 2], ["Ovation", 3], ["Public Works", 4], ["Quartet", 5],
              ].map(([name, v], i) => (
                <div key={i} style={{
                  borderRight: "1px solid var(--rule)",
                  borderBottom: "1px solid var(--rule)",
                  padding: "32px 24px",
                }}>
                  <ClientMark name={name} variant={v} />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <hr className="divider" />

      <section className="sec-pad-xl">
        <div className="container">
          <Reveal><div className="mono">— Work with us</div></Reveal>
          <Reveal delay={1}>
            <h2 className="display" style={{ marginTop: 24, maxWidth: "14ch" }}>
              Make it <span className="serif-it">last.</span>
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

window.AboutPage = AboutPage;
