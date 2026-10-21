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

const cities = document.querySelectorAll("#page-home .seven .phseven-city");

function ClockWall() {
  const maintenant = new Date();
  cities.forEach((city) => {
    const [h, m] = maintenant
      .toLocaleTimeString("fr-FR", {
        timeZone: city.dataset.tz,
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
      })
      .split(":");

    city.querySelector("hour").textContent = h;
    city.querySelector("min").textContent = m;
  });
}

if ([1, 2, 3].includes(Number(_userdata.user_id))) {
  const tabs = document.querySelector('.tabsystem-tabs.off');

  if (tabs) {
    tabs.insertAdjacentHTML('beforeend', `
            <div class="tab" data-tab="c11">
                <span>queendom</span>
            </div>
        `);
  }
}

function updateSpan() {
  const btn = document.getElementById('notiffi_button');
  if (!btn) return;

  const span = btn.querySelector('span');
  if (!span) return;

  // on ignore le <template> d'origine, on ne prend que le div rendu
  const countEl = btn.querySelector('div.unread_count');
  const count = countEl ? countEl.textContent.trim() : '';
  const username = (typeof _userdata !== 'undefined' && _userdata.username) || '';

  const text = username + (count ? ' ' + count : '');
  if (span.textContent !== text) span.textContent = text; // évite la boucle infinie
}

function initNotifSpan() {
  const btn = document.getElementById('notiffi_button');
  if (!btn) return;
  updateSpan();
  new MutationObserver(updateSpan).observe(btn, {
    childList: true,
    subtree: true,
    characterData: true
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNotifSpan);
} else {
  initNotifSpan();
}

Tabs();
HeaderNav();
ClockWall();
setInterval(ClockWall, 1000);