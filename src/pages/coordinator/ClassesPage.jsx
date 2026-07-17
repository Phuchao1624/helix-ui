import React, { useState } from 'react';
import { CalendarPlus, MoreHorizontal, Plus } from 'lucide-react';
import { Button, DataTable, Field, Modal, PageHeader, Section, StatusBadge } from '../../components/UI';
import { classes } from '../../data/mockData';

export default function ClassesPage() {
  const [open, setOpen] = useState(false);
  const columns = [
    { key: 'code', label: 'Mã lớp' },
    { key: 'name', label: 'Tên lớp' },
    { key: 'mentor', label: 'Mentor' },
    { key: 'schedule', label: 'Lịch học' },
    { key: 'students', label: 'Sĩ số' },
    { key: 'next', label: 'Buổi tiếp theo' },
    { key: 'status', label: 'Trạng thái', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'actions', label: '', render: (r) => <button className="icon-button" aria-label={`Mở thao tác cho ${r.name}`}><MoreHorizontal size={18} /></button> },
  ];
  return <>
    <PageHeader eyebrow="CO-04 · TAB TRONG COURSE" title="Quản lý lớp học" description="Everyday English A2 · Thiết lập Mentor, sĩ số và lịch học." breadcrumbs="Chương trình / English Foundation 2026 / Everyday English A2 / Lớp học" actions={<Button icon={Plus} onClick={() => setOpen(true)}>Tạo Class</Button>} />
    <Section><DataTable columns={columns} rows={classes} /></Section>
    <Modal open={open} onClose={() => setOpen(false)} size="lg" title="Tạo lớp học" description="Schedule Builder sẽ sinh danh sách buổi học dự kiến." footer={<><Button variant="secondary" onClick={() => setOpen(false)}>Huỷ</Button><Button onClick={() => setOpen(false)}>Xác nhận tạo lớp</Button></>}><div className="form-grid"><Field label="Tên lớp" required><input placeholder="Everyday English A2 · Lớp 03" /></Field><Field label="Mã lớp" required><input placeholder="A2-03" /></Field><Field label="Mentor phụ trách" required><select><option>Chọn Mentor</option><option>Lê Hoàng Nam</option><option>Nguyễn Hà My</option></select></Field><Field label="Sĩ số tối đa" required><input type="number" defaultValue="25" /></Field></div><div className="schedule-builder"><div className="schedule-builder__title"><CalendarPlus size={19} /><strong>Schedule Builder</strong></div><div className="weekday-picker">{['T2','T3','T4','T5','T6','T7','CN'].map((d) => <button key={d} className={d === 'T3' || d === 'T5' ? 'is-active' : ''}>{d}</button>)}</div><div className="form-grid"><Field label="Giờ bắt đầu"><input type="time" defaultValue="19:00" /></Field><Field label="Thời lượng"><select><option>90 phút</option><option>60 phút</option><option>120 phút</option></select></Field><Field label="Số tuần"><input type="number" defaultValue="12" /></Field><Field label="Ngày bắt đầu"><input type="date" defaultValue="2026-07-20" /></Field></div><div className="schedule-preview"><strong>24 buổi học dự kiến</strong><span>Buổi đầu: 21/07/2026 · Buổi cuối: 08/10/2026</span></div></div></Modal>
  </>;
}
