// Retrieve mod data from JSON file
const modData = fetch('MasterFilters.json')
	.then(response => response.json())
	.then(data => {
		// Populate mod list with data
		populateModList(data);
		// Set up filter buttons
		setupFilterButtons(data);
	})
	.catch(error => console.error('Error:', error));

// Populate mod list with data
function populateModList(data) {
	const modList = document.getElementById('modList');
	// Clear current list
	modList.innerHTML = '';
	// Add each mod to the list
	data.forEach(mod => {
		const modItem = document.createElement('li');
		modItem.className = `modItem ${mod.Game} ${mod.Tags.join(' ')}`;
		const modLink = document.createElement('a');
		modLink.href = mod.ModLink;
		modLink.target = '_blank';
		modLink.style.color = 'blue';
		modLink.style.display = 'inline';
		const modName = document.createElement('strong');
		modName.innerText = mod.ModName;
		modLink.appendChild(modName);
		const modDescription = document.createElement('span');
		modDescription.style.display = 'inline-flex';
		modDescription.style.flexDirection = 'column';
		modDescription.innerText = ` - ${mod.ModDescription}`;
		modItem.appendChild(modLink);
		modItem.appendChild(modDescription);
		modList.appendChild(modItem);
	});
}

// Set up filter buttons
function setupFilterButtons(data) {
	const filterButtons = document.querySelectorAll('[onclick^="filterSelection"]');
	// Add event listener to each filter button
	filterButtons.forEach(button => {
		button.addEventListener('click', () => {
			// Deselect all filter buttons
			filterButtons.forEach(button => button.classList.remove('selected'));
			// Select clicked filter button
			button.classList.add('selected');
			// Filter mod list based on selected filters
			filterModList(data);
		});
	});
}

// Filter mod list based on selected filters
function filterModList(data) {
	const selectedFilters = document.querySelectorAll('.selected:not([onclick^="resizeList"]):not([onclick^="toggleDisplay"])');
	const selectedFilterClasses = Array.from(selectedFilters).map(button => button.getAttribute('onclick').replace('filterSelection(', '').replace(')', ''));
	const modItems = document.querySelectorAll('.modItem');
	// Hide all mod items
	modItems.forEach(modItem => modItem.style.display = 'none');
	// Show mod items that match selected filters
	modItems.forEach(modItem => {
		const modClasses = Array.from(modItem.classList);
		if (selectedFilterClasses.every(filterClass => modClasses.includes(filterClass))) {
			modItem.style.display = '';
		}
	});
}
