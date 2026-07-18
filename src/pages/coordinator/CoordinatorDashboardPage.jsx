import React from 'react';
import { AlertTriangle, ArrowRight, CalendarDays, Layers3, Plus, School, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import RoleDashboardHero from '../../components/RoleDashboardHero';
import { Button, DataTable, MetricStrip, Progress, Section, StatusBadge } from '../../components/UI';
import { classes, programs } from '../../data/mockData';

export default function CoordinatorDashboardPage() {
  const navigate = useNavigate();
  const columns = [
    { key: 'name', label: 'Lớp học', render: (row) => <div className="cell-primary"><strong>{row.name}</strong><small>{row.code}</small></div> },
    { key: 'mentor', label: 'Mentor' },
    { key: 'schedule', label: 'Lịch học' },
    { key: 'students', label: 'Sĩ số' },
    { key: 'status', label: 'Trạng thái', render: (row) => <StatusBadge status={row.status} /> },
  ];

  return <div className="role-dashboard role-dashboard--coordinator">
    <RoleDashboardHero
      role="coordinator"
      eyebrow="ĐIỀU PHỐI HỌC TẬP · HÔM NAY"
      title={<>Kết nối chương trình,<br /></>}
      accent="lớp học và con người"
      description="Một góc nhìn rõ ràng để cân bằng lịch học, mentor và sức chứa lớp trước khi vấn đề phát sinh."
      image="/assets/roles/coordinator-dashboard.jpg"
      imageAlt="Điều phối viên cùng đồng nghiệp lên kế hoạch chương trình học"
      meta={[{ icon: Layers3, label: '3 chương trình đang chạy' }, { icon: School, label: '12 lớp hoạt động' }, { icon: Users, label: '286 học sinh' }]}
      actions={<Button icon={Plus} onClick={() => navigate('/coordinator/programs')}>Tạo chương trình</Button>}
      status={{ short: 'CO', title: 'Kế hoạch tuần 29', detail: '24 buổi · 2 lớp cần mentor', state: 'Đang theo dõi' }}
    />
    <MetricStrip items={[{ label: 'Chương trình đang chạy', value: '3', note: '1 bản nháp' }, { label: 'Lớp đang hoạt động', value: '12', note: '286 học sinh' }, { label: 'Buổi học tuần này', value: '24', note: '6 buổi hôm nay' }, { label: 'Chờ xếp Mentor', value: '2', note: 'Cần xử lý', tone: 'danger' }]} />

    <div className="dashboard-grid dashboard-grid--wide">
      <Section title="Tiến độ chương trình" actions={<Button variant="ghost" onClick={() => navigate('/coordinator/programs')}>Tất cả chương trình <ArrowRight size={16} aria-hidden="true" /></Button>}><div className="program-progress-list">{programs.slice(0, 2).map((program) => <button key={program.id} onClick={() => navigate('/coordinator/programs')}><span><strong>{program.name}</strong><small>{program.term} · {program.students} học sinh</small></span><StatusBadge status={program.status} /><Progress value={program.progress} compact /></button>)}</div></Section>
      <Section title="Việc cần xử lý"><div className="task-list"><button><AlertTriangle size={18} aria-hidden="true" /><span><strong>2 lớp chưa có Mentor</strong><small>English Foundation 2026</small></span><b>Gán ngay</b></button><button><CalendarDays size={18} aria-hidden="true" /><span><strong>3 lịch học đang chờ xác nhận</strong><small>Thay đổi trong 24 giờ qua</small></span><b>Kiểm tra</b></button><button><School size={18} aria-hidden="true" /><span><strong>Lớp A2-02 gần đủ sĩ số</strong><small>23/25 học sinh</small></span><b>Xem lớp</b></button></div></Section>
    </div>
    <Section title="Lớp học sắp diễn ra" description="Danh sách các lớp trong 48 giờ tới." actions={<Button variant="secondary" onClick={() => navigate('/coordinator/classes')}>Quản lý lớp</Button>}><DataTable columns={columns} rows={classes} /></Section>
  </div>;
}
