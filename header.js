document.addEventListener('DOMContentLoaded', () => {
    const menuLinks = document.querySelectorAll('.middle-menu a, .right-word-container a');
    const magicLine = document.getElementById('magic-line');
  
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
      const parentRect = element.parentElement.getBoundingClientRect();
      magicLine.style.width = rect.width + 'px';
      magicLine.style.transform = `translateX(${rect.left - parentRect.left}px)`;
    }
  
    if (activeLink) moveLine(activeLink);
  });
  