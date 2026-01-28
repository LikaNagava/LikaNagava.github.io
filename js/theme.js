document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const body = document.body;

  if (!themeToggle || !themeIcon) return;

  const prefix = location.pathname.includes('/pages/') ? '../' : './';
  const mediaPath = (file) => prefix + 'media/' + file;

  const moonFull = mediaPath('новолуние.png');
  const moonNew  = mediaPath('полнолуние.png');

  if (localStorage.getItem('theme') === 'light') enableLightMode();
  else enableDarkMode();

  themeToggle.addEventListener('click', () => {
    if (body.classList.contains('light-theme')) enableDarkMode();
    else enableLightMode();
  });

  function enableLightMode() {
    body.classList.add('light-theme');
    themeIcon.src = moonFull;
    themeIcon.alt = "Новолуние (Светлая тема)";
    localStorage.setItem('theme', 'light');
  }

  function enableDarkMode() {
    body.classList.remove('light-theme');
    themeIcon.src = moonNew;
    themeIcon.alt = "Полнолуние (Темная тема)";
    localStorage.setItem('theme', 'dark');
  }
});