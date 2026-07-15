import React from 'react';
import { ArrowRight, CalendarDays, ClipboardCheck, Clock3, ExternalLink, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button, DataTable, MetricStrip, PageHeader, Section, StatusBadge } from '../../components/UI';
import { assignments, sessions } from '../../data/mockData';

export default function MentorDashboardPage() {
  const navigate = useNavigate();
  const columns = [
    { key: 'title', label: 'Bài tập', render: (r) => <div className="cell-primary"><strong>{r.title}</strong><small>{r.course}</small></div> },
    { key: 'due', label: 'Hạn nộp' },
    { key: 'submitted', label: 'Đã nộp' },
    { key: 'status', label: 'Trạng thái', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'action', label: '', render: (r) => <Button size="sm" variant="secondary" onClick={() => navigate('/mentor/grading')}>{r.status === 'Grading' ? 'Chấm bài' : 'Xem'}</Button> },
  ];
  return <>
    <PageHeader variant="welcome" eyebrow="ME-01 · MENTOR" title="Chào buổi sáng, Hoàng Nam" description="Lịch dạy, điểm danh và bài cần chấm trong một nơi." />
    <MetricStrip items={[{ label: 'Lớp đang phụ trách', value: '3', note: '68 học sinh' }, { label: 'Buổi học tuần này', value: '6', note: '1 buổi hôm nay' }, { label: 'Bài chờ chấm', value: '31', note: '12 bài sắp quá hạn', tone: 'warning' }, { label: 'Tỷ lệ chuyên cần', value: '94%', note: '+2.4% so với tháng trước' }]} />
    <Section className="today-session" title="Buổi học hôm nay" description="Bắt đầu trong 2 giờ 18 phút."><div className="today-session__main"><div className="today-session__date"><span>THỨ NĂM</span><strong>16</strong><small>THÁNG 7</small></div><div className="today-session__info"><StatusBadge status="Upcoming" /><h2>Unit 6 · Giving directions</h2><p>Everyday English A2 · Lớp A2-01</p><div><span><Clock3 size={17} />19:00–20:30</span><span><Users size={17} />24 học sinh</span><span><CalendarDays size={17} />Online · Google Meet</span></div></div><div className="today-session__actions"><Button variant="secondary" onClick={() => navigate('/mentor/session')}>Chuẩn bị buổi học</Button><Button icon={ExternalLink}>Tham gia</Button></div></div></Section>
    <div className="dashboard-grid dashboard-grid--wide"><Section title="Lịch dạy sắp tới" actions={<Button variant="ghost" onClick={() => navigate('/mentor/classes')}>Xem lớp <ArrowRight size={16} /></Button>}><div className="compact-timeline">{sessions.map((s) => <button key={s.id} onClick={() => navigate('/mentor/session')}><span className="compact-timeline__date">{s.date.replace('Thứ ', 'T').slice(0, 5)}</span><span><strong>{s.title}</strong><small>{s.time} · {s.type}</small></span><StatusBadge status={s.status} /></button>)}</div></Section><Section title="Tác vụ nhanh"><div className="quick-action-list"><button onClick={() => navigate('/mentor/attendance')}><ClipboardCheck size={20} /><span><strong>Điểm danh buổi này</strong><small>A2-01 · 19:00 hôm nay</small></span><ArrowRight size={17} /></button><button onClick={() => navigate('/mentor/assignments')}><ClipboardCheck size={20} /><span><strong>Tạo bài tập mới</strong><small>Cho lớp đang phụ trách</small></span><ArrowRight size={17} /></button></div></Section></div>
    <Section title="Hàng đợi chấm bài" description="Ưu tiên bài gần đến hạn trả điểm." actions={<Button variant="secondary" onClick={() => navigate('/mentor/grading')}>Mở giao diện chấm</Button>}><DataTable columns={columns} rows={assignments} /></Section>
  </>;
}
