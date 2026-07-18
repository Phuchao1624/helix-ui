import React, { useState } from 'react';
import { Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../layouts/AuthLayout';
import { Button, Field, Progress } from '../../components/UI';

export default function FirstLoginSetupPage() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState('');
  const strength = Math.min(100, password.length * 11);
  return (
    <AuthLayout title="Welcome to HELIX." note="Complete one security step before starting your learning journey.">
      <div className="auth-form-header"><span className="screen-code">SH-03</span><h2>First-time setup</h2><p>Hello Minh Anh, create a new password for your account.</p></div>
      <form className="auth-form" onSubmit={(e) => { e.preventDefault(); navigate('/student'); }}>
        <div className="setup-identity"><span className="avatar">MA</span><div><strong>Nguyen Minh Anh</strong><small>HS-1024 · Student</small></div><ShieldCheck size={22} /></div>
        <Field label="New password" required hint="At least 8 characters with uppercase, lowercase, and a number."><div className="input-with-icon"><input type={show ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} /><button type="button" onClick={() => setShow(!show)} aria-label={show ? 'Hide password' : 'Show password'}>{show ? <EyeOff size={18} /> : <Eye size={18} />}</button></div></Field>
        <Progress value={strength} label={strength > 70 ? 'Strong password' : strength > 35 ? 'Moderate password' : 'Password strength'} compact />
        <Field label="Confirm password" required><input type="password" /></Field>
        <Field label="Profile photo" hint="Optional. You can change it later in Profile."><input type="file" accept="image/*" /></Field>
        <Button type="submit" className="button--full" disabled={password.length < 8}>Complete setup</Button>
      </form>
    </AuthLayout>
  );
}
