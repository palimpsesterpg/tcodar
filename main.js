const q = (selector, root = document) => root.querySelector(selector);
const qq = (selector, root = document) => [...root.querySelectorAll(selector)];
const sep = () => document.createElement('sep');

const onReady = fn =>
  document.readyState === 'loading' ?
  document.addEventListener('DOMContentLoaded', fn) :
  fn();

const getCharacters = () => (typeof CHARACTERS !== 'undefined' && CHARACTERS) || {};
const getFamilies = () => (typeof FAMILIES !== 'undefined' && FAMILIES) || {};

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
    qq(`#${id}, .${id}, a[href="/${id}"]`).forEach(el => {
      if (!el.classList.contains(cls)) el.classList.add(cls);
    });
  }
};

const TAB_FIELDS = {
  faces: 'face,pseudo',
  jobs: 'job,pseudo',
  addresses: 'address,pseudo',
  players: 'player[0],pseudo',
};

const FAMILY_FIELDS = ['num', 'name', 'country', 'domaine', 'crime', 'fortune'];
const FAMILY_FIELDS_HIDDEN = ['rank', 'city1', 'city2', 'ethnies', 'color', 'played'];

const CLOCK_LOCALE = 'fr-FR';

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
  },
  {
    selector: ".topic-admin a[href*='/modcp?mode=delete'] img",
    icon: 'fi fi-ts-trash',
    replace: true
  },
  {
    selector: ".topic-admin a[href*='/modcp?mode=move'] img",
    icon: 'fi fi-ts-expand-arrows-alt',
    replace: true
  },
  {
    selector: ".topic-admin a[href*='/modcp?mode=lock'] img",
    icon: 'fi fi-ts-lock',
    replace: true
  },
  {
    selector: ".topic-admin a[href*='/modcp?mode=unlock'] img",
    icon: 'fi fi-ts-lock-open-alt',
    replace: true
  },
  {
    selector: ".topic-admin a[href*='/modcp?mode=split'] img",
    icon: 'fi fi-ts-split',
    replace: true
  },
  {
    selector: ".topic-admin a[href*='/merge'] img",
    icon: 'fi fi-ts-code-merge',
    replace: true
  }
];

const EDITOR_ICONS = {
  'sceditor-button-bold': '<i class="fi fi-ts-bold"></i>',
  'sceditor-button-italic': '<i class="fi fi-ts-italic"></i>',
  'sceditor-button-underline': '<i class="fi fi-ts-underline"></i>',
  'sceditor-button-strike': '<i class="fi fi-ts-strikethrough"></i>',
  'sceditor-button-left': '<i class="fi fi-ts-align-left"></i>',
  'sceditor-button-center': '<i class="fi fi-ts-align-center"></i>',
  'sceditor-button-right': '<i class="fi fi-ts-align-right"></i>',
  'sceditor-button-justify': '<i class="fi fi-ts-align-justify"></i>',
  'sceditor-button-quote': '<i class="fi fi-ts-quote-right"></i>',
  'sceditor-button-code': '<i class="fi fi-ts-code-simple"></i>',
  'sceditor-button-faspoiler': '<i class="fi fi-ts-eye-crossed"></i>',
  'sceditor-button-fahide': '<i class="fi fi-ts-low-vision"></i>',
  'sceditor-button-servimg': '<i class="fi fi-ts-picture"></i>',
  'sceditor-button-image': '<i class="fi fi-ts-images"></i>',
  'sceditor-button-link': '<i class="fi fi-ts-link"></i>',
  'sceditor-button-embed': '<i class="fi fi-ts-link-alt"></i>',
  'sceditor-button-translate': '<i class="fi fi-ts-france-country-code"></i>',
  'sceditor-button-youtube': '<i class="fi fi-ts-screen-play"></i>',
  'sceditor-button-headers': '<i class="fi fi-ts-heading"></i>',
  'sceditor-button-size': '<i class="fi fi-ts-text-size"></i>',
  'sceditor-button-color': '<i class="fi fi-ts-palette"></i>',
  'sceditor-button-font': '<i class="fi fi-ts-text"></i>',
  'sceditor-button-removeformat': '<i class="fi fi-ts-cross-small"></i>',
  'sceditor-button-mention': '<i class="fi fi-ts-at"></i>',
  'sceditor-button-emoticon': '<i class="fi fi-ts-face-smile-upside-down" style="transform:rotate(180deg)"></i>',
  'sceditor-button-date': '<i class="fi fi-ts-calendar"></i>',
  'sceditor-button-time': '<i class="fi fi-ts-clock"></i>',
  'sceditor-button-source': '<i class="fi fi-ts-terminal"></i>',
  'sceditor-button-table': '<i class="fi fi-ts-table"></i>',
  'sceditor-button-bulletlist': '<i class="fi fi-ts-list"></i>',
  'sceditor-button-orderedlist': '<i class="fi fi-ts-list-check"></i>',
  'sceditor-button-pastetext': '<i class="fi fi-ts-clipboard"></i>',
  'sceditor-button-more': '<i class="fi fi-ts-menu-dots"></i>',
  'sceditor-button-horizontalrule': '<i class="fi fi-ts-minus"></i>',
  'sceditor-button-subscript': '<i class="fi fi-ts-subscript"></i>',
  'sceditor-button-superscript': '<i class="fi fi-ts-superscript"></i>',
  'sceditor-button-faupdown': '<i class="fi fi-ts-arrow-alt-up"></i>',
  'sceditor-button-fascroll': '<i class="fi fi-ts-arrow-alt-left"></i>',
  'sceditor-button-farand': '<i class="fi fi-ts-shuffle"></i>',
};

const ZODIAC_SIGNS = [
  'aquarius', 'aries', 'cancer', 'capricorn', 'gemini', 'leo',
  'libra', 'pisces', 'sagittarius', 'scorpio', 'taurus', 'virgo',
];

const TOPIC_LABELS = [
  ['default2', 'rp libre'],
  ['default3', 'rp solo'],
  ['default4', 'fiche terminée'],
  ['default5', 'délai dépassé'],
  ['default6', 'important'],
  ['default7', 'à archiver'],
  ['default8', 'rp terminé'],
  ['default9', 'analepse'],
  ['default10', 'prolepse'],
  ['default11', 'sms'],
  ['default14', 'appels'],
  ['default15', 'mails'],
  ['default32', 'lettres'],
  ['default16', 'pris'],
  ['default17', 'tenté'],
  ['default18', 'reservé'],
  ['default35', 'délai supplémentaire'],
];

const fieldSpan = f => `<span data-field="${f}"></span>`;

const own = (system, selector) =>
  qq(selector, system).filter(
    el => el.parentElement ?.closest('.tabsystem, .tabinline') === system
  );

const toCharacterKey = name =>
  name
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .split(/[^a-zA-Z0-9]+/)
  .filter(Boolean)
  .map((w, i) => (i === 0 ? w.toLowerCase() : w[0].toUpperCase() + w.slice(1).toLowerCase()))
  .join('');

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

function applyIcons(map) {
  map.forEach(({
    selector,
    icon,
    replace
  }) => {
    const html = `<i class="${icon}"></i>`;

    qq(selector).forEach(el => {
      if (replace) el.outerHTML = html;
      else el.innerHTML = html;
    });
  });
}

function replaceZodiacIcons() {
  ZODIAC_SIGNS.forEach(sign => {
    qq(`img[src*="icon_zodiac_${sign}_2.gif"]`).forEach(img => {
      const span = document.createElement('span');
      span.className = `tes-${sign}`;
      img.replaceWith(span);
    });
  });
}

function replaceTopicLabels() {
  TOPIC_LABELS.forEach(([gif, label]) => {
    qq(`topicinfo[style*="${gif}.gif"]`).forEach(el => {
      el.removeAttribute('style');
      el.textContent = label;
    });

    qq(`img[src*="${gif}.gif"]`).forEach(img => img.replaceWith(label));
  });
}

function addTranslateButton() {
  qq('.sceditor-button-fahide').forEach(fahide => {
    const btn = document.createElement('a');
    btn.className = 'sceditor-button sceditor-button-translate';
    btn.setAttribute('unselectable', 'on');
    btn.title = 'Traduire';
    btn.innerHTML = '<div unselectable="on"></div>';

    btn.addEventListener('click', () => {
      const textarea = document.querySelector('sceditor-container textarea');
      if (!textarea) return;
      sceditor.instance(textarea) ?.insertText(
        '<span class="trad"><vo>texte en vo</vo><vf>texte en fr</vf></span>'
      );
    });

    fahide.after(btn);
  });
}

function applyEditorIcons() {
  Object.entries(EDITOR_ICONS).forEach(([cls, icon]) => {
    qq(`.${cls}`).forEach(el => {
      el.innerHTML = icon;
      el.style.background = 'none';
    });
  });
}

function initTabs() {
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

function initTabsInline() {
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

function initHeaderNav() {
  const categories = q('#categories');
  if (!categories) return;

  qq('.header-tab').forEach(headerTab => {
    headerTab.addEventListener('click', () => {
      const key = CSS.escape(headerTab.id);
      q(`.tab[data-tab="${key}"]`, categories) ?.click();
      q(`.category[data-tab="${key}"]`, categories) ?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  });
}

function updateClockWall() {
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
      time = now.toLocaleTimeString(CLOCK_LOCALE, {
        ...options,
        timeZone: city.dataset.tz
      });
    } catch {
      time = now.toLocaleTimeString(CLOCK_LOCALE, options);
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

function hideAdminTools() {
  if (isAdmin()) return;
  qq('.post.u1 .postbody-icons .postbody .head').forEach(el => el.remove());
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
  const data = getCharacters()[el.dataset.character];
  if (!TAB_FIELDS[tab] || !data) return;

  el.innerHTML = TAB_FIELDS[tab].split(',').map(fieldSpan).join('');
  fillCard(el, data, el.dataset.index);
}

function buildFamilyRow(el) {
  el.innerHTML =
    FAMILY_FIELDS.map(fieldSpan).join('') +
    `<div class="content-toggle">${FAMILY_FIELDS_HIDDEN.map(fieldSpan).join('')}</div>`;

  const families = getFamilies();
  const data = {
    ...families.default,
    ...families[el.dataset.family]
  };
  const [city1, city2] = Object.values(data.cities ?? {});

  fillCard(el, {
    ...data,
    city1,
    city2
  });
}

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
  const characters = getCharacters();

  qq('.list-row [data-field="pseudo"]').forEach(el => {
    if (q('a.mentiontag', el)) return;

    const data = characters[el.closest('.list-row') ?.dataset.character];
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
  const groups = new Map();
  qq('.list-row').forEach(row => {
    const parent = row.parentElement;
    if (!groups.has(parent)) groups.set(parent, []);
    groups.get(parent).push(row);
  });

  const key = row => (q(':scope > span', row) ?.textContent ?? '').trim();

  groups.forEach(rows => {
    const markers = rows.map(row => {
      const m = document.createComment('');
      row.replaceWith(m);
      return m;
    });

    const sorted = [...rows].sort((a, b) =>
      key(a).localeCompare(key(b), 'fr', {
        sensitivity: 'base'
      })
    );

    markers.forEach((m, i) => m.replaceWith(sorted[i]));
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

function cloneMemberPseudo() {
  const pm = q('.fcplayer-pseudo');
  const cm = q('.fcplayer-content');
  if (!pm || !cm || q('.fcplayer-pseudo-content', cm)) return;

  const clone = pm.cloneNode(true);
  clone.classList.replace('fcplayer-pseudo', 'fcplayer-pseudo-content');
  cm.prepend(clone);
}

function numberSpans() {
  qq('.fcmainps-content .tab-content:not([data-tab="carac"])').forEach(tab => {
    qq(':scope > span', tab).forEach((span, i) => {
      span.dataset.n = i + 1;
    });
  });
}

function initPageContext() {
  const page = q('#page-content');
  if (!page) return;

  const links = qq('.topic-header-path a.nav', page);
  const forumHref = links.at(-1) ?.href ?? '';
  const forumId = forumHref.match(/\/f(\d+)/) ?. [1];

  const titleEl = q('.page-title', page);
  const titleHref =
    titleEl ?.href ??
    q('a', titleEl ?? document.createElement('div')) ?.href ??
    titleEl ?.closest('a') ?.href ??
    '';
  const topicId = titleHref.match(/\/t(\d+)/) ?. [1];
  const topiclist = q('.topiclist', page);
  const postlist = q('.postlist', page);

  if (topiclist && forumId) topiclist.id = forumId;
  if (postlist && topicId) postlist.id = topicId;
  if (postlist && forumId) postlist.dataset.forum = forumId;

  if (!postlist) return;

  if (postlist ?.id === '267') {
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
      695: 'tabtwo',
    };

    Object.entries(tabIds).forEach(([id, tab]) => {
      const post = document.getElementById(id);
      if (!post) return;
      post.dataset.tab = tab;
      q('.message', post) ?.classList.add('listings-table');
    });
  }

  if (postlist ?.id === '272') {
    qq('.post', postlist).forEach(p => p.classList.add('mini'));
  }
}

onReady(() => {
  let highlightQueued = false;
  new MutationObserver(() => {
    if (highlightQueued) return;
    highlightQueued = true;
    requestAnimationFrame(() => {
      highlightQueued = false;
      highlight();
    });
  }).observe(document.body, {
    childList: true,
    subtree: true
  });

  hideAdminTools();
  initPageContext();

  cloneMemberPseudo();

  qq('.fcmainps-pseudo prenom').forEach(p => p.after(sep()));
  qq('.postprofile').forEach(p => p.after(sep()));
  qq('.fcmainad-title-main').forEach(p => p.after(sep()));

  qq('.fam-row.bloc-toggle[data-family]').forEach(buildFamilyRow);

  const families = getFamilies();
  qq('[data-family]').forEach(el => {
    const data = families[el.dataset.family];
    if (data) fillCard(el, {
      ...families.default,
      ...data
    });
  });

  setMemberCharacter();
  setPostCharacter();

  const characters = getCharacters();
  qq('[data-character]').forEach(el => fillCard(el, characters[el.dataset.character]));

  qq('.list-row[data-character]').forEach(buildRow);

  numberSpans();

  prefixPseudos();
  groupPlayers();
  sortListRows();

  highlight();
  applyIcons(ICONS);
  replaceZodiacIcons();
  replaceTopicLabels();
  addTranslateButton();
  setTimeout(applyEditorIcons, 500);
  addQueendomTab();
  initTabs();
  initTabsInline();
  initHeaderNav();
  updateClockWall();
  addUsernameToNotiffiButton();
  setInterval(updateClockWall, 1000);
});

document.addEventListener('click', e => {
  e.target.closest('.bloc-toggle') ?.classList.toggle('open');
});