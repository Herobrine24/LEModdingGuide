const filterButtons = document.querySelectorAll(".filter-button");
const itemList = document.querySelector('.item-list');

function createListItem(item) {
  const listItem = document.createElement('li');
  listItem.className = `item ${item.filter} show`;
  const link = document.createElement('a');
  link.href = item.link;
  link.style.color = 'blue';
  link.style.display = 'inline';
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
    // Store the data in an array
    const items = data.items;

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
          if (filter === "all" || item.filter === filter) {
            listItem.classList.add("show");
          } else {
            listItem.classList.remove("show");
          }
        });
      });
    });

    // Add a fix to show the correct items on load
    const activeFilter = document.querySelector('.filter-button.active').dataset.filter;
    items.forEach((item) => {
      const listItem = itemList.querySelector(`.item.${item.filter}`);
      if (activeFilter === "all" || item.filter === activeFilter) {
        listItem.classList.add("show");
      } else {
        listItem.classList.remove("show");
      }
    });
  });
