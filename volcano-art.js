/* Outlined canvas scenery; geometry is shared with the playable route and water. */
window.VolcanoArt=(()=>{
 const ink='#312b30';
 function polygon(c,pts,fill,stroke=ink,width=2){c.beginPath();pts.forEach((p,i)=>i?c.lineTo(...p):c.moveTo(...p));c.closePath();c.fillStyle=fill;c.fill();if(stroke){c.strokeStyle=stroke;c.lineWidth=width;c.lineJoin='round';c.stroke();}}
 function line(c,pts,color,width=2){c.beginPath();pts.forEach((p,i)=>i?c.lineTo(...p):c.moveTo(...p));c.strokeStyle=color;c.lineWidth=width;c.lineJoin='round';c.lineCap='round';c.stroke();}
 function oval(c,x,y,rx,ry,color){c.beginPath();c.ellipse(x,y,rx,ry,0,0,7);c.fillStyle=color;c.fill();}
 function pillar(c,x,y,s=1){c.save();c.translate(x,y);c.scale(s,s);oval(c,5,4,22,8,'#211c2940');polygon(c,[[-17,4],[-15,-7],[14,-7],[18,4]],'#736d78');polygon(c,[[-11,-7],[-11,-48],[-5,-54],[2,-50],[11,-55],[11,-7]],'#96909a');polygon(c,[[4,-8],[4,-50],[11,-55],[11,-7]],'#635e6e');line(c,[[-6,-43],[-6,-13]],'#c5b6b2',2);line(c,[[-10,-29],[-3,-26],[0,-20]],'#514454',1.5);c.restore();}
 function draw(c,game){
  let seed=417;const random=()=>((seed=Math.imul(seed,1664525)+1013904223>>>0)/4294967296);
  c.fillStyle='#777b7f';c.fillRect(0,0,1100,720);
  for(let i=0;i<750;i++){const x=random()*1100,y=random()*720;if(game.nearest(x,y).distance<32||game.inWater(x,y)||game.inLava(x,y))continue;const r=3+i%8;polygon(c,[[x-r,y],[x-r*.4,y-r*.5],[x+r*.7,y-r*.4],[x+r,y+2],[x,y+r*.4]],i%3?'#85898c':'#62676c',null);line(c,[[x-r,y],[x-r*.4,y-r*.5],[x+r*.7,y-r*.4]],'#a9acaa55',1);if(i%13===0)line(c,[[x-12,y-7],[x,y],[x-3,y+8],[x+9,y+17]],'#484e5566',1.5);}
  for(const lava of game.map.lava){polygon(c,lava,'#f25c0a','#383136',8);c.save();c.clip();const g=c.createLinearGradient(0,0,0,720);g.addColorStop(0,'#a82a14');g.addColorStop(.18,'#f34b09');g.addColorStop(.42,'#ff9016');g.addColorStop(1,'#e54a0a');c.fillStyle=g;c.fillRect(0,0,1100,720);
   for(let i=0;i<160;i++){const x=random()*1100,y=random()*720,r=9+i%24;polygon(c,[[x-r,y-3],[x-r*.4,y-r*.38],[x+r*.6,y-r*.24],[x+r,y+4],[x+r*.2,y+r*.36],[x-r*.7,y+r*.25]],i%3?'#69261ccc':'#3e2523dd',null);line(c,[[x-r,y+1],[x-r*.2,y+4],[x+r*.7,y+1]],i%2?'#ffbd32bb':'#ffe580cc',1.7);}
   c.restore();c.beginPath();lava.forEach((p,i)=>i?c.lineTo(...p):c.moveTo(...p));c.closePath();c.strokeStyle='#ffb42b';c.lineWidth=2;c.stroke();}
  for(const pool of game.map.water){polygon(c,pool,'#237f9f','#414f57',5);c.save();c.clip();const xs=pool.map(p=>p[0]),ys=pool.map(p=>p[1]),top=Math.min(...ys),bottom=Math.max(...ys);const water=c.createLinearGradient(0,top,0,bottom);water.addColorStop(0,'#195a7d');water.addColorStop(.55,'#298fab');water.addColorStop(1,'#6acacb');c.fillStyle=water;c.fillRect(0,top,1100,bottom-top);for(let y=top+9;y<bottom;y+=15){const pts=[];for(let x=Math.min(...xs);x<=Math.max(...xs);x+=7)pts.push([x,y+Math.sin(x*.045+y)*2.5]);c.setLineDash([12,19,4,24]);line(c,pts,'#c8faff77',1.3);}c.restore();}
  line(c,game.map.points,'#414346',52);line(c,game.map.points,'#b1997d',46);line(c,game.map.points,'#d0b99955',27);
  for(let d=10;d<game.length;d+=29){const q=game.position(d);oval(c,q.x+Math.sin(d)*10,q.y+Math.cos(d)*9,2,1,'#f0debd77');}
  // A scorched trunk with no branches or leaves, surrounded by layered flames.
  c.save();c.translate(650,300);oval(c,2,7,35,10,'#32272966');
  const glow=c.createRadialGradient(0,-54,8,0,-54,81);glow.addColorStop(0,'#ffaf3d66');glow.addColorStop(1,'#ff7b0000');c.fillStyle=glow;c.fillRect(-90,-145,180,180);
  c.beginPath();c.moveTo(-20,6);c.quadraticCurveTo(-12,-46,-18,-86);c.lineTo(-5,-80);c.lineTo(4,-92);c.lineTo(18,-82);c.quadraticCurveTo(17,-28,24,5);c.closePath();c.fillStyle='#3e302d';c.fill();c.strokeStyle=ink;c.lineWidth=3;c.stroke();
  for(let i=0;i<5;i++)line(c,[[-13+i*7,-73],[ -10+i*6,-45],[-14+i*7,-12]],i%2?'#8b4930':'#bc5c25',2);
  for(let i=0;i<7;i++){const x=-24+i*8,y=-14-(i%3)*22,h=36+(i%4)*11;c.beginPath();c.moveTo(x-10,y);c.bezierCurveTo(x-20,y-18,x+5,y-25,x-2,y-h);c.bezierCurveTo(x+19,y-28,x+12,y-11,x+10,y);c.closePath();c.fillStyle=i%2?'#ff8120':'#ec4a11';c.fill();c.beginPath();c.moveTo(x-5,y);c.quadraticCurveTo(x-8,y-12,x+2,y-h*.56);c.quadraticCurveTo(x+8,y-8,x+5,y);c.fillStyle='#ffe274';c.fill();}
  for(let i=0;i<5;i++){oval(c,-9+i*7,-104-i*12,9+i*2,6+i,'#47454c32');oval(c,-15+i*9,-91-i*8,1.5,2,'#ffc74f');}c.restore();

 }
 function village(c){c.save();
  for(const [x,y,s]of [[571,693,.65],[731,698,.7],[775,686,.5]]){c.save();c.translate(x,y);c.scale(s,s);oval(c,3,13,38,10,'#30243240');polygon(c,[[-27,-31],[28,-31],[28,10],[-28,10]],'#b1a3a2');polygon(c,[[-36,-31],[-4,-60],[35,-31]],'#693d45');line(c,[[-20,-18],[22,-18]],'#7d6a70',1);line(c,[[-20,-2],[22,-2]],'#7d6a70',1);polygon(c,[[-8,10],[-8,-13],[0,-21],[8,-13],[8,10]],'#423442');polygon(c,[[15,-21],[23,-21],[23,-8],[15,-8]],'#ffd38a');c.restore();}
  c.fillStyle='#595347';c.textAlign='center';c.font='bold 11px Georgia';c.fillText('THE LAST OUTPOST',763,717);c.restore();
 }
 return {draw,village};
})();
