async function loadSidebar() {

    const container = document.getElementById("global-sidebar");

    if (!container) {
        console.error("Sidebar container not found.");
        return;
    }

    try {

        const response = await fetch("components/sidebar.html");

        if (!response.ok) {
            throw new Error(
                `Sidebar failed to load: ${response.status}`
            );
        }

        const sidebarHTML = await response.text();

        container.innerHTML = sidebarHTML;

        setActiveNavigation();

        // Re-create Lucide icons
        if (typeof lucide !== "undefined") {
            lucide.createIcons();
        }

    } catch (error) {

        console.error(error);

    }
}


function setActiveNavigation() {

    const currentPage =
        window.location.pathname.split("/").pop();

    const links =
        document.querySelectorAll("#side nav a");

    links.forEach(link => {

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


document.addEventListener(
    "DOMContentLoaded",
    loadSidebar
);