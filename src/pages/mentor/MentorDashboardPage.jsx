import React from 'react';
import { ArrowRight, BookOpenCheck, CalendarDays, ClipboardCheck, Clock3, ExternalLink, Sparkles, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import RoleDashboardHero from '../../components/RoleDashboardHero';
import { Button, DataTable, MetricStrip, Section, StatusBadge } from '../../components/UI';
import { assignments, sessions } from '../../data/mockData';

export default function MentorDashboardPage() {
  const navigate = useNavigate();
  const columns = [
    { key: 'title', label: 'Assignment', render: (row) => <div className="cell-primary"><strong>{row.title}</strong><small>{row.course}</small></div> },
    { key: 'due', label: 'Due date' },
    { key: 'submitted', label: 'Submitted' },
    { key: 'status', label: 'Status', render: (row) => <StatusBadge status={row.status} /> },
    { key: 'action', label: '', render: (row) => <Button size="sm" variant="secondary" onClick={() => navigate('/mentor/grading')}>{row.status === 'Grading' ? 'Grade' : 'View'}</Button> },
  ];

  return <div className="role-dashboard role-dashboard--mentor">
    <RoleDashboardHero
      role="mentor"
      eyebrow="TEACHING WORKSPACE · SATURDAY"
      title={<>Ready to lead an<br /></>}
      accent="engaging class"
      description="Prepare lessons, monitor students, and manage grading in one focused workflow."
      image="/assets/roles/mentor-dashboard.jpg"
      imageAlt="An English mentor guiding students in a speaking class"
      meta={[{ icon: CalendarDays, label: 'Class A2-01 at 19:00' }, { icon: Users, label: '24 students' }, { icon: Sparkles, label: 'Unit 6 · Speaking' }]}
      actions={<><Button onClick={() => navigate('/mentor/session')}>Prepare session <ArrowRight size={16} aria-hidden="true" /></Button><Button variant="light" onClick={() => navigate('/mentor/classes')}>View my classes</Button></>}
      status={{ short: 'A2', title: 'Unit 6 · Giving directions', detail: 'Google Meet · 90 minutes', state: 'Ready' }}
    />
    <MetricStrip items={[{ label: 'Assigned classes', value: '3', note: '68 students' }, { label: 'Sessions this week', value: '6', note: '1 today' }, { label: 'Pending grading', value: '31', note: '12 nearing deadline', tone: 'warning' }, { label: 'Attendance rate', value: '94%', note: '+2.4% from last month' }]} />

    <Section className="today-session" title="Today's session" description="Starts in 2 hours 18 minutes."><div className="today-session__main"><div className="today-session__date"><span>SATURDAY</span><strong>18</strong><small>JULY</small></div><div className="today-session__info"><StatusBadge status="Upcoming" /><h2>Unit 6 · Giving directions</h2><p>Everyday English A2 · Class A2-01</p><div><span><Clock3 size={17} aria-hidden="true" />19:00–20:30</span><span><Users size={17} aria-hidden="true" />24 students</span><span><CalendarDays size={17} aria-hidden="true" />Online · Google Meet</span></div></div><div className="today-session__actions"><Button variant="secondary" onClick={() => navigate('/mentor/session')}>Prepare session</Button><Button icon={ExternalLink}>Join</Button></div></div></Section>
    <div className="dashboard-grid dashboard-grid--wide"><Section title="Upcoming teaching schedule" actions={<Button variant="ghost" onClick={() => navigate('/mentor/classes')}>View classes <ArrowRight size={16} aria-hidden="true" /></Button>}><div className="compact-timeline">{sessions.map((session) => <button key={session.id} onClick={() => navigate('/mentor/session')}><span className="compact-timeline__date">{session.date.slice(0, 5)}</span><span><strong>{session.title}</strong><small>{session.time} · {session.type}</small></span><StatusBadge status={session.status} /></button>)}</div></Section><Section title="Quick actions"><div className="quick-action-list"><button onClick={() => navigate('/mentor/attendance')}><ClipboardCheck size={20} aria-hidden="true" /><span><strong>Take attendance</strong><small>A2-01 · 19:00 today</small></span><ArrowRight size={17} aria-hidden="true" /></button><button onClick={() => navigate('/mentor/assignments')}><BookOpenCheck size={20} aria-hidden="true" /><span><strong>Create assignment</strong><small>For an assigned class</small></span><ArrowRight size={17} aria-hidden="true" /></button></div></Section></div>
    <Section title="Grading queue" description="Prioritize submissions nearing their feedback deadline." actions={<Button variant="secondary" onClick={() => navigate('/mentor/grading')}>Open grading workspace</Button>}><DataTable columns={columns} rows={assignments} /></Section>
  </div>;
}
