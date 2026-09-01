const DEMO = {
  users: [
    {
      id: "ADM-2026-X9B7GV",
      firstName: "Kim Philip",
      middleName: "De Pasion",
      lastName: "Lonzame",
      email: "kpdplonzame@digitech.edu",
      contact: "09123456789",
      employeeId: "",
      department: "",
      password: "password",
      role: "admin",
      photo: ""
    }
  ],

  enrollments: [],
  requirements: [],
  documentRequests: [],
  grades: [],
  competencies: [],
  notifications: []
};

function seedData() {
  if (localStorage.getItem("digitech_seeded")) return;

  Object.entries(DEMO).forEach(([key, value]) => {
    DG.saveData(key, value);
  });

  DG.saveData("settings", {
    theme: "light",
    teacherRegistration: true,
    adminRegistration: false
  });

  localStorage.setItem("digitech_seeded", "1");
}

seedData();