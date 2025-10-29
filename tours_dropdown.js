// tours_dropdown.js
document.addEventListener('DOMContentLoaded', () => {
  const headerContainer = document.querySelector('.header-container');
  if (!headerContainer) return;

  const dropdowns = document.querySelectorAll('.dropdown');

  dropdowns.forEach(drop => {
    const toggleWord = drop.querySelector('.dropdown-word');
    const arrow = drop.querySelector('.arrow');
    const list = drop.querySelector('.dropdown-list');

    if (!toggleWord || !arrow || !list) return;

    // Utility to show/hide
    let hideTimeout = null;
    function showList() {
      // cancel any pending hide
      if (hideTimeout) {
        clearTimeout(hideTimeout);
        hideTimeout = null;
      }

      // compute position relative to headerContainer
      const headerRect = headerContainer.getBoundingClientRect();
      const dropRect = drop.getBoundingClientRect();

      // left: offset of dropdown relative to header container
      const left = dropRect.left - headerRect.left;
      // top: exactly header height (so list starts under header)
      const top = headerContainer.offsetHeight;

      list.style.left = `${Math.round(left)}px`;
      list.style.top = `${Math.round(top)}px`;
      list.style.display = 'block';

      // rotate arrow
      arrow.style.transform = 'rotate(180deg)';
    }

    function hideList() {
      list.style.display = 'none';
      arrow.style.transform = 'rotate(0deg)';
    }

    // show when entering toggle word or arrow
    toggleWord.addEventListener('mouseenter', showList);
    arrow.addEventListener('mouseenter', showList);

    // keep open while mouse over the list itself
    list.addEventListener('mouseenter', showList);

    // start a short delayed hide when leaving toggle, arrow or list
    // delay allows moving mouse from word to list without flicker
    function scheduleHide() {
      if (hideTimeout) clearTimeout(hideTimeout);
      hideTimeout = setTimeout(() => {
        // check if pointer is inside drop or list before hiding
        // (use element.matches(':hover') where supported)
        const stillOverToggle = toggleWord.matches(':hover') || arrow.matches(':hover');
        const stillOverList = list.matches(':hover');
        if (!stillOverToggle && !stillOverList) hideList();
      }, 120); // 120ms delay — adjust if you want longer/shorter
    }

    toggleWord.addEventListener('mouseleave', scheduleHide);
    arrow.addEventListener('mouseleave', scheduleHide);
    list.addEventListener('mouseleave', scheduleHide);

    // Also support clicking the arrow to toggle (keeps same positioning)
    arrow.addEventListener('click', (e) => {
      e.preventDefault();
      if (list.style.display === 'block') {
        hideList();
      } else {
        showList();
      }
    });

    // Re-position on window resize (keeps list aligned)
    window.addEventListener('resize', () => {
      if (list.style.display === 'block') showList();
    });

    // Re-position on scroll (if header moves) — optional but helpful
    window.addEventListener('scroll', () => {
      if (list.style.display === 'block') showList();
    });
  });
});
