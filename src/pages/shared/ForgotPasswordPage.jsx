import React, { useState } from 'react';
import { ArrowLeft, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../layouts/AuthLayout';
import { Button, Field, InlineNotice } from '../../components/UI';

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState('');
  return (
    <AuthLayout title="Recover access in just a few minutes." note="For your security, this process does not reveal whether an email exists in the system.">
      <div className="auth-form-header"><span className="screen-code">SH-02</span><h2>Forgot password</h2><p>{sent ? 'Check your inbox to continue.' : 'Enter your Hope School email address.'}</p></div>
      {!sent ? <form className="auth-form" onSubmit={(e) => { e.preventDefault(); setSent(true); }}><Field label="Email" required><div className="input-with-icon"><Mail size={18} /><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@hope.edu.vn" /></div></Field><Button type="submit" className="button--full" disabled={!email}>Send reset link</Button></form> : <div className="auth-success"><InlineNotice tone="success" title="Request received">If the email exists, you will receive a password reset link valid for 15 minutes.</InlineNotice><Button variant="secondary" className="button--full" onClick={() => setSent(false)}>Try another email</Button></div>}
      <Link className="back-link" to="/login"><ArrowLeft size={17} />Back to sign in</Link>
    </AuthLayout>
  );
}
