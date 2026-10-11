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