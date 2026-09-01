async function loadSidebar() {
    const container = document.getElementById("global-sidebar");
    if (!container) return;

    try {
        const response = await fetch("components/sidebar.html");
        if (!response.ok) throw new Error("Failed to load sidebar");

        container.innerHTML = await response.text();

        if (window.lucide) lucide.createIcons();

        setActiveNavigation();
        setupLogout();
        setupMobileSidebar();
    } catch (error) {
        console.error("Sidebar loading error:", error);
    }
}

function setActiveNavigation() {
    const currentPage = window.location.pathname.split("/").pop().toLowerCase();

    document.querySelectorAll("#side nav a").forEach(link => {
        const href = link.getAttribute("href");
        if (!href) return;

        const linkPage = href.split("/").pop().toLowerCase();
        link.classList.toggle("nav-active", linkPage === currentPage);
    });
}

function setupLogout() {
    const logoutButton = document.querySelector("[data-logout]");
    if (!logoutButton) return;

    logoutButton.addEventListener("click", () => {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("loggedInUser");
        window.location.href = "../login.html";
    });
}

function setupMobileSidebar() {
    const sidebar = document.getElementById("side");
    if (!sidebar) return;

    document.addEventListener("click", event => {
        const menuButton = event.target.closest("#open");
        if (!menuButton) return;

        sidebar.classList.toggle("-translate-x-full");
    });

    sidebar.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", () => {
            if (window.innerWidth < 1024)
                sidebar.classList.add("-translate-x-full");
        });
    });
}

document.addEventListener("DOMContentLoaded", loadSidebar);