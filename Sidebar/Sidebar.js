/* Get the sidebar and toggle button */
const sidebar = document.querySelector('.sidebar');
const toggleBtn = document.querySelector('.sidebar-toggle');

/* Add click event listener to the toggle button */
toggleBtn.addEventListener('click', () => {
  /* Toggle active class on the sidebar */
  sidebar.classList.toggle('active');

  /* Replace category list with icons if sidebar is retracted */
  const categoryList = document.querySelector('.sidebar-categories');
  if (sidebar.classList.contains('active')) {
    categoryList.classList.remove('icons');
  } else {
    categoryList.classList.add('icons');
  }
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

/* Get the options checkbox and add click event listener to it */
const optionsCheckbox = document.querySelector('.sidebar-options input[type="checkbox"]');
const optionsIcon = document.querySelector('.sidebar-options i');

optionsCheckbox.addEventListener('click', () => {
  /* Toggle active class on the options icon */
  optionsIcon.classList.toggle('active');

  /* Replace options with full menu if sidebar is expanded */
  const options = document.querySelector('.sidebar-options ul');
  if (optionsIcon.classList.contains('active')) {
    options.style.display = 'block';
  } else {
    options.style.display = 'none';
  }
});
