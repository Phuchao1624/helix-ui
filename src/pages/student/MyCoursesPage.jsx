import React from 'react';
import { BookOpen, CalendarDays, ChevronRight, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button, PageHeader, Progress, Section, StatusBadge } from '../../components/UI';
import { useStore } from '../../data/store';

export default function MyCoursesPage() {
  const navigate = useNavigate();
  const { data } = useStore();
  const courseRows = data.courses.map((course, index) => ({ ...course, mentor: data.classes[index]?.mentor || 'Course team', className: data.classes[index]?.code || '—', progress: index === 0 ? 64 : index === 1 ? 35 : 12, sessions: index === 0 ? '12/24 sessions' : '4/12 sessions', next: data.classes[index]?.next || 'To be scheduled' }));
  return <><PageHeader eyebrow="ST-02 · STUDENT" title="My courses" description="Track your progress and access enrolled sessions." /><Section>{courseRows.length ? <div className="student-course-grid">{courseRows.map((c) => <article key={c.code}><div className="student-course-grid__header"><span className="course-symbol"><BookOpen size={22} /></span><StatusBadge status={c.status} /></div><span className="record-code">{c.code}</span><h2>{c.name}</h2><p>{c.className}</p><div className="student-course-grid__meta"><span><Users size={16} />Mentor {c.mentor}</span><span><CalendarDays size={16} />Next: {c.next}</span></div><Progress value={c.progress} label={c.sessions} /><Button variant="secondary" className="button--full" onClick={() => navigate(`/student/sessions?course=${c.code}`)}>Open course <ChevronRight size={17} /></Button></article>)}</div> : <p>No courses have been assigned to you yet.</p>}</Section></>;
}
