import React from 'react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  Flame,
  Headphones,
  Mic2,
  Sparkles,
  Video,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button, Progress } from '../../components/UI';
import { assignments } from '../../data/mockData';

const completedGoals = ['Tham gia 2 buổi học', 'Hoàn thành bài từ vựng', 'Luyện nói 20 phút'];

const todaySchedule = [
  { time: '16:30', title: 'Ôn từ vựng Unit 6', meta: '10 phút · 18 từ mới', tone: 'blue' },
  { time: '18:40', title: 'Chuẩn bị trước buổi học', meta: 'Kiểm tra mic, camera và học liệu', tone: 'orange' },
  { time: '19:00', title: 'Speaking class · Unit 6', meta: 'Google Meet · 90 phút', tone: 'blue' },
];

export default function StudentDashboardPage() {
  const navigate = useNavigate();
  const nextAssignment = assignments.find((assignment) => assignment.status === 'Active');

  return <main className="learning-home">
    <header className="learning-home__intro">
      <div>
        <span className="eyebrow">THỨ BẢY · 18 THÁNG 7, 2026</span>
        <h1>Chào Minh Anh, sẵn sàng tiến thêm một bước?</h1>
        <p>Tối nay bạn có một buổi học nói lúc 19:00. Hoàn thành phần chuẩn bị ngắn bên dưới để vào lớp tự tin hơn.</p>
      </div>
      <div className="learning-home__streak" aria-label="Chuỗi học sáu ngày">
        <span className="learning-home__streak-icon"><Flame size={19} aria-hidden="true" /></span>
        <span><strong>6 ngày liên tiếp</strong><small>Chuỗi học tốt nhất tháng</small></span>
      </div>
    </header>

    <section className="learning-next" aria-labelledby="next-session-title">
      <div className="learning-next__main">
        <span className="eyebrow eyebrow--light"><i /> BUỔI HỌC TIẾP THEO · EVERYDAY ENGLISH A2</span>
        <h2 id="next-session-title">Đi đúng hướng với<br /><em>Giving directions</em></h2>
        <p>Thực hành hỏi đường, chỉ dẫn và mô tả địa điểm bằng hội thoại thực tế. Phần chuẩn bị chỉ mất khoảng 15 phút.</p>
        <div className="learning-next__meta">
          <span><Clock3 size={15} aria-hidden="true" />19:00–20:30</span>
          <span><Video size={15} aria-hidden="true" />Google Meet</span>
          <span><Sparkles size={15} aria-hidden="true" />Unit 6 · 64%</span>
        </div>
        <div className="learning-next__actions">
          <Button onClick={() => navigate('/student/sessions')}>Vào buổi học <ArrowRight size={16} aria-hidden="true" /></Button>
          <Button variant="light" onClick={() => navigate('/student/sessions')}><Headphones size={16} aria-hidden="true" />Xem học liệu</Button>
        </div>
      </div>

      <div className="learning-next__visual">
        <img src="/assets/student/english-class-hero.jpg" alt="Nhóm học viên thực hành tiếng Anh cùng giáo viên trong thư viện" />
        <div className="learning-next__date" aria-label="Thứ Bảy, ngày 18 tháng 7 lúc 19 giờ">
          <span>THÁNG 7</span><strong>18</strong><small>Thứ Bảy · 19:00</small>
        </div>
        <div className="learning-next__mentor">
          <span className="learning-next__avatar">TH</span>
          <span><strong>Cô Thu Hà</strong><small>Giảng viên · Speaking A2</small></span>
          <b><i /> Sẵn sàng</b>
        </div>
      </div>
    </section>

    <div className="learning-home__dashboard-grid">
      <section className="learning-panel learning-priorities" aria-labelledby="priority-title">
        <div className="learning-panel__header">
          <div><h2 id="priority-title">Ưu tiên hôm nay</h2><span>2 việc cần hoàn thành</span></div>
          <button type="button" onClick={() => navigate('/student/assignments')}>Xem tất cả <ArrowRight size={14} aria-hidden="true" /></button>
        </div>
        <div className="learning-priorities__list">
          <button className="priority-item priority-item--urgent" onClick={() => navigate(`/student/assignments/${nextAssignment?.id || 'AS-108'}`)}>
            <span className="priority-item__icon"><Mic2 size={20} aria-hidden="true" /></span>
            <span><strong>{nextAssignment?.title || 'Nộp voice note: My neighbourhood'}</strong><small>Ghi âm 60–90 giây và sử dụng ít nhất 4 cụm từ chỉ đường đã học.</small></span>
            <em>Hạn hôm nay</em><ArrowRight size={18} aria-hidden="true" />
          </button>
          <button className="priority-item" onClick={() => navigate('/student/ai')}>
            <span className="priority-item__icon"><Sparkles size={20} aria-hidden="true" /></span>
            <span><strong>AI Speaking Practice</strong><small>Luyện 5 tình huống hỏi đường trước khi vào lớp. Bạn đã hoàn thành 3/5 tình huống.</small><span className="priority-progress"><i /></span></span>
            <em>Còn 2 lượt</em><ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      </section>

      <section className="learning-panel learning-schedule" aria-labelledby="schedule-title">
        <div className="learning-panel__header">
          <h2 id="schedule-title">Lịch hôm nay</h2>
          <button type="button" onClick={() => navigate('/student/sessions')}>Lịch tuần</button>
        </div>
        <div className="learning-schedule__timeline">
          {todaySchedule.map((item) => <div key={item.time}>
            <time>{item.time}</time><i className={`is-${item.tone}`} />
            <span><strong>{item.title}</strong><small>{item.meta}</small></span>
          </div>)}
        </div>
      </section>
    </div>

    <section className="learning-home__lower">
      <div className="learning-goals">
        <div className="learning-goals__ring" aria-label="Đã hoàn thành bốn trên năm mục tiêu"><strong>4/5</strong><span>MỤC TIÊU TUẦN</span></div>
        <div>
          <div className="section-kicker"><span>MỤC TIÊU TUẦN NÀY</span><strong>Chỉ còn một buổi nữa</strong></div>
          <p>Bạn đang giữ nhịp rất tốt. Hoàn thành buổi học tối nay để đạt mục tiêu tuần và mở huy hiệu “On track”.</p>
          <div className="learning-goals__list">
            {completedGoals.map((goal) => <span key={goal}><CheckCircle2 size={16} aria-hidden="true" />{goal}</span>)}
            <span className="is-next"><i />Ôn lại Unit 6</span>
          </div>
        </div>
      </div>
      <div className="learning-home__course-link">
        <div className="learning-home__course-icon"><BookOpen size={22} aria-hidden="true" /></div>
        <div><span className="eyebrow">KHOÁ ĐANG HỌC</span><h3>Everyday English A2</h3><p>12 / 24 buổi đã hoàn thành</p><Progress value={64} /></div>
        <strong className="learning-home__course-percent">64%</strong>
        <Button variant="ghost" onClick={() => navigate('/student/courses')}>Mở khoá học <ArrowRight size={16} aria-hidden="true" /></Button>
      </div>
    </section>
  </main>;
}
