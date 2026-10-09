/* Turtle attacks and treasure use saved simulation time; all captures are reversible. */
(function(root){function install(Game,D){
 const dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y),clamp=x=>Math.max(0,Math.min(1,x));
 const segment=(e,a,b)=>{const x=b.x-a.x,y=b.y-a.y,l=x*x+y*y,t=l?clamp(((e.x-a.x)*x+(e.y-a.y)*y)/l):0;return Math.hypot(e.x-a.x-t*x,e.y-a.y-t*y);};
 Game.prototype.turtleSubmerged=function(h){return h?.type==='turtle'&&h.u[3]>0&&h.target==='submerged';};
 Game.prototype.turtleBusy=function(h){return !!h.turtleAction||(h.turtleRecoverUntil||0)>this.s.time;};
 Game.prototype.turtleTargets=function(h,r=230){return this.sorted(h,this.inRange(h,r*this.range(h)/this.baseRange(h)).filter(e=>!e.throwId&&!e.throwBusy&&!this.nightmareFlight(e).airborne));};
 Game.prototype.turtleAttack=function(h){if(this.turtleSubmerged(h)||this.turtleBusy(h))return false;const e=this.turtleTargets(h,110)[0];if(!e)return false;const n=h.u[0],fire=n>=3;this.hit(e,[20,24,30,42,60,85,120][n],h,0,false,fire?'fire':'physical');if(fire)this.apply(e,'burn',3,[0,0,0,6,10,16,24][n],h.id);h.count++;h.face={x:e.x,y:e.y};h.turtleBiteAt=this.s.time;this.fx('slash',h,e,fire?'#ffab50':'#d2e4a2',26);this.emit('attack',{hero:'turtle'});return true;};
 Game.prototype.turtleSlam=function(h,power=0){if(this.turtleBusy(h)||this.turtleSubmerged(h))return false;const e=this.turtleTargets(h)[0];if(!e)return false;const n=h.u[1],to=this.nearest(e.x,e.y);h.face={x:e.x,y:e.y};h.turtleAction={kind:'slam',start:this.s.time,end:this.s.time+2.1,from:{x:h.x,y:h.y},to:{x:to.x,y:to.y},damage:power?1000*power:[0,60,100,170,280,450,700][n],radius:power?120:[0,45,55,65,75,85,100][n],limit:power?35:[0,4,6,9,12,18,25][n],hit:false};return true;};
 Game.prototype.releaseTurtle=function(h,damage=0){const groups=new Set();for(const e of this.s.enemies){if(e.turtleHeld?.owner!==h.id)continue;const hold=e.turtleHeld;if(e.swarmId)groups.add(e.swarmId);delete e.turtleHeld;delete e.serpentFlight;e.p=hold.p;Object.assign(e,this.position(e.p));e.effects=e.effects.filter(f=>!(f.kind==='stun'&&f.owner===h.id));if(damage&&!e.dead)this.hit(e,damage,h);}for(const id of groups){const members=this.s.enemies.filter(e=>!e.dead&&e.swarmId===id);if(members.length)this.arrangeSwarm(members);}};
 Game.prototype.turtleShell=function(h,power=0){if(this.turtleBusy(h)||this.turtleSubmerged(h))return false;const targets=this.turtleTargets(h);if(!targets.length)return false;const n=h.u[2],e=targets[0],to=this.nearest(e.x,e.y);h.turtleAction={kind:'shell',start:this.s.time,end:this.s.time+2.4,from:{x:h.x,y:h.y},to:{x:to.x,y:to.y},x:h.x,y:h.y,damage:power?700*power:[0,45,80,140,220,350,520][n],pierce:power?30:[0,3,5,8,12,16,22][n],maxHp:[0,200,500,1500,2500,15000,15000][n],groups:n||1,packed:false,out:[],back:[],blast:power?500*power:[0,0,0,0,160,260,420][n],radius:power?130:[0,0,0,0,90,110,130][n],shards:power?16:[0,0,0,0,8,12,16][n],shardDamage:power?120*power:[0,0,0,0,45,70,100][n]};h.face={x:e.x,y:e.y};return true;};
 Game.prototype.turtlePackSize=function(e){return e.type==='tiny'?.1:e.type==='giant'?3:['brute','fusion','werewolf'].includes(e.type)?2:1;};
 Game.prototype.packTurtle=function(h,a){let count=0;a.grabs=[];a.packStart=this.s.time;const groups=new Set();for(const e of this.turtleTargets(h)){const group=e.swarmId||e.id;if(groups.has(group))continue;groups.add(group);if(count>=a.groups)break;const members=this.swarm(e).filter(m=>!m.dead&&!m.serpentFlight&&!m.serpentDive),space=Math.round(members.reduce((sum,m)=>sum+this.turtlePackSize(m),0)*10)/10;if(!members.length||count+space>a.groups)continue;if(D.enemies[e.type].boss||D.enemies[e.type].hp>a.maxHp||!this.canDamage(e,'physical')||!this.apply(e,'stun',2.5,1,h.id))continue;for(const member of members){a.grabs.push({...member,effects:member.effects.map(f=>({...f}))});member.turtleHeld={owner:h.id,p:member.p};member.serpentFlight=true;}count+=space;}a.packed=true;a.loaded=this.s.enemies.filter(e=>e.turtleHeld?.owner===h.id).length;};
 Game.prototype.turtleCast=function(h,a){if((h.stunnedUntil||0)>this.s.time)return false;if(a.path===3){if(this.turtleBusy(h))return false;h.target='submerged';h.turtleTreasureUntil=this.s.time+10;h.turtleTreasureBoost=1+a.power;return true;}if(this.turtleSubmerged(h)||this.turtleBusy(h))return false;if(a.path===0){h.turtleFrenzyUntil=this.s.time+8;h.turtleFrenzySpeed=1+a.power;return true;}return a.path===1?this.turtleSlam(h,a.power):this.turtleShell(h,a.power);};
 Game.prototype.updateTurtles=function(dt){const now=this.s.time;
  // Recover captures even if a hero vanished from an older save.
  for(const e of this.s.enemies)if(e.turtleHeld&&!this.s.heroes.some(h=>h.id===e.turtleHeld.owner)){const h={id:e.turtleHeld.owner};this.releaseTurtle(h);}
  for(const h of this.s.heroes){if(h.type!=='turtle')continue;const submerged=this.turtleSubmerged(h),stunned=(h.stunnedUntil||0)>now;
   if(stunned||submerged){if(h.turtleAction){this.releaseTurtle(h);delete h.turtleAction;}if(submerged&&!stunned){const rate=[0,1/3,.5,1,2,3,5][h.u[3]],boost=(h.turtleTreasureUntil||0)>now?h.turtleTreasureBoost:1;h.turtleCoins=(h.turtleCoins||0)+dt*rate*boost;const coins=Math.floor(h.turtleCoins+1e-9);if(coins){h.turtleCoins=Math.max(0,h.turtleCoins-coins);this.s.money+=coins;h.turtleLastGold=now;}}continue;}
   if(this.s.enemies.some(e=>e.turtleHeld?.owner===h.id&&this.shadowImmune(e))){this.releaseTurtle(h);delete h.turtleAction;}const a=h.turtleAction;if(a){const age=now-a.start;
    if(a.kind==='slam'){if(!a.hit&&age>=1){a.hit=true;for(const e of this.turtleTargets(h,2000).filter(e=>dist(e,a.to)<=a.radius).slice(0,a.limit))this.hit(e,a.damage,h,0,false,'physical','slam');this.fx('ring',a.to,a.to,'#d6bd8a',a.radius);}
     if(now>=a.end)delete h.turtleAction;
    }else{
     if(!a.packed&&age>=.18)this.packTurtle(h,a);
     const flight=clamp((age-.8)/1.6),prev=clamp((age-dt-.8)/1.6),point=t=>{const f=t<=.5?t*2:(1-t)*2;return{x:a.from.x+(a.to.x-a.from.x)*f,y:a.from.y+(a.to.y-a.from.y)*f};};
     const endpoint=a.blast?Math.min(flight,.5):flight,times=prev<.5&&endpoint>.5?[prev,.5,endpoint]:[Math.min(prev,endpoint),endpoint];
     for(let i=1;i<times.length;i++){const from=point(times[i-1]),to=point(times[i]),hits=times[i-1]>=.5?a.back:a.out;for(const e of this.turtleTargets(h,2000).filter(e=>segment(e,from,to)<=26).sort((x,y)=>dist(x,from)-dist(y,from))){if(age<.8||hits.length>=a.pierce)break;if(hits.includes(e.id))continue;hits.push(e.id);this.hit(e,a.damage,h);}}
     Object.assign(a,point(endpoint));
     if(a.blast&&flight>=.5){this.releaseTurtle(h,a.damage);const targets=this.turtleTargets(h,2000).filter(e=>dist(e,a.to)<=a.radius);for(const e of targets)this.hit(e,a.blast,h);for(let i=0;i<a.shards;i++){const angle=i*Math.PI*2/a.shards,to={x:a.to.x+Math.cos(angle)*a.radius*1.5,y:a.to.y+Math.sin(angle)*a.radius*1.5};for(const e of this.lineTargets(a.to,to,a.radius*1.5,12,2,h))if(!e.serpentDive&&!e.serpentFlight)this.hit(e,a.shardDamage,h);}
      h.turtleBurst={x:a.to.x,y:a.to.y,radius:a.radius,start:now,end:now+.7,shards:a.shards};h.turtleRecoverUntil=now+1;delete h.turtleAction;this.fx('explosion',a.to,a.to,'#e8cd88',a.radius);
     }else if(now>=a.end){this.releaseTurtle(h,a.damage);delete h.turtleAction;}
    }continue;
   }
   if(this.turtleBusy(h))continue;const speed=this.buffs(h).speed*(this.s.wave>=1&&this.s.wave<=15?1.15:1);
   const ready=[h.u[1]&&(h.turtleSlamAt||0)<=now,h.u[2]&&(h.turtleShellAt||0)<=now];const shellFirst=(h.turtleLastSpecial||'slam')==='slam';
   for(const p of shellFirst?[2,1]:[1,2]){if(!ready[p-1])continue;const success=p===1?this.turtleSlam(h):this.turtleShell(h);if(success){h.turtleLastSpecial=p===1?'slam':'shell';h[p===1?'turtleSlamAt':'turtleShellAt']=now+(p===1?(h.u[1]>=5?4:h.u[1]>=3?5:6):(h.u[2]>=5?5:h.u[2]>=3?6:7))/speed;break;}}
  }
 };
 const sell=Game.prototype.sell;Game.prototype.sell=function(id){const h=this.s.heroes.find(h=>h.id===id);if(h?.type==='turtle'&&!this.s.lost)this.releaseTurtle(h);return sell.call(this,id);};
}
if(typeof module!=='undefined')module.exports=install;else root.installTurtle=install;
})(typeof window==='undefined'?globalThis:window);
