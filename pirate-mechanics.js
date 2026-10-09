/* Pirate: rock volleys, boat charges, fire broadsides and returning stun hats. */
(function(root){function install(Game,D){
 const distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
 const gap=(e,a,b)=>{const dx=b.x-a.x,dy=b.y-a.y,l=dx*dx+dy*dy,t=l?Math.max(0,Math.min(1,((e.x-a.x)*dx+(e.y-a.y)*dy)/l)):0;return Math.hypot(e.x-a.x-t*dx,e.y-a.y-t*dy);};
 Game.prototype.pirateAttack=function(h){if(h.pirateRam)return false;const target=this.sorted(h)[0];if(!target)return false;const n=h.u[1],damage=[14,22,32,48,72,105,150][n],pierce=[1,2,3,5,8,12,18][n];
  for(const e of this.lineTargets(h,target,this.range(h),16,pierce).filter(e=>!e.serpentDive&&!e.serpentFlight))this.hit(e,damage,h,n>=4?3:0);
  h.pirateRock={from:{x:h.x,y:h.y-25},to:{x:target.x,y:target.y},start:this.s.time,end:this.s.time+.35,sharp:n>0};h.face={x:target.x,y:target.y};h.count++;this.emit('attack',{hero:'pirate'});return true;
 };
 Game.prototype.pirateCharge=function(h,damage,limit,ignore){if(h.pirateRam)return false;const target=this.sorted(h).find(e=>!this.nightmareFlight(e).airborne&&!e.throwId);if(!target)return false;
  h.pirateRam={from:{x:h.x,y:h.y},to:{x:target.x,y:target.y},target:target.id,start:this.s.time,end:this.s.time+1,damage,limit,ignore,hit:false};h.face={x:target.x,y:target.y};return true;
 };
 Game.prototype.pirateBroadside=function(h,count,damage,radius){const targets=this.sorted(h);if(!targets.length)return false;h.pirateBalls=[];
  for(let i=0;i<count;i++){const target=targets[i%targets.length];h.pirateBalls.push({from:{x:h.x,y:h.y-8},to:{x:target.x,y:target.y},start:this.s.time,end:this.s.time+.4});this.area(target,radius,damage,h,0,'fire','cannon');this.fx('ring',target,target,'#ff8a39',radius);}
  h.pirateFired=this.s.time;return true;
 };
 // Store the projectile on its owner so saves, selling and round cleanup are automatic.
 Game.prototype.launchPirateHat=function(h,damage,pierce,stun,maxHp){if(h.pirateHat)return false;const target=this.sorted(h)[0];if(!target)return false;
  h.pirateHat={from:{x:h.x,y:h.y-42},to:{x:target.x,y:target.y},target:target.id,x:h.x,y:h.y-42,start:this.s.time,end:this.s.time+1.6,damage,pierce,stun,maxHp:Number.isFinite(maxHp)?maxHp:null,out:[],back:[],stunned:[]};return true;
 };
 Game.prototype.pirateCast=function(h,a){if(h.pirateRam)return false;const p=a.power;
  if(a.path===0)return this.pirateCharge(h,1200*p,24,999);
  if(a.path===1){const targets=this.sorted(h);if(!targets.length)return false;for(const e of targets){this.hit(e,450*p,h);this.fx('arrow',h,e,'#bdc9ce');}return true;}
  if(a.path===2)return this.pirateBroadside(h,6,650*p,90);
  return this.launchPirateHat(h,150*p,16,2*p,Infinity);
 };
 Game.prototype.updatePirates=function(dt){const now=this.s.time;for(const h of this.s.heroes){if(h.type!=='pirate')continue;
  if((h.stunnedUntil||0)>now){delete h.pirateRam;if(h.pirateHat){h.pirateHat.start+=dt;h.pirateHat.end+=dt;}continue;}
  const ram=h.pirateRam;if(ram){if(!ram.hit&&now>=ram.start+.5){ram.hit=true;const target=this.s.enemies.find(e=>e.id===ram.target&&!e.dead&&!e.serpentDive&&!e.serpentFlight);if(target){const dx=target.x-h.x,dy=target.y-h.y,len=Math.hypot(dx,dy)||1,f=Math.min(1,this.range(h)/len);ram.to={x:h.x+dx*f,y:h.y+dy*f};}
    const targets=this.s.enemies.filter(e=>!e.dead&&this.canDetect(h,e)&&!e.serpentDive&&!e.serpentFlight&&!e.throwId&&!this.nightmareFlight(e).airborne&&gap(e,ram.from,ram.to)<35).sort((a,b)=>distance(h,a)-distance(h,b)).slice(0,ram.limit);for(const e of targets)this.hit(e,ram.damage,h,ram.ignore,false,'physical','ram');this.fx('ring',ram.to,ram.to,'#d9d9c8',40);}
   if(now>=ram.end)delete h.pirateRam;
  }
  const hat=h.pirateHat;if(hat){const age=Math.min(1.6,now-hat.start),prev=Math.max(0,age-dt),half=.8;
   if(prev<half){const target=this.s.enemies.find(e=>e.id===hat.target&&!e.dead&&!e.serpentDive&&!e.serpentFlight);if(target)hat.to={x:target.x,y:target.y};}
   const point=t=>{const f=t<=half?t/half:2-t/half;return{x:hat.from.x+(hat.to.x-hat.from.x)*f,y:hat.from.y+(hat.to.y-hat.from.y)*f};};
   const times=prev<half&&age>half?[prev,half,age]:[prev,age];for(let i=1;i<times.length;i++){const from=i===1?{x:hat.x,y:hat.y}:point(times[i-1]),to=point(times[i]),hits=times[i-1]>=half?hat.back:hat.out;
    for(const e of this.s.enemies.filter(e=>!e.dead&&this.canDetect(h,e)&&!e.serpentDive&&!e.serpentFlight&&gap(e,from,to)<=20).sort((a,b)=>distance(from,a)-distance(from,b))){if(hits.length>=hat.pierce)break;if(hits.includes(e.id))continue;hits.push(e.id);this.hit(e,hat.damage,h);if(!hat.stunned.includes(e.swarmId??e.id)&&(hat.maxHp==null||D.enemies[e.type].hp<=hat.maxHp)){hat.stunned.push(e.swarmId??e.id);this.apply(e,'stun',hat.stun,1,h.id);}}}
   Object.assign(hat,point(age));if(now>=hat.end)delete h.pirateHat;
  }
  if(h.pirateRam)continue;
  const u=h.u,speed=this.buffs(h).speed*(this.s.wave>=1&&this.s.wave<=15?1.15:1);
  if(u[2]&&(h.pirateCannonAt||0)<=now&&this.pirateBroadside(h,[0,1,1,2,2,3,4][u[2]],[0,80,140,200,320,480,700][u[2]],[0,45,55,60,70,80,90][u[2]]))h.pirateCannonAt=now+[0,5,5.5,6,6.5,7,7.5][u[2]]/speed;
  if(u[3]&&(h.pirateHatAt||0)<=now&&this.launchPirateHat(h,[0,10,18,30,45,65,90][u[3]],[0,2,3,4,5,6,8][u[3]],[0,.5,.75,1,1.25,1.5,2][u[3]],[0,200,500,1500,15000,Infinity,Infinity][u[3]]))h.pirateHatAt=now+5/speed;
  if(u[0]&&(h.pirateRamAt||0)<=now&&this.pirateCharge(h,[0,45,80,140,240,400,650][u[0]],[0,3,3,5,8,12,16][u[0]],u[0]>=2?3:0))h.pirateRamAt=now+(u[0]>=4?4:5)/speed;
 }};
}
if(typeof module!=='undefined')module.exports=install;else root.installPirate=install;
})(typeof window==='undefined'?globalThis:window);
