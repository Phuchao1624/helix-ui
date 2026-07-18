import React from 'react';
import { Activity, AlertTriangle, ArrowRight, Database, ShieldCheck, UserPlus, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import RoleDashboardHero from '../../components/RoleDashboardHero';
import { Button, DataTable, MetricStrip, Section, StatusBadge } from '../../components/UI';
import { users } from '../../data/mockData';

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const columns = [
    { key: 'name', label: 'User', render: (row) => <div className="cell-primary"><strong>{row.name}</strong><small>{row.email}</small></div> },
    { key: 'role', label: 'Role' },
    { key: 'status', label: 'Status', render: (row) => <StatusBadge status={row.status} /> },
    { key: 'lastLogin', label: 'Last sign-in' },
  ];

  return <div className="role-dashboard role-dashboard--admin">
    <RoleDashboardHero
      role="admin"
      eyebrow="SYSTEM ADMINISTRATION · SATURDAY, 18 JUL"
      title={<>Run HELIX<br /></>}
      accent="with confidence every day"
      description="Monitor system health, resolve account issues, and keep every learning activity running smoothly."
      image="/assets/roles/admin-dashboard.jpg"
      imageAlt="An administrator monitoring HELIX operations in the office"
      meta={[{ icon: Activity, label: '99.98% uptime' }, { icon: Database, label: 'Backup at 02:00' }, { icon: ShieldCheck, label: 'No critical alerts' }]}
      actions={<Button icon={UserPlus} onClick={() => navigate('/admin/users/new')}>Create user</Button>}
      status={{ short: 'HX', title: 'HELIX system', detail: 'Last synced 2 minutes ago', state: 'Stable' }}
    />
    <MetricStrip items={[{ label: 'Total users', value: '428', note: '+18 this month' }, { label: 'Active', value: '397', note: '92.8%' }, { label: 'Awaiting activation', value: '21', note: 'Needs attention', tone: 'warning' }, { label: 'Locked / disabled', value: '10', note: '2 changes this week' }]} />

    <div className="dashboard-grid dashboard-grid--wide">
      <Section title="Operational priorities" description="Three items to address first today." actions={<Button variant="ghost" onClick={() => navigate('/admin/config')}>Open settings <ArrowRight size={16} aria-hidden="true" /></Button>}>
        <div className="ops-list">
          <button><span className="ops-list__icon ops-list__icon--warning"><AlertTriangle size={19} aria-hidden="true" /></span><span><strong>3 accounts have repeated failed sign-ins</strong><small>Within the last 24 hours</small></span><b>Review</b></button>
          <button><span className="ops-list__icon"><ShieldCheck size={19} aria-hidden="true" /></span><span><strong>Configuration backup completed</strong><small>02:00 · 18/07/2026</small></span><b>Details</b></button>
          <button><span className="ops-list__icon"><Users size={19} aria-hidden="true" /></span><span><strong>21 accounts are not activated</strong><small>Invitation links expire in 48 hours</small></span><b>Resend</b></button>
        </div>
      </Section>
      <Section title="Role distribution"><div className="role-distribution"><div><span>Students</span><strong>346</strong><i style={{ width: '81%' }} /></div><div><span>Mentors</span><strong>46</strong><i style={{ width: '34%' }} /></div><div><span>Coordinators</span><strong>28</strong><i style={{ width: '24%' }} /></div><div><span>Administrators</span><strong>8</strong><i style={{ width: '12%' }} /></div></div></Section>
    </div>
    <Section title="Recent users" description="Accounts with recent sign-ins or status changes." actions={<Button variant="secondary" onClick={() => navigate('/admin/users')}>View all</Button>}><DataTable columns={columns} rows={users.slice(0, 5)} /></Section>
  </div>;
}
