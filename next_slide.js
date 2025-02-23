// Function to load content dynamically
function loadPage(page) {
    const content = document.getElementById("content");

    // Page contents
    const pages = {
        biology: "<h2>Biology Lab</h2><p>Explore biology experiments and concepts here.</p>",
        chemistry: "<h2>Chemistry Lab</h2><p>Discover chemistry reactions and theory.</p>",
        physics: "<h2>Physics Lab</h2><p>Learn about physics concepts and experiments.</p>"
    };
}

// Load Home Page by default
window.onload = () => loadPage('home');
