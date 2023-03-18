const filterButtons = document.querySelectorAll(".filter-button");
const itemList = document.querySelector('.item-list');

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

        // Remove all items from the item list
        itemList.innerHTML = '';

        // Show or hide items based on filter
        items.forEach((item) => {
          if (filter === "all" || item.filter === filter) {
            const listItem = document.createElement('li');
            listItem.className = `item ${item.filter}`;
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
            itemList.appendChild(listItem);
          }
        });
      });
    });
  });
