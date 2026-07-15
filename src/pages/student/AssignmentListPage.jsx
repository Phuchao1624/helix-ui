import React, { useMemo, useState } from 'react';
import { CalendarClock, ChevronRight, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button, PageHeader, SearchField, Section, StatusBadge, Tabs } from '../../components/UI';
import { useStore } from '../../data/store';

export default function AssignmentListPage() {
  const navigate = useNavigate(); const { data } = useStore(); const [query, setQuery] = useState(''); const [tab, setTab] = useState('All');
  const rows = useMemo(() => data.assignments.filter((a) => (tab === 'All' || (tab === 'To do' && a.status === 'Active') || (tab === 'Submitted' && a.status === 'Submitted') || (tab === 'Graded' && a.status === 'Returned')) && `${a.title} ${a.course}`.toLowerCase().includes(query.toLowerCase())), [data.assignments, query, tab]);
  return <><PageHeader eyebrow="ST-04 · STUDENT" title="Assignments" description="Track every assignment, deadline and submission status." /><Section><div className="toolbar"><SearchField value={query} onChange={setQuery} placeholder="Search assignments…" /><select aria-label="Filter course"><option>All courses</option><option>Everyday English A2</option></select><Button variant="ghost" icon={Filter}>Filters</Button></div><Tabs items={[{ key: 'All', label: 'All' }, { key: 'To do', label: 'To do' }, { key: 'Submitted', label: 'Submitted' }, { key: 'Graded', label: 'Graded' }]} active={tab} onChange={setTab} /><div className="assignment-stack">{rows.length ? rows.map((a) => <button type="button" key={a.id} onClick={() => navigate(`/student/assignments/${a.id}`)}><span className={`skill-marker skill-marker--${a.skill.toLowerCase()}`}>{a.skill.slice(0, 2).toUpperCase()}</span><span className="assignment-stack__main"><small>{a.course} · {a.skill}</small><strong>{a.title}</strong><span><CalendarClock size={15} />Due {a.due}</span></span><span className="assignment-stack__status"><StatusBadge status={a.status} />{a.score ? <b>{a.score}/{a.maxScore}</b> : null}</span><ChevronRight size={19} /></button>) : <p>No assignments found.</p>}</div></Section></>;
}
