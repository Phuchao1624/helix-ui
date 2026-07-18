import React, { useState } from 'react';
import { CalendarDays, Download, ExternalLink, FileText, MapPinned, PlayCircle } from 'lucide-react';
import { Button, StatusBadge, Tabs, Toast } from '../../components/UI';
import { useStore } from '../../data/store';

export default function SessionsPage() {
  const { data } = useStore();
  const [tab, setTab] = useState('upcoming');
  const [notice, setNotice] = useState('');
  const upcoming = data.sessions.filter((session) => session.status === 'Upcoming');
  const completed = data.sessions.filter((session) => session.status !== 'Upcoming');
  const visible = tab === 'upcoming' ? upcoming : completed;
  const lead = upcoming[0];
  const open = (url, message) => {
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
    else { setNotice(message); window.setTimeout(() => setNotice(''), 2500); }
  };

  return <main className="sessions-workspace">
    <header className="sessions-workspace__intro">
      <div><span className="eyebrow">EVERYDAY ENGLISH A2 · CLASS A2-01</span><h1>Sessions &amp; materials</h1><p>Everything for your class, organized in the order you need it.</p></div>
      <div className="sessions-workspace__count"><strong>{data.sessions.length}</strong><span>sessions<br />in this course</span></div>
    </header>

    {lead ? <section className="session-lead" aria-labelledby="session-lead-title">
      <div className="session-lead__date"><span>JULY</span><strong>{lead.date.match(/\d+/)?.[0]}</strong><small>THURSDAY</small></div>
      <div className="session-lead__copy"><span className="eyebrow eyebrow--light">NEXT SESSION</span><h2 id="session-lead-title">{lead.title}</h2><div><span><CalendarDays size={16} />{lead.date}</span><span><PlayCircle size={16} />{lead.time}</span><span><MapPinned size={16} />{lead.type} · Google Meet</span></div></div>
      <div className="session-lead__action"><Button icon={ExternalLink} onClick={() => open(lead.meetingUrl, 'The session link is not available yet.')}>Join session</Button><small>The room opens at 18:50</small></div>
    </section> : null}

    <section className="session-materials" aria-label="Materials for the next session">
      <div><span className="eyebrow">PREPARE BEFORE CLASS</span><strong>Unit 6 materials are ready</strong></div>
      <div className="session-materials__links"><button type="button" onClick={() => open(null, 'The student book is ready to download.')}><FileText size={17} />Student book.pdf</button><button type="button" onClick={() => open(null, 'The audio practice file is ready to download.')}><PlayCircle size={17} />Audio practice.mp3</button></div>
    </section>

    <section className="session-history" aria-labelledby="session-history-title">
      <div className="session-history__heading"><div><span className="eyebrow">CLASS HISTORY</span><h2 id="session-history-title">Session timeline</h2></div><Tabs items={[{ key: 'upcoming', label: `Upcoming (${upcoming.length})` }, { key: 'completed', label: `Completed (${completed.length})` }]} active={tab} onChange={setTab} /></div>
      {visible.length ? <div className="session-timeline">{visible.map((session) => <article key={session.id}>
        <div className="session-timeline__date"><strong>{session.date.match(/\d+/)?.[0]}</strong><span>JUL</span></div>
        <div className="session-timeline__info"><div><StatusBadge status={session.status} /><span className="record-code">{session.id}</span></div><h3>{session.title}</h3><p>{session.time} · {session.type}</p></div>
        <div className="session-timeline__actions">{session.status === 'Upcoming' ? <Button icon={ExternalLink} onClick={() => open(session.meetingUrl, 'The session link is not available yet.')}>Join class</Button> : <><Button variant="secondary" icon={PlayCircle} onClick={() => open(session.recordingUrl, 'No recording is available for this session.')}>View recording</Button><Button variant="ghost" icon={Download} onClick={() => open(null, 'Your materials are downloading.')}>Download materials</Button></>}</div>
      </article>)}</div> : <p className="session-history__empty">No sessions in this section yet.</p>}
    </section>
    {notice ? <Toast onClose={() => setNotice('')}>{notice}</Toast> : null}
  </main>;
}
