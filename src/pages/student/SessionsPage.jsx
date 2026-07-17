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
      <div><span className="eyebrow">EVERYDAY ENGLISH A2 · LỚP A2-01</span><h1>Buổi học &amp; học liệu</h1><p>Mọi thứ cho lớp của bạn, theo đúng thứ tự bạn cần dùng.</p></div>
      <div className="sessions-workspace__count"><strong>{data.sessions.length}</strong><span>buổi học<br />trong khoá</span></div>
    </header>

    {lead ? <section className="session-lead" aria-labelledby="session-lead-title">
      <div className="session-lead__date"><span>THÁNG 7</span><strong>{lead.date.match(/\d+/)?.[0]}</strong><small>THỨ NĂM</small></div>
      <div className="session-lead__copy"><span className="eyebrow eyebrow--light">BUỔI HỌC TIẾP THEO</span><h2 id="session-lead-title">{lead.title}</h2><div><span><CalendarDays size={16} />{lead.date}</span><span><PlayCircle size={16} />{lead.time}</span><span><MapPinned size={16} />{lead.type} · Google Meet</span></div></div>
      <div className="session-lead__action"><Button icon={ExternalLink} onClick={() => open(lead.meetingUrl, 'Liên kết buổi học chưa sẵn sàng.')}>Vào buổi học</Button><small>Phòng học mở lúc 18:50</small></div>
    </section> : null}

    <section className="session-materials" aria-label="Học liệu cho buổi học tiếp theo">
      <div><span className="eyebrow">CHUẨN BỊ TRƯỚC LỚP</span><strong>Học liệu Unit 6 đã sẵn sàng</strong></div>
      <div className="session-materials__links"><button type="button" onClick={() => open(null, 'Student book đã sẵn sàng để tải xuống.')}><FileText size={17} />Student book.pdf</button><button type="button" onClick={() => open(null, 'Audio practice đã sẵn sàng để tải xuống.')}><PlayCircle size={17} />Audio practice.mp3</button></div>
    </section>

    <section className="session-history" aria-labelledby="session-history-title">
      <div className="session-history__heading"><div><span className="eyebrow">LỊCH SỬ LỚP HỌC</span><h2 id="session-history-title">Buổi học theo thời gian</h2></div><Tabs items={[{ key: 'upcoming', label: `Sắp tới (${upcoming.length})` }, { key: 'completed', label: `Đã hoàn thành (${completed.length})` }]} active={tab} onChange={setTab} /></div>
      {visible.length ? <div className="session-timeline">{visible.map((session) => <article key={session.id}>
        <div className="session-timeline__date"><strong>{session.date.match(/\d+/)?.[0]}</strong><span>THG 7</span></div>
        <div className="session-timeline__info"><div><StatusBadge status={session.status} /><span className="record-code">{session.id}</span></div><h3>{session.title}</h3><p>{session.time} · {session.type}</p></div>
        <div className="session-timeline__actions">{session.status === 'Upcoming' ? <Button icon={ExternalLink} onClick={() => open(session.meetingUrl, 'Liên kết buổi học chưa sẵn sàng.')}>Vào lớp</Button> : <><Button variant="secondary" icon={PlayCircle} onClick={() => open(session.recordingUrl, 'Chưa có bản ghi cho buổi này.')}>Xem bản ghi</Button><Button variant="ghost" icon={Download} onClick={() => open(null, 'Học liệu đang được tải xuống.')}>Tải học liệu</Button></>}</div>
      </article>)}</div> : <p className="session-history__empty">Chưa có buổi học trong mục này.</p>}
    </section>
    {notice ? <Toast onClose={() => setNotice('')}>{notice}</Toast> : null}
  </main>;
}
