import React, { useState } from 'react';
import { Check, Lock, Save } from 'lucide-react';
import { Button, DataTable, InlineNotice, PageHeader, Section, StatusBadge, Toast } from '../../components/UI';
import { attendanceRows } from '../../data/mockData';
import { useStore } from '../../data/store';
const statuses = ['Present', 'Late', 'Absent', 'Excused'];
export default function AttendancePage() {
  const { update } = useStore(); const [rows, setRows] = useState(attendanceRows); const [saved, setSaved] = useState(false); const setStatus = (id, status) => setRows((items) => items.map((r) => r.id === id ? { ...r, status } : r));
  const save = () => { update('attendanceRows', rows); setSaved(true); window.setTimeout(() => setSaved(false), 2400); };
  const columns = [{ key: 'id', label: 'ID' }, { key: 'name', label: 'Student' }, { key: 'status', label: 'Status', render: (r) => <div className="attendance-choice">{statuses.map((s) => <button type="button" key={s} className={r.status === s ? 'is-active' : ''} onClick={() => setStatus(r.id, s)}>{s}</button>)}</div> }, { key: 'note', label: 'Note', render: (r) => <input className="table-input" aria-label={`Attendance note for ${r.name}`} value={r.note} onChange={(e) => setRows((items) => items.map((x) => x.id === r.id ? { ...x, note: e.target.value } : x))} placeholder="Optional" /> }];
  const counts = statuses.map((s) => ({ label: s, value: rows.filter((r) => r.status === s).length }));
  return <><PageHeader eyebrow="ME-05 · ATTENDANCE" title="Attendance · Class A2-01" description="Unit 6 · Giving directions · 16/07/2026, 19:00" actions={<><Button variant="secondary" icon={Check} onClick={() => setRows((items) => items.map((r) => ({ ...r, status: 'Present' })))}>Mark all present</Button><Button icon={Save} onClick={save}>Save attendance</Button></>} /><InlineNotice title="Editing window">Attendance can be edited for 24 hours after submission. Changes are logged.</InlineNotice><div className="attendance-counts">{counts.map((c) => <div key={c.label}><StatusBadge status={c.label} /><strong>{c.value}</strong></div>)}</div><Section><DataTable columns={columns} rows={rows} rowKey="id" /></Section><div className="lock-preview"><Lock size={17} /><span>This attendance sheet becomes read-only on 17/07/2026 at 20:30.</span></div>{saved ? <Toast>Attendance saved at 08:30.</Toast> : null}</>;
}
