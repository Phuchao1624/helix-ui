export const users = [
  { id: 'HS-1024', name: 'Nguyen Minh Anh', email: 'minhanh@hope.edu.vn', role: 'Student', status: 'Active', lastLogin: '15/07/2026 · 08:10' },
  { id: 'HS-1025', name: 'Tran Gia Han', email: 'giahan@hope.edu.vn', role: 'Student', status: 'Active', lastLogin: '14/07/2026 · 20:31' },
  { id: 'MT-0082', name: 'Le Hoang Nam', email: 'nam.le@hope.edu.vn', role: 'Mentor', status: 'Active', lastLogin: '15/07/2026 · 07:42' },
  { id: 'CO-0014', name: 'Pham Thu Ha', email: 'ha.pham@hope.edu.vn', role: 'Coordinator', status: 'Active', lastLogin: '15/07/2026 · 07:58' },
  { id: 'HS-1031', name: 'Vo Ngoc Thao', email: 'ngocthao@hope.edu.vn', role: 'Student', status: 'Pending', lastLogin: 'Never logged in' },
  { id: 'MT-0090', name: 'Dang Quoc Bao', email: 'bao.dang@hope.edu.vn', role: 'Mentor', status: 'Inactive', lastLogin: '02/07/2026 · 16:22' },
];

export const programs = [
  { id: 'PRG-26-01', name: 'English Foundation 2026', term: 'Summer 2026', courses: 4, classes: 8, students: 186, status: 'Active', progress: 64 },
  { id: 'PRG-26-02', name: 'IELTS Pathway', term: 'Aug–Dec 2026', courses: 3, classes: 5, students: 102, status: 'Draft', progress: 28 },
  { id: 'PRG-25-04', name: 'Communication Club', term: 'Semester II 2025', courses: 2, classes: 4, students: 84, status: 'Completed', progress: 100 },
];

export const courses = [
  { code: 'ENG-A2', name: 'Everyday English A2', level: 'A2', classes: 3, students: 72, owner: 'Pham Thu Ha', status: 'Active' },
  { code: 'ENG-B1', name: 'Communication Skills B1', level: 'B1', classes: 2, students: 48, owner: 'Pham Thu Ha', status: 'Active' },
  { code: 'IELTS-01', name: 'IELTS Starter', level: 'Pre-IELTS', classes: 2, students: 38, owner: 'Nguyen Ha My', status: 'Draft' },
];

export const classes = [
  { code: 'A2-01', name: 'Everyday English A2 · Class 01', mentor: 'Le Hoang Nam', schedule: 'Tue, Thu · 19:00', students: '24/25', next: '16/07 · 19:00', status: 'Active' },
  { code: 'A2-02', name: 'Everyday English A2 · Class 02', mentor: 'Nguyen Ha My', schedule: 'Mon, Sat · 18:30', students: '23/25', next: '17/07 · 18:30', status: 'Active' },
  { code: 'B1-01', name: 'Communication Skills B1', mentor: 'Dang Quoc Bao', schedule: 'Wed, Sat · 19:30', students: '24/25', next: '16/07 · 19:30', status: 'Needs mentor' },
];

export const enrollments = [
  { code: 'HS-1024', name: 'Nguyen Minh Anh', email: 'minhanh@hope.edu.vn', className: 'A2-01', enrolledAt: '03/06/2026', status: 'Active' },
  { code: 'HS-1025', name: 'Tran Gia Han', email: 'giahan@hope.edu.vn', className: 'A2-01', enrolledAt: '03/06/2026', status: 'Active' },
  { code: 'HS-1028', name: 'Phan Hai Dang', email: 'haidang@hope.edu.vn', className: 'A2-01', enrolledAt: '04/06/2026', status: 'Transferred' },
  { code: 'HS-1031', name: 'Vo Ngoc Thao', email: 'ngocthao@hope.edu.vn', className: 'A2-01', enrolledAt: '05/06/2026', status: 'Pending' },
];

export const sessions = [
  { id: 'SS-12', date: 'Thu, 16/07', time: '19:00–20:30', title: 'Unit 6 · Giving directions', type: 'Online', attendance: '—', status: 'Upcoming', meetingUrl: 'https://meet.google.com/hope-a201' },
  { id: 'SS-11', date: 'Tue, 14/07', time: '19:00–20:30', title: 'Unit 5 · Places in town', type: 'Online', attendance: '23/24', status: 'Completed', recordingUrl: 'https://drive.google.com/recording/ss-11' },
  { id: 'SS-10', date: 'Thu, 09/07', time: '19:00–20:30', title: 'Review & speaking practice', type: 'Offline', attendance: '24/24', status: 'Completed' },
];

export const assignments = [
  { id: 'AS-108', title: 'Voice note: My neighbourhood', course: 'Everyday English A2', due: '18/07 · 23:59', skill: 'Speaking', submitted: '18/24', status: 'Active', score: null, maxScore: 10, allowLate: true, allowResubmit: true },
  { id: 'AS-106', title: 'Unit 5 vocabulary worksheet', course: 'Everyday English A2', due: '13/07 · 23:59', skill: 'Vocabulary', submitted: '24/24', status: 'Grading', score: null, maxScore: 10, allowLate: false, allowResubmit: false },
  { id: 'AS-102', title: 'Write about your daily routine', course: 'Everyday English A2', due: '05/07 · 23:59', skill: 'Writing', submitted: '24/24', status: 'Returned', score: 8.5, maxScore: 10, allowLate: true, allowResubmit: true },
];

export const materials = [
  { id: 'MAT-01', name: 'Unit 6 — Student book.pdf', type: 'PDF', size: '4.8 MB', course: 'Everyday English A2', updated: '14/07/2026' },
  { id: 'MAT-02', name: 'Giving directions — Audio.mp3', type: 'Audio', size: '12.2 MB', course: 'Everyday English A2', updated: '14/07/2026' },
  { id: 'MAT-03', name: 'Speaking prompts.docx', type: 'Document', size: '860 KB', course: 'Communication Skills B1', updated: '12/07/2026' },
  { id: 'MAT-04', name: 'Classroom language flashcards.pdf', type: 'PDF', size: '2.1 MB', course: 'Shared library', updated: '08/07/2026' },
];

export const notifications = [
  { id: 1, title: 'New assignment published', body: 'Voice note: My neighbourhood · Due 18/07, 23:59', time: '8 minutes ago', unread: true, type: 'assignment' },
  { id: 2, title: 'Schedule updated', body: 'A2-01 session on 16/07 starts at 19:00.', time: '2 hours ago', unread: true, type: 'calendar' },
  { id: 3, title: 'Grade and feedback available', body: 'Write about your daily routine · 8.5/10', time: 'Yesterday', unread: false, type: 'grade' },
  { id: 4, title: 'New class material', body: 'Unit 6 — Student book.pdf', time: '14/07/2026', unread: false, type: 'material' },
];

export const attendanceRows = [
  { id: 'HS-1024', name: 'Nguyen Minh Anh', status: 'Present', note: '' },
  { id: 'HS-1025', name: 'Tran Gia Han', status: 'Present', note: '' },
  { id: 'HS-1026', name: 'Luong Tuan Kiet', status: 'Late', note: 'Joined at 19:12' },
  { id: 'HS-1027', name: 'Ngo Thanh Truc', status: 'Absent', note: '' },
  { id: 'HS-1029', name: 'Bui Duc Minh', status: 'Excused', note: 'Approved leave' },
];

export const submissions = [
  { id: 'SUB-01', student: 'Nguyen Minh Anh', submittedAt: '12/07 · 21:14', status: 'Submitted', score: '', file: 'minhanh_unit5.pdf' },
  { id: 'SUB-02', student: 'Tran Gia Han', submittedAt: '12/07 · 20:42', status: 'Submitted', score: '', file: 'giahan_unit5.pdf' },
  { id: 'SUB-03', student: 'Phan Hai Dang', submittedAt: '13/07 · 23:58', status: 'Late', score: '', file: 'haidang_unit5.pdf' },
  { id: 'SUB-04', student: 'Vo Ngoc Thao', submittedAt: '11/07 · 19:21', status: 'Returned', score: '8.0', file: 'ngocthao_unit5.pdf' },
];
