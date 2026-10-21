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

function addUsernameToNotiffiButton() {
  const btn = document.getElementById('notiffi_button');
  if (!btn) return;

  const username = (typeof _userdata !== 'undefined' && _userdata.username) || '';
  if (!username) return;

  let span = btn.querySelector(':scope > span.notif_username');
  if (!span) {
    span = document.createElement('span');
    span.className = 'notif_username';
    btn.appendChild(span);
  }
  if (span.textContent !== username) span.textContent = username;
}

function initNotifButton() {
  const btn = document.getElementById('notiffi_button');
  if (!btn) return;
  addUsernameToNotiffiButton();
  new MutationObserver(addUsernameToNotiffiButton).observe(btn, { childList: true });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNotifButton);
} else {
  initNotifButton();
}

Tabs();
HeaderNav();
ClockWall();
setInterval(ClockWall, 1000);