const themeSelect = document.getElementById('theme-select');
const icon = document.getElementById('theme-icon');

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    if (theme === 'dark') {
        icon.className = 'fas fa-moon';
    } else if (theme === 'pastel') {
        icon.className = 'fas fa-heart';
    } else {
        icon.className = 'fas fa-sun';
    }

    themeSelect.value = theme;
}

window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    themeSelect.addEventListener('change', () => {
        const newTheme = themeSelect.value;
        applyTheme(newTheme);
    });
});
