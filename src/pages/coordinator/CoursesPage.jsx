import React, { useState } from 'react';
import { BookOpen, MoreHorizontal, Plus } from 'lucide-react';
import { Button, DataTable, Field, Modal, PageHeader, Section, StatusBadge } from '../../components/UI';
import { courses } from '../../data/mockData';

export default function CoursesPage() {
  const [open, setOpen] = useState(false);
  const columns = [
    { key: 'code', label: 'Mã khoá học' },
    { key: 'name', label: 'Khoá học', render: (r) => <div className="cell-primary"><strong>{r.name}</strong><small>Thuộc English Foundation 2026</small></div> },
    { key: 'level', label: 'Trình độ' },
    { key: 'classes', label: 'Lớp' },
    { key: 'students', label: 'Học sinh' },
    { key: 'status', label: 'Trạng thái', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'actions', label: '', render: () => <button className="icon-button"><MoreHorizontal size={18} /></button> },
  ];
  return <>
    <PageHeader eyebrow="CO-03 · TAB TRONG PROGRAM" title="Quản lý khoá học" description="English Foundation 2026 · Xây dựng mục tiêu và cấu trúc lớp học." breadcrumbs="Chương trình / English Foundation 2026 / Khoá học" actions={<Button icon={Plus} onClick={() => setOpen(true)}>Tạo Course</Button>} />
    <div className="detail-summary"><div><span className="detail-summary__icon"><BookOpen size={22} /></span><div><strong>English Foundation 2026</strong><small>01/06/2026 – 20/12/2026</small></div></div><StatusBadge status="Active" /></div>
    <Section><DataTable columns={columns} rows={courses} /></Section>
    <Modal open={open} onClose={() => setOpen(false)} title="Tạo khoá học" footer={<><Button variant="secondary" onClick={() => setOpen(false)}>Huỷ</Button><Button onClick={() => setOpen(false)}>Lưu khoá học</Button></>}><div className="form-grid"><Field label="Tên khoá học" required><input placeholder="Everyday English A2" /></Field><Field label="Mã khoá học" required><input placeholder="ENG-A2" /></Field><Field label="Cấp độ" required><select><option>A1</option><option>A2</option><option>B1</option><option>B2</option><option>Pre-IELTS</option></select></Field><Field label="Mục tiêu học tập" required><textarea rows="4" /></Field></div></Modal>
  </>;
}
