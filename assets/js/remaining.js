document.addEventListener('DOMContentLoaded',()=>{const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;if(!reduce){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')}),{threshold:.12});document.querySelectorAll('main section').forEach(s=>io.observe(s));}document.querySelectorAll('.role-toggle button').forEach(b=>b.addEventListener('click',()=>{b.parentElement.querySelectorAll('button').forEach(x=>x.classList.remove('selected'));b.classList.add('selected')}));const c=document.querySelector('[data-countdown]');if(c){let n=+c.dataset.countdown;setInterval(()=>{if(n>0)n--;let h=String(Math.floor(n/3600)).padStart(2,'0'),m=String(Math.floor(n%3600/60)).padStart(2,'0'),s=String(n%60).padStart(2,'0');c.textContent=`${h}:${m}:${s}`},1000)}});

document.addEventListener('DOMContentLoaded',()=>{
  const loginForm=document.querySelector('#loginForm');
  if(loginForm){
    let role='customer';
    document.querySelectorAll('.role-toggle [data-role]').forEach(btn=>btn.addEventListener('click',()=>{role=btn.dataset.role;}));
    const pw=document.querySelector('#loginPassword'), toggle=document.querySelector('.password-toggle');
    if(pw&&toggle)toggle.addEventListener('click',()=>{const show=pw.type==='password';pw.type=show?'text':'password';toggle.textContent=show?'Hide':'Show';toggle.setAttribute('aria-label',show?'Hide password':'Show password')});
    loginForm.addEventListener('submit',e=>{e.preventDefault();if(!loginForm.reportValidity())return;location.href=role==='admin'?'admin-dashboard.html':'customer-dashboard.html';});
  }
  const toast=document.querySelector('#dashToast');
  const showToast=msg=>{if(!toast)return;toast.textContent=msg;toast.classList.add('show');clearTimeout(window.__rideyToast);window.__rideyToast=setTimeout(()=>toast.classList.remove('show'),2200)};
  document.querySelectorAll('[data-demo-action]').forEach(btn=>btn.addEventListener('click',()=>showToast(btn.dataset.demoAction)));
  const range=document.querySelector('.extend-panel input[type="range"]'), feedback=document.querySelector('#extensionFeedback'), review=document.querySelector('#extensionReview');
  if(range&&review){const sync=()=>{const h=+range.value;const strong=range.closest('.extend-panel').querySelector('strong');if(strong)strong.textContent=`+${h} HOUR${h===1?'':'S'} / ₹${h*99}`};range.addEventListener('input',sync);sync();review.addEventListener('click',()=>{if(feedback)feedback.textContent=`Extension preview: +${range.value} hour(s), ₹${+range.value*99}.`;showToast('Extension preview updated')})}
  const navLinks=[...document.querySelectorAll('.dash-nav a[href^="#"]')];
  navLinks.forEach(a=>a.addEventListener('click',()=>{navLinks.forEach(x=>x.classList.remove('active'));a.classList.add('active')}));
});
