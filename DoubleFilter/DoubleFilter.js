const gameFilter = document.querySelectorAll('.gameFilter');
const modFilter = document.querySelectorAll('.modFilter');
const modList = document.querySelector('.modList');
const defaultGameFilter = 'all';
const defaultModFilter = 'all';

fetch('DoubleFilter.json')
  .then(response => response.json())
  .then(modData => {
    let filteredMods = Object.values(modData).filter(mod => mod.game === defaultGameFilter);

    renderModList(filteredMods);

    gameFilter.forEach(filter => {
      filter.addEventListener('click', () => {
        const selectedFilter = filter.dataset.game;

        filteredMods = Object.values(modData).filter(mod => mod.game === selectedFilter);

        renderModList(filteredMods);
      });
    });

    modFilter.forEach(filter => {
      filter.addEventListener('click', () => {
        const selectedFilter = filter.dataset.mod;

        if (selectedFilter === defaultModFilter) {
          filteredMods = Object.values(modData).filter(mod => mod.game === defaultGameFilter);
        } else {
          filteredMods = Object.values(modData).filter(mod => mod.type === selectedFilter && mod.game === defaultGameFilter);
        }

        renderModList(filteredMods);
      });
    });
  })
  .catch(error => console.log('Error loading DoubleFilter.json:', error));

function renderModList(mods) {
  modList.innerHTML = '';

  mods.forEach(mod => {
    const modListItem = document.createElement('li');

    const modLink = document.createElement('a');
    modLink.href = mod.link;
    modLink.target = '_blank';
    modLink.textContent = mod.name;

    const modDescription = document.createElement('span');
    modDescription.textContent = ` - ${mod.description}`;

    modListItem.appendChild(modLink);
    modListItem.appendChild(modDescription);

    modList.appendChild(modListItem);
  });
}
