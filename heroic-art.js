/* Hand-inked forest and enemies inspired by the shaggy monster reference. Does not change game rules. */
(function () {
 const ink='#191b13',colors={knight:['#9ed8f3','#5284b5'],archer:['#b4df75','#528e60'],rogue:['#cfaaed','#8063ac'],mage:['#a6aff8','#726dba'],leader:['#ffe08c','#d88c62']};
 function oval(c,x,y,rx,ry,color,border=ink,width=2.5){c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fillStyle=color;c.fill();if(border){c.strokeStyle=border;c.lineWidth=width;c.stroke();}}
 function line(c,points,color,width=3){c.beginPath();c.lineCap='round';c.lineJoin='round';points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.strokeStyle=color;c.lineWidth=width;c.stroke();}
 function box(c,x,y,w,h,r,color,border=ink){c.beginPath();c.roundRect(x,y,w,h,r);c.fillStyle=color;c.fill();if(border){c.strokeStyle=border;c.lineWidth=2.5;c.stroke();}}
 function shape(c,draw,color){c.beginPath();draw(c);c.closePath();c.fillStyle=color;c.fill();c.strokeStyle=ink;c.lineWidth=2.1;c.lineJoin='round';c.lineCap='round';c.stroke();}
 function tree(c,x,y,s=1,time=0){
  c.save();c.translate(x,y);c.scale(s,s);oval(c,4,8,34,10,'#36271d44',null);
  shape(c,c=>{c.moveTo(-9,9);c.lineTo(-5,-43);c.lineTo(6,-45);c.lineTo(8,4);c.lineTo(14,10);c.lineTo(4,8);c.lineTo(-3,12);},'#79603c');
  line(c,[[-3,5],[-1,-28],[-15,-47]],'#342c1d',1.4);line(c,[[3,-7],[4,-27],[19,-47]],'#bba06a',1);
  c.translate(Math.sin(time*1.1+x*.02)*1.6,0);
  const foliage=(cx,cy,rx,ry,color)=>{
   const points=[];
   for(let i=0;i<24;i++){const angle=i/24*Math.PI*2,r=1+Math.sin(angle*6)*.065+Math.cos(angle*3)*.03;points.push([cx+Math.cos(angle)*rx*r,cy+Math.sin(angle)*ry*r]);}
   shape(c,c=>{const last=points[points.length-1];c.moveTo((last[0]+points[0][0])/2,(last[1]+points[0][1])/2);for(let i=0;i<points.length;i++){const p=points[i],n=points[(i+1)%points.length];c.quadraticCurveTo(p[0],p[1],(p[0]+n[0])/2,(p[1]+n[1])/2);}},color);
  };
  foliage(0,-45,42,31,'#66623a');foliage(-15,-65,29,29,'#8c8050');foliage(15,-70,27,29,'#9b8752');foliage(0,-48,34,26,'#8a7243');
  for(let i=0;i<9;i++){const lx=-25+i*6,ly=-55+Math.sin(i*2.1)*13;c.beginPath();c.moveTo(lx-3,ly-6);c.quadraticCurveTo(lx-2,ly+1,lx+4,ly+3);c.strokeStyle='#29271799';c.lineWidth=.9;c.lineCap='round';c.stroke();}
  for(let i=0;i<4;i++){c.beginPath();c.moveTo(-21+i*12,-77);c.quadraticCurveTo(-22+i*12,-69,-15+i*12,-66);c.strokeStyle='#353019aa';c.lineWidth=1;c.stroke();}
  c.restore();
 }
 function hero(c,h,opts={}){HeroicCharacters.draw(c,h,opts);}
 function enemy(c,e,time){
  const size=e.type==='tiny'?.65:e.type==='giant'?1.9:e.type==='dragon'?2.2:e.type==='brute'?1.25:1,frozen=e.effects.some(f=>f.kind==='freeze'),stopped=frozen||e.effects.some(f=>f.kind==='stun'),fear=e.effects.some(f=>f.kind==='fear');
  const bone=e.flash>0?'#fff':frozen?'#cdf5ff':'#d8c998',shade=frozen?'#9bdeec':'#ac9a71';
  const phase=e.p*.10+e.id,walk=stopped?0:Math.sin(phase)*3;
  c.save();c.translate(e.x,e.y);oval(c,0,7,18*size,7*size,'#28473d40',null);c.scale(size,size);c.translate(0,stopped?0:-Math.abs(Math.sin(phase))*.9);c.rotate(stopped?0:Math.sin(phase)*.045);
  if(e.type==='dragon'){
   for(const s of [-1,1]){c.save();c.rotate(s*Math.sin(time*5)*.14);shape(c,c=>{c.moveTo(s*7,-12);c.bezierCurveTo(s*19,-32,s*39,-55,s*42,-41);c.quadraticCurveTo(s*43,-29,s*35,-13);c.quadraticCurveTo(s*28,-25,s*22,-12);c.quadraticCurveTo(s*14,-20,s*7,-5);},'#a37962');c.restore();}
   line(c,[[0,0],[-17,12],[-31,8+Math.sin(time*4)*3]],ink,9);line(c,[[0,0],[-17,12],[-31,8+Math.sin(time*4)*3]],bone,5);
  }
  for(const s of [-1,1]){line(c,[[s*6,-3],[s*9,7+walk*s]],ink,7);line(c,[[s*6,-3],[s*9,7+walk*s]],bone,4);oval(c,s*9,8+walk*s,5,3,bone);}
  oval(c,0,-10,10,13,shade);for(let i=0;i<3;i++)line(c,[[-6,-17+i*5],[0,-15+i*5],[6,-17+i*5]],bone,3);
  for(const s of [-1,1]){line(c,[[s*9,-15],[s*16,-5-s*walk]],ink,7);line(c,[[s*9,-15],[s*16,-5-s*walk]],bone,4);oval(c,s*16,-5-s*walk,3,3,bone,null);}
  if(e.type==='giant'||e.type==='brute'){oval(c,-12,-16,7,7,'#9bacbb');oval(c,12,-16,7,7,'#9bacbb');}
  shape(c,c=>{c.moveTo(-15,-27);c.bezierCurveTo(-23,-41,-10,-51,0,-48);c.bezierCurveTo(17,-47,21,-36,15,-26);c.quadraticCurveTo(8,-18,-8,-22);c.quadraticCurveTo(-13,-22,-15,-27);},bone);line(c,[[-4,-47],[-2,-41],[-5,-39],[-3,-35]],'#48412d',1);line(c,[[10,-40],[13,-35],[11,-31]],'#67563d',.7);
  if(e.type==='dragon'){for(const s of [-1,1]){line(c,[[s*12,-40],[s*17,-49]],ink,7);line(c,[[s*12,-40],[s*17,-49]],bone,4);}oval(c,0,-22,15,8,bone);oval(c,-5,-23,2,2,ink,null);oval(c,5,-23,2,2,ink,null);}else{box(c,-10,-22,20,8,4,bone);for(const x of [-4,3])line(c,[[x,-21],[x,-17]],'#b4a68e',1.5);}
  for(const x of [-7,7]){oval(c,x,-33,5,6,ink,null);oval(c,x-1,-34,2,2,fear?'#e6a3ff':e.type==='dragon'?'#d4acff':'#a9e6d3',null);}
  if(e.type==='runner'){box(c,-17,-44,34,6,3,'#ad4f39');line(c,[[17,-42],[25,-39+walk],[29,-43]],'#ad4f39',3);}
  if(e.type==='shield'){oval(c,15,-3,12,15,'#80795d');oval(c,15,-3,8,11,'#b7aa84','#f2fcff',2);oval(c,15,-3,3,3,'#ffe6a0');}
  if(e.type==='captain'){box(c,-15,-47,30,8,4,'#ffdd94');for(const x of [-11,0,11])oval(c,x,-50,x?4:5,x?6:8,'#ffdd94');line(c,[[22,6],[22,-43]],ink,4);box(c,23,-44,17,17,5,'#a6493a');}
  if(e.type==='shaman'){oval(c,0,-45,20,6,'#775c3b');oval(c,0,-52,12,12,'#9f8461');oval(c,0,-58,4,4,'#f2e5ff',null);line(c,[[20,6],[20,-28]],'#8e7096',5);oval(c,20,-33,7,7,'#ccb67b');}
  c.restore();
  if(e.shield>0)oval(c,e.x,e.y-19*size,(22+Math.sin(time*3))*size,30*size,'#bf9e7622','#dcc69b',2);
  if(e.hp<e.maxHp||e.type==='dragon'||e.type==='giant'){const w=e.type==='dragon'?84:38*size,y=e.y-58*size;box(c,e.x-w/2,y,w,7,3.5,'#344950',null);const f=Math.max(0,e.hp/e.maxHp)*(w-4);if(f>0)box(c,e.x-w/2+2,y+2,f,3,1.5,e.type==='dragon'?'#dbb2f5':'#c8ef95',null);}
  c.textAlign='center';c.font='bold 10px "Trebuchet MS",sans-serif';if(e.blocks>0){c.fillStyle='#544573';c.fillText('◇ '+e.blocks,e.x,e.y-63*size);}
  if(e.effects.some(f=>f.kind==='burn'))for(const x of [-8,8])oval(c,e.x+x,e.y-6,4,7+Math.sin(time*12+x)*2,'#ffc77f','#df976c',1);
  if(e.effects.some(f=>f.kind==='poison'))for(let i=0;i<3;i++)oval(c,e.x-14+i*12,e.y-12-(time*12+i*7)%20,2.5,2.5,'#d3f6a3','#82a569',1);
  if(stopped&&!frozen)for(let i=0;i<3;i++)oval(c,e.x+Math.cos(time*5+i*2.1)*16,e.y-47*size+Math.sin(time*5+i*2.1)*3,2,2,'#ffe596',null);
  if(fear){c.fillStyle='#9364a4';c.font='bold 19px sans-serif';c.fillText('!',e.x,e.y-52*size);}
  if(e.effects.some(f=>['hunter','bounty','weak'].includes(f.kind))){c.beginPath();c.arc(e.x,e.y-30*size,21*size,0,7);c.strokeStyle='#ffe6a1';c.lineWidth=2;c.stroke();}
 }
 function village(c,time=0){for(const [x,y,s,color] of [[1040,365,.8,'#b3865c'],[1080,510,.9,'#787c95'],[1047,560,.65,'#af9763']]){c.save();c.translate(x,y);c.scale(s,s);oval(c,0,10,43,13,'#284d4633',null);box(c,-29,-36,58,48,17,'#c8b38c');shape(c,c=>{c.moveTo(-40,-29);c.bezierCurveTo(-40,-76,34,-80,42,-30);c.quadraticCurveTo(0,-14,-40,-29);},color);oval(c,-13,-50,10,5,'#ffffff55',null);box(c,-9,-15,18,27,9,'#b1967c');oval(c,3,0,2,2,'#ffe9a8',null);oval(c,19,-14,7,7,'#ffe2a1');line(c,[[19,-19],[19,-9]],'#b39876',1.5);line(c,[[14,-14],[24,-14]],'#b39876',1.5);for(let i=0;i<3;i++){let t=(time*.22+i*.33)%1;oval(c,15+Math.sin(t*5)*8,-58-t*35,3+t*7,4+t*5,`rgba(241,244,222,${(1-t)*.25})`,null);}c.restore();}c.font='bold 11px "Trebuchet MS",sans-serif';c.textAlign='center';c.fillStyle='#fff5d2';c.strokeStyle='#52795a';c.lineWidth=3;c.strokeText('THE VILLAGE',1024,605);c.fillText('THE VILLAGE',1024,605);}
 function map(c){let seed=41;const rand=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};const g=c.createLinearGradient(0,0,1100,720);g.addColorStop(0,'#8a865d');g.addColorStop(.55,'#aca173');g.addColorStop(1,'#767554');c.fillStyle=g;c.fillRect(0,0,1100,720);
  for(let i=0;i<160;i++){const x=rand()*1100,y=rand()*720,r=12+rand()*42;oval(c,x,y,r,r*.6,i%2?'#e0edaa25':'#66a78720',null);}
  const stream=[[-30,642],[130,665],[275,681],[460,640],[630,665],[780,650],[930,695],[1150,670]];line(c,stream,'#485b50',46);line(c,stream,'#7d8e83',34);line(c,stream,'#aacac044',12);
  const points=GameData.points;line(c,points,'#53653c',67);line(c,points,'#a38d60',61);line(c,points,'#b8a17a',52);line(c,points,'#d0b78e',39);
  for(let i=0;i<500;i++){const x=rand()*1100,y=rand()*720,d=GameEngine.nearest(x,y).distance;if(d<20)oval(c,x,y,1.5+rand()*2,1.3,'#cbb18b55',null);else if(d>44){if(i%11===0){for(let j=0;j<5;j++)oval(c,x+Math.cos(j*1.26)*3,y+Math.sin(j*1.26)*3,2.5,2.5,i%2?'#fff3cb':'#f1c6dc',null);oval(c,x,y,1.8,1.8,'#ffd48d',null);}else oval(c,x,y,2+rand()*3,1.8,'#63956930',null);}}
  for(let i=0;i<24;i++){const x=rand()*1100,y=rand()*720;if(GameEngine.nearest(x,y).distance>52){oval(c,x,y,7+rand()*5,5,'#b3c8bc','#8baa99',2);oval(c,x-2,y-2,3,1.5,'#e0e7d6',null);}}
  for(let i=0;i<38;i++){const x=rand()*1100,y=i<19?35+rand()*45:690+rand()*40;if(GameEngine.nearest(x,y).distance>72)tree(c,x,y,.45+rand()*.45);}
  for(const [x,y] of [[30,121],[997,388],[1080,506]]){line(c,[[x,y+20],[x,y-31],[x+12,y-31]],'#958767',4);box(c,x+5,y-29,14,17,6,'#ffedb4','#8b8165');}
  for(let i=0;i<7;i++){const x=879+(i%4)*37,y=85+Math.floor(i/4)*35;oval(c,x,y+7,12,4,'#658f7b33',null);box(c,x-8,y-18,16,24,8,'#c8d4c6','#92ab9e');line(c,[[x,y-11],[x,y+1]],'#9bb0a0',2);line(c,[[x-3,y-7],[x+3,y-7]],'#9bb0a0',2);}
  for(const [x,y] of [[94,560],[397,120],[593,565],[859,306]]){box(c,x-3,y-9,6,14,3,'#fff2d6','#94a17f');oval(c,x,y-10,11,7,'#a65e48','#4c3428',2);oval(c,x-4,y-12,2,2,'#fff5ee',null);oval(c,x+4,y-9,2,2,'#fff5ee',null);}
 }
 const portraits={};function portrait(type){if(!portraits[type]){const c=document.createElement('canvas');c.width=160;c.height=160;const ctx=c.getContext('2d');ctx.scale(1.75,1.75);hero(ctx,{type,x:42,y:72,u:[0,0,0,0],id:0},{time:1});portraits[type]=c.toDataURL();}return `<img src="${portraits[type]}" width="64" height="64" alt="" aria-hidden="true">`;}
 window.CartoonArt={tree,hero,enemy,village,map,portrait};
})();
