import React, { useState } from 'react';
import { Camera, KeyRound, Save } from 'lucide-react';
import { Button, Field, PageHeader, Section, Tabs, Toast } from '../../components/UI';

export default function ProfileSettingsPage() {
  const [tab, setTab] = useState('profile');
  const [saved, setSaved] = useState(false);
  return <>
    <PageHeader eyebrow="SH-04 · TÀI KHOẢN" title="Hồ sơ cá nhân" description="Quản lý thông tin liên hệ và bảo mật tài khoản." />
    <Tabs items={[{ key: 'profile', label: 'Thông tin cá nhân' }, { key: 'security', label: 'Bảo mật' }, { key: 'preferences', label: 'Tuỳ chọn' }]} active={tab} onChange={setTab} />
    {tab === 'profile' ? <Section><div className="profile-grid"><div className="profile-photo"><span className="avatar avatar--xl">MA</span><Button variant="secondary" icon={Camera}>Thay ảnh</Button><small>JPG hoặc PNG, tối đa 2 MB.</small></div><form className="form-grid" onSubmit={(e) => { e.preventDefault(); setSaved(true); setTimeout(() => setSaved(false), 2500); }}><Field label="Họ và tên"><input defaultValue="Nguyễn Minh Anh" /></Field><Field label="Mã người dùng"><input defaultValue="HS-1024" disabled /></Field><Field label="Email"><input defaultValue="minhanh@hope.edu.vn" disabled /></Field><Field label="Số điện thoại"><input defaultValue="090 123 4567" /></Field><Field label="Ngày sinh"><input type="date" defaultValue="2010-08-18" /></Field><Field label="Ngôn ngữ"><select defaultValue="vi"><option value="vi">Tiếng Việt</option><option value="en">English</option></select></Field><div className="form-actions"><Button type="submit" icon={Save}>Lưu thay đổi</Button></div></form></div></Section> : tab === 'security' ? <Section title="Đổi mật khẩu" description="Mật khẩu mới sẽ đăng xuất tài khoản khỏi các thiết bị khác."><form className="form-grid form-grid--narrow"><Field label="Mật khẩu hiện tại" required><input type="password" /></Field><Field label="Mật khẩu mới" required><input type="password" /></Field><Field label="Xác nhận mật khẩu" required><input type="password" /></Field><div className="form-actions"><Button icon={KeyRound}>Cập nhật mật khẩu</Button></div></form></Section> : <Section title="Tuỳ chọn thông báo"><div className="settings-list"><label><span><strong>Email nhắc lịch học</strong><small>Nhận thông báo trước buổi học 24 giờ.</small></span><input type="checkbox" defaultChecked /></label><label><span><strong>Thông báo bài tập</strong><small>Khi có bài mới, sắp hết hạn hoặc được trả điểm.</small></span><input type="checkbox" defaultChecked /></label><label><span><strong>Tóm tắt hàng tuần</strong><small>Nhận báo cáo tiến độ vào sáng thứ Hai.</small></span><input type="checkbox" /></label></div></Section>}
    {saved ? <Toast>Đã lưu thay đổi hồ sơ.</Toast> : null}
  </>;
}
