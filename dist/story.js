const bill = document.querySelector('#bill');
const less = document.querySelector('#less');
const more = document.querySelector('#more');
function updateInvoice() {
  const amount = Number(bill.value);
  const difference = amount - 1000;
  document.querySelector('#amount').textContent = '$' + amount.toLocaleString('en-US');
  const result = document.querySelector('#delta');
  result.textContent = difference === 0 ? 'Invoice matches the contract' : '$' + Math.abs(difference) + (difference < 0 ? ' underbilled' : ' overbilled');
  result.dataset.match = String(difference === 0);
  bill.style.setProperty('--fill', (amount - 500) / 10 + '%');
  less.disabled = amount <= 500;
  more.disabled = amount >= 1500;
}
bill.addEventListener('input', updateInvoice);
less.addEventListener('click', () => { bill.stepDown(); updateInvoice(); });
more.addEventListener('click', () => { bill.stepUp(); updateInvoice(); });
updateInvoice();
const examples = {
  added: ['Main St<br>Oak Ave<br><mark>+ King St</mark>', 'Review addition · King St'],
  closed: ['Main St<br><del>− Oak Ave</del>', 'Review removal · Oak Ave'],
  same: ['Oak Ave<br>Main St', 'Same locations · skip extraction']
};
document.querySelectorAll('input[name="scenario"]').forEach(radio => {
  radio.addEventListener('change', () => {
    const [locations, verdict] = examples[radio.value];
    document.querySelector('#thisweek').innerHTML = locations;
    const decision = document.querySelector('#decision');
    decision.textContent = verdict;
    decision.dataset.match = String(radio.value === 'same');
  });
});

const palette = [
  ['#422b21','#ffb887'], ['#1e3434','#b3e3d5'], ['#222d4b','#ffc878'],
  ['#453548','#f4badb'], ['#193a31','#bcdfaf']
];
const sceneNames = ['HackerEarth','Capgemini','CloudEagle','Accounting Bridge','Bidfast'];
const sceneDates = ['2021–22','2022–23','2023','During my MBA','2025–26'];
const captions = ['Enterprise sales','Enterprise software','Day shift / Night shift','Vancouver / India','Founding product engineer'];
const line = (d,extra='') => '<path fill="none" stroke="currentColor" d="'+d+'" '+extra+'/>';
const word = (x,y,t,size=11,anchor='start') => '<text x="'+x+'" y="'+y+'" text-anchor="'+anchor+'" fill="currentColor" font-family="monospace" font-size="'+size+'">'+t+'</text>';
const circle = (x,y,r,fill='none') => '<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+fill+'" stroke="currentColor"/>';
function rings(x,y) { return [30,45,60].map(r=>circle(x,y,r)).join(''); }
function salesScene(){
  let s='';
  for(let i=0;i<25;i++){
    const y=30+i*11, bend=90+(i%5)*13;
    s+=line('M26 '+y+' C'+bend+' '+y+' 145 162 222 162','opacity=".45"');
  }
  return s+line('M222 162H470','stroke-width="3" stroke-dasharray="8 7" class="moving"')+circle(222,162,13,'currentColor')+word(32,322,'OUTREACH')+word(305,140,'$150K',42)+word(307,192,'ONE SIGNED DEAL');
}
function systemScene(){
 let s='';
 for(let i=0;i<4;i++){
  const dy=i*36;
  s+='<g class="layer" transform="translate(0 '+dy+')"><path d="M65 115l165-76 215 72-169 82z" stroke="currentColor" fill="#1e3434"/>'+line('M100 116l128-56 171 52-125 59z M165 114l67-29 103 30-63 29z','opacity=".65"')+'</g>';
 }
 return s+line('M225 40v168l55 19v72','stroke-dasharray="6 4" class="moving"')+word(48,320,'SAP / ENVIRONMENT · HEALTH · SAFETY');
}
function shiftScene(){
 let s='';
 for(const [x,t,hr] of [[150,'CAPGEMINI / DAY',10],[371,'CLOUDEAGLE / NIGHT',22]]){
 s+='<g class="dial">'+circle(x,155,84);
 for(let i=0;i<48;i++){let a=i*Math.PI/24,r=i%4?78:70;s+=line('M'+(x+Math.sin(a)*r)+' '+(155+Math.cos(a)*r)+'l'+(Math.sin(a)*(83-r))+' '+(Math.cos(a)*(83-r)));}
 const a=hr*Math.PI/6;s+=line('M'+x+' 155l'+(Math.sin(a)*43)+' '+(-Math.cos(a)*43),'stroke-width="5"');
 s+='<g class="clock" style="transform-origin:'+x+'px 155px">'+line('M'+x+' 155v-61','stroke-width="2"')+'</g>'+circle(x,155,5,'currentColor')+word(x,271,t,12,'middle')+'</g>';
 }
 return s+line('M260 53v215','stroke-dasharray="2 5" opacity=".6"')+word(260,320,'TWO SHIFTS TO FUND THE MOVE',11,'middle');
}
function studioScene(){
 let s='';
 for(let i=0;i<55;i++){
  let h=7+Math.abs(Math.sin(i*.44)*Math.cos(i*.12))*104;
  s+=line('M'+(35+i*8.3)+' '+(157-h)+'v'+h*2,'stroke-width="4" class="wave" style="animation-delay:-'+(i*.14)+'s"');
 }
 return s+line('M35 157H485','opacity=".55"')+word(36,295,'CANADA')+word(479,295,'INDIA',11,'end');
}
function planScene(){
 let s=line('M43 52H467V270H43z M51 60H459V262H51z M182 60v94H51 M191 60v94h105V60 M306 60v116h153 M51 164h131v98 M191 164v98 M305 186h154 M305 186v76 M202 211h93 M295 154v108','stroke-width="2"');
 for(const [x,y] of [[102,114],[241,103],[393,128],[244,236]]){
 s+=circle(x,y,7)+line('M'+(x-5)+' '+(y-5)+'l10 10m0-10l-10 10')+'<rect x="'+(x-13)+'" y="'+(y-13)+'" width="26" height="26" fill="none" class="match" stroke="#ffbf77" stroke-dasharray="4 3"/>';
 }
 return s+word(43,315,'ILLUSTRATIVE ELECTRICAL PLAN');
}
const scenes=[salesScene,systemScene,shiftScene,studioScene,planScene].map(draw=>draw());
const stage=document.querySelector('.stage');
const frame=document.querySelector('#scene');
const chapters=[...document.querySelectorAll('.chapter')];
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
let paused=reduced.matches;
let active=-1;
function showScene(index){
 if(active===index)return;
 active=index;
 stage.classList.remove('explored');
 stage.dataset.active=String(index);
 explore.textContent=toggles[index][0];
 explore.setAttribute('aria-pressed','false');
 stage.style.background=palette[index][0];stage.style.color=palette[index][1];
 frame.innerHTML=scenes[index];frame.setAttribute('aria-label',captions[index]+' illustration');
 document.querySelector('#scnum').textContent='0'+(index+1)+' / 05';
 document.querySelector('#scname').textContent=sceneNames[index];document.querySelector('#scdate').textContent=sceneDates[index];document.querySelector('#sccap').textContent=captions[index];
 document.querySelectorAll('.stageNav a').forEach((a,i)=>a.setAttribute('aria-current',i===index?'step':'false'));
 if(!paused)frame.animate([{opacity:.2,transform:'translateY(14px)'},{opacity:1,transform:'translateY(0)'}],{duration:400});
}
function onScroll(){
 const pivot=innerHeight*(innerWidth<=720?.58:.48);
 let index=0;chapters.forEach((el,i)=>{if(el.getBoundingClientRect().top<=pivot)index=i;});
 showScene(index);
 const rect=chapters[index].getBoundingClientRect();
 const fraction=Math.max(0,Math.min(1,(pivot-rect.top)/rect.height));
 document.querySelector('.meter b').style.width=(index+fraction)*20+'%';
}
let scrollQueued=false;
window.addEventListener('scroll',()=>{if(!scrollQueued){scrollQueued=true;requestAnimationFrame(()=>{onScroll();scrollQueued=false;});}},{passive:true});
window.addEventListener('resize',onScroll);
const stageNav=document.createElement('nav');stageNav.className='stageNav';stageNav.setAttribute('aria-label','Jump through the story');
stageNav.innerHTML=sceneNames.map((name,i)=>'<a aria-label="Jump to '+name+'" title="'+name+'" href="#chapter-'+(i+1)+'">0'+(i+1)+'</a>').join('');
stage.append(stageNav);
const toggles = [
 ['Trace the signed deal','Show all outreach'],
 ['Separate the layers','Stack the layers'],
 ['Explore the night shift','Show both shifts'],
 ['Isolate the waveform','Restore the full mix'],
 ['Highlight matched symbols','Show the original plan']
];
const explore=document.createElement('button');
explore.className='explore';
stage.insertBefore(explore,stageNav);
explore.addEventListener('click',()=>{
 const enabled=stage.classList.toggle('explored');
 explore.setAttribute('aria-pressed',String(enabled));
 explore.textContent=toggles[active][Number(enabled)];
});
onScroll();


const film = document.querySelector('#harbour');
const motion = document.querySelector('#motion');
let heroVisible = true;
function syncMotion() {
  document.body.classList.toggle('paused', paused);
  motion.textContent = paused ? 'Play motion' : 'Pause motion';
  motion.setAttribute('aria-pressed', String(paused));
  if (paused || document.hidden || !heroVisible) film.pause();
  else film.play().catch(() => {});
}
motion.addEventListener('click', () => { paused = !paused; syncMotion(); });
reduced.addEventListener('change', () => { paused = reduced.matches; syncMotion(); });
new IntersectionObserver(([entry]) => {
  heroVisible = entry.isIntersecting;
  syncMotion();
}).observe(film);
document.addEventListener('visibilitychange', syncMotion);
syncMotion();
