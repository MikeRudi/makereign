// SERVICES
function ServicesPage({ openContact }) {
  const services = [
    { n: "01", t: "Merch production", d: "Considered apparel and goods. Sourced, sampled, produced.", tone: "warm", cap: "MERCH — APPAREL CAPSULE" },
    { n: "02", t: "Design services", d: "Identity, packaging, and editorial direction.", tone: "paper", cap: "DESIGN — BRAND SYSTEM" },
    { n: "03", t: "Production", d: "Print, embroidery, and small-batch manufacturing.", tone: "stone", cap: "PRODUCTION — FLOOR" },
    { n: "04", t: "Logistics", d: "Warehousing, kitting, and assembly at scale.", tone: "ink", cap: "LOGISTICS — KIT 12" },
    { n: "05", t: "Global fulfillment", d: "Distributed shipping across 62 countries.", tone: "warm", cap: "FULFILLMENT — GLOBAL" },
    { n: "06", t: "IEX platform", d: "The operating system for company stores.", tone: "paper", cap: "IEX — STOREFRONT" },
  ];

  return (
    <div className="page-enter" data-screen-label="Services">

      <section className="sec-pad-xl" style={{ paddingTop: "calc(var(--xxl) + 40px)" }}>
        <div className="container">
          <Reveal><div className="mono" style={{ marginBottom: 24 }}>— Services / 06 capabilities</div></Reveal>
          <Reveal delay={1}>
            <h1 className="display">
              The whole <span className="serif-it">apparatus.</span>
            </h1>
          </Reveal>
          <Reveal delay={2}>
            <p className="lede" style={{ marginTop: 40, maxWidth: "36ch" }}>
              From first sketch to the doorstep.
              One studio, one accountable team.
            </p>
          </Reveal>
        </div>
      </section>

      <hr className="divider" />

      {/* Service breakdown */}
      {services.map((s, i) => (
        <ServiceRow key={s.n} s={s} i={i} flip={i % 2 === 1} />
      ))}

      <hr className="divider" />

      {/* Process deep dive */}
      <section className="sec-pad-xl">
        <div className="container">
          <Reveal><SectionMeta num="07" label="Process" /></Reveal>
          <Reveal delay={1}>
            <h2 className="h1" style={{ maxWidth: "18ch" }}>
              From brief to delivery, in 12 weeks.
            </h2>
          </Reveal>
        </div>

        <div style={{ height: "var(--lg)" }} />

        <div className="container">
          <ProcessTimeline />
        </div>
      </section>

      <hr className="divider" />

      {/* Example outputs */}
      <section className="sec-pad-xl">
        <div className="container">
          <Reveal><SectionMeta num="08" label="Selected outputs" /></Reveal>
          <Reveal delay={1}>
            <h2 className="h1" style={{ maxWidth: "20ch" }}>
              Campaigns, stores, products.
            </h2>
          </Reveal>
        </div>

        <div style={{ height: "var(--lg)" }} />

        <div className="container-wide">
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24 }}>
            <Reveal>
              <div className="col gap-sm">
                <ImagePlaceholder tone="warm" ratio="16 / 10" caption="CAMPAIGN — SS26 LAUNCH" rightMeta="OUT-01" />
                <div className="mono" style={{ marginTop: 8 }}>01 — Campaign / SS26</div>
              </div>
            </Reveal>
            <Reveal delay={1}>
              <div className="col gap-sm">
                <ImagePlaceholder tone="ink" ratio="3 / 4" caption="STORE — IEX BUILD" rightMeta="OUT-02" />
                <div className="mono" style={{ marginTop: 8 }}>02 — Store / IEX build</div>
              </div>
            </Reveal>
          </div>

          <div style={{ height: 24 }} />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 24 }}>
            <Reveal>
              <div className="col gap-sm">
                <ImagePlaceholder tone="paper" ratio="3 / 4" caption="PACKAGING — KIT 14" rightMeta="OUT-03" />
                <div className="mono" style={{ marginTop: 8 }}>03 — Packaging / Kit 14</div>
              </div>
            </Reveal>
            <Reveal delay={1}>
              <div className="col gap-sm">
                <ImagePlaceholder tone="stone" ratio="16 / 10" caption="PRODUCT — KNITWEAR LINE" rightMeta="OUT-04" />
                <div className="mono" style={{ marginTop: 8 }}>04 — Product / Knitwear</div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <hr className="divider" />

      <section className="sec-pad-xl">
        <div className="container">
          <Reveal><div className="mono">— Brief us</div></Reveal>
          <Reveal delay={1}>
            <h2 className="display" style={{ marginTop: 24, maxWidth: "14ch" }}>
              Tell us what to <span className="serif-it">make.</span>
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

function ServiceRow({ s, i, flip }) {
  return (
    <section className="sec-pad-xl" style={{ paddingTop: "var(--xxl)", paddingBottom: "var(--xxl)", borderBottom: "1px solid var(--rule)" }}>
      <div className="container-wide">
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 64,
          alignItems: "center",
        }}>
          <Reveal className={flip ? "" : ""}
                  style={flip ? { order: 2 } : undefined}>
            <ImagePlaceholder tone={s.tone} ratio="4 / 5" caption={s.cap} rightMeta={`SVC-${s.n}`} />
          </Reveal>
          <Reveal delay={1} style={flip ? { order: 1 } : undefined}>
            <div>
              <div className="mono">— {s.n} / Service</div>
              <h2 className="h1" style={{ marginTop: 24, maxWidth: "12ch" }}>{s.t}</h2>
              <p className="lede" style={{ marginTop: 32 }}>{s.d}</p>
              <ul style={{ listStyle: "none", padding: 0, marginTop: 32, borderTop: "1px solid var(--rule)" }}>
                {capabilitiesFor(s.n).map((c, j) => (
                  <li key={j} style={{
                    display: "grid",
                    gridTemplateColumns: "32px 1fr",
                    padding: "14px 0",
                    borderBottom: "1px solid var(--rule)",
                    alignItems: "baseline",
                  }}>
                    <span className="mono">{String(j + 1).padStart(2, "0")}</span>
                    <span className="body">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function capabilitiesFor(n) {
  const map = {
    "01": ["Apparel & cut-and-sew", "Hard goods sourcing", "Sustainable materials", "Sample rooms"],
    "02": ["Identity systems", "Packaging design", "Editorial direction", "Style guides"],
    "03": ["Screen & DTG print", "Embroidery & patches", "Small-batch runs", "Quality assurance"],
    "04": ["Warehousing", "Kitting & assembly", "Returns management", "Inventory dashboards"],
    "05": ["Global distribution", "Customs & duties", "Same-day in 12 cities", "Carbon-aware routing"],
    "06": ["Storefront builder", "Budget approvals", "SSO & permissions", "Reporting & analytics"],
  };
  return map[n] || [];
}

function ProcessTimeline() {
  const steps = [
    ["Wk 01", "Brief", "Audit, intent, scope."],
    ["Wk 02–04", "Design", "Concepts, samples, sign-off."],
    ["Wk 05–08", "Develop", "Sourcing, prototyping, QA."],
    ["Wk 09–10", "Deploy", "Production, kitting, ship."],
    ["Wk 11–12", "Operate", "Reporting, restocks, iterate."],
  ];
  return (
    <div style={{ position: "relative" }}>
      <div style={{
        position: "absolute", left: 0, right: 0, top: 22, height: 1,
        background: "var(--rule)",
      }} />
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${steps.length}, 1fr)`, gap: 16 }}>
        {steps.map(([wk, t, d], i) => (
          <Reveal key={i} delay={Math.min(i + 1, 4)}>
            <div>
              <div style={{
                width: 12, height: 12, borderRadius: 999,
                background: i === 0 ? "var(--accent)" : "var(--ink)",
                position: "relative", zIndex: 1,
                margin: "16px 0",
              }} />
              <div className="mono">{wk}</div>
              <h3 className="h3" style={{ marginTop: 12 }}>{t}</h3>
              <p className="body-sm" style={{ marginTop: 8, color: "var(--muted)", maxWidth: "20ch" }}>{d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

window.ServicesPage = ServicesPage;
