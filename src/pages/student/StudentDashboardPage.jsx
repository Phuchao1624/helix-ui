import React from 'react';
import { ArrowRight, BookOpen, CalendarDays, CheckCircle2, Clock3, Flame, PlayCircle, Target, Headphones } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button, Progress, Section, StatusBadge } from '../../components/UI';
import { assignments } from '../../data/mockData';

export default function StudentDashboardPage() {
  const navigate = useNavigate();
  return <>
    <header className="student-welcome">
      <div>
        <span className="student-welcome__date">THỨ TƯ · 15 THÁNG 7, 2026</span>
        <h1>Chào Minh Anh, hôm nay mình tiến thêm một bước.</h1>
        <p>Một buổi học lúc 19:00 và hai bài tập đang chờ bạn hoàn thành.</p>
      </div>
      <div className="student-welcome__focus"><Target size={18} /><span><small>Mục tiêu hôm nay</small><strong>Luyện nói 20 phút</strong></span></div>
    </header>

    <section className="student-hero">
      <div className="student-hero__content">
        <div className="student-hero__topline"><span>BUỔI HỌC TIẾP THEO</span><b>EVERYDAY ENGLISH A2</b></div>
        <h2>Unit 6<br />Giving directions</h2>
        <p>Cùng luyện cách hỏi đường, chỉ dẫn và mô tả địa điểm trong thành phố.</p>
        <div className="student-hero__meta">
          <span><CalendarDays size={17} />Thứ Năm, 16/07</span>
          <span><Clock3 size={17} />19:00–20:30</span>
          <span><PlayCircle size={17} />Google Meet</span>
        </div>
        <div className="student-hero__actions">
          <Button onClick={() => navigate('/student/sessions')}>Vào buổi học</Button>
          <Button variant="light" icon={Headphones}>Xem học liệu</Button>
        </div>
      </div>
      <div className="student-hero__schedule">
        <div className="student-hero__calendar"><span>THÁNG 7</span><strong>16</strong><small>THỨ NĂM</small></div>
        <div className="student-hero__countdown"><small>Bắt đầu sau</small><strong>02:18</strong><span>GIỜ : PHÚT</span></div>
      </div>
      <div className="student-hero__architecture" aria-hidden="true"><i /><i /><i /></div>
    </section>

    <div className="student-metrics" role="list" aria-label="Tóm tắt tiến độ">
      <div role="listitem"><span><Flame size={21} /></span><strong>6 ngày</strong><small>Chuỗi học liên tục</small></div>
      <div role="listitem"><span><CheckCircle2 size={21} /></span><strong>94%</strong><small>Chuyên cần</small></div>
      <div role="listitem"><span><BookOpen size={21} /></span><strong>68%</strong><small>Tiến độ khoá học</small></div>
    </div>

    <div className="dashboard-grid dashboard-grid--wide">
      <Section title="Bài tập cần làm" actions={<Button variant="ghost" onClick={() => navigate('/student/assignments')}>Xem tất cả <ArrowRight size={16} /></Button>}>
        <div className="student-assignment-list">{assignments.slice(0, 2).map((a) => <button key={a.id} onClick={() => navigate('/student/assignments/as-108')}><span className="student-assignment-list__skill">{a.skill.slice(0,1)}</span><span><strong>{a.title}</strong><small>{a.course} · Hạn {a.due}</small></span><StatusBadge status={a.status} /></button>)}</div>
      </Section>
      <Section title="Tiến độ tuần này"><div className="weekly-goal"><div><strong>4 / 5</strong><span>mục tiêu hoàn thành</span></div><Progress value={80} /><ul><li className="is-done">Tham gia 2 buổi học</li><li className="is-done">Hoàn thành bài từ vựng</li><li className="is-done">Luyện nói 20 phút</li><li>Ôn lại Unit 6</li></ul></div></Section>
    </div>

    <Section title="Khoá học của bạn"><button className="course-row" onClick={() => navigate('/student/courses')}><div className="course-row__icon"><BookOpen size={24} /></div><div><span className="record-code">ENG-A2</span><h3>Everyday English A2</h3><p>Mentor Lê Hoàng Nam · 12/24 buổi</p></div><div className="course-row__progress"><Progress value={64} compact /><strong>64%</strong></div><ArrowRight size={20} /></button></Section>
  </>;
}
