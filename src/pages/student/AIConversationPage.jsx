import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, BookOpen, Captions, Check, Lightbulb, Mic2, Pause, Play, RotateCcw, Settings2, Sparkles, Target, Volume2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/UI';
import { useStore } from '../../data/store';

const coaches = {
  luna: { name: 'Luna', label: 'Female voice', accent: '#8b6cff', reply: 'That sounds fun! What are you most looking forward to this weekend?' },
  leo: { name: 'Leo', label: 'Male voice', accent: '#1b9bd7', reply: 'Nice plan! Who would you like to spend the weekend with?' },
};

function SessionIcon({ type }) {
  const common = { className: `session-icon session-icon--${type}`, viewBox: '0 0 24 24', 'aria-hidden': true };
  if (type === 'topic') return <svg {...common}><path d="m12 2.8 7.8 4.5v9L12 20.8l-7.8-4.5v-9Z" fill="#eef3ff" stroke="#7187bd" strokeWidth="1.5"/><circle cx="12" cy="10.5" r="2.4" fill="#8b6cff"/><path d="M8.8 15.7c.7-1.5 1.8-2.3 3.2-2.3s2.5.8 3.2 2.3" fill="none" stroke="#25a7df" strokeLinecap="round" strokeWidth="1.6"/></svg>;
  if (type === 'level') return <svg {...common}><path d="M5 19V9m5 10V5m5 14v-7m5 7V3" fill="none" stroke="#8191a9" strokeLinecap="round" strokeWidth="1.5"/><path d="M5 15v4m5-8v8m5-3v3m5-11v11" fill="none" stroke="#7b67e8" strokeLinecap="round" strokeWidth="2.5"/><circle cx="20" cy="5" r="2" fill="#ff9b52"/></svg>;
  if (type === 'time') return <svg {...common}><circle cx="12" cy="13" r="7.5" fill="#edf7ff" stroke="#5584bd" strokeWidth="1.5"/><path d="M12 8.7v4.7l3 1.7" fill="none" stroke="#178fd0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"/><path d="M9.5 3h5M12 3v2" stroke="#ff9b52" strokeLinecap="round" strokeWidth="1.7"/></svg>;
  if (type === 'connection') return <svg {...common}><path d="M4 14.5v4M8 11v7.5m4-11v11m4-15v15m4-8v8" fill="none" stroke="#25c47a" strokeLinecap="round" strokeWidth="2.4"/><circle cx="20" cy="7.5" r="2" fill="#ffad32"/></svg>;
  if (type === 'ai') return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="7" fill="#dff6ff" stroke="#44a9dc" strokeWidth="1.4"/><rect x="6" y="8" width="12" height="8" rx="4" fill="#103a66"/><circle cx="9.5" cy="11.5" r="1.5" fill="#59e1f4"/><circle cx="14.5" cy="11.5" r="1.5" fill="#9c83ff"/><path d="M10 14c1.2.7 2.8.7 4 0" fill="none" stroke="#72edcf" strokeLinecap="round"/><path d="M12 5V2.8" stroke="#7187bd" strokeLinecap="round" strokeWidth="1.5"/><circle cx="12" cy="2.5" r="1.3" fill="#ff8e58"/></svg>;
  return <svg {...common}><rect x="4" y="5.5" width="16" height="15" rx="2.5" fill="#fff3e8" stroke="#e48a55" strokeWidth="1.4"/><path d="M8 3v5m8-5v5M4 10h16" stroke="#7c8fb1" strokeLinecap="round" strokeWidth="1.5"/><path d="m9 15 2 2 4-4" fill="none" stroke="#2abd7b" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"/></svg>;
}

function ScoreIcon({ index }) {
  const colors = ['#7867e8', '#1b9bd7', '#2ec27e', '#ff9f43'];
  return <svg className="score-icon" viewBox="0 0 20 20" aria-hidden="true" style={{ '--score-icon-color': colors[index] }}><circle cx="10" cy="10" r="8" fill="color-mix(in srgb, var(--score-icon-color) 12%, white)" stroke="var(--score-icon-color)" strokeWidth="1.3"/>{index === 0 ? <><path d="M8 7.5v3a2 2 0 0 0 4 0v-3" fill="none" stroke="var(--score-icon-color)" strokeLinecap="round" strokeWidth="1.4"/><path d="M6.8 10.5a3.2 3.2 0 0 0 6.4 0M10 13.7V16" fill="none" stroke="var(--score-icon-color)" strokeLinecap="round" strokeWidth="1.2"/></> : index === 1 ? <path d="M5.5 11.5 8 9l2 2 4.5-4.5M12 6.5h2.5V9" fill="none" stroke="var(--score-icon-color)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/> : index === 2 ? <><path d="M6 6.5h3.3A2.7 2.7 0 0 1 12 9.2V15a2.7 2.7 0 0 0-2.7-2.7H6Z" fill="none" stroke="var(--score-icon-color)" strokeLinejoin="round" strokeWidth="1.2"/><path d="M14 6.5h-2" stroke="var(--score-icon-color)" strokeLinecap="round" strokeWidth="1.2"/></> : <path d="m6.3 13.8 1-3.1 5.8-5.8 2 2-5.8 5.8Zm6-8 2 2" fill="none" stroke="var(--score-icon-color)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3"/>}</svg>;
}

function ExpressiveRobot({ coach, speaking, listening }) {
  return <div className={`talking-robot talking-robot--${coach} ${speaking ? 'is-speaking' : ''} ${listening ? 'is-listening' : ''}`} aria-label={`${coaches[coach].name} AI coach ${speaking ? 'is speaking' : listening ? 'is listening' : 'is ready'}`}>
    <div className="talking-robot__aura"><i /><i /><i /></div>
    <div className="talking-robot__antenna"><i /></div>
    <div className="talking-robot__ear talking-robot__ear--left"><i /></div><div className="talking-robot__ear talking-robot__ear--right"><i /></div>
    <div className="talking-robot__head"><div className="talking-robot__screen"><div className="talking-robot__eyes"><i /><i /></div><span className="talking-robot__cheek talking-robot__cheek--left" /><span className="talking-robot__cheek talking-robot__cheek--right" /><div className="talking-robot__mouth"><i /></div></div></div>
    <div className="talking-robot__neck" /><div className="talking-robot__body"><span className="helix-marker"><i /><i /><i /></span><b>HELIX</b></div>
  </div>;
}

export default function AIConversationPage() {
  const navigate = useNavigate();
  const { data } = useStore();
  const [coach, setCoach] = useState('luna');
  const [speaking, setSpeaking] = useState(false);
  const [listening, setListening] = useState(false);
  const [paused, setPaused] = useState(false);
  const [callActive, setCallActive] = useState(false);
  const [captions, setCaptions] = useState(true);
  const [seconds, setSeconds] = useState(630);
  const [caption, setCaption] = useState(coaches.luna.reply);
  const timers = useRef([]);
  const callActiveRef = useRef(false);
  const pausedRef = useRef(false);
  const tokenBalance = data.tokens?.balance ?? 115;

  useEffect(() => {
    const activeTimers = timers.current;
    return () => activeTimers.forEach(window.clearTimeout);
  }, []);

  useEffect(() => {
    if (!callActive || paused) return undefined;
    const timer = window.setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [callActive, paused]);

  const time = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
  const clearConversationTimers = () => { timers.current.forEach(window.clearTimeout); timers.current.length = 0; };
  const beginListeningTurn = () => {
    if (!callActiveRef.current || pausedRef.current) return;
    setSpeaking(false); setListening(true); setCaption("I'm listening...");
    const heard = window.setTimeout(() => {
      if (!callActiveRef.current || pausedRef.current) return;
      setListening(false); setCaption("I'm planning to visit a new cafe and hang out with my friends.");
      const answer = window.setTimeout(() => makeCoachSpeak(), 650); timers.current.push(answer);
    }, 3200);
    timers.current.push(heard);
  };
  const makeCoachSpeak = (nextCoach = coach) => {
    if (!callActiveRef.current || pausedRef.current) return;
    setListening(false); setSpeaking(true); setCaption(coaches[nextCoach].reply);
    const timer = window.setTimeout(() => {
      if (!callActiveRef.current || pausedRef.current) return;
      setSpeaking(false); beginListeningTurn();
    }, 3000);
    timers.current.push(timer);
  };
  const startConversation = () => {
    if (callActiveRef.current) return;
    clearConversationTimers(); callActiveRef.current = true; pausedRef.current = false;
    setCallActive(true); setPaused(false); beginListeningTurn();
  };
  const togglePause = () => {
    if (!callActiveRef.current) return;
    const next = !pausedRef.current; pausedRef.current = next; setPaused(next); clearConversationTimers();
    setSpeaking(false); setListening(false); setCaption(next ? 'The conversation is paused.' : "Let's continue - I'm listening.");
    if (!next) beginListeningTurn();
  };
  const chooseCoach = (key) => {
    setCoach(key); clearConversationTimers();
    if (callActiveRef.current && !pausedRef.current) makeCoachSpeak(key); else setCaption(coaches[key].reply);
  };

  return <main className="ai-call">
    <header className="ai-call__titlebar"><button type="button" onClick={() => navigate('/student/ai')} aria-label="Back to AI Practice"><ArrowLeft size={20} /></button><div><h1>Speaking with AI</h1><p>Practise speaking live with AI</p></div><Button variant="secondary" onClick={() => navigate('/student/ai')}>End session</Button><div className="token-balance"><Sparkles size={17} /><strong>{tokenBalance}</strong><span>tokens</span></div></header>

    <section className="ai-call__summary" aria-label="Session information"><div><SessionIcon type="topic" /><span><small>Topic</small><strong>Weekend Plans</strong></span></div><div><SessionIcon type="level" /><span><small>Level</small><strong>Intermediate B1</strong></span></div><div><SessionIcon type="time" /><span><small>Time</small><strong>{time}</strong></span></div><div><SessionIcon type="connection" /><span><small>Connection</small><strong>Good</strong></span></div><div><SessionIcon type="ai" /><span><small>HELIX AI</small><strong>{coaches[coach].name}</strong></span></div><div><SessionIcon type="session" /><span><small>Session</small><strong>#240521</strong></span></div></section>

    <div className="ai-call__workspace">
      <aside className="ai-call__brief"><h2><Target size={17} /> Context &amp; Goals</h2><dl><div><dt>Topic</dt><dd>Weekend Plans</dd></div><div><dt>Goal</dt><dd>Talk about weekend plans using future forms and linking words.</dd></div></dl><section><h3><Lightbulb size={15} /> Quick prompts</h3>{["I'm planning to...", 'I might... if the weather is good.', "One thing I'm really looking forward to is..."].map((hint) => <button key={hint} type="button" onClick={() => { setCaption(hint); setSpeaking(false); }}><span>{hint}</span><Volume2 size={14} /></button>)}</section><section><h3><BookOpen size={15} /> Useful vocabulary</h3><div className="ai-call__vocab">{['plan', 'hang out', 'outdoor', 'excited', 'relax', 'schedule', '+12'].map((word) => <span key={word}>{word}</span>)}</div></section><div className="ai-call__note"><Sparkles size={16} /><p><strong>Quick tip</strong>Complete each idea and use linking words to make your answer flow.</p></div></aside>

      <section className="ai-call__stage">
        <div className={`ai-voice-field ${speaking ? 'is-speaking' : ''} ${listening ? 'is-listening' : ''}`} aria-hidden="true"><div>{Array.from({ length: 42 }, (_, index) => <i key={index} />)}</div><div>{Array.from({ length: 42 }, (_, index) => <i key={index} />)}</div></div>
        <ExpressiveRobot coach={coach} speaking={speaking} listening={listening} />
        <div className={`ai-call__state ${speaking ? 'is-speaking' : listening ? 'is-listening' : ''}`}><span>{Array.from({ length: 5 }, (_, index) => <i key={index} />)}</span>{speaking ? 'AI is speaking...' : listening ? 'AI is listening...' : 'Ready to listen'}</div>
        <div className={`ai-call__caption ${captions ? '' : 'is-hidden'}`}><p>{caption}</p><label><Captions size={15} /> AI captions <input type="checkbox" checked={captions} onChange={(event) => setCaptions(event.target.checked)} /></label></div>
        <div className="ai-call__coaches"><span>Choose an AI voice</span><div>{Object.entries(coaches).map(([key, item]) => <button type="button" key={key} className={coach === key ? 'is-active' : ''} style={{ '--coach-accent': item.accent }} onClick={() => chooseCoach(key)}><span className={`coach-face coach-face--${key}`}><i /><b /></span><span><strong>{item.name}</strong><small>{item.label}</small></span>{coach === key ? <Check size={13} /> : null}</button>)}</div></div>
      </section>

      <aside className="ai-call__progress"><h2>Session progress</h2><div className="ai-call__completion"><span><small>Time</small><strong>{time}</strong></span><div><b>65%</b></div><small>Completed</small></div><section><header><h3>Current score</h3><strong>8.2<small>/10</small></strong></header>{[['Pronunciation',85],['Fluency',80],['Vocabulary',85],['Grammar',78]].map(([label, value], index) => <div className="ai-score-row" key={label}><ScoreIcon index={index} /><div className="ai-score-row__metric"><span>{label}<b>{(value / 10).toFixed(1)}</b></span><div><i style={{ width: `${value}%`, '--score-color': index === 3 ? '#ffab3e' : index === 1 ? '#1b9bd7' : '#2ec27e' }} /></div></div></div>)}</section><section className="ai-call__goals"><h3>Goals</h3><span><Check size={14} /> Keep the conversation going for 5 minutes</span><span><Check size={14} /> Use 10 new vocabulary words</span><span><i /> Clear pronunciation &gt; 85%</span></section></aside>
    </div>

    <footer className="ai-call__controls"><button type="button" onClick={() => setCaptions(!captions)} className={captions ? 'is-active' : ''}><Captions size={18} /><span>AI captions</span></button><button type="button" onClick={togglePause} disabled={!callActive}>{paused ? <Play size={18} /> : <Pause size={18} />}<span>{paused ? 'Resume' : 'Pause'}</span></button><button type="button" onClick={() => setCaption("Try: I'm really looking forward to...")}><Lightbulb size={18} /><span>Hint</span></button><button type="button" className={`ai-call__mic ${listening ? 'is-listening' : ''} ${callActive ? 'is-active' : ''}`} onClick={startConversation}><span><Mic2 size={28} /></span><b>{!callActive ? 'Start conversation' : paused ? 'Paused' : listening ? 'You are speaking...' : speaking ? 'AI is replying...' : 'Call in progress'}</b></button><button type="button" onClick={() => { clearConversationTimers(); makeCoachSpeak(); }} disabled={!callActive}><RotateCcw size={18} /><span>Replay</span></button><button type="button"><Settings2 size={18} /><span>Settings</span></button><button type="button" className="is-danger" onClick={() => { callActiveRef.current = false; clearConversationTimers(); navigate('/student/ai'); }}><span>●</span><b>End call</b></button></footer>
  </main>;
}
