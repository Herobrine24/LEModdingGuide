// Create no results message element
const noResultsMessage = document.createElement('div');
noResultsMessage.className = 'no-results-message';
noResultsMessage.textContent = 'No results found';
const typeFilterContainer = document.querySelector('.type-filter');
const gameFilterContainer = document.querySelector('.game-filter');
const itemList = document.querySelector('.item-list');
itemList.parentNode.appendChild(noResultsMessage);

function createListItem(item) {	
  const listItem = document.createElement('li');	
  listItem.className = `item ${item.typeFilter}-item ${item.gameFilter}-item show`;	
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
  
  // Add separate classes for typeFilter and gameFilter
  listItem.classList.add(`${item.typeFilter}-item`);
  listItem.classList.add(`${item.gameFilter}-item`);

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
  const activeGameButton = document.querySelector('.game-filter-button.active');
  const activeTypeButton = document.querySelector('.type-filter-button.active');

  // Get the active game and type filters
  const activeGameFilter = activeGameButton ? activeGameButton.dataset.filter : 'all';
  const activeTypeFilter = activeTypeButton ? activeTypeButton.dataset.filter : 'all';

  // Show all items by default
  const allItems = itemList.querySelectorAll('.item');
  allItems.forEach((item) => {
    item.classList.add('show');
  });

  // Hide items that do not match the active filters
  const gameFilterSelected = activeGameFilter !== 'all';
  const typeFilterSelected = activeTypeFilter !== 'all';
  const filteredItems = gameFilterSelected && typeFilterSelected
    ? itemList.querySelectorAll(`.item:not(.${activeGameFilter}-item.${activeTypeFilter}-item)`)
    : gameFilterSelected
    ? itemList.querySelectorAll(`.item:not(.${activeGameFilter}-item)`)
    : typeFilterSelected
    ? itemList.querySelectorAll(`.item:not(.${activeTypeFilter}-item)`)
    : [];
  filteredItems.forEach((item) => {
    item.classList.remove('show');
  });

  // Show/hide no results message
  if (itemList.querySelectorAll('.item.show').length === 0) {
    noResultsMessage.style.display = 'block';
  } else {
    noResultsMessage.style.display = 'none';
  }

  // Automatically select "All" filters if no filters are selected
  const activeTypeFilterButtons = document.querySelectorAll('.type-filter-button.active');
  const activeGameFilterButtons = document.querySelectorAll('.game-filter-button.active');

  if (activeTypeFilterButtons.length === 0) {
    document.querySelector('.type-filter-button[data-filter="all"]').classList.add('active');
  } else if (activeTypeFilterButtons.length > 1) {
    activeTypeFilterButtons.forEach((button) => {
      if (button.dataset.filter !== 'all') {
        button.classList.remove('active');
      }
    });
  }

  if (activeGameFilterButtons.length === 0) {
    document.querySelector('.game-filter-button[data-filter="all"]').classList.add('active');
  } else if (activeGameFilterButtons.length > 1) {
    activeGameFilterButtons.forEach((button) => {
      if (button.dataset.filter !== 'all') {
        button.classList.remove('active');
      }
    });
  }
}

  
// Add click event listener to each filter button
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const buttonFilterGroup = button.classList.contains('type-filter-button') ? '.type-filter-button' : '.game-filter-button';
    const filterButtonsInGroup = document.querySelectorAll(buttonFilterGroup);

    // Toggle active class for clicked filter button
    button.classList.toggle("active");

    // Check if no other type filter buttons are active and add "active" class to "All" button
    const activeTypeFilterButtons = document.querySelectorAll('.type-filter-button.active');
    if (activeTypeFilterButtons.length === 0) {
      document.querySelector('.type-filter-button[data-filter="all"]').classList.add("active");
    } else {
      document.querySelector('.type-filter-button[data-filter="all"]').classList.remove("active");
    }

    // Update items visibility
    updateItemsVisibility();
  });
});
});

// Append no results message to item list container
itemList.parentNode.appendChild(noResultsMessage);
