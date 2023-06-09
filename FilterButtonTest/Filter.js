// Create no results message element
const noResultsMessage = document.createElement('div');
noResultsMessage.className = 'no-results-message';
noResultsMessage.textContent = 'No results found';
const typeFilterContainer = document.querySelector('.type-filter');
const gameFilterContainer = document.querySelector('.game-filter');
const itemList = document.querySelector('.item-list');
itemList.parentNode.insertBefore(noResultsMessage, itemList.nextSibling); // add noResultsMessage as a sibling of itemList
const listViewButton = document.querySelector('.list-view-button');
const gridViewButton = document.querySelector('.grid-view-button');

// Set default view to list
itemList.classList.add('list-view');

// Add click event listener to list view button
listViewButton.addEventListener('click', () => {
  if (!itemList.classList.contains('list-view')) {
    itemList.classList.add('list-view');
    itemList.classList.remove('grid-view');
    listViewButton.classList.add('active');
    gridViewButton.classList.remove('active');
  }
});

// Add click event listener to grid view button
gridViewButton.addEventListener('click', () => {
  if (!itemList.classList.contains('grid-view')) {
    itemList.classList.add('grid-view');
    itemList.classList.remove('list-view');
    gridViewButton.classList.add('active');
    listViewButton.classList.remove('active');
  }
});


// Verify that the noResultsMessage element is the next sibling of the itemList element
if (itemList.nextSibling !== noResultsMessage) {
  console.error('noResultsMessage element is not properly positioned as a sibling of the itemList element');
}

function createListItem(item) {
console.log('Creating list item for', item);

const listItem = document.createElement('li');
listItem.classList.add('item');
listItem.classList.add('show');

if (item.typeFilter) { // Updated property name
item.typeFilter = item.typeFilter.map(filter => filter.toLowerCase()); // Updated property name
item.typeFilter.forEach(filter => {
listItem.classList.add(`${filter}-item`);
});
listItem.dataset.typeFilter = item.typeFilter; // set the dataset property to the array
}

if (item.gameFilter) { // Updated property name
item.gameFilter = item.gameFilter.map(filter => filter.toLowerCase()); // Updated property name
item.gameFilter.forEach(filter => {
listItem.classList.add(`${filter}-item`);
});
listItem.dataset.gameFilter = item.gameFilter; // set the dataset property to the array
}

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

// Select "allgame" and "alltype" by default
const allGameButton = document.querySelector('[data-filter="allgame"]');
const allTypeButton = document.querySelector('[data-filter="alltype"]');
allGameButton.classList.add("active");
allTypeButton.classList.add("active");
// Show all items on page load
items.forEach((item) => {
const listItem = createListItem(item);
itemList.appendChild(listItem);
});

function updateItemsVisibility() {
  console.log('Updating item visibility');
  const activeGameButtons = document.querySelectorAll('.game-filter-button.active');
  const activeTypeButtons = document.querySelectorAll('.type-filter-button.active');
  const activeGameFilters = Array.from(activeGameButtons).map(button => button.dataset.filter);
  const activeTypeFilters = Array.from(activeTypeButtons).map(button => button.dataset.filter);

  console.log('Active game filters:', activeGameFilters);
  console.log('Active type filters:', activeTypeFilters);

  // Check if no type filters are active and select "alltype" if true
  if (activeTypeFilters.length === 0) {
    allTypeButton.classList.add("active");
    activeTypeFilters.push("alltype");
  }

  // Check if no game filters are active and select "allgame" if true
  if (activeGameFilters.length === 0) {
    allGameButton.classList.add("active");
    activeGameFilters.push("allgame");
  }

  const allItems = itemList.querySelectorAll('.item');
  let visibleItemCount = 0; // added variable to count visible items
  allItems.forEach(item => {
    console.log('Item:', item);
    console.log('Type filter:', item.dataset.typeFilter);
    console.log('Game filter:', item.dataset.gameFilter);

    let matchesTypeFilterItem = false;
    let matchesGameFilterItem = false;

    if (activeTypeFilters.includes('alltype')) {
      matchesTypeFilterItem = true;
    } else if (item.dataset.typeFilter) {
      const itemFilters = item.dataset.typeFilter.split(' ');
      matchesTypeFilterItem = activeTypeFilters.some(filter => itemFilters.includes(filter));
    }

    if (activeGameFilters.includes('allgame')) {
      matchesGameFilterItem = true;
    } else if (item.dataset.gameFilter) {
      const itemFilters = item.dataset.gameFilter.split(' ');
      matchesGameFilterItem = activeGameFilters.some(filter => itemFilters.includes(filter));
    }

    console.log('Matches type filter?', matchesTypeFilterItem, 'Matches game filter?', matchesGameFilterItem);

    // show or hide list items based on matching filters
    if (matchesTypeFilterItem && matchesGameFilterItem) {
      item.classList.add('show');
      item.classList.remove('hide');
      visibleItemCount++; // increment visible item count
    } else {
      item.classList.add('hide');
      item.classList.remove('show');
    }
  });

  // show or hide the noResultsMessage based on the visible item count
  if (visibleItemCount > 0) {
    noResultsMessage.classList.add('hide');
    noResultsMessage.classList.remove('show');
  } else {
    noResultsMessage.classList.add('show');
    noResultsMessage.classList.remove('hide');
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
});
