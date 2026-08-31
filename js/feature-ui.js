(function () {
  const body = document.body;
  const role = body.dataset.role;
  if (!role) return;
  const feature = body.dataset.feature || "";
  const header = document.querySelector("header");
  const title = header?.querySelector("h1")?.textContent || "Portal";
  const description = header?.querySelector("p:last-child")?.textContent || "Keep your college records organized and up to date.";
  const roleLabel = { admin: "Admin workspace", teacher: "Teaching workspace", student: "Student services", parent: "Family records" }[role] || "College portal";
  const icons = { dashboard: "layout-dashboard", users: "users", enrollment: "clipboard-list", documents: "file-text", grades: "chart-no-axes-combined", competencies: "award", attendance: "calendar-check-2", requirements: "folder-check", announcements: "megaphone", "parent-links": "users-round", settings: "settings", students: "users", profile: "user-round" };
  const links = {
    admin: [["dashboard", "Dashboard"], ["users", "Users"], ["enrollment", "Enrollment"], ["documents", "Documents"], ["grades", "Grades"], ["competencies", "Competencies"], ["attendance", "Attendance"], ["requirements", "Requirements"], ["announcements", "Announcements"], ["parent-links", "Parent links"], ["settings", "Settings"]],
    teacher: [["dashboard", "Dashboard"], ["students", "Students"], ["grades", "Grades"], ["competencies", "Competencies"], ["attendance", "Attendance"], ["announcements", "Announcements"], ["profile", "Profile"]],
    student: [["dashboard", "Dashboard"], ["enrollment", "Enrollment"], ["requirements", "Requirements"], ["documents", "Documents"], ["grades", "Grades"], ["competencies", "Competencies"], ["attendance", "Attendance"], ["announcements", "Announcements"], ["profile", "Profile"]],
  }[role] || [];
  const aside = document.createElement("aside");
  aside.id = "side";
  aside.className = "feature-sidebar sidebar";
  aside.innerHTML = `<div class="feature-brand"><img src="../assets/images/16432.png" alt="Digitech College logo"><div><b>DIGITECH</b><small>COLLEGE PORTAL</small></div></div><nav aria-label="Portal navigation">${links.map(([slug, label]) => `<a href="${slug}.html" class="${feature === slug ? "is-active" : ""}"><i data-lucide="${icons[slug] || "circle"}" class="w-4"></i>${label}</a>`).join("")}<button type="button" class="feature-notifications"><i data-lucide="bell" class="w-4"></i>Notifications</button></nav><button class="feature-logout" type="button"><i data-lucide="log-out" class="w-4"></i>Log out</button>`;
  aside.querySelector(".feature-logout").onclick = () => AUTH.logout();
  aside.querySelector(".feature-notifications").onclick = () => APP.showNotifications();
  body.prepend(aside);
  body.classList.add("feature-page");
  header?.classList.add("feature-topbar");
  const main = document.querySelector("main");
  main?.classList.add("feature-main");
  if (main && !main.querySelector(".feature-page-hero")) {
    const hero = document.createElement("section");
    hero.className = "feature-page-hero mb-6 p-6 sm:p-8";
    hero.innerHTML = `<div class="relative z-10"><p class="text-xs font-bold uppercase tracking-[.2em] text-emerald-100">${APP.esc(roleLabel)}</p><h2 class="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">${APP.esc(title)}</h2><p class="mt-3 max-w-2xl text-sm leading-6 text-white/75">${APP.esc(description)}</p></div>`;
    main.prepend(hero);
  }
  header?.querySelector(".flex.gap-2")?.remove();
  APP.applyTheme();
  lucide.createIcons();
})();
