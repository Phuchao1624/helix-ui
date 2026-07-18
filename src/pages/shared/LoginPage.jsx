import React, { useState } from 'react';
import { ArrowRight, Eye, EyeOff, GraduationCap, LockKeyhole, Mail, Presentation, ShieldCheck, Sparkles, Workflow } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../layouts/AuthLayout';
import { Button, Field } from '../../components/UI';

const roles = [
  { key: 'student', label: 'Student', icon: GraduationCap },
  { key: 'mentor', label: 'Mentor', icon: Presentation },
  { key: 'coordinator', label: 'Coordinator', icon: Workflow },
  { key: 'admin', label: 'Admin', icon: ShieldCheck },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('student@hope.edu.vn');
  const [password, setPassword] = useState('Hope@2026');
  const [show, setShow] = useState(false);
  const [role, setRole] = useState('student');
  const [loading, setLoading] = useState(false);
  const submit = (event) => { event.preventDefault(); setLoading(true); window.setTimeout(() => navigate(`/${role}`), 450); };

  return <AuthLayout centered>
    <div className="login-form-shell">
      <div className="auth-form-header"><span className="screen-code"><Sparkles size={13} /> WELCOME BACK</span><h2>Continue your journey.</h2><p>Sign in with your Hope School account.</p></div>
      <form className="auth-form" onSubmit={submit} aria-busy={loading}>
        <Field label="Email" required><div className="input-with-icon"><Mail size={18} aria-hidden="true" /><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required /></div></Field>
        <Field label="Password" required><div className="input-with-icon"><LockKeyhole size={18} aria-hidden="true" /><input type={show ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required /><button type="button" onClick={() => setShow(!show)} aria-label={show ? 'Hide password' : 'Show password'}>{show ? <EyeOff size={18} /> : <Eye size={18} />}</button></div></Field>
        <div className="auth-form__row"><label className="checkbox"><input type="checkbox" defaultChecked /><span>Remember me</span></label><Link to="/forgot-password">Forgot password?</Link></div>
        <fieldset className="login-role-picker"><legend>Explore as</legend><div>{roles.map((item) => { const Icon = item.icon; return <button key={item.key} type="button" className={role === item.key ? 'is-active' : ''} aria-pressed={role === item.key} onClick={() => setRole(item.key)}><Icon size={16} /><span>{item.label}</span></button>; })}</div></fieldset>
        <Button type="submit" className="button--full login-submit" icon={ArrowRight} disabled={!email || !password || loading}>{loading ? 'Signing in…' : 'Sign in'}</Button>
      </form>
      <p className="auth-help">A safe learning space by Hope School · <button type="button">Get support</button></p>
    </div>
  </AuthLayout>;
}
