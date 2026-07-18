import React from 'react';

export default function RoleDashboardHero({
  role,
  eyebrow,
  title,
  accent,
  description,
  image,
  imageAlt,
  actions,
  meta = [],
  status,
}) {
  return <section className={`role-dashboard-hero role-dashboard-hero--${role}`} aria-labelledby={`${role}-dashboard-title`}>
    <div className="role-dashboard-hero__copy">
      <span className="role-dashboard-hero__eyebrow"><i />{eyebrow}</span>
      <h1 id={`${role}-dashboard-title`}>{title}<em>{accent}</em></h1>
      <p>{description}</p>
      {meta.length ? <div className="role-dashboard-hero__meta">
        {meta.map(({ icon: Icon, label }) => <span key={label}>{Icon ? <Icon size={15} aria-hidden="true" /> : null}{label}</span>)}
      </div> : null}
      {actions ? <div className="role-dashboard-hero__actions">{actions}</div> : null}
    </div>
    <div className="role-dashboard-hero__visual">
      <img src={image} alt={imageAlt} />
      {status ? <div className="role-dashboard-hero__status">
        <span className="role-dashboard-hero__status-icon">{status.short}</span>
        <span><strong>{status.title}</strong><small>{status.detail}</small></span>
        <b><i />{status.state}</b>
      </div> : null}
    </div>
  </section>;
}
