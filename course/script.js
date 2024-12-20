// Get all elements with the class "toggle" (the clickable list items)
const toggles = document.querySelectorAll('.toggle');

// Add a click event listener to each toggle element
toggles.forEach(toggle => {
  toggle.addEventListener('click', () => {
    const nestedList = toggle.nextElementSibling;  // Get the nested list (ul)

    // Toggle the visibility of the nested list by adding/removing the "active" class
    //nestedList.style.display = nestedList.style.display === 'none' ? 'block' : 'none';
    nestedList.classList.toggle('active');
  });
});
