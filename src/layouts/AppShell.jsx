import React, { useEffect, useMemo, useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, Settings, BookOpen, GraduationCap, CalendarDays,
  ClipboardCheck, FolderOpen, FileCheck2, Bell, UserRound, Menu, X,
  ChevronDown, LogOut, Layers3, UserPlus, School, ListChecks, ArrowLeftRight,
  Search, ChevronRight
} from 'lucide-react';
import BrandLogo from '../components/BrandLogo';
import { Bot, ClipboardList, Video } from 'lucide-react';

const navByRole = {
  admin: [
    { to: '/admin', label: 'Tổng quan', icon: LayoutDashboard },
    { to: '/admin/users', label: 'Người dùng', icon: Users },
    { to: '/admin/config', label: 'Cấu hình hệ thống', icon: Settings },
  ],
  coordinator: [
    { to: '/coordinator', label: 'Tổng quan', icon: LayoutDashboard },
    { to: '/coordinator/programs', label: 'Chương trình', icon: Layers3 },
    { to: '/coordinator/courses', label: 'Khoá học', icon: BookOpen },
    { to: '/coordinator/classes', label: 'Lớp học', icon: School },
    { to: '/coordinator/enrollment', label: 'Ghi danh', icon: UserPlus },
  ],
  mentor: [
    { to: '/mentor', label: 'Tổng quan', icon: LayoutDashboard },
    { to: '/mentor/classes', label: 'Lớp của tôi', icon: School },
    { to: '/mentor/materials', label: 'Học liệu', icon: FolderOpen },
    { to: '/mentor/assignments', label: 'Bài tập', icon: ClipboardCheck },
    { to: '/mentor/grading', label: 'Chấm bài', icon: FileCheck2 },
  ],
  student: [
    { to: '/student', label: 'Hôm nay', icon: LayoutDashboard },
    { to: '/student/courses', label: 'Khoá học', icon: BookOpen },
    { to: '/student/sessions', label: 'Buổi học', icon: CalendarDays },
    { to: '/student/assignments', label: 'Bài tập', icon: ListChecks },
  ],
};

const roleMeta = {
  admin: { name: 'Nguyễn Khánh Linh', role: 'Quản trị viên', shortRole: 'Admin', initials: 'KL' },
  coordinator: { name: 'Phạm Thu Hà', role: 'Điều phối viên', shortRole: 'Điều phối', initials: 'TH' },
  mentor: { name: 'Lê Hoàng Nam', role: 'Mentor tiếng Anh', shortRole: 'Mentor', initials: 'HN' },
  student: { name: 'Nguyễn Minh Anh', role: 'Học sinh · Lớp A2-01', shortRole: 'Học sinh', initials: 'MA' },
};

function inferRole(pathname) {
  if (pathname.startsWith('/admin')) return 'admin';
  if (pathname.startsWith('/coordinator')) return 'coordinator';
  if (pathname.startsWith('/mentor')) return 'mentor';
  if (pathname.startsWith('/student')) return 'student';
  return null;
}

export default function AppShell({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const pathRole = inferRole(location.pathname);
  const [lastRole, setLastRole] = useState(() => typeof window === 'undefined' ? 'student' : window.sessionStorage.getItem('helix-active-role') || 'student');
  const role = pathRole || lastRole;
  const nav = useMemo(() => [
    ...navByRole[role],
    ...(role === 'student' ? [
      { to: '/student/ai', label: 'AI Practice', icon: Bot },
      { to: '/student/assessments', label: 'Tests', icon: ClipboardList },
    ] : []),
    ...(role === 'mentor' ? [{ to: '/mentor/meet', label: 'Meet & Attendance', icon: Video }] : []),
  ], [role]);
  const meta = roleMeta[role];
  const [mobileOpen, setMobileOpen] = useState(false);
  const [roleMenu, setRoleMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const roleMenuRef = useRef(null);
  const activeItem = useMemo(
    () => nav.find((item) => location.pathname === item.to || (item.to !== `/${role}` && location.pathname.startsWith(item.to))) || nav[0],
    [location.pathname, nav, role]
  );

  const switchRole = (nextRole) => {
    setLastRole(nextRole);
    window.sessionStorage.setItem('helix-active-role', nextRole);
    setRoleMenu(false);
    setMobileOpen(false);
    navigate(`/${nextRole}`);
  };

  const navigateShared = (path) => {
    setLastRole(role);
    window.sessionStorage.setItem('helix-active-role', role);
    setRoleMenu(false);
    setMobileOpen(false);
    navigate(path);
  };

  useEffect(() => {
    if (!pathRole) return;
    window.sessionStorage.setItem('helix-active-role', pathRole);
  }, [pathRole]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); setSearchOpen(true); return; }
      if (event.key === 'Escape') { setMobileOpen(false); setRoleMenu(false); setSearchOpen(false); }
    };
    const handlePointerDown = (event) => { if (roleMenu && !roleMenuRef.current?.contains(event.target)) setRoleMenu(false); };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('pointerdown', handlePointerDown);
    return () => { window.removeEventListener('keydown', handleKeyDown); window.removeEventListener('pointerdown', handlePointerDown); };
  }, [roleMenu]);

  return (
    <div className="app-shell app-shell--header-nav">
      <header className="global-header">
        <div className="global-header__brand-line" />
        <div className="global-header__inner">
          <button className="global-header__menu" onClick={() => setMobileOpen((v) => !v)} aria-label={mobileOpen ? 'Đóng điều hướng' : 'Mở điều hướng'} aria-expanded={mobileOpen} aria-controls="mobile-navigation">
            {mobileOpen ? <X size={21} /> : <Menu size={21} />}
          </button>

          <button className="global-header__logo" type="button" onClick={() => navigate(`/${role}`)} aria-label="Về trang tổng quan">
            <BrandLogo compact />
          </button>

          <div className="global-header__role" aria-label={`Không gian ${meta.role}`}>
            <span>Không gian</span>
            <strong>{meta.shortRole}</strong>
          </div>

          <nav className="global-nav" aria-label="Điều hướng chính">
            {nav.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === `/${role}`}
                className={({ isActive }) => isActive ? 'is-active' : ''}
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="global-header__tools">
            <button className={`header-search ${searchOpen ? 'is-open' : ''}`} type="button" onClick={() => setSearchOpen((v) => !v)} aria-label="Tìm kiếm" aria-expanded={searchOpen} aria-controls="global-search">
              <Search size={18} />
              <span>Tìm kiếm</span>
              <kbd>⌘ K</kbd>
            </button>
            <button className="header-icon" onClick={() => navigateShared('/notifications')} aria-label="Thông báo">
              <Bell size={19} />
              <i />
            </button>
            <div className="header-profile" ref={roleMenuRef}>
              <button type="button" onClick={() => setRoleMenu((v) => !v)} aria-expanded={roleMenu} aria-haspopup="menu" aria-controls="role-menu">
                <span className="avatar avatar--small">{meta.initials}</span>
                <span className="header-profile__copy"><strong>{meta.name}</strong><small>{meta.role}</small></span>
                <ChevronDown size={16} />
              </button>
              {roleMenu ? (
                <div className="role-menu role-menu--header" id="role-menu" role="menu">
                  <span>Xem demo theo vai trò</span>
                  {Object.entries(roleMeta).map(([key, value]) => (
                    <button key={key} className={role === key ? 'is-active' : ''} onClick={() => switchRole(key)}>
                      {key === 'admin' ? <Settings size={16} /> : key === 'coordinator' ? <ArrowLeftRight size={16} /> : key === 'mentor' ? <GraduationCap size={16} /> : <BookOpen size={16} />}
                      <span><strong>{value.shortRole}</strong><small>{value.role}</small></span>
                      {role === key ? <ChevronRight size={15} /> : null}
                    </button>
                  ))}
                  <div className="role-menu__divider" />
                  <button onClick={() => navigateShared('/profile')}><UserRound size={16} /><span><strong>Hồ sơ cá nhân</strong><small>Cài đặt tài khoản</small></span></button>
                  <button onClick={() => navigate('/login')}><LogOut size={16} /><span><strong>Đăng xuất</strong><small>Kết thúc phiên làm việc</small></span></button>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className={`mobile-nav-panel ${mobileOpen ? 'is-open' : ''}`} id="mobile-navigation" hidden={!mobileOpen}>
          <div className="mobile-nav-panel__context">
            <span>{meta.role}</span>
            <strong>{activeItem.label}</strong>
          </div>
          <nav aria-label="Điều hướng trên thiết bị di động">
            {nav.map(({ to, label, icon: Icon }) => (
              <NavLink key={to} to={to} end={to === `/${role}`} onClick={() => setMobileOpen(false)} className={({ isActive }) => isActive ? 'is-active' : ''}>
                <Icon size={19} /><span>{label}</span><ChevronRight size={17} />
              </NavLink>
            ))}
            <NavLink to="/notifications" onClick={() => { setLastRole(role); window.sessionStorage.setItem('helix-active-role', role); setMobileOpen(false); }}><Bell size={19} /><span>Thông báo</span><b>2</b></NavLink>
            <NavLink to="/profile" onClick={() => { setLastRole(role); window.sessionStorage.setItem('helix-active-role', role); setMobileOpen(false); }}><UserRound size={19} /><span>Hồ sơ cá nhân</span><ChevronRight size={17} /></NavLink>
          </nav>
        </div>
      </header>

      {searchOpen ? (
        <div className="search-popover" id="global-search" role="search">
          <Search size={19} />
          <input autoFocus aria-label="Tìm kiếm trong HELIX" placeholder="Tìm lớp học, học sinh, bài tập…" />
          <button onClick={() => setSearchOpen(false)}>Đóng</button>
        </div>
      ) : null}

      <div className="app-main">
        <main className="page-content">{children}</main>
      </div>

      {role === 'student' ? (
        <nav className="bottom-nav" aria-label="Điều hướng học sinh">
          {nav.slice(0, 4).map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} end={to === '/student'} className={({ isActive }) => isActive ? 'is-active' : ''}>
              <Icon size={20} /><span>{label}</span>
            </NavLink>
          ))}
        </nav>
      ) : null}
    </div>
  );
}
