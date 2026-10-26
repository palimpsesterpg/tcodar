const user = (typeof _userdata !== 'undefined' && _userdata) || {};

const adminsIds = [1, 2, 3];
const camIds = [2];
const leaIds = [3];

const hasId = ids => (id = user.user_id) => ids.includes(Number(id));

const isAdmin = hasId(adminsIds);
const isCam = hasId(camIds);
const isLea = hasId(leaIds);

const toolsAdmin = document.querySelectorAll('.post.u1 .postbody-icons .postbody .head');

if (!isAdmin) {
  toolsAdmin.forEach(el => el.remove());
}

const own = (system, selector) => [...system.querySelectorAll(selector)].filter(
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

  if (root.hasAttribute("data-family")) {
    root.style.setProperty("--fam-color", data.color || "#000000");
    root.style.setProperty("--fam-colorFade", data.colorFade || "#00000040");
    root.style.setProperty("--fam-name", JSON.stringify(String(data.name ?? "Nom")));
    root.style.setProperty("--fam-icon", JSON.stringify(data.icon ?? "\uE049"));
    root.style.setProperty("--fam-id", JSON.stringify(String(data.id ?? "null")));
  }

  const fam = String(data.id ?? "");
  root.querySelectorAll('.tab-content[data-tab="tree"] .node').forEach((node, i) => {
    node.querySelector(':scope > .node-num') ?.remove();
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
  const bloc = e.target.closest(".bloc-toggle");
  if (bloc) bloc.classList.toggle("open");
});

const page = document.getElementById('page-content');
const links = page.querySelectorAll('.sub-header-path a.nav');
const forumId = links[links.length - 1]?.href.match(/\/f(\d+)/)?.[1];
const topicId = page.querySelector('.page-title a')?.href.match(/\/t(\d+)/)?.[1];
const topiclist = page.querySelector('.topiclist');
const postlist = page.querySelector('.postlist');

if (topiclist && forumId) topiclist.id = forumId;
if (postlist && topicId) postlist.id = topicId;

if (topicId === '267') {
  postlist.classList.add('tabsystem', 'listings');
  postlist.querySelectorAll('.post').forEach(post => post.classList.add('tab-content'));
  postlist.querySelectorAll('.postprofile').forEach(p => p.classList.add('d-none'));

  const post691 = document.getElementById('691');
  post691?.classList.add('tabsystem-tabs');
  post691?.classList.remove('tab-content');

  const tabs = { 693: 'faces', 694: 'jobs', 695: 'addresses' };
 
  for (const id in tabs) {
    const post = document.getElementById(id);
    if (!post) continue;
    post.dataset.tab = tabs[id];
    post.querySelector('.message')?.classList.add('listings-table');
  }
}

if (topicId === '272') {
  postlist.querySelectorAll('.postprofile').forEach(p => p.classList.add('mini'));
}

const CARACTERS = {

  pippaJennings: {
    face: "Jodie Comer",
    pseudo: "Pippa Jennings",
    firstNames: "Philippa, Pippa",
    lastNames: ["Jennings", "de Vaucelles"],
    families: ["Durham", "de Ferrières"],
    dateOfBirth: "07.02.1993",
    address: ["blablabla"],
    job: "ceo de Vinea Regina",
    gender: "femme cis",
    player: ["palimpseste", "cam", "elle"],
    status: "célibataire"
  }

};

const TAB_FIELDS = {
  faces: "face,pseudo",
  jobs: "job,pseudo",
  addresses: "address,pseudo"
};

function buildRow(el) {
  const fields = TAB_FIELDS[el.closest(".tab-content").dataset.tab].split(",");
  el.innerHTML = fields.map((f) => `<span data-field="${f}"></span>`).join("");
  fillCard(el, CARACTERS[el.dataset.character]);
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".list-row[data-character]").forEach(buildRow);
});

addQueendomTab();
Tabs();
TabsInline();
HeaderNav();
ClockWall();
addUsernameToNotiffiButton();
setInterval(ClockWall, 1000);