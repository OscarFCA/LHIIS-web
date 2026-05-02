
// Hero Section — LHIIS
// Particles canvas + glass subtitle card + hero metrics

const Hero = ({ lang }) => {
  const canvasRef = React.useRef(null);
  const animRef   = React.useRef(null);

  // Particle system
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = canvas.width  = canvas.offsetWidth;
    let H = canvas.height = canvas.offsetHeight;

    const particles = Array.from({ length: 90 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.4 + 0.1,
      color: Math.random() > 0.5 ? '#840bff' : '#ff0060',
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(132,11,255,${0.12 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      });
      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener('resize', onResize); };
  }, []);

  const es = {
    eyebrow: 'Más clientes, el mismo equipo. Sí, es posible.',
    h1a: 'Un empleado te cuesta',
    h1b: '$200,000 al año.',
    h1c: 'Y los leads se siguen',
    h1d: 'enfriando.',
    sub: 'En LHIIS implementamos agentes de IA, chatbots y sistemas a medida que hacen el trabajo repetitivo de tu equipo — sin rotación, sin IMSS, sin que se vayan a la competencia.',
    sub2: 'Tu operación funcionando 24/7, aunque tú no estés.',
    cta1: 'Agenda tu diagnóstico gratuito →',
    cta2: 'Ver casos de éxito ↓',
    metrics: [
      { num: '24/7', label: 'Operación continua', color: '#840bff' },
      { num: '+40%', label: 'Conversión en ventas', color: '#ff0060' },
      { num: '-90%', label: 'Tiempo por cliente', color: '#840bff' },
      { num: '1000+', label: 'Usuarios capacitados', color: '#ff0060' },
    ],
  };
  const en = {
    eyebrow: "More clients, same team. Yes, it's possible.",
    h1a: 'An employee costs you',
    h1b: '$10,000/year.',
    h1c: 'And leads are still',
    h1d: 'going cold.',
    sub: "At LHIIS we implement AI agents, chatbots and custom systems that do your team's work — without turnover, without payroll taxes, without leaving for a competitor.",
    sub2: "Your operation running 24/7, even when you're not there.",
    cta1: 'Book your free diagnosis →',
    cta2: 'See case studies ↓',
    metrics: [
      { num: '24/7', label: 'Continuous operation', color: '#840bff' },
      { num: '+40%', label: 'Sales conversion', color: '#ff0060' },
      { num: '-90%', label: 'Time per client', color: '#840bff' },
      { num: '1000+', label: 'Users trained', color: '#ff0060' },
    ],
  };
  const c = lang === 'es' ? es : en;

  return (
    <section id="hero" className="hero">
      {/* Canvas */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />

      {/* Glow orbs */}
      <div style={{ position: 'absolute', top: '8%', left: '12%', width: 520, height: 520, borderRadius: '50%', background: 'radial-gradient(circle, rgba(132,11,255,0.16) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '8%', right: '8%', width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,0,96,0.12) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

      {/* Content */}
      <div className="hero-content" style={{ padding: '0 clamp(16px,5vw,60px)' }}>
        <div style={{ maxWidth: 760 }}>
          {/* Eyebrow */}
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-dot" />
            <span className="hero-eyebrow-text">{c.eyebrow}</span>
          </div>

          {/* Headline */}
          <h1 className="hero-h1">
            <span className="hero-h1-plain">{c.h1a}</span>
            <span className="hero-h1-accent">{c.h1b}</span>
            <span className="hero-h1-plain">{c.h1c}</span>
            <span className="hero-h1-dim">{c.h1d}</span>
          </h1>

          {/* Glass subtitle */}
          <div className="hero-glass-sub">
            <p className="hero-sub-text">{c.sub}</p>
            <p className="hero-sub-strong">{c.sub2}</p>
          </div>

          {/* CTAs */}
          <div className="hero-ctas">
            <a href="#contacto" className="btn-primary btn-halo btn-lg"
              onClick={e => { e.preventDefault(); const root = document.getElementById('page-root'); const el = document.querySelector('#contacto'); if (el && root) root.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' }); }}
            >{c.cta1}</a>
            <a href="#casos" className="btn-secondary btn-lg"
              onClick={e => { e.preventDefault(); const root = document.getElementById('page-root'); const el = document.querySelector('#casos'); if (el && root) root.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' }); }}
            >{c.cta2}</a>
          </div>
        </div>

        {/* Floating metrics */}
        <div className="hero-metrics">
          {c.metrics.map((m, i) => (
            <div key={i} className="hero-metric-card"
              style={{ borderLeft: `2px solid ${m.color}`, boxShadow: `0 8px 32px rgba(0,0,0,0.3), 0 0 20px ${m.color}22` }}>
              <div className="hero-metric-num" style={{ color: m.color }}>{m.num}</div>
              <div className="hero-metric-label">{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll">
        <span className="hero-scroll-text">Scroll</span>
        <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, rgba(132,11,255,0.6), transparent)' }} />
      </div>
    </section>
  );
};

Object.assign(window, { Hero });
