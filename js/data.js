const DEMO = {
users: [{}],
enrollments: [{}],
requirements: [{}],
documentRequests: [{}],
grades: [{}],
competencies: [{}],
notifications: [{}],
};
function seedData() {
if (localStorage.getItem("digitech_seeded")) return;
  Object.entries(DEMO).forEach(([k, v]) => DG.saveData(k, v));
DG.saveData("settings", {
theme: "light",
teacherRegistration: true,
adminRegistration: false,
});
localStorage.setItem("digitech_seeded", "1");
}
seedData();
