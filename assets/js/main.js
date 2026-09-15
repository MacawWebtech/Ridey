const root=document.documentElement;
const header=document.querySelector('.site-header');
const menu=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
menu?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',open);});

const navDrops=[...document.querySelectorAll('.nav-drop')];
navDrops.forEach(drop=>{
 const trigger=drop.querySelector('.home-menu');
 trigger?.addEventListener('click',(e)=>{
  e.stopPropagation();
  const willOpen=!drop.classList.contains('open');
  navDrops.forEach(other=>{if(other!==drop){other.classList.remove('open');other.querySelector('.home-menu')?.setAttribute('aria-expanded','false');}});
  drop.classList.toggle('open',willOpen);
  trigger.setAttribute('aria-expanded',willOpen?'true':'false');
 });
 drop.addEventListener('keydown',(e)=>{if(e.key==='Escape'){drop.classList.remove('open');trigger?.setAttribute('aria-expanded','false');trigger?.focus();}});
});
document.addEventListener('click',(e)=>{navDrops.forEach(drop=>{if(!drop.contains(e.target)){drop.classList.remove('open');drop.querySelector('.home-menu')?.setAttribute('aria-expanded','false');}});});

nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu?.setAttribute('aria-expanded','false');}));
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
function motion(){
 const y=scrollY; header?.classList.toggle('scrolled',y>24);
 if(reduce)return;
 const hero=document.querySelector('.hero-bg'); if(hero)hero.style.transform=`scale(1.08) translate3d(0,${Math.min(y*.08,55)}px,0)`;
 const route=document.querySelector('.route'); if(route){const r=route.getBoundingClientRect(),p=Math.max(0,Math.min(1,(innerHeight-r.top)/(innerHeight+r.height*.35)));root.style.setProperty('--route-x',`${p*100}%`);}
 const map=document.querySelector('.map'); if(map){const r=map.getBoundingClientRect(),p=Math.max(0,Math.min(1,(innerHeight-r.top)/(innerHeight*.85)));root.style.setProperty('--map-dash',`${1100-1100*p}`);}
 root.style.setProperty('--cta-bg-x',`${Math.max(-40,Math.min(0,-(document.querySelector('.cta')?.getBoundingClientRect().top||0)*.02))}px`);
}
addEventListener('scroll',motion,{passive:true});addEventListener('resize',motion);motion();
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')}),{threshold:.18});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

/* V40: keep the current page visibly identified in desktop/tablet/mobile navigation. */
(()=>{
 const current=(location.pathname.split('/').pop()||'index.html').toLowerCase();
 document.querySelectorAll('.site-header .nav a[href]').forEach(a=>{
   const href=(a.getAttribute('href')||'').split('#')[0].split('?')[0].toLowerCase();
   if(href && href===current){a.classList.add('current-page');a.setAttribute('aria-current','page');}
 });
 document.querySelectorAll('.site-header .nav-drop').forEach(drop=>{
   if(drop.querySelector('a.current-page')) drop.querySelector('.home-menu')?.classList.add('current-page');
 });
})();
