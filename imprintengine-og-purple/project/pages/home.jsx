// HOME — hero, services, logos, use cases, process, CTA
function HomePage({ openContact, navigate }) {
  return (
    <div className="page-enter" data-screen-label="Home">

      {/* HERO */}
      <section className="sec-pad-xl" style={{ paddingTop: "calc(var(--xxl) + 40px)" }}>
        <div className="container">
          <Reveal>
            <div className="mono" style={{ marginBottom: 24 }}>— A brand partner, since 2009</div>
          </Reveal>
          <Reveal delay={1}>
            <h1 className="display">
              Brands, made <span className="serif-it">tangible.</span>
            </h1>
          </Reveal>
          <Reveal delay={2}>
            <div className="row between center" style={{ marginTop: 48, flexWrap: "wrap", gap: 24 }}>
              <p className="lede" style={{ maxWidth: "36ch" }}>
                We design, produce, and deliver merch & brand systems
                for the world's most considered companies.
              </p>
              <Button onClick={openContact}>Start a project</Button>
            </div>
          </Reveal>
        </div>

        <div style={{ height: "var(--xl)" }} />

        <Reveal delay={2}>
          <div className="container-wide">
            <ImagePlaceholder
              tone="warm"
              ratio="21 / 9"
              caption="HERO — STILL LIFE / CRAFTED MERCH"
              rightMeta="01 / IE-2026"
            />
          </div>
        </Reveal>

        <div style={{ height: "var(--xl)" }} />

        <div className="container">
          <Reveal>
            <div className="row between" style={{ flexWrap: "wrap", gap: 32 }}>
              <div>
                <div className="mono">Trusted by 240+ enterprise teams</div>
              </div>
              <div className="row gap-lg" style={{ flexWrap: "wrap" }}>
                <Stat n="14" l="Years operating" />
                <Stat n="62" l="Countries shipped" />
                <Stat n="3.4M" l="Units / year" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <hr className="divider" />

      {/* SERVICES OVERVIEW */}
      <section className="sec-pad-xl">
        <div className="container">
          <Reveal><SectionMeta num="01" label="Services" /></Reveal>
          <Reveal delay={1}>
            <h2 className="h1" style={{ maxWidth: "16ch" }}>
              One studio. The whole supply chain.
            </h2>
          </Reveal>
        </div>

        <div style={{ height: "var(--lg)" }} />

        <div className="container">
          <ServiceList items={[
            { n: "01", t: "Merch", d: "Considered apparel and goods, sourced and produced." },
            { n: "02", t: "Design", d: "Identity, packaging, and editorial direction." },
            { n: "03", t: "Production", d: "Print, embroidery, and small-batch manufacturing." },
            { n: "04", t: "Logistics", d: "Warehousing, kitting, and global distribution." },
            { n: "05", t: "Platform", d: "IEX — the operating system for company stores." },
          ]} />
        </div>

        <div style={{ height: "var(--lg)" }} />

        <div className="container">
          <Reveal>
            <a className="link-arrow" href="#services" onClick={(e)=>{e.preventDefault();navigate("services");}}>
              View all services <span className="a">→</span>
            </a>
          </Reveal>
        </div>
      </section>

      <hr className="divider" />

      {/* CLIENT LOGOS */}
      <PartnersSection />

      <hr className="divider" />

      {/* USE CASES */}
      <section className="sec-pad-xl">
        <div className="container">
          <Reveal><SectionMeta num="03" label="Use cases" /></Reveal>
          <Reveal delay={1}>
            <h2 className="h1" style={{ maxWidth: "18ch" }}>
              Built for moments that matter.
            </h2>
          </Reveal>
        </div>

        <div style={{ height: "var(--lg)" }} />

        <div className="container-wide">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {[
              { t: "Corporate gifting", d: "Considered moments for clients, partners, and teams.", tone: "warm", cap: "GIFTING — KIT 04", hover: "Onboarding boxes, holiday programs, and client appreciation kits — sourced, assembled, and shipped from our facilities." },
              { t: "Events & launches", d: "End-to-end activations, on time, on brand.", tone: "stone", cap: "EVENT — LAUNCH FLOW", hover: "Conferences, product launches, sales kickoffs. Signage, swag, and stage in 14+ cities a year." },
              { t: "Company stores", d: "Self-serve storefronts, fully managed by us.", tone: "ink", cap: "IEX — STOREFRONT", hover: "IEX powers always-on company stores: SSO, budgets, approvals, global ship — managed end-to-end." },
            ].map((u, i) => (
              <Reveal key={i} delay={i + 1}>
                <div className="col gap-md">
                  <ImagePlaceholder
                    tone={u.tone}
                    ratio="3 / 4"
                    caption={u.cap}
                    rightMeta={`0${i + 1}`}
                    hoverTitle={`0${i + 1} — ${u.t}`}
                    hoverText={u.hover}
                  />
                  <div>
                    <div className="mono" style={{ marginTop: 12 }}>0{i + 1}</div>
                    <h3 className="h3" style={{ marginTop: 8 }}>{u.t}</h3>
                    <p className="body" style={{ color: "var(--ink-2)", marginTop: 8, maxWidth: "28ch" }}>{u.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* PROCESS */}
      <ProcessSection />

      <hr className="divider" />

      {/* CTA */}
      <section className="sec-pad-xl">
        <div className="container">
          <Reveal>
            <div className="mono">— Ready when you are</div>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="display" style={{ marginTop: 24, maxWidth: "14ch" }}>
              Let's make something <span className="serif-it">lasting.</span>
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

function PartnersSection() {
  const partners = [
    { name: "Northwind", kind: "Outdoor & lifestyle", since: "2018", programs: "Gifting · Retail", style: "sans" },
    { name: "Halcyon", kind: "Hospitality group", since: "2020", programs: "Events · Stores", style: "serif-it" },
    { name: "MERIDIAN", kind: "Global tech", since: "2017", programs: "IEX · Onboarding", style: "caps" },
    { name: "VOLTA", kind: "Energy & mobility", since: "2021", programs: "Launches · Kits", style: "track" },
    { name: "Coperni Bank", kind: "Financial services", since: "2019", programs: "Client gifting", style: "sans" },
    { name: "Field & Stone", kind: "Heritage retail", since: "2016", programs: "Packaging · Print", style: "serif-it" },
    { name: "PRINCIPLE", kind: "Strategy consultancy", since: "2022", programs: "Onboarding · Stores", style: "caps" },
    { name: "Atlas Foundry", kind: "Industrial manufacturing", since: "2015", programs: "Workwear · Safety", style: "sans" },
    { name: "Linden Press", kind: "Independent publisher", since: "2023", programs: "Print · Editions", style: "serif-it" },
    { name: "OXBOW", kind: "Outdoor performance", since: "2019", programs: "Retail · Events", style: "track" },
    { name: "Marlowe & Co.", kind: "Legal services", since: "2021", programs: "Client gifting", style: "serif-it" },
    { name: "QUARRY", kind: "Architecture studio", since: "2020", programs: "Editions · Print", style: "caps" },
  ];
  const [hover, setHover] = React.useState(null);

  const styleFor = (s) => {
    if (s === "serif-it") return { fontFamily: "var(--serif)", fontStyle: "italic", fontWeight: 400 };
    if (s === "caps") return { letterSpacing: "0.02em", fontWeight: 600 };
    if (s === "track") return { letterSpacing: "0.16em", fontWeight: 500 };
    return { fontWeight: 500, letterSpacing: "-0.02em" };
  };

  return (
    <section className="sec-pad-xl partners-section">
      <div className="container">
        <Reveal>
          <SectionMeta num="02" label="Selected partners" />
        </Reveal>
        <Reveal delay={1}>
          <div className="row between" style={{ alignItems: "flex-end", flexWrap: "wrap", gap: 24, marginTop: 8 }}>
            <h2 className="h1" style={{ maxWidth: "20ch", margin: 0 }}>
              Long partnerships, <span className="serif-it">measured in programs.</span>
            </h2>
            <p className="body" style={{ maxWidth: "32ch", margin: 0, color: "rgba(15,15,15,0.65)" }}>
              We work with brands as a long-term partner — most for five years and more. A selection below.
            </p>
          </div>
        </Reveal>
      </div>

      <div style={{ height: "var(--lg)" }} />

      <div className="container">
        <Reveal>
          <ul className="partner-list" onMouseLeave={() => setHover(null)}>
            {partners.map((p, i) => (
              <li
                key={p.name}
                className="partner-row"
                onMouseEnter={() => setHover(i)}
                style={{ opacity: hover === null || hover === i ? 1 : 0.32 }}
              >
                <a href="#" className="partner-link" onClick={(e) => e.preventDefault()}>
                  <span className="partner-num mono">{String(i + 1).padStart(2, "0")}</span>
                  <span className="partner-name" style={styleFor(p.style)}>{p.name}</span>
                  <span className="partner-kind">{p.kind}</span>
                  <span className="partner-since mono">Since {p.since}</span>
                  <span className="partner-programs">{p.programs}</span>
                  <span className="partner-arrow">→</span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <div style={{ height: "var(--lg)" }} />

        <Reveal>
          <div className="partner-foot">
            <div className="partner-foot-stat">
              <div className="partner-foot-num">120+</div>
              <div className="mono" style={{ color: "rgba(15,15,15,0.55)" }}>Active programs</div>
            </div>
            <div className="partner-foot-stat">
              <div className="partner-foot-num">5.4 yrs</div>
              <div className="mono" style={{ color: "rgba(15,15,15,0.55)" }}>Avg. partnership</div>
            </div>
            <div className="partner-foot-stat">
              <div className="partner-foot-num">94%</div>
              <div className="mono" style={{ color: "rgba(15,15,15,0.55)" }}>Annual retention</div>
            </div>
            <a href="#" onClick={(e) => e.preventDefault()} className="partner-foot-cta">
              See full client list <span aria-hidden>→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ProcessSection() {
  const [active, setActive] = React.useState(0);
  const steps = [
    {
      n: "01",
      t: "Discover",
      lede: "Audit. Intent. Scope.",
      duration: "Week 01",
      lead: "Strategy + producer",
      body: "We start by understanding what already works — and what doesn't. We map your stakeholders, vendors, brand guidelines, and the moments that matter to your people: onboarding, milestones, launches, gifting cycles.",
      deliverables: [
        "Stakeholder & vendor audit",
        "Brand & inventory baseline",
        "Moment map across the year",
        "Scope, budget, and KPIs",
      ],
      stat: ["14", "vendors typically replaced"],
    },
    {
      n: "02",
      t: "Design",
      lede: "On-trend. On-brand.",
      duration: "Weeks 02–04",
      lead: "Creative direction + design",
      body: "Our in-house design team — product designers, photographers, brand strategists — concept the system end-to-end. You see real samples, not renders. Sign off on what you can actually hold.",
      deliverables: [
        "Concept directions, narrowed",
        "Physical samples in-hand",
        "Packaging & unboxing design",
        "Style guide for the program",
      ],
      stat: ["3", "directions, narrowed to one"],
    },
    {
      n: "03",
      t: "Develop",
      lede: "On-budget. Always.",
      duration: "Weeks 05–08",
      lead: "Sourcing + production",
      body: "Owned facilities and a vetted global supplier network. We source ethically, prototype in volume, and pre-flight every SKU through QA before a single unit is committed to production.",
      deliverables: [
        "Sourcing & material decisions",
        "Production-quality prototypes",
        "QA pre-flight & sign-off",
        "Locked unit economics",
      ],
      stat: ["−42%", "average vendor cost reduction"],
    },
    {
      n: "04",
      t: "Deploy",
      lede: "On-time. Globally.",
      duration: "Weeks 09–12",
      lead: "Logistics + IEX platform",
      body: "Print, embroider, kit, and ship from twelve warehouses to sixty-two countries. IEX powers always-on company stores with SSO, budgets, and approvals — so the program runs itself once it's live.",
      deliverables: [
        "Production at scale",
        "Kitting, assembly, and ship",
        "IEX storefront & approvals",
        "Reporting & restock loops",
      ],
      stat: ["62", "countries shipped to"],
    },
  ];

  return (
    <section className="sec-pad-xl bg-ink text-paper process-section" style={{ "--rule": "rgba(244,242,238,0.14)" }}>
      <div className="container">
        <Reveal>
          <div className="sec-meta">
            <span className="num" style={{ color: "var(--paper)" }}>04</span>
            <span className="dot" style={{ background: "var(--paper)" }} />
            <span className="label" style={{ color: "rgba(244,242,238,0.6)" }}>Process</span>
          </div>
        </Reveal>
        <Reveal delay={1}>
          <div className="row between" style={{ alignItems: "flex-end", flexWrap: "wrap", gap: 24 }}>
            <h2 className="h1" style={{ maxWidth: "18ch", margin: 0 }}>
              Four steps. <span className="serif-it" style={{ color: "var(--paper)", opacity: 0.6 }}>No surprises.</span>
            </h2>
            <p className="body" style={{ maxWidth: "32ch", margin: 0, color: "rgba(244,242,238,0.7)" }}>
              On-trend, on-brand, on-budget, on-time —
              the four promises behind every program we run.
            </p>
          </div>
        </Reveal>
      </div>

      <div style={{ height: "var(--lg)" }} />

      <div className="container">
        <Reveal>
          <div className="proc-grid">
            <div className="proc-rail">
              {steps.map((s, i) => (
                <button
                  key={s.n}
                  className={`proc-tab ${active === i ? "is-active" : ""}`}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                >
                  <span className="proc-tab-num">{s.n}</span>
                  <span className="proc-tab-name">{s.t}</span>
                  <span className="proc-tab-lede">{s.lede}</span>
                </button>
              ))}
            </div>

            <div className="proc-panel">
              {steps.map((s, i) => (
                <div
                  key={s.n}
                  className={`proc-content ${active === i ? "is-active" : ""}`}
                  aria-hidden={active !== i}
                >
                  <div className="proc-meta-row">
                    <div>
                      <div className="mono" style={{ color: "rgba(244,242,238,0.5)" }}>Duration</div>
                      <div className="body" style={{ marginTop: 6 }}>{s.duration}</div>
                    </div>
                    <div>
                      <div className="mono" style={{ color: "rgba(244,242,238,0.5)" }}>Owned by</div>
                      <div className="body" style={{ marginTop: 6 }}>{s.lead}</div>
                    </div>
                  </div>

                  <p className="proc-body">{s.body}</p>

                  <div className="proc-meta-row" style={{ marginTop: 40 }}>
                    <div style={{ flex: 1 }}>
                      <div className="mono" style={{ color: "rgba(244,242,238,0.5)", marginBottom: 16 }}>Deliverables</div>
                      <ul className="proc-deliverables">
                        {s.deliverables.map((d, j) => (
                          <li key={j}>
                            <span className="proc-bullet">{String(j + 1).padStart(2, "0")}</span>
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="proc-stat">
                      <div className="proc-stat-num">{s.stat[0]}</div>
                      <div className="mono" style={{ color: "rgba(244,242,238,0.55)" }}>{s.stat[1]}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div style={{ height: "var(--xl)" }} />

        <Reveal>
          <div className="proc-pillars">
            {[
              ["On-trend", "Cultural fluency, not catalog merch."],
              ["On-brand", "Identity, applied with discipline."],
              ["On-budget", "Owned facilities, locked economics."],
              ["On-time", "Twelve warehouses, sixty-two countries."],
            ].map(([t, d], i) => (
              <div key={t} className="proc-pillar">
                <div className="mono" style={{ color: "rgba(244,242,238,0.5)" }}>0{i + 1}</div>
                <h4 className="proc-pillar-t">{t}</h4>
                <p className="proc-pillar-d">{d}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Stat({ n, l }) {
  return (
    <div>
      <div style={{ fontSize: 32, fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1 }}>{n}</div>
      <div className="mono" style={{ marginTop: 8 }}>{l}</div>
    </div>
  );
}

function ServiceList({ items }) {
  const [active, setActive] = React.useState(0);
  return (
    <div style={{ borderTop: "1px solid var(--rule)" }}>
      {items.map((it, i) => (
        <Reveal key={it.n} delay={Math.min(i + 1, 4)}>
          <div
            onMouseEnter={() => setActive(i)}
            style={{
              borderBottom: "1px solid var(--rule)",
              padding: "28px 0",
              display: "grid",
              gridTemplateColumns: "60px 1.4fr 1fr 24px",
              alignItems: "baseline",
              gap: 24,
              cursor: "default",
              transition: "padding 400ms ease, background 400ms ease",
              ...(active === i ? { paddingLeft: 12, paddingRight: 12 } : {}),
            }}
          >
            <span className="mono">{it.n}</span>
            <h3 style={{ fontSize: "clamp(28px, 3.4vw, 44px)", fontWeight: 500, letterSpacing: "-0.025em", margin: 0, lineHeight: 1, color: active === i ? "var(--ink)" : "var(--ink)" }}>
              {it.t}
            </h3>
            <p className="body" style={{ margin: 0, color: "var(--ink-2)", maxWidth: "32ch" }}>{it.d}</p>
            <span style={{ fontSize: 18, opacity: active === i ? 1 : 0.3, transition: "opacity 300ms ease, transform 300ms ease", transform: active === i ? "translateX(4px)" : "none" }}>→</span>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

window.HomePage = HomePage;
