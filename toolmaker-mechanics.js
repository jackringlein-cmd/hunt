/* Tool Maker: persistent returning projectiles, crafted traps, boulders and turrets. */
(function(root){function install(Game,D){
 const distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
 const gap=(e,a,b)=>{const dx=b.x-a.x,dy=b.y-a.y,l=dx*dx+dy*dy,t=l?Math.max(0,Math.min(1,((e.x-a.x)*dx+(e.y-a.y)*dy)/l)):0;return Math.hypot(e.x-a.x-t*dx,e.y-a.y-t*dy);};
 Game.prototype.workshop=function(){return this.s.workshop??={rangs:[],traps:[],boulders:[],turrets:[]};};
 Game.prototype.toolMelee=function(h,damage,count){
  const reach=90*this.range(h)/this.baseRange(h),targets=this.sorted(h,this.inRange(h,reach)).filter(e=>!this.nightmareFlight(e).airborne);if(!targets.length)return false;
  // Each weapon sweeps three targets; short crowds may take hits from several weapons.
  for(let weapon=0;weapon<count;weapon++)for(let j=0;j<Math.min(3,targets.length);j++){const e=targets[(weapon*3+j)%targets.length];if(!e.dead)this.hit(e,damage,h);}
  h.toolSwing={start:this.s.time,end:this.s.time+.45,count};h.face={x:targets[0].x,y:targets[0].y};this.fx('slash',h,targets[0],'#f5d69a',reach);return true;
 };
 Game.prototype.launchRangs=function(h,count,damage,pierce){
  const flying=this.workshop().rangs.filter(r=>r.owner===h.id);
  if(flying.length){h.rangAwaitingIds??=flying.map(r=>r.id);if(h.rangAwaitingIds.every(id=>flying.some(r=>r.id===id)))return false;}
  const targets=this.sorted(h);if(!targets.length)return false;
  for(let i=0;i<count;i++){const target=targets[i%targets.length],lane=count>1?(i%2?1:-1):0,angle=Math.atan2(target.y-h.y,target.x-h.x);
   this.workshop().rangs.push({id:this.s.nextId++,owner:h.id,start:this.s.time,duration:1.4,lane,spin:lane||1,from:{x:h.x,y:h.y},target:target.id,to:{x:target.x,y:target.y},x:h.x-Math.sin(angle)*lane*16,y:h.y+Math.cos(angle)*lane*16,damage,pierce,out:[],back:[]});}
  h.rangAwaitingIds=this.workshop().rangs.filter(r=>r.owner===h.id).map(r=>r.id);h.face={x:targets[0].x,y:targets[0].y};return true;
 };
 Game.prototype.toolAttack=function(h){
  const u=h.u;let used=false;
  if(u[1])used=this.launchRangs(h,u[1]>=2?2:1,[0,24,24,38,60,90,125][u[1]],[0,3,3,5,8,12,18][u[1]]);
  if(!u[1]||u[0])used=this.toolMelee(h,[18,22,26,32,40,48,60][u[0]],[1,2,4,6,8,10,12][u[0]])||used;
  if(used){h.count++;this.emit('attack',{hero:'toolmaker'});}return used;
 };
 Game.prototype.toolTrap=function(h,kind,power=1){const spots=this.trapSpot(h);if(!spots.length)return false;const spot=spots[Math.floor(this.random()*spots.length)];this.workshop().traps.push({id:this.s.nextId++,owner:h.id,kind,...spot,power,end:this.s.time+30});return true;};
 Game.prototype.toolTurrets=function(h){const w=this.workshop(),count=[0,1,2,3,4,6,8][h.u[3]];let owned=w.turrets.filter(t=>t.owner===h.id);if(!h.u[3])return;
  for(let i=owned.length;i<count;i++){let spot;for(let j=0;j<64;j++){const a=j*Math.PI/8,r=58+30*Math.floor(j/16),x=h.x+Math.cos(a)*r,y=h.y+Math.sin(a)*r;if(this.canPlace(x,y)&&!w.turrets.some(t=>distance(t,{x,y})<32)){spot={x,y};break;}}if(!spot)break;const t={id:this.s.nextId++,owner:h.id,...spot,next:this.s.time,level:h.u[3]};w.turrets.push(t);owned.push(t);}
  for(const t of owned)t.level=h.u[3];
 };
 Game.prototype.toolCast=function(h,a){
  if(a.path===0)return this.toolMelee(h,120*a.power,12);
  if(a.path===1)return this.launchRangs(h,6,150*a.power,24);
  if(a.path===2)return this.toolTrap(h,'boulder',a.power);
  this.toolTurrets(h);h.toolOverclockUntil=this.s.time+8;h.toolOverclock=1+a.power;return true;
 };
 Game.prototype.updateWorkshop=function(dt){
  if(!this.s.heroes.some(h=>h.type==='toolmaker')&&!this.s.workshop)return;
  const w=this.workshop(),now=this.s.time,owner=id=>this.s.heroes.find(h=>h.id===id),active=h=>h&&(h.stunnedUntil||0)<=now;
  for(const h of this.s.heroes){if(h.type!=='toolmaker'||!active(h))continue;this.toolTurrets(h);
   if(h.u[2]&&this.attackAllowed(h,'trap')&&(h.toolTrapAt||0)<=now){const kinds=['jaw','oil','anvil','saw','shrapnel'];h.toolTrapCount=(h.toolTrapCount||0)+1;this.toolTrap(h,kinds[(h.toolTrapCount-1)%Math.min(5,h.u[2])]);h.toolTrapAt=now+(h.u[2]>=5?5:7.5);}
   if(h.u[2]>=6&&this.attackAllowed(h,'boulderTrap')&&(h.toolBoulderAt||0)<=now){this.toolTrap(h,'boulder');h.toolBoulderAt=now+30;}
  }
  w.rangs=w.rangs.filter(r=>{const h=owner(r.owner);if(!h)return false;if(!active(h)){r.start+=dt;return true;}
   const age=Math.min(r.duration,now-r.start),previous=Math.max(0,age-dt),half=r.duration/2;
   if(previous<half){
    let target=this.s.enemies.find(e=>e.id===r.target&&!e.dead&&!e.serpentDive&&!e.serpentFlight);
    if(!target){target=this.sorted(h).find(e=>!r.out.includes(e.id));if(target)r.target=target.id;}
    if(target)r.to={x:target.x,y:target.y};
   }
   const point=t=>{const f=t<=half?t/half:2-t/half,dx=r.to.x-r.from.x,dy=r.to.y-r.from.y,len=Math.hypot(dx,dy)||1,offset=(r.lane||0)*(16+20*Math.sin(Math.PI*f));return{x:r.from.x+dx*f-dy/len*offset,y:r.from.y+dy*f+dx/len*offset};};
   // Split long frames at the turn so neither the outward nor return sweep is skipped.
   const times=previous<half&&age>half?[previous,half,age]:[previous,age];
   for(let k=1;k<times.length;k++){const a=k===1?{x:r.x,y:r.y}:point(times[k-1]),b=point(times[k]),hits=times[k-1]>=half?r.back:r.out;
    const targets=this.s.enemies.filter(e=>!e.dead&&this.canDetect(h,e)&&!e.serpentDive&&!e.serpentFlight&&gap(e,a,b)<=18).sort((a1,b1)=>distance(a,a1)-distance(a,b1));
    for(const e of targets){if(hits.length>=r.pierce)break;if(hits.includes(e.id))continue;hits.push(e.id);this.hit(e,r.damage,{...h,toolRanged:true});}}
   Object.assign(r,point(age));return age<r.duration;
  });
  w.traps=w.traps.filter(t=>{const h=owner(t.owner);if(!h||t.end<=now)return false;if(!active(h))return true;
   const nearby=this.s.enemies.filter(e=>!e.dead&&this.canDetect(h,e)&&!e.serpentDive&&!e.throwId&&!e.serpentFlight&&!this.nightmareFlight(e).airborne&&distance(e,t)<(t.kind==='boulder'?40:27));if(!nearby.length)return true;
   if(t.kind==='boulder'){w.boulders.push({id:this.s.nextId++,owner:h.id,p:t.p,...this.position(t.p),end:now+8,budget:7500*t.power,damage:1600*t.power,hit:[],rotation:0});return false;}
   const radius=t.kind==='shrapnel'?85:48,targets=t.kind==='jaw'?nearby.slice(0,1):this.s.enemies.filter(e=>!e.dead&&this.canDetect(h,e)&&!this.nightmareFlight(e).airborne&&!e.serpentDive&&distance(e,t)<=radius).slice(0,t.kind==='saw'?6:100),pushed=new Set();
   for(const e of targets){this.hit(e,({jaw:45,oil:20,anvil:100,saw:140,shrapnel:220})[t.kind],h);if(t.kind==='jaw')this.apply(e,'stun',.5,1,h.id);if(t.kind==='oil')this.apply(e,'slow',3,.4,h.id);if(t.kind==='anvil')this.push(e,50,h,pushed);}this.fx('ring',t,t,t.kind==='oil'?'#69577c':'#e4bb80',radius);return false;
  });
  w.boulders=w.boulders.filter(b=>{const h=owner(b.owner);if(!h)return false;if(!active(h)){b.end+=dt;return true;}if(b.end<=now||b.budget<=0)return false;const old=b.p;b.p=Math.max(0,b.p-65*dt);b.rotation+=dt*3;Object.assign(b,this.position(b.p));
   const targets=this.s.enemies.filter(e=>!e.dead&&this.canDetect(h,e)&&!b.hit.includes(e.id)&&!e.serpentDive&&!e.throwId&&!e.serpentFlight&&!this.nightmareFlight(e).airborne&&e.p>=b.p-28&&e.p<=old+28).sort((a,c)=>c.p-a.p);
   for(const e of targets){if(b.budget<=0)break;b.hit.push(e.id);const before=Math.max(0,e.hp)+(e.shield||0);const multiplier=this.buffs(h).damage*this.multiplier(e,h)*(D.enemies[e.type].damageTaken?.physical??1);this.hit(e,Math.min(b.damage,b.budget/Math.max(.001,multiplier)),h,999);const spent=Math.max(0,before-Math.max(0,e.hp)-(e.shield||0));b.budget=Math.max(0,b.budget-spent);}return b.p>0&&b.budget>0;
  });
  w.turrets=w.turrets.filter(t=>{const h=owner(t.owner);if(!h)return false;if(!active(h)||!this.attackAllowed(h,'turret')||t.next>now)return true;const level=h.u[3],range=level>=6?255:170,targets=this.sorted(h,this.s.enemies.filter(e=>!e.dead&&this.canDetect(h,e)&&!e.serpentDive&&!e.serpentFlight&&distance(e,t)<=range));if(!targets.length)return true;
   const shots=level>=2?2:1;for(let i=0;i<shots;i++){const target=targets[i%targets.length],proxy={...h,toolRanged:true},damage=[0,18,24,36,48,65,90][level];t.face={x:target.x,y:target.y};this.fx('arrow',t,target,'#e8c185');for(const e of this.lineTargets(t,target,range,14,level>=6?6:level>=3?3:1,h))this.hit(e,damage,proxy,level>=3?3:0,false,'physical','turret');if(level>=5)this.area(target,45,50,proxy,0,'physical','turret');}
   this.attackDone(h,'turret');t.fired=now;t.next=now+(level>=6?.875:1.25)/this.buffs(h).speed/((h.toolOverclockUntil||0)>now?h.toolOverclock:1);return true;
  });
 };
 const sell=Game.prototype.sell;Game.prototype.sell=function(id){const refund=sell.call(this,id);if(refund&&this.s.workshop)for(const key of ['rangs','traps','boulders','turrets'])this.s.workshop[key]=this.s.workshop[key].filter(x=>x.owner!==id);return refund;};
}
if(typeof module!=='undefined')module.exports=install;else root.installToolmaker=install;
})(typeof window==='undefined'?globalThis:window);
