function applyTheme() {
  const s = DG.getData("settings", {});
  document.documentElement.classList.toggle("dark", s.theme === "dark");
}
function toggleTheme() {
  const s = DG.getData("settings", {});
  s.theme = s.theme === "dark" ? "light" : "dark";
  DG.saveData("settings", s);
  applyTheme();
  document
    .querySelectorAll("[data-theme-icon]")
    .forEach((e) =>
      e.setAttribute("data-lucide", s.theme === "dark" ? "sun" : "moon"),
    );
  if (window.lucide) lucide.createIcons();
}
function esc(v = "") {
  return String(v).replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[c],
  );
}
function toast(message, type = "success") {
  const el = document.createElement("div");
  el.className =
    "toast fixed bottom-5 right-5 z-[100] max-w-sm rounded-xl px-4 py-3 text-sm font-medium shadow-xl " +
    (type === "error" ? "bg-red-600 text-white" : "bg-slate-900 text-white");
  el.textContent = message;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2800);
}
function initials(u) {
  return (
    `${u?.firstName?.[0] || ""}${u?.lastName?.[0] || ""}`.toUpperCase() || "DG"
  );
}
function roleLabel(r) {
  return r ? r[0].toUpperCase() + r.slice(1) : "";
}
function statusBadge(s) {
  const map = {
    Approved: "bg-emerald-50 text-emerald-700",
    Enrolled: "bg-emerald-50 text-emerald-700",
    Verified: "bg-emerald-50 text-emerald-700",
    Competent: "bg-emerald-50 text-emerald-700",
    Submitted: "bg-blue-50 text-blue-700",
    Processing: "bg-blue-50 text-blue-700",
    "Under Review": "bg-amber-50 text-amber-700",
    Pending: "bg-amber-50 text-amber-700",
    "In Progress": "bg-amber-50 text-amber-700",
    "Ready for Release": "bg-purple-50 text-purple-700",
    Released: "bg-purple-50 text-purple-700",
    Rejected: "bg-red-50 text-red-700",
    "Not Yet Competent": "bg-red-50 text-red-700",
    "Not Started": "bg-slate-100 text-slate-600",
    Draft: "bg-slate-100 text-slate-600",
  };
  return `<span class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${map[s] || "bg-slate-100 text-slate-600"}">${esc(s)}</span>`;
}
function formatDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-PH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
function dashboardPath(role) {
  return `../${AUTH.DASH[role]}`;
}
function portalShell({ role, title, subtitle, active, content }) {
  const u = DG.getCurrentUser();
  const base = "../";
  const links = {
    student: [
      ["dashboard.html", "layout-dashboard", "Dashboard"],
      ["enrollment.html", "clipboard-list", "Enrollment"],
      ["requirements.html", "folder-check", "Requirements"],
      ["documents.html", "file-text", "Documents"],
      ["grades.html", "chart-no-axes-combined", "Grades"],
      ["competencies.html", "award", "Competencies"],
      ["profile.html", "user-round", "Profile"],
    ],
    parent: [
      ["dashboard.html", "layout-dashboard", "Dashboard"],
      ["children.html", "users-round", "My Children"],
      ["attendance.html", "calendar-check", "Attendance"],
      ["grades.html", "chart-no-axes-combined", "Grades"],
      ["documents.html", "file-text", "Documents"],
      ["announcements.html", "megaphone", "Announcements"],
      ["profile.html", "user-round", "Profile"],
      ],    
    teacher: [
      ["dashboard.html", "layout-dashboard", "Dashboard"],
      ["students.html", "users", "Students"],
      ["grades.html", "chart-no-axes-combined", "Grades"],
      ["competencies.html", "award", "Competencies"],
      ["profile.html", "user-round", "Profile"],
    ],
    admin: [
      ["dashboard.html", "layout-dashboard", "Dashboard"],
      ["users.html", "users-round", "Users"],
      ["enrollment.html", "clipboard-list", "Enrollment"],
      ["documents.html", "file-text", "Documents"],
      ["grades.html", "chart-no-axes-combined", "Grades"],
      ["competencies.html", "award", "Competencies"],
      ["settings.html", "settings", "Settings"],
    ],
  };
  return `<!doctype html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>${esc(title)} | Digitech College</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>tailwind.config={darkMode:'class'}</script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <link rel="stylesheet" href="../css/custom.css">
  </head>
  <body class="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100">
    <aside id="sidebar" class="sidebar fixed inset-y-0 left-0 z-40 w-64 -translate-x-full lg:translate-x-0 border-r border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-800">
      <div class="flex h-full flex-col">
        <div class="flex h-20 items-center gap-3 border-b border-slate-200 px-5 dark:border-slate-800">
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 shadow">
            <i data-lucide="graduation-cap" class="h-5 w-5 text-white"></i>
          </div>
          <div>
            <div class="font-extrabold tracking-tight">DIGITECH</div>
            <div class="text-[10px] font-semibold tracking-[.22em] text-slate-400">COLLEGE PORTAL</div>
          </div>
        </div>
        <nav class="flex-1 space-y-1 overflow-y-auto p-3">
          ${(links[role] || []).map(([href, icon, label]) => 
          `<a href="${href}" class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium 
            ${active === label ? "nav-active" : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"}">
            <i data-lucide="${icon}" class="h-4 w-4"></i>${label}
          </a>`).join("")}
          <button onclick="showNotifications()" class="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm 
            font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
            <i data-lucide="bell" class="h-4 w-4"></i>
              Notifications
            <span id="notifCount" class="ml-auto rounded-full bg-red-500 px-2 py-0.5 text-[10px] text-white">0</span>
          </button>
        </nav>
        <div class="border-t border-slate-200 p-3 dark:border-slate-800">
          <button onclick="logout()" class="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50">
            <i data-lucide="log-out" class="h-4 w-4"></i>
            Log out
          </button>
        </div>
      </div>
    </aside>
    <div class="lg:pl-64">
      <header class="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
        <div class="flex h-16 items-center justify-between px-4 sm:px-6">
          <div class="flex items-center gap-3">
            <button id="menuBtn" class="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden">
              <i data-lucide="menu" class="h-5 w-5"></i>
            </button>
            <div>
              <p class="text-xs text-slate-400">${roleLabel(role)} Portal</p>
              <h1 class="font-bold">${esc(title)}</h1>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button onclick="toggleTheme()" class="rounded-xl border border-slate-200 p-2.5 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
              <i data-theme-icon data-lucide="moon" class="h-4 w-4"></i>
            </button>
            <button onclick="showNotifications()" class="relative rounded-xl border border-slate-200 p-2.5 hover:bg-slate-50 dark:border-slate-700">
              <i data-lucide="bell" class="h-4 w-4"></i>
              <span id="topNotif" class="absolute -right-1 -top-1 hidden h-4 min-w-4 rounded-full bg-red-500 px-1 text-[9px] font-bold text-white"></span>
            </button>
            <div class="ml-1 hidden h-9 w-9 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700 sm:flex">
              ${initials(u)}
            </div>
            <div class="hidden sm:block">
              <div class="text-sm font-semibold">
                ${esc(u.firstName)} ${esc(u.lastName)}
              </div>
              <div class="text-[11px] text-slate-400">
                ${esc(u.id)}
              </div>
            </div>
          </div>
        </div>
      </header>
      <main class="p-4 sm:p-6 lg:p-8">
        <div class="mx-auto max-w-7xl">${content}</div>
      </main>
    </div>
    <div id="modalRoot"></div>
    <script src="../js/storage.js">
    </script><script src="../js/data.js"></script>
    <script src="../js/auth.js"></script>
    <script src="../js/app.js"></script>
    <script>
      applyTheme();
      lucide.createIcons();
      document.getElementById('menuBtn')?.addEventListener(
        'click',()=>document.getElementById('sidebar').classList.toggle('-translate-x-full'));
      window.currentUser=DG.getCurrentUser();
      document.addEventListener('DOMContentLoaded',()=>updateNotif());
    </script>
  </body>
  </html>`;
}
function updateNotif() {
  const u = DG.getCurrentUser();
  if (!u) return;
  const n = DG.getData("notifications", []).filter(
    (x) => x.userId === u.id && !x.read,
  ).length;
  const a = document.getElementById("notifCount"),
    b = document.getElementById("topNotif");
  if (a) a.textContent = n;
  b?.classList.toggle("hidden", n === 0);
  if (b) b.textContent = n;
}
function showNotifications() {
  const u = DG.getCurrentUser();
  if (!u) return;
  const ns = DG.getData("notifications", [])
    .filter((n) => n.userId === u.id)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  const root = document.getElementById("modalRoot");
  if (!root) return;
  root.replaceChildren();

  const backdrop = document.createElement("div");
  backdrop.className = "modal-backdrop fixed inset-0 z-[90] flex items-center justify-center p-4";
  const modal = document.createElement("div");
  modal.className = "w-full max-w-lg rounded-2xl bg-white p-5 shadow-2xl dark:bg-slate-900";
  const header = document.createElement("div");
  header.className = "flex items-center justify-between";
  const heading = document.createElement("h3");
  heading.className = "text-lg font-bold";
  heading.textContent = "Notifications";
  const close = document.createElement("button");
  close.type = "button";
  close.className = "rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800";
  close.setAttribute("aria-label", "Close notifications");
  close.addEventListener("click", closeModal);
  const closeIcon = document.createElement("i");
  closeIcon.dataset.lucide = "x";
  closeIcon.className = "h-5 w-5";
  close.append(closeIcon);
  header.append(heading, close);

  const list = document.createElement("div");
  list.className = "mt-4 max-h-[55vh] space-y-2 overflow-auto";
  if (ns.length) {
    ns.forEach((notification) => {
      const item = document.createElement("div");
      item.className = `rounded-xl border p-3 ${notification.read ? "border-slate-200" : "border-green-200 bg-green-50/60"} dark:border-slate-700 dark:bg-slate-800`;
      const meta = document.createElement("div");
      meta.className = "flex justify-between gap-3";
      const title = document.createElement("p");
      title.className = "text-sm font-semibold";
      title.textContent = notification.title || "Portal update";
      const when = document.createElement("span");
      when.className = "text-[11px] text-slate-400";
      when.textContent = formatDate(notification.date);
      meta.append(title, when);
      const message = document.createElement("p");
      message.className = "mt-1 text-sm text-slate-500";
      message.textContent = notification.message || "No additional details.";
      item.append(meta, message);
      list.append(item);
    });
  } else {
    const empty = document.createElement("div");
    empty.className = "py-10 text-center text-sm text-slate-400";
    empty.textContent = "No notifications yet.";
    list.append(empty);
  }

  const markRead = document.createElement("button");
  markRead.type = "button";
  markRead.className = "mt-4 w-full rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700";
  markRead.textContent = "Mark all as read";
  markRead.addEventListener("click", markNotificationsRead);
  modal.append(header, list, markRead);
  backdrop.append(modal);
  root.append(backdrop);
  lucide.createIcons();
}
function markNotificationsRead() {
  const u = DG.getCurrentUser();
  const ns = DG.getData("notifications", []);
  ns.forEach((n) => {
    if (n.userId === u.id) n.read = true;
  });
  DG.saveData("notifications", ns);
  closeModal();
  updateNotif();
  toast("Notifications marked as read");
}
function closeModal() {
  document.getElementById("modalRoot")?.replaceChildren();
}
window.APP = {
  portalShell,
  applyTheme,
  toggleTheme,
  toast,
  esc,
  initials,
  statusBadge,
  formatDate,
  showNotifications,
  markNotificationsRead,
  closeModal,
  updateNotif,
  generateId: DG.generateId,
};
