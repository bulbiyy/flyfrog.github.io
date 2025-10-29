document.addEventListener('DOMContentLoaded', () => {
  const menuLinks = document.querySelectorAll('.middle-menu a, .dropdown-word');
  const magicLine = document.getElementById('magic-line');

  // Set initial magic line styles
  magicLine.style.position = 'absolute';
  magicLine.style.bottom = '0';
  magicLine.style.height = '3px';
  magicLine.style.backgroundColor = '#0C93ff'; // color of the pop effect
  magicLine.style.borderRadius = '2px';
  magicLine.style.transition = 'all 0.3s ease';
  magicLine.style.pointerEvents = 'none';

  const currentPath = window.location.pathname.split("/").pop();
  let activeLink = null;

  menuLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPath) activeLink = link;

      link.addEventListener('mouseenter', () => moveLine(link));
  });

  const menuContainer = document.querySelector('.middle-menu');
  menuContainer.addEventListener('mouseleave', () => {
      if (activeLink) moveLine(activeLink);
      else magicLine.style.width = '0';
  });

  function moveLine(element) {
      const rect = element.getBoundingClientRect();
      const parentRect = element.closest('.middle-menu').getBoundingClientRect();
      const left = rect.left - parentRect.left;
      magicLine.style.width = rect.width + 'px';
      magicLine.style.transform = `translateX(${left}px)`;
  }

  // Initialize line on active link
  if (activeLink) moveLine(activeLink);
});
