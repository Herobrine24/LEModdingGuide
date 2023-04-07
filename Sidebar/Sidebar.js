/* Get the sidebar and toggle button */
const sidebar = document.querySelector('.sidebar');
const toggleBtn = document.querySelector('.sidebar-toggle');

/* Add click event listener to the toggle button /
toggleBtn.addEventListener('click', () => {
/ Toggle active class on the sidebar */
sidebar.classList.toggle('active');
});

/* Get the category links and add click event listeners to them */
const categoryLinks = document.querySelectorAll('.sidebar-categories a');

categoryLinks.forEach(link => {
link.addEventListener('click', event => {
event.preventDefault();

/* Toggle active class on the clicked category */
const clickedCategory = event.target.closest('li');
clickedCategory.classList.toggle('active');

/* Toggle active class on any subcategories */
const subcategories = clickedCategory.querySelectorAll('ul li');
subcategories.forEach(subcategory => {
  subcategory.classList.remove('active');
});
});
});
