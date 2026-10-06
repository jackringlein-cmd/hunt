/* Outlined canvas scenery; geometry is shared with the playable route and water. */
window.VolcanoArt=(()=>{
 const ink='#312b30';
 function polygon(c,pts,fill,stroke=ink,width=2){c.beginPath();pts.forEach((p,i)=>i?c.lineTo(...p):c.moveTo(...p));c.closePath();c.fillStyle=fill;c.fill();if(stroke){c.strokeStyle=stroke;c.lineWidth=width;c.lineJoin='round';c.stroke();}}
 function line(c,pts,color,width=2){c.beginPath();pts.forEach((p,i)=>i?c.lineTo(...p):c.moveTo(...p));c.strokeStyle=color;c.lineWidth=width;c.lineJoin='round';c.lineCap='round';c.stroke();}
 function oval(c,x,y,rx,ry,color){c.beginPath();c.ellipse(x,y,rx,ry,0,0,7);c.fillStyle=color;c.fill();}
 function pillar(c,x,y,s=1){c.save();c.translate(x,y);c.scale(s,s);oval(c,5,4,22,8,'#211c2940');polygon(c,[[-17,4],[-15,-7],[14,-7],[18,4]],'#736d78');polygon(c,[[-11,-7],[-11,-48],[-5,-54],[2,-50],[11,-55],[11,-7]],'#96909a');polygon(c,[[4,-8],[4,-50],[11,-55],[11,-7]],'#635e6e');line(c,[[-6,-43],[-6,-13]],'#c5b6b2',2);line(c,[[-10,-29],[-3,-26],[0,-20]],'#514454',1.5);c.restore();}
 function draw(c,game){
  c.fillStyle='#f5f2e9';c.fillRect(0,0,1100,720);
  for(let i=0;i<380;i++){const x=(i*173)%1100,y=(i*97)%720;if(game.nearest(x,y).distance<35||game.inWater(x,y)||game.inLava(x,y))continue;oval(c,x,y,1+i%3,1,'#b7afa328');}
  for(const lava of game.map.lava){polygon(c,lava,'#ed4605','#4a3226',3);c.save();c.clip();const g=c.createLinearGradient(0,0,0,720);g.addColorStop(0,'#f64c00');g.addColorStop(.45,'#e94000');g.addColorStop(1,'#f55908');c.fillStyle=g;c.fillRect(0,0,1100,720);for(let i=0;i<38;i++){const x=(i*167)%1100,y=(i*83)%720;c.beginPath();c.moveTo(x-25,y+7);c.bezierCurveTo(x+60,y-35,x+70,y+15,x-5,y+23);c.strokeStyle=i%3?'#ffb61980':'#ffe832bb';c.lineWidth=i%3?3:5;c.stroke();}c.restore();}
  for(const pool of game.map.water){polygon(c,pool,'#00dedf','#283a36',3);c.save();c.clip();for(let y=360;y<690;y+=20)line(c,[[400,y],[520,y-3],[660,y+2],[790,y-2],[945,y]],'#b6ffff66',2);c.restore();}
  line(c,game.map.points,'#343923',52);line(c,game.map.points,'#6c8308',46);line(c,game.map.points,'#89971955',27);
  for(let d=10;d<game.length;d+=29){const q=game.position(d);oval(c,q.x+Math.sin(d)*10,q.y+Math.cos(d)*9,2,1,'#c0c76d66');}
  // A branching green tree with exposed red-brown bark, matching Jack's drawing.
  c.save();c.translate(650,300);oval(c,4,7,35,8,'#6b674233');c.beginPath();c.moveTo(-20,5);c.lineTo(-19,-77);c.quadraticCurveTo(13,-91,29,-75);c.lineTo(17,-18);c.quadraticCurveTo(8,8,-20,5);c.fillStyle='#8a3619';c.fill();c.strokeStyle=ink;c.lineWidth=3;c.stroke();
  for(const branch of [[[2,-71],[20,-111],[19,-169]],[[9,-78],[43,-119],[60,-162]],[[14,-68],[64,-103],[96,-128]],[[20,-73],[75,-72],[98,-105]]]){line(c,branch,'#292d22',12);line(c,branch,'#954626',7);}
  polygon(c,[[-61,-82],[-58,-111],[-42,-132],[-35,-126],[-23,-150],[-11,-135],[5,-155],[20,-153],[36,-166],[38,-143],[54,-134],[50,-114],[60,-99],[30,-88],[20,-72],[25,-94],[3,-100],[-20,-92]],'#738708','#29311d',3);
  line(c,[[-12,-68],[-9,-38],[-12,-8]],'#b26b37',2);c.restore();
  for(const {x,y}of game.map.graves){polygon(c,[[x-7,y+5],[x-7,y-12],[x,y-18],[x+7,y-12],[x+7,y+5]],'#b8b7a4');line(c,[[x,y-10],[x,y]],'#747a69',1.5);}
 }
 function village(c){c.save();
  for(const [x,y,s]of [[571,693,.65],[731,698,.7],[775,686,.5]]){c.save();c.translate(x,y);c.scale(s,s);oval(c,3,13,38,10,'#30243240');polygon(c,[[-27,-31],[28,-31],[28,10],[-28,10]],'#b1a3a2');polygon(c,[[-36,-31],[-4,-60],[35,-31]],'#693d45');line(c,[[-20,-18],[22,-18]],'#7d6a70',1);line(c,[[-20,-2],[22,-2]],'#7d6a70',1);polygon(c,[[-8,10],[-8,-13],[0,-21],[8,-13],[8,10]],'#423442');polygon(c,[[15,-21],[23,-21],[23,-8],[15,-8]],'#ffd38a');c.restore();}
  c.fillStyle='#595347';c.textAlign='center';c.font='bold 11px Georgia';c.fillText('THE LAST OUTPOST',763,717);c.restore();
 }
 return {draw,village};
})();
