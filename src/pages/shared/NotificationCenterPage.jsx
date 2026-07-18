import React, { useState } from 'react';
import { Bell, CalendarDays, CheckCheck, FileCheck2, FolderOpen, ListChecks } from 'lucide-react';
import { Button, PageHeader, Section, Tabs } from '../../components/UI';
import { notifications } from '../../data/mockData';

const icons = { assignment: ListChecks, calendar: CalendarDays, grade: FileCheck2, material: FolderOpen };
export default function NotificationCenterPage() {
  const [tab, setTab] = useState('all');
  const [items, setItems] = useState(notifications);
  const visible = tab === 'unread' ? items.filter((n) => n.unread) : items;
  return <>
    <PageHeader eyebrow="SH-05 · COMMUNICATION" title="Notification center" description="Track important changes to classes and assignments." actions={<Button variant="secondary" icon={CheckCheck} onClick={() => setItems(items.map((n) => ({ ...n, unread: false })))}>Mark all as read</Button>} />
    <Tabs items={[{ key: 'all', label: `All (${items.length})` }, { key: 'unread', label: `Unread (${items.filter((n) => n.unread).length})` }]} active={tab} onChange={setTab} />
    <Section className="notification-section"><div className="notification-list">{visible.map((item) => { const Icon = icons[item.type] || Bell; return <button key={item.id} className={`notification-item ${item.unread ? 'is-unread' : ''}`} onClick={() => setItems(items.map((n) => n.id === item.id ? { ...n, unread: false } : n))}><span className="notification-item__icon"><Icon size={20} /></span><span><strong>{item.title}</strong><p>{item.body}</p><small>{item.time}</small></span>{item.unread ? <i aria-label="Unread" /> : null}</button>; })}</div></Section>
  </>;
}
