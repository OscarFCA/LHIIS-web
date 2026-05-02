
// All middle sections: Problem, Services, Ecosystem, ROI, Cases, HowWeWork, About
// Each exported to window

// ─── Shared helpers ───────────────────────────────────────────────
const useReveal = () => {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.12 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
};

const SectionLabel = ({ text }) => (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(132,11,255,0.10)', border: '1px solid rgba(132,11,255,0.25)', borderRadius: 100, padding: '5px 14px', marginBottom: 20 }}>
    <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'linear-gradient(90deg,#840bff,#ff0060)', display: 'inline-block' }} />
    <span style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{text}</span>
  </div>
);

const SectionHeadline = ({ children, style }) => (
  <h2 style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 800, fontSize: 'clamp(30px,3.5vw,52px)', color: '#fff', lineHeight: 1.1, letterSpacing: '-0.025em', margin: '0 0 20px', ...style }}>{children}</h2>
);

const GlassCard = ({ children, style, onMouseEnter, onMouseLeave }) => (
  <div style={{
    background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16,
    transition: 'all 0.25s', ...style,
  }} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>{children}</div>
);

const scrollTo = (id) => {
  const el = document.querySelector(id);
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
};

// ─── S2: El Problema ──────────────────────────────────────────────
const ProblemSection = ({ lang }) => {
  const [ref, visible] = useReveal();
  const pains_es = [
    { icon: '⏰', title: '"Respondemos cuando podemos"', text: 'Tus clientes preguntan a las 9pm. Tu equipo responde al día siguiente. Para entonces, ya compraron con alguien más.' },
    { icon: '🔄', title: 'Rotación que nunca para', text: 'Contratas, capacitas, confías. Se van. Vuelves a contratar. El costo no es solo el sueldo — es todo lo que se llevan con ellos.' },
    { icon: '📊', title: 'Reportes que nadie lee', text: 'Tu equipo pasa horas capturando datos en Excel que nadie usa para decidir nada. Esas horas podrían estar en clientes.' },
    { icon: '📉', title: 'Leads que se enfrían', text: 'Tienes tráfico, tienes interesados. Pero entre el primer contacto y el seguimiento pasan días. Y en días, un lead frío ya es un cliente de tu competencia.' },
    { icon: '🧠', title: 'Todo vive en la cabeza de alguien', text: 'Hay procesos críticos que solo una persona sabe ejecutar. Si esa persona falta, el proceso falla. Eso no es una empresa — es una dependencia.' },
    { icon: '⚡', title: 'Crecer duele', text: 'Cada cliente nuevo significa más trabajo manual para el equipo. Escalar debería dar más margen, no más carga. Algo está mal en el modelo.' },
  ];
  const pains_en = [
    { icon: '⏰', title: '"We\'ll respond when we can"', text: 'Your customers ask at 9pm. Your team responds the next morning. By then, they\'ve already bought from someone else.' },
    { icon: '🔄', title: 'Turnover that never stops', text: 'You hire, you train, you trust. They leave. You hire again. The cost isn\'t just the salary — it\'s everything they take with them.' },
    { icon: '📊', title: 'Reports nobody reads', text: 'Your team spends hours logging data into spreadsheets nobody uses to decide anything. Those hours could be spent on clients.' },
    { icon: '📉', title: 'Leads going cold', text: 'You have traffic, you have interested people. But between first contact and follow-up, days pass. And in days, a cold lead is already a competitor\'s customer.' },
    { icon: '🧠', title: 'Everything lives in one person\'s head', text: 'Critical processes only one person knows how to run. If they\'re out, the process breaks. That\'s not a company — that\'s a dependency.' },
    { icon: '⚡', title: 'Growth hurts', text: 'Every new client means more manual work for the team. Scaling should increase your margin, not your workload. Something\'s wrong with the model.' },
  ];
  const pains = lang === 'es' ? pains_es : pains_en;
  const c = lang === 'es'
    ? { eyebrow: '¿Te suena familiar?', h: 'Tu equipo es bueno.\nEl problema es lo que\nles estás pidiendo que hagan.', close: 'Estos no son problemas de personas.\nSon problemas de sistemas.\nY los sistemas se pueden cambiar.' }
    : { eyebrow: 'Sound familiar?', h: 'Your team is good.\nThe problem is what\nyou\'re asking them to do.', close: 'These aren\'t people problems.\nThey\'re systems problems.\nAnd systems can be fixed.' };

  return (
    <section id="problema" style={{ padding: '120px clamp(16px,5vw,60px)', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '20%', right: 0, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,0,96,0.08) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div ref={ref} style={{ maxWidth: 1280, margin: '0 auto', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(40px)', transition: 'all 0.7s ease' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <SectionLabel text={c.eyebrow} />
          <SectionHeadline style={{ maxWidth: 600, margin: '0 auto 0' }}>
            {c.h.split('\n').map((line, i) => <span key={i} style={{ display: 'block' }}>{line}</span>)}
          </SectionHeadline>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
          {pains.map((p, i) => (
            <GlassCard key={i} style={{ padding: '28px 24px', cursor: 'default' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(132,11,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(132,11,255,0.25)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{p.icon}</div>
              <h3 style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 700, fontSize: 17, color: '#fff', margin: '0 0 10px', lineHeight: 1.3 }}>{p.title}</h3>
              <p style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, margin: 0 }}>{p.text}</p>
            </GlassCard>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 64 }}>
          <GlassCard style={{ display: 'inline-block', padding: '28px 48px', borderColor: 'rgba(132,11,255,0.2)' }}>
            {c.close.split('\n').map((line, i) => (
              <p key={i} style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 'clamp(16px,1.4vw,20px)', color: i === 2 ? '#fff' : 'rgba(255,255,255,0.7)', fontWeight: i === 2 ? 700 : 400, margin: i === 0 ? 0 : '4px 0 0', lineHeight: 1.5 }}>{line}</p>
            ))}
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

// ─── S3: Servicios ────────────────────────────────────────────────
const ServicesSection = ({ lang }) => {
  const [ref, visible] = useReveal();
  const es = {
    eyebrow: 'Nuestros servicios', h: 'Tres formas de digitalizar\ntu operación con IA',
    note: '¿No sabes cuál necesitas? El diagnóstico gratuito te ayuda a saberlo en 30 minutos.',
    noteLink: '→ Agendar diagnóstico',
    services: [
      { featured: true, label: '● El más solicitado', name: 'Agentes de IA y Chatbots', desc: 'Sistemas inteligentes que atienden, califican, agendan y venden por WhatsApp, redes sociales y llamada — sin intervención humana.', items: ['Chatbot de IA por texto y audio', 'Asistente de voz con IA', 'Integración con WhatsApp Business API', 'CRM / HUB de gestión de clientes'], delivery: '7 – 30 días hábiles', cta: 'Quiero un agente de IA →' },
      { featured: false, name: 'Desarrollo a la Medida + IA', desc: 'Sistemas personalizados para operaciones complejas que ninguna herramienta genérica puede resolver. Desarrollamos desde cero con IA integrada.', items: ['Plataformas web y apps híbridas / nativas', 'Firma digital, validación de documentos y más', 'Dashboards interactivos y reportes automáticos', 'IA para análisis, decisiones y respuestas personalizadas'], delivery: '45 – 132 días hábiles', cta: 'Cuéntame tu proyecto →' },
      { featured: false, name: 'Presencia Digital y Funnels', desc: 'Sitios web, tiendas en línea y funnels con IA integrada. No solo una página — un ecosistema que atrae, convierte y retiene clientes de forma automatizada.', items: ['Página web No-Code o Escalable', 'E-Commerce (Shopify / WooCommerce)', 'Funnel con agente de IA integrado', 'Soporte y mantenimiento mensual'], delivery: '30 – 45 días hábiles', cta: 'Ver opciones →' },
    ],
  };
  const en = {
    eyebrow: 'Our services', h: 'Three ways to digitize\nyour operation with AI',
    note: 'Not sure which one you need? The free diagnosis helps you figure it out in 30 minutes.',
    noteLink: '→ Book diagnosis',
    services: [
      { featured: true, label: '● Most requested', name: 'AI Agents & Chatbots', desc: 'Intelligent systems that attend, qualify, schedule and sell through WhatsApp, social media and phone calls — without human intervention.', items: ['AI chatbot (text and audio)', 'AI voice assistant', 'WhatsApp Business API integration', 'CRM / client management HUB'], delivery: '7 – 30 business days', cta: 'I want an AI agent →' },
      { featured: false, name: 'Custom Development + AI', desc: 'Custom systems for complex operations that no generic tool can solve. We build from scratch with AI integrated from day one.', items: ['Web platforms and hybrid / native apps', 'Digital signatures, document validation and more', 'Interactive dashboards and automated reports', 'AI for analysis, decisions and personalized responses'], delivery: '45 – 132 business days', cta: 'Tell me about your project →' },
      { featured: false, name: 'Digital Presence & Funnels', desc: 'Websites, online stores and AI-powered funnels. Not just a page — an ecosystem that attracts, converts and retains customers automatically.', items: ['No-Code or Scalable website', 'E-Commerce (Shopify / WooCommerce)', 'Funnel with integrated AI agent', 'Monthly support and maintenance'], delivery: '30 – 45 business days', cta: 'See options →' },
    ],
  };
  const c = lang === 'es' ? es : en;

  return (
    <section id="servicios" style={{ padding: '120px clamp(16px,5vw,60px)', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: '10%', width: 600, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(132,11,255,0.07) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div ref={ref} style={{ maxWidth: 1280, margin: '0 auto', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(40px)', transition: 'all 0.7s ease' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <SectionLabel text={c.eyebrow} />
          <SectionHeadline style={{ maxWidth: 540, margin: '0 auto' }}>
            {c.h.split('\n').map((l, i) => <span key={i} style={{ display: 'block' }}>{l}</span>)}
          </SectionHeadline>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {c.services.map((svc, i) => (
            <div key={i} style={{
              background: svc.featured ? 'rgba(132,11,255,0.08)' : 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(20px)',
              border: svc.featured ? '1px solid rgba(132,11,255,0.35)' : '1px solid rgba(255,255,255,0.07)',
              borderRadius: 20, padding: '32px 28px',
              position: 'relative', overflow: 'hidden',
              transition: 'all 0.25s',
              boxShadow: svc.featured ? '0 0 40px rgba(132,11,255,0.12)' : 'none',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = svc.featured ? '0 20px 60px rgba(132,11,255,0.2)' : '0 20px 60px rgba(0,0,0,0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = svc.featured ? '0 0 40px rgba(132,11,255,0.12)' : 'none'; }}>
              {svc.featured && (
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,#840bff,#ff0060)' }} />
              )}
              {svc.label && (
                <div style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 11, fontWeight: 700, color: '#840bff', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 12 }}>{svc.label}</div>
              )}
              <h3 style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 800, fontSize: 22, color: '#fff', margin: '0 0 12px', lineHeight: 1.2 }}>{svc.name}</h3>
              <p style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, margin: '0 0 24px' }}>{svc.desc}</p>
              <ul style={{ listStyle: 'none', margin: '0 0 24px', padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {svc.items.map((item, j) => (
                  <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <span style={{ width: 16, height: 16, borderRadius: '50%', background: 'linear-gradient(135deg,#840bff,#ff0060)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2, fontSize: 9, color: '#fff', fontWeight: 700 }}>✓</span>
                    <span style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.75)' }}>{item}</span>
                  </li>
                ))}
              </ul>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
                  {lang === 'es' ? 'Cotización a la medida · Entrega:' : 'Custom quote · Delivery:'} <strong style={{ color: 'rgba(255,255,255,0.7)' }}>{svc.delivery}</strong>
                </div>
                <a href="#contacto" onClick={e => { e.preventDefault(); scrollTo('#contacto'); }} style={{
                  fontFamily: "'Exo 2',sans-serif", fontWeight: 700, fontSize: 14,
                  background: svc.featured ? 'linear-gradient(90deg,#840bff,#ff0060)' : 'rgba(132,11,255,0.15)',
                  border: svc.featured ? 'none' : '1px solid rgba(132,11,255,0.3)',
                  color: '#fff', textDecoration: 'none', padding: '12px 20px',
                  borderRadius: 10, display: 'inline-block', transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
                >{svc.cta}</a>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <GlassCard style={{ display: 'inline-block', padding: '20px 36px', borderColor: 'rgba(255,255,255,0.08)' }}>
            <p style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 15, color: 'rgba(255,255,255,0.65)', margin: '0 0 8px' }}>{c.note}</p>
            <a href="#contacto" onClick={e => { e.preventDefault(); scrollTo('#contacto'); }} style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 700, fontSize: 14, background: 'linear-gradient(90deg,#840bff,#ff0060)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textDecoration: 'none' }}>{c.noteLink}</a>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

// ─── S4: Ecosistema (animated diagram) ────────────────────────────
const EcosystemSection = ({ lang }) => {
  const [ref, visible] = useReveal();
  const svgRef = React.useRef(null);
  const [activeNode, setActiveNode] = React.useState(null);

  const nodes = [
    { id: 'lead', x: 120, y: 60, label: lang === 'es' ? 'Lead entra\nWhatsApp' : 'Lead enters\nWhatsApp', color: '#840bff' },
    { id: 'agent', x: 320, y: 60, label: lang === 'es' ? 'Agente de\nAtención' : 'Attention\nAgent', color: '#9b1cf7' },
    { id: 'crm', x: 520, y: 60, label: 'CRM / HUB', color: '#b020ef' },
    { id: 'qualify', x: 320, y: 180, label: lang === 'es' ? 'Califica\nal lead' : 'Qualifies\nthe lead', color: '#c828e0' },
    { id: 'schedule', x: 120, y: 300, label: lang === 'es' ? 'Agenda cita\nautomática' : 'Auto-schedules\nappointment', color: '#d930c8' },
    { id: 'notify', x: 520, y: 180, label: lang === 'es' ? 'Notifica al\nequipo' : 'Notifies\nteam', color: '#e83ab0' },
    { id: 'follow', x: 320, y: 300, label: lang === 'es' ? 'Agente de\nSeguimiento' : 'Follow-up\nAgent', color: '#f04298' },
    { id: 'close', x: 120, y: 420, label: lang === 'es' ? 'Cierre o\nReactivación' : 'Close or\nReactivation', color: '#f84a80' },
    { id: 'dash', x: 520, y: 300, label: lang === 'es' ? 'Dashboard\nMétricas' : 'Dashboard\nMetrics', color: '#ff0060' },
  ];

  const edges = [
    ['lead','agent'],['agent','crm'],['agent','qualify'],['crm','notify'],
    ['qualify','schedule'],['qualify','follow'],['notify','dash'],
    ['schedule','close'],['follow','close'],['follow','dash'],
  ];

  const c = lang === 'es'
    ? { eyebrow: 'Cómo funciona', h: 'No es un chatbot.\nEs un ecosistema que trabaja\nmientras tú construyes tu empresa.', desc: 'Los agentes de IA que implementamos no trabajan solos. Se conectan entre sí, con tus herramientas actuales y con tu equipo — creando un sistema que aprende, actúa y escala con tu negocio.', close: 'Cada pieza del ecosistema puede implementarse por etapas. Empiezas donde más duele. El sistema crece contigo.' }
    : { eyebrow: 'How it works', h: 'It\'s not a chatbot.\nIt\'s an ecosystem that works\nwhile you build your business.', desc: 'The AI agents we implement don\'t work alone. They connect with each other, with your existing tools and with your team — creating a system that learns, acts and scales with your business.', close: 'Every piece of the ecosystem can be implemented in stages. You start where it hurts most. The system grows with you.' };

  return (
    <section id="ecosistema" style={{ padding: '120px clamp(16px,5vw,60px)', position: 'relative', background: 'rgba(132,11,255,0.03)' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 0%, rgba(132,11,255,0.04) 50%, transparent 100%)', pointerEvents: 'none' }} />
      <div ref={ref} style={{ maxWidth: 1280, margin: '0 auto', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(40px)', transition: 'all 0.7s ease' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} className="ecosystem-grid">
          <div>
            <SectionLabel text={c.eyebrow} />
            <SectionHeadline>
              {c.h.split('\n').map((l, i) => <span key={i} style={{ display: 'block', ...(i === 1 ? { background: 'linear-gradient(90deg,#840bff,#ff0060)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' } : {}) }}>{l}</span>)}
            </SectionHeadline>
            <p style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 16, color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, margin: '0 0 32px' }}>{c.desc}</p>
            <GlassCard style={{ padding: '20px 24px', borderLeft: '2px solid #840bff' }}>
              <p style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, margin: 0, fontStyle: 'italic' }}>{c.close}</p>
            </GlassCard>
          </div>

          {/* SVG Diagram */}
          <div style={{ position: 'relative' }}>
            <GlassCard style={{ padding: 24, overflow: 'hidden' }}>
              <svg ref={svgRef} viewBox="0 0 640 500" style={{ width: '100%', height: 'auto' }}>
                <defs>
                  <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#840bff" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#ff0060" stopOpacity="0.6" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>

                {/* Edges */}
                {edges.map(([a, b], i) => {
                  const na = nodes.find(n => n.id === a);
                  const nb = nodes.find(n => n.id === b);
                  const isActive = activeNode === a || activeNode === b;
                  return (
                    <line key={i}
                      x1={na.x + 48} y1={na.y + 24} x2={nb.x + 48} y2={nb.y + 24}
                      stroke="url(#lineGrad)" strokeWidth={isActive ? 2 : 1}
                      strokeDasharray={visible ? 'none' : '4 4'}
                      opacity={activeNode && !isActive ? 0.2 : 0.7}
                      style={{ transition: 'all 0.3s' }}
                    />
                  );
                })}

                {/* Animated dots on lines */}
                {visible && edges.slice(0, 4).map(([a, b], i) => {
                  const na = nodes.find(n => n.id === a);
                  const nb = nodes.find(n => n.id === b);
                  return (
                    <circle key={`dot-${i}`} r={3} fill="#ff0060" opacity={0.8} filter="url(#glow)">
                      <animateMotion dur={`${2 + i * 0.5}s`} repeatCount="indefinite">
                        <mpath href={`#path-${i}`} />
                      </animateMotion>
                    </circle>
                  );
                })}

                {/* Nodes */}
                {nodes.map((node) => {
                  const isActive = activeNode === node.id;
                  return (
                    <g key={node.id} transform={`translate(${node.x}, ${node.y})`}
                      onMouseEnter={() => setActiveNode(node.id)}
                      onMouseLeave={() => setActiveNode(null)}
                      style={{ cursor: 'pointer' }}>
                      <rect x={0} y={0} width={96} height={48} rx={10}
                        fill={isActive ? node.color : 'rgba(255,255,255,0.05)'}
                        stroke={node.color} strokeWidth={isActive ? 2 : 1}
                        filter={isActive ? 'url(#glow)' : 'none'}
                        style={{ transition: 'all 0.2s' }}
                      />
                      {node.label.split('\n').map((line, li) => (
                        <text key={li} x={48} y={li === 0 ? 18 : 34} textAnchor="middle"
                          fill={isActive ? '#fff' : 'rgba(255,255,255,0.8)'}
                          fontSize={9.5} fontFamily="'Exo 2', sans-serif" fontWeight={600}>
                          {line}
                        </text>
                      ))}
                    </g>
                  );
                })}
              </svg>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── S5: ROI Calculator (Placeholder) ─────────────────────────────
const ROISection = ({ lang }) => {
  const [ref, visible] = useReveal();
  const [people, setPeople] = React.useState(3);
  const [salary, setSalary] = React.useState(15000);
  const [leads, setLeads] = React.useState(50);

  // ROI formula (placeholder logic — to be validated by client)
  // currentCost = people * salary * 12 + (overhead 35%)
  // lhiisImplementation = base 80000 + (people * 15000)
  // savedLeads = leads * 12 * avgTicket(5000)
  // savings = currentCost * 0.6 + savedLeads - lhiisImplementation
  const avgTicket = lang === 'es' ? 5000 : 250;
  const currency = lang === 'es' ? 'MXN' : 'USD';
  const salaryCap = lang === 'es' ? 30000 : 1500;
  const salaryMin = lang === 'es' ? 8000 : 400;
  const implBase = lang === 'es' ? 80000 : 4000;

  const currentCost = Math.round(people * salary * 12 * 1.35);
  const impl = Math.round(implBase + people * (lang === 'es' ? 15000 : 750));
  const savedLeads = Math.round(leads * 12 * avgTicket * 0.3);
  const savings12 = Math.round(currentCost * 0.6 + savedLeads - impl);
  const months = savings12 > 0 ? Math.round(impl / (savings12 / 12)) : '—';
  const fmt = (n) => n.toLocaleString(lang === 'es' ? 'es-MX' : 'en-US');

  const c = lang === 'es'
    ? { eyebrow: 'Calcula tu ahorro', h: '¿Cuánto te está costando\nno automatizar?', instr: 'Mueve los controles y ve el impacto en tiempo real.', l1: '¿Cuántas personas hacen tareas repetitivas?', l2: '¿Cuál es su salario promedio mensual?', l3: '¿Cuántos leads pierdes al mes por respuesta lenta?', o1: 'Lo que pagas hoy al año', o2: 'Costo de implementación LHIIS', o3: 'Tu ahorro estimado en 12 meses', o4: 'Recuperas la inversión en', cta: 'Ver cómo implementarlo en mi empresa →', note: '* Estimado basado en promedios de mercado. El diagnóstico gratuito te da una cifra precisa.' }
    : { eyebrow: 'Calculate your savings', h: 'How much is not automating\ncosting you?', instr: 'Move the controls and see the impact in real time.', l1: 'How many people handle repetitive tasks?', l2: 'What\'s their average monthly salary?', l3: 'How many leads do you lose per month from slow response?', o1: 'What you pay today per year', o2: 'LHIIS implementation cost', o3: 'Your estimated savings in 12 months', o4: 'You recover the investment in', cta: 'See how to implement it in my company →', note: '* Estimate based on market averages. The free diagnosis gives you a precise figure.' };

  const SliderControl = ({ label, value, min, max, step, onChange, display }) => (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>{label}</span>
        <span style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 16, fontWeight: 700, color: '#fff' }}>{display}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(Number(e.target.value))} style={{ width: '100%', accentColor: '#840bff', height: 4, cursor: 'pointer' }} />
    </div>
  );

  return (
    <section id="calculadora" style={{ padding: '120px clamp(16px,5vw,60px)', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '30%', left: 0, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(132,11,255,0.06) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div ref={ref} style={{ maxWidth: 1280, margin: '0 auto', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(40px)', transition: 'all 0.7s ease' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <SectionLabel text={c.eyebrow} />
          <SectionHeadline style={{ maxWidth: 560, margin: '0 auto 16px' }}>
            {c.h.split('\n').map((l, i) => <span key={i} style={{ display: 'block' }}>{l}</span>)}
          </SectionHeadline>
          <p style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 16, color: 'rgba(255,255,255,0.5)' }}>{c.instr}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }} className="roi-grid">
          {/* Sliders */}
          <GlassCard style={{ padding: '36px 32px' }}>
            <SliderControl label={c.l1} value={people} min={1} max={10} step={1} onChange={setPeople} display={people} />
            <SliderControl label={c.l2} value={salary} min={salaryMin} max={salaryCap} step={lang === 'es' ? 1000 : 50} onChange={setSalary} display={`$${fmt(salary)} ${currency}`} />
            <SliderControl label={c.l3} value={leads} min={0} max={200} step={5} onChange={setLeads} display={leads} />
            <p style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 8, lineHeight: 1.5 }}>{c.note}</p>
          </GlassCard>

          {/* Results */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { label: c.o1, value: `$${fmt(currentCost)} ${currency}`, color: 'rgba(255,255,255,0.6)', big: false },
              { label: c.o2, value: `$${fmt(impl)} ${currency}`, color: 'rgba(255,255,255,0.6)', big: false },
              { label: c.o3, value: savings12 > 0 ? `$${fmt(savings12)} ${currency}` : `—`, color: '#840bff', big: true },
              { label: c.o4, value: typeof months === 'number' ? `${months} ${lang === 'es' ? 'meses' : 'months'}` : '—', color: '#ff0060', big: false },
            ].map((row, i) => (
              <GlassCard key={i} style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderColor: row.big ? 'rgba(132,11,255,0.3)' : 'rgba(255,255,255,0.06)' }}>
                <span style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.65)' }}>{row.label}</span>
                <span style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 800, fontSize: row.big ? 22 : 18, color: row.color }}>{row.value}</span>
              </GlassCard>
            ))}
            <a href="#contacto" onClick={e => { e.preventDefault(); scrollTo('#contacto'); }} style={{
              fontFamily: "'Exo 2',sans-serif", fontWeight: 700, fontSize: 15,
              background: 'linear-gradient(90deg,#840bff,#ff0060)',
              color: '#fff', textDecoration: 'none', padding: '16px 24px',
              borderRadius: 12, textAlign: 'center',
              boxShadow: '0 0 30px rgba(132,11,255,0.35)',
              transition: 'all 0.2s', display: 'block',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 40px rgba(255,0,96,0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(132,11,255,0.35)'; }}
            >{c.cta}</a>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── S6: Casos de Éxito ───────────────────────────────────────────
const CasesSection = ({ lang }) => {
  const [ref, visible] = useReveal();
  const cats_es = ['Todos', 'Agentes de IA', 'Automatizaciones', 'Desarrollo', 'Página Web'];
  const cats_en = ['All', 'AI Agents', 'Automations', 'Development', 'Website'];
  const cats = lang === 'es' ? cats_es : cats_en;
  const [active, setActive] = React.useState(0);

  const cases = [
    { cats: [0,1,2], num: '-90%', sub: lang === 'es' ? 'tiempo de atención por cliente' : 'time per client', client: 'Rosalinda Ortega', role: lang === 'es' ? 'Contadora — 1,000+ contribuyentes' : 'Accountant — 1,000+ taxpayers', text: lang === 'es' ? 'De 30 minutos → 3 minutos por cliente. Recordatorios automáticos, agenda 100% digital.' : 'From 30 minutes → 3 minutes per client. Automated reminders, 100% digital schedule.' },
    { cats: [0,1,2], num: '0', sub: lang === 'es' ? 'prospectos perdidos' : 'leads lost', client: 'Morelos Life', role: lang === 'es' ? 'Inmobiliaria' : 'Real Estate', text: lang === 'es' ? 'Respuesta al prospecto en < 60 segundos. Seguimiento automatizado por etapa del funnel.' : 'Lead response in < 60 seconds. Automated follow-up per funnel stage.' },
    { cats: [0,1], num: '+40%', sub: lang === 'es' ? 'conversión en venta de entradas' : 'ticket sales conversion', client: 'La Maraka', role: lang === 'es' ? 'Centro de Eventos CDMX' : 'Events Center CDMX', text: lang === 'es' ? 'Atención 24/7 sin personal adicional. Registro automático de intereses para remarketing.' : '24/7 service without additional staff. Automatic interest tracking for remarketing.' },
    { cats: [0,1,2,3], num: '+1,000', sub: lang === 'es' ? 'usuarios capacitados en 12 meses' : 'users trained in 12 months', client: 'Banco Pichincha / CRISFE', role: lang === 'es' ? 'Fintech + Fundación Ecuador' : 'Fintech + Foundation Ecuador', text: lang === 'es' ? 'Bot educativo en WhatsApp. Certificados generados automáticamente. Sin infraestructura física.' : 'Educational WhatsApp bot. Certificates auto-generated. No physical infrastructure required.' },
    { cats: [0,1,2], num: '500+', sub: lang === 'es' ? 'pacientes sin asistente humano' : 'patients without human assistant', client: 'David Castillo', role: lang === 'es' ? 'Nutriólogo' : 'Nutritionist', text: lang === 'es' ? 'Agendamiento automático 24/7. Chatbot de preconsulta → consultas más eficientes.' : 'Automatic scheduling 24/7. Pre-consultation chatbot → more efficient appointments.' },
    { cats: [0,2,3], num: '100%', sub: lang === 'es' ? 'operación centralizada' : 'centralized operation', client: 'STOfficenter', role: lang === 'es' ? 'Coworking CDMX' : 'Coworking CDMX', text: lang === 'es' ? 'Panel administrativo para control total. Reportes financieros en tiempo real.' : 'Admin panel for full control. Real-time financial reports.' },
    { cats: [0,1,2], num: '24/7', sub: lang === 'es' ? 'atención a turistas' : 'tourist service', client: 'Turismo Nayarit', role: lang === 'es' ? 'Gobierno del Estado' : 'State Government', text: lang === 'es' ? 'Asistente de IA en WhatsApp. Recomendaciones personalizadas por zona e interés.' : 'AI assistant on WhatsApp. Personalized recommendations by zone and interest.' },
    { cats: [0,1,2], num: '-20min', sub: lang === 'es' ? 'reducción en tiempo de respuesta' : 'response time reduction', client: 'Bogati / SRCarbon / Takirrikos', role: 'Food & Beverage', text: lang === 'es' ? 'Pedido completo en < 2 min via chatbot. Geolocalización automática para asignar sucursal.' : 'Full order in < 2 min via chatbot. Auto-geolocation to assign branch.' },
    { cats: [0,4], num: '-30%', sub: lang === 'es' ? 'reducción en tiempo de entrega' : 'delivery time reduction', client: 'Sol Capital', role: 'Fintech', text: lang === 'es' ? 'Landing Page optimizada para conversión con IA.' : 'AI-optimized conversion landing page.' },
    { cats: [0,4,3], num: '1', sub: lang === 'es' ? 'plataforma de comunicación e impacto' : 'communications & impact platform', client: 'Proyecto AFA', role: lang === 'es' ? 'Estudio Multidisciplinario' : 'Multidisciplinary Studio', text: lang === 'es' ? 'MVP con Landing Page + sistema de gestión de créditos. Plataforma escalable.' : 'MVP with Landing Page + credits management system. Scalable platform.' },
    { cats: [0,3], num: 'LATAM', sub: lang === 'es' ? 'plataforma de alumni Iberoamérica' : 'alumni platform Iberoamérica', client: 'AIESEC Blue Card', role: lang === 'es' ? 'Comunidad Alumni' : 'Alumni Community', text: lang === 'es' ? 'Plataforma completa de membresías. App híbrida. Mayor engagement entre alumni.' : 'Full membership platform. Hybrid app. Greater alumni engagement.' },
  ];

  const filtered = active === 0 ? cases : cases.filter(c => c.cats.includes(active));

  return (
    <section id="casos" style={{ padding: '120px clamp(16px,5vw,60px)', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '20%', right: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,0,96,0.06) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div ref={ref} style={{ maxWidth: 1280, margin: '0 auto', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(40px)', transition: 'all 0.7s ease' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <SectionLabel text={lang === 'es' ? 'Casos de éxito' : 'Case Studies'} />
          <SectionHeadline style={{ maxWidth: 600, margin: '0 auto' }}>
            {(lang === 'es' ? 'Empresas que dejaron de perder\ntiempo y clientes con LHIIS' : 'Companies that stopped losing\ntime and clients with LHIIS').split('\n').map((l, i) => <span key={i} style={{ display: 'block' }}>{l}</span>)}
          </SectionHeadline>
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 40 }}>
          {cats.map((cat, i) => (
            <button key={i} onClick={() => setActive(i)} style={{
              fontFamily: "'Exo 2',sans-serif", fontWeight: 600, fontSize: 13,
              padding: '8px 18px', borderRadius: 100, border: 'none', cursor: 'pointer',
              background: active === i ? 'linear-gradient(90deg,#840bff,#ff0060)' : 'rgba(255,255,255,0.06)',
              color: active === i ? '#fff' : 'rgba(255,255,255,0.55)',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.2s',
              boxShadow: active === i ? '0 0 20px rgba(132,11,255,0.3)' : 'none',
            }}>{cat}</button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          {filtered.map((cs, i) => (
            <GlassCard key={i} style={{ padding: '28px 24px', cursor: 'default' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(132,11,255,0.07)'; e.currentTarget.style.borderColor = 'rgba(132,11,255,0.2)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, marginBottom: 16 }}>
                <span style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 900, fontSize: 40, background: 'linear-gradient(90deg,#840bff,#ff0060)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1 }}>{cs.num}</span>
                <span style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.3, paddingBottom: 4 }}>{cs.sub}</span>
              </div>
              <div style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 700, fontSize: 15, color: '#fff', marginBottom: 4 }}>{cs.client}</div>
              <div style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 12 }}>{cs.role}</div>
              <p style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, margin: 0 }}>{cs.text}</p>
            </GlassCard>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <a href="https://gamma.app/docs/LHIIS-tvjj5ofyinei2e1?mode=doc" target="_blank" rel="noopener noreferrer" style={{
            fontFamily: "'Exo 2',sans-serif", fontWeight: 600, fontSize: 14,
            color: 'rgba(255,255,255,0.6)', textDecoration: 'none',
            borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: 2,
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#fff'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
          >{lang === 'es' ? 'Ver todos los casos →' : 'See all cases →'}</a>
        </div>
      </div>
    </section>
  );
};

// ─── S7: Cómo Trabajamos ──────────────────────────────────────────
const HowWeWorkSection = ({ lang }) => {
  const [ref, visible] = useReveal();
  const steps_es = [
    { n: '01', title: 'Diagnóstico gratuito', text: 'Entendemos tu operación real. Identificamos los procesos que más sangran tiempo y dinero. Sin compromiso, sin propuesta genérica.', time: '1 sesión de 30–60 min' },
    { n: '02', title: 'Propuesta a medida', text: 'Diseñamos la arquitectura del sistema: agentes, flujos, integraciones y métricas de éxito. Nada entra a desarrollo sin que lo hayas aprobado.', time: '2–5 días hábiles' },
    { n: '03', title: 'Implementación', text: 'Construimos, integramos y probamos. Tienes visibilidad en cada etapa. No desaparecemos al cobrar el anticipo.', time: 'Según el servicio: 7–132 días hábiles' },
    { n: '04', title: 'Lanzamiento y optimización', text: 'Lanzamos con tracking activo. Medimos lo que importa. Ajustamos hasta que el sistema funcione como prometimos.', time: 'Ciclo continuo — el sistema mejora con el tiempo' },
  ];
  const steps_en = [
    { n: '01', title: 'Free diagnosis', text: 'We understand your real operation. We identify the processes bleeding the most time and money. No commitment, no generic proposal.', time: '1 session of 30–60 min' },
    { n: '02', title: 'Custom proposal', text: 'We design the system architecture: agents, flows, integrations and success metrics. Nothing enters development without your approval.', time: '2–5 business days' },
    { n: '03', title: 'Implementation', text: 'We build, integrate and test. You have visibility at every stage. We don\'t disappear after collecting the deposit.', time: 'Depending on service: 7–132 business days' },
    { n: '04', title: 'Launch and optimization', text: 'We launch with active tracking. We measure what matters. We adjust until the system works as promised.', time: 'Continuous cycle — the system improves over time' },
  ];
  const steps = lang === 'es' ? steps_es : steps_en;
  const c = lang === 'es'
    ? { eyebrow: 'Nuestro proceso', h: 'Del problema al sistema funcionando\n— en semanas, no en meses.', close: 'Precios claros desde el inicio.\nSin sorpresas. Sin cláusulas ocultas.' }
    : { eyebrow: 'Our process', h: 'From problem to working system\n— in weeks, not months.', close: 'Clear pricing from the start.\nNo surprises. No hidden clauses.' };

  return (
    <section id="proceso" style={{ padding: '120px clamp(16px,5vw,60px)', position: 'relative', background: 'rgba(132,11,255,0.02)' }}>
      <div ref={ref} style={{ maxWidth: 1280, margin: '0 auto', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(40px)', transition: 'all 0.7s ease' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <SectionLabel text={c.eyebrow} />
          <SectionHeadline style={{ maxWidth: 600, margin: '0 auto' }}>
            {c.h.split('\n').map((l, i) => <span key={i} style={{ display: 'block' }}>{l}</span>)}
          </SectionHeadline>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24, position: 'relative' }}>
          {/* Connecting line */}
          <div style={{ position: 'absolute', top: 40, left: '12.5%', right: '12.5%', height: 1, background: 'linear-gradient(90deg, rgba(132,11,255,0.4), rgba(255,0,96,0.4))', pointerEvents: 'none', zIndex: 0 }} className="steps-line" />

          {steps.map((step, i) => (
            <div key={i} style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
                <div style={{
                  width: 56, height: 56, borderRadius: '50%',
                  background: `linear-gradient(135deg, #840bff, #ff0060)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 0 24px rgba(132,11,255,0.4)',
                  fontFamily: "'Exo 2',sans-serif", fontWeight: 800, fontSize: 15, color: '#fff',
                }}>{step.n}</div>
              </div>
              <GlassCard style={{ padding: '24px 20px', textAlign: 'center' }}>
                <h3 style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 700, fontSize: 18, color: '#fff', margin: '0 0 10px' }}>{step.title}</h3>
                <p style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, margin: '0 0 16px' }}>{step.text}</p>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(132,11,255,0.12)', borderRadius: 100, padding: '4px 12px' }}>
                  <span style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 11, color: '#840bff', fontWeight: 600 }}>⏱ {step.time}</span>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 56 }}>
          <GlassCard style={{ display: 'inline-block', padding: '24px 40px', borderColor: 'rgba(132,11,255,0.2)' }}>
            {c.close.split('\n').map((l, i) => (
              <p key={i} style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 16, color: i === 0 ? '#fff' : 'rgba(255,255,255,0.65)', fontWeight: i === 0 ? 700 : 400, margin: i === 0 ? 0 : '6px 0 0', lineHeight: 1.5 }}>{l}</p>
            ))}
            <a href="#contacto" onClick={e => { e.preventDefault(); scrollTo('#contacto'); }} style={{
              display: 'inline-block', marginTop: 16,
              fontFamily: "'Exo 2',sans-serif", fontWeight: 700, fontSize: 14,
              background: 'linear-gradient(90deg,#840bff,#ff0060)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              textDecoration: 'none',
            }}>→ {lang === 'es' ? 'Agenda tu diagnóstico' : 'Book your diagnosis'}</a>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

// ─── S8: Quiénes Somos ────────────────────────────────────────────
const AboutSection = ({ lang }) => {
  const [ref, visible] = useReveal();
  const c = lang === 'es'
    ? { eyebrow: 'Quiénes somos', h: 'No hacemos tecnología por moda.\nHacemos sistemas que cambian\ncómo opera tu empresa.', p1: 'En LHIIS creemos que la tecnología tiene sentido cuando mejora la vida de alguien real. Detrás de cada sistema que construimos hay una persona que va a usarlo, un equipo que va a confiar en él y un líder que apostó por él.', p2: 'Por eso no llegamos a vender software. Llegamos a entender el problema. Y a veces el problema ni siquiera necesita código — necesita un proceso más claro. Siempre lo decimos, aunque no nos genere proyecto.', p3: 'Trabajamos con líderes que quieren construir algo que dure. Con los que entienden que detrás de cada proceso hay personas, y que automatizar no significa deshumanizar — significa liberar a tu equipo para hacer lo que de verdad importa.', tagline: 'Encendemos futuros. Creamos soluciones digitales que transforman vidas.' }
    : { eyebrow: 'About us', h: 'We don\'t build technology for hype.\nWe build systems that change\nhow your company operates.', p1: 'At LHIIS we believe technology makes sense when it improves a real person\'s life. Behind every system we build there\'s someone who will use it, a team that will rely on it and a leader who bet on it.', p2: 'That\'s why we don\'t come to sell software. We come to understand the problem. And sometimes the problem doesn\'t need code — it needs a clearer process. We always say that, even if it doesn\'t generate a project for us.', p3: 'We work with leaders who want to build something that lasts. With those who understand that behind every process there are people, and that automating doesn\'t mean dehumanizing — it means freeing your team to do what truly matters.', tagline: 'We ignite futures. We build digital solutions that transform lives.' };

  return (
    <section id="nosotros" style={{ padding: '120px clamp(16px,5vw,60px)', position: 'relative' }}>
      <div style={{ position: 'absolute', bottom: 0, left: '20%', width: 600, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(132,11,255,0.07) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div ref={ref} style={{ maxWidth: 1280, margin: '0 auto', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(40px)', transition: 'all 0.7s ease' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} className="about-grid">
          <div>
            <SectionLabel text={c.eyebrow} />
            <SectionHeadline>
              {c.h.split('\n').map((l, i) => <span key={i} style={{ display: 'block', ...(i === 0 ? {} : {}) }}>{l}</span>)}
            </SectionHeadline>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[c.p1, c.p2, c.p3].map((p, i) => (
                <p key={i} style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 16, color: 'rgba(255,255,255,0.68)', lineHeight: 1.85, margin: 0 }}>{p}</p>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Logo display */}
            <GlassCard style={{ padding: '48px 32px', textAlign: 'center', borderColor: 'rgba(132,11,255,0.2)', background: 'rgba(132,11,255,0.05)' }}>
              <img src="uploads/LHIISLogo.png" alt="LHIIS" style={{ width: 100, height: 100, objectFit: 'contain', marginBottom: 20 }} />
              <p style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, margin: 0, fontStyle: 'italic' }}>"{c.tagline}"</p>
            </GlassCard>
            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                { n: '11+', l: lang === 'es' ? 'Casos de éxito' : 'Success cases' },
                { n: '3', l: lang === 'es' ? 'Líneas de servicio' : 'Service lines' },
                { n: '24/7', l: lang === 'es' ? 'Sistemas activos' : 'Active systems' },
                { n: '5+', l: lang === 'es' ? 'Países de impacto' : 'Countries impacted' },
              ].map((s, i) => (
                <GlassCard key={i} style={{ padding: '20px', textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 900, fontSize: 32, background: 'linear-gradient(90deg,#840bff,#ff0060)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.n}</div>
                  <div style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>{s.l}</div>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { ProblemSection, ServicesSection, EcosystemSection, ROISection, CasesSection, HowWeWorkSection, AboutSection, GlassCard, SectionLabel, SectionHeadline, scrollTo, useReveal });
