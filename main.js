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

document.querySelectorAll('.map-header .header-tab').forEach(headerTab => {
  headerTab.addEventListener('click', () => {
    const id = headerTab.dataset.target;

    document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));

    const target = document.querySelector(`.category-tab[data-id="${id}"]`);
    if (target) {
      target.classList.add('active');
      target.click();
    }

    document.querySelectorAll('.header-tab').forEach(t => t.classList.remove('active'));
    headerTab.classList.add('active');
  });
});

initTabs();