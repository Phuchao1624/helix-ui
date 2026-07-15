import React, { useState } from 'react';
import { CalendarDays, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button, PageHeader, Progress, SearchField, Section, StatusBadge, Tabs } from '../../components/UI';
import { classes } from '../../data/mockData';

export default function MyClassesPage() {
  const navigate = useNavigate(); const [query, setQuery] = useState(''); const [tab, setTab] = useState('Active'); const filtered = classes.filter((c, index) => c.name.toLowerCase().includes(query.toLowerCase()) && (tab === 'Active' ? index < 2 : tab === 'Upcoming' ? index === 2 : false));
  return <><PageHeader eyebrow="ME-02 · MENTOR" title="My classes" description="View assigned classes and teaching progress." /><Section><div className="toolbar"><SearchField value={query} onChange={setQuery} placeholder="Search classes…" /><select aria-label="Term"><option>Summer 2026</option></select></div><Tabs items={['Active', 'Upcoming', 'Completed']} active={tab} onChange={setTab} /><div className="class-list">{filtered.length ? filtered.map((c, index) => <article key={c.code}><div className="class-list__top"><span className="record-code">{c.code}</span><StatusBadge status={index === 2 ? 'Upcoming' : 'Active'} /></div><h3>{c.name}</h3><p>English Foundation 2026</p><div className="class-list__meta"><span><CalendarDays size={16} />{c.schedule}</span><span><Users size={16} />{c.students} students</span></div><Progress value={index === 0 ? 64 : index === 1 ? 48 : 12} label="Course progress" /><div className="class-list__footer"><span>Next session: <strong>{c.next}</strong></span><Button size="sm" onClick={() => navigate(`/mentor/classes/${c.code}`)}>Open class</Button></div></article>) : <p>No classes found.</p>}</div></Section></>;
}
