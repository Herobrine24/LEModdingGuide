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

<script>
function myFunction() {
  // Declare variables
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUL");
  li = ul.getElementsByTagName('li');

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}
</script>
