import React, { useState } from 'react';
import { CalendarDays, ClipboardCheck, FolderOpen, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button, DataTable, PageHeader, Section, StatusBadge, Tabs } from '../../components/UI';
import { assignments, materials, sessions } from '../../data/mockData';

export default function ClassDetailPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('sessions');
  const sessionCols = [{ key: 'date', label: 'Date' }, { key: 'title', label: 'Content' }, { key: 'time', label: 'Time' }, { key: 'attendance', label: 'Attendance' }, { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> }, { key: 'action', label: '', render: () => <Button size="sm" variant="secondary" onClick={() => navigate('/mentor/session')}>Open</Button> }];
  const assignmentCols = [{ key: 'title', label: 'Assignment' }, { key: 'due', label: 'Due date' }, { key: 'submitted', label: 'Submitted' }, { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> }];
  const materialCols = [{ key: 'name', label: 'File' }, { key: 'type', label: 'Type' }, { key: 'size', label: 'Size' }, { key: 'updated', label: 'Updated' }];
  return <>
    <PageHeader eyebrow="ME-03 · CLASS DETAIL" title="Everyday English A2 · Class 01" description="A2-01 · 24 students · Tuesday and Thursday at 19:00" breadcrumbs="My classes / A2-01" actions={<Button variant="secondary" onClick={() => navigate('/mentor/attendance')}>Attendance</Button>} />
    <div className="class-overview"><div><span><CalendarDays size={19} /></span><div><small>Next session</small><strong>16/07 · 19:00</strong></div></div><div><span><Users size={19} /></span><div><small>Capacity</small><strong>24/25</strong></div></div><div><span><ClipboardCheck size={19} /></span><div><small>Pending grading</small><strong>18</strong></div></div><div><span><FolderOpen size={19} /></span><div><small>Materials</small><strong>36 files</strong></div></div></div>
    <Tabs items={[{ key: 'sessions', label: 'Sessions' }, { key: 'students', label: 'Students' }, { key: 'assignments', label: 'Assignments' }, { key: 'attendance', label: 'Attendance' }, { key: 'materials', label: 'Materials' }]} active={tab} onChange={setTab} />
    <Section>{tab === 'sessions' ? <DataTable columns={sessionCols} rows={sessions} /> : tab === 'students' ? <DataTable columns={[{ key: 'name', label: 'Student' }, { key: 'email', label: 'Email' }, { key: 'attendance', label: 'Attendance' }, { key: 'progress', label: 'Progress' }]} rows={[{ id: 1, name: 'Nguyen Minh Anh', email: 'minhanh@hope.edu.vn', attendance: '96%', progress: '68%' }, { id: 2, name: 'Tran Gia Han', email: 'giahan@hope.edu.vn', attendance: '92%', progress: '64%' }]} /> : tab === 'assignments' ? <DataTable columns={assignmentCols} rows={assignments} /> : tab === 'attendance' ? <div className="attendance-summary"><div><strong>94%</strong><span>Average attendance rate</span></div><div><strong>11</strong><span>Recorded sessions</span></div><div><strong>4</strong><span>Late arrivals</span></div><div><strong>7</strong><span>Absences</span></div></div> : <DataTable columns={materialCols} rows={materials} />}</Section>
  </>;
}
