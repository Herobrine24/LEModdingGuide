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

            // Hide all items
            items.forEach((item) => {
                const listItem = itemList.querySelector(`.item.${item.typeFilter}.${item.gameFilter}`);
                if (listItem) {
                    listItem.classList.remove('show');
                    listItem.classList.add('hide');
                }
            });

            // Show items that match the active filters
            items.forEach((item) => {
                const listItem = itemList.querySelector(`.item.${item.typeFilter}.${item.gameFilter}`);
                if (listItem && ((activeTypeFilter === 'all' || item.typeFilter === activeTypeFilter) && (activeGameFilter === 'all' || item.gameFilter === activeGameFilter))) {
                    listItem.classList.remove('hide');
                    listItem.classList.add('show');
                }
            });

            // Show no results message if no items are visible
            const visibleItems = itemList.querySelectorAll('.item.show');
            if (visibleItems.length === 0) {
                noResultsMessage.style.display = 'block';
            } else {
                noResultsMessage.style.display = 'none';
            }
        }

        function updateFilterButtons(event) {
            const button = event.target;
            const isTypeFilter = button.classList.contains('type-filter-button');
            const isGameFilter = button.classList.contains('game-filter-button');

            if (isTypeFilter) {
                // Update active type filter button
                const typeFilterButtons = document.querySelectorAll('.type-filter-button');
                typeFilterButtons.forEach((filterButton) => {
                    if (filterButton === button) {
                        filterButton.classList.add('active');
                    } else if (filterButton.dataset.filter === 'all') {
                        filterButton.classList.remove('active');
                    } else {
                        filterButton.classList.remove('active');
                    }
                });
            } else if (isGameFilter) {
                // Update active game filter button
                const gameFilterButtons = document.querySelectorAll('.game-filter-button');
                gameFilterButtons.forEach((filterButton) => {
                    if (filterButton === button) {
                        filterButton.classList.add('active');
                    } else if (filterButton.dataset.filter === 'all') {
                        filterButton.classList.remove('active');
                    } else {
                        filterButton.classList.remove('active');
                    }
                });
            }
        }

        function updateItems() {
            itemList.innerHTML = '';

            items.forEach((item) => {
                const listItem = createListItem(item);

                const isActiveTypeFilter = document.querySelector(`.type-filter-button[data-filter="${item.typeFilter}"]`).classList.contains('active');
                const isActiveGameFilter = document.querySelector(`.game-filter-button[data-filter="${item.gameFilter}"]`).classList.contains('active');

                if (isActiveTypeFilter && isActiveGameFilter) {
                    itemList.appendChild(listItem);
                } else {
                    listItem.classList.remove('show');
                    itemList.appendChild(listItem);
                }

            });

            updateItemsVisibility();
        }

        filterButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                const isActive = button.classList.contains('active');
                const isAllFilter = button.dataset.filter === 'all';

                if (isActive && !isAllFilter) {
                    button.classList.remove('active');
                } else {
                    button.classList.add('active');
                }

                updateItems();
                updateItemsVisibility();
            });
        });

    });
