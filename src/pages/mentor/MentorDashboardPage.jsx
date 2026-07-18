import React from 'react';
import { ArrowRight, BookOpenCheck, CalendarDays, ClipboardCheck, Clock3, ExternalLink, Sparkles, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import RoleDashboardHero from '../../components/RoleDashboardHero';
import { Button, DataTable, MetricStrip, Section, StatusBadge } from '../../components/UI';
import { assignments, sessions } from '../../data/mockData';

export default function MentorDashboardPage() {
  const navigate = useNavigate();
  const columns = [
    { key: 'title', label: 'Bài tập', render: (row) => <div className="cell-primary"><strong>{row.title}</strong><small>{row.course}</small></div> },
    { key: 'due', label: 'Hạn nộp' },
    { key: 'submitted', label: 'Đã nộp' },
    { key: 'status', label: 'Trạng thái', render: (row) => <StatusBadge status={row.status} /> },
    { key: 'action', label: '', render: (row) => <Button size="sm" variant="secondary" onClick={() => navigate('/mentor/grading')}>{row.status === 'Grading' ? 'Chấm bài' : 'Xem'}</Button> },
  ];

  return <div className="role-dashboard role-dashboard--mentor">
    <RoleDashboardHero
      role="mentor"
      eyebrow="KHÔNG GIAN GIẢNG DẠY · THỨ BẢY"
      title={<>Sẵn sàng cho một<br /></>}
      accent="buổi học thật cuốn hút"
      description="Chuẩn bị lớp, theo dõi học sinh và xử lý bài chấm trong một nhịp làm việc tập trung."
      image="/assets/roles/mentor-dashboard.jpg"
      imageAlt="Mentor tiếng Anh hướng dẫn học viên trong lớp giao tiếp"
      meta={[{ icon: CalendarDays, label: 'Lớp A2-01 lúc 19:00' }, { icon: Users, label: '24 học sinh' }, { icon: Sparkles, label: 'Unit 6 · Speaking' }]}
      actions={<><Button onClick={() => navigate('/mentor/session')}>Chuẩn bị buổi học <ArrowRight size={16} aria-hidden="true" /></Button><Button variant="light" onClick={() => navigate('/mentor/classes')}>Xem lớp của tôi</Button></>}
      status={{ short: 'A2', title: 'Unit 6 · Giving directions', detail: 'Google Meet · 90 phút', state: 'Sẵn sàng' }}
    />
    <MetricStrip items={[{ label: 'Lớp đang phụ trách', value: '3', note: '68 học sinh' }, { label: 'Buổi học tuần này', value: '6', note: '1 buổi hôm nay' }, { label: 'Bài chờ chấm', value: '31', note: '12 bài sắp quá hạn', tone: 'warning' }, { label: 'Tỷ lệ chuyên cần', value: '94%', note: '+2.4% so với tháng trước' }]} />

    <Section className="today-session" title="Buổi học hôm nay" description="Bắt đầu trong 2 giờ 18 phút."><div className="today-session__main"><div className="today-session__date"><span>THỨ BẢY</span><strong>18</strong><small>THÁNG 7</small></div><div className="today-session__info"><StatusBadge status="Upcoming" /><h2>Unit 6 · Giving directions</h2><p>Everyday English A2 · Lớp A2-01</p><div><span><Clock3 size={17} aria-hidden="true" />19:00–20:30</span><span><Users size={17} aria-hidden="true" />24 học sinh</span><span><CalendarDays size={17} aria-hidden="true" />Online · Google Meet</span></div></div><div className="today-session__actions"><Button variant="secondary" onClick={() => navigate('/mentor/session')}>Chuẩn bị buổi học</Button><Button icon={ExternalLink}>Tham gia</Button></div></div></Section>
    <div className="dashboard-grid dashboard-grid--wide"><Section title="Lịch dạy sắp tới" actions={<Button variant="ghost" onClick={() => navigate('/mentor/classes')}>Xem lớp <ArrowRight size={16} aria-hidden="true" /></Button>}><div className="compact-timeline">{sessions.map((session) => <button key={session.id} onClick={() => navigate('/mentor/session')}><span className="compact-timeline__date">{session.date.replace('Thứ ', 'T').slice(0, 5)}</span><span><strong>{session.title}</strong><small>{session.time} · {session.type}</small></span><StatusBadge status={session.status} /></button>)}</div></Section><Section title="Tác vụ nhanh"><div className="quick-action-list"><button onClick={() => navigate('/mentor/attendance')}><ClipboardCheck size={20} aria-hidden="true" /><span><strong>Điểm danh buổi này</strong><small>A2-01 · 19:00 hôm nay</small></span><ArrowRight size={17} aria-hidden="true" /></button><button onClick={() => navigate('/mentor/assignments')}><BookOpenCheck size={20} aria-hidden="true" /><span><strong>Tạo bài tập mới</strong><small>Cho lớp đang phụ trách</small></span><ArrowRight size={17} aria-hidden="true" /></button></div></Section></div>
    <Section title="Hàng đợi chấm bài" description="Ưu tiên bài gần đến hạn trả điểm." actions={<Button variant="secondary" onClick={() => navigate('/mentor/grading')}>Mở giao diện chấm</Button>}><DataTable columns={columns} rows={assignments} /></Section>
  </div>;
}
