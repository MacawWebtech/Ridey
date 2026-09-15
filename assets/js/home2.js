(()=>{
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  const root=document.documentElement;
  const range=document.querySelector('#distanceRange');
  const cost=document.querySelector('#costValue');
  const dist=document.querySelector('#distanceValue');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;

  if(range){
    const update=()=>{
      const km=+range.value;
      if(dist) dist.textContent=`${km} KM / DAY`;
      if(cost) cost.textContent=`₹${Math.round(km*140).toLocaleString('en-IN')}`;
    };
    range.addEventListener('input',update);
    update();
  }

  let ticking=false;
  const animate=()=>{
    ticking=false;
    if(reduced) return;
    const y=window.scrollY;
    const h=window.innerHeight;
    const mobile=window.innerWidth<=600;
    root.style.setProperty('--h2-scoot',`${clamp(y*(mobile?.055:.12),0,mobile?46:120)}px`);

    const planner=document.querySelector('.planner');
    if(planner){
      const r=planner.getBoundingClientRect();
      const progress=clamp((h-r.top)/(h+r.height),0,1);
      root.style.setProperty('--planner-x',`${8+progress*78}%`);
    }

    const park=document.querySelector('.parking');
    if(park){
      const r=park.getBoundingClientRect();
      const progress=clamp((h-r.top)/(h+r.height),0,1);
      root.style.setProperty('--park-dash',`${1500-progress*1500}`);
    }

    document.querySelectorAll('.pass-strip').forEach((el,i)=>{
      const r=el.getBoundingClientRect();
      const progress=clamp((h-r.top)/h,0,1);
      el.style.setProperty('--strip-x',`${(i%2?1:-1)*(1-progress)*55}px`);
    });
  };
  const requestAnimate=()=>{if(!ticking){ticking=true;requestAnimationFrame(animate)}};
  addEventListener('scroll',requestAnimate,{passive:true});
  addEventListener('resize',requestAnimate,{passive:true});
  requestAnimate();
})();
