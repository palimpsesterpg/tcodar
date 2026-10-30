const normalize = str =>
  str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const getTitle = item =>
  q(':scope > .item-title', item)?.textContent.trim() || '';

const filterClass = el => [...el.classList].find(c => c !== 'active');

const GENDERS = {
  cismale: { label: 'homme cis', feminine: false },
  cisfemale: { label: 'femme cis', feminine: true },
  transmale: { label: 'homme trans', feminine: false },
  transfemale: { label: 'femme trans', feminine: true },
  nonbinary: { label: 'personne non-binaire', nby: true },
};

const JOBS = {
  acting: { masculine: 'acteur', feminine: 'actrice', nby: 'acteur.ice' },
  music: { masculine: 'musicien', feminine: 'musicienne', nby: 'musicien.ne' },
  modeling: { masculine: 'mannequin', feminine: 'mannequin', nby: 'mannequin' },
  influence: { masculine: 'influenceur', feminine: 'influenceuse', nby: 'influenceur.euse' },
};

let filterGroups = [];
let itemsContainer = null;
let items = [];
let searchInput = null;
let searchButton = null;
let isDirectory = false;
const groupOf = new Map();

function buildContentHead(item) {
  const genderClass = Object.keys(GENDERS).find(c => item.classList.contains(c));
  const gender = genderClass ? GENDERS[genderClass] : null;
  const form = gender?.nby ? 'nby' : gender?.feminine ? 'feminine' : 'masculine';

  const jobs = [...item.classList]
    .filter(c => c in JOBS)
    .map(c => JOBS[c][form]);

  const head = document.createElement('div');
  head.className = 'content-head';

  [gender?.label, item.dataset.year, ...jobs]
    .filter(Boolean)
    .forEach(text => {
      const span = document.createElement('span');
      span.textContent = text;
      head.appendChild(span);
    });

  return head;
}

function addDecadeClasses() {
  items.forEach(item => {
    const year = parseInt(item.dataset.year, 10);
    if (Number.isNaN(year)) return;

    const d = Math.floor(year / 10) % 10;
    item.classList.add(`${d}0${d}9`);
  });
}

function cloneContent() {
  items.forEach(item => {
    const content = q('.item-content', item);
    if (!content) return;

    const title = q(':scope > .item-title', item);
    let nameClone = null;
    if (title) {
      nameClone = title.cloneNode(true);
      nameClone.classList.remove('item-title');
      nameClone.classList.add('item-name');
    }

    const img = q(':scope > img', item);
    let imageClone = null;
    if (img) {
      const credits = q(':scope > .content-credits', content);
      imageClone = document.createElement('div');
      imageClone.className = 'content-image';
      imageClone.append(img.cloneNode(true), ...(credits ? [credits] : []));
    }

    content.prepend(
      ...[nameClone, imageClone].filter(Boolean),
      ...(isDirectory ? [buildContentHead(item)] : [])
    );
  });
}

function sortItems() {
  if (!itemsContainer) return;

  [...items]
    .sort((a, b) =>
      getTitle(a).localeCompare(getTitle(b), 'fr', { sensitivity: 'base' })
    )
    .forEach(item => itemsContainer.appendChild(item));
}

function updateFilters() {
  const active = filterGroups.map(group =>
    new Set(qq(':scope > div.active', group).map(filterClass))
  );

  const matches = (item, c, gi) =>
    item.classList.contains(c) ||
    [...item.classList].some(cls => {
      const parts = cls.split('-');
      if (parts.length !== 2 || !parts.includes(c)) return false;

      const other = parts[0] === c ? parts[1] : parts[0];
      const otherGroup = groupOf.get(other);
      return (
        otherGroup === undefined ||
        otherGroup === gi ||
        !active[otherGroup].size ||
        active[otherGroup].has(other)
      );
    });

  items.forEach(item => {
    const visible = active.every(
      (set, gi) => !set.size || [...set].some(c => matches(item, c, gi))
    );
    item.style.display = visible ? 'flex' : 'none';
  });
}

function initFilters() {
  filterGroups.forEach((group, i) => {
    qq(':scope > div', group).forEach(btn => {
      groupOf.set(filterClass(btn), i);

      btn.addEventListener('click', () => {
        btn.classList.toggle('active');
        updateFilters();
      });
    });
  });

  updateFilters();
}

function updateSearch() {
  const query = normalize(searchInput.value.trim());

  items.forEach(item => {
    item.classList.toggle('search-hidden', !normalize(getTitle(item)).includes(query));
  });
}

function initSearch() {
  if (!searchInput) return;

  searchInput.addEventListener('input', updateSearch);
  searchButton?.addEventListener('click', updateSearch);
}

function initItemPanels() {
  document.addEventListener('click', e => {
    if (e.target.closest('.item-content')) return;

    const item = e.target.closest('.page-items .item');
    if (item) item.classList.add('open');
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeAllItems();
  });
}

onReady(() => {
  filterGroups = qq('.page-filters .filter');
  itemsContainer = q('.page-items');
  items = qq('.page-items .item');
  searchInput = q('#site-search');
  searchButton = q('.page-search button');
  isDirectory = document.body.id === 'directory';

  addDecadeClasses();
  cloneContent();
  sortItems();
  initFilters();
  initSearch();
  initItemPanels();
});