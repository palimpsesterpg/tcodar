function initTabs() {
  document.querySelectorAll('.tabsystem').forEach(system => {
    const tabs = system.querySelectorAll('.tab');
    const contents = system.querySelectorAll('.tab-content');

    const activate = tab => {
      tabs.forEach(t => t.classList.toggle('active', t === tab));
      contents.forEach(content => {
        content.classList.toggle('active', content.dataset.tab === tab.dataset.tab);
      });
    };

    tabs.forEach(tab => tab.addEventListener('click', () => activate(tab)));

    const initial = system.querySelector('.tab.active') || tabs[0];
    if (initial) activate(initial);
  });
}

function initHeaderNav() {
  const categories = document.querySelector('#categories');
  if (!categories) return;

  document.querySelectorAll('.header-tab').forEach(headerTab => {
    headerTab.addEventListener('click', () => {
      const key = headerTab.id; // c3, c4, c5…

      // 1. active l'onglet + la catégorie via ton initTabs
      categories.querySelector(`.tab[data-tab="${key}"]`)?.click();

      // 2. défile jusqu'à la catégorie
      categories.querySelector(`.category[data-tab="${key}"]`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

initTabs();
initHeaderNav();