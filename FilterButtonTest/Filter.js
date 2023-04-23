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
  listItem.className = `item ${item.typeFilter} ${item.gameFilter} show`;	
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
  const activeTypeButton = document.querySelector('.type-filter-button.active');
  const activeGameButton = document.querySelector('.game-filter-button.active');
  const activeTypeFilter = activeTypeButton ? activeTypeButton.dataset.filter : 'all';
  const activeGameFilter = activeGameButton ? activeGameButton.dataset.filter : 'all';
  
  let hasVisibleItems = false; // Add this variable to track if there are visible items
  
  // Show items that match the active filters
  items.forEach((item) => {
    const listItem = itemList.querySelector(`.item.${item.typeFilter}.${item.gameFilter}`);
 
    if ((activeTypeFilter === 'all' || item.typeFilter === activeTypeFilter) && 
        (activeGameFilter === 'all' || item.gameFilter === activeGameFilter)) {
      listItem.classList.add('show');
      hasVisibleItems = true; // Set the variable to true if an item is visible
    } else {
      listItem.classList.remove('show');
    }
  });

  // Show/hide no results message
  if (hasVisibleItems) { // Check if there are visible items before hiding the message
    noResultsMessage.style.display = 'none';
  } else {
    noResultsMessage.style.display = 'block';
  }

  // Automatically select "All" filters if no filters are selected
  if (!document.querySelector('.type-filter-button.active') && !document.querySelector('.game-filter-button.active')) {
    document.querySelector('.type-filter-button[data-filter="all"]').classList.add('active');
    document.querySelector('.game-filter-button[data-filter="all"]').classList.add('active');
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
