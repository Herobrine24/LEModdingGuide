const filterButtons = document.querySelectorAll(".filter-button");
const itemList = document.querySelectorAll('.item');

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
    itemList.forEach((item) => {
      if (filter === "all" || item.classList.contains(filter)) {
        item.classList.add("show");
      } else {
        item.classList.remove("show");
      }
    });
  });
});
