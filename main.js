const q = (selector, root = document) => root.querySelector(selector);
const qq = (selector, root = document) => [...root.querySelectorAll(selector)];
const sep = () => document.createElement('sep');

const user = (typeof _userdata !== 'undefined' && _userdata) || {};

const adminsIds = [1, 2, 3];
const camIds = [2];
const leaIds = [3];

const hasId = ids => (id = user.user_id) => ids.includes(Number(id));

const isAdmin = hasId(adminsIds);
const isCam = hasId(camIds);
const isLea = hasId(leaIds);

const own = (system, selector) =>
  qq(selector, system).filter(
    el => el.parentElement.closest('.tabsystem, .tabinline') === system
  );

const CARACTERS = {
  pippaJennings: {
    face: 'Jodie Comer',
    pseudo: 'Pippa Jennings',
    firstNames: 'Philippa, Pippa',
    lastNames: ['Jennings', 'de Vaucelles'],
    families: ['Durham', 'de Ferrières'],
    dateOfBirth: '07.02.1993',
    address: ['blablabla'],
    job: 'co-fondatrice et président de la branche française de Jennings Consulting (finance)',
    gender: 'femme cis',
    player: ['palimpseste', 'cam', 'elle'],
    status: 'célibataire'
  },
    johnDoe: {
    face: 'Jacob Elordi',
    pseudo: 'John Doe',
    firstNames: 'Philippa, Pippa',
    lastNames: ['Jennings', 'de Vaucelles'],
    families: ['Durham', 'de Ferrières'],
    dateOfBirth: '07.02.1993',
    address: ['blablabla'],
    job: 'ceo de Vinea Regina',
    gender: 'femme cis',
    player: ['palimpseste', 'cam', 'elle'],
    status: 'célibataire'
  },
    janeDoe: {
    face: 'Ella Purnell',
    pseudo: 'Jane Doe',
    firstNames: 'Philippa, Pippa',
    lastNames: ['Jennings', 'de Vaucelles'],
    families: ['Durham', 'de Ferrières'],
    dateOfBirth: '07.02.1993',
    address: ['blablabla'],
    job: 'ceo de Vinea Regina',
    gender: 'femme cis',
    player: ['palimpseste', 'cam', 'elle'],
    status: 'célibataire'
  }
};

const TAB_FIELDS = {
  faces: 'face,pseudo',
  jobs: 'job,pseudo',
  addresses: 'address,pseudo'
};

const ICONS = [
  { selector: '.copyright a', icon: 'fi fi-ts-crown' },
  { selector: 'a[href="#top"]', icon: 'fi fi-ts-angle-up' },
  { selector: 'a[href="#bottom"]', icon: 'fi fi-ts-angle-down' },
  { selector: 'img[src*="modernbb/arrow_right.png"]', icon: 'fi fi-ts-angle-right', replace: true },
  { selector: 'img[src*="modernbb/arrow_left.png"]', icon: 'fi fi-ts-angle-left', replace: true },
  { selector: '.sprite-icon_topic_newest, .sprite-icon_topic_latest', icon: 'fi fi-ts-sparkles', replace: true },
  { selector: 'a.last-post-icon', icon: 'fi fi-ts-sparkles' },
  { selector: '.topic-participate img', icon: 'fi fi-ss-star', replace: true },
  { selector: '#i_icon_profile, .i_icon_profile', icon: 'fi fi-ts-user', replace: true },
  { selector: '.memberlistmp img, .i_icon_pm, #i_icon_pm', icon: 'fi fi-ts-envelope', replace: true },
  { selector: '#i_msg_inbox', icon: 'fi fi-ts-mailbox', replace: true },
  { selector: '#i_msg_sentbox', icon: 'fi fi-ts-paper-plane-top', replace: true },
  { selector: '#i_msg_outbox', icon: 'fi fi-ts-envelope', replace: true },
  { selector: '#i_msg_savebox', icon: 'fi fi-ts-archive', replace: true },
  { selector: '.ajax-profil_valid, .ajax-profil_edit', icon: 'fi fi-ts-check', replace: true },
  { selector: 'img[src*="folder_new.gif"]', icon: 'fi fi-ts-exclamation', replace: true }
];

function applyIcons(map) {
  map.forEach(({ selector, icon, replace }) => {
    const html = `<i class="${icon}"></i>`;

    qq(selector).forEach(el => {
      if (replace) {
        el.outerHTML = html;
      } else {
        el.innerHTML = html;
      }
    });
  });
}

function Tabs() {
  qq('.tabsystem').forEach(system => {
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
  qq('.tabinline').forEach(system => {
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
  const categories = q('#categories');
  if (!categories) return;

  qq('.header-tab').forEach(headerTab => {
    headerTab.addEventListener('click', () => {
      const key = CSS.escape(headerTab.id);
      q(`.tab[data-tab="${key}"]`, categories)?.click();
      q(`.category[data-tab="${key}"]`, categories)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });
}

function ClockWall() {
  const now = new Date();
  const options = { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' };

  qq('#page-home .seven .phseven-city').forEach(city => {
    const hour = q('hour', city);
    const min = q('min', city);
    if (!hour || !min) return;

    let time;
    try {
      time = now.toLocaleTimeString('fr-FR', { ...options, timeZone: city.dataset.tz });
    } catch {
      time = now.toLocaleTimeString('fr-FR', options);
    }

    [hour.textContent, min.textContent] = time.split(':');
  });
}

function addQueendomTab() {
  if (!isAdmin()) return;
  q('#categories .tabsystem-tabs.off')?.insertAdjacentHTML(
    'beforeend',
    '<div class="tab" data-tab="c11"><span>queendom</span></div>'
  );
}

function addUsernameToNotiffiButton() {
  const pseudo = q('#notiffi_button .notif_username');
  if (pseudo) pseudo.textContent = user.username ?? '';
}

function fillCard(root, data) {
  qq('[data-field]', root).forEach(el => {
    const field = el.dataset.field;
    const value = data[field];
    if (value === undefined || value === null) return;

    if (field === 'img') {
      el.innerHTML = value ? `<img src="${value}">` : '';
    } else {
      el.textContent = Array.isArray(value) ? value.join(', ') : value;
    }
  });

  if (root.hasAttribute('data-family')) {
    root.style.setProperty('--fam-color', data.color || '#000000');
    root.style.setProperty('--fam-colorFade', data.colorFade || '#00000040');
    root.style.setProperty('--fam-name', JSON.stringify(String(data.name ?? 'Nom')));
    root.style.setProperty('--fam-icon', JSON.stringify(data.icon ?? '\uE049'));
    root.style.setProperty('--fam-id', JSON.stringify(String(data.id ?? 'null')));
  }

  const fam = String(data.id ?? '');
  qq('.tab-content[data-tab="tree"] .node', root).forEach((node, i) => {
    q(':scope > .node-num', node)?.remove();
    node.dataset.id = i + 1;
    node.insertAdjacentHTML('afterbegin', `<span class="node-num">${fam}${i + 1}.</span>`);
  });
}

function buildRow(el) {
  const fields = TAB_FIELDS[el.closest('.tab-content').dataset.tab].split(',');
  el.innerHTML = fields.map(f => `<span data-field="${f}"></span>`).join('');
  fillCard(el, CARACTERS[el.dataset.character]);
}

function hideAdminTools() {
  if (isAdmin()) return;
  qq('.post.u1 .postbody-icons .postbody .head').forEach(el => el.remove());
}

function initPageContext() {
  const page = q('#page-content');
  const links = qq('.topic-header-path a.nav', page);
  const forumId = links.at(-1)?.href.match(/\/f(\d+)/)?.[1];
  const topicId = q('.page-title a', page)?.href.match(/\/t(\d+)/)?.[1];
  const topiclist = q('.topiclist', page);
  const postlist = q('.postlist', page);

  if (topiclist && forumId) topiclist.id = forumId;
  if (postlist && topicId) postlist.id = topicId;

  if (topicId === '267') {
    postlist.classList.add('tabsystem', 'listings');
    qq('.post', postlist).forEach(post => post.classList.add('tab-content'));
    qq('.postprofile', postlist).forEach(p => p.classList.add('d-none'));

    const tabsPost = document.getElementById('691');
    tabsPost?.classList.add('tabsystem-tabs');
    tabsPost?.classList.remove('tab-content');

    const tabIds = {
      693: 'faces',
      694: 'jobs',
      695: 'addresses'
    };

    Object.entries(tabIds).forEach(([id, tab]) => {
      const post = document.getElementById(id);
      if (!post) return;
      post.dataset.tab = tab;
      q('.message', post)?.classList.add('listings-table');
    });
  }

  if (topicId === '272') {
    qq('.post', postlist).forEach(p => p.classList.add('mini'));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  qq('[data-family]').forEach(el => {
    const data = FAMILIES[el.dataset.family];
    if (data) fillCard(el, { ...FAMILIES.default, ...data });
  });

  qq('[data-character]').forEach(el => {
    const data = CARACTERS[el.dataset.character];
    if (data) fillCard(el, data);
  });

  qq('.list-row[data-character]').forEach(buildRow);
});

document.addEventListener('click', e => {
  e.target.closest('.bloc-toggle')?.classList.toggle('open');
});

hideAdminTools();
initPageContext();

qq('.fcmainps-pseudo prenom').forEach(p => p.after(sep()));
qq('.postprofile').forEach(p => p.after(sep()));

function trierTousLesListRows() {
  const groupes = new Map();
  document.querySelectorAll('.list-row').forEach(row => {
    const parent = row.parentElement;
    if (!groupes.has(parent)) groupes.set(parent, []);
    groupes.get(parent).push(row);
  });

  const cle = row => (row.querySelector(':scope > span')?.textContent ?? '').trim();

  groupes.forEach(rows => {
    const marqueurs = rows.map(row => {
      const m = document.createComment('');
      row.replaceWith(m);
      return m;
    });

    const tries = [...rows].sort((a, b) =>
      cle(a).localeCompare(cle(b), 'fr', { sensitivity: 'base' })
    );

    marqueurs.forEach((m, i) => m.replaceWith(tries[i]));
  });
}

document.addEventListener('DOMContentLoaded', trierTousLesListRows);

applyIcons(ICONS);
addQueendomTab();
Tabs();
TabsInline();
HeaderNav();
ClockWall();
addUsernameToNotiffiButton();
setInterval(ClockWall, 1000);