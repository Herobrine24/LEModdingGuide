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
  listItem.classList.add(`item`, `${item.typeFilter}-item`, `${item.gameFilter}-item`, `show`);
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
  const activeGameButtons = document.querySelectorAll('.game-filter-button.active');
  const activeTypeButtons = document.querySelectorAll('.type-filter-button.active');

  // Get the active game and type filters
  const activeGameFilters = Array.from(activeGameButtons).map(button => button.dataset.filter);
  const activeTypeFilters = Array.from(activeTypeButtons).map(button => button.dataset.filter);

  // Show all items by default
  const allItems = itemList.querySelectorAll('.item');
  allItems.forEach(item => item.classList.add('show'));

  // Hide items that do not match the active filters
  const filteredItems = Array.from(allItems).filter(item => {
    const matchesGameFilter = activeGameFilters.includes(item.dataset.gameFilter) || activeGameFilters.length === 0;
    const matchesTypeFilter = activeTypeFilters.includes(item.dataset.typeFilter) || activeTypeFilters.length === 0;
    return matchesGameFilter && matchesTypeFilter;
  });
  filteredItems.forEach(item => item.classList.remove('show'));

  // Show/hide no results message
  if (itemList.querySelectorAll('.item.show').length === 0) {
    noResultsMessage.style.display = 'block';
  } else {
    noResultsMessage.style.display = 'none';
  }

  // Automatically select "All" filters if no filters are selected
  if (activeTypeButtons.length === 0) {
    document.querySelector('.type-filter-button[data-filter="alltype"]').classList.add('active');
  }
  if (activeGameButtons.length === 0) {
    document.querySelector('.game-filter-button[data-filter="allgame"]').classList.add('active');
  }

  // Unselect "All" filter button if another gameFilter is selected
  if (activeGameButtons.length > 0 && !activeGameFilters.includes('allgame')) {
    document.querySelector('.game-filter-button[data-filter="allgame"]').classList.remove('active');
  }
}
  
// Add click event listener to each filter button
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const buttonFilterGroup = button.classList.contains('type-filter-button') ? '.type-filter-button' : '.game-filter-button';
    const filterButtonsInGroup = document.querySelectorAll(buttonFilterGroup);

    // Toggle active class for clicked filter button
    button.classList.toggle("active");

    // Remove active class from "All" button if another game filter button is selected
    if (buttonFilterGroup === '.game-filter-button' && button.dataset.filter !== 'allgame') {
      document.querySelector('.game-filter-button[data-filter="allgame"]').classList.remove("active");
    }

    // Check if no other type filter buttons are active and add "active" class to "All" button
    const activeTypeFilterButtons = document.querySelectorAll('.type-filter-button.active');
    if (activeTypeFilterButtons.length === 0) {
      document.querySelector('.type-filter-button[data-filter="alltype"]').classList.add("active");
    } else {
      document.querySelector('.type-filter-button[data-filter="alltype"]').classList.remove("active");
    }

    // Update items visibility
    updateItemsVisibility();
  });
});
});
