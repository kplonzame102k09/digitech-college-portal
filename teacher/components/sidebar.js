async function loadSidebar() {
    const container = document.getElementById("global-sidebar");
    if (!container) return;
    try {
        const response = await fetch("components/sidebar.html");
        if (!response.ok) {
            throw new Error("Failed to load sidebar");
        }
        container.innerHTML = await response.text();
        if (typeof lucide !== "undefined") {
            lucide.createIcons();
        }
        setActiveNavigation();
        setupLogout();
    } catch (error) {
        console.error("Sidebar loading error:", error);
    }
}
function setActiveNavigation() {
    const currentPage = window.location.pathname.split("/").pop();
    document.querySelectorAll("#side nav a").forEach(link => {
        const href = link.getAttribute("href");
        if (href === currentPage) {
            link.classList.add(
                "nav-active"
            );
        } else {
            link.classList.remove(
                "nav-active"
            );
        }
    });
}
function setupLogout() {
    const logoutButton =
        document.querySelector("[data-logout]");

    if (!logoutButton) {
        console.error("Logout button not found.");
        return;
    }
    logoutButton.addEventListener("click", function () {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("loggedInUser");
        window.location.href = "../index.html";
    });
}
document.addEventListener(
    "DOMContentLoaded",
    loadSidebar
);