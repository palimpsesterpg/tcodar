function Tabs() {
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

function HeaderNav() {
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

const cities = document.querySelectorAll("#clockwall .phseven-city");

function ClockWall() {
  const maintenant = new Date();
  cities.forEach((city) => {
    city.querySelector(".time").textContent =
      maintenant.toLocaleTimeString("fr-FR", {
        timeZone: city.dataset.tz,
        hour: "2-digit",
        minute: "2-digit",
      });
  });
}

Tabs();
HeaderNav();
ClockWall();
setInterval(ClockWall, 1000);