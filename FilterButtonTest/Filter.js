const filterContainer = document.querySelector('.filter');
const itemList = document.querySelector('.item-list');

function setActiveButton(button) {
  const activeButton = document.querySelector('.game-filter .active');
  if (activeButton) {
    activeButton.classList.remove('active');
  }
  button.classList.add('active');
}

function createListItem(item) {
  const listItem = document.createElement('li');
  listItem.className = `item ${item.filter} show`;
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
  const gameFilterButtons = document.querySelectorAll('.game-filter button');

gameFilterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterItems(filter);
    setActiveButton(button);
  });
});

  
function filterItems(filter) {
  console.log("Filter selected:", filter);
  const items = document.querySelectorAll('.item');
  items.forEach((item) => {
    const itemFilters = item.getAttribute('data-filter');
    if (itemFilters) { // Check if the attribute exists
      itemFilters = itemFilters.split(',');
      let show = false;
      if (filter === 'All Games') {
        show = true;
      } else {
        itemFilters.forEach((itemFilter) => {
          if (itemFilter === filter) {
            show = true;
          }
        });
      }
      if (show) {
        item.classList.add('show');
      } else {
        item.classList.remove('show');
      }
    }
  });
}

  
  return listItem;
}

// Load data from Filter.json
fetch('Filter.json')
  .then(response => response.json())
  .then(data => {
    // Store the data in variables
    const items = data.items;
    const filters = data.filters;

    // Add filter buttons
    filters.forEach((filter) => {
      const button = document.createElement('button');
      button.className = 'filter-button';
      button.dataset.filter = filter.filter;
      button.textContent = filter.name;
      filterContainer.appendChild(button);
    });

    const filterButtons = document.querySelectorAll(".filter-button");

    // Add active class to All filter button by default
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

    // Add click event listener to each filter button
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        // Remove active class from all filter buttons
        filterButtons.forEach((button) => {
          button.classList.remove("active");
        });

        // Add active class to clicked filter button
        button.classList.add("active");

        // Show or hide items based on filter
        items.forEach((item) => {
          const listItem = itemList.querySelector(`.item.${item.filter}`);
          if (filter === "all") {
            listItem.classList.add("show");
          } else if (item.filter === filter) {
            listItem.classList.add("show");
          } else {
            listItem.classList.remove("show");
          }
        });

        // Hide items not matching the filter
        const hiddenItems = document.querySelectorAll(`.item:not(.${filter})`);
        hiddenItems.forEach((item) => {
          item.classList.remove("show");
        });

        // Show all items on clicking the "All" filter
        if (filter === "all") {
          const allItems = document.querySelectorAll(".item");
          allItems.forEach((item) => {
            item.classList.add("show");
          });
        }
      });
    });
  });

