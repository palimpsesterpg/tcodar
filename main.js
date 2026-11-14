const q = (selector, root = document) => root.querySelector(selector);
const qq = (selector, root = document) => [...root.querySelectorAll(selector)];
const sep = () => document.createElement('sep');

const onReady = fn =>
  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', fn)
    : fn();

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

const TAB_FIELDS = {
  faces: 'face,pseudo',
  jobs: 'job,pseudo',
  addresses: 'address,pseudo',
  players: 'player[0],pseudo',
};

const TAB_PROFILE = {
  'profile-dtls': 'field_id-6, field_id-13, field_id-8, field_id-9',
  'profile-second-avatar': 'field_id7',
  'character-dtls': 'field_id2, field_id-5, field_id-12, field_id-2',
  '.tab-content[data-tab="settings"] > div:nth-of-type(2)': 'field_id-11, field_id-20',
  'player-dtls': 'field_id14, field_id1',
  '.tab-content[data-tab="roleplay"]': 'field_id8, field_id9, field_id10',
  'profile-moodboard': 'field_id11',
};

const FAMILY_FIELDS = ['num', 'name', 'country', 'domaine', 'crime', 'fortune'];
const FAMILY_FIELDS_HIDDEN = ['rank', 'city1', 'city2', 'ethnies', 'color', 'played'];

const OVERVIEW_FIELDS = [
  ['face', 'Célébrité'],
  ['player', 'Joueur.euse'],
  ['dateOfBirth', '01.01.1990', 'age-perso'],
  ['status', 'Statut amoureux'],
];

const CLOCK_LOCALE = 'fr-FR';
const COPY_RESET_DELAY = 5000;
const SUB_TITLE = 'the curses of diamonds and rings';
const NAME_PATTERN = /^\s*(\S+)\s+(\S[\s\S]*)$/;

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
  { selector: 'img[src*="folder_new.gif"]', icon: 'fi fi-ts-exclamation', replace: true },
  { selector: 'img[src*="icon_contact_www.png"]', icon: 'fi fi-ts-info-guide', replace: true },
  { selector: 'img[src*="icon_contact_fb.png"]', icon: 'fi fi-ts-file-user', replace: true },
  { selector: 'img[src*="icon_contact_pinterest.png"]', icon: 'fi fi-ts-images', replace: true },
  { selector: '.topic-admin a[href*="/modcp?mode=delete"] img', icon: 'fi fi-ts-trash', replace: true },
  { selector: '.topic-admin a[href*="/modcp?mode=move"] img', icon: 'fi fi-ts-expand-arrows-alt', replace: true },
  { selector: '.topic-admin a[href*="/modcp?mode=lock"] img', icon: 'fi fi-ts-lock', replace: true },
  { selector: '.topic-admin a[href*="/modcp?mode=unlock"] img', icon: 'fi fi-ts-lock-open-alt', replace: true },
  { selector: '.topic-admin a[href*="/modcp?mode=split"] img', icon: 'fi fi-ts-split', replace: true },
  { selector: '.topic-admin a[href*="/merge"] img', icon: 'fi fi-ts-code-merge', replace: true },
];

const COPY_ICONS = {
  copy: '<i class="fi fi-ts-clipboard"></i>',
  copied: '<i class="fi fi-ts-clipboard-check"></i>',
};

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

const GROUP_TARGETS = '.member, .forumrow, .post, .profile, .tooltip-content, .relation';

const GROUP_COLORS = {
  '6A6A6A': 'group-7',
  'A7AD37': 'group-4',
  '9E5F1D': 'group-5',
  '729DAD': 'group-6',
};

const DICE_RULES = {
  'caisse de communauté': {
    1: 'votre prêt immobilier vous rapporte = + 150 points',
    2: 'vous avez été élu président du CA = - 200 points',
    3: 'amende pour excès de vitesse = - 50 points',
    4: "frais d'hospitalisation = - 100 points",
    5: 'honoraires de consultation = + 25 points',
    6: 'votre assurance vie vous rapporte = + 100 points',
    7: 'remboursement des impôts sur le revenu = + 20 points',
    8: 'la vente de vos actions vous rapporte = + 50 points',
    9: 'votre caisse de vacances vous rapporte = + 100 points',
    10: 'frais de scolarité = - 50 points',
    11: 'erreur de la banque en votre faveur = + 200 points',
    12: "c'est votre anniversaire = + 10 points x nombre de membres (pnj compris)",
    13: 'honoraires du médecin = - 50 points',
    14: 'vous héritez = + 100 points',
    15: 'vous avez gagné le deuxième prix du concours de beauté = + 10 points',
  },
  'chance': {
    1: 'compte supplémentaire à -50%',
    2: 'compte supplémentaire gratuit',
    3: "publicité d'un pré-lien sur la PA à -50%",
    4: "publicité d'un pré-lien sur la PA gratuite",
    5: "création d'un gif personnalisé à -50%",
    6: "création d'un gif personnalisé gratuite",
    7: 'réservation de la célébrité de votre pré-lien à -50%',
    8: 'réservation de la célébrité de votre pré-lien gratuite',
    9: 'réservation de la célébrité de votre prochain compte à -50%',
    10: 'réservation de la célébrité de votre prochain compte gratuite',
    11: "création d'un rang personnalisé à -50%",
    12: "création d'un rang personnalisé gratuite",
    13: "création d'un lieu à -50%",
    14: "création d'un lieu gratuite",
    15: 'rejouez immédiatement (relancez le dé)',
    16: "échangez une de vos récompenses contre celle d'un autre joueur",
    17: 'votre prochain achat est à -25%',
  },
};

const DICE_DEFAULT = 'Aucun résultat';

const SEASON_BY_MONTH = [
  'winter', 'winter', 'spring', 'spring', 'spring', 'summer',
  'summer', 'summer', 'autumn', 'autumn', 'autumn', 'winter',
];

const SEASON_LABELS = {
  winter: 'hiver',
  spring: 'printemps',
  summer: 'été',
  autumn: 'automne',
};

const CLIMATES = {
  london: { winter: [5, 12], spring: [7, 21], summer: [15, 20], autumn: [5, 16] },
  sydney: { winter: [8, 17], spring: [12, 23], summer: [19, 27], autumn: [14, 24] },
  rio: { winter: [8, 17], spring: [12, 23], summer: [19, 27], autumn: [14, 24] },
  singapore: { winter: [8, 17], spring: [12, 23], summer: [19, 27], autumn: [14, 24] },
  marrakech: { winter: [8, 17], spring: [12, 23], summer: [19, 27], autumn: [14, 24] },
  newyork: { winter: [8, 17], spring: [12, 23], summer: [19, 27], autumn: [14, 24] },
};

const FORUM_TAB_CLASSES = {
  'forum-admin': ['c1', 'c11'],
  'forum-off': ['c2', 'c9'],
  'forum-loc': ['c3', 'c4', 'c5', 'c6', 'c7', 'c10', 'c13'],
  'forum-media': ['c8'],
  'forum-archives': ['c12'],
};

const FORUM_LINK_ICONS = {
  '/f82-sms': 'fi fi-ss-message-sms',
  '/f83-appels': 'fi fi-ss-phone-call',
  '/f84-mails': 'fi fi-ss-envelope',
  '/f85-whatsapp': 'fi fi-brands-whatsapp',
  '/f86-raya': 'fi fi-ss-heart-partner-handshake',
  '/f87-instagram': 'fi fi-brands-instagram',
  '/f88-linkedin': 'fi fi-brands-linkedin',
};

const clockFormatters = new Map();
const monthFormatters = new Map();
const profileDocs = new Map();

const fieldSpan = f => `<span data-field="${f}"></span>`;

const createDiv = (className, text) =>
  Object.assign(document.createElement('div'), { className, textContent: text });

const strongEl = text => {
  const el = document.createElement('strong');
  el.textContent = text;
  return el;
};

const own = (system, selector) =>
  qq(selector, system).filter(
    el => el.parentElement?.closest('.tabsystem, .tabinline') === system
  );

const toCharacterKey = name =>
  name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((w, i) => (i === 0 ? w.toLowerCase() : w[0].toUpperCase() + w.slice(1).toLowerCase()))
    .join('');

const getLinkName = link => {
  const parts = qq('.prenom, .nom', link);
  return (parts.length ? parts.map(part => part.textContent) : [link.textContent]).join(' ');
};

const editHtml = (selector, ...replacers) =>
  qq(selector).forEach(el => {
    el.innerHTML = replacers.reduce(
      (html, [pattern, value]) => html.replace(pattern, value),
      el.innerHTML
    );
  });

const isMention = el => Boolean(el.closest('.mentiontag'));
const hasMentionNear = el =>
  isMention(el) || Boolean(el.parentElement?.querySelector(':scope > .mentiontag'));

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

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

function fetchProfileDoc(href) {
  const url = new URL(href, location.href).href;

  if (!profileDocs.has(url)) {
    profileDocs.set(
      url,
      fetch(url)
        .then(response => {
          if (!response.ok) throw new Error(response.status);
          return response.text();
        })
        .then(html => new DOMParser().parseFromString(html, 'text/html'))
        .catch(() => {
          profileDocs.delete(url);
          return null;
        })
    );
  }
  return profileDocs.get(url);
}

function highlight() {
  for (const [id, cls] of Object.entries(classes)) {
    qq(`#${id}, .${id}, a[href="/${id}"]`).forEach(el => el.classList.add(cls));
  }
}

function removeAdBlock() {
  qq('div[style*="min-width: 728px"]').forEach(el => el.remove());
}

function observeBody() {
  let queued = false;

  new MutationObserver(() => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      highlight();
      removeAdBlock();
    });
  }).observe(document.body, { childList: true, subtree: true });
}

function applyColorScheme() {
  let saved = null;
  try {
    saved = localStorage.getItem('color-scheme');
  } catch {}

  document.documentElement.dataset.colorScheme = saved || 'dark';
}

function initColorScheme() {
  const html = document.documentElement;
  const toggle = q('.color-scheme-toggle');
  if (!toggle) return;

  const updateLabel = () => {
    const next = html.dataset.colorScheme === 'dark' ? 'clair' : 'sombre';
    toggle.title = `Activer le mode ${next}`;
  };

  toggle.addEventListener('click', () => {
    const scheme = html.dataset.colorScheme === 'dark' ? 'light' : 'dark';
    html.dataset.colorScheme = scheme;
    try {
      localStorage.setItem('color-scheme', scheme);
    } catch {}
    updateLabel();
  });

  updateLabel();
}

function applyIcons(map, root = document) {
  map.forEach(({ selector, icon, replace }) => {
    const html = `<i class="${icon}"></i>`;

    qq(selector, root).forEach(el => {
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

function replaceEmojis() {
  qq('img.emojione').forEach(img => img.replaceWith(img.alt));
  qq('.sceditor-button-twemojifa').forEach(el => el.remove());
}

function removeSpacers() {
  qq('div[style*="height"]').forEach(el => {
    if (el.style.height === '3px' && !el.children.length && !el.textContent.trim()) {
      el.remove();
    }
  });
}

function unwrapTabs() {
  const list = q('#tabs ul');
  if (!list) return;

  list.parentElement.classList.add('registration-tabs');

  [...list.children].forEach(li => {
    if (li.tagName === 'LI') li.replaceWith(...li.childNodes);
  });
  list.replaceWith(...list.childNodes);
}

function formatFieldLabels() {
  qq('dt > label').forEach(label => {
    if (q('required', label)) return;

    label.innerHTML = label.innerHTML
      .replace(/\s*&nbsp;/g, '')
      .replace(/\s*:\s*$/, '')
      .replace(/\s*\*/, ' <required>*</required>')
      .trim();
  });
}

function moveAdminLinks() {
  const target = q('#page-navbar div > a[href="#bottom"]');
  if (!target) return;

  target.before(...qq('a[href^="/admin/?part=admin"]'));
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

function hideAdminTools() {
  if (isAdmin()) return;
  qq('.post.u1 .postbody-icons .postbody .head').forEach(el => el.remove());
}

function addTranslateButton() {
  qq('.sceditor-button-fahide').forEach(fahide => {
    const btn = document.createElement('a');
    btn.className = 'sceditor-button sceditor-button-translate';
    btn.setAttribute('unselectable', 'on');
    btn.title = 'Traduire';
    btn.innerHTML = '<div unselectable="on"></div>';

    btn.addEventListener('click', () => {
      const container = fahide.closest('.sceditor-container');
      const textarea = container?.nextElementSibling?.matches('textarea')
        ? container.nextElementSibling
        : document.getElementById('text_editor_textarea');
      if (!textarea) return;

      const instance =
        window.sceditor?.instance?.(textarea) ??
        window.jQuery?.(textarea).sceditor?.('instance');

      instance?.insertText(
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
    if (!headerTab.id) return;

    headerTab.addEventListener('click', () => {
      const key = CSS.escape(headerTab.id);
      q(`.tab[data-tab="${key}"]`, categories)?.click();
      q(`.category[data-tab="${key}"]`, categories)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  });
}

function initCategoriesToggle() {
  const categories = q('#categories');
  if (!categories) return;

  qq('[data-toggle-tabs]').forEach(btn => {
    btn.addEventListener('click', () => {
      const active = categories.classList.contains('tabsystem');

      categories.classList.toggle('tabsystem', !active);
      categories.classList.toggle('notabs', active);
    });
  });
}

function initBlockToggles() {
  document.addEventListener('click', e => {
    e.target.closest('.title-toggle')?.closest('.bloc-toggle')?.classList.toggle('open');
  });
}

function initAdminPanels() {
  const overlay = document.createElement('div');
  overlay.className = 'admin-overlay';

  document.addEventListener('click', e => {
    if (e.target.closest('.admin-close')) {
      e.target.closest('.admin-modal')?.classList.remove('open');
      overlay.remove();
      return;
    }

    if (e.target.closest('.modal-content')) return;

    const modal = e.target.closest('.admin-modal');
    qq('.admin-modal.open').forEach(m => {
      if (m !== modal) m.classList.remove('open');
    });

    if (modal && q('.modal-content', modal)) {
      modal.classList.add('open');
      if (!overlay.isConnected) document.body.append(overlay);
    } else {
      overlay.remove();
    }
  });
}

function getFormatter(cache, options, timeZone) {
  if (!cache.has(timeZone)) {
    let formatter;
    try {
      formatter = new Intl.DateTimeFormat(CLOCK_LOCALE, { ...options, timeZone });
    } catch {
      formatter = new Intl.DateTimeFormat(CLOCK_LOCALE, options);
    }
    cache.set(timeZone, formatter);
  }
  return cache.get(timeZone);
}

const getClockFormatter = timeZone =>
  getFormatter(clockFormatters, { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }, timeZone);

const getMonthFormatter = timeZone =>
  getFormatter(monthFormatters, { month: 'numeric' }, timeZone);

function getSeason(now, timeZone, hemisphere) {
  const month = Number(getMonthFormatter(timeZone).format(now)) - 1;
  return SEASON_BY_MONTH[hemisphere === 'south' ? (month + 6) % 12 : month];
}

function initClockWall() {
  const cities = qq('#page-home .seven .phseven-city')
    .map(city => ({
      city,
      hour: q('hour', city),
      min: q('min', city),
      season: q('season', city),
      tempMin: q('tempmin', city),
      tempMax: q('tempmax', city),
      timeZone: city.dataset.tz,
      hemisphere: city.dataset.hemisphere,
      climate: CLIMATES[city.dataset.climate],
    }))
    .filter(({ hour, min }) => hour && min);

  if (!cities.length) return;

  const update = () => {
    const now = new Date();

    cities.forEach(({ city, hour, min, season, tempMin, tempMax, timeZone, hemisphere, climate }) => {
      [hour.textContent, min.textContent] = getClockFormatter(timeZone).format(now).split(':');

      const current = getSeason(now, timeZone, hemisphere);
      if (city.dataset.season === current) return;

      city.dataset.season = current;
      if (season) season.textContent = SEASON_LABELS[current];

      const range = climate?.[current];
      if (tempMin && range) tempMin.textContent = `${range[0]}°`;
      if (tempMax && range) tempMax.textContent = `${range[1]}°`;
    });
  };

  update();
  setInterval(update, 1000);
}

function applyGroupClasses(container, sourceSelector = '[class*="group-"]') {
  if (!container) return;

  const source = q(sourceSelector, container);
  if (!source) return;

  const skip = container.matches('.boxlien')
    ? isMention(container)
    : isMention(container) || hasMentionNear(source);
  if (skip) return;

  const groupClasses = [...source.classList].filter(cls => cls.startsWith('group-'));
  if (groupClasses.length) container.classList.add(...groupClasses);
}

function observeGroupContainers() {
  new MutationObserver(mutations => {
    for (const { addedNodes } of mutations) {
      for (const node of addedNodes) {
        if (node.nodeType !== 1 || !node.classList.contains('tooltipster-base')) continue;
        applyGroupClasses(q('.tooltipster-content', node));
      }
    }
  }).observe(document.body, { childList: true });

  const panel = q('#notiffi_panel');
  if (!panel) return;

  new MutationObserver(mutations => {
    for (const { addedNodes } of mutations) {
      for (const node of addedNodes) {
        if (node.nodeType !== 1) continue;
        if (node.matches('.notification')) applyGroupClasses(node);
        qq('.notification', node).forEach(el => applyGroupClasses(el));
      }
    }
  }).observe(panel, { childList: true, subtree: true });
}

function initGroupClasses() {
  qq(GROUP_TARGETS).forEach(el => applyGroupClasses(el));
  qq('.topicrow').forEach(el => applyGroupClasses(el, 'topicauthor [class*="group-"]'));

  observeGroupContainers();

  const color = String(user.groupcolor ?? '').replace('#', '').toUpperCase();
  const groupClass = GROUP_COLORS[color] ?? 'group-2';
  qq('.sceditor-toolbar, #notiffi_panel').forEach(el => el.classList.add(groupClass));
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

  if (data.groupId != null && root.matches('.list-row, .item')) {
    root.classList.add(`group-${data.groupId}`);
  }

  if (root.hasAttribute('data-family')) {
    root.style.setProperty('--fam-color', data.color || '#333333');
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

function fillAllCards() {
  const families = getFamilies();
  const characters = getCharacters();

  qq('[data-family]')
    .filter(el => !el.matches('.fam-row.bloc-toggle'))
    .forEach(el => {
      const data = families[el.dataset.family];
      if (data) fillCard(el, { ...families.default, ...data });
    });

  qq('[data-character]').forEach(el => fillCard(el, characters[el.dataset.character]));
}

function buildRow(el) {
  const tab = el.closest('.tab-content')?.dataset.tab;
  const data = getCharacters()[el.dataset.character];
  if (!TAB_FIELDS[tab] || !data) return;

  el.innerHTML = TAB_FIELDS[tab].split(',').map(fieldSpan).join('');
  fillCard(el, data, el.dataset.index);
}

function buildFamilyRow(el) {
  el.innerHTML =
    `<div class="title-toggle">${FAMILY_FIELDS.map(fieldSpan).join('')}</div>` +
    `<div class="content-toggle">${FAMILY_FIELDS_HIDDEN.map(fieldSpan).join('')}</div>`;

  const families = getFamilies();
  const data = { ...families.default, ...families[el.dataset.family] };
  const [city1, city2] = Object.values(data.cities ?? {});

  fillCard(el, { ...data, city1, city2 });
}

function setCharacterKeys(selector, nameSelector) {
  qq(selector).forEach(el => {
    const name = q(nameSelector, el)?.textContent.trim();
    if (name) el.dataset.character = toCharacterKey(name);
  });
}

function splitPseudonyme(root = document) {
  qq('.member-pseudo, .profile-pseudo, .postprofile-pseudo, #newest-user .usr_grp_clr', root).forEach(el => {
    if (q('.prenom', el)) return;

    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);

    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      const [, first, rest] = node.textContent.match(NAME_PATTERN) ?? [];
      if (!first) continue;

      node.replaceWith(createDiv('prenom', first), createDiv('nom', rest.trim()));
      return;
    }
  });
}

function prefixPseudos() {
  const characters = getCharacters();

  qq('.list-row [data-field="pseudo"]').forEach(el => {
    if (q('a.mentiontag', el)) return;

    const data = characters[el.closest('.list-row')?.dataset.character];
    const name = el.textContent.trim();

    if (!data?.id) {
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

  const key = row => (q(':scope > span', row)?.textContent ?? '').trim();

  groups.forEach(rows => {
    const markers = rows.map(row => {
      const m = document.createComment('');
      row.replaceWith(m);
      return m;
    });

    const sorted = [...rows].sort((a, b) =>
      key(a).localeCompare(key(b), 'fr', { sensitivity: 'base' })
    );

    markers.forEach((m, i) => m.replaceWith(sorted[i]));
  });
}

function groupPlayers() {
  const parents = new Map();

  qq('.list-row[data-character]').forEach(row => {
    const name = q(':scope > [data-field^="player"]', row)?.textContent.trim().toLowerCase();
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

function countToggleRows() {
  qq('.bloc-toggle').forEach(bloc => {
    const title = q('.list-row.title-toggle span', bloc);
    if (!title || q('count', title)) return;

    const count = document.createElement('count');
    count.textContent = qq('.content-toggle .list-row', bloc).length;
    title.append(count);
  });
}

function cloneMemberPseudo() {
  const pm = q('.fc-player-pseudo');
  const cm = q('.fc-player-content');
  if (!pm || !cm || q('.fc-player-pseudo-content', cm)) return;

  const clone = pm.cloneNode(true);
  clone.classList.replace('fc-player-pseudo', 'fc-player-pseudo-content');
  cm.prepend(clone);
}

function numberSpans() {
  qq('.fc-pres-content .tab-content:not([data-tab="carac"])').forEach(tab => {
    qq(':scope > span', tab).forEach((span, i) => {
      span.dataset.n = i + 1;
    });
  });
}

function organizeProfileElements() {
  Object.entries(TAB_PROFILE).forEach(([key, fieldIds]) => {
    const container = q(key.startsWith('.') ? key : `.${key}`);
    if (!container) return;

    fieldIds.split(',').forEach(id => {
      const field = q(`#${id.trim()}`);
      if (field) container.append(field);
    });
  });
}

function transformDiceMessage(el) {
  if (el.dataset.dice) return;

  const hr = q(':scope > hr', el);
  const [player, action] = qq(':scope > strong', el);
  if (!hr || !player || action?.textContent.trim() !== 'Lancer de dés') return;

  const type = hr.nextSibling?.textContent.match(/'([^']*)'/)?.[1].trim().toLowerCase() ?? '';
  const rules = DICE_RULES[type];

  const dice = [];
  for (let node = hr.nextSibling; node; node = node.nextSibling) {
    if (node.nodeName !== 'STRONG') continue;
    const value = parseInt(node.textContent, 10);
    if (!Number.isNaN(value)) dice.push(value);
  }
  if (!dice.length) return;

  const title = document.createElement('div');
  title.className = 'dice-title';
  title.append(strongEl(player.textContent), ' a lancé le dé ', ...(type ? [strongEl(type)] : []));

  const list = document.createElement('div');
  list.className = 'dice-results';
  dice.forEach(value => {
    const row = document.createElement('div');
    row.append('Face ', strongEl(value), rules ? `: ${rules[value] ?? DICE_DEFAULT}` : '');
    list.append(row);
  });

  el.replaceChildren(title, list);
  el.dataset.dice = 'done';
}

function initQuotes() {
  qq('blockquote').forEach(blockquote => {
    const cite = q(':scope > div > cite', blockquote);
    if (!cite) return;

    cite.textContent = cite.textContent.replace(/\s*a écrit\s*:\s*$/i, '');
    blockquote.before(cite);
  });
}

function initCodeBoxes() {
  qq('.codebox dt').forEach(dt => {
    dt.textContent = dt.textContent.replace(/\s*:\s*$/, '');
  });

  qq('dl.codebox').forEach(box => {
    if (q('code', box)) box.classList.add('code');
  });

  qq('dl.codebox.code').forEach(box => {
    const code = q('dd code', box);
    const title = q('dt', box);
    if (title) title.style.display = 'none';
    if (!code || q('.copy-code', code)) return;

    const btn = document.createElement('span');
    btn.className = 'copy-code';
    btn.innerHTML = COPY_ICONS.copy;
    code.prepend(btn);

    let timer;
    btn.addEventListener('click', async () => {
      if (btn.classList.contains('copied')) return;

      const clone = code.cloneNode(true);
      q('.copy-code', clone)?.remove();

      if (!(await copyText(clone.textContent))) return;

      btn.innerHTML = COPY_ICONS.copied;
      btn.classList.add('copied');

      clearTimeout(timer);
      timer = setTimeout(() => {
        btn.innerHTML = COPY_ICONS.copy;
        btn.classList.remove('copied');
      }, COPY_RESET_DELAY);
    });
  });
}

function getAge(birthDate) {
  const [day, month, year] = birthDate.split('.').map(Number);
  if (!day || !month || !year) return null;

  const today = new Date();
  const monthNow = today.getMonth() + 1;
  const birthdayPassed = monthNow > month || (monthNow === month && today.getDate() >= day);

  return today.getFullYear() - year - (birthdayPassed ? 0 : 1);
}

function initAges(root = document) {
  qq('.age-perso', root).forEach(el => {
    if (el.dataset.age) return;

    const birthDate = el.textContent.trim();
    const age = getAge(birthDate);
    if (age === null) return;

    el.dataset.age = age;
    el.textContent = `${age} ans (${birthDate})`;
  });
}

function buildCount(count, label) {
  const div = document.createElement('div');
  div.append(strongEl(count), `${label}${count > 1 ? 's' : ''}`);
  return div;
}

async function loadNewestUserAvatar() {
  const href = q('#newest-user a[href^="/u"]')?.getAttribute('href');
  const target = q('#newest-user-avatar');
  if (!href || !target) return;

  const doc = await fetchProfileDoc(href);
  const avatar = doc && q('.profile-avatar img', doc);
  if (avatar) target.replaceChildren(avatar);
}

function initBoardStats() {
  q('#logged-in-user-list div br')?.remove();

  editHtml('#logged-in-user-list', [/Utilisateurs enregistrés\s*:\s*/i, '']);
  editHtml('#total-posts', [/^Nos membres ont posté un total de\s*/i, '']);
  editHtml('#l-connected-members div', [/Membres connectés au cours des 192 dernières heures\s*:\s*/i, '']);
  editHtml('#newest-user', [/^L'utilisateur enregistré le plus récent est\s*/i, '']);
  editHtml(
    '#total-users',
    [/Nous avons\s*/i, ''],
    [/\s*membres enregistrés/i, 'membres'],
    [/:\s*$/, '']
  );

  const online = q('#total-users-online');
  const hub = q('#hub .four');

  if (online && hub) {
    const text = online.textContent.replace(/\d+\s*Invisible\s*,?\s*/g, '');
    const count = pattern => parseInt(text.match(pattern)?.[1], 10) || 0;

    hub.append(
      buildCount(count(/Il y a en tout (\d+)/), 'connecté.e'),
      buildCount(count(/(\d+)\s*Enregistré/), 'enregistré.e'),
      buildCount(count(/(\d+)\s*Invité/), 'invité.e')
    );
  }
  online?.remove();

  editHtml('#l-connected-members, #logged-in-user-list', [/,\s+/g, ' · ']);
}

function initPageContext() {
  const page = q('#page-content');
  if (!page) return;

  const forumHref = qq('.topic-header-path a.nav', page).at(-1)?.href ?? '';
  const forumId = forumHref.match(/\/f(\d+)/)?.[1];

  const titleEl = q('.page-title', page);
  const titleHref =
    titleEl?.href ??
    titleEl?.querySelector('a')?.href ??
    titleEl?.closest('a')?.href ??
    '';
  const topicId = titleHref.match(/\/t(\d+)/)?.[1];

  const topiclist = q('.topiclist', page);
  const postlist = q('.postlist', page);

  if (topiclist && forumId) topiclist.id = forumId;
  if (!postlist) return;

  if (topicId) postlist.id = topicId;
  if (forumId) postlist.dataset.forum = forumId;

  if (postlist.id === '267') {
    postlist.classList.add('tabsystem', 'listings');
    qq('.post', postlist).forEach(post => post.classList.add('tab-content'));
    qq('.postprofile', postlist).forEach(p => p.classList.add('d-none'));

    const tabsPost = document.getElementById('340');
    tabsPost?.classList.add('tabsystem-tabs');
    tabsPost?.classList.remove('tab-content');

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
      q('.message', post)?.classList.add('listings-table');
    });
  }

  if (postlist.id === '272') {
    qq('.post', postlist).forEach(p => p.classList.add('mini'));
  }
}

function initTitles() {
  const pageTitle = q('.page-title')?.textContent;

  if (pageTitle) {
    qq('.fc-main-title-main, .fc-second-title-main').forEach(el => (el.textContent = pageTitle));
  }
  qq('.fc-main-title-sub, .fc-second-title-sub').forEach(el => (el.textContent = SUB_TITLE));
}

function initForumList() {
  qq('.forum-links:empty').forEach(el => el.remove());

  qq('.forum').forEach(el => {
    if (el.id) el.id = el.id.split('-')[0].replace('/', '').trim();
  });

  Object.entries(FORUM_TAB_CLASSES).forEach(([cls, tabs]) => {
    tabs.forEach(tab => {
      qq(`[data-tab="${tab}"] .forum`).forEach(forum => {
        forum.classList.remove('forum-divers');
        forum.classList.add(cls);
      });
    });
  });

  qq('.forumrow-description, .forumrow-lastpost').forEach(el => {
    const visible = el.textContent.trim() !== '' || Boolean(q('img, svg, i', el));
    el.style.display = visible ? '' : 'none';
  });

  Object.entries(FORUM_LINK_ICONS).forEach(([href, icon]) => {
    qq(`a[href="${href}"]`).forEach(a => {
      a.innerHTML = `<i class="${icon}"></i>`;
    });
  });

  qq('.forum-admin').forEach(forum => {
    const images = qq('.forum-description img', forum);
    images.forEach(img => img.classList.add('forum-img'));
    forum.prepend(...images);
  });

  qq('.forum-off').forEach(forum => {
    forum.prepend(...qq('.forum-lastpost-avatar', forum));
  });

  qq('.forum-loc').forEach(forum => {
    const list = forum.closest('.forumlist');
    if (!list) return;

    forum.addEventListener('mouseenter', () => {
      const src = q('.forum-description img', forum)?.getAttribute('src');
      if (src) list.style.setProperty('--forum-bg', `url("${src}")`);
    });

    forum.addEventListener('mouseleave', () => {
      list.style.removeProperty('--forum-bg');
    });
  });
}

function initForumPreviews() {
  qq('.forumlist:has(.forum-loc)').forEach(list => {
    const preview = document.createElement('img');
    preview.className = 'forum-preview';
    list.append(preview);

    const show = forum => {
      const img = forum && q('.forum-description img', forum);
      if (img) Object.assign(preview, { src: img.src, alt: img.alt });
    };

    show(q('.forum-loc', list));

    list.addEventListener('mouseover', e => show(e.target.closest('.forum-loc')));
  });
}

function buildOverview(link, sourceHead) {
  const key = toCharacterKey(getLinkName(link));
  const userId = link.getAttribute('href').match(/\/u(\d+)/)?.[1];
  const head = document.importNode(sourceHead, true);

  const profile = document.createElement('a');
  profile.href = link.href;
  profile.target = '_blank';
  profile.rel = 'noopener';
  profile.textContent = 'profil';

  q('.profile-stats', head)?.append(profile);

  q('.profile-dtls', head)?.append(
    ...OVERVIEW_FIELDS.map(([field, text, className = '']) => {
      const div = createDiv(className, text);
      div.dataset.field = field;
      return div;
    })
  );

  fillCard(head, getCharacters()[key]);

  const overview = document.createElement('div');
  overview.className = 'profile overview';
  overview.dataset.character = key;
  if (userId) overview.id = `u${userId}`;
  overview.append(head);
  return overview;
}

function enhanceOverview(overview) {
  splitPseudonyme(overview);
  applyIcons(ICONS, overview);
  applyGroupClasses(overview);
  initAges(overview);
}

function initProfileOverview() {
  const OPEN_DELAY = 250;
  const CLOSE_DELAY = 150;

  const overlay = document.createElement('div');
  overlay.className = 'profile-overlay';

  let overview = null;
  let currentLink = null;
  let requestId = 0;
  let openTimer;
  let closeTimer;

  const close = () => {
    clearTimeout(openTimer);
    requestId++;
    overview?.remove();
    overlay.remove();
    overview = null;
    currentLink = null;
  };

  const open = async link => {
    close();
    currentLink = link;
    const id = requestId;

    const doc = await fetchProfileDoc(link.href);
    if (id !== requestId) return;

    const head = doc && q('.profile-head', doc);
    if (!head) return;

    overview = buildOverview(link, head);
    document.body.append(overlay, overview);
    enhanceOverview(overview);
  };

  const findProfileLink = target => {
    const link = target.closest('a[href]');
    if (!link || link.closest('.profile.overview')) return null;
    return /^\/u\d+/.test(link.getAttribute('href')) ? link : null;
  };

  document.addEventListener('mouseover', e => {
    const link = findProfileLink(e.target);

    if (link || e.target.closest('.profile.overview')) clearTimeout(closeTimer);
    if (!link || link === currentLink) return;

    clearTimeout(openTimer);
    openTimer = setTimeout(() => open(link), OPEN_DELAY);
  });

  document.addEventListener('mouseout', e => {
    const source = findProfileLink(e.target) ?? e.target.closest('.profile.overview');
    if (!source || source.contains(e.relatedTarget)) return;

    clearTimeout(openTimer);
    clearTimeout(closeTimer);
    closeTimer = setTimeout(close, CLOSE_DELAY);
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') close();
  });
}

applyColorScheme();

onReady(() => {
  observeBody();
  removeAdBlock();

  hideAdminTools();
  initPageContext();
  cloneMemberPseudo();

  qq('.fc-pres-pseudo prenom').forEach(p => p.after(sep()));
  qq('.postbody').forEach(p => {
    p.before(sep());
    p.after(sep());
  });
  qq('.fc-second-title-main').forEach(p => p.after(sep()));
  qq('.timeline-date').forEach(p => p.after(sep()));
  qq('.page-filters').forEach(p => p.after(sep()));

  qq('.fam-row.bloc-toggle[data-family]').forEach(buildFamilyRow);
  qq('.message').forEach(transformDiceMessage);

  setCharacterKeys('.member', '.member-pseudo');
  setCharacterKeys('.postprofile', '.postprofile-name');
  setCharacterKeys('.wombat', '.profile-pseudo');
  fillAllCards();
  qq('.list-row[data-character]').forEach(buildRow);
  splitPseudonyme();

  initAges();
  initBoardStats();
  initTitles();
  initForumList();
  initForumPreviews();
  initColorScheme();
  numberSpans();
  loadNewestUserAvatar();
  replaceEmojis();
  prefixPseudos();
  groupPlayers();
  sortListRows();
  countToggleRows();
  highlight();
  applyIcons(ICONS);
  replaceZodiacIcons();
  replaceTopicLabels();
  addTranslateButton();
  removeSpacers();
  initQuotes();
  initCodeBoxes();
  setTimeout(applyEditorIcons, 500);
  addQueendomTab();
  unwrapTabs();
  formatFieldLabels();
  moveAdminLinks();
  organizeProfileElements();
  initTabs();
  initTabsInline();
  initHeaderNav();
  initClockWall();
  initBlockToggles();
  initAdminPanels();
  initCategoriesToggle();
  initProfileOverview();
  addUsernameToNotiffiButton();
});

if (document.readyState === 'complete') initGroupClasses();
else window.addEventListener('load', initGroupClasses);