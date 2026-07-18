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

const completedGoals = ['Attend 2 sessions', 'Complete the vocabulary task', 'Practise speaking for 20 minutes'];

const todaySchedule = [
  { time: '16:30', title: 'Review Unit 6 vocabulary', meta: '10 minutes · 18 new words', tone: 'blue' },
  { time: '18:40', title: 'Prepare for class', meta: 'Check your mic, camera, and materials', tone: 'orange' },
  { time: '19:00', title: 'Speaking class · Unit 6', meta: 'Google Meet · 90 minutes', tone: 'blue' },
];

export default function StudentDashboardPage() {
  const navigate = useNavigate();
  const nextAssignment = assignments.find((assignment) => assignment.status === 'Active');

  return <main className="learning-home">
    <header className="learning-home__intro">
      <div>
        <span className="eyebrow">SATURDAY · 18 JULY 2026</span>
        <h1>Hi Minh Anh, ready to take the next step?</h1>
        <p>You have a speaking class at 19:00 tonight. Complete the short preparation below to join with confidence.</p>
      </div>
      <div className="learning-home__streak" aria-label="Six-day learning streak">
        <span className="learning-home__streak-icon"><Flame size={19} aria-hidden="true" /></span>
        <span><strong>6-day streak</strong><small>Your best streak this month</small></span>
      </div>
    </header>

    <section className="learning-next" aria-labelledby="next-session-title">
      <div className="learning-next__main">
        <span className="eyebrow eyebrow--light"><i /> NEXT SESSION · EVERYDAY ENGLISH A2</span>
        <h2 id="next-session-title">Stay on track with<br /><em>Giving directions</em></h2>
        <p>Practise asking for directions and describing places through realistic conversations. Preparation takes about 15 minutes.</p>
        <div className="learning-next__meta">
          <span><Clock3 size={15} aria-hidden="true" />19:00–20:30</span>
          <span><Video size={15} aria-hidden="true" />Google Meet</span>
          <span><Sparkles size={15} aria-hidden="true" />Unit 6 · 64%</span>
        </div>
        <div className="learning-next__actions">
          <Button onClick={() => navigate('/student/sessions')}>Join session <ArrowRight size={16} aria-hidden="true" /></Button>
          <Button variant="light" onClick={() => navigate('/student/sessions')}><Headphones size={16} aria-hidden="true" />View materials</Button>
        </div>
      </div>

      <div className="learning-next__visual">
        <img src="/assets/student/english-class-hero.jpg" alt="Students practising English with their teacher in a library" />
        <div className="learning-next__date" aria-label="Saturday, 18 July at 19:00">
          <span>JULY</span><strong>18</strong><small>Saturday · 19:00</small>
        </div>
        <div className="learning-next__mentor">
          <span className="learning-next__avatar">TH</span>
          <span><strong>Ms Thu Ha</strong><small>Mentor · Speaking A2</small></span>
          <b><i /> Ready</b>
        </div>
      </div>
    </section>

    <div className="learning-home__dashboard-grid">
      <section className="learning-panel learning-priorities" aria-labelledby="priority-title">
        <div className="learning-panel__header">
          <div><h2 id="priority-title">Today's priorities</h2><span>2 items to complete</span></div>
          <button type="button" onClick={() => navigate('/student/assignments')}>View all <ArrowRight size={14} aria-hidden="true" /></button>
        </div>
        <div className="learning-priorities__list">
          <button className="priority-item priority-item--urgent" onClick={() => navigate(`/student/assignments/${nextAssignment?.id || 'AS-108'}`)}>
            <span className="priority-item__icon"><Mic2 size={20} aria-hidden="true" /></span>
            <span><strong>{nextAssignment?.title || 'Submit voice note: My neighbourhood'}</strong><small>Record 60–90 seconds and use at least 4 direction phrases from class.</small></span>
            <em>Due today</em><ArrowRight size={18} aria-hidden="true" />
          </button>
          <button className="priority-item" onClick={() => navigate('/student/ai')}>
            <span className="priority-item__icon"><Sparkles size={20} aria-hidden="true" /></span>
            <span><strong>AI Speaking Practice</strong><small>Practise 5 direction scenarios before class. You have completed 3 of 5.</small><span className="priority-progress"><i /></span></span>
            <em>2 attempts left</em><ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      </section>

      <section className="learning-panel learning-schedule" aria-labelledby="schedule-title">
        <div className="learning-panel__header">
          <h2 id="schedule-title">Today's schedule</h2>
          <button type="button" onClick={() => navigate('/student/timetable')}>Weekly schedule</button>
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
        <div className="learning-goals__ring" aria-label="Four of five goals completed"><strong>4/5</strong><span>WEEKLY GOALS</span></div>
        <div>
          <div className="section-kicker"><span>THIS WEEK'S GOALS</span><strong>Just one session to go</strong></div>
          <p>You are making great progress. Complete tonight's session to reach your weekly goal and unlock the “On track” badge.</p>
          <div className="learning-goals__list">
            {completedGoals.map((goal) => <span key={goal}><CheckCircle2 size={16} aria-hidden="true" />{goal}</span>)}
            <span className="is-next"><i />Review Unit 6</span>
          </div>
        </div>
      </div>
      <div className="learning-home__course-link">
        <div className="learning-home__course-icon"><BookOpen size={22} aria-hidden="true" /></div>
        <div><span className="eyebrow">CURRENT COURSE</span><h3>Everyday English A2</h3><p>12 / 24 sessions completed</p><Progress value={64} /></div>
        <strong className="learning-home__course-percent">64%</strong>
        <Button variant="ghost" onClick={() => navigate('/student/courses')}>Open course <ArrowRight size={16} aria-hidden="true" /></Button>
      </div>
    </section>
  </main>;
}
