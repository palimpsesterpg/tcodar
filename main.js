const q = (selector, root = document) => root.querySelector(selector);
const qq = (selector, root = document) => [...root.querySelectorAll(selector)];
const sep = () => document.createElement('sep');

const onReady = fn =>
  document.readyState === 'loading' ?
  document.addEventListener('DOMContentLoaded', fn) :
  fn();

const user = (typeof _userdata !== 'undefined' && _userdata) || {};

const adminsIds = [1, 2, 3];
const camIds = [2];
const leaIds = [3];

const hasId = ids => (id = user.user_id) => ids.includes(Number(id));

const isAdmin = hasId(adminsIds);
const isCam = hasId(camIds);
const isLea = hasId(leaIds);

const classes = {
  ...Object.fromEntries(camIds.map(id => [`u${id}`, 'cam'])),
  ...Object.fromEntries(leaIds.map(id => [`u${id}`, 'lea'])),
};

const highlight = () => {
  for (const [id, cls] of Object.entries(classes)) {
    document
      .querySelectorAll(`#${id}, .${id}, a[href="/${id}"]`)
      .forEach(el => el.classList.add(cls));
  }
};

const own = (system, selector) =>
  qq(selector, system).filter(
    el => el.parentElement ?.closest('.tabsystem, .tabinline') === system
  );

const TAB_FIELDS = {
  faces: 'face,pseudo',
  jobs: 'job,pseudo',
  addresses: 'address,pseudo',
  players: 'player[0],pseudo'
};

const FAMILY_FIELDS = ['num', 'name', 'country', 'domaine', 'crime', 'fortune'];
const FAMILY_FIELDS_HIDDEN = ['rank', 'city1', 'city2', 'ethnies', 'color', 'played'];

const fieldSpan = f => `<span data-field="${f}"></span>`;

const ICONS = [{
    selector: '.copyright a',
    icon: 'fi fi-ts-crown'
  },
  {
    selector: 'a[href="#top"]',
    icon: 'fi fi-ts-angle-up'
  },
  {
    selector: 'a[href="#bottom"]',
    icon: 'fi fi-ts-angle-down'
  },
  {
    selector: 'img[src*="modernbb/arrow_right.png"]',
    icon: 'fi fi-ts-angle-right',
    replace: true
  },
  {
    selector: 'img[src*="modernbb/arrow_left.png"]',
    icon: 'fi fi-ts-angle-left',
    replace: true
  },
  {
    selector: '.sprite-icon_topic_newest, .sprite-icon_topic_latest',
    icon: 'fi fi-ts-sparkles',
    replace: true
  },
  {
    selector: 'a.last-post-icon',
    icon: 'fi fi-ts-sparkles'
  },
  {
    selector: '.topic-participate img',
    icon: 'fi fi-ss-star',
    replace: true
  },
  {
    selector: '#i_icon_profile, .i_icon_profile',
    icon: 'fi fi-ts-user',
    replace: true
  },
  {
    selector: '.memberlistmp img, .i_icon_pm, #i_icon_pm',
    icon: 'fi fi-ts-envelope',
    replace: true
  },
  {
    selector: '#i_msg_inbox',
    icon: 'fi fi-ts-mailbox',
    replace: true
  },
  {
    selector: '#i_msg_sentbox',
    icon: 'fi fi-ts-paper-plane-top',
    replace: true
  },
  {
    selector: '#i_msg_outbox',
    icon: 'fi fi-ts-envelope',
    replace: true
  },
  {
    selector: '#i_msg_savebox',
    icon: 'fi fi-ts-archive',
    replace: true
  },
  {
    selector: '.ajax-profil_valid, .ajax-profil_edit',
    icon: 'fi fi-ts-check',
    replace: true
  },
  {
    selector: 'img[src*="folder_new.gif"]',
    icon: 'fi fi-ts-exclamation',
    replace: true
  },
  {
    selector: 'img[src*="icon_contact_www.png"]',
    icon: 'fi fi-ts-envelope-plus',
    replace: true
  }
];

function applyIcons(map) {
  map.forEach(({
    selector,
    icon,
    replace
  }) => {
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
      q(`.tab[data-tab="${key}"]`, categories) ?.click();
      q(`.category[data-tab="${key}"]`, categories) ?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });
}

function ClockWall() {
  const now = new Date();
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23'
  };

  qq('#page-home .seven .phseven-city').forEach(city => {
    const hour = q('hour', city);
    const min = q('min', city);
    if (!hour || !min) return;

    let time;
    try {
      time = now.toLocaleTimeString('fr-FR', {
        ...options,
        timeZone: city.dataset.tz
      });
    } catch {
      time = now.toLocaleTimeString('fr-FR', options);
    }

    [hour.textContent, min.textContent] = time.split(':');
  });
}

function addQueendomTab() {
  if (!isAdmin()) return;
  q('#categories .tabsystem-tabs.off') ?.insertAdjacentHTML(
    'beforeend',
    '<div class="tab" data-tab="c11"><span>queendom</span></div>'
  );
}

function addUsernameToNotiffiButton() {
  const pseudo = q('#notiffi_button .notif_username');
  if (pseudo) pseudo.textContent = user.username ?? '';
}

function resolveValue(field, data, index) {
  const m = field.match(/^(\w+)\[(\d+)\]$/);
  if (m) {
    const arr = data[m[1]];
    return Array.isArray(arr) ? arr[Number(m[2])] : arr;
  }

  const value = data[field];

  if (Array.isArray(value) && index !== undefined && index !== '') {
    return value[Number(index)];
  }
  return value;
}

function fillCard(root, data, index) {
  if (!root || !data) return;

  qq('[data-field]', root).forEach(el => {
    const field = el.dataset.field;
    const value = resolveValue(field, data, index);
    if (value === undefined || value === null) return;

    if (field === 'img') {
      el.innerHTML = value ? `<img src="${value}">` : '';
    } else {
      el.textContent = Array.isArray(value) ? value.join(', ') : value;
    }
  });

  if (root.classList.contains('list-row') && data.groupId != null) {
    root.classList.add(`group-${data.groupId}`);
  }

  if (root.hasAttribute('data-family')) {
    root.style.setProperty('--fam-color', data.color || '#000000');
    root.style.setProperty('--fam-colorFade', data.colorFade || '#00000040');
    root.style.setProperty('--fam-name', JSON.stringify(String(data.name ?? 'Nom')));
    root.style.setProperty('--fam-icon', JSON.stringify(data.icon ?? '\uE049'));
    root.style.setProperty('--fam-id', JSON.stringify(String(data.id ?? 'null')));
  }

  const fam = String(data.id ?? '');
  qq('.tab-content[data-tab="tree"] .node', root).forEach((node, i) => {
    q(':scope > .node-num', node) ?.remove();
    node.dataset.id = i + 1;
    node.insertAdjacentHTML('afterbegin', `<span class="node-num">${fam}${i + 1}.</span>`);
  });
}

function buildRow(el) {
  const tab = el.closest('.tab-content') ?.dataset.tab;
  const data = CHARACTERS[el.dataset.character];
  if (!TAB_FIELDS[tab] || !data) return;

  el.innerHTML = TAB_FIELDS[tab]
    .split(',')
    .map(f => `<span data-field="${f}"></span>`)
    .join('');

  fillCard(el, data, el.dataset.index);
}

function buildFamilyRow(el) {
  el.innerHTML =
    FAMILY_FIELDS.map(fieldSpan).join('') +
    `<div class="content-toggle">${FAMILY_FIELDS_HIDDEN.map(fieldSpan).join('')}</div>`;

  const data = {
    ...FAMILIES.default,
    ...FAMILIES[el.dataset.family]
  };
  const [city1, city2] = Object.values(data.cities ?? {});

  fillCard(el, {
    ...data,
    city1,
    city2
  });
}

const toCharacterKey = name =>
  name
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .split(/[^a-zA-Z0-9]+/)
  .filter(Boolean)
  .map((w, i) => (i === 0 ? w.toLowerCase() : w[0].toUpperCase() + w.slice(1).toLowerCase()))
  .join('');

function setMemberCharacter() {
  qq('.member').forEach(el => {
    const name = q('.member-pseudo', el) ?.textContent.trim();
    if (!name) return;
    el.dataset.character = toCharacterKey(name);
  });
}

function setPostCharacter() {
  qq('.postprofile').forEach(el => {
    const name = q('.postprofile-name', el) ?.textContent.trim();
    if (!name) return;
    el.dataset.character = toCharacterKey(name);
  });
}

function prefixPseudos() {
  qq('.list-row [data-field="pseudo"]').forEach(el => {
    if (q('a.mentiontag', el)) return;

    const data = CHARACTERS[el.closest('.list-row') ?.dataset.character];
    const name = el.textContent.trim();

    if (!data ?.id) {
      el.textContent = `@${name}`;
      return;
    }

    const a = document.createElement('a');
    a.href = `/u${data.id}`;
    a.rel = 'nofollow';
    a.dataset.id = data.id;
    a.className = 'mentiontag';
    a.title = `Voir le profil : ${name}`;
    a.textContent = `@${name}`;
    el.replaceChildren(a);
  });
}

function sortListRows() {
  const groupes = new Map();
  qq('.list-row').forEach(row => {
    const parent = row.parentElement;
    if (!groupes.has(parent)) groupes.set(parent, []);
    groupes.get(parent).push(row);
  });

  const key = row => (q(':scope > span', row) ?.textContent ?? '').trim();

  groupes.forEach(rows => {
    const marqueurs = rows.map(row => {
      const m = document.createComment('');
      row.replaceWith(m);
      return m;
    });

    const tries = [...rows].sort((a, b) =>
      key(a).localeCompare(key(b), 'fr', {
        sensitivity: 'base'
      })
    );

    marqueurs.forEach((m, i) => m.replaceWith(tries[i]));
  });
}

function cloneMemberPseudo() {
  const pm = q('.fcplayer-pseudo');
  const cm = q('.fcplayer-content');
  if (!pm || !cm || q('.fcplayer-pseudo-content', cm)) return;

  const c = pm.cloneNode(true);
  c.classList.replace('fcplayer-pseudo', 'fcplayer-pseudo-content');
  cm.prepend(c);
}

function hideAdminTools() {
  if (isAdmin()) return;
  qq('.post.u1 .postbody-icons .postbody .head').forEach(el => el.remove());
}

function initPageContext() {
  const page = q('#page-content');
  if (!page) return;

  const links = qq('.topic-header-path a.nav', page);
  const forumId = links.at(-1) ?.href.match(/\/f(\d+)/) ?. [1];
  const topicId = q('.page-title', page) ?.href.match(/\/t(\d+)/) ?. [1];
  const topiclist = q('.topiclist', page);
  const postlist = q('.postlist', page);

  if (topiclist && forumId) topiclist.id = forumId;
  if (postlist && topicId) postlist.id = topicId;
  if (postlist && forumId) postlist.dataset.forum = forumId;

  if (postlist.id === '267') {
    postlist.classList.add('tabsystem', 'listings');
    qq('.post', postlist).forEach(post => post.classList.add('tab-content'));
    qq('.postprofile', postlist).forEach(p => p.classList.add('d-none'));

    const tabsPost = document.getElementById('340');
    tabsPost ?.classList.add('tabsystem-tabs');
    tabsPost ?.classList.remove('tab-content');

    const tabIds = {
      675: 'faces',
      691: 'addresses',
      692: 'jobs',
      693: 'players',
      694: 'tabone',
      695: 'tabtwo'
    };

    Object.entries(tabIds).forEach(([id, tab]) => {
      const post = document.getElementById(id);
      if (!post) return;
      post.dataset.tab = tab;
      q('.message', post) ?.classList.add('listings-table');
    });
  }

  if (postlist && topicId === '272') {
    qq('.post', postlist).forEach(p => p.classList.add('mini'));
  }
}

function numberSpans() {
  qq('.fcmainps-content .tab-content:not([data-tab="carac"])').forEach(tab => {
    qq(':scope > span', tab).forEach((span, i) => {
      span.dataset.n = i + 1;
    });
  });
}

function groupPlayers() {
  const parents = new Map();

  qq('.list-row[data-character]').forEach(row => {
    const name = q(':scope > [data-field^="player"]', row) ?.textContent.trim().toLowerCase();
    if (!name) return;

    if (!parents.has(row.parentElement)) parents.set(row.parentElement, new Map());
    const groups = parents.get(row.parentElement);
    if (!groups.has(name)) groups.set(name, []);
    groups.get(name).push(row);
  });

  parents.forEach(groups => {
    groups.forEach(([first, ...others]) => {
      others.forEach(row => {
        qq(':scope > [data-field="pseudo"]', row).forEach(p => first.append(p));
        row.remove();
      });
    });
  });
}

new MutationObserver(highlight).observe(document.body, {
  childList: true,
  subtree: true,
});

onReady(() => {
  hideAdminTools();
  initPageContext();

  cloneMemberPseudo();

  qq('.fcmainps-pseudo prenom').forEach(p => p.after(sep()));
  qq('.postprofile').forEach(p => p.after(sep()));
  qq('.fcmainad-title-main').forEach(p => p.after(sep()));

  qq('.fam-row.bloc-toggle[data-family]').forEach(buildFamilyRow);

  qq('[data-family]').forEach(el => {
    const fams = typeof FAMILIES !== 'undefined' ? FAMILIES : {};
    const data = fams[el.dataset.family];
    if (data) fillCard(el, {
      ...fams.default,
      ...data
    });
  });

  setMemberCharacter();
  setPostCharacter();

  qq('[data-character]').forEach(el => {
    fillCard(el, CHARACTERS[el.dataset.character]);
  });

  qq('.list-row[data-character]').forEach(buildRow);

  numberSpans()

  prefixPseudos();
  groupPlayers();
  sortListRows();

  highlight();
  applyIcons(ICONS);
  addQueendomTab();
  Tabs();
  TabsInline();
  HeaderNav();
  ClockWall();
  addUsernameToNotiffiButton();
  setInterval(ClockWall, 1000);
});

document.addEventListener('click', e => {
  e.target.closest('.bloc-toggle') ?.classList.toggle('open');
});