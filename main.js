const tip = document.getElementById('tip');
const map = document.getElementById('map');

function moveTip(e, name){
  tip.textContent = name;

  const layer = map.closest('.mapLayer');
  const r = layer.getBoundingClientRect();

  tip.style.left = (e.clientX - r.left) + 'px';
  tip.style.top  = (e.clientY - r.top) + 'px';
  tip.classList.add('on');
}

function hideTip(){ tip.classList.remove('on'); }

map.querySelectorAll('.region').forEach(region => {
  region.addEventListener('mousemove', (e) =>
    moveTip(e, region.getAttribute('data-name') || 'Area')
  );
  region.addEventListener('mouseleave', hideTip);
});

