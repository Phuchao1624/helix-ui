import React, { useState } from 'react';
import { CalendarPlus, MoreHorizontal, Plus } from 'lucide-react';
import { Button, DataTable, Field, Modal, PageHeader, Section, StatusBadge } from '../../components/UI';
import { classes } from '../../data/mockData';

export default function ClassesPage() {
  const [open, setOpen] = useState(false);
  const columns = [
    { key: 'code', label: 'Class code' },
    { key: 'name', label: 'Class name' },
    { key: 'mentor', label: 'Mentor' },
    { key: 'schedule', label: 'Schedule' },
    { key: 'students', label: 'Capacity' },
    { key: 'next', label: 'Next session' },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'actions', label: '', render: (r) => <button className="icon-button" aria-label={`Open actions for ${r.name}`}><MoreHorizontal size={18} /></button> },
  ];
  return <>
    <PageHeader eyebrow="CO-04 · COURSE TAB" title="Class management" description="Everyday English A2 · Configure mentors, capacity, and schedules." breadcrumbs="Programs / English Foundation 2026 / Everyday English A2 / Classes" actions={<Button icon={Plus} onClick={() => setOpen(true)}>Create class</Button>} />
    <Section><DataTable columns={columns} rows={classes} /></Section>
    <Modal open={open} onClose={() => setOpen(false)} size="lg" title="Create class" description="Schedule Builder will generate the planned session list." footer={<><Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={() => setOpen(false)}>Create class</Button></>}><div className="form-grid"><Field label="Class name" required><input placeholder="Everyday English A2 · Class 03" /></Field><Field label="Class code" required><input placeholder="A2-03" /></Field><Field label="Assigned mentor" required><select><option>Select mentor</option><option>Le Hoang Nam</option><option>Nguyen Ha My</option></select></Field><Field label="Maximum capacity" required><input type="number" defaultValue="25" /></Field></div><div className="schedule-builder"><div className="schedule-builder__title"><CalendarPlus size={19} /><strong>Schedule Builder</strong></div><div className="weekday-picker">{['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((d) => <button key={d} className={d === 'Tue' || d === 'Thu' ? 'is-active' : ''}>{d}</button>)}</div><div className="form-grid"><Field label="Start time"><input type="time" defaultValue="19:00" /></Field><Field label="Duration"><select><option>90 minutes</option><option>60 minutes</option><option>120 minutes</option></select></Field><Field label="Number of weeks"><input type="number" defaultValue="12" /></Field><Field label="Start date"><input type="date" defaultValue="2026-07-20" /></Field></div><div className="schedule-preview"><strong>24 planned sessions</strong><span>First session: 21/07/2026 · Last session: 08/10/2026</span></div></div></Modal>
  </>;
}
