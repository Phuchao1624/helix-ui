import React, { useState } from 'react';
import { BookOpen, MoreHorizontal, Plus } from 'lucide-react';
import { Button, DataTable, Field, Modal, PageHeader, Section, StatusBadge } from '../../components/UI';
import { courses } from '../../data/mockData';

export default function CoursesPage() {
  const [open, setOpen] = useState(false);
  const columns = [
    { key: 'code', label: 'Course code' },
    { key: 'name', label: 'Course', render: (r) => <div className="cell-primary"><strong>{r.name}</strong><small>Part of English Foundation 2026</small></div> },
    { key: 'level', label: 'Level' },
    { key: 'classes', label: 'Classes' },
    { key: 'students', label: 'Students' },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'actions', label: '', render: (r) => <button className="icon-button" aria-label={`Open actions for ${r.name}`}><MoreHorizontal size={18} /></button> },
  ];
  return <>
    <PageHeader eyebrow="CO-03 · PROGRAM TAB" title="Course management" description="English Foundation 2026 · Build learning goals and class structure." breadcrumbs="Programs / English Foundation 2026 / Courses" actions={<Button icon={Plus} onClick={() => setOpen(true)}>Create course</Button>} />
    <div className="detail-summary"><div><span className="detail-summary__icon"><BookOpen size={22} /></span><div><strong>English Foundation 2026</strong><small>01/06/2026 – 20/12/2026</small></div></div><StatusBadge status="Active" /></div>
    <Section><DataTable columns={columns} rows={courses} /></Section>
    <Modal open={open} onClose={() => setOpen(false)} title="Create course" footer={<><Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={() => setOpen(false)}>Save course</Button></>}><div className="form-grid"><Field label="Course name" required><input placeholder="Everyday English A2" /></Field><Field label="Course code" required><input placeholder="ENG-A2" /></Field><Field label="Level" required><select><option>A1</option><option>A2</option><option>B1</option><option>B2</option><option>Pre-IELTS</option></select></Field><Field label="Learning goals" required><textarea rows="4" /></Field></div></Modal>
  </>;
}
