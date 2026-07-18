import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button, DataTable, InlineNotice, PageHeader, Section, StatusBadge, UploadZone } from '../../components/UI';

const preview = [
  { row: 2, name: 'Nguyen An', email: 'nguyenan@hope.edu.vn', role: 'Student', status: 'Valid' },
  { row: 3, name: 'Tran Binh', email: 'tranbinh@hope.edu.vn', role: 'Student', status: 'Valid' },
  { row: 4, name: 'Le Cuong', email: 'lecuong@', role: 'Student', status: 'Invalid email' },
];
export default function BulkImportUsersPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const columns = [{ key: 'row', label: 'Row' }, { key: 'name', label: 'Full name' }, { key: 'email', label: 'Email' }, { key: 'role', label: 'Role' }, { key: 'status', label: 'Result', render: (r) => <StatusBadge status={r.status} /> }];
  return <>
    <PageHeader eyebrow="AD-04 · THREE-STEP WIZARD" title="Import users from CSV" description="Validate the data before creating accounts in bulk." actions={<Button variant="ghost" icon={ArrowLeft} onClick={() => navigate('/admin/users')}>Close</Button>} />
    <div className="stepper"><div className={step >= 1 ? 'is-active' : ''}><span>1</span><b>Upload file</b></div><div className={step >= 2 ? 'is-active' : ''}><span>2</span><b>Review</b></div><div className={step >= 3 ? 'is-active' : ''}><span>3</span><b>Results</b></div></div>
    {step === 1 ? <Section title="Prepare your data" description="Use the provided template to avoid formatting errors." actions={<Button variant="secondary" icon={Download}>Download CSV template</Button>}><UploadZone title="Choose a user list" description="Drag and drop a CSV file or click to browse" accept=".csv" /><div className="form-actions"><Button onClick={() => setStep(2)} icon={ArrowRight}>Review data</Button></div></Section> : step === 2 ? <Section title="Validation results" description="The first 10 rows are shown for review."><div className="validation-summary"><div><strong>128</strong><span>Total rows</span></div><div><strong>126</strong><span>Valid</span></div><div className="text-danger"><strong>2</strong><span>Errors</span></div></div><InlineNotice tone="danger" title="Two rows need attention">Upload a corrected file or skip the invalid rows and continue.</InlineNotice><DataTable columns={columns} rows={preview} /><div className="form-actions"><Button variant="secondary" onClick={() => setStep(1)}>Choose another file</Button><Button onClick={() => setStep(3)}>Import 126 valid rows</Button></div></Section> : <Section><div className="result-state"><CheckCircle2 size={44} /><h2>Import complete</h2><p>126 accounts were created and welcome emails are being sent.</p><div className="result-stats"><div><strong>126</strong><span>Successful</span></div><div><strong>2</strong><span>Failed</span></div></div><div className="form-actions"><Button variant="secondary" icon={Download}>Download error report</Button><Button onClick={() => navigate('/admin/users')}>Back to users</Button></div></div></Section>}
  </>;
}
