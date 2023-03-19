// Load mod data from JSON file
fetch("DoubleFilter.json")
  .then(response => response.json())
  .then(modData => {
    // Select DOM elements
    const gameFilters = document.querySelectorAll(".game-filter");
    const modFilters = document.querySelector("#mod-filters");
    const modList = document.querySelector("#mod-list ul");

    // Generate mod filters based on mod data
    const modTypes = ["All", ...new Set(modData.map(mod => mod.type))];
    modTypes.forEach(modType => {
      const modFilterBtn = document.createElement("button");
      modFilterBtn.classList.add("mod-filter");
      modFilterBtn.textContent = modType;
      modFilterBtn.dataset.mod = modType.toLowerCase();
      modFilters.appendChild(modFilterBtn);
    });

    // Generate mod list based on mod data
    function generateModList(mods) {
      modList.innerHTML = "";
      mods.forEach(mod => {
        const modItem = document.createElement("li");
        modItem.classList.add("mod-item");
        modItem.dataset.game = mod.game.toLowerCase();
        modItem.dataset.mod = mod.type.toLowerCase();

        const modLink = document.createElement("a");
        modLink.href = mod.url;
        modLink.target = "_blank";
        modLink.textContent = mod.name;

        const modDescription = document.createElement("p");
        modDescription.classList.add("mod-description");
        modDescription.textContent = `- ${mod.description}`;

        modItem.appendChild(modLink);
        modItem.appendChild(modDescription);
        modList.appendChild(modItem);
      });
    }

    // Filter mods based on game and mod filters
    function filterMods() {
      const selectedGameFilter = document.querySelector(".game-filter.active");
      const selectedModFilter = document.querySelector(".mod-filter.active");

      const filteredMods = modData.filter(mod => {
        const gameFilterPass = selectedGameFilter.dataset.game === "all" || selectedGameFilter.dataset.game === mod.game.toLowerCase();
        const modFilterPass = selectedModFilter.dataset.mod === "all" || selectedModFilter.dataset.mod === mod.type.toLowerCase();
        return gameFilterPass && modFilterPass;
      });

      generateModList(filteredMods);
    }

    // Add event listeners to game filters
    gameFilters.forEach(gameFilter => {
      gameFilter.addEventListener("click", () => {
        gameFilters.forEach(filter => filter.classList.remove("active"));
        gameFilter.classList.add("active");
        filterMods();
      });
    });

    // Add event listeners to mod filters
    const modFiltersBtns = document.querySelectorAll(".mod-filter");
    modFiltersBtns.forEach(modFilterBtn => {
      modFilterBtn.addEventListener("click", () => {
        modFiltersBtns.forEach(filter => filter.classList.remove("active"));
        modFilterBtn.classList.add("active");
        filterMods();
      });
    });

    // Initialize mod list with all mods and the "All Games" filter
    const allGameFilter = document.querySelector(".game-filter[data-game='all']");
    allGameFilter.classList.add("active");
    const allModFilter = document.querySelector(".mod-filter[data-mod='all']");
    allModFilter.classList.add("active");
    generateModList(modData);
  });
