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

function initCategoryNav() {
  const goTo = key => {
    document.querySelectorAll('.category-tab').forEach(t => {
      t.classList.toggle('active', t.dataset.tab === key);
    });

    document.querySelector(`.category[data-tab="${key}"]`) ?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
  };

  document.querySelectorAll('.header-tab, .category-tab').forEach(tab => {
    tab.addEventListener('click', () => goTo(tab.dataset.tab));
  });
}

initTabs();
initCategoryNav();