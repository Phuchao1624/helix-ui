import React from 'react';
import { ArrowUpRight, BookOpenCheck, Headphones, HeartHandshake, LineChart, MessageCircle, Sparkles } from 'lucide-react';
import BrandLogo from '../components/BrandLogo';

export default function AuthLayout({ children, title = 'Every lesson is a step forward.', note = 'A clear, warm English learning space designed for the Hope School community.', centered = false }) {
  const goWelcome = (event) => { event.preventDefault(); window.location.hash = '/welcome'; };
  return <div className={`auth-layout ${centered ? 'auth-layout--centered' : ''}`}>
    <section className="auth-layout__brand">
      <div className="auth-layout__brand-inner">
        <div className="auth-layout__brand-top"><a className="auth-brand-link" href="/#/welcome" onClick={goWelcome} aria-label="Go to the HELIX welcome page"><BrandLogo inverse /></a><span>HOPE SCHOOL · 2026</span></div>
        <div className="auth-layout__message"><span className="auth-kicker">HOPE ENGLISH LEARNING EXPERIENCE</span><h1>{title}</h1><p>{note}</p><div className="auth-layout__signature"><span /> Learn with intent · Grow with confidence</div></div>
        <div className="auth-feature-row" aria-label="HELIX features"><div><BookOpenCheck size={20} /><span><strong>Learn in rhythm</strong><small>Sessions and assignments in one calm flow.</small></span></div><div><LineChart size={20} /><span><strong>See progress</strong><small>Every milestone is visible and meaningful.</small></span></div><div><HeartHandshake size={20} /><span><strong>Stay supported</strong><small>Mentor feedback is part of the journey.</small></span></div></div>
      </div>
      <div className="auth-layout__architecture" aria-hidden="true"><i /><i /><i /><i /></div><div className="auth-layout__index" aria-hidden="true">H</div>
    </section>
    <section className="auth-layout__panel">
      <div className="auth-layout__panel-top"><span>Hope School learning community</span><ArrowUpRight size={17} /></div>
      <div className="auth-layout__panel-inner">
        {children}
        {centered ? <div className="auth-panel-art" aria-hidden="true"><img src="/assets/auth/login-ai-companion.jpg" alt="" /><div className="auth-panel-art__veil" /><div className="auth-panel-art__badge"><Sparkles size={14} /><span><small>NEW IN HELIX</small><strong>Your AI speaking companion</strong></span></div><div className="auth-panel-art__caption"><span><i /> AI COACH ONLINE</span><h3>Practice out loud.<br />Grow without pressure.</h3><div><b><Headphones size={15} /> Listen</b><b><MessageCircle size={15} /> Speak</b></div></div></div> : null}
      </div>
      <footer>© 2026 Hope School · HELIX v2.0</footer>
    </section>
  </div>;
}
