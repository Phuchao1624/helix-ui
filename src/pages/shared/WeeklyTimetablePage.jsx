import React, { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { Button, Field, Modal, Toast } from '../../components/UI';
import { useStore } from '../../data/store';

const days = [
  { key: 'mon', short: 'MON', long: 'Monday', date: '13/07' }, { key: 'tue', short: 'TUE', long: 'Tuesday', date: '14/07' },
  { key: 'wed', short: 'WED', long: 'Wednesday', date: '15/07' }, { key: 'thu', short: 'THU', long: 'Thursday', date: '16/07' },
  { key: 'fri', short: 'FRI', long: 'Friday', date: '17/07' }, { key: 'sat', short: 'SAT', long: 'Saturday', date: '18/07' },
  { key: 'sun', short: 'SUN', long: 'Sunday', date: '19/07' },
];
const slotStarts = ['07:00', '08:30', '10:30', '12:30', '16:00', '17:30', '19:00', '20:30', '21:30', '22:30'];
const slotEnds = ['08:15', '10:00', '12:00', '14:45', '17:15', '19:00', '20:30', '21:30', '22:30', '23:30'];
const fallbackCourse = { code: 'ENG-A2', name: 'Everyday English A2' };
const fallbackClass = { code: 'A2-01', name: 'Everyday English A2 · Class 01', mentor: 'Le Hoang Nam', students: '24/25' };
const roleContent = {
  student: { eyebrow: 'Student Activities', title: 'Activities for Nguyen Minh Anh (Class A2-01)' },
  mentor: { eyebrow: 'Teaching Activities', title: 'Teaching activities for Le Hoang Nam' },
  coordinator: { eyebrow: 'Academic Operations', title: 'Weekly schedule management' },
  admin: { eyebrow: 'System Operations', title: 'School-wide weekly timetable' },
};

function CalendarGlyph({ type = 'calendar' }) {
  if (type === 'calendar') return <svg className="timetable-glyph timetable-glyph--calendar" viewBox="0 0 48 48" aria-hidden="true"><defs><linearGradient id="weekly-calendar-blue" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#119fea"/><stop offset="1" stopColor="#0758d0"/></linearGradient></defs><rect x="2" y="2" width="44" height="44" rx="8" fill="url(#weekly-calendar-blue)"/><rect x="11" y="13" width="26" height="24" rx="3" fill="none" stroke="#fff" strokeWidth="2.4"/><path d="M11 20h26M17 10v6m14-6v6" stroke="#fff" strokeLinecap="round" strokeWidth="2.4"/><path d="M17 25h3m4 0h3m4 0h1M17 30h3m4 0h3m4 0h1" stroke="#a9eaff" strokeLinecap="round" strokeWidth="2.7"/></svg>;
  if (type === 'online') return <svg className="timetable-inline-icon" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="7" fill="#e9fff3"/><circle cx="10" cy="10" r="4.5" fill="#24ba65"/><path d="M7 10.2 9 12l4-4" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/></svg>;
  return <svg className="timetable-inline-icon" viewBox="0 0 20 20" aria-hidden="true"><rect x="3" y="4" width="14" height="13" rx="2" fill="#fff4e8" stroke="#ff944d" strokeWidth="1.3"/><path d="M6.5 8h7m-7 3h7m-7 3h4" stroke="#238dcc" strokeLinecap="round" strokeWidth="1.2"/></svg>;
}

function sessionDayKey(session) {
  const raw = String(session.day || session.date || '').toLowerCase();
  return days.find((day) => raw.startsWith(day.key) || raw.startsWith(day.short.toLowerCase()) || raw.startsWith(day.long.toLowerCase()))?.key || 'thu';
}
function sessionDate(session) { return String(session.date || '').match(/\d{2}\/\d{2}/)?.[0] || days.find((day) => day.key === sessionDayKey(session))?.date || '16/07'; }
function startTime(session) { return session.startTime || String(session.time || '').split(/[–-]/)[0].trim() || '19:00'; }
function endTime(session) { return session.endTime || String(session.time || '').split(/[–-]/)[1]?.trim() || '20:30'; }
function sessionSlot(session) {
  if (session.slot) return Number(session.slot);
  const start = startTime(session);
  const minutes = (value) => { const [hour, minute] = value.split(':').map(Number); return hour * 60 + minute; };
  const value = minutes(start);
  if (value < 9 * 60) return 2;
  if (value < 14 * 60) return 3;
  if (value < 17 * 60 + 30) return 4;
  return 5;
}

function SessionCard({ item, role, onEdit }) {
  const state = item.status.toLowerCase() === 'completed' ? 'completed' : item.status.toLowerCase() === 'absent' ? 'absent' : 'upcoming';
  const status = state === 'completed' ? role === 'student' ? 'Attended' : 'Completed' : state === 'absent' ? 'Absent' : 'Not yet';
  const editable = role === 'coordinator';
  const edit = () => { if (editable) onEdit(item); };
  return <div className="timetable-session-wrap">
    <article className={`timetable-session timetable-session--${state} ${editable ? 'is-editable' : ''}`} aria-label={`${item.courseName}, ${item.title}, ${item.time}${editable ? ', click to edit' : ''}`} role={editable ? 'button' : undefined} tabIndex={editable ? 0 : undefined} onClick={edit} onKeyDown={(event) => { if (editable && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); edit(); } }}>
      <header><strong>{item.courseCode}</strong>{item.materials ? <span className="timetable-session__materials">View Materials</span> : null}</header>
      <p>at <b>{item.room}</b>.</p>
      <footer><span>{status}</span><time>{item.time}</time></footer>
    </article>
    {item.online ? <small className="timetable-session__online"><i/>Online</small> : null}
  </div>;
}

export default function WeeklyTimetablePage({ role }) {
  const { data, update } = useStore();
  const copy = roleContent[role] || roleContent.student;
  const [weekIndex, setWeekIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [notice, setNotice] = useState('');
  const defaultCourse = data.courses?.[0] || fallbackCourse;
  const defaultClass = data.classes?.[0] || fallbackClass;
  const createDraft = (day = 'mon', slot = 2) => ({ courseCode: defaultCourse.code, classCode: defaultClass.code, title: 'New lesson', day, date: days.find((item) => item.key === day)?.date || '13/07', slot: String(slot), startTime: slotStarts[slot - 1], endTime: slotEnds[slot - 1], type: 'Online', room: 'Google Meet', meetingUrl: '', mentor: defaultClass.mentor, students: String(defaultClass.students).split('/')[0] || '24', capacity: String(defaultClass.students).split('/')[1] || '25', status: 'Upcoming', materials: true });
  const [draft, setDraft] = useState(() => createDraft());

  const sessions = useMemo(() => (data.sessions || []).map((session) => {
    const classItem = data.classes?.find((item) => item.code === (session.classCode || 'A2-01')) || defaultClass;
    const courseItem = data.courses?.find((item) => item.code === session.courseCode) || data.courses?.find((item) => classItem.name?.includes(item.name)) || defaultCourse;
    return { ...session, day: sessionDayKey(session), dateOnly: sessionDate(session), slot: sessionSlot(session), startTime: startTime(session), endTime: endTime(session), time: `${startTime(session)}–${endTime(session)}`, courseCode: session.courseCode || courseItem.code, courseName: courseItem.name, classCode: session.classCode || classItem.code, mentor: session.mentor || classItem.mentor, room: session.room || (session.type === 'Online' ? 'Google Meet' : 'Hope School'), online: session.type === 'Online', students: session.students || String(classItem.students).split('/')[0], capacity: session.capacity || String(classItem.students).split('/')[1], materials: session.materials !== false };
  }), [data.classes, data.courses, data.sessions, defaultClass, defaultCourse]);
  const visibleSessions = useMemo(() => sessions.filter((item) => {
    const dateNumber = Number(item.dateOnly.split('/')[0]);
    const inWeek = weekIndex === 0 ? dateNumber >= 13 && dateNumber <= 19 : dateNumber >= 20 && dateNumber <= 26;
    const inRole = role !== 'mentor' || item.mentor === 'Le Hoang Nam';
    return inWeek && inRole;
  }), [role, sessions, weekIndex]);

  const openCreate = (day = 'mon', slot = 2) => { setEditingId(null); setDraft(createDraft(day, slot)); setOpen(true); };
  const openEdit = (item) => { setEditingId(item.id); setDraft({ ...item, date: item.dateOnly, slot: String(item.slot), students: String(item.students || ''), capacity: String(item.capacity || ''), type: item.online ? 'Online' : 'Offline' }); setOpen(true); };
  const saveSession = () => {
    const day = days.find((item) => item.key === draft.day) || days[0];
    const course = data.courses?.find((item) => item.code === draft.courseCode) || defaultCourse;
    const next = { id: editingId || `SS-${Date.now()}`, date: `${day.short[0]}${day.short.slice(1).toLowerCase()}, ${draft.date}`, day: draft.day, slot: Number(draft.slot), startTime: draft.startTime, endTime: draft.endTime, time: `${draft.startTime}–${draft.endTime}`, title: draft.title, courseCode: course.code, classCode: draft.classCode, type: draft.type, room: draft.room, meetingUrl: draft.meetingUrl, mentor: draft.mentor, students: draft.students, capacity: draft.capacity, attendance: '—', status: draft.status, materials: draft.materials };
    update('sessions', (items) => editingId ? items.map((item) => item.id === editingId ? { ...item, ...next } : item) : [...items, next]);
    setOpen(false); setNotice(editingId ? 'Session updated successfully.' : 'Session created successfully.');
  };
  const selectedClass = data.classes?.find((item) => item.code === draft.classCode);

  return <div className={`weekly-timetable weekly-timetable--${role}`}>
    <header className="weekly-timetable__hero"><CalendarGlyph/><div><h1>{copy.title}</h1><div className="weekly-timetable__notes"><p><b>i</b><strong>Note:</strong> These activities do not include extra-curriculum activities, such as club activities.</p><p><b>i</b><strong>Scope:</strong> The timetable only includes official learning and teaching sessions for the selected week.</p></div></div></header>
    <section className="timetable-toolbar" aria-label="Timetable filters"><label><span>YEAR</span><select aria-label="Academic year"><option>2026</option><option>2025</option></select></label><label><span>WEEK</span><select aria-label="Week" value={weekIndex} onChange={(event) => setWeekIndex(Number(event.target.value))}><option value="0">13/07 To 19/07</option><option value="1">20/07 To 26/07</option></select></label>{role === 'coordinator' ? <Button icon={Plus} onClick={() => openCreate()}>Create session</Button> : null}</section>
    <div className="timetable-scroll"><section className="timetable-grid timetable-grid--ten" aria-label={copy.title}><div className="timetable-grid__corner"><span>SLOT / WEEK</span></div>{days.map((day) => <div className="timetable-grid__day" key={day.key}><strong>{day.short}</strong><span>{day.date}</span></div>)}{slotStarts.map((start, slotIndex) => { const slot = slotIndex + 1; const rowHasSession = visibleSessions.some((session) => session.slot === slot); const rowHeight = rowHasSession ? 92 : 24; return <React.Fragment key={slot}><div className={`timetable-grid__slot ${rowHasSession ? 'has-session' : ''}`} style={{ '--timetable-row-height': `${rowHeight}px` }}><strong>Slot {slot}</strong></div>{days.map((day) => { const item = visibleSessions.find((session) => session.day === day.key && session.slot === slot); return <div className={`timetable-grid__cell ${item ? 'has-session' : ''}`} style={{ '--timetable-row-height': `${rowHeight}px` }} key={`${day.key}-${slot}`}>{item ? <SessionCard item={item} role={role} onEdit={openEdit}/> : role === 'coordinator' ? <button type="button" className="timetable-grid__add" onClick={() => openCreate(day.key, slot)} aria-label={`Create session on ${day.long}, slot ${slot}`}><Plus size={15}/></button> : <span>–</span>}</div>; })}</React.Fragment>; })}</section></div>
    <section className="timetable-mobile" aria-label={`${copy.title} mobile view`}>{days.map((day) => { const daySessions = visibleSessions.filter((session) => session.day === day.key).sort((a, b) => a.startTime.localeCompare(b.startTime)); return <article className="timetable-mobile__day" key={day.key}><header><span><strong>{day.long}</strong><small>{day.date}</small></span>{role === 'coordinator' ? <button type="button" onClick={() => openCreate(day.key, 2)}><Plus size={14}/>Add session</button> : null}</header><div>{daySessions.length ? daySessions.map((item) => <SessionCard key={item.id} item={item} role={role} onEdit={openEdit}/>) : <p>No sessions scheduled</p>}</div></article>; })}</section>
    <footer className="timetable-legend"><span><i className="is-attended"/><b>(completed):</b> Session completed successfully</span><span><i className="is-absent"/><b>(absent):</b> Student did not attend this session</span><span><i className="is-upcoming"/><b>(upcoming):</b> This session has not taken place yet</span><span><i className="is-empty"/><b>(–):</b> No schedule data available</span></footer>
    <Modal open={open} onClose={() => setOpen(false)} title={editingId ? 'Edit session' : 'Create session'} description="Configure all timetable information for this learning slot." footer={<><Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={saveSession}>{editingId ? 'Save changes' : 'Create session'}</Button></>}>
      <div className="form-grid timetable-session-form">
        <Field label="Course"><select value={draft.courseCode} onChange={(event) => setDraft({ ...draft, courseCode: event.target.value })}>{data.courses?.map((course) => <option key={course.code} value={course.code}>{course.code} · {course.name}</option>)}</select></Field>
        <Field label="Class"><select value={draft.classCode} onChange={(event) => { const item = data.classes?.find((entry) => entry.code === event.target.value); setDraft({ ...draft, classCode: event.target.value, mentor: item?.mentor || draft.mentor, students: String(item?.students || '').split('/')[0] || draft.students, capacity: String(item?.students || '').split('/')[1] || draft.capacity }); }}>{data.classes?.map((item) => <option key={item.code} value={item.code}>{item.code} · {item.name}</option>)}</select></Field>
        <Field label="Lesson title"><input value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })}/></Field>
        <Field label="Mentor"><input value={draft.mentor} onChange={(event) => setDraft({ ...draft, mentor: event.target.value })} placeholder={selectedClass?.mentor}/></Field>
        <Field label="Day"><select value={draft.day} onChange={(event) => { const day = days.find((item) => item.key === event.target.value); setDraft({ ...draft, day: event.target.value, date: day.date }); }}>{days.map((day) => <option key={day.key} value={day.key}>{day.long}</option>)}</select></Field>
        <Field label="Date"><input type="text" value={draft.date} onChange={(event) => setDraft({ ...draft, date: event.target.value })} placeholder="DD/MM"/></Field>
        <Field label="Slot"><select value={draft.slot} onChange={(event) => { const index = Number(event.target.value) - 1; setDraft({ ...draft, slot: event.target.value, startTime: slotStarts[index], endTime: slotEnds[index] }); }}>{slotStarts.map((time, index) => <option key={time} value={index + 1}>Slot {index + 1} · {time}</option>)}</select></Field>
        <Field label="Start time"><input type="time" value={draft.startTime} onChange={(event) => setDraft({ ...draft, startTime: event.target.value })}/></Field>
        <Field label="End time"><input type="time" value={draft.endTime} onChange={(event) => setDraft({ ...draft, endTime: event.target.value })}/></Field>
        <Field label="Delivery mode"><select value={draft.type} onChange={(event) => setDraft({ ...draft, type: event.target.value })}><option>Online</option><option>Offline</option><option>Hybrid</option></select></Field>
        <Field label="Room or platform"><input value={draft.room} onChange={(event) => setDraft({ ...draft, room: event.target.value })}/></Field>
        <Field label="Meeting URL"><input value={draft.meetingUrl} onChange={(event) => setDraft({ ...draft, meetingUrl: event.target.value })} placeholder="https://meet.google.com/..."/></Field>
        <Field label="Current students"><input type="number" min="0" value={draft.students} onChange={(event) => setDraft({ ...draft, students: event.target.value })}/></Field>
        <Field label="Capacity"><input type="number" min="1" value={draft.capacity} onChange={(event) => setDraft({ ...draft, capacity: event.target.value })}/></Field>
        <Field label="Status"><select value={draft.status} onChange={(event) => setDraft({ ...draft, status: event.target.value })}><option>Upcoming</option><option>Completed</option><option>Cancelled</option></select></Field>
        <Field label="Learning materials"><span className="timetable-checkbox"><input type="checkbox" checked={draft.materials} onChange={(event) => setDraft({ ...draft, materials: event.target.checked })}/> Materials are available</span></Field>
      </div>
    </Modal>
    {notice ? <Toast onClose={() => setNotice('')}>{notice}</Toast> : null}
  </div>;
}
