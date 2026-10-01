/* Original rounded artwork and animation. Does not change game rules. */
(function () {
 const ink='#30414b',colors={knight:['#9ed8f3','#5284b5'],archer:['#b4df75','#528e60'],rogue:['#cfaaed','#8063ac'],mage:['#a6aff8','#726dba'],leader:['#ffe08c','#d88c62']};
 function oval(c,x,y,rx,ry,color,border=ink,width=2.5){c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fillStyle=color;c.fill();if(border){c.strokeStyle=border;c.lineWidth=width;c.stroke();}}
 function line(c,points,color,width=3){c.beginPath();c.lineCap='round';c.lineJoin='round';points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.strokeStyle=color;c.lineWidth=width;c.stroke();}
 function box(c,x,y,w,h,r,color,border=ink){c.beginPath();c.roundRect(x,y,w,h,r);c.fillStyle=color;c.fill();if(border){c.strokeStyle=border;c.lineWidth=2.5;c.stroke();}}
 function shape(c,draw,color){c.beginPath();draw(c);c.closePath();c.fillStyle=color;c.fill();c.strokeStyle=ink;c.lineWidth=2.5;c.lineJoin='round';c.stroke();}
 function tree(c,x,y,s=1,time=0){
  c.save();c.translate(x,y);c.scale(s,s);oval(c,2,8,32,10,'#31564a35',null);box(c,-7,-38,14,44,7,'#b7885e','#5c6b48');line(c,[[0,-14],[0,-28],[-15,-40]],'#866646',3);
  c.translate(Math.sin(time*1.2+x*.02)*2,-Math.cos(time+x)*.5);
  for(const [cx,cy,r,col] of [[0,-42,32,'#57a270'],[-23,-42,23,'#73bb70'],[24,-45,23,'#76c17b'],[-12,-64,25,'#92d47a'],[14,-68,24,'#a0db7d'],[0,-48,28,'#89cf75']])oval(c,cx,cy,r,r*.92,col,'#477d53',3);
  oval(c,-15,-73,10,4,'#cef29a',null);oval(c,19,-76,7,3,'#d7efa2',null);c.restore();
 }
 function hero(c,h,opts={}){
  const {time=0,active=false,selected=false,ghost=false,attack=0}=opts;
  const tier=Math.max(...h.u),path=h.u.indexOf(tier),type=h.type;
  let [light,dark]=colors[type];if(type==='mage'&&tier)[light,dark]=[['#ffbd83','#dc865f'],['#b2eef5','#67a3be'],['#c6b4ff','#8770c4'],['#e0b1ff','#996cbe']][path];
  const breathe=Math.sin(time*2.8+(h.id||0)),pulse=Math.sin(Math.min(1,attack)*Math.PI);
  c.save();c.translate(h.x,h.y);if(ghost)c.globalAlpha=.7;
  oval(c,0,11,23,9,'#26483d40',null);if(selected)oval(c,0,11,26,11,'#ffe89244','#fff3ac',3);
  if(tier===6)oval(c,0,10,29,13,light+'33',light,2);
  const dx=(h.face?.x??h.x+1)-h.x,dy=(h.face?.y??h.y)-h.y,len=Math.hypot(dx,dy)||1;
  c.translate(dx/len*pulse*4,dy/len*pulse*3+breathe*.8);c.rotate(pulse*.08*(dx>=0?1:-1));
  oval(c,-9,7,8,6,dark);oval(c,9,7,8,6,dark);
  oval(c,0,-6,16,20+breathe*.3,dark);oval(c,-2,-10,12,15,light,null);
  oval(c,-16,-8,6,7,'#f4c599');oval(c,16,-8,6,7,'#f4c599');
  if(type==='archer'||type==='rogue')oval(c,0,-32,21,22,dark);
  oval(c,0,-31,16,17,'#ffdbad');oval(c,-10,-26,3.5,2,'#f1ac95',null);oval(c,10,-26,3.5,2,'#f1ac95',null);
  const blink=(time+(h.id||0)*.73)%5.1<.13;
  for(const x of [-6,6]){if(blink)line(c,[[x-3,-30],[x+3,-30]],ink,2);else{oval(c,x,-30,3.1,4.4,ink,null);oval(c,x-1,-31.5,1,1.4,'#fff',null);}}
  c.beginPath();c.arc(0,-27,5,.35,Math.PI-.35);c.strokeStyle='#a36a5a';c.lineWidth=1.8;c.stroke();
  if(type==='knight'){
   shape(c,c=>{c.moveTo(-19,-29);c.bezierCurveTo(-23,-59,21,-61,19,-29);c.quadraticCurveTo(0,-41,-19,-29);},tier>=4?'#f1f4e7':light);
   box(c,-18,-35,36,12,6,'#4e6c85');for(const x of [-8,0,8])line(c,[[x,-32],[x,-27]],'#e5f6fa',2);line(c,[[0,-49],[0,-38]],'#eafaff',4);oval(c,0,-53,5,7,'#ffad99');
   oval(c,-21,-4,12,15,path===2&&tier?'#ffe088':'#8dc8e8');oval(c,-21,-4,7,9,light,'#f0faff',2);oval(c,-21,-4,3,3,'#fff1a0',null);
   c.save();c.translate(21,0);c.rotate(-pulse*1.8);line(c,[[0,8],[0,-31-tier*1.4]],ink,9);line(c,[[0,1],[0,-31-tier*1.4]],'#eefaff',5);line(c,[[-7,-2],[7,-2]],'#ffd77a',5);if(path===3&&tier)oval(c,0,-30-tier,5,8,'#fff0a977',null);c.restore();
   if(path===1&&tier>=4){line(c,[[-28,0],[-31,-25+pulse*12]],ink,7);line(c,[[-28,0],[-31,-25+pulse*12]],'#e5f5fa',4);}
  }else if(type==='mage'){
   shape(c,c=>{c.moveTo(-20,-43);c.quadraticCurveTo(-10,-52,-3,-66);c.quadraticCurveTo(0,-74,8,-66);c.quadraticCurveTo(6,-53,20,-43);},dark);oval(c,0,-43,24,7,light);oval(c,-4,-56,3,3,'#fff09e',null);
   line(c,[[23,10],[23,-39-pulse*8]],ink,7);line(c,[[23,10],[23,-39-pulse*8]],'#dab380',4);oval(c,23,-44-pulse*8,9+pulse*3,10+pulse*3,light);oval(c,20,-48-pulse*8,3,4,'#ffffffcc',null);
   oval(c,23,-44,16+Math.sin(time*4)*2,16+Math.sin(time*4)*2,light+'22',null);
  }else if(type==='leader'){
   shape(c,c=>{c.moveTo(-17,-43);c.lineTo(-20,-56);c.quadraticCurveTo(-19,-60,-15,-56);c.lineTo(-7,-49);c.lineTo(0,-61);c.lineTo(8,-49);c.lineTo(17,-56);c.quadraticCurveTo(21,-59,20,-53);c.lineTo(16,-43);},'#ffe194');box(c,-17,-46,34,8,4,'#ffc978');oval(c,0,-43,4,4,'#bca9ff');
   line(c,[[25,11],[25,-58]],ink,7);line(c,[[25,11],[25,-58]],'#e6b768',4);const flap=Math.sin(time*4)*5;
   shape(c,c=>{c.moveTo(27,-57);c.bezierCurveTo(40,-63+flap,43,-48-flap,57,-55+flap);c.lineTo(57,-31+flap);c.bezierCurveTo(44,-24-flap,40,-40+flap,27,-34);},light);oval(c,41,-44+flap*.3,5,6,'#fff3be',null);oval(c,25,-62,5,5,'#ffe39b');
  }else if(type==='archer'){
   shape(c,c=>{c.moveTo(-20,-40);c.quadraticCurveTo(-10,-60,15,-49);c.quadraticCurveTo(22,-48,25,-40);c.quadraticCurveTo(4,-34,-20,-40);},light);line(c,[[7,-48],[16,-60+Math.sin(time*3)]],'#ffd792',5);
   c.beginPath();c.ellipse(21,-15,13+pulse*2,26,0,-Math.PI/2,Math.PI/2);c.strokeStyle=ink;c.lineWidth=7;c.stroke();c.strokeStyle='#ebc08a';c.lineWidth=4;c.stroke();line(c,[[21,-41],[21-pulse*12,-15],[21,11]],'#fff4d9',1.5);line(c,[[8-pulse*8,-13],[38-pulse*8,-13]],ink,2);
  }else{
   shape(c,c=>{c.moveTo(-18,-42);c.quadraticCurveTo(-4,-66,18,-42);c.quadraticCurveTo(2,-49,-18,-42);},light);box(c,-14,-26,28,11,5,dark);line(c,[[-6,-21],[6,-21]],light,2);
   for(const s of [-1,1]){c.save();c.translate(s*22,0);c.rotate(s*pulse*1.4);line(c,[[0,5],[s*6,-19]],ink,7);line(c,[[0,1],[s*6,-19]],'#eaf4fa',4);line(c,[[-4,-1],[6,2]],'#e2b775',4);if(path===1&&tier)oval(c,s*6,-20,3,4,'#c6f796',null);c.restore();}
  }
  if(tier>=3)oval(c,0,-6,4,4,'#ffde7d');if(tier>=4)for(const x of [-12,12])oval(c,x,-12,4,4,light,'#ffe89c',2);
  if(tier===6)for(let i=0;i<3;i++)oval(c,Math.cos(time+i*2.1)*26,-18+Math.sin(time+i*2.1)*20,3,3,'#fff1b1',null);c.restore();
 }
 function enemy(c,e,time){
  const size=e.type==='tiny'?.65:e.type==='giant'?1.9:e.type==='dragon'?2.2:e.type==='brute'?1.25:1,frozen=e.effects.some(f=>f.kind==='freeze'),stopped=frozen||e.effects.some(f=>f.kind==='stun'),fear=e.effects.some(f=>f.kind==='fear');
  const bone=e.flash>0?'#fff':frozen?'#cdf5ff':'#fff0d2',shade=frozen?'#9bdeec':'#dccaae';
  const phase=e.p*.10+e.id,walk=stopped?0:Math.sin(phase)*3;
  c.save();c.translate(e.x,e.y);oval(c,0,7,18*size,7*size,'#28473d40',null);c.scale(size,size);c.translate(0,stopped?0:-Math.abs(Math.sin(phase))*.9);c.rotate(stopped?0:Math.sin(phase)*.045);
  if(e.type==='dragon'){
   for(const s of [-1,1]){c.save();c.rotate(s*Math.sin(time*5)*.14);shape(c,c=>{c.moveTo(s*7,-12);c.bezierCurveTo(s*19,-32,s*39,-55,s*42,-41);c.quadraticCurveTo(s*43,-29,s*35,-13);c.quadraticCurveTo(s*28,-25,s*22,-12);c.quadraticCurveTo(s*14,-20,s*7,-5);},'#b6a0de');c.restore();}
   line(c,[[0,0],[-17,12],[-31,8+Math.sin(time*4)*3]],ink,9);line(c,[[0,0],[-17,12],[-31,8+Math.sin(time*4)*3]],bone,5);
  }
  for(const s of [-1,1]){line(c,[[s*6,-3],[s*9,7+walk*s]],ink,7);line(c,[[s*6,-3],[s*9,7+walk*s]],bone,4);oval(c,s*9,8+walk*s,5,3,bone);}
  oval(c,0,-10,10,13,shade);for(let i=0;i<3;i++)line(c,[[-6,-17+i*5],[0,-15+i*5],[6,-17+i*5]],bone,3);
  for(const s of [-1,1]){line(c,[[s*9,-15],[s*16,-5-s*walk]],ink,7);line(c,[[s*9,-15],[s*16,-5-s*walk]],bone,4);oval(c,s*16,-5-s*walk,3,3,bone,null);}
  if(e.type==='giant'||e.type==='brute'){oval(c,-12,-16,7,7,'#9bacbb');oval(c,12,-16,7,7,'#9bacbb');}
  oval(c,0,-31,17,16,bone);
  if(e.type==='dragon'){for(const s of [-1,1]){line(c,[[s*12,-40],[s*17,-49]],ink,7);line(c,[[s*12,-40],[s*17,-49]],bone,4);}oval(c,0,-22,15,8,bone);oval(c,-5,-23,2,2,ink,null);oval(c,5,-23,2,2,ink,null);}else{box(c,-10,-22,20,8,4,bone);for(const x of [-4,3])line(c,[[x,-21],[x,-17]],'#b4a68e',1.5);}
  for(const x of [-7,7]){oval(c,x,-33,5,6,ink,null);oval(c,x-1,-34,2,2,fear?'#e6a3ff':e.type==='dragon'?'#d4acff':'#a9e6d3',null);}
  if(e.type==='runner'){box(c,-17,-44,34,6,3,'#ffbf8e');line(c,[[17,-42],[25,-39+walk],[29,-43]],'#ffbf8e',3);}
  if(e.type==='shield'){oval(c,15,-3,12,15,'#9ac8e5');oval(c,15,-3,8,11,'#c0e7f8','#f2fcff',2);oval(c,15,-3,3,3,'#ffe6a0');}
  if(e.type==='captain'){box(c,-15,-47,30,8,4,'#ffdd94');for(const x of [-11,0,11])oval(c,x,-50,x?4:5,x?6:8,'#ffdd94');line(c,[[22,6],[22,-43]],ink,4);box(c,23,-44,17,17,5,'#efa99d');}
  if(e.type==='shaman'){oval(c,0,-45,20,6,'#ab91cb');oval(c,0,-52,12,12,'#c1a2e2');oval(c,0,-58,4,4,'#f2e5ff',null);line(c,[[20,6],[20,-28]],'#8e7096',5);oval(c,20,-33,7,7,'#ddc6ff');}
  c.restore();
  if(e.shield>0)oval(c,e.x,e.y-19*size,(22+Math.sin(time*3))*size,30*size,'#cba7ff22','#deccff',2);
  if(e.hp<e.maxHp||e.type==='dragon'||e.type==='giant'){const w=e.type==='dragon'?84:38*size,y=e.y-58*size;box(c,e.x-w/2,y,w,7,3.5,'#344950',null);const f=Math.max(0,e.hp/e.maxHp)*(w-4);if(f>0)box(c,e.x-w/2+2,y+2,f,3,1.5,e.type==='dragon'?'#dbb2f5':'#c8ef95',null);}
  c.textAlign='center';c.font='bold 10px "Trebuchet MS",sans-serif';if(e.blocks>0){c.fillStyle='#544573';c.fillText('◇ '+e.blocks,e.x,e.y-63*size);}
  if(e.effects.some(f=>f.kind==='burn'))for(const x of [-8,8])oval(c,e.x+x,e.y-6,4,7+Math.sin(time*12+x)*2,'#ffc77f','#df976c',1);
  if(e.effects.some(f=>f.kind==='poison'))for(let i=0;i<3;i++)oval(c,e.x-14+i*12,e.y-12-(time*12+i*7)%20,2.5,2.5,'#d3f6a3','#82a569',1);
  if(stopped&&!frozen)for(let i=0;i<3;i++)oval(c,e.x+Math.cos(time*5+i*2.1)*16,e.y-47*size+Math.sin(time*5+i*2.1)*3,2,2,'#ffe596',null);
  if(fear){c.fillStyle='#9364a4';c.font='bold 19px sans-serif';c.fillText('!',e.x,e.y-52*size);}
  if(e.effects.some(f=>['hunter','bounty','weak'].includes(f.kind))){c.beginPath();c.arc(e.x,e.y-30*size,21*size,0,7);c.strokeStyle='#ffe6a1';c.lineWidth=2;c.stroke();}
 }
 function village(c,time=0){for(const [x,y,s,color] of [[1040,365,.8,'#eca99b'],[1080,510,.9,'#bcb1e6'],[1047,560,.65,'#eabe91']]){c.save();c.translate(x,y);c.scale(s,s);oval(c,0,10,43,13,'#284d4633',null);box(c,-29,-36,58,48,17,'#fff2d2');shape(c,c=>{c.moveTo(-40,-29);c.bezierCurveTo(-40,-76,34,-80,42,-30);c.quadraticCurveTo(0,-14,-40,-29);},color);oval(c,-13,-50,10,5,'#ffffff55',null);box(c,-9,-15,18,27,9,'#b1967c');oval(c,3,0,2,2,'#ffe9a8',null);oval(c,19,-14,7,7,'#ffe2a1');line(c,[[19,-19],[19,-9]],'#b39876',1.5);line(c,[[14,-14],[24,-14]],'#b39876',1.5);for(let i=0;i<3;i++){let t=(time*.22+i*.33)%1;oval(c,15+Math.sin(t*5)*8,-58-t*35,3+t*7,4+t*5,`rgba(241,244,222,${(1-t)*.25})`,null);}c.restore();}c.font='bold 11px "Trebuchet MS",sans-serif';c.textAlign='center';c.fillStyle='#fff5d2';c.strokeStyle='#52795a';c.lineWidth=3;c.strokeText('THE VILLAGE',1024,605);c.fillText('THE VILLAGE',1024,605);}
 function map(c){let seed=41;const rand=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};const g=c.createLinearGradient(0,0,1100,720);g.addColorStop(0,'#86bc89');g.addColorStop(.55,'#add78c');g.addColorStop(1,'#81bd9a');c.fillStyle=g;c.fillRect(0,0,1100,720);
  for(let i=0;i<160;i++){const x=rand()*1100,y=rand()*720,r=12+rand()*42;oval(c,x,y,r,r*.6,i%2?'#e0edaa25':'#66a78720',null);}
  const stream=[[-30,642],[130,665],[275,681],[460,640],[630,665],[780,650],[930,695],[1150,670]];line(c,stream,'#76b6b3',46);line(c,stream,'#a0dddf',34);line(c,stream,'#c9f3ef44',12);
  const points=GameData.points;line(c,points,'#6c9766',67);line(c,points,'#c8b68b',61);line(c,points,'#f3dbac',52);line(c,points,'#ffe8b9',39);
  for(let i=0;i<500;i++){const x=rand()*1100,y=rand()*720,d=GameEngine.nearest(x,y).distance;if(d<20)oval(c,x,y,1.5+rand()*2,1.3,'#cbb18b55',null);else if(d>44){if(i%11===0){for(let j=0;j<5;j++)oval(c,x+Math.cos(j*1.26)*3,y+Math.sin(j*1.26)*3,2.5,2.5,i%2?'#fff3cb':'#f1c6dc',null);oval(c,x,y,1.8,1.8,'#ffd48d',null);}else oval(c,x,y,2+rand()*3,1.8,'#63956930',null);}}
  for(let i=0;i<24;i++){const x=rand()*1100,y=rand()*720;if(GameEngine.nearest(x,y).distance>52){oval(c,x,y,7+rand()*5,5,'#b3c8bc','#8baa99',2);oval(c,x-2,y-2,3,1.5,'#e0e7d6',null);}}
  for(let i=0;i<38;i++){const x=rand()*1100,y=i<19?35+rand()*45:690+rand()*40;if(GameEngine.nearest(x,y).distance>72)tree(c,x,y,.45+rand()*.45);}
  for(const [x,y] of [[30,121],[997,388],[1080,506]]){line(c,[[x,y+20],[x,y-31],[x+12,y-31]],'#958767',4);box(c,x+5,y-29,14,17,6,'#ffedb4','#8b8165');}
  for(let i=0;i<7;i++){const x=879+(i%4)*37,y=85+Math.floor(i/4)*35;oval(c,x,y+7,12,4,'#658f7b33',null);box(c,x-8,y-18,16,24,8,'#c8d4c6','#92ab9e');line(c,[[x,y-11],[x,y+1]],'#9bb0a0',2);line(c,[[x-3,y-7],[x+3,y-7]],'#9bb0a0',2);}
  for(const [x,y] of [[94,560],[397,120],[593,565],[859,306]]){box(c,x-3,y-9,6,14,3,'#fff2d6','#94a17f');oval(c,x,y-10,11,7,'#deb0cc','#a380a5',2);oval(c,x-4,y-12,2,2,'#fff5ee',null);oval(c,x+4,y-9,2,2,'#fff5ee',null);}
 }
 const portraits={};function portrait(type){if(!portraits[type]){const c=document.createElement('canvas');c.width=160;c.height=160;const ctx=c.getContext('2d');ctx.scale(1.75,1.75);hero(ctx,{type,x:42,y:72,u:[0,0,0,0],id:0},{time:1});portraits[type]=c.toDataURL();}return `<img src="${portraits[type]}" width="64" height="64" alt="" aria-hidden="true">`;}
 window.CartoonArt={tree,hero,enemy,village,map,portrait};
})();
