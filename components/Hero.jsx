
// Hero Section — LHIIS
// Particles canvas + glass card overlay + gradient headline

const Hero = ({ lang }) => {
  const canvasRef = React.useRef(null);
  const animRef = React.useRef(null);

  // Particle system
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = canvas.width = canvas.offsetWidth;
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
      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(132,11,255,${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      // Draw particles
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

    const onResize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  };

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
  };
  const en = {
    eyebrow: 'More clients, same team. Yes, it\'s possible.',
    h1a: 'An employee costs you',
    h1b: '$10,000/year.',
    h1c: 'And leads are still',
    h1d: 'going cold.',
    sub: 'At LHIIS we implement AI agents, chatbots and custom systems that do your team\'s work — without turnover, without payroll taxes, without leaving for a competitor.',
    sub2: 'Your operation running 24/7, even when you\'re not there.',
    cta1: 'Book your free diagnosis →',
    cta2: 'See case studies ↓',
  };
  const c = lang === 'es' ? es : en;

  return (
    <section id="hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', paddingTop: 72 }}>
      {/* Canvas */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />

      {/* Glow orbs */}
      <div style={{ position: 'absolute', top: '10%', left: '15%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(132,11,255,0.18) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,0,96,0.15) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '40%', right: '25%', width: 250, height: 250, borderRadius: '50%', background: 'radial-gradient(circle, rgba(132,11,255,0.10) 0%, transparent 70%)', filter: 'blur(30px)', pointerEvents: 'none' }} />

      {/* Content */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px clamp(16px,5vw,60px)', position: 'relative', zIndex: 1, width: '100%' }}>
        <div style={{ maxWidth: 780 }}>
          {/* Eyebrow */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(132,11,255,0.12)', border: '1px solid rgba(132,11,255,0.3)',
            borderRadius: 100, padding: '6px 16px', marginBottom: 32,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'linear-gradient(90deg,#840bff,#ff0060)', display: 'inline-block' }} />
            <span style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.8)', letterSpacing: '0.03em' }}>{c.eyebrow}</span>
          </div>

          {/* Headline */}
          <h1 style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 800, lineHeight: 1.08, margin: '0 0 28px', letterSpacing: '-0.03em' }}>
            <span style={{ display: 'block', fontSize: 'clamp(40px,5.5vw,72px)', color: '#fff' }}>{c.h1a}</span>
            <span style={{ display: 'block', fontSize: 'clamp(48px,6.5vw,84px)', background: 'linear-gradient(90deg,#840bff,#ff0060)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{c.h1b}</span>
            <span style={{ display: 'block', fontSize: 'clamp(40px,5.5vw,72px)', color: '#fff' }}>{c.h1c}</span>
            <span style={{ display: 'block', fontSize: 'clamp(40px,5.5vw,72px)', color: 'rgba(255,255,255,0.45)' }}>{c.h1d}</span>
          </h1>

          {/* Subtitle glass card */}
          <div style={{
            background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16,
            padding: '24px 28px', marginBottom: 40, maxWidth: 640,
          }}>
            <p style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 'clamp(15px,1.3vw,18px)', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, margin: '0 0 12px' }}>{c.sub}</p>
            <p style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 'clamp(15px,1.3vw,18px)', color: '#fff', lineHeight: 1.7, margin: 0, fontWeight: 600 }}>{c.sub2}</p>
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <a href="#contacto" onClick={e => { e.preventDefault(); scrollTo('#contacto'); }} style={{
              fontFamily: "'Exo 2',sans-serif", fontWeight: 700, fontSize: 16,
              background: 'linear-gradient(90deg,#840bff,#ff0060)',
              color: '#fff', textDecoration: 'none',
              padding: '14px 28px', borderRadius: 12,
              boxShadow: '0 0 30px rgba(132,11,255,0.4)',
              transition: 'all 0.25s',
              display: 'inline-block',
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 50px rgba(255,0,96,0.5)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 30px rgba(132,11,255,0.4)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >{c.cta1}</a>

            <a href="#casos" onClick={e => { e.preventDefault(); scrollTo('#casos'); }} style={{
              fontFamily: "'Exo 2',sans-serif", fontWeight: 600, fontSize: 16,
              color: 'rgba(255,255,255,0.7)',
              background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.12)',
              textDecoration: 'none', padding: '14px 28px', borderRadius: 12,
              transition: 'all 0.25s', display: 'inline-block',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(132,11,255,0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
            >{c.cta2}</a>
          </div>
        </div>

        {/* Floating metrics glass cards */}
        <div style={{
          position: 'absolute', right: 'clamp(16px,5vw,60px)', top: '50%', transform: 'translateY(-50%)',
          display: 'flex', flexDirection: 'column', gap: 16,
        }} className="hero-metrics">
          {[
            { num: '24/7', label: lang === 'es' ? 'Operación continua' : 'Continuous operation', color: '#840bff' },
            { num: '+40%', label: lang === 'es' ? 'Conversión en ventas' : 'Sales conversion', color: '#ff0060' },
            { num: '-90%', label: lang === 'es' ? 'Tiempo por cliente' : 'Time per client', color: '#840bff' },
            { num: '1000+', label: lang === 'es' ? 'Usuarios capacitados' : 'Users trained', color: '#ff0060' },
          ].map((m, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.09)',
              borderLeft: `2px solid ${m.color}`,
              borderRadius: 12, padding: '14px 20px', minWidth: 170,
              boxShadow: `0 8px 32px rgba(0,0,0,0.3), 0 0 20px ${m.color}22`,
              transition: 'transform 0.2s',
              cursor: 'default',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateX(-4px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}
            >
              <div style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 800, fontSize: 28, color: m.color, lineHeight: 1 }}>{m.num}</div>
              <div style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.55)', marginTop: 4 }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        animation: 'bounce 2s infinite',
      }}>
        <span style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Scroll</span>
        <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, rgba(132,11,255,0.6), transparent)' }} />
      </div>
    </section>
  );
};

Object.assign(window, { Hero });
