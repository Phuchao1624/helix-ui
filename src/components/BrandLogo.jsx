import React from 'react';

export default function BrandLogo({ compact = false, inverse = false }) {
  return (
    <div className={`brand-logo ${compact ? 'brand-logo--compact' : ''} ${inverse ? 'brand-logo--inverse' : ''}`} aria-label="HELIX Hope School">
      <div className="brand-logo__mark" aria-hidden="true">
        <span /><span /><span />
      </div>
      <div className="brand-logo__text">
        <strong>HELIX</strong>
        {!compact ? <small>HOPE ENGLISH LEARNING</small> : null}
      </div>
    </div>
  );
}
