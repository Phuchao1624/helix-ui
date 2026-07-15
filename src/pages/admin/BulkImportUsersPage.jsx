import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge, Button, DataTable, InlineNotice, PageHeader, Section, StatusBadge, UploadZone } from '../../components/UI';

const preview = [
  { row: 2, name: 'Nguyễn An', email: 'nguyenan@hope.edu.vn', role: 'Student', status: 'Valid' },
  { row: 3, name: 'Trần Bình', email: 'tranbinh@hope.edu.vn', role: 'Student', status: 'Valid' },
  { row: 4, name: 'Lê Cường', email: 'lecuong@', role: 'Student', status: 'Invalid email' },
];
export default function BulkImportUsersPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const columns = [{ key: 'row', label: 'Dòng' }, { key: 'name', label: 'Họ tên' }, { key: 'email', label: 'Email' }, { key: 'role', label: 'Vai trò' }, { key: 'status', label: 'Kết quả', render: (r) => <StatusBadge status={r.status} /> }];
  return <>
    <PageHeader eyebrow="AD-04 · WIZARD 3 BƯỚC" title="Import người dùng từ CSV" description="Kiểm tra dữ liệu trước khi tạo tài khoản hàng loạt." actions={<Button variant="ghost" icon={ArrowLeft} onClick={() => navigate('/admin/users')}>Đóng</Button>} />
    <div className="stepper"><div className={step >= 1 ? 'is-active' : ''}><span>1</span><b>Tải tệp</b></div><div className={step >= 2 ? 'is-active' : ''}><span>2</span><b>Kiểm tra</b></div><div className={step >= 3 ? 'is-active' : ''}><span>3</span><b>Kết quả</b></div></div>
    {step === 1 ? <Section title="Chuẩn bị dữ liệu" description="Sử dụng đúng template để tránh lỗi định dạng." actions={<Button variant="secondary" icon={Download}>Tải template CSV</Button>}><UploadZone title="Chọn tệp danh sách người dùng" description="Kéo thả CSV hoặc bấm để chọn" accept=".csv" /><div className="form-actions"><Button onClick={() => setStep(2)} icon={ArrowRight}>Tiếp tục kiểm tra</Button></div></Section> : step === 2 ? <Section title="Kết quả kiểm tra" description="10 dòng đầu được hiển thị để đối chiếu."><div className="validation-summary"><div><strong>128</strong><span>Tổng số dòng</span></div><div><strong>126</strong><span>Hợp lệ</span></div><div className="text-danger"><strong>2</strong><span>Có lỗi</span></div></div><InlineNotice tone="danger" title="Có 2 dòng cần sửa">Bạn có thể tải lại tệp hoặc bỏ qua các dòng lỗi và tiếp tục import.</InlineNotice><DataTable columns={columns} rows={preview} /><div className="form-actions"><Button variant="secondary" onClick={() => setStep(1)}>Tải tệp khác</Button><Button onClick={() => setStep(3)}>Import 126 dòng hợp lệ</Button></div></Section> : <Section><div className="result-state"><CheckCircle2 size={44} /><h2>Import hoàn tất</h2><p>126 tài khoản đã được tạo và email chào mừng đang được gửi.</p><div className="result-stats"><div><strong>126</strong><span>Thành công</span></div><div><strong>2</strong><span>Thất bại</span></div></div><div className="form-actions"><Button variant="secondary" icon={Download}>Tải báo cáo lỗi</Button><Button onClick={() => navigate('/admin/users')}>Về danh sách người dùng</Button></div></div></Section>}
  </>;
}
