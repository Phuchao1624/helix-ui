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
    <AuthLayout title="Chào mừng bạn đến với HELIX." note="Hoàn tất một bước bảo mật trước khi bắt đầu hành trình học tập.">
      <div className="auth-form-header"><span className="screen-code">SH-03</span><h2>Thiết lập lần đầu</h2><p>Xin chào Minh Anh, hãy tạo mật khẩu mới cho tài khoản.</p></div>
      <form className="auth-form" onSubmit={(e) => { e.preventDefault(); navigate('/student'); }}>
        <div className="setup-identity"><span className="avatar">MA</span><div><strong>Nguyễn Minh Anh</strong><small>HS-1024 · Học sinh</small></div><ShieldCheck size={22} /></div>
        <Field label="Mật khẩu mới" required hint="Tối thiểu 8 ký tự, gồm chữ hoa, chữ thường và số."><div className="input-with-icon"><input type={show ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} /><button type="button" onClick={() => setShow(!show)}>{show ? <EyeOff size={18} /> : <Eye size={18} />}</button></div></Field>
        <Progress value={strength} label={strength > 70 ? 'Mật khẩu tốt' : strength > 35 ? 'Mật khẩu trung bình' : 'Độ mạnh mật khẩu'} compact />
        <Field label="Xác nhận mật khẩu" required><input type="password" /></Field>
        <Field label="Ảnh đại diện" hint="Tuỳ chọn. Có thể thay đổi sau trong Hồ sơ."><input type="file" accept="image/*" /></Field>
        <Button type="submit" className="button--full" disabled={password.length < 8}>Hoàn tất thiết lập</Button>
      </form>
    </AuthLayout>
  );
}
