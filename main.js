const user = (typeof _userdata !== 'undefined' && _userdata) || {};

const adminsIds = [1, 2, 3];
const camIds = [2];
const leaIds = [3];
const isAdmin = (id = _userdata.user_id) => admins.includes(Number(id));
const isCam = (id = _userdata.user_id) => cam.includes(Number(id));
const isLea = (id = _userdata.user_id) => lea.includes(Number(id));

function Tabs() {
  document.querySelectorAll('.tabsystem').forEach(system => {
    const tabs = system.querySelectorAll('.tab');
    const contents = system.querySelectorAll('.tab-content');

    const activate = tab => {
      if (!tab) return;
      tabs.forEach(t => t.classList.toggle('active', t === tab));
      contents.forEach(c => c.classList.toggle('active', c.dataset.tab === tab.dataset.tab));
    };

    tabs.forEach(tab => tab.addEventListener('click', () => activate(tab)));
    activate(system.querySelector('.tab.active') || tabs[0]);
  });
}

function HeaderNav() {
  const categories = document.querySelector('#categories');
  if (!categories) return;

  document.querySelectorAll('.header-tab').forEach(headerTab => {
    headerTab.addEventListener('click', () => {
      const key = CSS.escape(headerTab.id);
      categories.querySelector(`.tab[data-tab="${key}"]`) ?.click();
      categories.querySelector(`.category[data-tab="${key}"]`) ?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });
}

function ClockWall() {
  const now = new Date();
  document.querySelectorAll('#page-home .seven .phseven-city').forEach(city => {
    const hour = city.querySelector('hour');
    const min = city.querySelector('min');
    if (!hour || !min) return;

    let time;
    try {
      time = now.toLocaleTimeString('fr-FR', {
        timeZone: city.dataset.tz,
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23',
      });
    } catch {
      time = now.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23'
      });
    }

    [hour.textContent, min.textContent] = time.split(':');
  });
}

function addQueendomTab() {
  if (!isAdmin()) return;
  document.querySelector('#categories .tabsystem-tabs.off') ?.insertAdjacentHTML('beforeend', '<div class="tab" data-tab="c11"><span>queendom</span></div>');
}

function addUsernameToNotiffiButton() {
  const pseudo = document.querySelector('#notiffi_button .notif_username');
  if (pseudo) pseudo.textContent = user.username ?? '';
}

addQueendomTab();
Tabs();
HeaderNav();
ClockWall();
addUsernameToNotiffiButton();
setInterval(ClockWall, 1000);