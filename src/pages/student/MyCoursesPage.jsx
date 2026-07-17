import React, { useMemo, useState } from 'react';
import { ArrowRight, CalendarDays, Clock3, GraduationCap, MapPinned, MessageCircle, PenLine, UserRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button, EmptyState, Progress, SearchField, StatusBadge } from '../../components/UI';
import { useStore } from '../../data/store';

const coursePresentation = {
  'ENG-A2': { progress: 64, sessions: '12 of 24 sessions', lesson: 'Unit 6 · Giving directions', duration: '24 min', className: 'A2-01', mentor: 'Lê Hoàng Nam', next: 'Thu, 16 Jul · 19:00', icon: MapPinned, theme: 'directions' },
  'ENG-B1': { progress: 35, sessions: '4 of 12 sessions', lesson: 'Speaking with confidence', duration: '18 min', className: 'B1-01', mentor: 'Đặng Quốc Bảo', next: 'Wed, 16 Jul · 19:30', icon: MessageCircle, theme: 'conversation' },
  'IELTS-01': { progress: 12, sessions: 'Preview available', lesson: 'Course plan in review', duration: '—', className: 'Planning', mentor: 'Course team', next: 'Schedule to be confirmed', icon: PenLine, theme: 'writing' },
};

function HelixMarker() {
  return <span className="helix-marker" aria-hidden="true"><i /><i /><i /></span>;
}

function CourseIdentity({ course, compact = false }) {
  const detail = coursePresentation[course.code];
  const Icon = detail.icon;
  return <div className={`course-identity course-identity--${detail.theme} ${compact ? 'is-compact' : ''}`}><HelixMarker /><span className="course-identity__icon"><Icon size={compact ? 18 : 22} aria-hidden="true" /></span><span><small>{course.code} · {course.level}</small><strong>{course.name}</strong></span></div>;
}

export default function MyCoursesPage() {
  const navigate = useNavigate();
  const { data } = useStore();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const courses = useMemo(() => data.courses.map((course) => ({ ...course, ...coursePresentation[course.code] })), [data.courses]);
  const visibleCourses = useMemo(() => courses.filter((course) => {
    const matchesFilter = filter === 'All' || course.status === filter;
    const matchesQuery = `${course.code} ${course.name} ${course.level} ${course.mentor}`.toLowerCase().includes(query.trim().toLowerCase());
    return matchesFilter && matchesQuery;
  }), [courses, filter, query]);
  const featuredCourse = visibleCourses.find((course) => course.code === 'ENG-A2');
  const remainingCourses = visibleCourses.filter((course) => course.code !== featuredCourse?.code);
  const activeCount = courses.filter((course) => course.status === 'Active').length;
  const draftCount = courses.filter((course) => course.status === 'Draft').length;
  const openCourse = (course) => navigate(`/student/sessions?course=${course.code}`);

  return <div className="my-courses">
    <header className="my-courses__intro">
      <div>
        <span className="eyebrow">ST-02 · STUDENT</span>
        <h1>My courses</h1>
        <p>Pick up where you left off, see what is next and keep your learning in rhythm.</p>
      </div>
      <span className="my-courses__summary">{activeCount} active · {draftCount} draft</span>
    </header>

    <div className="my-courses__controls" aria-label="Course controls">
      <SearchField value={query} onChange={setQuery} placeholder="Search courses or levels…" />
      <div className="course-filter" role="group" aria-label="Filter courses by status">
        {['All', 'Active', 'Draft', 'Completed'].map((item) => <button key={item} type="button" className={filter === item ? 'is-active' : ''} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}
      </div>
    </div>

    {featuredCourse ? <section className="course-feature" aria-labelledby="continue-learning-title">
      <div className="course-feature__main">
        <div className="course-feature__top"><span className="course-feature__eyebrow">CONTINUE LEARNING</span><StatusBadge status={featuredCourse.status} /></div>
        <CourseIdentity course={featuredCourse} />
        <div className="course-feature__lesson"><span>Current lesson</span><strong id="continue-learning-title">{featuredCourse.lesson}</strong><small><Clock3 size={15} aria-hidden="true" />About {featuredCourse.duration}</small></div>
        <div className="course-feature__progress"><Progress value={featuredCourse.progress} label={featuredCourse.sessions} /><div className="course-feature__milestones" aria-hidden="true"><i className="is-complete" /><i className="is-complete" /><i className="is-current" /><i /><i /></div></div>
        <div className="course-feature__next-inline"><CalendarDays size={16} aria-hidden="true" /><span><small>Next live session</small><strong>{featuredCourse.next}</strong></span></div>
        <div className="course-feature__actions"><Button icon={ArrowRight} onClick={() => openCourse(featuredCourse)}>Continue lesson</Button><Button variant="ghost" onClick={() => openCourse(featuredCourse)}>View course outline</Button></div>
      </div>
      <aside className="course-feature__next" aria-label="Next session">
        <HelixMarker />
        <span className="course-feature__eyebrow">NEXT LIVE SESSION</span>
        <strong>{featuredCourse.next}</strong>
        <span><GraduationCap size={16} aria-hidden="true" />{featuredCourse.mentor}</span>
        <span><CalendarDays size={16} aria-hidden="true" />Class {featuredCourse.className}</span>
        <div className="course-feature__next-note"><span>Lesson materials</span><strong>Student book and audio practice are ready.</strong></div>
        <Button variant="secondary" size="sm" onClick={() => openCourse(featuredCourse)}>View session</Button>
      </aside>
    </section> : null}

    <section className="course-library" aria-labelledby="course-library-title">
      <div className="course-library__heading"><div><span className="eyebrow">YOUR LEARNING LIBRARY</span><h2 id="course-library-title">{featuredCourse ? 'More courses' : 'Courses'}</h2></div><span>{visibleCourses.length} {visibleCourses.length === 1 ? 'course' : 'courses'}</span></div>
      {remainingCourses.length ? <div className="course-library__grid">{remainingCourses.map((course) => <article key={course.code} className={`course-tile course-tile--${course.status.toLowerCase()}`}>
        <div className="course-tile__top"><CourseIdentity course={course} compact /><StatusBadge status={course.status} /></div>
        <div className="course-tile__context"><span>Next step</span><strong>{course.lesson}</strong></div>
        <div className="course-tile__meta"><span><UserRound size={15} aria-hidden="true" />{course.mentor}</span><span><CalendarDays size={15} aria-hidden="true" />{course.next}</span></div>
        <div className="course-tile__footer"><Progress value={course.progress} label={course.sessions} /><Button variant={course.status === 'Active' ? 'secondary' : 'ghost'} size="sm" onClick={() => openCourse(course)}>{course.status === 'Active' ? 'Resume' : 'View plan'} <ArrowRight size={15} /></Button></div>
      </article>)}</div> : <EmptyState title="No courses in this view" description="Try a different status or search term to find a course." action={<Button variant="secondary" onClick={() => { setFilter('All'); setQuery(''); }}>Clear filters</Button>} />}
    </section>
  </div>;
}
