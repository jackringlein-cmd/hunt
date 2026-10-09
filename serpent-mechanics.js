/* Water Serpant actions use saved simulation time and existing control limits. */
(function(root){
function install(Game,D){
 const distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
 // Include every nearby route segment, then clip the water's width to the range circle.
 Game.prototype.floodSections=function(h){
  if(h.type!=='serpent'||!h.u[1])return [];
  const radius=this.range(h)+24,sections=[];let section=null;
  for(let i=1;i<this.map.points.length;i++){
   const [ax,ay]=this.map.points[i-1],[bx,by]=this.map.points[i],dx=bx-ax,dy=by-ay,A=dx*dx+dy*dy;
   if(!A)continue;
   const ox=ax-h.x,oy=ay-h.y,B=2*(ox*dx+oy*dy),C=ox*ox+oy*oy-radius*radius,disc=B*B-4*A*C;
   if(disc<0){section=null;continue;}
   const lo=Math.max(0,(-B-Math.sqrt(disc))/(2*A)),hi=Math.min(1,(-B+Math.sqrt(disc))/(2*A));
   if(lo>hi){section=null;continue;}
   const start={x:ax+dx*lo,y:ay+dy*lo},end={x:ax+dx*hi,y:ay+dy*hi};
   if(!section||distance(section[section.length-1],start)>.001){section=[start];sections.push(section);}
   const steps=Math.max(1,Math.ceil(distance(start,end)/8));for(let j=1;j<=steps;j++)section.push({x:start.x+(end.x-start.x)*j/steps,y:start.y+(end.y-start.y)*j/steps});
   if(hi<1)section=null;
  }return sections;
 };
 Game.prototype.inFlood=function(x,y){return this.s.heroes.some(h=>distance(h,{x,y})<=this.range(h)&&this.floodSections(h).some(points=>points.slice(1).some((b,i)=>{const a=points[i],dx=b.x-a.x,dy=b.y-a.y,l=dx*dx+dy*dy,t=l?Math.max(0,Math.min(1,((x-a.x)*dx+(y-a.y)*dy)/l)):0;return Math.hypot(x-a.x-t*dx,y-a.y-t*dy)<=24;})));};
 Game.prototype.sellDryWaterHeroes=function(){if(this._sellingDry||this.s.lost)return;this._sellingDry=true;try{for(const h of this.s.heroes.slice())if((h.type==='serpent'||D.heroes[h.type].waterOnly)&&h.floodDependent&&!this.inWater(h.x,h.y)&&!(h.type==='serpent'&&h.u[1])&&!this.inFlood(h.x,h.y))this.sell(h.id);}finally{this._sellingDry=false;}};
 const originalSell=Game.prototype.sell;Game.prototype.sell=function(id){const refund=originalSell.call(this,id);if(refund)this.sellDryWaterHeroes();return refund;};
 const originalTick=Game.prototype.tick;Game.prototype.tick=function(dt){this.sellDryWaterHeroes();return originalTick.call(this,dt);};
 Game.prototype.serpentMainPath=function(h){return Number.isInteger(h.serpentMainPath)&&h.u[h.serpentMainPath]>0?h.serpentMainPath:h.u[1]?1:h.u[3]?3:h.u[0]?0:h.u[2]?2:-1;};
 Game.prototype.serpentLurkPoint=function(h){const p=h.serpentLurk;if(p&&distance(p,h)<=this.range(h))return p;return this.nearest(h.x,h.y);};
 const weight={tiny:1,skeleton:1,runner:1,shield:2,headless:2,brute:3,werewolf:3,captain:4,giant:5};
 Game.prototype.serpentThrow=function(h,power=1,ability=false){
  if((h.stunnedUntil||0)>this.s.time||h.serpentDive||h.serpentStream||this.s.serpentThrows?.some(t=>t.owner===h.id))return false;
  const level=h.u[0],list=this.sorted(h).filter(e=>!e.throwId&&!e.serpentFlight&&!e.serpentDive&&!this.shadowImmune(e)&&!this.nightmareFlight(e).airborne);
  for(const e of list){
   if(!weight[e.type]||weight[e.type]>Math.min(level,5))continue;
   const target=list.filter(o=>o.id!==e.id&&(!e.swarmId||o.swarmId!==e.swarmId)&&o.p<e.p-30).sort((a,b)=>distance(e,a)-distance(e,b))[0];
   if(!target)continue;
   const members=this.swarm(e);if(members.some(m=>(m.displacementCount||0)>=3))continue;
   const pushed=new Set();this.push(e,.001,h,pushed);if(!pushed.size&&!e.effects.some(f=>f.kind==='push'&&f.owner===h.id&&f.end>this.s.time))continue;
   const id=this.s.nextId++,flight={id,owner:h.id,ids:members.map(m=>m.id),target:target.id,start:this.s.time,end:this.s.time+.9,from:{x:e.x,y:e.y},originP:e.p,goal:target.p,damage:ability?800*power:[0,35,60,110,200,400,400][level]};
   for(const m of members)m.serpentFlight=id;
   (this.s.serpentThrows??=[]).push(flight);h.serpentAction={kind:'throw',start:this.s.time,end:flight.end,x:e.x,y:e.y};return true;
  }return false;
 };
 Game.prototype.serpentDragRecovery=function(h,e){
  const seconds={tiny:.5,skeleton:1,runner:1,shield:2,headless:2,hellhound:2,shadow:2,brute:3,fusion:3,werewolf:3,captain:4,giant:6,dragon:8}[e.type]??4;
  const tier=h.u[1]>=5?4/6:h.u[1]>=4?5/6:1;
  const early=this.s.wave>=1&&this.s.wave<=15?1.15:1;
  return seconds*tier/this.buffs(h).speed/early;
 };
 Game.prototype.serpentDrag=function(h,count=1,power=1,ability=false){
  if((h.stunnedUntil||0)>this.s.time||h.serpentDive||h.serpentStream||this.s.serpentThrows?.some(t=>t.owner===h.id))return false;
  let taken=0,recovery=0;
  for(const e of this.sorted(h)){
   if(taken>=count)break;
   if(e.throwId||e.serpentFlight||e.serpentDive||this.nightmareFlight(e).airborne||!this.canDamage(e,'water'))continue;
   // Individual grabs leave the rest of a swarm on the surface.
   if(!this.apply(e,'stun',2,1,h.id,{},true))continue;
   const level=h.u[1];e.serpentDive={owner:h.id,start:this.s.time,end:this.s.time+2,execute:!D.enemies[e.type].boss&&D.enemies[e.type].hp<=[0,80,200,500,1200,2000,2000][level],damage:ability?800*power:[0,45,80,150,250,400,400][level]};
   h.serpentLurk={x:e.x,y:e.y};h.serpentDive={start:this.s.time,end:this.s.time+2,x:e.x,y:e.y};recovery=Math.max(recovery,this.serpentDragRecovery(h,e));taken++;
  }if(taken)h.serpentDiveAt=this.s.time+2+recovery;return taken>0;
 };
 Game.prototype.serpentBeam=function(h,damage,max,width,push,ignore=0,streamHits=null){
  const target=this.sorted(h)[0];if(!target)return false;
  const pushed=new Set();for(const e of this.lineTargets(h,target,this.range(h),width,max)){if(e.serpentDive||e.serpentFlight)continue;this.hit(e,damage,h,ignore,false,'water','stream');if(push&&(!streamHits||!streamHits.includes(e.swarmId||e.id))){this.push(e,push,h,pushed);if(streamHits)streamHits.push(e.swarmId||e.id);}}
  const d=distance(h,target)||1,end={x:h.x+(target.x-h.x)/d*this.range(h),y:h.y+(target.y-h.y)/d*this.range(h)};
  if(streamHits&&h.serpentStream)h.serpentStream.visual={x:h.x,y:h.y,tx:end.x,ty:end.y,width:width*1.6};else this.fx('waterBeam',h,end,'#9ce9f5',width*1.6);h.face={x:target.x,y:target.y};return true;
 };
 Game.prototype.serpentAttack=function(h,mode=this.serpentMainPath(h)){
  if(h.serpentDive||h.serpentStream||this.s.serpentThrows?.some(t=>t.owner===h.id))return false;
  if(mode>=0&&mode!==3)return false;
  const e=this.sorted(h)[0];if(!e)return false;
  h.serpentSurfaceUntil=this.s.time+.4;const level=mode===3?h.u[3]:0;if(level){h.serpentStream={start:this.s.time,end:this.s.time+1,next:this.s.time,pulses:0,level,pushed:[]};h.serpentBeamAt=this.s.time+1+this.stats({...h,serpentMainPath:3}).interval;this.updateSerpentStream(h);}
  else {this.hit(e,16,h,0,false,'water');this.fx('waterShot',h,e,'#88e3ef');h.face={x:e.x,y:e.y};}
  h.count++;if(this.buffs(h).extra&&h.count%5===0)this.hit(e,this.stats({...h,serpentMainPath:mode}).baseDamage,h,0,false,'water');this.emit('attack',{hero:'serpent'});return true;
 };
 Game.prototype.updateSerpentStream=function(h){
  const stream=h.serpentStream;if(!stream)return;
  if((h.stunnedUntil||0)>this.s.time){delete h.serpentStream;h.serpentSurfaceUntil=this.s.time;return;}
  const level=stream.level;
  while(stream.pulses<5&&stream.next<=this.s.time+1e-9){
   if(!this.serpentBeam(h,[0,22,32,50,80,130,130][level],[0,3,5,8,8,12,12][level],level>=4?32:18,level>=5?80:level>=4?50:level>=3?30:0,level>=4?3:0,stream.pushed)){delete h.serpentStream;h.serpentSurfaceUntil=this.s.time;return;}
   stream.pulses++;stream.next=stream.start+stream.pulses*.2;
  }
  h.serpentSurfaceUntil=stream.end;
  if(this.s.time>=stream.end)delete h.serpentStream;
 };
 Game.prototype.serpentCast=function(h,a){
  h.serpentSurfaceUntil=this.s.time+.5;
  if(a.path===0||a.path===1){const blocks=this.s.enemies.reduce((sum,e)=>sum+e.blocks,0);const used=a.path===0?this.serpentThrow(h,a.power,true):this.serpentDrag(h,5,a.power,true);return used||this.s.enemies.reduce((sum,e)=>sum+e.blocks,0)<blocks;}
  if(a.path===3)return this.serpentBeam(h,600*a.power,20,55,150,999);
  const list=this.sorted(h).slice(0,12);if(!list.length)return false;
  for(const e of list){if((e.slowCount||0)<12)this.apply(e,'stun',2*a.power,1,h.id);else this.apply(e,'fear',3*a.power,1,h.id);}
  h.gooseBurstUntil=this.s.time+2;return true;
 };
 Game.prototype.updateSerpents=function(){
  const now=this.s.time;
  for(const e of this.s.enemies){const dive=e.serpentDive;if(!dive)continue;const h=this.s.heroes.find(h=>h.id===dive.owner),cancel=!h||(h.stunnedUntil||0)>now||this.shadowImmune(e);
   if(cancel||now>=dive.end||e.dead){delete e.serpentDive;e.effects=e.effects.filter(f=>!(f.kind==='stun'&&f.owner===dive.owner));if(!cancel&&!e.dead)this.hit(e,dive.execute?(e.hp+e.shield+1)*10:dive.damage,h,999,false,'water');this.fx('ring',e,e,'#99edee',32);}
  }
  const flights=this.s.serpentThrows||[];this.s.serpentThrows=[];
  for(const t of flights){const h=this.s.heroes.find(h=>h.id===t.owner),members=this.s.enemies.filter(e=>t.ids.includes(e.id)&&!e.dead),cancel=!h||(h.stunnedUntil||0)>now;
   const movingTarget=this.s.enemies.find(e=>e.id===t.target&&!e.dead);if(movingTarget)t.goal=Math.min(t.originP??t.goal,movingTarget.p);const landing=this.position(t.goal),u=Math.min(1,(now-t.start)/(t.end-t.start));
   if(cancel||u>=1){for(const e of members){delete e.serpentFlight;if(!cancel)e.p=t.goal;Object.assign(e,this.position(e.p));if(!cancel)this.hit(e,t.damage,h);}if(members[0]?.swarmId)this.arrangeSwarm(members);if(!cancel){const target=this.s.enemies.find(e=>e.id===t.target&&!e.dead);if(target&&distance(target,landing)<65)this.hit(target,t.damage,h);this.fx('ring',landing,landing,'#9edcdd',50);}}
   else {members.forEach((e,i)=>{e.x=t.from.x+(landing.x-t.from.x)*u+(members.length>1?Math.cos(i*6.28/members.length)*15:0);e.y=t.from.y+(landing.y-t.from.y)*u-Math.sin(u*Math.PI)*75;});this.s.serpentThrows.push(t);}
  }
  for(const h of this.s.heroes){if(h.type!=='serpent')continue;this.updateSerpentStream(h);if(h.serpentDive&&((h.stunnedUntil||0)>now||now>=h.serpentDive.end))delete h.serpentDive;if((h.stunnedUntil||0)>now)continue;
   if(h.serpentDive||h.serpentStream||this.s.serpentThrows.some(t=>t.owner===h.id))continue;
   const main=this.serpentMainPath(h),keys=['serpentThrowAt','serpentDiveAt','gooseAt','serpentBeamAt'];
   if(main<0)continue;
   // The preferred path wins when ready; the other purchased path fills its recovery time.
   const path=(h[keys[main]]||0)<=now?main:h.u.findIndex((tier,p)=>tier>0&&p!==main&&(h[keys[p]]||0)<=now);
   if(path<0)continue;
   const interval=this.stats({...h,serpentMainPath:path}).interval;
   if(path===0&&this.inRange(h).length){this.serpentThrow(h);h.serpentThrowAt=now+interval;}
   if(path===1&&this.inRange(h).length){if(!this.serpentDrag(h))h.serpentDiveAt=now+interval;}
   if(path===2){const spots=this.trapSpot(h);if(spots.length){h.serpentSurfaceUntil=now+.5;h.gooseCount=(h.gooseCount||0)+1;const point=spots[Math.floor(this.random()*spots.length)];(this.s.geese??=[]).push({owner:h.id,...point,end:now+12,fear:h.u[2]>=2&&h.gooseCount%2===0});h.gooseAt=now+interval;}}
   if(path===3&&this.serpentAttack(h,3)){h.clock=interval;}

  }
  this.s.geese=(this.s.geese||[]).filter(goose=>{const h=this.s.heroes.find(h=>h.id===goose.owner);if(!h||goose.end<=now)return false;if((h.stunnedUntil||0)>now)return true;const list=this.s.enemies.filter(e=>!e.dead&&this.canDetect(h,e)&&!e.serpentDive&&!e.serpentFlight&&!e.throwId&&!this.nightmareFlight(e).airborne&&distance(e,goose)<38).slice(0,h.u[2]>=5?6:h.u[2]>=3?3:1);if(!list.length)return true;for(const e of list)this.apply(e,goose.fear?'fear':'stun',goose.fear?(h.u[2]>=4?1.5:1):(h.u[2]>=4?1:.5),1,h.id);this.fx('ring',goose,goose,'#f5eacc',40);return false;});
 };
}
if(typeof module!=='undefined')module.exports=install;else root.installSerpent=install;
})(typeof window==='undefined'?globalThis:window);
