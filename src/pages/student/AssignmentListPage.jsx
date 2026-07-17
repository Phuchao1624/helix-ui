import React, { useMemo, useState } from 'react';
import { ArrowRight, CalendarClock, ChevronRight, Filter, Mic2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button, EmptyState, SearchField, StatusBadge, Tabs } from '../../components/UI';
import { useStore } from '../../data/store';

export default function AssignmentListPage() {
  const navigate = useNavigate();
  const { data } = useStore();
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState('All');
  const rows = useMemo(() => data.assignments.filter((assignment) => (tab === 'All' || (tab === 'To do' && assignment.status === 'Active') || (tab === 'Submitted' && assignment.status === 'Submitted') || (tab === 'Graded' && assignment.status === 'Returned')) && `${assignment.title} ${assignment.course}`.toLowerCase().includes(query.toLowerCase())), [data.assignments, query, tab]);
  const priority = data.assignments.find((assignment) => assignment.status === 'Active');

  return <main className="assignments-workspace">
    <header className="assignments-workspace__intro"><div><span className="eyebrow">EVERYDAY ENGLISH A2</span><h1>Bài tập</h1><p>Nơi tập trung các việc cần hoàn thành, phản hồi và điểm số của bạn.</p></div><div className="assignments-workspace__summary"><strong>{data.assignments.filter((assignment) => assignment.status === 'Active').length}</strong><span>bài cần làm<br />trong tuần này</span></div></header>
    {priority ? <section className="assignment-priority" aria-labelledby="assignment-priority-title"><div className="assignment-priority__mark"><Mic2 size={24} /></div><div><span className="eyebrow">ƯU TIÊN TIẾP THEO · HẠN {priority.due}</span><h2 id="assignment-priority-title">{priority.title}</h2><p>{priority.course} · {priority.skill} · Nộp bản ghi âm ngắn về khu phố của bạn.</p></div><Button onClick={() => navigate(`/student/assignments/${priority.id}`)}>Làm bài ngay <ArrowRight size={16} /></Button></section> : null}
    <section className="assignment-library" aria-labelledby="assignment-library-title"><div className="assignment-library__heading"><div><span className="eyebrow">TẤT CẢ BÀI TẬP</span><h2 id="assignment-library-title">Theo dõi tiến độ</h2></div><div className="assignment-library__controls"><SearchField value={query} onChange={setQuery} placeholder="Tìm bài tập…" /><Button variant="ghost" icon={Filter}>Bộ lọc</Button></div></div><Tabs items={[{ key: 'All', label: 'Tất cả' }, { key: 'To do', label: 'Cần làm' }, { key: 'Submitted', label: 'Đã nộp' }, { key: 'Graded', label: 'Đã chấm' }]} active={tab} onChange={setTab} />
      {rows.length ? <div className="assignment-rows">{rows.map((assignment) => <button type="button" key={assignment.id} onClick={() => navigate(`/student/assignments/${assignment.id}`)}><span className={`assignment-rows__skill assignment-rows__skill--${assignment.skill.toLowerCase()}`}>{assignment.skill.slice(0, 2).toUpperCase()}</span><span className="assignment-rows__main"><small>{assignment.course} · {assignment.skill}</small><strong>{assignment.title}</strong><em><CalendarClock size={14} />Hạn {assignment.due}</em></span><span className="assignment-rows__status"><StatusBadge status={assignment.status} />{assignment.score ? <b>{assignment.score}/{assignment.maxScore}</b> : null}</span><ChevronRight size={19} /></button>)}</div> : <EmptyState title="Không tìm thấy bài tập" description="Thử đổi từ khoá hoặc bộ lọc để xem lại danh sách." />}
    </section>
  </main>;
}
