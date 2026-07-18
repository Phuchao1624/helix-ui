import React, { useState } from 'react';
import { Camera, KeyRound, Save } from 'lucide-react';
import { Button, Field, PageHeader, Section, Tabs, Toast } from '../../components/UI';

export default function ProfileSettingsPage() {
  const [tab, setTab] = useState('profile');
  const [saved, setSaved] = useState(false);
  return <>
    <PageHeader eyebrow="SH-04 · ACCOUNT" title="Profile" description="Manage your contact information and account security." />
    <Tabs items={[{ key: 'profile', label: 'Personal information' }, { key: 'security', label: 'Security' }, { key: 'preferences', label: 'Preferences' }]} active={tab} onChange={setTab} />
    {tab === 'profile' ? <Section><div className="profile-grid"><div className="profile-photo"><span className="avatar avatar--xl">MA</span><Button variant="secondary" icon={Camera}>Change photo</Button><small>JPG or PNG, up to 2 MB.</small></div><form className="form-grid" onSubmit={(e) => { e.preventDefault(); setSaved(true); setTimeout(() => setSaved(false), 2500); }}><Field label="Full name"><input defaultValue="Nguyen Minh Anh" /></Field><Field label="User ID"><input defaultValue="HS-1024" disabled /></Field><Field label="Email"><input defaultValue="minhanh@hope.edu.vn" disabled /></Field><Field label="Phone number"><input defaultValue="090 123 4567" /></Field><Field label="Date of birth"><input type="date" defaultValue="2010-08-18" /></Field><Field label="Language"><select defaultValue="en"><option value="en">English</option></select></Field><div className="form-actions"><Button type="submit" icon={Save}>Save changes</Button></div></form></div></Section> : tab === 'security' ? <Section title="Change password" description="A new password will sign your account out on other devices."><form className="form-grid form-grid--narrow"><Field label="Current password" required><input type="password" /></Field><Field label="New password" required><input type="password" /></Field><Field label="Confirm password" required><input type="password" /></Field><div className="form-actions"><Button icon={KeyRound}>Update password</Button></div></form></Section> : <Section title="Notification preferences"><div className="settings-list"><label><span><strong>Class reminder emails</strong><small>Receive a reminder 24 hours before class.</small></span><input type="checkbox" defaultChecked /></label><label><span><strong>Assignment notifications</strong><small>Receive updates for new, due, and graded assignments.</small></span><input type="checkbox" defaultChecked /></label><label><span><strong>Weekly summary</strong><small>Receive a progress report every Monday morning.</small></span><input type="checkbox" /></label></div></Section>}
    {saved ? <Toast>Profile changes saved.</Toast> : null}
  </>;
}
