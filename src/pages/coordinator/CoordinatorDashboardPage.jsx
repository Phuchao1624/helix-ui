import React from 'react';
import { AlertTriangle, ArrowRight, CalendarDays, Plus, School } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button, DataTable, MetricStrip, PageHeader, Progress, Section, StatusBadge } from '../../components/UI';
import { classes, programs } from '../../data/mockData';

export default function CoordinatorDashboardPage() {
  const navigate = useNavigate();
  const columns = [
    { key: 'name', label: 'Lớp học', render: (r) => <div className="cell-primary"><strong>{r.name}</strong><small>{r.code}</small></div> },
    { key: 'mentor', label: 'Mentor' },
    { key: 'schedule', label: 'Lịch học' },
    { key: 'students', label: 'Sĩ số' },
    { key: 'status', label: 'Trạng thái', render: (r) => <StatusBadge status={r.status} /> },
  ];
  return <>
    <PageHeader variant="welcome" eyebrow="CO-01 · ĐIỀU PHỐI" title="Chào buổi sáng, Thu Hà" description="Theo dõi tiến độ chương trình, lớp học và các việc cần xử lý." actions={<Button icon={Plus} onClick={() => navigate('/coordinator/programs')}>Tạo chương trình</Button>} />
    <MetricStrip items={[{ label: 'Chương trình đang chạy', value: '3', note: '1 bản nháp' }, { label: 'Lớp đang hoạt động', value: '12', note: '286 học sinh' }, { label: 'Buổi học tuần này', value: '24', note: '6 buổi hôm nay' }, { label: 'Chờ xếp Mentor', value: '2', note: 'Cần xử lý', tone: 'danger' }]} />
    <div className="dashboard-grid dashboard-grid--wide">
      <Section title="Tiến độ chương trình" actions={<Button variant="ghost" onClick={() => navigate('/coordinator/programs')}>Tất cả chương trình <ArrowRight size={16} /></Button>}><div className="program-progress-list">{programs.slice(0, 2).map((p) => <button key={p.id} onClick={() => navigate('/coordinator/programs')}><span><strong>{p.name}</strong><small>{p.term} · {p.students} học sinh</small></span><StatusBadge status={p.status} /><Progress value={p.progress} compact /></button>)}</div></Section>
      <Section title="Việc cần xử lý"><div className="task-list"><button><AlertTriangle size={18} /><span><strong>2 lớp chưa có Mentor</strong><small>English Foundation 2026</small></span><b>Gán ngay</b></button><button><CalendarDays size={18} /><span><strong>3 lịch học đang chờ xác nhận</strong><small>Thay đổi trong 24 giờ qua</small></span><b>Kiểm tra</b></button><button><School size={18} /><span><strong>Lớp A2-02 gần đủ sĩ số</strong><small>23/25 học sinh</small></span><b>Xem lớp</b></button></div></Section>
    </div>
    <Section title="Lớp học sắp diễn ra" description="Danh sách các lớp trong 48 giờ tới." actions={<Button variant="secondary" onClick={() => navigate('/coordinator/classes')}>Quản lý lớp</Button>}><DataTable columns={columns} rows={classes} /></Section>
  </>;
}
