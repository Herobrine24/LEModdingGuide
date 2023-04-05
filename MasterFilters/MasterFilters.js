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
function resizeList(size) {
  // update the size buttons to reflect the selected size
  let smallBtn = document.getElementById("small-btn");
  let mediumBtn = document.getElementById("medium-btn");
  let largeBtn = document.getElementById("large-btn");
  switch (size) {
    case "small":
      smallBtn.classList.add("selected");
      mediumBtn.classList.remove("selected");
      largeBtn.classList.remove("selected");
      break;
    case "medium":
      smallBtn.classList.remove("selected");
      mediumBtn.classList.add("selected");
      largeBtn.classList.remove("selected");
      break;
    case "large":
      smallBtn.classList.remove("selected");
      mediumBtn.classList.remove("selected");
      largeBtn.classList.add("selected");
      break;
    default:
      console.error(`Invalid size: ${size}`);
      return;
  }

  // update the list class to reflect the selected size
  let list = document.getElementById("mod-list");
  switch (size) {
    case "small":
      list.classList.add("small-list");
      list.classList.remove("medium-list");
      list.classList.remove("large-list");
      break;
    case "medium":
      list.classList.remove("small-list");
      list.classList.add("medium-list");
      list.classList.remove("large-list");
      break;
    case "large":
      list.classList.remove("small-list");
      list.classList.remove("medium-list");
      list.classList.add("large-list");
      break;
  }
}

// function to toggle the grid/list view of the mod list
function toggleView() {
  let list = document.getElementById("mod-list");
  let viewBtn = document.getElementById("view-btn");
  let view = list.classList.contains("grid-view") ? "list" : "grid";

  // update the view button to reflect the selected view
  viewBtn.innerText = view === "list" ? "Grid View" : "List View";

  // update the list class to reflect the selected view
  list.classList.toggle("grid-view");
  list.classList.toggle("list-view");
}

// call resizeList() with the default size to set up the list
resizeList("medium");
