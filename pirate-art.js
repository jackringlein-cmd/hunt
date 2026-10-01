/* The reference's shallow boat and large hat, rendered in the game's outlined style. */
window.PirateArt=(()=>{
 const ink='#302726';
 function shape(c,pts,color){c.beginPath();pts.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.fillStyle=color;c.fill();c.strokeStyle=ink;c.lineWidth=2;c.lineJoin='round';c.stroke();}
 function oval(c,x,y,rx,ry,color){c.beginPath();c.ellipse(x,y,rx,ry,0,0,7);c.fillStyle=color;c.fill();c.strokeStyle=ink;c.lineWidth=1.7;c.stroke();}
 function line(c,p,color,width=2){c.beginPath();p.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.strokeStyle=color;c.lineWidth=width;c.lineCap='round';c.stroke();}
 function hat(c,x,y,angle=0,level=0){c.save();c.translate(x,y);c.rotate(angle);shape(c,[[-22,4],[-26,-5],[-15,-4],[-7,-14],[7,-14],[15,-4],[26,-7],[23,5],[8,9],[-9,9]],level>=5?'#473444':'#31363d');line(c,[[-21,1],[-11,4],[10,4],[21,0]],'#e4b766',2);oval(c,0,-3,4,4,'#eee2c2');for(const x of [-1.5,1.5])oval(c,x,-3,1,1,'#302726');line(c,[[-4,3],[4,6]],'#eee2c2',1);line(c,[[4,3],[-4,6]],'#eee2c2',1);c.restore();}
 function hero(c,h,{time=0,active=false,selected=false,ghost=false,attack=0}={}){
  c.save();let x=h.x,y=h.y;const ram=h.pirateRam;if(ram){const t=Math.max(0,Math.min(1,(time-ram.start)/(ram.end-ram.start))),f=t<.5?Math.sin(t*Math.PI):Math.sin((1-t)*Math.PI);x+=(ram.to.x-h.x)*f;y+=(ram.to.y-h.y)*f;}
  c.translate(x,y);if(ghost)c.globalAlpha=.55;const u=h.u,face=h.face&&h.face.x>h.x?-1:1;c.scale(face,1);const bob=active?Math.sin(time*2.5+h.id)*1.2:0;c.translate(0,bob);
  oval(c,0,12,44,8,'#83c5d54a');line(c,[[-47,10],[-29,15],[5,17],[38,10]],'#c1e7e4',2);if(selected)oval(c,0,12,49,12,'#edda7c25');
  // Standing sailor: red bandanna, eyepatch, coat, belt, forward rock-throwing arm.
  shape(c,[[-8,-36],[8,-35],[15,-10],[-13,-9]],'#792d36');shape(c,[[-4,-34],[5,-34],[7,-12],[-6,-12]],'#e8d9b0');line(c,[[-11,-16],[11,-16]],'#332d2e',4);shape(c,[[-2,-18],[3,-18],[3,-14],[-2,-14]],'#d5ac59');
  oval(c,0,-45,12,14,'#d2a37b');shape(c,[[-10,-40],[-4,-37],[5,-39],[9,-42],[6,-31],[-2,-29],[-9,-33]],'#544135');
  line(c,[[-11,-51],[9,-44]],'#302726',2);oval(c,-5,-46,4,3,'#25272a');oval(c,5,-47,1.5,2,'#292526');shape(c,[[-11,-56],[-7,-62],[10,-56],[12,-51],[-10,-52]],'#ae3840');
  const swing=active?Math.sin(attack*Math.PI):0;line(c,[[-8,-32],[-18,-29],[-27-swing*7,-35+swing*6]],ink,9);line(c,[[-8,-32],[-18,-29],[-27-swing*7,-35+swing*6]],'#c49370',5);oval(c,-28-swing*7,-35+swing*6,5,4,'#d2a37b');
  line(c,[[10,-31],[18,-20],[12,-15]],'#c49370',6);if(!h.pirateHat)hat(c,0,-60,0,u[3]);
  if(!h.pirateRock||time>h.pirateRock.end)shape(c,[[-34,-39],[-27,-44],[-22,-39],[-24,-32],[-31,-32]],u[1]>=4?'#555d6a':'#929c9e');
  // Reference-shaped wide wooden hull, plank seams, pointed forward bow.
  shape(c,[[-48,-10],[-23,-4],[39,-6],[45,-11],[42,6],[29,18],[-21,18],[-36,8]],u[0]>=4?'#635346':'#956a46');line(c,[[-43,-6],[-24,0],[35,-1],[43,-7]],'#d3a86c',4);line(c,[[-31,6],[32,6]],'#574337');line(c,[[-22,13],[23,13]],'#574337');
  for(const x of [-24,24])line(c,[[x,-1],[x+2,13]],u[0]>=2?'#a8b4b8':'#624a36',3);
  if(u[0])shape(c,[[-47,-9],[-60-(u[0]>=3?10:0),-15],[-40,5]],u[0]>=2?'#b7c6cd':'#b78c50');if(u[0]>=3)line(c,[[-65,-13],[-45,-6]],'#eef1de',2);
  const count=[0,1,1,2,2,3,4][u[2]];for(let i=0;i<count;i++){const cx=-25+i*16;oval(c,cx,2,6,6,'#4a3b32');shape(c,[[cx-4,0],[cx-4,-15],[cx+4,-15],[cx+5,0]],'#555e68');oval(c,cx,-15,4,2,'#20272e');if(active&&time-(h.pirateFired??-10)<.2)shape(c,[[cx-6,-18],[cx-2,-26],[cx,-21],[cx+3,-29],[cx+6,-17]],'#ffc76a');}
  c.restore();
 }
 function projectiles(c,game){for(const h of game.s.heroes){if(h.type!=='pirate')continue;const now=game.s.time;
  const shots=[...(h.pirateBalls||[]),...(h.pirateRock?[h.pirateRock]:[])];for(const shot of shots){if(now>shot.end)continue;const f=Math.max(0,(now-shot.start)/(shot.end-shot.start)),x=shot.from.x+(shot.to.x-shot.from.x)*f,y=shot.from.y+(shot.to.y-shot.from.y)*f-Math.sin(f*Math.PI)*28;c.save();c.translate(x,y);c.rotate(f*6);if(shot===h.pirateRock)shape(c,[[-6,-3],[0,-7],[7,-2],[5,5],[-4,5]],shot.sharp?'#647583':'#9daba7');else{oval(c,0,0,6,6,'#313c45');line(c,[[-8,0],[-17,3]],'#ff9b4a',4);}c.restore();}
  if(h.pirateHat)hat(c,h.pirateHat.x,h.pirateHat.y,(now-h.pirateHat.start)*14,h.u[3]);
 }}
 return {hero,projectiles};
})();
