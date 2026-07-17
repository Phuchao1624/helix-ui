import React from 'react';
import { ArrowRight, BookOpen, CalendarDays, CheckCircle2, Clock3, Flame, Headphones, MapPinned, PlayCircle, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button, Progress } from '../../components/UI';
import { assignments } from '../../data/mockData';

const completedGoals = ['Tham gia 2 buổi học', 'Hoàn thành bài từ vựng', 'Luyện nói 20 phút'];

export default function StudentDashboardPage() {
  const navigate = useNavigate();
  const nextAssignment = assignments.find((assignment) => assignment.status === 'Active');

  return <main className="learning-home">
    <header className="learning-home__intro">
      <div>
        <span className="eyebrow">THỨ TƯ · 15 THÁNG 7, 2026</span>
        <h1>Chào Minh Anh.</h1>
        <p>Bạn có một buổi học lúc 19:00. Hãy dành 20 phút để sẵn sàng cho phần nói hôm nay.</p>
      </div>
      <div className="learning-home__streak" aria-label="Chuỗi học sáu ngày">
        <Flame size={18} /><span><strong>6 ngày</strong><small>giữ nhịp học</small></span>
      </div>
    </header>

    <section className="learning-next" aria-labelledby="next-session-title">
      <div className="learning-next__main">
        <div className="helix-marker helix-marker--light" aria-hidden="true"><i /><i /><i /></div>
        <span className="eyebrow eyebrow--light">LẦN HỌC TIẾP THEO · EVERYDAY ENGLISH A2</span>
        <h2 id="next-session-title">Unit 6<br />Giving directions</h2>
        <p>Thực hành hỏi đường, chỉ dẫn và mô tả địa điểm trong thành phố bằng tiếng Anh tự nhiên.</p>
        <div className="learning-next__meta">
          <span><CalendarDays size={16} />Thứ Năm, 16/07</span>
          <span><Clock3 size={16} />19:00–20:30</span>
          <span><PlayCircle size={16} />Google Meet</span>
        </div>
        <div className="learning-next__actions">
          <Button onClick={() => navigate('/student/sessions')}>Vào buổi học <ArrowRight size={16} /></Button>
          <Button variant="light" onClick={() => navigate('/student/sessions')}><Headphones size={16} />Học liệu</Button>
        </div>
      </div>
      <aside className="learning-next__when" aria-label="Thời gian buổi học tiếp theo">
        <span>THÁNG 7</span>
        <strong>16</strong>
        <small>THỨ NĂM · 19:00</small>
        <div><MapPinned size={16} />Trực tuyến · A2-01</div>
      </aside>
    </section>

    <section className="learning-home__agenda" aria-label="Việc cần chú ý">
      <button className="agenda-item agenda-item--assignment" onClick={() => navigate(`/student/assignments/${nextAssignment?.id || 'AS-108'}`)}>
        <span className="agenda-item__icon"><BookOpen size={20} /></span>
        <span><small>CẦN HOÀN THÀNH</small><strong>{nextAssignment?.title || 'Voice note: My neighbourhood'}</strong><em>Hạn {nextAssignment?.due || '18/07 · 23:59'}</em></span>
        <ArrowRight size={19} />
      </button>
      <button className="agenda-item agenda-item--course" onClick={() => navigate('/student/courses')}>
        <span className="agenda-item__icon"><Target size={20} /></span>
        <span><small>TIẾN ĐỘ KHOÁ HỌC</small><strong>12 / 24 buổi đã hoàn thành</strong><em>Everyday English A2 · 64%</em></span>
        <ArrowRight size={19} />
      </button>
    </section>

    <section className="learning-home__lower">
      <div className="learning-goals">
        <div className="section-kicker"><span>MỤC TIÊU TUẦN NÀY</span><strong>4 / 5</strong></div>
        <Progress value={80} />
        <div className="learning-goals__list">
          {completedGoals.map((goal) => <span key={goal}><CheckCircle2 size={16} />{goal}</span>)}
          <span className="is-next"><i />Ôn lại Unit 6</span>
        </div>
      </div>
      <div className="learning-home__course-link">
        <div className="helix-marker" aria-hidden="true"><i /><i /><i /></div>
        <div><span className="eyebrow">ĐANG HỌC</span><h3>Everyday English A2</h3><p>Tiếp tục với bài học, buổi học và học liệu của bạn.</p></div>
        <Button variant="ghost" onClick={() => navigate('/student/courses')}>Mở khoá học <ArrowRight size={16} /></Button>
      </div>
    </section>
  </main>;
}
