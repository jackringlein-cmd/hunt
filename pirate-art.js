/* The reference's shallow boat and large hat, rendered in the game's outlined style. */
window.PirateArt=(()=>{
 const ink='#302726';
 function shape(c,pts,color){c.beginPath();pts.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.fillStyle=color;c.fill();c.strokeStyle=ink;c.lineWidth=2;c.lineJoin='round';c.stroke();}
 function oval(c,x,y,rx,ry,color){c.beginPath();c.ellipse(x,y,rx,ry,0,0,7);c.fillStyle=color;c.fill();c.strokeStyle=ink;c.lineWidth=1.7;c.stroke();}
 function line(c,p,color,width=2){c.beginPath();p.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.strokeStyle=color;c.lineWidth=width;c.lineCap='round';c.stroke();}
 // Each Razor Reef tier has a separate silhouette, facets and mineral details.
 function rock(c,level,x=0,y=0,scale=1){
  const n=Math.max(0,Math.min(6,level||0));c.save();c.translate(x,y);c.scale(scale,scale);
  const outlines=[
   [[-6,-3],[-3,-6],[3,-6],[7,-1],[4,5],[-3,6],[-7,2]],
   [[-8,-2],[-5,-7],[-1,-5],[3,-9],[5,-3],[9,0],[4,6],[-2,5],[-5,8]],
   [[-12,0],[-3,-6],[8,-5],[12,-1],[4,5],[-7,4]],
   [[-11,-4],[-4,-10],[3,-6],[10,-7],[8,0],[12,3],[3,8],[-7,7],[-5,2]],
   [[-12,3],[-6,-7],[-1,-4],[7,-12],[6,-3],[13,1],[5,9],[-3,7]],
   [[-16,5],[-8,-5],[-2,-4],[10,-16],[8,-5],[15,-2],[7,4],[4,12],[-3,7]],
   [[-18,2],[-10,-4],[-11,-12],[-3,-8],[3,-18],[6,-8],[15,-12],[12,-3],[19,2],[9,7],[8,16],[0,10],[-9,14],[-8,6]]
  ];
  const colors=['#929c9e','#ad9278','#70949b','#64758d','#302e43','#3d3b59','#244d58'];
  shape(c,outlines[n],colors[n]);
  // Light top plane and darker underside keep even the small held stones readable.
  c.save();c.clip();shape(c,[[-19,0],[-2,-15],[15,-10],[3,1]],['#bec5bd','#d9ba91','#b3d4d0','#a3b5cb','#77758e','#a19cc1','#8ad2cd'][n]);
  shape(c,[[-17,7],[2,0],[18,1],[9,19]],['#6c777d','#766559','#476970','#3f506b','#191c2c','#222237','#18343f'][n]);c.restore();
  if(n===0)line(c,[[-3,-3],[1,-4],[3,-2]],'#e4e2cf',1.2);
  if(n===1){line(c,[[-4,-4],[-1,0],[-3,3]],'#665445',1.5);line(c,[[4,-3],[2,1],[5,3]],'#eee0bc',1.1);}
  if(n===2){line(c,[[-9,0],[3,-3],[9,-2]],'#eef5e0',1.4);line(c,[[-5,3],[4,1]],'#354f61',1.3);}
  if(n===3){line(c,[[-8,-2],[2,-4],[7,-3]],'#dce8e2',1.6);line(c,[[-7,3],[2,1],[8,2]],'#b0c3d3',1.5);line(c,[[-2,-7],[0,-2],[-3,3]],'#344358',1.5);}
  if(n>=4){line(c,[[-8,3],[0,-1],[n===4?7:10,n===4?-10:-14]],'#dae5f1',1.5);line(c,[[1,0],[7,3],[4,n===4?7:10]],'#969bc7',1.2);}
  if(n===6){line(c,[[-10,1],[-3,2],[2,-6],[4,-13]],'#8ef4e0',2);line(c,[[0,4],[6,5],[8,11]],'#8ef4e0',1.5);shape(c,[[-3,-2],[1,-5],[4,-1],[1,4]],'#d6fff0');}
  c.restore();
 }
 function hat(c,x,y,angle=0,level=0){c.save();c.translate(x,y);c.rotate(angle);shape(c,[[-22,4],[-26,-5],[-15,-4],[-7,-14],[7,-14],[15,-4],[26,-7],[23,5],[8,9],[-9,9]],level>=5?'#473444':'#31363d');line(c,[[-21,1],[-11,4],[10,4],[21,0]],'#e4b766',2);oval(c,0,-3,4,4,'#eee2c2');for(const x of [-1.5,1.5])oval(c,x,-3,1,1,'#302726');line(c,[[-4,3],[4,6]],'#eee2c2',1);line(c,[[4,3],[-4,6]],'#eee2c2',1);c.restore();}
 function hero(c,h,{time=0,active=false,selected=false,ghost=false,attack=0}={}){
  c.save();let x=h.x,y=h.y;const ram=h.pirateRam;if(ram){const t=Math.max(0,Math.min(1,(time-ram.start)/(ram.end-ram.start))),f=t<.5?Math.sin(t*Math.PI):Math.sin((1-t)*Math.PI);x+=(ram.to.x-h.x)*f;y+=(ram.to.y-h.y)*f;}
  c.translate(x,y);if(ghost)c.globalAlpha=.55;const u=h.u,face=h.face&&h.face.x>h.x?-1:1;c.scale(face,1);const bob=active?Math.sin(time*2.5+h.id)*1.2:0;c.translate(0,bob);
  oval(c,0,12,44,8,'#83c5d54a');line(c,[[-47,10],[-29,15],[5,17],[38,10]],'#c1e7e4',2);if(selected)oval(c,0,12,49,12,'#edda7c25');
  // Boots rest on the deck; the hull is painted afterward in front of the feet.
  shape(c,[[-11,-15],[-2,-14],[-3,-3],[-5,1],[-13,0]],'#514951');
  shape(c,[[1,-14],[10,-15],[13,-1],[5,1],[3,-3]],'#514951');
  shape(c,[[-13,-4],[-4,-4],[-3,3],[-17,3],[-17,0]],'#382d29');
  shape(c,[[4,-4],[12,-4],[17,0],[17,3],[4,3]],'#382d29');
  line(c,[[-12,-3],[-5,-3]],'#b58b56',1.3);line(c,[[5,-3],[11,-3]],'#b58b56',1.3);
  // Standing sailor: red bandanna, eyepatch, coat, belt, forward rock-throwing arm.
  shape(c,[[-8,-36],[8,-35],[15,-10],[-13,-9]],'#792d36');shape(c,[[-4,-34],[5,-34],[7,-12],[-6,-12]],'#e8d9b0');line(c,[[-11,-16],[11,-16]],'#332d2e',4);shape(c,[[-2,-18],[3,-18],[3,-14],[-2,-14]],'#d5ac59');
  oval(c,0,-45,12,14,'#d2a37b');shape(c,[[-10,-40],[-4,-37],[5,-39],[9,-42],[6,-31],[-2,-29],[-9,-33]],'#544135');
  line(c,[[-11,-51],[9,-44]],'#302726',2);oval(c,-5,-46,4,3,'#25272a');oval(c,5,-47,1.5,2,'#292526');shape(c,[[-11,-56],[-7,-62],[10,-56],[12,-51],[-10,-52]],'#ae3840');
  const swing=active?Math.sin(attack*Math.PI):0;line(c,[[-8,-32],[-18,-29],[-27-swing*7,-35+swing*6]],ink,9);line(c,[[-8,-32],[-18,-29],[-27-swing*7,-35+swing*6]],'#c49370',5);oval(c,-28-swing*7,-35+swing*6,5,4,'#d2a37b');
  line(c,[[10,-31],[18,-20],[12,-15]],'#c49370',6);if(!h.pirateHat)hat(c,0,-60,0,u[3]);
  if(!h.pirateRock||time>h.pirateRock.end)rock(c,u[1],-28-swing*7,-39+swing*6,.8);
  // Reference-shaped wide wooden hull, plank seams, pointed forward bow.
  shape(c,[[-48,-10],[-23,-4],[39,-6],[45,-11],[42,6],[29,18],[-21,18],[-36,8]],u[0]>=4?'#635346':'#956a46');line(c,[[-43,-6],[-24,0],[35,-1],[43,-7]],'#d3a86c',4);line(c,[[-31,6],[32,6]],'#574337');line(c,[[-22,13],[23,13]],'#574337');
  for(const x of [-24,24])line(c,[[x,-1],[x+2,13]],u[0]>=2?'#a8b4b8':'#624a36',3);
  if(u[0])shape(c,[[-47,-9],[-60-(u[0]>=3?10:0),-15],[-40,5]],u[0]>=2?'#b7c6cd':'#b78c50');if(u[0]>=3)line(c,[[-65,-13],[-45,-6]],'#eef1de',2);
  const count=[0,1,1,2,2,3,4][u[2]];for(let i=0;i<count;i++){const cx=-25+i*16;oval(c,cx,2,6,6,'#4a3b32');shape(c,[[cx-4,0],[cx-4,-15],[cx+4,-15],[cx+5,0]],'#555e68');oval(c,cx,-15,4,2,'#20272e');if(active&&time-(h.pirateFired??-10)<.2)shape(c,[[cx-6,-18],[cx-2,-26],[cx,-21],[cx+3,-29],[cx+6,-17]],'#ffc76a');}
  c.restore();
 }
 function projectiles(c,game){for(const h of game.s.heroes){if(h.type!=='pirate')continue;const now=game.s.time;
  const shots=[...(h.pirateBalls||[]),...(h.pirateRock?[h.pirateRock]:[])];for(const shot of shots){if(now>shot.end)continue;const f=Math.max(0,(now-shot.start)/(shot.end-shot.start)),x=shot.from.x+(shot.to.x-shot.from.x)*f,y=shot.from.y+(shot.to.y-shot.from.y)*f-Math.sin(f*Math.PI)*28;c.save();c.translate(x,y);c.rotate(f*6);if(shot===h.pirateRock)rock(c,h.u[1]);else{oval(c,0,0,6,6,'#313c45');line(c,[[-8,0],[-17,3]],'#ff9b4a',4);}c.restore();}
  if(h.pirateHat)hat(c,h.pirateHat.x,h.pirateHat.y,(now-h.pirateHat.start)*14,h.u[3]);
 }}
 return {hero,projectiles};
})();
