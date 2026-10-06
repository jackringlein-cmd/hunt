/* Outlined canvas scenery; geometry is shared with the playable route and water. */
window.VolcanoArt=(()=>{
 const ink='#312b30';
 function polygon(c,pts,fill,stroke=ink,width=2){c.beginPath();pts.forEach((p,i)=>i?c.lineTo(...p):c.moveTo(...p));c.closePath();c.fillStyle=fill;c.fill();if(stroke){c.strokeStyle=stroke;c.lineWidth=width;c.lineJoin='round';c.stroke();}}
 function line(c,pts,color,width=2){c.beginPath();pts.forEach((p,i)=>i?c.lineTo(...p):c.moveTo(...p));c.strokeStyle=color;c.lineWidth=width;c.lineJoin='round';c.lineCap='round';c.stroke();}
 function oval(c,x,y,rx,ry,color){c.beginPath();c.ellipse(x,y,rx,ry,0,0,7);c.fillStyle=color;c.fill();}
 function pillar(c,x,y,s=1){c.save();c.translate(x,y);c.scale(s,s);oval(c,5,4,22,8,'#211c2940');polygon(c,[[-17,4],[-15,-7],[14,-7],[18,4]],'#736d78');polygon(c,[[-11,-7],[-11,-48],[-5,-54],[2,-50],[11,-55],[11,-7]],'#96909a');polygon(c,[[4,-8],[4,-50],[11,-55],[11,-7]],'#635e6e');line(c,[[-6,-43],[-6,-13]],'#c5b6b2',2);line(c,[[-10,-29],[-3,-26],[0,-20]],'#514454',1.5);c.restore();}
 function draw(c,game){
  c.fillStyle='#83777a';c.fillRect(0,0,1100,720);
  const glow=c.createLinearGradient(0,0,0,720);glow.addColorStop(0,'#ff935d44');glow.addColorStop(.22,'#ffc78700');glow.addColorStop(.8,'#30283e00');glow.addColorStop(1,'#ff603544');c.fillStyle=glow;c.fillRect(0,0,1100,720);
  let seed=72035;const rand=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
  // Lava stays beyond the buildable field; orange fissures are decorative stone seams.
  polygon(c,[[0,0],[1100,0],[1100,57],[1000,43],[930,66],[820,47],[720,59],[610,36],[480,57],[330,40],[210,63],[115,42],[0,67]],'#b94033');
  polygon(c,[[0,0],[1100,0],[1100,35],[1000,22],[928,45],[820,26],[713,39],[601,15],[477,38],[327,23],[214,42],[112,24],[0,45]],'#f8803e');
  line(c,[[10,20],[114,11],[213,27],[329,7],[481,22],[602,6],[714,23],[820,12],[930,29],[1000,8],[1090,21]],'#ffd17a',5);
  polygon(c,[[0,708],[170,712],[280,706],[450,710],[610,707],[790,714],[935,705],[1100,710],[1100,720],[0,720]],'#f57b3c',null);
  for(let i=0;i<680;i++){const x=rand()*1100,y=80+rand()*610;if(game.nearest(x,y).distance<38||game.inWater(x,y))continue;oval(c,x,y,1+rand()*3,1+rand(),i%3?'#cec0b331':'#41394635');}
  for(const [x,y]of [[65,100],[350,80],[566,660],[958,650],[62,600]]){line(c,[[x,y],[x+14,y+12],[x+8,y+26],[x+32,y+41]],'#51414c',3);line(c,[[x+14,y+12],[x+33,y+9],[x+44,y+20]],'#b66956',1.5);}
  for(const pool of game.map.water){polygon(c,pool,'#386b79','#343642',5);c.save();c.clip();const bounds=pool.reduce((b,p)=>({l:Math.min(b.l,p[0]),r:Math.max(b.r,p[0]),t:Math.min(b.t,p[1]),b:Math.max(b.b,p[1])}),{l:1100,r:0,t:720,b:0});const water=c.createLinearGradient(0,bounds.t,0,bounds.b);water.addColorStop(0,'#336f7d');water.addColorStop(1,'#79babc');c.fillStyle=water;c.fillRect(bounds.l,bounds.t,bounds.r-bounds.l,bounds.b-bounds.t);for(let y=bounds.t+15;y<bounds.b;y+=19){const pts=[];for(let x=bounds.l;x<=bounds.r;x+=8)pts.push([x,y+Math.sin(x*.08+y)*2]);line(c,pts,'#bbe1d16b',2);}c.restore();}
  // Broad, readable basalt roadway with inset paving and a warm dust edge.
  line(c,game.map.points,'#403440',65);line(c,game.map.points,'#bfa184',59);line(c,game.map.points,'#b5aaa0',49);
  for(let d=15;d<game.length;d+=27){const p=game.position(d),q=game.position(d+2),a=Math.atan2(q.y-p.y,q.x-p.x);c.save();c.translate(p.x,p.y);c.rotate(a);line(c,[[0,-22],[2,-8],[-1,8],[1,22]],'#796f7470',1.4);line(c,[[-12,0],[0,0]],'#ded0bc80',1);c.restore();}
  for(const [x,y,s]of [[75,70,.7],[270,72,.8],[586,78,.7],[993,83,.9],[65,684,.65],[312,688,.6],[927,688,.65]])pillar(c,x,y,s);
  for(const {x,y}of game.map.graves){oval(c,x,y+7,13,4,'#332b3440');polygon(c,[[x-8,y+7],[x-8,y-13],[x-3,y-19],[x+6,y-16],[x+8,y+7]],'#b0a6aa');line(c,[[x,y-11],[x,y+1]],'#554651',1.5);line(c,[[x-4,y-7],[x+4,y-7]],'#554651',1.5);}
  // Entrance marker points along the route; the eastern outpost marks the exit.
  polygon(c,[[42,152],[54,161],[42,170],[46,161]],'#edcea1',null);
 }
 function village(c){c.save();
  for(const [x,y,s]of [[1040,365,.8],[1080,510,.9],[1047,560,.65]]){c.save();c.translate(x,y);c.scale(s,s);oval(c,3,13,38,10,'#30243240');polygon(c,[[-27,-31],[28,-31],[28,10],[-28,10]],'#b1a3a2');polygon(c,[[-36,-31],[-4,-60],[35,-31]],'#693d45');line(c,[[-20,-18],[22,-18]],'#7d6a70',1);line(c,[[-20,-2],[22,-2]],'#7d6a70',1);polygon(c,[[-8,10],[-8,-13],[0,-21],[8,-13],[8,10]],'#423442');polygon(c,[[15,-21],[23,-21],[23,-8],[15,-8]],'#ffd38a');c.restore();}
  c.fillStyle='#f5e0ba';c.textAlign='center';c.font='bold 11px Georgia';c.fillText('THE LAST OUTPOST',1021,605);c.restore();
 }
 return {draw,village};
})();
