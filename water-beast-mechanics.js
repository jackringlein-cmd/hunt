/* Water placement form. Actions are exclusive and use saved simulation-time state. */
(function(root){function install(Game,D){
 const dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
 Game.prototype.waterTargets=function(h){return this.s.enemies.filter(e=>this.canDetect(h,e)&&dist(h,e)<=this.range(h)&&!e.dead&&!e.turtleHeld&&!e.serpentDive&&!e.serpentFlight&&!e.throwId).sort((a,b)=>b.hp-a.hp||a.id-b.id);};
 Game.prototype.waterReady=function(h){return !h.waterAction&&(h.waterRecovery||0)<=this.s.time&&(h.stunnedUntil||0)<=this.s.time;};
 Game.prototype.waterBeastBite=function(h){if(!this.waterReady(h))return false;const e=this.sorted(h,this.waterTargets(h).filter(e=>dist(h,e)<=95&&!this.nightmareFlight(e).airborne))[0];if(!e)return false;this.hit(e,28,h);h.count++;h.waterBiteAt=this.s.time;h.face={x:e.x,y:e.y};return true;};
 Game.prototype.gazeStopped=function(e){return (e.gazeUntil||0)>this.s.time&&!this.s.heroes.some(h=>h.id===e.gazeOwner&&(h.stunnedUntil||0)>this.s.time);};
 Game.prototype.canGaze=function(e){return !e.dead&&this.swarm(e).every(m=>(m.gazeCount||0)<2&&(m.gazeUntil||0)+3<=this.s.time||((m.gazeCount||0)===0&&!m.gazeUntil));};
 Game.prototype.stopWithGaze=function(e,h,duration){if(!this.canDetect(h,e)||!this.canGaze(e))return false;for(const m of this.swarm(e)){m.gazeCount=(m.gazeCount||0)+1;m.gazeUntil=this.s.time+duration;m.gazeOwner=h.id;}this.fx('ring',e,e,'#d4e7a0',28);return true;};
 Game.prototype.startWaterAction=function(h,path,power=1){if(!h.u[path]||!this.waterReady(h))return false;const candidates=this.waterTargets(h).filter(e=>path===3?this.canGaze(e):!this.nightmareFlight(e).airborne),target=candidates[0];if(!target)return false;const now=this.s.time,n=h.u[path],spot=this.nearest(target.x,target.y);h.waterAction={path,n,power,start:now,end:now+[1.4,3,3.6,2][path],target:target.id,to:{x:spot.x,y:spot.y},last:{x:h.x,y:h.y},hits:[[],[]],pulse:0};h.waterNext??=[0,0,0,0];h.waterNext[path]=h.waterAction.end+[8,9,16,10][path]/this.buffs(h).speed;h.face={x:target.x,y:target.y};return true;};
 Game.prototype.waterPosition=function(h){const a=h.waterAction;if(!a)return{x:h.x,y:h.y};const t=this.s.time-a.start;let f=0,lift=0;if(a.path===0)f=t<.7?t/.7:1-(t-.7)/.7;if(a.path===2){if(t<2)return{x:h.x,y:h.y,submerged:true};const q=(t-2)/.8;f=q<=1?q:2-q;lift=Math.sin(Math.min(1,Math.max(0,q%1))*Math.PI)*(q<=1?105:65);}f=Math.max(0,Math.min(1,f));return{x:h.x+(a.to.x-h.x)*f,y:h.y+(a.to.y-h.y)*f,lift};};
 Game.prototype.updateWaterBeasts=function(dt){const now=this.s.time;for(const h of this.s.heroes){if(h.type!=='waterbeast')continue;const a=h.waterAction;if((h.stunnedUntil||0)>now){if(a){a.start+=dt;a.end+=dt;h.waterNext[a.path]+=dt;}continue;}if(a){const age=now-a.start;
 if(a.path===0){const current=this.waterPosition(h),pass=age<.7?0:1,segments=age-dt<.7&&age>=.7?[[a.last,a.to,0],[a.to,current,1]]:[[a.last,current,pass]];for(const [from,to,leg]of segments){const dx=to.x-from.x,dy=to.y-from.y,len=dx*dx+dy*dy;for(const e of this.s.enemies){if(!this.canDetect(h,e)||e.dead||e.serpentDive||e.serpentFlight||e.turtleHeld||this.nightmareFlight(e).airborne||a.hits[leg].includes(e.id)||a.hits[leg].length>=8+4*a.n)continue;const f=len?Math.max(0,Math.min(1,((e.x-from.x)*dx+(e.y-from.y)*dy)/len)):0;if(dist(e,{x:from.x+dx*f,y:from.y+dy*f})<32){a.hits[leg].push(e.id);this.hit(e,(35+35*a.n)*a.power,h,0,false,'water');}}}a.last=current;}
 if(a.path===1){while(a.pulse<3&&age>=a.pulse){a.pulse++;for(const e of this.waterTargets(h))this.apply(e,'slow',(2+a.n*.5)*a.power,(20+5*a.n)/100,h.id);this.fx('ring',h,h,'#8ed6ed',230);}}
 if(a.path===2&&age>=2&&!a.launched){a.launched=true;const target=this.s.enemies.find(e=>e.id===a.target&&!e.dead);if(target&&dist(h,target)<=this.range(h))a.to=this.nearest(target.x,target.y);}
 if(a.path===2&&age>=2.8&&!a.landed){a.landed=true;this.area(a.to,35+a.n*5,(200+200*a.n)*a.power,h,0,'water','slam');this.fx('explosion',a.to,a.to,'#b0e5ed',50);}
 if(a.path===3){const target=this.s.enemies.find(e=>e.id===a.target);if(target)a.to={x:target.x,y:target.y};}
 if(now>=a.end){if(a.path===3){const e=this.s.enemies.find(e=>e.id===a.target&&!e.dead);if(e&&dist(h,e)<=this.range(h))this.stopWithGaze(e,h,(2+a.n*.5)*a.power);}if(a.path===0)h.waterRecovery=now+3;delete h.waterAction;}continue;}
 if(!this.waterReady(h))continue;h.waterNext??=[0,0,0,0];for(const path of [3,2,1,0])if(h.u[path]&&(h.waterNext[path]||0)<=now&&this.startWaterAction(h,path))break;
 }};
}
if(typeof module!=='undefined')module.exports=install;else root.installWaterBeast=install;
})(typeof window==='undefined'?globalThis:window);
