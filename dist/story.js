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

// Project a twisted ribbon into the hero canvas. Depth sorting lets its folds pass behind one another.
const canvas=document.querySelector('#sculpture'),ctx=canvas.getContext('2d');
const motion=document.querySelector('#motion');
let time=.7, offset=0, target=0, inView=true, handle=0, last=0;
function project(t,u,rotation){
 const twist=t*1.5+.28*Math.sin(t*3);
 const rad=1.04+.35*Math.cos(3*t)+u*.36*Math.cos(twist);
 const x=rad*Math.cos(t), y=rad*Math.sin(t), z=.48*Math.sin(t*3)+u*.36*Math.sin(twist);
 const xx=x*Math.cos(rotation)+z*Math.sin(rotation),zz=-x*Math.sin(rotation)+z*Math.cos(rotation);
 const yy=y*.80-zz*.60,depth=y*.60+zz*.80;
 return [xx/(3.9-depth),yy/(3.9-depth),depth];
}
function paint(){
 const w=canvas.clientWidth,h=canvas.clientHeight;if(!w||!h||!ctx)return;
 const dpr=Math.min(devicePixelRatio||1,1.75);
 if(canvas.width!==Math.round(w*dpr)||canvas.height!==Math.round(h*dpr)){canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);}
 ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,w,h);
 const scale=Math.min(w*1.03,h*1.02),angle=.28+time*.15+offset*.6,pan=.12*Math.sin(time*.13);
 const screen=p=>[(w*.49)+scale*(p[0]*Math.cos(pan)-p[1]*Math.sin(pan)),h*.49+scale*(p[0]*Math.sin(pan)+p[1]*Math.cos(pan))];
 const panels=[];
 for(let i=0;i<196;i++){
  const t=i*Math.PI*2/196,dt=2*Math.PI/196;
  const p=[project(t,-1,angle),project(t+dt,-1,angle),project(t+dt,1,angle),project(t,1,angle)];
  const edge=(p[1][0]-p[0][0])*(p[3][1]-p[0][1])-(p[1][1]-p[0][1])*(p[3][0]-p[0][0]);
  const light=Math.min(1,Math.abs(edge)*1900),shade=(i%3===0?.72:1);
  const rgb=edge>0?[155+94*light,57+106*light,22+66*light]:[75+104*light,38+49*light,28+22*light];
  panels.push({z:p.reduce((n,v)=>n+v[2],0)/4,pts:p.map(screen),color:'rgb('+rgb.map(v=>Math.round(v*shade)).join(',')+')'});
 }
 panels.sort((a,b)=>a.z-b.z);
 for(const panel of panels){
  ctx.beginPath();panel.pts.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();ctx.fillStyle=panel.color;ctx.fill();ctx.strokeStyle=panel.color;ctx.lineWidth=.6;ctx.stroke();
 }
}
function animate(now){handle=0;if(!inView||document.hidden||paused)return;time+=Math.min((now-last)/1000,.05);last=now;offset+=(target-offset)*.07;paint();handle=requestAnimationFrame(animate);}
function restart(){cancelAnimationFrame(handle);last=performance.now();paint();if(!paused&&inView&&!document.hidden)handle=requestAnimationFrame(animate);}
function syncMotion(){document.body.classList.toggle('paused',paused);motion.textContent=paused?'Play motion':'Pause motion';motion.setAttribute('aria-pressed',String(paused));restart();}
motion.addEventListener('click',()=>{paused=!paused;syncMotion();});
reduced.addEventListener('change',()=>{paused=reduced.matches;syncMotion();});
canvas.addEventListener('pointermove',e=>{const b=canvas.getBoundingClientRect();target=(e.clientX-b.left)/b.width*2-1;});
canvas.addEventListener('pointerleave',()=>target=0);
new IntersectionObserver(([entry])=>{inView=entry.isIntersecting;restart();}).observe(canvas);
new ResizeObserver(restart).observe(canvas);document.addEventListener('visibilitychange',restart);syncMotion();
