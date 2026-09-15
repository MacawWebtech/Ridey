(()=>{
 const root=document.documentElement;
 const button=document.querySelector('.theme-toggle');
 if(!button)return;
 const LIGHT=new Set(['rgb(245, 245, 242)','rgb(255, 255, 255)','rgb(248, 248, 248)','rgb(250, 250, 250)']);
 const WHITE=new Set(['rgb(255, 255, 255)','rgb(250, 250, 250)']);
 const luminance=(rgb)=>{const n=(rgb.match(/\d+/g)||[]).slice(0,3).map(Number);return n.length===3?(n[0]*.2126+n[1]*.7152+n[2]*.0722):255};
 const prepare=()=>{
  document.querySelectorAll('body *').forEach(el=>{
   if(el.closest('.site-header')||el.closest('.theme-toggle'))return;
   const cs=getComputedStyle(el);
   if(LIGHT.has(cs.backgroundColor)&&cs.backgroundImage==='none'){
    el.classList.add('theme-light-surface');
    if(WHITE.has(cs.backgroundColor))el.classList.add('theme-white-surface');
   }
  });
  document.querySelectorAll('.theme-light-surface *').forEach(el=>{
   if(el.closest('.theme-toggle'))return;
   const cs=getComputedStyle(el),lum=luminance(cs.color);
   if(lum<105)el.classList.add('theme-dark-text');
   else if(lum<190)el.classList.add('theme-muted-text');
  });
 };
 const setTheme=(dark,save=true)=>{
  root.dataset.theme=dark?'dark':'normal';
  button.textContent=dark?'☀':'☾';
  button.setAttribute('aria-label',dark?'Switch to normal mode':'Switch to dark mode');
  button.setAttribute('title',dark?'Normal mode':'Dark mode');
  button.setAttribute('aria-pressed',dark?'true':'false');
  if(save)try{localStorage.setItem('ridey-theme',dark?'dark':'normal')}catch(e){}
 };
 prepare();
 let stored='normal';try{stored=localStorage.getItem('ridey-theme')||'normal'}catch(e){}
 setTheme(stored==='dark',false);
 button.addEventListener('click',()=>setTheme(root.dataset.theme!=='dark'));
})();
