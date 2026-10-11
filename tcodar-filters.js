const groups = document.querySelectorAll('.page-filters .filter');
const items = document.querySelectorAll('.page-items .item');

const filterClass = el => [...el.classList].find(c => c !== 'active');

function updateItems() {
  const activeByGroup = [...groups]
    .map(group => [...group.querySelectorAll(':scope > div.active')].map(filterClass))
    .filter(classes => classes.length > 0);

  items.forEach(item => {
    const visible = activeByGroup.every(classes =>
      classes.some(c => item.classList.contains(c))
    );
    item.style.display = visible ? 'flex' : 'none';
  });
}

groups.forEach(group => {
  group.querySelectorAll(':scope > div').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      updateItems();
    });
  });
});

updateItems();

document.addEventListener('click', e => {
  if (e.target.closest('.item-body')) return;

  document.querySelectorAll('.page-items .item.open')
    .forEach(item => item.classList.remove('open'));

  const item = e.target.closest('.page-items .item');
  if (item) item.classList.add('open');
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.page-items .item.open')
      .forEach(item => item.classList.remove('open'));
  }
});

document.querySelectorAll('.tabsystem').forEach(system => {
  const tabs = system.querySelectorAll('.tab');
  const contents = system.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabId = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      contents.forEach(content => {
        content.classList.toggle('active', content.dataset.tab === tabId);
      });
    });
  });
});

document.querySelectorAll('.page-items .item').forEach(item => {
  const content = item.querySelector('.item-content');
  if (!content) return;

  const clones = [...item.querySelectorAll(':scope > img, :scope > .item-title')]
    .map(el => {
      const clone = el.cloneNode(true);
      clone.classList.remove('name');
      return clone;
    });

  content.prepend(...clones);
});

const searchInput = document.querySelector('#site-search');
const searchButton = document.querySelector('.page-search button');

const normalize = str =>
  str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

function searchItems() {
  const query = normalize(searchInput.value.trim());

  document.querySelectorAll('.page-items .item').forEach(item => {
    const name = normalize(item.querySelector(':scope > .item-title') ? .textContent || '');
    item.classList.toggle('search-hidden', !name.includes(query));
  });
}

searchInput.addEventListener('input', searchItems);
searchButton.addEventListener('click', searchItems);

const list = document.querySelector('.page-items');
const cards = [...list.querySelectorAll(':scope > .item')];

const titleOf = item =>
  item.querySelector(':scope > .item-title') ? .textContent.trim() || '';

cards.sort((a, b) =>
  titleOf(a).localeCompare(titleOf(b), 'fr', {
    sensitivity: 'base'
  })
);

cards.forEach(card => list.appendChild(card));