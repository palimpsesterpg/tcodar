const user = (typeof _userdata !== 'undefined' && _userdata) || {};

const adminsIds = [1, 2, 3];
const camIds = [2];
const leaIds = [3];

const hasId = ids => (id = user.user_id) => ids.includes(Number(id));

const isAdmin = hasId(adminsIds);
const isCam = hasId(camIds);
const isLea = hasId(leaIds);

const own = (system, selector) =>
  [...system.querySelectorAll(selector)].filter(
    el => el.parentElement.closest('.tabsystem, .tabinline') === system
  );

function Tabs() {
  document.querySelectorAll('.tabsystem').forEach(system => {
    const tabs = own(system, '.tab');
    const contents = own(system, '.tab-content');

    const activate = tab => {
      if (!tab) return;
      tabs.forEach(t => t.classList.toggle('active', t === tab));
      contents.forEach(c => c.classList.toggle('active', c.dataset.tab === tab.dataset.tab));
    };

    tabs.forEach(tab => tab.addEventListener('click', () => activate(tab)));
    activate(tabs.find(t => t.classList.contains('active')) || tabs[0]);
  });
}

function TabsInline() {
  document.querySelectorAll('.tabinline').forEach(system => {
    const contents = own(system, '.tab-content');
    const prev = own(system, '.tab.prev')[0];
    const next = own(system, '.tab.next')[0];
    if (!prev || !next || !contents.length) return;

    let index = Math.max(0, contents.findIndex(c => c.classList.contains('active')));

    const activate = i => {
      index = (i + contents.length) % contents.length;
      contents.forEach((c, n) => c.classList.toggle('active', n === index));
    };

    prev.addEventListener('click', () => activate(index - 1));
    next.addEventListener('click', () => activate(index + 1));
    activate(index);
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

function fillCard(root, data) {
  root.querySelectorAll("[data-field]").forEach((el) => {
    const field = el.dataset.field;
    const value = data[field];
    if (value === undefined || value === null) return;

    if (field === "img") {
      el.innerHTML = value ? `<img src="${value}">` : "";
    } else {
      el.textContent = Array.isArray(value) ? value.join(", ") : value;
    }
  });

  root.style.setProperty("--fam-color", data.color || "#000000");
  root.style.setProperty("--fam-colorFade", data.colorFade || "#00000040");
  root.style.setProperty("--fam-name", JSON.stringify(String(data.name ?? "Nom")));
  root.style.setProperty("--fam-icon", JSON.stringify(data.icon ?? "\uE049"));
  root.style.setProperty("--fam-id", JSON.stringify(String(data.id ?? "null")));

  const fam = String(data.id ?? "");
  root.querySelectorAll('.tab-content[data-tab="tree"] .node').forEach((node, i) => {
    node.querySelector(':scope > .node-num')?.remove();
    node.dataset.id = i + 1;
    node.insertAdjacentHTML('afterbegin', `<span class="node-num">${fam}${i + 1}.</span>`);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-family]").forEach((el) => {
    const data = FAMILIES[el.dataset.family];
    if (data) fillCard(el, {
      ...FAMILIES.default,
      ...data
    });
  });

  document.querySelectorAll("[data-character]").forEach((el) => {
    const data = CARACTERS[el.dataset.character];
    if (data) fillCard(el, data);
  });
});

document.addEventListener("click", (e) => {
    const title = e.target.closest(".title-toggle");
    if (title) title.closest(".bloc-toggle").classList.toggle("open");
});

addQueendomTab();
Tabs();
TabsInline();
HeaderNav();
ClockWall();
addUsernameToNotiffiButton();
setInterval(ClockWall, 1000);