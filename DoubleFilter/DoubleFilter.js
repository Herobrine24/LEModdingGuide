// load the mod filters and mods from the JSON file
fetch("DoubleFilter.json")
  .then(response => response.json())
  .then(data => {
    // save the mod filters and mods in variables
    const modFilters = data.modFilters;
    const mods = data.mods;
    
    // get references to the HTML elements for the filter buttons and mod list
    const gameFilters = document.querySelectorAll(".game-filter");
    const modFiltersContainer = document.querySelector(".mod-filters");
    const modList = document.querySelector(".mod-list");

    // initialize the selected game filter and mod filter
    let selectedGameFilter = "all";
    let selectedModFilter = "all";

    // add event listeners to the game filters
    gameFilters.forEach(gameFilter => {
      gameFilter.addEventListener("click", () => {
        // update the selected game filter
        selectedGameFilter = gameFilter.getAttribute("data-game");

        // update the mod list
        updateModList();
      });
    });

    // add event listeners to the mod filters
    modFilters.forEach(modFilter => {
      // create a button for each mod filter
      const modFilterButton = document.createElement("button");
      modFilterButton.classList.add("mod-filter");
      modFilterButton.innerText = modFilter.name;

      // add an event listener to the mod filter button
      modFilterButton.addEventListener("click", () => {
        // update the selected mod filter
        selectedModFilter = modFilter.type;

        // update the mod filter buttons to show the selected filter
        modFiltersContainer.querySelectorAll(".mod-filter").forEach(button => {
          button.classList.toggle("selected", button === modFilterButton);
        });

        // update the mod list
        updateModList();
      });

      // add the mod filter button to the mod filters container
      modFiltersContainer.appendChild(modFilterButton);
    });

    // function to update the mod list based on the selected filters
    function updateModList() {
      // filter the mods based on the selected game filter and mod filter
      const filteredMods = mods.filter(mod => {
        return (selectedGameFilter === "all" || mod.game === selectedGameFilter) &&
          (selectedModFilter === "all" || mod.type === selectedModFilter);
      });

      // clear the mod list
      modList.innerHTML = "";

      // create an HTML element for each filtered mod and add it to the mod list
      filteredMods.forEach(mod => {
        const modElement = document.createElement("li");
        modElement.innerHTML = `
          <a href="${mod.url}" target="_blank">${mod.name}</a> - ${mod.description}
        `;
        modList.appendChild(modElement);
      });
    }

    // initialize the mod list
    updateModList();
  });
