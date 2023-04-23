const typeFilterContainer = document.querySelector('.type-filter');
const gameFilterContainer = document.querySelector('.game-filter');
const itemList = document.querySelector('.item-list');

function createListItem(item) {
  // ... (no changes in this function)
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
      if (button.dataset.filter === "all") {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });

    // Show all items on page load
    items.forEach((item) => {
      const listItem = createListItem(item);
      itemList.appendChild(listItem);
    });

    function updateItemsVisibility() {
      items.forEach((item) => {
        const listItem = itemList.querySelector(`.item.${item.typeFilter}.${item.gameFilter}`);
        const activeTypeButton = document.querySelector('.type-filter-button.active');
        const activeGameButton = document.querySelector('.game-filter-button.active');
        const activeTypeFilter = activeTypeButton.dataset.filter;
        const activeGameFilter = activeGameButton.dataset.filter;

        if (activeTypeFilter === 'all' && activeGameFilter === 'all') {
          listItem.classList.add("show");
        } else if (activeTypeFilter === 'all' && item.gameFilter === activeGameFilter) {
          listItem.classList.add("show");
        } else if (activeGameFilter === 'all' && item.typeFilter === activeTypeFilter) {
          listItem.classList.add("show");
        } else if (item.typeFilter === activeTypeFilter && item.gameFilter === activeGameFilter) {
          listItem.classList.add("show");
        } else {
          listItem.classList.remove("show");
        }
      });
    }

    // Add click event listener to each filter button
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const buttonFilterGroup = button.classList.contains('type-filter-button') ? '.type-filter-button' : '.game-filter-button';
        const filterButtonsInGroup = document.querySelectorAll(buttonFilterGroup);
        
        // Remove active class from all filter buttons in the same group
        filterButtonsInGroup.forEach((btn) => {
          btn.classList.remove("active");
        });
        
        // Add active class to clicked filter button
        button.classList.add("active");
        
        // Update items visibility
        updateItemsVisibility();
      });
    });

    // Initial update of items visibility
    updateItemsVisibility();
  });
