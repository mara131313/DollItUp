    const switchToggle = document.getElementById('theme-switch');
    const icon = document.getElementById('theme-icon');

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        if (theme === 'dark') {
            icon.classList.replace('fa-sun', 'fa-moon');
        } else {
            icon.classList.replace('fa-moon', 'fa-sun');
        }

        switchToggle.checked = theme === 'dark';
    }

    window.addEventListener('DOMContentLoaded', () => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        applyTheme(savedTheme);

        switchToggle.addEventListener('change', () => {
            const newTheme = switchToggle.checked ? 'dark' : 'light';
            applyTheme(newTheme);
        });
    });