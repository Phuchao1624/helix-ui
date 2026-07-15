import React from 'react';
import { ArrowLeft, BookOpen, Plus, Users } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, PageHeader, Progress, Section, StatusBadge } from '../../components/UI';
import { useStore } from '../../data/store';

export default function ProgramDetailPage() {
  const { programId } = useParams(); const navigate = useNavigate(); const { data } = useStore(); const program = data.programs.find((item) => item.id === programId) || data.programs[0];
  return <><PageHeader eyebrow="CO-02 · PROGRAM DETAIL" title={program.name} description={`${program.term} · ${program.students} students`} breadcrumbs="Programs / Program detail" actions={<Button variant="ghost" icon={ArrowLeft} onClick={() => navigate('/coordinator/programs')}>Back to programs</Button>} /><div className="dashboard-grid dashboard-grid--wide"><Section title="Program overview"><div className="metric-strip"><div><span>Courses</span><strong>{program.courses}</strong></div><div><span>Classes</span><strong>{program.classes}</strong></div><div><span>Students</span><strong>{program.students}</strong></div><div><StatusBadge status={program.status} /></div></div><Progress value={program.progress} label="Overall progress" /></Section><Section title="Next actions"><div className="quick-action-list"><button type="button" onClick={() => navigate('/coordinator/courses')}><BookOpen size={20} /><span><strong>Manage courses</strong><small>Create course structure and learning goals</small></span></button><button type="button" onClick={() => navigate('/coordinator/classes')}><Users size={20} /><span><strong>Manage classes</strong><small>Assign mentors and build schedules</small></span></button><button type="button" onClick={() => navigate('/coordinator/enrollment')}><Plus size={20} /><span><strong>Enroll students</strong><small>Add individual students or import CSV</small></span></button></div></Section></div></>;
}
