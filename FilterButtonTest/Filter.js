const typeFilterContainer = document.querySelector('.type-filter');
const gameFilterContainer = document.querySelector('.game-filter');
const itemList = document.querySelector('.item-list');

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
  
  return listItem; // Add this line to return the created list item
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

    if (listItem) {
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
    }
  });

  // Show/hide no results message
  const visibleItems = itemList.querySelectorAll('.item.show');
  if (visibleItems.length === 0) {
    noResultsMessage.style.display = 'block';
  } else {
    noResultsMessage.style.display = 'none';
  }
}


// Add click event listener to each filter button
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const buttonFilterGroup = button.classList.contains('type-filter-button') ? '.type-filter-button' : '.game-filter-button';
    const filterButtonsInGroup = document.querySelectorAll(buttonFilterGroup);

    // Toggle active class for clicked filter button
    button.classList.toggle("active");

    // Update items visibility
    updateItemsVisibility();
   });
  });
 });

// Create no results message element
const noResultsMessage = document.createElement('div');
noResultsMessage.className = 'no-results-message';
noResultsMessage.textContent = 'No results found';

// Append no results message to item list container
itemList.parentNode.appendChild(noResultsMessage);
