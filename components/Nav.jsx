
// Nav Component — LHIIS
// Sticky nav: transparent → glass on scroll. ES|EN toggle. Side drawer mobile.

const Nav = ({ lang, setLang }) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const links = lang === 'es'
    ? [['Servicios','#servicios'],['Cómo funciona','#ecosistema'],['Casos de éxito','#casos'],['Nosotros','#nosotros']]
    : [['Services','#ecosistema'],['How it works','#ecosistema'],['Case Studies','#casos'],['About','#nosotros']];

  const ctaText = lang === 'es' ? 'Agenda tu diagnóstico →' : 'Book your diagnosis →';

  const scrollTo = (id) => {
    setDrawerOpen(false);
    const root = document.getElementById('page-root');
    const el = document.querySelector(id);
    if (el && root) root.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' });
  };

  return (
    <>
      <nav id="main-nav" className="nav">
        <div className="nav-inner">
          {/* Logo */}
          <a href="#hero" className="nav-logo" onClick={e => { e.preventDefault(); scrollTo('#hero'); }}>
            <img src="uploads/LHIISLogo.png" alt="LHIIS" style={{ height: 32, width: 32, objectFit: 'contain' }} />
            <span className="nav-name grad-text">LHIIS</span>
          </a>

          {/* Desktop links */}
          <nav className="nav-links">
            {links.map(([label, href]) => (
              <a key={href} href={href} className="nav-link"
                onClick={e => { e.preventDefault(); scrollTo(href); }}>{label}</a>
            ))}
          </nav>

          {/* Right: lang + CTA */}
          <div className="nav-actions">
            <div className="lang-toggle">
              {['es','en'].map(l => (
                <button key={l} onClick={() => setLang(l)}
                  className={`lang-btn${lang === l ? ' active' : ''}`}>{l}</button>
              ))}
            </div>
            <a href="#contacto" className="btn-primary btn-sm"
              onClick={e => { e.preventDefault(); scrollTo('#contacto'); }}
              style={{ whiteSpace: 'nowrap' }}>{ctaText}</a>
          </div>

          {/* Hamburger */}
          <button onClick={() => setDrawerOpen(true)} className="nav-hamburger" aria-label="Menu">
            <span className="ham-bar" />
            <span className="ham-bar" />
            <span className="ham-bar" />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <div className="nav-drawer">
          <div className="nav-drawer-overlay" onClick={() => setDrawerOpen(false)} />
          <div className="nav-drawer-panel">
            <button className="drawer-close" onClick={() => setDrawerOpen(false)}>×</button>

            <div className="drawer-links">
              {links.map(([label, href]) => (
                <a key={href} href={href} className="drawer-link"
                  onClick={e => { e.preventDefault(); scrollTo(href); }}>{label}</a>
              ))}
            </div>

            <div className="drawer-footer">
              <div className="drawer-lang">
                {['es','en'].map(l => (
                  <button key={l} onClick={() => setLang(l)}
                    className={`drawer-lang-btn${lang === l ? ' active' : ''}`}>{l}</button>
                ))}
              </div>
              <a href="#contacto" className="btn-primary drawer-cta"
                onClick={e => { e.preventDefault(); scrollTo('#contacto'); }}>{ctaText}</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

Object.assign(window, { Nav });
