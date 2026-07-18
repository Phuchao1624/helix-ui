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
    { key: 'name', label: 'File name', render: (r) => <div className="file-name-cell"><span>{fileIcon(r.type)}</span><div><strong>{r.name}</strong><small>{r.course}</small></div></div> },
    { key: 'type', label: 'Type' },
    { key: 'size', label: 'Size' },
    { key: 'updated', label: 'Updated' },
    { key: 'download', label: '', render: (r) => <div className="table-actions"><button className="icon-button" aria-label={`Download ${r.name}`}><Download size={17} /></button><button className="icon-button" aria-label={`Open actions for ${r.name}`}><MoreHorizontal size={17} /></button></div> },
  ];
  return <>
    <PageHeader eyebrow="ME-06 · MATERIALS" title="Material library" description="Reuse learning materials across classes and sessions." actions={<Button icon={Upload} onClick={() => setOpen(true)}>Upload material</Button>} />
    <Section><div className="toolbar"><SearchField value={query} onChange={setQuery} placeholder="Search by file name..." /><select aria-label="Filter by course"><option>All courses</option><option>Everyday English A2</option><option>Communication Skills B1</option></select><select aria-label="Filter by file type"><option>All file types</option><option>PDF</option><option>Audio</option><option>Document</option></select></div><DataTable columns={columns} rows={rows} /></Section>
    <Modal open={open} onClose={() => setOpen(false)} title="Upload new material" footer={<><Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={() => setOpen(false)}>Upload</Button></>}><UploadZone /><label className="field"><span className="field__label">Course</span><select><option>Everyday English A2</option><option>Shared library</option></select></label></Modal>
  </>;
}
