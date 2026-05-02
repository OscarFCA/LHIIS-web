
// Final.jsx — CTA, FAQ, Footer, Chat Widget, WA Button

// ─── S9: CTA / Contacto ───────────────────────────────────────────
const CTASection = ({ lang }) => {
  const [ref, visible] = useReveal();
  const [showForm, setShowForm]   = React.useState(false);
  const [formData, setFormData]   = React.useState({ name: '', email: '', phone: '', company: '', size: '', industry: '', pain: '' });
  const [submitted, setSubmitted] = React.useState(false);
  const [sending, setSending]     = React.useState(false);
  const [sendError, setSendError] = React.useState(false);

  const es = {
    eyebrow: '¿Listo para empezar?',
    h: 'Cuéntanos qué no está funcionando.\nEl diagnóstico es gratis.',
    sub: 'No necesitas tener todo claro. Solo necesitas saber que algo en tu operación puede funcionar mejor. En 30 minutos te decimos cómo.',
    wa: 'Escríbenos por WhatsApp →',
    formBtn: 'Agenda una llamada de diagnóstico',
    trust: ['Respondemos en menos de 2 horas en días hábiles.', 'Sin spam. Sin vendedores agresivos. Solo una conversación honesta sobre tu operación.'],
    fields: { name: 'Nombre completo *', email: 'Correo electrónico *', phone: 'Teléfono / WhatsApp *', company: 'Empresa *', size: 'Número de colaboradores', industry: 'Industria', pain: '¿Cuál es tu mayor dolor operativo hoy?', submit: 'Enviar y agendar diagnóstico →' },
    sizes: ['1 – 10','11 – 30','31 – 80','80+'],
    industries: ['Servicios profesionales','Salud','Inmobiliaria','Logística','Retail / Comercio','Educación','Eventos y entretenimiento','Otro'],
    successTitle: '¡Solicitud recibida!',
    successText: 'En menos de 2 horas te contactamos al WhatsApp o correo para agendar tu diagnóstico gratuito.',
    successWA: 'Escríbenos por WhatsApp ahora →',
  };
  const en = {
    eyebrow: 'Ready to start?',
    h: "Tell us what's not working.\nThe diagnosis is free.",
    sub: "You don't need to have it all figured out. You just need to know that something in your operation could work better. In 30 minutes we'll tell you how.",
    wa: 'Message us on WhatsApp →',
    formBtn: 'Book a diagnosis call',
    trust: ['We respond within 2 hours on business days.', 'No spam. No aggressive salespeople. Just an honest conversation about your operation.'],
    fields: { name: 'Full name *', email: 'Email address *', phone: 'Phone / WhatsApp *', company: 'Company *', size: 'Number of employees', industry: 'Industry', pain: "What's your biggest operational challenge today?", submit: 'Submit and book diagnosis →' },
    sizes: ['1 – 10','11 – 30','31 – 80','80+'],
    industries: ['Professional services','Healthcare','Real estate','Logistics','Retail / Commerce','Education','Events & entertainment','Other'],
    successTitle: 'Request received!',
    successText: "We'll contact you within 2 hours on WhatsApp or email to schedule your free diagnosis.",
    successWA: 'Message us on WhatsApp now →',
  };
  const c = lang === 'es' ? es : en;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setSendError(false);
    try {
      await emailjs.send(window.EMAILJS_SERVICE_ID, window.EMAILJS_TEMPLATE_ID, {
        from_name: formData.name, email: formData.email, phone: formData.phone,
        company: formData.company, size: formData.size, industry: formData.industry,
        pain: formData.pain, reply_to: formData.email, lang,
      });
      setSubmitted(true);
    } catch (err) {
      console.error('EmailJS error:', err);
      setSendError(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contacto" className="section">
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 0%, rgba(132,11,255,0.05) 50%, transparent 100%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '15%', left: '5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(132,11,255,0.08) 0%, transparent 70%)', filter: 'blur(70px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,0,96,0.07) 0%, transparent 70%)', filter: 'blur(70px)', pointerEvents: 'none' }} />

      <div ref={ref} className="section-inner" style={{ maxWidth: 760, opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(40px)', transition: 'all 0.7s ease', textAlign: 'center' }}>
        <SectionLabel text={c.eyebrow} />
        <SectionHeadline center style={{ maxWidth: 580 }}>
          {c.h.split('\n').map((l, i) => <span key={i} style={{ display: 'block' }}>{l}</span>)}
        </SectionHeadline>
        <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 17, color: 'rgba(229,231,235,0.6)', lineHeight: 1.75, maxWidth: 540, margin: '0 auto 48px' }}>{c.sub}</p>

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 40 }}>
          <a href="https://wa.me/525531650560" target="_blank" rel="noopener noreferrer"
            className="btn-primary btn-halo btn-lg">
            {c.wa}
          </a>
          <button onClick={() => setShowForm(!showForm)} className="btn-secondary btn-lg">
            {c.formBtn}
          </button>
        </div>

        {showForm && (
          <GlassCard style={{ padding: '40px 36px', textAlign: 'left', marginBottom: 32, borderColor: 'rgba(132,11,255,0.2)' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--grad)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 28 }}>✓</div>
                <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 24, color: '#fff', margin: '0 0 12px' }}>{c.successTitle}</h3>
                <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 15, color: 'rgba(229,231,235,0.65)', margin: '0 0 24px', lineHeight: 1.7 }}>{c.successText}</p>
                <a href="https://wa.me/525531650560" target="_blank" rel="noopener noreferrer"
                  className="btn-primary btn-halo">{c.successWA}</a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* Row 1: nombre + empresa */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  {[['name', c.fields.name], ['company', c.fields.company]].map(([key, label]) => (
                    <div key={key}>
                      <label className="form-label">{label}</label>
                      <input required className="form-input" value={formData[key]}
                        onChange={e => setFormData({...formData, [key]: e.target.value})} />
                    </div>
                  ))}
                </div>
                {/* Row 2: email + phone */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label className="form-label">{c.fields.email}</label>
                    <input required type="email" className="form-input" value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div>
                    <label className="form-label">{c.fields.phone}</label>
                    <input required type="tel" className="form-input" value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})} />
                  </div>
                </div>
                {/* Row 3: tamaño + industria */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  {[['size', c.fields.size, c.sizes], ['industry', c.fields.industry, c.industries]].map(([key, label, opts]) => (
                    <div key={key}>
                      <label className="form-label">{label}</label>
                      <select className="form-input" style={{ cursor: 'pointer' }} value={formData[key]}
                        onChange={e => setFormData({...formData, [key]: e.target.value})}>
                        <option value="" style={{ background: '#0B0F1A' }}>—</option>
                        {opts.map(o => <option key={o} value={o} style={{ background: '#0B0F1A' }}>{o}</option>)}
                      </select>
                    </div>
                  ))}
                </div>
                {/* Textarea */}
                <div>
                  <label className="form-label">{c.fields.pain}</label>
                  <textarea required rows={4} className="form-input" style={{ resize: 'vertical', lineHeight: 1.65 }}
                    value={formData.pain} onChange={e => setFormData({...formData, pain: e.target.value})} />
                </div>
                {sendError && (
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#ff6b6b', margin: 0, textAlign: 'center', letterSpacing: '0.03em' }}>
                    {lang === 'es' ? 'Hubo un error al enviar. Escríbenos directamente por WhatsApp.' : 'There was an error sending. Please message us on WhatsApp directly.'}
                  </p>
                )}
                <button type="submit" disabled={sending}
                  className="btn-primary btn-halo"
                  style={{ justifyContent: 'center', fontSize: 15, opacity: sending ? 0.7 : 1, cursor: sending ? 'not-allowed' : 'pointer' }}>
                  {sending ? (lang === 'es' ? 'Enviando...' : 'Sending...') : c.fields.submit}
                </button>
              </form>
            )}
          </GlassCard>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {c.trust.map((line, i) => (
            <p key={i} className="trust-line">{line}</p>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── FAQ ──────────────────────────────────────────────────────────
const FAQSection = ({ lang }) => {
  const [ref, visible] = useReveal();
  const [open, setOpen] = React.useState(null);

  const faqs_es = [
    { q: '¿Cuánto cuesta implementar un agente de IA?', a: 'Depende del alcance, las integraciones y la complejidad del proceso. No manejamos precios fijos porque cada proyecto es diferente.\n\nComo referencia general:\n· Chatbots y agentes de IA: desde $50,000 MXN\n· Asistentes de voz con IA: desde $60,000 MXN\n· Desarrollo a la medida con IA: desde $40,000 MXN\n· Páginas web y funnels: desde $12,500 MXN\n· Suscripciones de CRM y soporte: desde $1,500 MXN/mes\n\nEl diagnóstico gratuito nos permite darte una propuesta precisa para tu caso.' },
    { q: '¿En cuánto tiempo está listo el sistema?', a: 'Depende del servicio:\n· CRM / HUB: 7–15 días hábiles\n· Chatbot de IA: 10–30 días hábiles\n· Asistente de voz: 15–45 días hábiles\n· Página web: 30–45 días hábiles\n· Desarrollo a la medida: 45–132 días hábiles\n\nSiempre te decimos el tiempo antes de arrancar — y lo cumplimos.' },
    { q: '¿Qué pasa si ya tengo herramientas (CRM, WhatsApp, etc.)?', a: 'Mejor. Trabajamos con lo que ya tienes siempre que sea posible. Los agentes que implementamos se integran con las plataformas más usadas: WhatsApp Business, HubSpot, ClickUp, Make, Zapier, Google Workspace y más. En el diagnóstico mapeamos tu stack actual y diseñamos la solución alrededor de él.' },
    { q: '¿Necesito saber de tecnología para trabajar con LHIIS?', a: 'No. Tu trabajo es contarnos cómo funciona tu operación y qué quieres mejorar. El nuestro es traducir eso en un sistema que funcione. Tú apruebas, nosotros construimos.' },
    { q: '¿Qué pasa después de la implementación?', a: 'No desaparecemos. Ofrecemos planes de soporte y mantenimiento mensual para que el sistema siempre esté actualizado, funcionando y mejorando. Si algo cambia en tu operación, el sistema se adapta.' },
    { q: '¿Cómo sé si mi empresa está lista para esto?', a: 'Si tienes al menos 10 personas en tu equipo y alguno de estos dolores — atención lenta a clientes, seguimiento manual de leads, reportes en Excel, procesos que dependen de una sola persona — ya estás lista.\n\nEl diagnóstico es gratis y sin compromiso. En 30 minutos te decimos si podemos ayudarte y cómo.' },
  ];
  const faqs_en = [
    { q: 'How much does it cost to implement an AI agent?', a: "It depends on the scope, integrations and complexity of the process. We don't have fixed prices because every project is different.\n\nAs a general reference:\n· Chatbots and AI agents: from $2,500 USD\n· AI voice assistants: from $3,500 USD\n· Custom development with AI: from $2,000 USD\n· Websites and funnels: from $650 USD\n· CRM and support subscriptions: from $80 USD/month\n\nThe free diagnosis lets us give you a precise proposal for your specific case." },
    { q: 'How long does it take to have the system ready?', a: "Also depends on the service:\n· CRM / HUB: 7–15 business days\n· AI chatbot: 10–30 business days\n· Voice assistant: 15–45 business days\n· Website: 30–45 business days\n· Custom development: 45–132 business days\n\nWe always tell you the timeline before we start — and we deliver on it." },
    { q: 'What if I already have tools (CRM, WhatsApp, etc.)?', a: "Even better. We work with what you already have whenever possible. The agents we implement integrate with the most common platforms: WhatsApp Business, HubSpot, ClickUp, Make, Zapier, Google Workspace and more. In the diagnosis we map your current stack and design the solution around it." },
    { q: 'Do I need to know about technology to work with LHIIS?', a: "No. Your job is to tell us how your operation works and what you want to improve. Ours is to translate that into a system that works. You approve, we build." },
    { q: 'What happens after implementation?', a: "We don't disappear. We offer monthly support and maintenance plans to keep the system updated, running and improving. If something changes in your operation, the system adapts." },
    { q: 'How do I know if my company is ready for this?', a: "If you have at least 10 people on your team and any of these pain points — slow customer response, manual lead follow-up, Excel reports, processes that depend on one single person — you're already ready.\n\nThe diagnosis is free and no-commitment. In 30 minutes we'll tell you if we can help and how." },
  ];
  const faqs = lang === 'es' ? faqs_es : faqs_en;
  const c = lang === 'es'
    ? { eyebrow: 'Preguntas frecuentes', h: 'Lo que más nos preguntan\nantes de agendar', waText: '¿Tienes otra pregunta? → Escríbenos directamente por WhatsApp' }
    : { eyebrow: 'FAQ', h: 'What people ask us most\nbefore booking', waText: 'Have another question? → Message us directly on WhatsApp' };

  return (
    <section id="faq" className="section section-alt">
      <div ref={ref} className="section-inner" style={{ maxWidth: 800, opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(40px)', transition: 'all 0.7s ease' }}>
        <div className="section-header">
          <SectionLabel text={c.eyebrow} />
          <SectionHeadline center style={{ maxWidth: 500 }}>
            {c.h.split('\n').map((l, i) => <span key={i} style={{ display: 'block' }}>{l}</span>)}
          </SectionHeadline>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{
              background: open === i ? 'rgba(132,11,255,0.08)' : 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(20px)',
              border: open === i ? '1px solid rgba(132,11,255,0.3)' : '1px solid rgba(255,255,255,0.07)',
              borderRadius: 14, overflow: 'hidden', transition: 'all 0.25s',
            }}>
              <button onClick={() => setOpen(open === i ? null : i)} style={{
                width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                padding: '22px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16,
              }}>
                <span className="faq-q">{faq.q}</span>
                <span className={`faq-icon ${open === i ? 'faq-icon-open' : 'faq-icon-closed'}`}>+</span>
              </button>
              {open === i && (
                <div style={{ padding: '0 28px 24px' }}>
                  {faq.a.split('\n').map((line, li) => (
                    <p key={li} className="faq-answer-line" style={{
                      color: line.startsWith('·') ? 'rgba(229,231,235,0.75)' : 'rgba(229,231,235,0.6)',
                      margin: li === 0 ? 0 : '2px 0 0',
                      paddingLeft: line.startsWith('·') ? 8 : 0,
                    }}>{line}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <a href="https://wa.me/525531650560" target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: 14, background: 'var(--grad-h)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textDecoration: 'none' }}>
            {c.waText}
          </a>
        </div>
      </div>
    </section>
  );
};

// ─── Footer ───────────────────────────────────────────────────────
const Footer = ({ lang }) => {
  const scrollTo = (id) => {
    const root = document.getElementById('page-root');
    const el = document.querySelector(id);
    if (el && root) root.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' });
  };

  const services_es = ['Agentes de IA y Chatbots','Desarrollo a la Medida + IA','Presencia Digital y Funnels','Soporte y Mantenimiento'];
  const services_en = ['AI Agents & Chatbots','Custom Development + AI','Digital Presence & Funnels','Support & Maintenance'];
  const company_es  = [['Quiénes somos','#nosotros'],['Casos de éxito','#casos'],['FAQ','#faq']];
  const company_en  = [['About us','#nosotros'],['Case studies','#casos'],['FAQ','#faq']];

  const services      = lang === 'es' ? services_es : services_en;
  const company       = lang === 'es' ? company_es : company_en;
  const tagline       = lang === 'es' ? 'Encendemos futuros.' : 'We ignite futures.';
  const servicesLabel = lang === 'es' ? 'Servicios'   : 'Services';
  const companyLabel  = lang === 'es' ? 'Empresa'     : 'Company';
  const strategyLabel = lang === 'es' ? 'Estrategia'  : 'Strategy';
  const rights        = lang === 'es' ? 'Todos los derechos reservados' : 'All rights reserved';
  const privacy       = lang === 'es' ? 'Política de privacidad' : 'Privacy policy';

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 60, marginBottom: 60 }} className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{ marginBottom: 16 }}>
              <img src="uploads/LHIIS.svg" alt="LHIIS" style={{ height: 32, width: 'auto', objectFit: 'contain' }} />
            </div>
            <p className="footer-tagline">{tagline}</p>
            <div style={{ display: 'flex', gap: 10 }}>
              <a href="https://www.linkedin.com/company/lhiis/?viewAsMember=true" target="_blank" rel="noopener noreferrer"
                className="footer-social">LinkedIn</a>
            </div>
          </div>

          {/* Services */}
          <div>
            <div className="footer-col-head">{servicesLabel}</div>
            {services.map(s => (
              <a key={s} href="#servicios" onClick={e => { e.preventDefault(); scrollTo('#servicios'); }}
                className="footer-link">{s}</a>
            ))}
          </div>

          {/* Company */}
          <div>
            <div className="footer-col-head">{companyLabel}</div>
            {company.map(([label, href]) => (
              <a key={label} href={href} onClick={e => { e.preventDefault(); scrollTo(href); }}
                className="footer-link">{label}</a>
            ))}
          </div>

          {/* Contact */}
          <div>
            <div className="footer-col-head">Contacto</div>
            <a href="mailto:contacto@lhiis.com" className="footer-link">contacto@lhiis.com</a>
            <a href="https://wa.me/525531650560" target="_blank" rel="noopener noreferrer" className="footer-link">(55) 3165 0560</a>
            <a href="#" className="footer-link">www.lhiis.com</a>
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="footer-col-head">{strategyLabel}</div>
              <a href="https://er-consulting.marmolejo-villa.org" target="_blank" rel="noopener noreferrer" className="footer-link">
                Elías Rico →
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="footer-copy">© 2026 LHIIS · {rights}</p>
          <a href="#" className="footer-privacy">{privacy}</a>
        </div>
      </div>
    </footer>
  );
};

// ─── Chat Widget ─────────────────────────────────────────────────
const ChatWidget = ({ lang }) => {
  const [open, setOpen]     = React.useState(false);
  const [msgs, setMsgs]     = React.useState([]);
  const [input, setInput]   = React.useState('');
  const [typing, setTyping] = React.useState(false);
  const bottomRef           = React.useRef(null);

  const INTRO = lang === 'es'
    ? 'Hola 👋 Soy el agente de LHIIS. Puedo ayudarte a entender cómo la IA puede transformar tu operación. ¿Cuál es el mayor reto en tu empresa hoy?'
    : "Hi 👋 I'm the LHIIS agent. I can help you understand how AI can transform your operation. What's your biggest business challenge today?";

  React.useEffect(() => {
    if (open && msgs.length === 0) setTimeout(() => setMsgs([{ role: 'agent', text: INTRO }]), 400);
  }, [open]);

  React.useEffect(() => {
    if (bottomRef.current) bottomRef.current.parentElement.scrollTop = bottomRef.current.offsetTop;
  }, [msgs, typing]);

  const simulateReply = () => {
    const replies_es = [
      '¡Entendido! Ese es exactamente el tipo de problema que resolvemos. ¿Cuántas personas tiene tu equipo actualmente?',
      'Perfecto. Con esa información puedo darte una idea más concreta. ¿Ya tienes WhatsApp Business activo en tu empresa?',
      'Genial. El siguiente paso es una llamada de diagnóstico de 30 minutos — completamente gratuita — donde te damos un plan específico para tu caso. ¿Te gustaría agendar?',
    ];
    const replies_en = [
      "Understood! That's exactly the type of problem we solve. How many people are currently on your team?",
      "Perfect. With that information I can give you a more concrete idea. Do you already have WhatsApp Business active in your company?",
      "Great. The next step is a 30-minute diagnosis call — completely free — where we give you a specific plan for your case. Would you like to schedule?",
    ];
    const replies = lang === 'es' ? replies_es : replies_en;
    const idx = Math.min(Math.floor(msgs.filter(m => m.role === 'agent').length), replies.length - 1);
    return replies[idx];
  };

  const sendMsg = () => {
    const text = input.trim();
    if (!text) return;
    setInput('');
    setMsgs(prev => [...prev, { role: 'user', text }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs(prev => [...prev, { role: 'agent', text: simulateReply() }]);
    }, 1200 + Math.random() * 600);
  };

  const placeholder = lang === 'es' ? 'Escribe tu mensaje...' : 'Type your message...';
  const chatTitle   = lang === 'es' ? 'Agente LHIIS'          : 'LHIIS Agent';
  const chatSub     = lang === 'es' ? 'IA en vivo · Responde en segundos' : 'Live AI · Responds in seconds';

  return (
    <div style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}>
      {open && (
        <div style={{
          width: 360, background: 'rgba(11,15,26,0.97)', backdropFilter: 'blur(24px)',
          border: '1px solid rgba(132,11,255,0.3)', borderRadius: 20,
          boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(132,11,255,0.1)',
          display: 'flex', flexDirection: 'column', overflow: 'hidden', animation: 'fadeUp 0.3s ease',
        }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(132,11,255,0.08)' }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--grad)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>⚡</div>
            <div style={{ flex: 1 }}>
              <div className="chat-title-text">{chatTitle}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
                <span className="chat-sub-text">{chatSub}</span>
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: 18, padding: 4, lineHeight: 1 }}>×</button>
          </div>

          <div style={{ height: 320, overflowY: 'auto', padding: '16px 16px 8px', display: 'flex', flexDirection: 'column', gap: 12, scrollbarWidth: 'thin', scrollbarColor: 'rgba(132,11,255,0.3) transparent' }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '82%', padding: '10px 14px',
                  borderRadius: m.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                  background: m.role === 'user' ? 'var(--grad)' : 'rgba(255,255,255,0.07)',
                  fontFamily: "'Lato', sans-serif", fontSize: 13, color: '#fff', lineHeight: 1.6,
                }}>{m.text}</div>
              </div>
            ))}
            {typing && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: '14px 14px 14px 4px', padding: '10px 16px', display: 'flex', gap: 4, alignItems: 'center' }}>
                  {[0,1,2].map(i => (
                    <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#840bff', animation: `pulse 1.2s ease ${i * 0.2}s infinite` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', gap: 8 }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMsg()}
              placeholder={placeholder}
              style={{ flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 14px', color: '#fff', fontFamily: "'Lato', sans-serif", fontSize: 13, outline: 'none' }} />
            <button onClick={sendMsg}
              style={{ width: 40, height: 40, borderRadius: 10, border: 'none', cursor: 'pointer', background: 'var(--grad)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: '#fff', flexShrink: 0 }}>
              →
            </button>
          </div>
        </div>
      )}

      <button onClick={() => setOpen(!open)} style={{
        width: 60, height: 60, borderRadius: '50%', border: 'none', cursor: 'pointer',
        background: 'var(--grad)',
        boxShadow: `0 0 ${open ? 40 : 24}px rgba(132,11,255,${open ? 0.6 : 0.4})`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 24, color: '#fff', transition: 'all 0.3s',
        transform: open ? 'rotate(45deg)' : 'none',
      }}>
        {open ? '×' : '⚡'}
      </button>
    </div>
  );
};

// ─── WA Button ───────────────────────────────────────────────────
const WAButton = ({ lang }) => (
  <a href="https://wa.me/525531650560" target="_blank" rel="noopener noreferrer"
    title={lang === 'es' ? 'Escríbenos por WhatsApp' : 'Message us on WhatsApp'}
    style={{
      position: 'fixed', bottom: 28, left: 28, zIndex: 9998,
      width: 52, height: 52, borderRadius: '50%',
      background: '#25d366', display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 4px 20px rgba(37,211,102,0.4)', transition: 'all 0.2s', textDecoration: 'none', fontSize: 26,
    }}
    onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(37,211,102,0.5)'; }}
    onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(37,211,102,0.4)'; }}
  >💬</a>
);

Object.assign(window, { CTASection, FAQSection, Footer, ChatWidget, WAButton });
