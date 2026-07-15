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
    { key: 'code', label: 'Mã học sinh' },
    { key: 'name', label: 'Học sinh', render: (r) => <div className="cell-primary"><strong>{r.name}</strong><small>{r.email}</small></div> },
    { key: 'className', label: 'Lớp' },
    { key: 'enrolledAt', label: 'Ngày ghi danh' },
    { key: 'status', label: 'Trạng thái', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'actions', label: '', render: () => <button className="icon-button"><MoreHorizontal size={18} /></button> },
  ];
  return <>
    <PageHeader eyebrow="CO-05 · GHI DANH" title="Ghi danh học sinh" description="Thêm, chuyển lớp hoặc ngừng ghi danh mà vẫn giữ lịch sử học tập." actions={<><Button variant="secondary" icon={Upload} onClick={() => setModal('import')}>Import CSV</Button><Button icon={UserPlus} onClick={() => setModal('add')}>Thêm học sinh</Button></>} />
    <Section><div className="toolbar"><SearchField value={query} onChange={setQuery} placeholder="Tìm học sinh…" /><select><option>Lớp A2-01</option><option>Lớp A2-02</option><option>Lớp B1-01</option></select></div><Tabs items={['All', 'Active', 'Pending', 'Transferred']} active={tab} onChange={setTab} /><DataTable columns={columns} rows={rows} /></Section>
    <Modal open={modal === 'add'} onClose={() => setModal(null)} title="Thêm học sinh vào lớp" footer={<><Button variant="secondary" onClick={() => setModal(null)}>Huỷ</Button><Button onClick={() => setModal(null)}>Ghi danh</Button></>}><Field label="Tìm tài khoản học sinh" required><input placeholder="Tên, email hoặc mã học sinh" /></Field><Field label="Lớp đích" required><select><option>A2-01 · Còn 1 chỗ</option><option>A2-02 · Còn 2 chỗ</option></select></Field></Modal>
    <Modal open={modal === 'import'} onClose={() => setModal(null)} title="Import danh sách ghi danh" size="lg" footer={<><Button variant="secondary" onClick={() => setModal(null)}>Huỷ</Button><Button onClick={() => setModal(null)}>Kiểm tra dữ liệu</Button></>}><Field label="Lớp đích"><select><option>A2-01 · Everyday English A2</option></select></Field><UploadZone title="Chọn file CSV ghi danh" accept=".csv" /></Modal>
  </>;
}
