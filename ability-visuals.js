// Clear ability feedback, drawn separately from damage and targeting logic.
window.AbilityVisuals=(()=>{
 let notices=[];
 const labels={pirate:['Boat charge','Razor rock volley','Fire broadside','Returning stun hat'],toolmaker:['Twelve-weapon sweep','Returning blade storm','Boulder trap placed','Turrets overclocked'],serpent:['Colossal throw','Drag underwater','Spectral flock','Tidal beam'],knight:['Ground slam','Rapid cuts + stun','Push back + stun','Holy fire'],archer:['Splitting arrows','Explosive arrows','Fire, frost + lightning','Powerful shot'],rogue:['Finishing strike','Poison cloud','Traps placed','Extra gold'],leader:['Damage + speed boost','Enemies flee','Abilities refreshed','Extra gold + speed'],mage:['Falling meteors','Snow + freezing','Lightning strikes','Stronger magic beams']};
 const colors={pirate:['#b4c9cf','#8eacb9','#ff9b4b','#c7a1df'],toolmaker:['#e5ad73','#8fcbd5','#b7c07d','#b6a2db'],serpent:['#8acdb1','#69c6e6','#e8d698','#88aafa'],knight:['#e4b965','#fff0b4','#a9d9ef','#ffe797'],archer:['#c7e596','#ffab59','#a1e6f1','#ffefa9'],rogue:['#deb4ed','#bada79','#dfbe86','#ffe276'],leader:['#ffcc76','#d9a5eb','#a4e5e0','#ffe276'],mage:['#ffa468','#c1efff','#bcb6ff','#e1aaff']};
 function used(ev,time){notices.push({...ev,at:time});if(notices.length>12)notices.shift();}
 function ring(c,x,y,r,color){c.strokeStyle=color;c.lineWidth=2;c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.stroke();}
 function text(c,value,x,y,color,size=12){c.font='bold '+size+'px sans-serif';c.textAlign='center';c.lineJoin='round';c.strokeStyle='#26202f';c.lineWidth=4;c.strokeText(value,x,y);c.fillStyle=color;c.fillText(value,x,y);}
 function draw(c,game,time){
  c.save();
  for(const h of game.s.heroes){const v=h.abilityVisual;if(!v||v.end<=game.s.time||!game.s.active||(h.stunnedUntil||0)>game.s.time)continue;
   const color=colors[h.type][v.path],age=game.s.time-v.started,left=v.end-game.s.time;
   // The active caster stays marked until the effect finishes.
   c.globalAlpha=.85;c.strokeStyle=color;c.lineWidth=3;c.beginPath();c.ellipse(h.x,h.y+12,27,10,0,0,Math.PI*2);c.stroke();
   for(let i=0;i<4;i++){const a=time*3+i*Math.PI/2;ring(c,h.x+Math.cos(a)*24,h.y-30+Math.sin(a)*12,2,color);}
   if(left>1)text(c,labels[h.type][v.path]+' · '+Math.ceil(left)+'s',h.x,h.y+32,color,11);
   const zone=game.s.zones.find(z=>z.owner===h.id&&['weather','fog','meteor','blizzard','storm'].includes(z.kind));
   if(zone){
    c.globalAlpha=.6;c.setLineDash([7,5]);ring(c,zone.x,zone.y,zone.r,color);c.setLineDash([]);
    // Short moving flecks show the type of effect inside the real zone.
    for(let i=0;i<12;i++){const a=i*2.4,rad=zone.r*Math.sqrt((i+.5)/12),x=zone.x+Math.cos(a)*rad,y=zone.y+Math.sin(a)*rad;
     if(zone.kind==='meteor'){const fall=(time*2+i*.23)%1;c.strokeStyle='#ffad5c';c.lineWidth=4;c.beginPath();c.moveTo(x-12,y-48+fall*40);c.lineTo(x,y-20+fall*40);c.stroke();ring(c,x,y,3+fall*6,color);}
     else if(zone.kind==='fog')ring(c,x,y-((time*12+i*3)%16),4+(i%3),color);
     else{c.strokeStyle=color;c.lineWidth=1.5;c.beginPath();c.moveTo(x-4,y);c.lineTo(x+4,y);c.moveTo(x,y-4);c.lineTo(x,y+4);c.stroke();}
    }
   }
   if(h.type==='leader'||h.type==='rogue'&&v.path===3){
    const radius=h.type==='leader'&&v.path===1?game.fearRange(h):game.range(h);
    c.globalAlpha=.22;ring(c,h.x,h.y,radius,color);
    if(h.type==='leader'&&[0,2,3].includes(v.path))for(const ally of game.s.heroes){if(ally.id===h.id||Math.hypot(ally.x-h.x,ally.y-h.y)>radius||(ally.stunnedUntil||0)>game.s.time)continue;c.globalAlpha=.65;ring(c,ally.x,ally.y+6,22,color);text(c,v.path===2?'READY':'BOOST',ally.x,ally.y-84,color,10);}
   }
   if(h.type==='archer'&&v.path===1){c.globalAlpha=.8;for(let i=0;i<5;i++){const a=time*4+i*1.26;ring(c,h.x+Math.cos(a)*20,h.y-25+Math.sin(a)*15,3,'#ffb65e');}}
   if(h.type==='knight'){c.globalAlpha=.5;const r=Math.min(v.range,age*180);ring(c,h.x,h.y,r,color);if(v.path===1)for(let i=0;i<8;i++){const a=time*20+i*.8;c.strokeStyle=color;c.beginPath();c.arc(h.x,h.y,35+i*7,a,a+.5);c.stroke();}}
   if(h.type==='rogue'&&v.path===2){c.globalAlpha=.8;for(const trap of game.s.traps.filter(t=>t.owner===h.id))ring(c,trap.x,trap.y,18,color);}
  }
  notices=notices.filter(n=>time-n.at<1.8);
  for(const n of notices){if(!game.s.heroes.some(h=>h.id===n.owner))continue;const age=time-n.at,color=colors[n.hero][n.path];c.globalAlpha=Math.min(1,(1.8-age)*2);
   const r=24+Math.min(age,1)*50;ring(c,n.x,n.y,r,color);
   c.strokeStyle=color;c.lineWidth=2;c.beginPath();c.moveTo(n.x,n.y-68);c.lineTo(n.x,n.y-40);c.stroke();
   if(Math.hypot(n.tx-n.x,n.ty-n.y)>10){c.globalAlpha*=.6;c.setLineDash([6,5]);c.beginPath();c.moveTo(n.x,n.y-20);c.lineTo(n.tx,n.ty-15);c.stroke();c.setLineDash([]);ring(c,n.tx,n.ty,18+age*10,color);c.globalAlpha=Math.min(1,(1.8-age)*2);}
   // Stack simultaneous nearby notices to avoid hiding their names.
   const stack=notices.slice(0,notices.indexOf(n)).filter(o=>Math.abs(o.x-n.x)<180&&Math.abs(o.y-n.y)<100).length;
   const x=Math.max(140,Math.min(960,n.x)),y=Math.max(30,n.y-102-stack*36-age*8);
   text(c,GameData.heroes[n.hero].name+' • '+n.name,x,y,color,14);
   text(c,labels[n.hero][n.path],x,y+18,'#fff3cb',11);
  }
  c.restore();
 }
 return {used,draw};
})();
