import React, { useState } from 'react';
import { ArrowLeft, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../layouts/AuthLayout';
import { Button, Field, InlineNotice } from '../../components/UI';

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState('');
  return (
    <AuthLayout title="Lấy lại quyền truy cập trong vài phút." note="Quy trình bảo mật không tiết lộ email có tồn tại trong hệ thống hay không.">
      <div className="auth-form-header"><span className="screen-code">SH-02</span><h2>Quên mật khẩu</h2><p>{sent ? 'Kiểm tra hộp thư để tiếp tục.' : 'Nhập email được cấp bởi Hope School.'}</p></div>
      {!sent ? <form className="auth-form" onSubmit={(e) => { e.preventDefault(); setSent(true); }}><Field label="Email" required><div className="input-with-icon"><Mail size={18} /><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@hope.edu.vn" /></div></Field><Button type="submit" className="button--full" disabled={!email}>Gửi link đặt lại</Button></form> : <div className="auth-success"><InlineNotice tone="success" title="Yêu cầu đã được ghi nhận">Nếu email tồn tại, bạn sẽ nhận được liên kết đặt lại mật khẩu có hiệu lực trong 15 phút.</InlineNotice><Button variant="secondary" className="button--full" onClick={() => setSent(false)}>Gửi lại bằng email khác</Button></div>}
      <Link className="back-link" to="/login"><ArrowLeft size={17} />Quay lại đăng nhập</Link>
    </AuthLayout>
  );
}
