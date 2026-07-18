import React, { useEffect, useId, useRef, useState } from 'react';
import { X, Search, Inbox, CheckCircle2, AlertTriangle, Info, ChevronRight, UploadCloud } from 'lucide-react';

export function Button({ children, variant = 'primary', size = 'md', icon: Icon, className = '', type = 'button', ...props }) {
  return <button type={type} className={`button button--${variant} button--${size} ${className}`} {...props}>{Icon ? <Icon size={17} aria-hidden="true" /> : null}<span>{children}</span></button>;
}

export function Badge({ children, tone = 'neutral' }) { return <span className={`badge badge--${tone}`}>{children}</span>; }

export function statusTone(status = '') {
  const v = String(status).toLowerCase();
  if (['active', 'present', 'completed', 'returned', 'success', 'submitted'].some((x) => v.includes(x))) return 'success';
  if (['pending', 'late', 'draft', 'grading', 'upcoming', 'warning'].some((x) => v.includes(x))) return 'warning';
  if (['inactive', 'absent', 'error', 'locked', 'needs mentor', 'dropped'].some((x) => v.includes(x))) return 'danger';
  if (['info', 'excused', 'transferred'].some((x) => v.includes(x))) return 'info';
  return 'neutral';
}

export function StatusBadge({ status }) { return <Badge tone={statusTone(status)}>{status}</Badge>; }

export function PageHeader({ eyebrow, title, description, actions, breadcrumbs, variant = 'default', meta }) {
  return <header className={`page-header page-header--${variant}`}><div className="page-header__copy">{breadcrumbs ? <div className="breadcrumbs">{breadcrumbs}</div> : null}{eyebrow ? <div className="eyebrow">{eyebrow}</div> : null}<h1>{title}</h1>{description ? <p>{description}</p> : null}{meta ? <div className="page-header__meta">{meta}</div> : null}</div>{actions ? <div className="page-header__actions">{actions}</div> : null}{variant === 'welcome' ? <div className="page-header__architecture" aria-hidden="true"><i /><i /><i /></div> : null}</header>;
}

export function Section({ title, description, actions, children, className = '' }) {
  return <section className={`section ${className}`}>{(title || actions) && <div className="section__header"><div>{title ? <h2>{title}</h2> : null}{description ? <p>{description}</p> : null}</div>{actions ? <div className="section__actions">{actions}</div> : null}</div>}<div className="section__body">{children}</div></section>;
}

export function MetricStrip({ items }) { return <div className="metric-strip" role="list">{items.map((item) => <div className="metric-strip__item" key={item.label} role="listitem"><div className="metric-strip__label">{item.label}</div><div className="metric-strip__value">{item.value}</div>{item.note ? <div className={`metric-strip__note ${item.tone ? `text-${item.tone}` : ''}`}>{item.note}</div> : null}</div>)}</div>; }
export function Progress({ value, label, compact = false }) { const safeValue = Math.min(100, Math.max(0, value)); return <div className={`progress ${compact ? 'progress--compact' : ''}`}>{label ? <div className="progress__meta"><span>{label}</span><strong>{safeValue}%</strong></div> : null}<div className="progress__track" role="progressbar" aria-label={label || 'Progress'} aria-valuemin="0" aria-valuemax="100" aria-valuenow={safeValue}><span style={{ width: `${safeValue}%` }} /></div></div>; }
export function SearchField({ value, onChange, placeholder = 'Search…' }) { return <label className="search-field"><Search size={18} aria-hidden="true" /><input value={value} onChange={(e) => onChange?.(e.target.value)} placeholder={placeholder} aria-label={placeholder} /></label>; }

export function Tabs({ items, active, onChange, label = 'Content filters' }) {
  const handleKeyDown = (event, index) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const nextIndex = event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + items.length) % items.length;
    const next = items[nextIndex];
    onChange?.(typeof next === 'string' ? next : next.key);
    event.currentTarget.parentElement?.querySelectorAll('[role="tab"]')[nextIndex]?.focus();
  };
  return <div className="tabs" role="tablist" aria-label={label}>{items.map((item, index) => { const key = typeof item === 'string' ? item : item.key; const itemLabel = typeof item === 'string' ? item : item.label; return <button key={key} type="button" role="tab" aria-selected={active === key} tabIndex={active === key ? 0 : -1} className={active === key ? 'is-active' : ''} onKeyDown={(event) => handleKeyDown(event, index)} onClick={() => onChange?.(key)}>{itemLabel}</button>; })}</div>;
}

export function DataTable({ columns, rows, emptyTitle = 'No data yet', emptyText = 'Data will appear here when it is created.', rowKey, pageSize = 20 }) {
  const [page, setPage] = useState(1);
  if (!rows?.length) return <EmptyState title={emptyTitle} description={emptyText} />;
  const pages = Math.max(1, Math.ceil(rows.length / pageSize));
  const visibleRows = rows.slice((page - 1) * pageSize, page * pageSize);
  return <div className="table-wrap"><table className="data-table"><thead><tr>{columns.map((col) => <th key={col.key}>{col.label}</th>)}</tr></thead><tbody>{visibleRows.map((row, index) => <tr key={rowKey ? row[rowKey] : row.id || row.code || index}>{columns.map((col) => <td key={col.key} data-label={col.label}>{col.render ? col.render(row, index) : row[col.key]}</td>)}</tr>)}</tbody></table>{pages > 1 ? <div className="table-pagination" aria-label="Table pagination"><button type="button" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>Previous</button><span>Page {page} of {pages}</span><button type="button" disabled={page === pages} onClick={() => setPage((p) => p + 1)}>Next</button></div> : null}</div>;
}

export function EmptyState({ title = 'No data yet', description, action }) { return <div className="empty-state"><div className="empty-state__icon" aria-hidden="true"><Inbox size={24} /></div><h3>{title}</h3>{description ? <p>{description}</p> : null}{action}</div>; }

export function Modal({ open, title, description, onClose, children, footer, size = 'md' }) {
  const headingRef = useRef(null);
  const dialogRef = useRef(null);
  const returnFocusRef = useRef(null);
  useEffect(() => {
    if (!open) return undefined;
    returnFocusRef.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handler = (event) => {
      if (event.key === 'Escape') { event.preventDefault(); onClose?.(); return; }
      if (event.key !== 'Tab') return;
      const focusable = [...dialogRef.current.querySelectorAll('button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), a[href], [tabindex]:not([tabindex="-1"])')];
      if (!focusable.length) { event.preventDefault(); headingRef.current?.focus(); return; }
      const first = focusable[0]; const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener('keydown', handler);
    headingRef.current?.focus();
    return () => { window.removeEventListener('keydown', handler); document.body.style.overflow = previousOverflow; returnFocusRef.current?.focus?.(); };
  }, [open, onClose]);
  if (!open) return null;
  return <div className="modal-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && onClose?.()}><div ref={dialogRef} className={`modal modal--${size}`} role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby={description ? 'modal-description' : undefined}><div className="modal__header"><div><h2 id="modal-title" tabIndex="-1" ref={headingRef}>{title}</h2>{description ? <p id="modal-description">{description}</p> : null}</div><button type="button" className="icon-button" onClick={onClose} aria-label="Close dialog"><X size={20} aria-hidden="true" /></button></div><div className="modal__body">{children}</div>{footer ? <div className="modal__footer">{footer}</div> : null}</div></div>;
}

export function Toast({ tone = 'success', children, onClose }) { const Icon = tone === 'success' ? CheckCircle2 : tone === 'danger' ? AlertTriangle : Info; return <div className={`toast toast--${tone}`} role={tone === 'danger' ? 'alert' : 'status'} aria-live={tone === 'danger' ? 'assertive' : 'polite'}><Icon size={19} aria-hidden="true" /><span>{children}</span>{onClose ? <button type="button" onClick={onClose} aria-label="Close notification"><X size={16} aria-hidden="true" /></button> : null}</div>; }
export function Field({ label, required, error, hint, children }) { const messageId = useId(); return <label className={`field ${error ? 'field--error' : ''}`}><span className="field__label">{label}{required ? <b aria-hidden="true"> *</b> : null}</span>{children}{error ? <span id={messageId} className="field__error" role="alert">{error}</span> : hint ? <span id={messageId} className="field__hint">{hint}</span> : null}</label>; }

export function UploadZone({ title = 'Drop a file here', description = 'Or choose a file from your device', accept = '.pdf,.doc,.docx,.csv,.xlsx', maxSizeMb = 50, onChange }) {
  const [error, setError] = useState(''); const [selected, setSelected] = useState(null);
  const handleChange = (event) => { const file = event.target.files?.[0]; if (!file) return; if (file.size > maxSizeMb * 1024 * 1024) { setError(`File must be smaller than ${maxSizeMb} MB.`); return; } setError(''); setSelected(file); onChange?.(file); };
  return <label className="upload-zone"><UploadCloud size={28} /><strong>{title}</strong><span>{description}</span><small>Supported formats: {accept} · Max {maxSizeMb} MB</small><input type="file" accept={accept} onChange={handleChange} />{selected ? <small role="status">Selected: {selected.name}</small> : null}{error ? <small className="text-danger" role="alert">{error}</small> : null}</label>;
}

export function InlineNotice({ tone = 'info', title, children }) { const Icon = tone === 'danger' ? AlertTriangle : tone === 'success' ? CheckCircle2 : Info; return <div className={`inline-notice inline-notice--${tone}`} role={tone === 'danger' ? 'alert' : 'status'}><Icon size={19} aria-hidden="true" /><div><strong>{title}</strong>{children ? <p>{children}</p> : null}</div></div>; }
export function ListLink({ title, meta, right, onClick }) { return <button type="button" className="list-link" onClick={onClick}><span><strong>{title}</strong>{meta ? <small>{meta}</small> : null}</span><span className="list-link__right">{right}<ChevronRight size={18} /></span></button>; }
