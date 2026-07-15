import React, { useState } from 'react';
import { CalendarDays, ClipboardCheck, FolderOpen, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button, DataTable, PageHeader, Section, StatusBadge, Tabs } from '../../components/UI';
import { assignments, materials, sessions } from '../../data/mockData';

export default function ClassDetailPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('sessions');
  const sessionCols = [{ key: 'date', label: 'Ngày' }, { key: 'title', label: 'Nội dung' }, { key: 'time', label: 'Thời gian' }, { key: 'attendance', label: 'Chuyên cần' }, { key: 'status', label: 'Trạng thái', render: (r) => <StatusBadge status={r.status} /> }, { key: 'action', label: '', render: () => <Button size="sm" variant="secondary" onClick={() => navigate('/mentor/session')}>Mở</Button> }];
  const assignmentCols = [{ key: 'title', label: 'Bài tập' }, { key: 'due', label: 'Hạn nộp' }, { key: 'submitted', label: 'Đã nộp' }, { key: 'status', label: 'Trạng thái', render: (r) => <StatusBadge status={r.status} /> }];
  const materialCols = [{ key: 'name', label: 'Tệp' }, { key: 'type', label: 'Loại' }, { key: 'size', label: 'Dung lượng' }, { key: 'updated', label: 'Cập nhật' }];
  return <>
    <PageHeader eyebrow="ME-03 · CHI TIẾT LỚP" title="Everyday English A2 · Lớp 01" description="A2-01 · 24 học sinh · Thứ 3, 5 lúc 19:00" breadcrumbs="Lớp của tôi / A2-01" actions={<Button variant="secondary" onClick={() => navigate('/mentor/attendance')}>Điểm danh</Button>} />
    <div className="class-overview"><div><span><CalendarDays size={19} /></span><div><small>Buổi tiếp theo</small><strong>16/07 · 19:00</strong></div></div><div><span><Users size={19} /></span><div><small>Sĩ số</small><strong>24/25</strong></div></div><div><span><ClipboardCheck size={19} /></span><div><small>Bài chờ chấm</small><strong>18</strong></div></div><div><span><FolderOpen size={19} /></span><div><small>Học liệu</small><strong>36 tệp</strong></div></div></div>
    <Tabs items={[{ key: 'sessions', label: 'Buổi học' }, { key: 'students', label: 'Học sinh' }, { key: 'assignments', label: 'Bài tập' }, { key: 'attendance', label: 'Chuyên cần' }, { key: 'materials', label: 'Học liệu' }]} active={tab} onChange={setTab} />
    <Section>{tab === 'sessions' ? <DataTable columns={sessionCols} rows={sessions} /> : tab === 'students' ? <DataTable columns={[{ key: 'name', label: 'Học sinh' }, { key: 'email', label: 'Email' }, { key: 'attendance', label: 'Chuyên cần' }, { key: 'progress', label: 'Tiến độ' }]} rows={[{ id: 1, name: 'Nguyễn Minh Anh', email: 'minhanh@hope.edu.vn', attendance: '96%', progress: '68%' }, { id: 2, name: 'Trần Gia Hân', email: 'giahan@hope.edu.vn', attendance: '92%', progress: '64%' }]} /> : tab === 'assignments' ? <DataTable columns={assignmentCols} rows={assignments} /> : tab === 'attendance' ? <div className="attendance-summary"><div><strong>94%</strong><span>Tỷ lệ chuyên cần trung bình</span></div><div><strong>11</strong><span>Buổi đã ghi nhận</span></div><div><strong>4</strong><span>Lượt đi muộn</span></div><div><strong>7</strong><span>Lượt vắng</span></div></div> : <DataTable columns={materialCols} rows={materials} />}</Section>
  </>;
}
