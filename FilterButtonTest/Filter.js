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
    const itemsToShow = itemList.querySelectorAll(".item." + filter);
    const itemsToHide = itemList.querySelectorAll(".item:not(." + filter + ")");
    itemsToShow.forEach((item) => {
      item.classList.add("show");
    });
    itemsToHide.forEach((item) => {
      item.classList.remove("show");
    });
  });
});
