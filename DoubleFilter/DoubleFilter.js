const gameFilter = document.querySelectorAll('.gameFilter');
const modFilter = document.querySelectorAll('.modFilter');
const modList = document.querySelector('.modList');
const defaultGameFilter = '';
const defaultModFilter = '';

fetch('DoubleFilter.json')
  .then(response => response.json())
  .then(data => {
    const modData = data.mods;
    let filteredMods = modData.filter(mod => mod.gameType === defaultGameFilter);

    renderModList(filteredMods);

    gameFilter.forEach(filter => {
      filter.addEventListener('click', () => {
        const selectedFilter = filter.dataset.game;

        filteredMods = modData.filter(mod => mod.gameType === selectedFilter);

        renderModList(filteredMods);
      });
    });

    modFilter.forEach(filter => {
      filter.addEventListener('click', () => {
        const selectedFilter = filter.dataset.mod;

        if (selectedFilter === defaultModFilter) {
          filteredMods = modData.filter(mod => mod.gameType === defaultGameFilter);
        } else {
          filteredMods = modData.filter(mod => mod.modType === selectedFilter && mod.gameType === defaultGameFilter);
        }

        renderModList(filteredMods);
      });
    });
  })
  .catch(error => console.log('Error:', error));

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
