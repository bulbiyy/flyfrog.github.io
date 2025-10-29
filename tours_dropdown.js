document.addEventListener('DOMContentLoaded', () => {
    const dropdowns = document.querySelectorAll('.dropdown');
  
    dropdowns.forEach(drop => {
      const arrow = drop.querySelector('.arrow');
      const list = drop.querySelector('.dropdown-list');
  
      // Toggle list on arrow click
      arrow.addEventListener('click', (e) => {
        e.preventDefault();
        list.style.display = (list.style.display === 'block') ? 'none' : 'block';
        arrow.style.transform = (list.style.display === 'block') ? 'rotate(180deg)' : 'rotate(0deg)';
      });
  
      // Keep list open on hover
      drop.addEventListener('mouseenter', () => {
        list.style.display = 'block';
        arrow.style.transform = 'rotate(180deg)';
      });
      drop.addEventListener('mouseleave', () => {
        list.style.display = 'none';
        arrow.style.transform = 'rotate(0deg)';
      });
    });
  });
  