import React, { useMemo, useState } from 'react';
import { Download, FileAudio, FileText, Folder, MoreHorizontal, Upload } from 'lucide-react';
import { Button, DataTable, Modal, PageHeader, SearchField, Section, UploadZone } from '../../components/UI';
import { materials } from '../../data/mockData';

const fileIcon = (type) => type === 'Audio' ? <FileAudio size={19} /> : type === 'PDF' ? <FileText size={19} /> : <Folder size={19} />;
export default function MaterialsPage() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const rows = useMemo(() => materials.filter((m) => m.name.toLowerCase().includes(query.toLowerCase())), [query]);
  const columns = [
    { key: 'name', label: 'Tên tệp', render: (r) => <div className="file-name-cell"><span>{fileIcon(r.type)}</span><div><strong>{r.name}</strong><small>{r.course}</small></div></div> },
    { key: 'type', label: 'Loại' },
    { key: 'size', label: 'Dung lượng' },
    { key: 'updated', label: 'Cập nhật' },
    { key: 'download', label: '', render: () => <div className="table-actions"><button className="icon-button"><Download size={17} /></button><button className="icon-button"><MoreHorizontal size={17} /></button></div> },
  ];
  return <>
    <PageHeader eyebrow="ME-06 · HỌC LIỆU" title="Thư viện học liệu" description="Tái sử dụng tài liệu giữa các lớp và buổi học." actions={<Button icon={Upload} onClick={() => setOpen(true)}>Tải học liệu</Button>} />
    <Section><div className="toolbar"><SearchField value={query} onChange={setQuery} placeholder="Tìm theo tên tệp…" /><select><option>Tất cả khoá học</option><option>Everyday English A2</option><option>Communication Skills B1</option></select><select><option>Tất cả loại tệp</option><option>PDF</option><option>Audio</option><option>Document</option></select></div><DataTable columns={columns} rows={rows} /></Section>
    <Modal open={open} onClose={() => setOpen(false)} title="Tải học liệu mới" footer={<><Button variant="secondary" onClick={() => setOpen(false)}>Huỷ</Button><Button onClick={() => setOpen(false)}>Tải lên</Button></>}><UploadZone /><label className="field"><span className="field__label">Khoá học</span><select><option>Everyday English A2</option><option>Shared library</option></select></label></Modal>
  </>;
}
