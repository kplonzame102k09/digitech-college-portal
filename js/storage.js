const STORAGE_KEYS = [
  "users",
  "currentUser",
  "enrollments",
  "documentRequests",
  "grades",
  "competencies",
  "notifications",
  "requirements",
  "settings",
];
function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
  return data;
}
function getData(key, fallback = []) {
  try {
    const v = JSON.parse(localStorage.getItem(key));
    return v ?? fallback;
  } catch {
    return fallback;
  }
}
function removeData(key) {
  localStorage.removeItem(key);
}
function clearData(key) {
  saveData(key, []);
}
function generateId(prefix = "REC") {
  const year = new Date().getFullYear();
  return `${prefix}-${year}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}
function userIdExists(id) {
  return getData("users", []).some((u) => u.id === id);
}
function generateUserId(role) {
  const prefixes = { student: "STU", teacher: "TCH", admin: "ADM" };
  let id;
  do {
    id = `${prefixes[role]}-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  } while (userIdExists(id));
  return id;
}
function getCurrentUser() {
  return getData("currentUser", null);
}
function setCurrentUser(user) {
  saveData("currentUser", user);
}
function logoutUser() {
  removeData("currentUser");
  location.href = "../login.html";
}
window.DG = {
  saveData,
  getData,
  removeData,
  clearData,
  generateId,
  generateUserId,
  userIdExists,
  getCurrentUser,
  setCurrentUser,
  logoutUser,
  STORAGE_KEYS,
};
