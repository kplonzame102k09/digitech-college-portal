(function () {
  const esc = (value) => APP.esc(value ?? "");
  const date = (value) => APP.formatDate(value);
  const badge = (value) => APP.statusBadge(value || "Not Started");

  function currentParent() {
    return AUTH.requireRole("parent");
  }

  function allStudents() {
    return DG.getData("users", []).filter((user) => user.role === "student");
  }

  function linkedChildren(parent = currentParent()) {
    if (!parent) return [];

    const ids = [
      parent.childId,
      ...(Array.isArray(parent.childIds) ? parent.childIds : []),
      ...(Array.isArray(parent.children) ? parent.children : []),
    ]
      .filter(Boolean)
      .map((value) => (typeof value === "object" ? value.id || value.studentId : value));

    const students = allStudents();
    const byId = students.filter((student) => ids.includes(student.id));
    if (byId.length) return byId;

    const parentName = `${parent.firstName || ""} ${parent.lastName || ""}`.trim().toLowerCase();
    if (parentName) {
      const byGuardian = students.filter(
        (student) => (student.guardianName || "").trim().toLowerCase() === parentName,
      );
      if (byGuardian.length) return byGuardian;
    }

    return [];
  }

  function recordsForChildren(key, children = linkedChildren()) {
    const ids = new Set(children.map((child) => child.id));
    return DG.getData(key, []).filter((record) => ids.has(record.studentId || record.childId));
  }

  function averageGrade(studentId) {
    const grades = DG.getData("grades", []).filter(
      (grade) => grade.studentId === studentId && grade.grade !== null && grade.grade !== "" && !Number.isNaN(Number(grade.grade)),
    );
    if (!grades.length) return null;
    return grades.reduce((sum, grade) => sum + Number(grade.grade), 0) / grades.length;
  }

  function studentLabel(student) {
    return `${student.firstName || ""} ${student.lastName || ""}`.trim() || student.id;
  }

  function enrollmentFor(studentId) {
    return DG.getData("enrollments", []).find((record) => record.studentId === studentId);
  }

  function emptyState(icon, title, message) {
    return `<div class="rounded-2xl border border-dashed border-slate-300 px-6 py-12 text-center dark:border-slate-700">
      <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300"><i data-lucide="${icon}" class="h-6 w-6"></i></div>
      <h3 class="mt-4 font-semibold">${esc(title)}</h3>
      <p class="mx-auto mt-1 max-w-md text-sm text-slate-500 dark:text-slate-400">${esc(message)}</p>
    </div>`;
  }

  function statCard(icon, color, label, value, detail) {
    return `<div class="card p-5">
      <div class="flex items-start justify-between gap-4"><span class="flex h-10 w-10 items-center justify-center rounded-xl ${color}"><i data-lucide="${icon}" class="h-5 w-5"></i></span><span class="text-xs text-slate-400">Parent view</span></div>
      <p class="mt-4 text-sm text-slate-500 dark:text-slate-400">${esc(label)}</p>
      <p class="mt-1 text-2xl font-bold">${esc(value)}</p>
      ${detail ? `<p class="mt-1 text-xs text-slate-400">${esc(detail)}</p>` : ""}
    </div>`;
  }

  function childCard(student) {
    const enrollment = enrollmentFor(student.id);
    const average = averageGrade(student.id);
    return `<article class="card p-5">
      <div class="flex items-start justify-between gap-4">
        <div class="flex items-center gap-3">
          <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-100 text-sm font-bold text-green-700 dark:bg-green-950 dark:text-green-300">${esc(APP.initials(student))}</div>
          <div><h3 class="font-bold">${esc(studentLabel(student))}</h3><p class="text-xs text-slate-400">${esc(student.id)}</p></div>
        </div>
        ${badge(enrollment?.status || "Not Started")}
      </div>
      <div class="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div class="rounded-xl bg-slate-50 p-3 dark:bg-slate-800"><p class="text-xs text-slate-400">Program / strand</p><p class="mt-1 font-semibold">${esc(student.strand || enrollment?.strand || "Not specified")}</p></div>
        <div class="rounded-xl bg-slate-50 p-3 dark:bg-slate-800"><p class="text-xs text-slate-400">Current average</p><p class="mt-1 font-semibold">${average === null ? "No grades yet" : average.toFixed(2)}</p></div>
      </div>
      <div class="mt-5 flex flex-wrap gap-2">
        <a href="grades.html?student=${encodeURIComponent(student.id)}" class="rounded-xl bg-green-600 px-3 py-2 text-xs font-semibold text-white hover:bg-green-700">View grades</a>
        <a href="attendance.html?student=${encodeURIComponent(student.id)}" class="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">Attendance</a>
      </div>
    </article>`;
  }

  function shell({ title, active, content }) {
    const parent = currentParent();
    if (!parent) return;
    const links = [
      ["dashboard.html", "layout-dashboard", "Dashboard"],
      ["children.html", "users-round", "My Children"],
      ["attendance.html", "calendar-check", "Attendance"],
      ["grades.html", "chart-no-axes-combined", "Grades"],
      ["documents.html", "file-text", "Documents"],
      ["announcements.html", "megaphone", "Announcements"],
      ["profile.html", "user-round", "Profile"],
    ];

    document.getElementById("app").innerHTML = `
      <aside id="sidebar" class="sidebar fixed inset-y-0 left-0 z-40 w-64 -translate-x-full border-r border-slate-200 bg-white lg:translate-x-0 dark:border-slate-800 dark:bg-slate-900">
        <div class="flex h-full flex-col">
          <div class="flex h-20 items-center gap-3 border-b border-slate-200 px-5 dark:border-slate-800">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 shadow"><i data-lucide="graduation-cap" class="h-5 w-5 text-white"></i></div>
            <div><div class="font-extrabold tracking-tight">DIGITECH</div><div class="text-[10px] font-semibold tracking-[.22em] text-slate-400">COLLEGE PORTAL</div></div>
          </div>
          <nav class="flex-1 space-y-1 overflow-y-auto p-3">
            ${links.map(([href, icon, label]) => `<a href="${href}" class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium ${active === label ? "nav-active" : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"}"><i data-lucide="${icon}" class="h-4 w-4"></i>${label}</a>`).join("")}
            <button onclick="APP.showNotifications()" class="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"><i data-lucide="bell" class="h-4 w-4"></i>Notifications<span id="notifCount" class="ml-auto rounded-full bg-red-500 px-2 py-0.5 text-[10px] text-white">0</span></button>
          </nav>
          <div class="border-t border-slate-200 p-3 dark:border-slate-800"><button onclick="AUTH.logout()" class="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"><i data-lucide="log-out" class="h-4 w-4"></i>Log out</button></div>
        </div>
      </aside>
      <div class="lg:pl-64">
        <header class="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
          <div class="flex h-16 items-center justify-between px-4 sm:px-6">
            <div class="flex items-center gap-3"><button id="menuBtn" class="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"><i data-lucide="menu" class="h-5 w-5"></i></button><div><p class="text-xs text-slate-400">Parent Portal</p><h1 class="font-bold">${esc(title)}</h1></div></div>
            <div class="flex items-center gap-2"><button onclick="APP.toggleTheme()" class="rounded-xl border border-slate-200 p-2.5 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"><i data-theme-icon data-lucide="moon" class="h-4 w-4"></i></button><button onclick="APP.showNotifications()" class="relative rounded-xl border border-slate-200 p-2.5 hover:bg-slate-50 dark:border-slate-700"><i data-lucide="bell" class="h-4 w-4"></i><span id="topNotif" class="absolute -right-1 -top-1 hidden h-4 min-w-4 rounded-full bg-red-500 px-1 text-[9px] font-bold text-white"></span></button><div class="ml-1 flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700 dark:bg-green-950 dark:text-green-300">${esc(APP.initials(parent))}</div><div class="hidden sm:block"><div class="text-sm font-semibold">${esc(parent.firstName)} ${esc(parent.lastName)}</div><div class="text-[11px] text-slate-400">${esc(parent.id)}</div></div></div>
          </div>
        </header>
        <main class="p-4 sm:p-6 lg:p-8"><div class="mx-auto max-w-7xl">${content}</div></main>
      </div>
      <div id="modalRoot"></div>`;

    APP.applyTheme();
    document.getElementById("menuBtn")?.addEventListener("click", () => document.getElementById("sidebar").classList.toggle("-translate-x-full"));
    APP.updateNotif();
    lucide.createIcons();
  }

  function mount(config) {
    const parent = currentParent();
    if (!parent) return;
    shell({ ...config, content: config.content(parent, linkedChildren(parent)) });
  }

  function dashboardContent(parent, children) {
    const notices = DG.getData("notifications", []).filter((item) => item.userId === parent.id).sort((a, b) => new Date(b.date) - new Date(a.date));
    const documents = recordsForChildren("documentRequests", children);
    const unread = notices.filter((item) => !item.read).length;
    const grades = recordsForChildren("grades", children).filter((item) => item.grade !== null && item.grade !== "");
    const average = grades.length ? (grades.reduce((sum, item) => sum + Number(item.grade), 0) / grades.length).toFixed(2) : "—";
    const enrollmentCount = children.filter((child) => ["Submitted", "Under Review", "Approved", "Enrolled"].includes(enrollmentFor(child.id)?.status)).length;
    return `<section class="mb-7"><p class="text-sm font-semibold text-green-600">Family overview</p><h2 class="mt-1 text-3xl font-bold tracking-tight">Welcome, ${esc(parent.firstName || "Parent")}</h2><p class="mt-2 max-w-2xl text-slate-500 dark:text-slate-400">Stay up to date with your children’s enrollment, grades, attendance, and college announcements.</p></section>
      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">${statCard("users-round", "bg-green-50 text-green-600 dark:bg-green-950", "Linked children", children.length, children.length ? "Student records connected" : "Link a student account to begin")} ${statCard("clipboard-check", "bg-blue-50 text-blue-600 dark:bg-blue-950", "Active enrollments", enrollmentCount, "Submitted or enrolled records")} ${statCard("chart-no-axes-combined", "bg-purple-50 text-purple-600 dark:bg-purple-950", "Grade average", average, grades.length ? `${grades.length} graded subject${grades.length === 1 ? "" : "s"}` : "No published grades yet")} ${statCard("bell", "bg-amber-50 text-amber-600 dark:bg-amber-950", "Unread updates", unread, unread ? "Needs your attention" : "You are all caught up")}</div>
      <div class="mt-6 grid gap-6 lg:grid-cols-3"><section class="card p-6 lg:col-span-2"><div class="flex items-center justify-between gap-4"><div><h3 class="font-bold">Children overview</h3><p class="mt-1 text-xs text-slate-400">A quick view of each connected student account.</p></div><a href="children.html" class="text-sm font-semibold text-green-700">View all</a></div><div class="mt-5 grid gap-4 md:grid-cols-2">${children.length ? children.map(childCard).join("") : emptyState("user-plus", "No children linked", "Your parent account does not have a connected student ID yet. Ask the registrar to link a student account.")}</div></section><section class="card p-6"><div class="flex items-center justify-between gap-4"><div><h3 class="font-bold">Recent updates</h3><p class="mt-1 text-xs text-slate-400">Notifications sent to your account.</p></div><button onclick="APP.showNotifications()" class="text-sm font-semibold text-green-700">Open</button></div><div class="mt-5 space-y-3">${notices.slice(0, 4).length ? notices.slice(0, 4).map((item) => `<div class="rounded-xl bg-slate-50 p-3 dark:bg-slate-800"><div class="flex items-start justify-between gap-3"><b class="text-sm">${esc(item.title || "Portal update")}</b><span class="text-[11px] text-slate-400">${date(item.date)}</span></div><p class="mt-1 text-xs text-slate-500 dark:text-slate-400">${esc(item.message || "No additional details.")}</p></div>`).join("") : `<p class="text-sm text-slate-500">No recent notifications.</p>`}</div></section></div>
      <section class="mt-6"><div class="mb-4"><h3 class="font-bold">Quick actions</h3><p class="mt-1 text-xs text-slate-400">Jump directly to the information you need.</p></div><div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><a href="attendance.html" class="card flex items-center gap-3 p-4 transition hover:-translate-y-0.5 hover:shadow-md"><span class="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950"><i data-lucide="calendar-check" class="h-5 w-5"></i></span><span><b class="text-sm">Attendance</b><span class="block text-xs text-slate-400">Review attendance records</span></span></a><a href="grades.html" class="card flex items-center gap-3 p-4 transition hover:-translate-y-0.5 hover:shadow-md"><span class="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950"><i data-lucide="chart-no-axes-combined" class="h-5 w-5"></i></span><span><b class="text-sm">Grades</b><span class="block text-xs text-slate-400">Check academic progress</span></span></a><a href="documents.html" class="card flex items-center gap-3 p-4 transition hover:-translate-y-0.5 hover:shadow-md"><span class="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950"><i data-lucide="file-text" class="h-5 w-5"></i></span><span><b class="text-sm">Documents</b><span class="block text-xs text-slate-400">Track document requests</span></span></a><a href="announcements.html" class="card flex items-center gap-3 p-4 transition hover:-translate-y-0.5 hover:shadow-md"><span class="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600 dark:bg-green-950"><i data-lucide="megaphone" class="h-5 w-5"></i></span><span><b class="text-sm">Announcements</b><span class="block text-xs text-slate-400">Read college notices</span></span></a></div></section>`;
  }

  function childrenContent(parent, children) {
    return `<section class="mb-7"><p class="text-sm font-semibold text-green-600">Family records</p><h2 class="mt-1 text-3xl font-bold tracking-tight">My Children</h2><p class="mt-2 text-slate-500 dark:text-slate-400">View the student accounts connected to your parent profile.</p></section><section class="grid gap-5 md:grid-cols-2">${children.length ? children.map(childCard).join("") : emptyState("user-plus", "No children linked", "No student account is currently linked to this parent profile. Contact the registrar to add or correct the Child / Student ID.")}</section><section class="card mt-6 p-5"><div class="flex items-start gap-3"><i data-lucide="info" class="mt-0.5 h-5 w-5 text-blue-600"></i><div><h3 class="font-semibold">Need to update a child link?</h3><p class="mt-1 text-sm text-slate-500 dark:text-slate-400">For privacy and record-integrity reasons, child links are maintained by the registrar. Please provide your parent ID (${esc(parent.id)}) and the student ID that should be connected.</p></div></div></section>`;
  }

  function attendanceContent(parent, children) {
    const selected = new URLSearchParams(location.search).get("student");
    const visibleChildren = selected ? children.filter((child) => child.id === selected) : children;
    const attendance = recordsForChildren("attendance", visibleChildren).sort((a, b) => new Date(b.date) - new Date(a.date));
    const present = attendance.filter((item) => String(item.status).toLowerCase() === "present").length;
    const late = attendance.filter((item) => String(item.status).toLowerCase() === "late").length;
    const absent = attendance.filter((item) => String(item.status).toLowerCase() === "absent").length;
    const filters = `<div class="mb-6 flex flex-wrap items-center gap-2"><a href="attendance.html" class="rounded-full px-3 py-1.5 text-xs font-semibold ${!selected ? "bg-green-600 text-white" : "border border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300"}">All children</a>${children.map((child) => `<a href="attendance.html?student=${encodeURIComponent(child.id)}" class="rounded-full px-3 py-1.5 text-xs font-semibold ${selected === child.id ? "bg-green-600 text-white" : "border border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300"}">${esc(studentLabel(child))}</a>`).join("")}</div>`;
    return `<section class="mb-7"><p class="text-sm font-semibold text-blue-600">Student wellbeing</p><h2 class="mt-1 text-3xl font-bold tracking-tight">Attendance</h2><p class="mt-2 text-slate-500 dark:text-slate-400">Monitor attendance records for your connected children.</p></section>${filters}<div class="grid gap-4 sm:grid-cols-3">${statCard("circle-check", "bg-green-50 text-green-600 dark:bg-green-950", "Present", present, "Recorded attendance")} ${statCard("clock-3", "bg-amber-50 text-amber-600 dark:bg-amber-950", "Late", late, "Recorded attendance")} ${statCard("circle-x", "bg-red-50 text-red-600 dark:bg-red-950", "Absent", absent, "Recorded attendance")}</div><section class="card mt-6 overflow-hidden"><div class="border-b border-slate-200 p-5 dark:border-slate-800"><h3 class="font-bold">Attendance history</h3><p class="mt-1 text-xs text-slate-400">Only attendance records shared by the college are shown here.</p></div>${attendance.length ? `<div class="overflow-x-auto"><table class="w-full text-left text-sm"><thead class="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-slate-800 dark:text-slate-400"><tr><th class="p-4">Date</th><th class="p-4">Student</th><th class="p-4">Subject / session</th><th class="p-4">Status</th><th class="p-4">Remarks</th></tr></thead><tbody>${attendance.map((item) => { const student = children.find((child) => child.id === item.studentId); const status = item.status || "Not recorded"; const statusClass = String(status).toLowerCase() === "present" ? "bg-emerald-50 text-emerald-700" : String(status).toLowerCase() === "absent" ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-700"; return `<tr class="border-t border-slate-200 dark:border-slate-800"><td class="p-4 whitespace-nowrap">${date(item.date)}</td><td class="p-4 font-semibold">${esc(student ? studentLabel(student) : item.studentId)}</td><td class="p-4">${esc(item.subject || item.session || "—")}</td><td class="p-4"><span class="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass}">${esc(status)}</span></td><td class="p-4 text-slate-500 dark:text-slate-400">${esc(item.remarks || item.note || "—")}</td></tr>`; }).join("")}</tbody></table></div>` : emptyState("calendar-off", "No attendance records yet", children.length ? "Attendance records will appear here when they are shared by the school." : "Link a student account to view attendance records.")}</section>`;
  }

  function gradesContent(parent, children) {
    const selected = new URLSearchParams(location.search).get("student");
    const visibleChildren = selected ? children.filter((child) => child.id === selected) : children;
    const groups = visibleChildren.map((student) => ({ student, grades: DG.getData("grades", []).filter((grade) => grade.studentId === student.id) })).filter((group) => group.grades.length);
    return `<section class="mb-7"><p class="text-sm font-semibold text-purple-600">Academic progress</p><h2 class="mt-1 text-3xl font-bold tracking-tight">Grades</h2><p class="mt-2 text-slate-500 dark:text-slate-400">Review published subject grades for each connected student.</p></section><div class="mb-6 flex flex-wrap items-center gap-2"><a href="grades.html" class="rounded-full px-3 py-1.5 text-xs font-semibold ${!selected ? "bg-green-600 text-white" : "border border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300"}">All children</a>${children.map((child) => `<a href="grades.html?student=${encodeURIComponent(child.id)}" class="rounded-full px-3 py-1.5 text-xs font-semibold ${selected === child.id ? "bg-green-600 text-white" : "border border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300"}">${esc(studentLabel(child))}</a>`).join("")}</div><div class="space-y-5">${groups.length ? groups.map(({ student, grades }) => { const published = grades.filter((grade) => grade.grade !== null && grade.grade !== ""); const avg = published.length ? (published.reduce((sum, grade) => sum + Number(grade.grade), 0) / published.length).toFixed(2) : "—"; return `<section class="card overflow-hidden"><div class="flex flex-col gap-3 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800"><div><h3 class="font-bold">${esc(studentLabel(student))}</h3><p class="mt-1 text-xs text-slate-400">${esc(student.id)}${student.strand ? ` · ${esc(student.strand)}` : ""}</p></div><div class="rounded-xl bg-purple-50 px-4 py-2 text-right dark:bg-purple-950"><p class="text-[11px] text-purple-600 dark:text-purple-300">Published average</p><p class="font-bold text-purple-700 dark:text-purple-200">${avg}</p></div></div><div class="overflow-x-auto"><table class="w-full text-left text-sm"><thead class="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-slate-800 dark:text-slate-400"><tr><th class="p-4">Subject</th><th class="p-4">Term / period</th><th class="p-4">Grade</th><th class="p-4">Remarks</th></tr></thead><tbody>${grades.map((grade) => `<tr class="border-t border-slate-200 dark:border-slate-800"><td class="p-4 font-semibold">${esc(grade.subject || grade.course || "—")}</td><td class="p-4">${esc(grade.term || grade.period || "Current term")}</td><td class="p-4 font-bold">${grade.grade === null || grade.grade === "" ? "Not released" : esc(Number(grade.grade).toFixed(2))}</td><td class="p-4">${grade.remarks ? badge(grade.remarks) : "—"}</td></tr>`).join("")}</tbody></table></div></section>`; }).join("") : emptyState("chart-no-axes-combined", "No grades available", children.length ? "Published grades for your connected children will appear here." : "Link a student account to view academic records.")}</div>`;
  }

  function documentsContent(parent, children) {
    const requests = recordsForChildren("documentRequests", children).sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date));
    const requirements = recordsForChildren("requirements", children);
    const rows = [...requests.map((item) => ({ ...item, source: "Document request", name: item.documentType || item.document || item.title || "Requested document", when: item.createdAt || item.date })), ...requirements.map((item) => ({ ...item, source: "Requirement", name: item.name || item.title || item.type || "Requirement", when: item.updatedAt || item.date }))];
    return `<section class="mb-7"><p class="text-sm font-semibold text-amber-600">Registrar services</p><h2 class="mt-1 text-3xl font-bold tracking-tight">Documents</h2><p class="mt-2 text-slate-500 dark:text-slate-400">Track document requests and outstanding requirements for your children.</p></section><section class="card overflow-hidden"><div class="border-b border-slate-200 p-5 dark:border-slate-800"><h3 class="font-bold">Document activity</h3><p class="mt-1 text-xs text-slate-400">Status updates are maintained by the registrar and admissions team.</p></div>${rows.length ? `<div class="overflow-x-auto"><table class="w-full text-left text-sm"><thead class="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-slate-800 dark:text-slate-400"><tr><th class="p-4">Item</th><th class="p-4">Student</th><th class="p-4">Type</th><th class="p-4">Status</th><th class="p-4">Date</th></tr></thead><tbody>${rows.map((item) => { const student = children.find((child) => child.id === item.studentId); return `<tr class="border-t border-slate-200 dark:border-slate-800"><td class="p-4 font-semibold">${esc(item.name)}</td><td class="p-4">${esc(student ? studentLabel(student) : item.studentId || "—")}</td><td class="p-4 text-slate-500 dark:text-slate-400">${esc(item.source)}</td><td class="p-4">${badge(item.status || "Pending")}</td><td class="p-4 whitespace-nowrap text-slate-500 dark:text-slate-400">${date(item.when)}</td></tr>`; }).join("")}</tbody></table></div>` : emptyState("file-clock", "No document activity", children.length ? "Document requests and requirements for your children will appear here." : "Link a student account to view document records.")}</section>`;
  }

  function announcementsContent(parent) {
    const announcements = DG.getData("announcements", []).sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt));
    const notifications = DG.getData("notifications", []).filter((item) => item.userId === parent.id).sort((a, b) => new Date(b.date) - new Date(a.date));
    const items = announcements.length ? announcements : notifications;
    return `<section class="mb-7"><p class="text-sm font-semibold text-green-600">College news</p><h2 class="mt-1 text-3xl font-bold tracking-tight">Announcements</h2><p class="mt-2 text-slate-500 dark:text-slate-400">Important updates and notices relevant to your family.</p></section><div class="space-y-4">${items.length ? items.map((item) => `<article class="card p-5"><div class="flex items-start gap-4"><span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600 dark:bg-green-950"><i data-lucide="${announcements.length ? "megaphone" : "bell"}" class="h-5 w-5"></i></span><div class="min-w-0 flex-1"><div class="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between"><h3 class="font-bold">${esc(item.title || "College announcement")}</h3><time class="text-xs text-slate-400">${date(item.date || item.createdAt)}</time></div><p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">${esc(item.message || item.body || item.content || "No additional details.")}</p>${item.category ? `<span class="mt-3 inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">${esc(item.category)}</span>` : ""}</div></div></article>`).join("") : emptyState("megaphone-off", "No announcements yet", "New college announcements will appear here when they are published.")}</div>`;
  }

  function profileContent(parent) {
    return `<section class="mb-7"><p class="text-sm font-semibold text-green-600">Account settings</p><h2 class="mt-1 text-3xl font-bold tracking-tight">My Profile</h2><p class="mt-2 text-slate-500 dark:text-slate-400">Keep your parent contact details current for school communications.</p></section><section class="card p-6"><div class="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center dark:border-slate-800"><div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-xl font-bold text-green-700 dark:bg-green-950 dark:text-green-300">${esc(APP.initials(parent))}</div><div><h3 class="text-xl font-bold">${esc(parent.firstName)} ${esc(parent.lastName)}</h3><p class="mt-1 font-mono text-sm text-green-700 dark:text-green-300">${esc(parent.id)}</p><p class="mt-1 text-sm text-slate-500">Parent / ${esc(parent.relationship || "Guardian")}</p></div></div><form id="profileForm" class="mt-6 grid gap-4 md:grid-cols-2"><label class="text-sm font-medium">Email address<input value="${esc(parent.email)}" readonly class="input mt-1.5 w-full rounded-xl border bg-slate-50 px-3 py-2.5 dark:bg-slate-800"></label><label class="text-sm font-medium">Contact number<input id="contact" value="${esc(parent.contact)}" class="input mt-1.5 w-full rounded-xl border px-3 py-2.5"></label><label class="text-sm font-medium">Occupation<input id="occupation" value="${esc(parent.occupation)}" class="input mt-1.5 w-full rounded-xl border px-3 py-2.5"></label><label class="text-sm font-medium">Emergency contact<input id="emergencyContact" value="${esc(parent.emergencyContact)}" class="input mt-1.5 w-full rounded-xl border px-3 py-2.5"></label><label class="text-sm font-medium md:col-span-2">Address<textarea id="address" rows="3" class="input mt-1.5 w-full rounded-xl border px-3 py-2.5">${esc(parent.address)}</textarea></label></form><div class="mt-5 flex flex-wrap items-center gap-3"><button onclick="PARENT.saveProfile(event)" class="rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-700">Save changes</button><span class="text-xs text-slate-400">Your parent ID and linked child records are managed by the registrar.</span></div></section>`;
  }

  function saveProfile(event) {
    event?.preventDefault();
    const parent = currentParent();
    if (!parent) return;
    const users = DG.getData("users", []);
    const record = users.find((user) => user.id === parent.id);
    if (!record) return;
    record.contact = document.getElementById("contact")?.value.trim() || "";
    record.occupation = document.getElementById("occupation")?.value.trim() || "";
    record.emergencyContact = document.getElementById("emergencyContact")?.value.trim() || "";
    record.address = document.getElementById("address")?.value.trim() || "";
    DG.saveData("users", users);
    DG.setCurrentUser(record);
    APP.toast("Profile updated");
  }

  window.PARENT = {
    mount,
    dashboardContent,
    childrenContent,
    attendanceContent,
    gradesContent,
    documentsContent,
    announcementsContent,
    profileContent,
    saveProfile,
  };
})();
