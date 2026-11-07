const chapters = Array.from(document.querySelectorAll('.chapter'));
const chooser = document.querySelector('#chooser');
const mode = document.querySelector('#mode');
const paging = document.querySelector('#paging');
const prev = document.querySelector('#prev');
const next = document.querySelector('#next');
let current = 0;
let allChapters = false;
function render() {
  chapters.forEach((el, i) => { el.hidden = !allChapters && i !== current; });
  chooser.value = String(current);
  chooser.parentElement.hidden = allChapters;
  paging.hidden = allChapters;
  mode.hidden = false;
  mode.textContent = allChapters ? 'One chapter at a time' : 'Read all chapters';
  prev.disabled = current === 0;
  next.textContent = current === chapters.length - 1 ? 'See projects →' : 'Next chapter →';
  document.querySelector('#count').textContent = (current + 1) + ' / ' + chapters.length;
}
function visit(index) {
  current = index;
  allChapters = false;
  render();
  const el = chapters[current];
  history.replaceState(null, '', '#' + el.id);
  el.tabIndex = -1;
  el.focus({preventScroll:true});
  el.scrollIntoView({block:'start'});
}
document.querySelectorAll('[data-jump]').forEach(link => link.addEventListener('click', e => {
  e.preventDefault();
  visit(Number(link.dataset.jump));
}));
chooser.addEventListener('change', () => visit(Number(chooser.value)));
prev.addEventListener('click', () => visit(current - 1));
next.addEventListener('click', () => {
  if (current === chapters.length - 1) location.hash = 'projects';
  else visit(current + 1);
});
mode.addEventListener('click', () => { allChapters = !allChapters; render(); });
function syncHash() {
  const index = chapters.findIndex(el => '#' + el.id === location.hash);
  if(index >= 0) { current = index; allChapters = false; }
  render();
}
syncHash();
window.addEventListener('hashchange',syncHash);
const bill = document.querySelector('#bill');
bill.addEventListener('input', () => {
  const diff = Number(bill.value) - 1000;
  document.querySelector('#amount').textContent = '$' + Number(bill.value).toLocaleString('en-US');
  document.querySelector('#delta').textContent = diff === 0 ? 'Invoice matches the contract' : '$' + Math.abs(diff) + (diff < 0 ? ' underbilled' : ' overbilled');
});
const cases = {
  added:['Main St, Oak Ave, King St','Review addition · King St'],
  closed:['Main St','Review removal · Oak Ave'],
  same:['Oak Ave, Main St','Locations match · skip extraction']
};
const sample = document.querySelector('#sample');
sample.addEventListener('change', () => {
  const [list, decision] = cases[sample.value];
  document.querySelector('#thisweek').textContent = list;
  document.querySelector('#decision').textContent = decision;
});
