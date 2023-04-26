// Create no results message element
const noResultsMessage = document.createElement('div');
noResultsMessage.className = 'no-results-message';
noResultsMessage.textContent = 'No results found';
const typeFilterContainer = document.querySelector('.type-filter');
const gameFilterContainer = document.querySelector('.game-filter');
const itemList = document.querySelector('.item-list');
itemList.appendChild(noResultsMessage);

function createListItem(item) {	
  const listItem = document.createElement('li');
  listItem.classList.add('item');
  listItem.classList.add(`${item.typeFilter}-item`);
  listItem.classList.add(`${item.gameFilter}-item`);
  listItem.classList.add('show');
  listItem.typeFilter = item.typeFilter;
  listItem.gameFilter = item.gameFilter;
  const link = document.createElement('a');	
  link.href = item.link;	
  link.style.color = 'blue';	
  link.style.display = 'inline';	
  link.setAttribute('target', '_blank'); // Add this line to set the target attribute	
  const linkText = document.createTextNode(item.name);	
  link.appendChild(linkText);	
  listItem.appendChild(link);	
  const separator = document.createElement('strong');	
  separator.appendChild(document.createTextNode(' - '));	
  listItem.appendChild(separator);	
  const description = document.createElement('span');	
  description.style.display = 'inline-flex';	
  description.style.flexDirection = 'column';	
  const descriptionText = document.createTextNode(item.description);	
  description.appendChild(descriptionText);	
  listItem.appendChild(description);	
  return listItem;
}

// Load data from Filter.json
fetch('Filter.json')
  .then(response => response.json())
  .then(data => {
    // Store the data in variables
    const items = data.items;
    const typeFilters = data.typeFilters;
    const gameFilters = data.gameFilters;

    // Add type filter buttons
    typeFilters.forEach((filter) => {
      const button = document.createElement('button');
      button.className = 'filter-button type-filter-button';
      button.dataset.filter = filter.filter;
      button.textContent = filter.name;
      typeFilterContainer.appendChild(button);
    });

    // Add game filter buttons
    gameFilters.forEach((filter) => {
      const button = document.createElement('button');
      button.className = 'filter-button game-filter-button';
      button.dataset.filter = filter.filter;
      button.textContent = filter.name;
      gameFilterContainer.appendChild(button);
    });

    const typeFilterButtons = document.querySelectorAll(".type-filter-button");
    const gameFilterButtons = document.querySelectorAll(".game-filter-button");
    const filterButtons = [...typeFilterButtons, ...gameFilterButtons];

    // Add active class to All filter buttons by default
    filterButtons.forEach((button) => {
      if (button.dataset.filter === "alltype" || button.dataset.filter === "allgame") {
        button.classList.add("active");
      }
    });

    // Populate the itemList with the items
    items.forEach((item) => {
      const li = document.createElement('li');
      li.className = 'item';
      li.dataset.id = item.id;
      li.dataset.type = item.type;
      li.dataset.game = item.game;
      li.typeFilter = item.type;
      li.gameFilter = item.game;
      li.innerHTML = `<h3>${item.title}</h3><p>${item.description}</p>`;
      itemList.appendChild(li);
    });

    // Update items visibility when filter buttons are clicked
    typeFilterContainer.addEventListener('click', (event) => {
      if (event.target.classList.contains('type-filter-button')) {
        toggleActive(event.target);
        updateItemsVisibility();
      }
    });

    gameFilterContainer.addEventListener('click', (event) => {
      if (event.target.classList.contains('game-filter-button')) {
        toggleActive(event.target);
        updateItemsVisibility();
      }
    });

    // Simulate click event on All filters to show all items on page load
    const allTypeButton = document.querySelector('.type-filter-button[data-filter="alltype"]');
    const allGameButton = document.querySelector('.game-filter-button[data-filter="allgame"]');
    allTypeButton.click();
    allGameButton.click();
  });

function updateItemsVisibility() {
  const activeGameButtons = document.querySelectorAll('.game-filter-button.active');
  const activeTypeButtons = document.querySelectorAll('.type-filter-button.active');

  // Get the active game and type filters
  const activeGameFilters = Array.from(activeGameButtons).map(button => button.dataset.filter);
  const activeTypeFilters = Array.from(activeTypeButtons).map(button => button.dataset.filter);

  // Show items based on active filters
  const allItems = itemList.querySelectorAll('.item');
  allItems.forEach(item => {
    const matchesTypeFilter = activeTypeFilters.includes('alltype') || item.typeFilter === item.typeFilter && activeTypeFilters.includes(item.typeFilter);
    const matchesGameFilter = activeGameFilters.includes('allgame') || item.gameFilter === item.gameFilter && activeGameFilters.includes(item.gameFilter);

    if (matchesTypeFilter && matchesGameFilter) {
      item.classList.add('show');
    } else {
      item.classList.remove('show');
    }
  });

  // Show/hide no results message
  if (itemList.querySelectorAll('.item.show').length === 0) {
    noResultsMessage.style.display = 'block';
  } else {
    noResultsMessage.style.display = 'none';
  }
}
    // Initial update of item visibility
    updateItemsVisibility();

    // Add click event listener to each filter button
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Toggle active class for clicked filter button
        button.classList.toggle("active");

        // If "All" button is clicked, deactivate other buttons in the same group
        if (button.dataset.filter === "allgame" || button.dataset.filter === "alltype") {
          const buttonFilterGroup = button.classList.contains('type-filter-button') ? '.type-filter-button' : '.game-filter-button';
          const filterButtonsInGroup = document.querySelectorAll(buttonFilterGroup);
          filterButtonsInGroup.forEach((btn) => {
            if (btn !== button) {
              btn.classList.remove("active");
            }
          });
        } else {
          // If any other button is clicked, deactivate the corresponding "All" button
          const allFilter = button.classList.contains('type-filter-button') ? 'alltype' : 'allgame';
          document.querySelector(`[data-filter="${allFilter}"]`).classList.remove("active");
        }

        // Update items visibility
        updateItemsVisibility();
      });
    });
