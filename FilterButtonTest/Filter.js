// Create no results message element
const noResultsMessage = document.createElement('div');
noResultsMessage.className = 'no-results-message';
noResultsMessage.textContent = 'No results found';
const typeFilterContainer = document.querySelector('.type-filter');
const gameFilterContainer = document.querySelector('.game-filter');
const itemList = document.querySelector('.item-list');
itemList.parentNode.insertBefore(noResultsMessage, itemList.nextSibling);

function createListItem(item) {
  console.log('Creating list item for', item);

  const listItem = document.createElement('li');
  listItem.classList.add('item');
  listItem.classList.add('show');

  if (item.typeFilter) {
    item.typeFilter = item.typeFilter.map(filter => filter.toLowerCase());
    item.typeFilter.forEach(filter => {
      listItem.classList.add(`${filter}-item`);
    });
    listItem.dataset.typeFilter = item.typeFilter;
  }

  if (item.gameFilter) {
    item.gameFilter = item.gameFilter.map(filter => filter.toLowerCase());
    item.gameFilter.forEach(filter => {
      listItem.classList.add(`${filter}-item`);
    });
    listItem.dataset.gameFilter = item.gameFilter;
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

    // Add click event listeners to type filter buttons
    typeFilters.forEach(filter => {
      const button = document.querySelector('.type-filter button[data-filter="' + filter + '"]');
      button.addEventListener('click', () => {
        toggleButtonActive(button);

        // Check if all type filters are active
        const allTypeFilterActive = checkAllFiltersActive(typeFilters, '.type-filter button');
        if (allTypeFilterActive) {
          toggleButtonActive(document.querySelector('.type-filter button[data-filter="alltype"]'));
        }

        // Update item visibility
        updateItemVisibility(items);
      });
    });

    // Add click event listeners to game filter buttons
    gameFilters.forEach(filter => {
      const button = document.querySelector(`.game-filter button[data-filter="${filter}"]`);
      button.addEventListener('click', () => {
        toggleButtonActive(button);

        // Check if all game filters are active
        const allGameFilterActive = checkAllFiltersActive(gameFilters, '.game-filter button');
        if (allGameFilterActive) {
          toggleButtonActive(document.querySelector('.game-filter button[data-filter="allgame"]'));
        }

        // Update item visibility
        updateItemVisibility(items);
      });
    });

    // Add click event listener to "all type filters" button
    const allTypeButton = document.querySelector('.type-filter button[data-filter="alltype"]');
    allTypeButton.addEventListener('click', () => {
      toggleButtonActive(allTypeButton);

      // Deactivate all other type filter buttons
      const typeFilterButtons = document.querySelectorAll('.type-filter button:not([data-filter="alltype"])');
      typeFilterButtons.forEach(button => {
        deactivateButton(button);
      });

      // Update item visibility
      updateItemVisibility(items);
    });

    // Add click event listener to "all game filters" button
    const allGameButton = document.querySelector('.game-filter button[data-filter="allgame"]');
    allGameButton.addEventListener('click', () => {
      toggleButtonActive(allGameButton);

      // Deactivate all other game filter buttons
      const gameFilterButtons = document.querySelectorAll('.game-filter button:not([data-filter="allgame"])');
      gameFilterButtons.forEach(button => {
        deactivateButton(button);
      });

      // Update item visibility
      updateItemVisibility(items);
    });

    function toggleButtonActive(button) {
      button.classList.toggle('active');
    }

    function deactivateButton(button) {
      button.classList.remove('active');
    }

    function checkAllFiltersActive(filters, selector) {
      const buttons = document.querySelectorAll(`${selector}[data-filter]:not([data-filter="all"])`);
      const activeFilters = Array.from(buttons).filter(button => button.classList.contains('active')).map(button => button.dataset.filter);
      return activeFilters.length === filters.length;
    }

    function updateItemVisibility(items) {
      let visibleItemCount = 0;

      items.forEach(item => {
        const listItem = document.querySelector(`li[data-type-filter*="${item.typeFilter}"][data-game-filter*="${item.gameFilter}"]`);

        if (allGameButton.classList.contains('active')) {
          if (item.typeFilter.includes(getActiveTypeFilter())) {
            listItem.classList.add('show');
            listItem.classList.remove('hide');
            visibleItemCount++;
          } else {
            listItem.classList.add('hide');
            listItem.classList.remove('show');
          }
        } else if (allTypeButton.classList.contains('active')) {
          if (item.gameFilter.includes(getActiveGameFilter())) {
            listItem.classList.add('show');
            listItem.classList.remove('hide');
            visibleItemCount++;
          } else {
            listItem.classList.add('hide');
            listItem.classList.remove('show');
          }
        } else {
          if (item.typeFilter.includes(getActiveTypeFilter()) && item.gameFilter.includes(getActiveGameFilter())) {
            listItem.classList.add('show');
            listItem.classList.remove('hide');
            visibleItemCount++;
          } else {
            listItem.classList.add('hide');
            listItem.classList.remove('show');
          }
        }
      });

      // Show no results message if no items are visible
      if (visibleItemCount === 0) {
        noResultsMessage.style.display = 'block';
      } else {
        noResultsMessage.style.display = 'none';
      }
    }

    function getActiveTypeFilter() {
      const activeTypeButton = document.querySelector('.type-filter button.active:not([data-filter="alltype"])');
      if (activeTypeButton) {
        return activeTypeButton.dataset.filter;
      } else {
        return '';
      }
    }

    function getActiveGameFilter() {
      const activeGameButton = document.querySelector('.game-filter button.active:not([data-filter="allgame"])');
      if (activeGameButton) {
        return activeGameButton.dataset.filter;
      } else {
        return '';
      }
    }

    // Create list items
    items.forEach(item => {
      const listItem = createListItem(item);
      itemList.appendChild(listItem);
    });

    // Update item visibility on page load
    updateItemVisibility(items);
  });
