import React, { useState } from 'react';
import { CalendarClock, MoreHorizontal, Plus } from 'lucide-react';
import { Button, DataTable, Field, Modal, PageHeader, Section, StatusBadge, Tabs, UploadZone } from '../../components/UI';
import { assignments } from '../../data/mockData';

export default function AssignmentsPage() {
  const [tab, setTab] = useState('All');
  const [open, setOpen] = useState(false);
  const rows = assignments.filter((a) => tab === 'All' || a.status === tab);
  const columns = [
    { key: 'title', label: 'Bài tập', render: (r) => <div className="cell-primary"><strong>{r.title}</strong><small>{r.course} · {r.skill}</small></div> },
    { key: 'due', label: 'Hạn nộp' },
    { key: 'submitted', label: 'Đã nộp' },
    { key: 'status', label: 'Trạng thái', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'actions', label: '', render: () => <button className="icon-button"><MoreHorizontal size={18} /></button> },
  ];
  return <>
    <PageHeader eyebrow="ME-07 · BÀI TẬP" title="Quản lý bài tập" description="Tạo, xuất bản và theo dõi vòng đời bài tập của các lớp." actions={<Button icon={Plus} onClick={() => setOpen(true)}>Tạo Assignment</Button>} />
    <Section><div className="toolbar"><select><option>Tất cả lớp</option><option>A2-01</option><option>A2-02</option></select><select><option>Hạn nộp gần nhất</option><option>Mới tạo</option></select></div><Tabs items={['All', 'Draft', 'Active', 'Grading', 'Returned']} active={tab} onChange={setTab} /><DataTable columns={columns} rows={rows} /></Section>
    <Modal open={open} onClose={() => setOpen(false)} size="lg" title="Tạo bài tập mới" footer={<><Button variant="secondary" onClick={() => setOpen(false)}>Lưu nháp</Button><Button onClick={() => setOpen(false)}>Publish</Button></>}><div className="form-grid"><Field label="Tiêu đề" required><input placeholder="Ví dụ: Voice note: My neighbourhood" /></Field><Field label="Lớp" required><select><option>A2-01 · Everyday English A2</option></select></Field><Field label="Skill Area" required><select><option>Speaking</option><option>Writing</option><option>Reading</option><option>Listening</option><option>Vocabulary</option></select></Field><Field label="Deadline" required><div className="input-with-icon"><CalendarClock size={18} /><input type="datetime-local" /></div></Field><Field label="Điểm tối đa" required><input type="number" defaultValue="10" /></Field><Field label="Hướng dẫn" required><textarea rows="5" placeholder="Mô tả yêu cầu bài tập…" /></Field><div className="form-grid__full"><UploadZone title="Đính kèm tài liệu tham khảo" /></div></div><div className="policy-grid"><label><input type="checkbox" defaultChecked /><span><strong>Cho phép nộp trễ</strong><small>Trừ 10% điểm sau deadline</small></span></label><label><input type="checkbox" defaultChecked /><span><strong>Cho phép nộp lại</strong><small>Tối đa 2 lần</small></span></label><label><input type="checkbox" /><span><strong>Hẹn giờ publish</strong><small>Xuất bản vào thời điểm đã chọn</small></span></label></div></Modal>
  </>;
}
