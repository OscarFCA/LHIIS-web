
// Nav Component — LHIIS
// Sticky nav: transparent → glass on scroll. ES|EN toggle. Mobile hamburger.

const Nav = ({ lang, setLang, t }) => {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = lang === 'es'
    ? [['Servicios','#servicios'],['Cómo funciona','#ecosistema'],['Casos de éxito','#casos'],['Nosotros','#nosotros']]
    : [['Services','#servicios'],['How it works','#ecosistema'],['Case Studies','#casos'],['About','#nosotros']];

  const ctaText = lang === 'es' ? 'Agenda tu diagnóstico →' : 'Book your diagnosis →';

  const scrollTo = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      transition: 'all 0.4s ease',
      background: scrolled ? 'rgba(37,25,47,0.75)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(132,11,255,0.15)' : 'none',
      padding: '0 clamp(16px, 5vw, 60px)',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 72,
      }}>
        {/* Logo */}
        <a href="#" onClick={e => scrollTo(e, '#hero')} style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <img src="uploads/LHIISLogo.png" alt="LHIIS" style={{ height: 36, width: 36, objectFit: 'contain' }} />
          <span style={{
            fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: 20,
            background: 'linear-gradient(90deg, #840bff, #ff0060)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.02em',
          }}>LHIIS</span>
        </a>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32, flex: 1, justifyContent: 'center' }}
          className="nav-links-desktop">
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={e => scrollTo(e, href)} style={{
              fontFamily: "'Exo 2', sans-serif", fontWeight: 500, fontSize: 15,
              color: 'rgba(255,255,255,0.75)', textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.target.style.color = '#fff'}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.75)'}
            >{label}</a>
          ))}
        </div>

        {/* Right: lang toggle + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }} className="nav-right-desktop">
          {/* Lang toggle */}
          <div style={{
            display: 'flex', alignItems: 'center',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.10)',
            borderRadius: 8, overflow: 'hidden',
          }}>
            {['es','en'].map(l => (
              <button key={l} onClick={() => setLang(l)} style={{
                fontFamily: "'Exo 2', sans-serif", fontWeight: 600, fontSize: 13,
                padding: '5px 12px', border: 'none', cursor: 'pointer',
                background: lang === l ? 'rgba(132,11,255,0.4)' : 'transparent',
                color: lang === l ? '#fff' : 'rgba(255,255,255,0.5)',
                transition: 'all 0.2s', textTransform: 'uppercase', letterSpacing: '0.05em',
              }}>{l}</button>
            ))}
          </div>

          {/* CTA */}
          <a href="#contacto" onClick={e => scrollTo(e, '#contacto')} style={{
            fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: 14,
            background: 'linear-gradient(90deg, #840bff, #ff0060)',
            color: '#fff', textDecoration: 'none',
            padding: '10px 20px', borderRadius: 10,
            boxShadow: '0 0 20px rgba(132,11,255,0.35)',
            transition: 'all 0.2s', whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => { e.target.style.boxShadow = '0 0 30px rgba(255,0,96,0.5)'; e.target.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={e => { e.target.style.boxShadow = '0 0 20px rgba(132,11,255,0.35)'; e.target.style.transform = 'translateY(0)'; }}
          >{ctaText}</a>
        </div>

        {/* Hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="nav-hamburger" style={{
          display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 8,
          flexDirection: 'column', gap: 5,
        }}>
          {[0,1,2].map(i => (
            <span key={i} style={{
              display: 'block', width: 24, height: 2,
              background: menuOpen && i === 1 ? 'transparent' : '#fff',
              borderRadius: 2, transition: 'all 0.3s',
              transform: menuOpen ? (i === 0 ? 'rotate(45deg) translate(5px, 5px)' : i === 2 ? 'rotate(-45deg) translate(5px, -5px)' : 'none') : 'none',
            }} />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background: 'rgba(37,25,47,0.97)', backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(132,11,255,0.2)',
          padding: '24px clamp(16px,5vw,60px)',
          display: 'flex', flexDirection: 'column', gap: 20,
        }}>
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={e => scrollTo(e, href)} style={{
              fontFamily: "'Exo 2', sans-serif", fontWeight: 600, fontSize: 18,
              color: '#fff', textDecoration: 'none',
            }}>{label}</a>
          ))}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 8 }}>
            <div style={{ display: 'flex', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, overflow: 'hidden' }}>
              {['es','en'].map(l => (
                <button key={l} onClick={() => setLang(l)} style={{
                  fontFamily: "'Exo 2', sans-serif", fontWeight: 600, fontSize: 13,
                  padding: '6px 14px', border: 'none', cursor: 'pointer',
                  background: lang === l ? 'rgba(132,11,255,0.4)' : 'transparent',
                  color: lang === l ? '#fff' : 'rgba(255,255,255,0.5)',
                  textTransform: 'uppercase',
                }}>{l}</button>
              ))}
            </div>
            <a href="#contacto" onClick={e => scrollTo(e, '#contacto')} style={{
              fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: 14,
              background: 'linear-gradient(90deg, #840bff, #ff0060)',
              color: '#fff', textDecoration: 'none',
              padding: '10px 20px', borderRadius: 10,
            }}>{ctaText}</a>
          </div>
        </div>
      )}
    </nav>
  );
};

Object.assign(window, { Nav });
