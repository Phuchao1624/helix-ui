import React from 'react';
import { AlertTriangle, ArrowRight, CalendarDays, Layers3, Plus, School, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import RoleDashboardHero from '../../components/RoleDashboardHero';
import { Button, DataTable, MetricStrip, Progress, Section, StatusBadge } from '../../components/UI';
import { classes, programs } from '../../data/mockData';

export default function CoordinatorDashboardPage() {
  const navigate = useNavigate();
  const columns = [
    { key: 'name', label: 'Class', render: (row) => <div className="cell-primary"><strong>{row.name}</strong><small>{row.code}</small></div> },
    { key: 'mentor', label: 'Mentor' },
    { key: 'schedule', label: 'Schedule' },
    { key: 'students', label: 'Capacity' },
    { key: 'status', label: 'Status', render: (row) => <StatusBadge status={row.status} /> },
  ];

  return <div className="role-dashboard role-dashboard--coordinator">
    <RoleDashboardHero
      role="coordinator"
      eyebrow="LEARNING OPERATIONS · TODAY"
      title={<>Connect programs,<br /></>}
      accent="classes and people"
      description="A clear view to balance schedules, mentors, and class capacity before issues arise."
      image="/assets/roles/coordinator-dashboard.jpg"
      imageAlt="A coordinator planning a learning program with colleagues"
      meta={[{ icon: Layers3, label: '3 active programs' }, { icon: School, label: '12 active classes' }, { icon: Users, label: '286 students' }]}
      actions={<Button icon={Plus} onClick={() => navigate('/coordinator/programs')}>Create program</Button>}
      status={{ short: 'CO', title: 'Week 29 plan', detail: '24 sessions · 2 classes need mentors', state: 'On track' }}
    />
    <MetricStrip items={[{ label: 'Active programs', value: '3', note: '1 draft' }, { label: 'Active classes', value: '12', note: '286 students' }, { label: 'Sessions this week', value: '24', note: '6 today' }, { label: 'Awaiting mentors', value: '2', note: 'Action needed', tone: 'danger' }]} />

    <div className="dashboard-grid dashboard-grid--wide">
      <Section title="Program progress" actions={<Button variant="ghost" onClick={() => navigate('/coordinator/programs')}>All programs <ArrowRight size={16} aria-hidden="true" /></Button>}><div className="program-progress-list">{programs.slice(0, 2).map((program) => <button key={program.id} onClick={() => navigate('/coordinator/programs')}><span><strong>{program.name}</strong><small>{program.term} · {program.students} students</small></span><StatusBadge status={program.status} /><Progress value={program.progress} compact /></button>)}</div></Section>
      <Section title="Items requiring attention"><div className="task-list"><button><AlertTriangle size={18} aria-hidden="true" /><span><strong>2 classes have no mentor</strong><small>English Foundation 2026</small></span><b>Assign now</b></button><button><CalendarDays size={18} aria-hidden="true" /><span><strong>3 schedules await confirmation</strong><small>Changed in the last 24 hours</small></span><b>Review</b></button><button><School size={18} aria-hidden="true" /><span><strong>Class A2-02 is nearly full</strong><small>23/25 students</small></span><b>View class</b></button></div></Section>
    </div>
    <Section title="Upcoming classes" description="Classes scheduled in the next 48 hours." actions={<Button variant="secondary" onClick={() => navigate('/coordinator/classes')}>Manage classes</Button>}><DataTable columns={columns} rows={classes} /></Section>
  </div>;
}
