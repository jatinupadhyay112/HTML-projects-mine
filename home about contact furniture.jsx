import { useState, useEffect, useRef } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────
const products = [
  { id:1, name:"Aria Lounge Chair",    price:"₹28,500",  category:"Seating", tag:"Best Seller", img:"https://th.bing.com/th/id/OIP.9ypakaBsA2HwDuQ0A_IeNQHaHa?w=188&h=188&c=7&r=0&o=7&cb=defcachec2&dpr=1.3&pid=1.7&rm=3" },
  { id:2, name:"Monolith Dining Table",price:"₹74,000",  category:"Tables",  tag:"New",         img:"https://th.bing.com/th/id/OIP.5FBj2m7bJnJZpJqbY7jWigHaJK?w=161&h=200&c=7&r=0&o=7&cb=defcachec2&dpr=1.3&pid=1.7&rm=3" },
  { id:3, name:"Haven Sofa",           price:"₹1,12,000",category:"Seating", tag:"Trending",    img:"https://th.bing.com/th/id/OIP.jD_IsRlmLuWEqF7ghJxg-AHaHa?w=162&h=180&c=7&r=0&o=7&cb=defcachec2&dpr=1.3&pid=1.7&rm=3" },
  { id:4, name:"Nordic Shelf Unit",    price:"₹34,000",  category:"Storage", tag:"New",         img:"https://th.bing.com/th/id/OIP.I0dFPy8ZjSBACC_cVRbWRgHaHa?w=184&h=183&c=7&r=0&o=7&cb=defcachec2&dpr=1.3&pid=1.7&rm=3" },
  { id:5, name:"Ember Floor Lamp",     price:"₹12,000",  category:"Lighting",tag:"",            img:"https://th.bing.com/th/id/OIP.jA5SPOZoo4rLaHS-tVGcTAHaE8?w=225&h=180&c=7&r=0&o=7&cb=defcachec2&dpr=1.3&pid=1.7&rm=3" },
  { id:6, name:"Zen Bed Frame",        price:"₹58,000",  category:"Bedroom", tag:"Best Seller", img:"https://th.bing.com/th/id/OIP.1YvrxqYRS7d04FL68t_MogHaHY?w=184&h=183&c=7&r=0&o=7&cb=defcachec2&dpr=1.3&pid=1.7&rm=3" },
];
const categories = [
  { name:"Living Room",img:"https://th.bing.com/th/id/OIP.NvRX3F65P6EvoNq0bfzQbwHaEK?w=307&h=180&c=7&r=0&o=7&cb=defcachec2&dpr=1.3&pid=1.7&rm=3",count:"48 pieces"},
  { name:"Bedroom",    img:"https://th.bing.com/th/id/OIP.5OuTO2KCRvEwTe1ub4kLJAHaD1?w=340&h=180&c=7&r=0&o=7&cb=defcachec2&dpr=1.3&pid=1.7&rm=3",count:"32 pieces"},
  { name:"Dining",     img:"https://th.bing.com/th/id/OIP.VIp3FjXQGHHWOQFbyBRIJQHaE8?w=222&h=180&c=7&r=0&o=7&cb=defcachec2&dpr=1.3&pid=1.7&rm=3",count:"27 pieces"},
  { name:"Lighting",   img:"https://th.bing.com/th/id/OIP.bYdNT-KKwAZ_8WN1Zoe70AHaGp?w=199&h=180&c=7&r=0&o=7&cb=defcachec2&dpr=1.3&pid=1.7&rm=3",count:"19 pieces"},
];
const team = [
  { name:"Rajan Mehta", role:"Founder & CEO",   img:"https://th.bing.com/th/id/OIP.KrBb3g1fhz2kTKUPn8qLbgHaHS?w=185&h=183&c=7&r=0&o=7&cb=defcachec2&dpr=1.3&pid=1.7&rm=3"},
  { name:"Sneha Kapoor",role:"Head of Design",  img:"https://th.bing.com/th/id/OIP.qYOWRlUeR_xJHXo1-_5xUgHaEs?w=280&h=180&c=7&r=0&o=7&cb=defcachec2&dpr=1.3&pid=1.7&rm=3"},
  { name:"Arjun Bhatia",role:"Master Craftsman",img:"https://th.bing.com/th/id/OIP.HgfRAOkabKHjj53sd52rKQHaHa?w=201&h=201&c=7&r=0&o=7&cb=defcachec2&dpr=1.3&pid=1.7&rm=3"},
];

// ─── THEME ───────────────────────────────────────────────────────────────────
const C = {
  gold:"#C8A882", dg:"#8B6F5C", bg:"#120E0A", bgD:"#0E0B08",
  text:"#F5ECD7", muted:"rgba(245,236,215,0.55)", border:"rgba(200,168,130,0.18)",
};
const S = "'Playfair Display', serif";
const L = "'Cormorant Garamond', serif";

// ─── HOOKS ───────────────────────────────────────────────────────────────────
function useScreen() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  const isMobile = w < 640;
  const isTablet = w >= 640 && w < 1024;
  return { isMobile, isTablet, isDesktop: w >= 1024, w };
}

function useInView(t = 0.1) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: t });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return [ref, v];
}

// ─── ATOMS ───────────────────────────────────────────────────────────────────
const Eyebrow = ({ children }) => (
  <p style={{ fontFamily:L, color:C.gold, fontSize:"0.74rem", letterSpacing:"0.32em", textTransform:"uppercase", margin:"0 0 0.4rem" }}>{children}</p>
);
const GoldLine = ({ center }) => (
  <div style={{ width:46, height:2, background:`linear-gradient(90deg,${C.gold},${C.dg})`, margin:center?"0.9rem auto 0":"0.9rem 0 0" }} />
);
function SecHead({ eyebrow, title, center }) {
  return (
    <div style={{ textAlign:center?"center":"left", marginBottom:"2.2rem" }}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 style={{ fontFamily:S, color:C.text, fontSize:"clamp(1.55rem,4vw,2.8rem)", margin:0, fontWeight:700, lineHeight:1.15 }}>{title}</h2>
      <GoldLine center={center} />
    </div>
  );
}
function PageBanner({ title, sub, img, sc }) {
  const { isMobile } = useScreen();
  return (
    <section style={{ height:isMobile?250:360, position:"relative", overflow:"hidden", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <img src={img} alt={title} style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }} />
      <div style={{ position:"absolute", inset:0, background:"rgba(10,7,4,0.72)" }} />
      <div style={{ position:"relative", textAlign:"center", padding:"0 1.5rem" }}>
        <Eyebrow>{sub}</Eyebrow>
        <h1 style={{ fontFamily:S, color:C.text, fontSize:`clamp(2rem,6vw,4rem)`, margin:0, fontWeight:700 }}>{title}</h1>
        <GoldLine center />
      </div>
    </section>
  );
}
function Wrap({ children, bg = C.bg, sc }) {
  const { isMobile, isTablet } = useScreen();
  const p = isMobile ? "3rem 1.2rem" : isTablet ? "4rem 2rem" : "5.5rem 4rem";
  return <section style={{ background:bg, padding:sc||p }}>{children}</section>;
}
function MxW({ children, s }) {
  return <div style={{ maxWidth:1380, margin:"0 auto", ...s }}>{children}</div>;
}
function px(m,t,d) {
  const sc = useScreen();
  return sc.isMobile ? m : sc.isTablet ? t : d;
}

// ═══════════════════════════════════════════════════════════════════════════
// NAVBAR
// ═══════════════════════════════════════════════════════════════════════════
function Navbar({ page, setPage }) {
  const { isMobile, isTablet } = useScreen();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const small = isMobile || isTablet;
  const hPad = isMobile ? "1.2rem" : isTablet ? "2rem" : "4rem";

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const go = (p) => { setPage(p); setOpen(false); };

  return (
    <>
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:300,
        background: scrolled || open ? "rgba(12,9,6,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.border}` : "none",
        transition:"all 0.35s ease",
        padding:`0.95rem ${hPad}`,
        display:"flex", alignItems:"center", justifyContent:"space-between",
      }}>
        <div onClick={() => go("home")} style={{ display:"flex", alignItems:"center", gap:"0.4rem", cursor:"pointer" }}>
          <div style={{ width:21, height:21, background:`linear-gradient(135deg,${C.gold},${C.dg})`, borderRadius:"50% 50% 50% 0", transform:"rotate(-45deg)", flexShrink:0 }} />
          <span style={{ fontFamily:S, fontSize:"1.3rem", color:C.text, paddingLeft:4 }}>Maison</span>
        </div>

        {!small && (
          <div style={{ display:"flex", gap:"2.5rem" }}>
            {["home","about","contact"].map(p => (
              <span key={p} onClick={() => go(p)} style={{
                fontFamily:L, fontSize:"0.88rem", letterSpacing:"0.14em", textTransform:"uppercase", cursor:"pointer",
                color:page===p?C.gold:C.muted,
                borderBottom:page===p?`1px solid ${C.gold}`:"1px solid transparent",
                paddingBottom:2, transition:"color 0.25s",
              }}
                onMouseEnter={e=>e.target.style.color=C.gold}
                onMouseLeave={e=>e.target.style.color=page===p?C.gold:C.muted}>
                {p[0].toUpperCase()+p.slice(1)}
              </span>
            ))}
          </div>
        )}

        {!small ? (
          <button onClick={() => go("contact")} style={{
            background:`linear-gradient(135deg,${C.gold},${C.dg})`, color:C.bg, border:"none",
            padding:"0.5rem 1.4rem", fontFamily:L, fontSize:"0.8rem", letterSpacing:"0.14em",
            textTransform:"uppercase", cursor:"pointer",
          }}>Get Quote</button>
        ) : (
          <button onClick={() => setOpen(o => !o)} style={{
            background:"transparent", border:`1px solid ${C.border}`, color:C.gold,
            width:38, height:38, display:"flex", flexDirection:"column",
            alignItems:"center", justifyContent:"center", gap:5, cursor:"pointer",
          }}>
            {open
              ? <span style={{ fontFamily:L, fontSize:"1rem", color:C.gold, lineHeight:1 }}>✕</span>
              : <><span style={{ width:16, height:1.5, background:C.gold, display:"block" }} /><span style={{ width:16, height:1.5, background:C.gold, display:"block" }} /><span style={{ width:10, height:1.5, background:C.gold, display:"block", alignSelf:"flex-start", marginLeft:3 }} /></>
            }
          </button>
        )}
      </nav>

      {small && open && (
        <div style={{
          position:"fixed", top:55, left:0, right:0, zIndex:299,
          background:"rgba(12,9,6,0.98)", backdropFilter:"blur(16px)",
          borderBottom:`1px solid ${C.border}`, padding:"1.2rem 1.5rem 1.8rem",
        }}>
          {["home","about","contact"].map(p => (
            <div key={p} onClick={() => go(p)} style={{
              fontFamily:L, fontSize:"1.25rem", color:page===p?C.gold:C.text,
              letterSpacing:"0.12em", textTransform:"uppercase",
              padding:"0.85rem 0", borderBottom:`1px solid ${C.border}`, cursor:"pointer",
            }}>{p[0].toUpperCase()+p.slice(1)}</div>
          ))}
          <button onClick={() => go("contact")} style={{
            marginTop:"1.2rem", width:"100%",
            background:`linear-gradient(135deg,${C.gold},${C.dg})`, color:C.bg,
            border:"none", padding:"0.82rem",
            fontFamily:L, fontSize:"0.88rem", letterSpacing:"0.16em", textTransform:"uppercase", cursor:"pointer",
          }}>Get Quote</button>
        </div>
      )}
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// HOME
// ═══════════════════════════════════════════════════════════════════════════
function Hero({ setPage }) {
  const { isMobile, isTablet } = useScreen();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);
  const fa = d => ({ opacity:loaded?1:0, transform:loaded?"translateY(0)":"translateY(22px)", transition:`all 0.85s cubic-bezier(0.16,1,0.3,1) ${d}s` });
  const hPad = isMobile?"1.2rem":isTablet?"2rem":"4rem";
  const single = isMobile || isTablet;

  return (
    <section style={{ minHeight:"100svh", background:C.bg, display:"flex", alignItems:"center", position:"relative", overflow:"hidden", paddingTop:isMobile?66:76 }}>
      <div style={{ position:"absolute", inset:0, backgroundImage:`radial-gradient(ellipse at 68% 40%, rgba(139,111,92,0.14) 0%, transparent 55%)` }} />
      {!single && <div style={{ position:"absolute", right:"42%", top:0, bottom:0, width:1, background:C.border }} />}
      <div style={{ position:"relative", zIndex:2, maxWidth:1380, margin:"0 auto", padding:`2.5rem ${hPad}`, display:"grid", gridTemplateColumns:single?"1fr":"1fr 1fr", gap:single?"2rem":"5rem", width:"100%" }}>

        <div>
          <div style={fa(0.15)}><Eyebrow>Premium Interior & Furniture</Eyebrow></div>
          <div style={fa(0.3)}>
            <h1 style={{ fontFamily:S, fontSize:`clamp(2.4rem,7.5vw,5.5rem)`, color:C.text, lineHeight:1.06, margin:"0.4rem 0 1rem", fontWeight:700 }}>
              Where Space<br /><em style={{ color:C.gold }}>Becomes</em><br />Art
            </h1>
          </div>
          <div style={fa(0.45)}>
            <p style={{ fontFamily:L, fontSize:isMobile?"1rem":"1.08rem", color:C.muted, lineHeight:1.82, maxWidth:420, margin:"0 0 1.8rem" }}>
              Curated furniture for those who believe every room is a canvas — and every piece, a brushstroke of intention.
            </p>
          </div>
          <div style={{ display:"flex", gap:"0.8rem", flexWrap:"wrap", ...fa(0.6) }}>
            <button style={{ background:`linear-gradient(135deg,${C.gold},${C.dg})`, color:C.bg, border:"none", padding:"0.88rem 2rem", fontFamily:L, fontSize:"0.88rem", letterSpacing:"0.14em", textTransform:"uppercase", cursor:"pointer" }}>
              Explore Collection
            </button>
            <button onClick={() => setPage("contact")} style={{ background:"transparent", color:C.text, border:`1px solid ${C.border}`, padding:"0.88rem 1.5rem", fontFamily:L, fontSize:"0.88rem", letterSpacing:"0.12em", textTransform:"uppercase", cursor:"pointer" }}>
              Book Consultation
            </button>
          </div>
          <div style={{ display:"flex", gap:isMobile?"1.5rem":"2.5rem", marginTop:"2.5rem", paddingTop:"1.5rem", borderTop:`1px solid ${C.border}`, flexWrap:"wrap", ...fa(0.75) }}>
            {[["200+","Pieces"],["15+","Years"],["4,000+","Homes"]].map(([n,l]) => (
              <div key={l}>
                <div style={{ fontFamily:S, fontSize:isMobile?"1.6rem":"2rem", color:C.gold, lineHeight:1 }}>{n}</div>
                <div style={{ fontFamily:L, fontSize:"0.7rem", color:"rgba(200,168,130,0.48)", letterSpacing:"0.1em", textTransform:"uppercase", marginTop:3 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {!isMobile && (
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center" }}>
            <div style={{ width:"86%", aspectRatio:"3/4", border:`1px solid ${C.border}`, overflow:"hidden", position:"relative", opacity:loaded?1:0, transform:loaded?"translateY(0)":"translateY(28px)", transition:"all 1.1s cubic-bezier(0.16,1,0.3,1) 0.4s" }}>
              <img src="https://th.bing.com/th/id/OIP.RASjAYYtFo9IEk3lWGA1ngHaD4?w=330&h=180&c=7&r=0&o=7&cb=defcachec2&dpr=1.3&pid=1.7&rm=3" alt="Featured" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(18,14,10,0.52) 0%,transparent 50%)" }} />
              <div style={{ position:"absolute", top:12, left:12, width:22, height:22, borderTop:`2px solid ${C.gold}`, borderLeft:`2px solid ${C.gold}`, opacity:0.6 }} />
              <div style={{ position:"absolute", bottom:12, right:12, width:22, height:22, borderBottom:`2px solid ${C.gold}`, borderRight:`2px solid ${C.gold}`, opacity:0.6 }} />
              <div style={{ position:"absolute", bottom:18, left:18, background:"rgba(12,9,6,0.88)", backdropFilter:"blur(6px)", border:`1px solid ${C.border}`, padding:"0.45rem 0.9rem" }}>
                <div style={{ fontFamily:S, color:C.gold, fontSize:"1rem" }}>₹28,500</div>
                <div style={{ fontFamily:L, color:C.muted, fontSize:"0.68rem" }}>Aria Lounge Chair</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Categories() {
  const { isMobile, isTablet } = useScreen();
  const [ref, v] = useInView();
  const hPad = isMobile?"1.2rem":isTablet?"2rem":"4rem";
  const cols = isMobile?"1fr 1fr":isTablet?"1fr 1fr":"repeat(4,1fr)";

  return (
    <section ref={ref} style={{ background:C.bgD, padding:`${isMobile?"3rem":"5rem"} ${hPad}` }}>
      <MxW>
        <SecHead eyebrow="Browse by Room" title="Curate Your Space" />
        <div style={{ display:"grid", gridTemplateColumns:cols, gap:isMobile?"0.75rem":"1.2rem" }}>
          {categories.map((c,i) => (
            <div key={c.name} style={{
              position:"relative", overflow:"hidden", cursor:"pointer", aspectRatio:"3/4",
              border:`1px solid ${C.border}`,
              transform:v?"translateY(0)":"translateY(22px)", opacity:v?1:0,
              transition:`all 0.65s cubic-bezier(0.16,1,0.3,1) ${i*0.08}s`,
            }}>
              <img src={c.img} alt={c.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(10,7,4,0.8) 0%,rgba(10,7,4,0.05) 55%)" }} />
              <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:isMobile?"0.8rem":"1.1rem" }}>
                <h3 style={{ fontFamily:S, color:C.text, fontSize:isMobile?"0.9rem":"1.05rem", margin:"0 0 0.2rem", fontWeight:600 }}>{c.name}</h3>
                <p style={{ fontFamily:L, color:C.gold, fontSize:"0.7rem", letterSpacing:"0.08em", margin:0 }}>{c.count}</p>
              </div>
            </div>
          ))}
        </div>
      </MxW>
    </section>
  );
}

function Products() {
  const { isMobile, isTablet } = useScreen();
  const [ref, v] = useInView();
  const [hov, setHov] = useState(null);
  const [fil, setFil] = useState("All");
  const filters = ["All","Seating","Tables","Storage","Bedroom","Lighting"];
  const list = fil==="All" ? products : products.filter(p=>p.category===fil);
  const hPad = isMobile?"1.2rem":isTablet?"2rem":"4rem";
  const cols = isMobile?"1fr":isTablet?"1fr 1fr":"repeat(3,1fr)";

  return (
    <section ref={ref} style={{ background:C.bg, padding:`${isMobile?"3rem":"5rem"} ${hPad}` }}>
      <MxW>
        <SecHead eyebrow="Handpicked" title="Featured Collection" center />
        <div style={{ display:"flex", gap:"0.5rem", marginBottom:"2rem", overflowX:"auto", paddingBottom:"0.4rem", WebkitOverflowScrolling:"touch", justifyContent:isMobile?"flex-start":"center" }}>
          {filters.map(f => (
            <button key={f} onClick={()=>setFil(f)} style={{
              background:fil===f?`linear-gradient(135deg,${C.gold},${C.dg})`:"transparent",
              color:fil===f?C.bg:C.muted,
              border:fil===f?"none":`1px solid ${C.border}`,
              padding:"0.4rem 0.95rem", fontFamily:L, fontSize:"0.76rem",
              letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer",
              whiteSpace:"nowrap", flexShrink:0, transition:"all 0.25s",
            }}>{f}</button>
          ))}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:cols, gap:isMobile?"1rem":"1.5rem" }}>
          {list.map((p,i) => (
            <div key={p.id}
              onMouseEnter={()=>setHov(p.id)} onMouseLeave={()=>setHov(null)}
              style={{
                background:C.bgD,
                border:`1px solid ${hov===p.id?"rgba(200,168,130,0.38)":C.border}`,
                transform:v?(hov===p.id?"translateY(-4px)":"translateY(0)"):"translateY(26px)",
                opacity:v?1:0,
                transition:`all 0.5s cubic-bezier(0.16,1,0.3,1) ${i*0.07}s`,
                cursor:"pointer",
              }}>
              <div style={{ height:isMobile?175:215, overflow:"hidden", position:"relative", borderBottom:`1px solid ${C.border}` }}>
                <img src={p.img} alt={p.name} style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.5s", transform:hov===p.id?"scale(1.07)":"scale(1)" }} />
                <div style={{ position:"absolute", inset:0, background:hov===p.id?"rgba(10,7,4,0.06)":"rgba(10,7,4,0.25)", transition:"background 0.35s" }} />
                {p.tag && <div style={{ position:"absolute", top:10, left:10, background:p.tag==="New"?`linear-gradient(135deg,${C.gold},${C.dg})`:"rgba(10,7,4,0.8)", color:p.tag==="New"?C.bg:C.gold, border:p.tag==="New"?"none":`1px solid rgba(200,168,130,0.4)`, padding:"0.18rem 0.55rem", fontFamily:L, fontSize:"0.64rem", letterSpacing:"0.14em", textTransform:"uppercase" }}>{p.tag}<