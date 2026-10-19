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
      const key = headerTab.id;

      categories.querySelector(`.tab[data-tab="${key}"]`) ?.click();

      categories.querySelector(`.category[data-tab="${key}"]`) ?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
    });
  });
}

function actualiser() {
  const villes = document.querySelectorAll("#station .phseven-city");
  const maintenant = new Date();
  villes.forEach((ville) => {
    ville.querySelector(".heure").textContent =
      maintenant.toLocaleTimeString("fr-FR", {
        timeZone: ville.dataset.tz,
        hour: "2-digit",
        minute: "2-digit",
      });
  });
}

actualiser();
setInterval(actualiser, 1000);

initTabs();
initHeaderNav();