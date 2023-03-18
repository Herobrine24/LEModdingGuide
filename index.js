const listContainer = document.getElementById("list");
const filterButtons = document.getElementById("filter-buttons").getElementsByTagName("button");

// Load the JSON file
fetch("items.json")
  .then(response => response.json())
  .then(data => {
    // Create a list item for each item in the JSON file
    data.forEach(item => {
      const listItem = document.createElement("li");
      listItem.innerHTML = item.text;
      listItem.dataset.category = item.category;
      listContainer.appendChild(listItem);
    });

    // Set up event listeners for the filter buttons
    for (const button of filterButtons) {
      button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        // Show or hide list items based on the filter
        for (const listItem of listContainer.getElementsByTagName("li")) {
          if (filter === "all" || listItem.dataset.category === filter) {
            listItem.style.display = "block";
          } else {
            listItem.style.display = "none";
          }
        }
      });
    }
  })
  .catch(error => console.error(error));
