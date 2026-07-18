import React, { useMemo, useState } from 'react';
import { MoreHorizontal, Upload, UserPlus } from 'lucide-react';
import { Button, DataTable, Field, Modal, PageHeader, SearchField, Section, StatusBadge, Tabs, UploadZone } from '../../components/UI';
import { enrollments } from '../../data/mockData';

export default function EnrollmentPage() {
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState('All');
  const [modal, setModal] = useState(null);
  const rows = useMemo(() => enrollments.filter((r) => (tab === 'All' || r.status === tab) && `${r.name} ${r.code} ${r.email}`.toLowerCase().includes(query.toLowerCase())), [query, tab]);
  const columns = [
    { key: 'code', label: 'Student ID' },
    { key: 'name', label: 'Student', render: (r) => <div className="cell-primary"><strong>{r.name}</strong><small>{r.email}</small></div> },
    { key: 'className', label: 'Class' },
    { key: 'enrolledAt', label: 'Enrollment date' },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'actions', label: '', render: (r) => <button className="icon-button" aria-label={`Open enrollment actions for ${r.name}`}><MoreHorizontal size={18} /></button> },
  ];
  return <>
    <PageHeader eyebrow="CO-05 · ENROLLMENT" title="Student enrollment" description="Add, transfer, or end enrollments while preserving learning history." actions={<><Button variant="secondary" icon={Upload} onClick={() => setModal('import')}>Import CSV</Button><Button icon={UserPlus} onClick={() => setModal('add')}>Add student</Button></>} />
    <Section><div className="toolbar"><SearchField value={query} onChange={setQuery} placeholder="Search students..." /><select aria-label="Filter by class"><option>Class A2-01</option><option>Class A2-02</option><option>Class B1-01</option></select></div><Tabs items={['All', 'Active', 'Pending', 'Transferred']} active={tab} onChange={setTab} /><DataTable columns={columns} rows={rows} /></Section>
    <Modal open={modal === 'add'} onClose={() => setModal(null)} title="Add student to class" footer={<><Button variant="secondary" onClick={() => setModal(null)}>Cancel</Button><Button onClick={() => setModal(null)}>Enroll</Button></>}><Field label="Find a student account" required><input placeholder="Name, email, or student ID" /></Field><Field label="Destination class" required><select><option>A2-01 · 1 seat available</option><option>A2-02 · 2 seats available</option></select></Field></Modal>
    <Modal open={modal === 'import'} onClose={() => setModal(null)} title="Import enrollment list" size="lg" footer={<><Button variant="secondary" onClick={() => setModal(null)}>Cancel</Button><Button onClick={() => setModal(null)}>Validate data</Button></>}><Field label="Destination class"><select><option>A2-01 · Everyday English A2</option></select></Field><UploadZone title="Choose enrollment CSV" accept=".csv" /></Modal>
  </>;
}
