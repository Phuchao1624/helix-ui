import React, { useState } from 'react';
import { CalendarClock, MoreHorizontal, Plus } from 'lucide-react';
import { Button, DataTable, Field, Modal, PageHeader, Section, StatusBadge, Tabs, UploadZone } from '../../components/UI';
import { assignments } from '../../data/mockData';

export default function AssignmentsPage() {
  const [tab, setTab] = useState('All');
  const [open, setOpen] = useState(false);
  const rows = assignments.filter((a) => tab === 'All' || a.status === tab);
  const columns = [
    { key: 'title', label: 'Assignment', render: (r) => <div className="cell-primary"><strong>{r.title}</strong><small>{r.course} · {r.skill}</small></div> },
    { key: 'due', label: 'Due date' },
    { key: 'submitted', label: 'Submitted' },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'actions', label: '', render: (r) => <button className="icon-button" aria-label={`Open actions for ${r.title}`}><MoreHorizontal size={18} /></button> },
  ];
  return <>
    <PageHeader eyebrow="ME-07 · ASSIGNMENTS" title="Assignment management" description="Create, publish, and track assignments across your classes." actions={<Button icon={Plus} onClick={() => setOpen(true)}>Create assignment</Button>} />
    <Section><div className="toolbar"><select aria-label="Filter by class"><option>All classes</option><option>A2-01</option><option>A2-02</option></select><select aria-label="Sort assignments"><option>Nearest due date</option><option>Recently created</option></select></div><Tabs items={['All', 'Draft', 'Active', 'Grading', 'Returned']} active={tab} onChange={setTab} /><DataTable columns={columns} rows={rows} /></Section>
    <Modal open={open} onClose={() => setOpen(false)} size="lg" title="Create assignment" footer={<><Button variant="secondary" onClick={() => setOpen(false)}>Save draft</Button><Button onClick={() => setOpen(false)}>Publish</Button></>}><div className="form-grid"><Field label="Title" required><input placeholder="Example: Voice note: My neighbourhood" /></Field><Field label="Class" required><select><option>A2-01 · Everyday English A2</option></select></Field><Field label="Skill area" required><select><option>Speaking</option><option>Writing</option><option>Reading</option><option>Listening</option><option>Vocabulary</option></select></Field><Field label="Deadline" required><div className="input-with-icon"><CalendarClock size={18} /><input type="datetime-local" /></div></Field><Field label="Maximum score" required><input type="number" defaultValue="10" /></Field><Field label="Instructions" required><textarea rows="5" placeholder="Describe the assignment requirements..." /></Field><div className="form-grid__full"><UploadZone title="Attach reference material" /></div></div><div className="policy-grid"><label><input type="checkbox" defaultChecked /><span><strong>Allow late submissions</strong><small>Deduct 10% after the deadline</small></span></label><label><input type="checkbox" defaultChecked /><span><strong>Allow resubmission</strong><small>Up to 2 attempts</small></span></label><label><input type="checkbox" /><span><strong>Schedule publication</strong><small>Publish at the selected time</small></span></label></div></Modal>
  </>;
}
