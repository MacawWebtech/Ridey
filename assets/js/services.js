(()=>{
 const times={"1 hour":["Quick city hops","Grab a scooter for errands, meetings or an unplanned ride across town."],"1 day":["A full city day","Keep one scooter from morning plans through the ride home."],"1 week":["Your work-week ride","Skip daily rebooking and keep a familiar scooter through the week."],"1 month":["Everyday mobility","A longer rental rhythm for regular commuting without owning the scooter."]};
 const btns=[...document.querySelectorAll('.time-rail button')], title=document.querySelector('#timeTitle'), text=document.querySelector('#timeText'), rail=document.querySelector('.rail-line i');
 btns.forEach((b,i)=>b.addEventListener('click',()=>{btns.forEach(x=>x.classList.remove('active'));b.classList.add('active');title.textContent=times[b.dataset.time][0];text.textContent=times[b.dataset.time][1];rail.style.setProperty('--rail',`${i/3*100}%`)}));
 const uses={tourist:["TOURIST FREEDOM","Land, unlock and explore without waiting for cabs. Flexible pickup windows make city discovery feel effortless."],corporate:["TEAM MOBILITY","Give teams flexible two-wheel transport for site visits, short commutes and distributed city work."],commute:["DAILY COMMUTE","Keep a reliable ride for repeat office journeys with weekly or monthly rental rhythms."]};
 document.querySelectorAll('.use-switch button').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.use-switch button').forEach(x=>x.classList.remove('active'));b.classList.add('active');document.querySelector('#useTitle').innerHTML=uses[b.dataset.use][0].replace(' ','<br>');document.querySelector('#useText').textContent=uses[b.dataset.use][1]}));
 const rhythm=document.querySelector('.svc-rhythm'), road=document.querySelector('.road-scooter'), use=document.querySelector('.svc-use'), mark=document.querySelector('.moving-mark'), door=document.querySelector('.svc-door'), courier=document.querySelector('.courier'), cta=document.querySelector('.svc-cta');
 const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
 const tick=()=>{const h=innerHeight;
   if(rhythm){const r=rhythm.getBoundingClientRect(),p=clamp((h-r.top)/(h+r.height),0,1);road.style.setProperty('--road-y',`${8+p*84}%`)}
   if(use){const r=use.getBoundingClientRect(),p=clamp((h-r.top)/(h+r.height),0,1);mark.style.setProperty('--use-x',`${5+p*58}%`)}
   if(door){const r=door.getBoundingClientRect(),p=clamp((h-r.top)/(h+r.height),0,1);courier.style.setProperty('--door-x',`${18+p*55}%`);courier.style.setProperty('--door-y',`${65-p*38}%`)}
   if(cta){const r=cta.getBoundingClientRect(),p=clamp((h-r.top)/(h+r.height),0,1);cta.style.setProperty('--cta-x',`${-10+p*115}%`)}
 };
 addEventListener('scroll',tick,{passive:true});tick();
 const count=document.querySelector('[data-count]'); if(count){new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting&&!count.dataset.done){count.dataset.done=1;let n=0;const id=setInterval(()=>{n+=4;count.textContent=Math.min(n,100);if(n>=100)clearInterval(id)},25)}}),{threshold:.5}).observe(count)}
})();
