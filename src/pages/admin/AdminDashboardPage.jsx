import React from 'react';
import { AlertTriangle, ArrowRight, ShieldCheck, UserPlus, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button, DataTable, MetricStrip, PageHeader, Section, StatusBadge } from '../../components/UI';
import { users } from '../../data/mockData';

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const columns = [
    { key: 'name', label: 'Người dùng', render: (r) => <div className="cell-primary"><strong>{r.name}</strong><small>{r.email}</small></div> },
    { key: 'role', label: 'Vai trò' },
    { key: 'status', label: 'Trạng thái', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'lastLogin', label: 'Đăng nhập gần nhất' },
  ];
  return <>
    <PageHeader variant="welcome" eyebrow="AD-01 · QUẢN TRỊ" title="Tổng quan hệ thống" description="Tình trạng tài khoản, vận hành và cấu hình HELIX hôm nay." actions={<Button icon={UserPlus} onClick={() => navigate('/admin/users/new')}>Tạo người dùng</Button>} />
    <MetricStrip items={[{ label: 'Tổng người dùng', value: '428', note: '+18 trong tháng' }, { label: 'Đang hoạt động', value: '397', note: '92.8%' }, { label: 'Chờ kích hoạt', value: '21', note: 'Cần theo dõi', tone: 'warning' }, { label: 'Khoá / vô hiệu', value: '10', note: '2 thay đổi tuần này' }]} />
    <div className="dashboard-grid dashboard-grid--wide">
      <Section title="Tình trạng vận hành" description="Các mục cần quản trị viên xử lý." actions={<Button variant="ghost" onClick={() => navigate('/admin/config')}>Mở cấu hình <ArrowRight size={16} /></Button>}>
        <div className="ops-list"><button><span className="ops-list__icon ops-list__icon--warning"><AlertTriangle size={19} /></span><span><strong>3 tài khoản đăng nhập sai nhiều lần</strong><small>Trong 24 giờ gần nhất</small></span><b>Kiểm tra</b></button><button><span className="ops-list__icon"><ShieldCheck size={19} /></span><span><strong>Sao lưu cấu hình hoàn tất</strong><small>02:00 · 15/07/2026</small></span><b>Chi tiết</b></button><button><span className="ops-list__icon"><Users size={19} /></span><span><strong>21 tài khoản chưa kích hoạt</strong><small>Link mời sẽ hết hạn trong 48 giờ</small></span><b>Gửi lại</b></button></div>
      </Section>
      <Section title="Phân bổ vai trò"><div className="role-distribution"><div><span>Học sinh</span><strong>346</strong><i style={{ width: '81%' }} /></div><div><span>Mentor</span><strong>46</strong><i style={{ width: '34%' }} /></div><div><span>Điều phối viên</span><strong>28</strong><i style={{ width: '24%' }} /></div><div><span>Quản trị viên</span><strong>8</strong><i style={{ width: '12%' }} /></div></div></Section>
    </div>
    <Section title="Người dùng gần đây" description="Những tài khoản vừa đăng nhập hoặc thay đổi trạng thái." actions={<Button variant="secondary" onClick={() => navigate('/admin/users')}>Xem tất cả</Button>}><DataTable columns={columns} rows={users.slice(0, 5)} /></Section>
  </>;
}
