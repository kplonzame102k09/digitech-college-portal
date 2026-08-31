(function () {
  const body = document.body;
  const role = body.dataset.role;
  if (!role) return;
  const feature = body.dataset.feature || "";
  const title = document.querySelector("header h1")?.textContent || "Portal";
  const roleLabel = { admin: "Admin Portal", teacher: "Teacher Portal", student: "Student Portal", parent: "Parent Portal" }[role] || "College Portal";
  const links = {
    admin: [["dashboard", "Dashboard"], ["users", "Users"], ["enrollment", "Enrollment"], ["documents", "Documents"], ["grades", "Grades"], ["competencies", "Competencies"], ["attendance", "Attendance"], ["requirements", "Requirements"], ["announcements", "Announcements"], ["parent-links", "Parent links"], ["settings", "Settings"]],
    teacher: [["dashboard", "Dashboard"], ["students", "Students"], ["grades", "Grades"], ["competencies", "Competencies"], ["attendance", "Attendance"], ["announcements", "Announcements"], ["profile", "Profile"]],
    student: [["dashboard", "Dashboard"], ["enrollment", "Enrollment"], ["requirements", "Requirements"], ["documents", "Documents"], ["grades", "Grades"], ["competencies", "Competencies"], ["attendance", "Attendance"], ["announcements", "Announcements"], ["profile", "Profile"]],
  }[role] || [];
  const base = document.createElement("aside");
  base.className = "feature-sidebar";
  base.innerHTML = `<div class="feature-brand"><img src="../assets/images/16432.png" alt="Digitech College logo"><div><b>DIGITECH</b><small>COLLEGE PORTAL</small></div></div><nav aria-label="Portal navigation">${links.map(([slug, label]) => `<a href="${slug}.html" class="${feature === slug ? "is-active" : ""}">${label}</a>`).join("")}</nav><button class="feature-logout" type="button">Log out</button>`;
  base.querySelector(".feature-logout").onclick = () => AUTH.logout();
  document.body.prepend(base);
  body.classList.add("feature-page");
  document.querySelector("header")?.classList.add("feature-topbar");
  document.querySelector("main")?.classList.add("feature-main");
  const topbar = document.querySelector("header");
  topbar?.querySelector("a")?.classList.add("feature-dashboard-link");
  const topbarActions = topbar?.querySelector(".flex.gap-2");
  topbarActions?.remove();
  APP.applyTheme();
})();
