const filterGroups = document.querySelectorAll('.page-filters .filter');
const itemsContainer = document.querySelector('.page-items');
const items = document.querySelectorAll('.page-items .item');
const searchInput = document.querySelector('#site-search');
const searchButton = document.querySelector('.page-search button');
const isDirectory = document.body.id === 'directory';

const normalize = str =>
  str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const getTitle = item =>
  item.querySelector(':scope > .item-title') ?.textContent.trim() || '';

const filterClass = el => [...el.classList].find(c => c !== 'active');

const GENDERS = {
  cismale: {
    label: 'homme cis',
    feminine: false
  },
  cisfemale: {
    label: 'femme cis',
    feminine: true
  },
  transmale: {
    label: 'homme trans',
    feminine: false
  },
  transfemale: {
    label: 'femme trans',
    feminine: true
  },
  nonbinary: {
    label: 'personne non-binaire',
    nby: true
  }
};

const JOBS = {
  acting: {
    masculine: 'acteur',
    feminine: 'actrice',
    nby: 'acteur.ice'
  },
  music: {
    masculine: 'musicien',
    feminine: 'musicienne',
    nby: 'musicien.ne'
  },
  modeling: {
    masculine: 'mannequin',
    feminine: 'mannequin',
    nby: 'mannequin'
  },
  influence: {
    masculine: 'influenceur',
    feminine: 'influenceuse',
    nby: 'influenceur.euse'
  }
};

function buildContentHead(item) {
  const genderClass = Object.keys(GENDERS).find(c => item.classList.contains(c));
  const gender = genderClass ? GENDERS[genderClass] : null;
  const form = gender ?.nby ? 'nby' : gender ?.feminine ? 'feminine' : 'masculine';

  const jobs = [...item.classList]
    .filter(c => c in JOBS)
    .map(c => JOBS[c][form]);

  const head = document.createElement('div');
  head.className = 'content-head';

  [gender ?.label, item.dataset.year, ...jobs]
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
    if (isNaN(year)) return;

    const d = Math.floor(year / 10) % 10;
    item.classList.add(`${d}0${d}9`);
  });
}

function cloneContent() {
  items.forEach(item => {
    const content = item.querySelector('.item-content');
    if (!content) return;

    const clones = [...item.querySelectorAll(':scope > img, :scope > .item-title')]
      .map(el => {
        const clone = el.cloneNode(true);
        clone.classList.remove('name');
        return clone;
      });

    const credits = content.querySelector(':scope > .content-credits');
    const imgClone = clones.find(el => el.tagName === 'IMG');
    if (imgClone) {
      const wrapper = document.createElement('div');
      wrapper.className = 'content-image';
      wrapper.append(imgClone, ...(credits ? [credits] : []));
      clones[clones.indexOf(imgClone)] = wrapper;
    }

    content.prepend(...clones, ...(isDirectory ? [buildContentHead(item)] : []));
  });
}

function sortItems() {
  if (!itemsContainer) return;

  [...items]
  .sort((a, b) =>
      getTitle(a).localeCompare(getTitle(b), 'fr', {
        sensitivity: 'base'
      })
    )
    .forEach(item => itemsContainer.appendChild(item));
}

function updateFilters() {
  const activeByGroup = [...filterGroups]
    .map(group => [...group.querySelectorAll(':scope > div.active')].map(filterClass))
    .filter(classes => classes.length > 0);

  items.forEach(item => {
    const visible = activeByGroup.every(classes =>
      classes.some(c => item.classList.contains(c))
    );
    item.style.display = visible ? 'flex' : 'none';
  });
}

function initFilters() {
  filterGroups.forEach(group => {
    group.querySelectorAll(':scope > div').forEach(btn => {
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
  searchButton ?.addEventListener('click', updateSearch);
}

function closeAllItems() {
  document.querySelectorAll('.page-items .item.open')
    .forEach(item => item.classList.remove('open'));
}

function initItemPanels() {
  document.addEventListener('click', e => {
    if (e.target.closest('.item-content')) return;

    closeAllItems();

    const item = e.target.closest('.page-items .item');
    if (item) item.classList.add('open');
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeAllItems();
  });
}


addDecadeClasses();
cloneContent();
sortItems();
initFilters();
initSearch();
initItemPanels();