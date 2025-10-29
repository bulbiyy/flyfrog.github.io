document.addEventListener('DOMContentLoaded', () => {
  const menuLinks = document.querySelectorAll('.middle-menu a, .dropdown-word');
  const magicLine = document.getElementById('magic-line');

  // Initialize magic line styles
  magicLine.style.position = 'absolute';
  magicLine.style.bottom = '0';
  magicLine.style.height = '3px';
  magicLine.style.backgroundColor = '#0C93ff';
  magicLine.style.borderRadius = '2px';
  magicLine.style.transition = 'all 0.3s ease';
  magicLine.style.pointerEvents = 'none';

  // Find active page
  const currentPath = window.location.pathname.split("/").pop();
  let activeLink = null;

  menuLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPath) activeLink = link;

      // Move line on hover
      link.addEventListener('mouseenter', () => moveLine(link));
  });

  // Return to active link or hide when leaving menu
  const menuContainer = document.querySelector('.middle-menu');
  menuContainer.addEventListener('mouseleave', () => {
      if (activeLink) moveLine(activeLink);
      else magicLine.style.width = '0';
  });

  function moveLine(element) {
      // Get element position relative to .middle-menu container
      const rect = element.getBoundingClientRect();
      const parentRect = element.closest('.middle-menu').getBoundingClientRect();
      const left = rect.left - parentRect.left;

      magicLine.style.width = rect.width + 'px';
      magicLine.style.transform = `translateX(${left}px)`;
  }

  // Initialize on active page
  if (activeLink) moveLine(activeLink);
});
