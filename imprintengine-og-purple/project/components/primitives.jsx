// Shared primitives: Reveal, ImagePlaceholder, SectionMeta, Marquee, Button, Logo

const { useEffect, useRef, useState, useMemo, useCallback } = React;

function Reveal({ children, delay = 0, as: Tag = "div", className = "", ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("in");
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const dCls = delay ? ` delay-${delay}` : "";
  return (
    <Tag ref={ref} className={`rise${dCls} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

function ImagePlaceholder({
  tone = "ink",
  ratio = "16 / 10",
  caption = "PRODUCT SHOT",
  meta = "01",
  rightMeta,
  style = {},
  className = "",
  hoverTitle,
  hoverText,
  children,
}) {
  const imgUrl = "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1400&q=80";
  return (
    <div
      className={`imgph tone-${tone} has-photo${hoverText ? " has-hover" : ""} ${className}`}
      style={{ aspectRatio: ratio, ...style }}
    >
      <div
        className="photo"
        style={{ backgroundImage: `url(${imgUrl})` }}
      />
      <div className="layer" />
      <div className="stripes" />
      <div className="noise" />
      <div className="crosshair">
        <span className="tl" /><span className="tr" /><span className="bl" /><span className="br" />
      </div>
      {children}
      {hoverText && (
        <div className="hover-overlay">
          <div className="hover-inner">
            {hoverTitle && <div className="hover-title">{hoverTitle}</div>}
            <div className="hover-body">{hoverText}</div>
          </div>
        </div>
      )}
      <div className="cap">
        <div>{caption}</div>
        <div className="r">{rightMeta || meta}</div>
      </div>
    </div>
  );
}

function SectionMeta({ num, label }) {
  return (
    <div className="sec-meta">
      <span className="num">{num}</span>
      <span className="dot" />
      <span className="label">{label}</span>
    </div>
  );
}

function Marquee({ items, accent = true }) {
  const content = (
    <span>
      {items.map((it, i) => (
        <React.Fragment key={i}>
          {it}
          {accent && <span className="star" />}
        </React.Fragment>
      ))}
    </span>
  );
  return (
    <div className="marquee">
      <div className="marquee-track">
        {content}
        {content}
      </div>
    </div>
  );
}

function Button({ children, onClick, variant = "solid", as = "button", href, ...rest }) {
  const cls = `btn${variant === "ghost" ? " ghost" : ""}`;
  if (as === "a") {
    return (
      <a className={cls} href={href} onClick={onClick} {...rest}>
        {children} <span className="arrow">→</span>
      </a>
    );
  }
  return (
    <button className={cls} onClick={onClick} {...rest}>
      {children} <span className="arrow">→</span>
    </button>
  );
}

// Anonymized "client" mark — geometric, original
function ClientMark({ name, variant = 0 }) {
  const variants = [
    // 0: dot + word
    <div className="logoplate" key="0">
      <span style={{ width: 8, height: 8, borderRadius: 999, background: "currentColor", marginRight: 10, display: "inline-block" }} />
      <span style={{ fontSize: 18 }}>{name}</span>
    </div>,
    // 1: bar + word
    <div className="logoplate" key="1">
      <span style={{ width: 18, height: 2, background: "currentColor", marginRight: 10, display: "inline-block" }} />
      <span style={{ fontSize: 18, fontFamily: "var(--serif)", fontStyle: "italic", letterSpacing: "-0.02em" }}>{name}</span>
    </div>,
    // 2: monogram square
    <div className="logoplate" key="2">
      <span style={{
        width: 22, height: 22, border: "1px solid currentColor",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        marginRight: 10, fontSize: 11, fontFamily: "var(--mono)"
      }}>{name[0]}</span>
      <span style={{ fontSize: 17, letterSpacing: "0.02em", textTransform: "uppercase", fontWeight: 500 }}>{name}</span>
    </div>,
    // 3: triangle + word
    <div className="logoplate" key="3">
      <span style={{
        width: 0, height: 0, marginRight: 10,
        borderLeft: "5px solid transparent", borderRight: "5px solid transparent",
        borderBottom: "9px solid currentColor", display: "inline-block"
      }} />
      <span style={{ fontSize: 18, letterSpacing: "-0.01em", fontWeight: 600 }}>{name}</span>
    </div>,
    // 4: outline ring + word
    <div className="logoplate" key="4">
      <span style={{ width: 14, height: 14, border: "1.5px solid currentColor", borderRadius: 999, marginRight: 10, display: "inline-block" }} />
      <span style={{ fontSize: 18 }}>{name}</span>
    </div>,
    // 5: stacked tiny mark
    <div className="logoplate" key="5">
      <span style={{
        display: "inline-flex", flexDirection: "column", gap: 2, marginRight: 10
      }}>
        <span style={{ width: 14, height: 2, background: "currentColor" }} />
        <span style={{ width: 9, height: 2, background: "currentColor" }} />
      </span>
      <span style={{ fontSize: 17, letterSpacing: "0.06em", textTransform: "uppercase" }}>{name}</span>
    </div>,
  ];
  return variants[variant % variants.length];
}

Object.assign(window, { Reveal, ImagePlaceholder, SectionMeta, Marquee, Button, ClientMark });
