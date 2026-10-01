/* Painted forest renderer. Cached textures keep the animated map inexpensive. */
(function () {
 const palettes={knight:['#a0adb0','#435057'],archer:['#7d8166','#3b493b'],rogue:['#82818a','#3d3c47'],mage:['#7c879c','#3c4455'],leader:['#a5a8a3','#4b5252']};
 function rng(seed){let n=seed|0;return()=>{n=(Math.imul(n,1664525)+1013904223)|0;return(n>>>0)/4294967296;};}
 function oval(c,x,y,rx,ry,fill){c.fillStyle=fill;c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fill();}
 function line(c,pts,color,w=1){c.beginPath();pts.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.strokeStyle=color;c.lineWidth=w;c.lineCap='round';c.lineJoin='round';c.stroke();}
 function shape(c,pts,fill,stroke){c.beginPath();pts.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.fillStyle=fill;c.fill();if(stroke){c.strokeStyle=stroke;c.lineWidth=.8;c.stroke();}}
 function shade(c,x,y,r,light,dark){const g=c.createRadialGradient(x-r*.3,y-r*.4,1,x,y,r);g.addColorStop(0,light);g.addColorStop(1,dark);return g;}
 const crowns=new Map();
 function crown(seed){if(crowns.has(seed))return crowns.get(seed);const a=document.createElement('canvas');a.width=144;a.height=155;const c=a.getContext('2d'),random=rng(seed);c.translate(72,139);
  line(c,[[1,2],[-1,-46],[3,-84]],'#353c2b',13);line(c,[[-2,1],[-4,-43],[0,-82]],'#8a7651',6);line(c,[[-1,-37],[-22,-62]],'#5b573c',6);line(c,[[0,-53],[26,-76]],'#655f41',5);line(c,[[-5,-23],[-4,-48]],'#c1a379',1);
  const clusters=[[-24,-57,25],[24,-66,25],[-9,-86,27],[15,-92,22],[1,-65,31]];
  for(const [x,y,r] of clusters){oval(c,x,y,r,r*.86,shade(c,x,y,r,'#607845','#273e2d'));for(let i=0;i<180;i++){const angle=random()*Math.PI*2,rad=Math.sqrt(random())*r;const lx=x+Math.cos(angle)*rad,ly=y+Math.sin(angle)*rad*.85;const tone=ly<y?['#819259','#75874e','#9a9e63','#657a45']:['#52693b','#3e5734','#627640','#6e7e45'];oval(c,lx,ly,1.5+random()*4,.8+random()*2,tone[Math.floor(random()*tone.length)]);}}
  crowns.set(seed,a);return a;
 }
 function tree(c,x,y,s=1,time=0){c.save();c.translate(x,y);c.scale(s,s);c.save();c.rotate(-.22);oval(c,17,11,37,12,'#152c2442');c.restore();const seed=1+Math.abs(Math.round(x*3+y*7))%9;const sway=Math.sin(time*.9+x*.02)*.008;c.rotate(sway);c.drawImage(crown(seed),-54,-104,108,116);c.restore();}

 function commander(c,h,{time=0,selected=false,ghost=false}={}){
  const tier=Math.max(...h.u),path=h.u.indexOf(tier),breathe=Math.sin(time*1.8+h.id)*.35;
  c.save();c.translate(h.x,h.y);if(ghost)c.globalAlpha=.65;
  oval(c,5,10,19,6,'#10191660');
  if(selected){c.strokeStyle='#cbb987';c.lineWidth=1;c.beginPath();c.ellipse(0,10,23,9,0,0,7);c.stroke();}
  c.translate(0,breathe);
  const wave=Math.sin(time*2.2+h.id)*1.5;
  // A soft burgundy cloak over a plain woven tunic. No armor or banner.
  c.beginPath();c.moveTo(-10,-31);c.quadraticCurveTo(-15,-11,-14+wave,10);c.lineTo(-5,8);c.lineTo(4,10);c.lineTo(14+wave,8);c.quadraticCurveTo(12,-12,9,-31);c.closePath();
  const cloak=c.createLinearGradient(-14,0,14,0);cloak.addColorStop(0,'#35272a');cloak.addColorStop(.35,'#705049');cloak.addColorStop(1,'#453033');c.fillStyle=cloak;c.fill();
  for(const x of [-11,-7,8,11])line(c,[[x*.65,-27],[x+wave*.4,7]],'#211f243d',.8);
  for(const side of [-1,1]){line(c,[[side*4,-4],[side*5,8]],'#514b3e',6);shape(c,[[side*3,7],[side*8,7],[side*10,12],[side*3,12]],'#312d28');}
  const cloth=c.createLinearGradient(-10,0,11,0);cloth.addColorStop(0,'#80745e');cloth.addColorStop(.35,'#a09477');cloth.addColorStop(1,'#665e4e');
  shape(c,[[-9,-30],[-3,-32],[3,-32],[9,-29],[9,-14],[10,-3],[-9,-3],[-8,-17]],cloth,'#454839');
  line(c,[[-2,-29],[-1,-7]],'#c0b08b',.6);line(c,[[5,-24],[4,-8]],'#5a5548',.6);
  for(const side of [-1,1]){line(c,[[side*9,-27],[side*13,-17],[side*12,-8]],'#82765f',5);line(c,[[side*10,-25],[side*12,-18]],'#b1a07e',.7);oval(c,side*12,-7,2.5,3,'#b6a085');}
  line(c,[[-8,-11],[8,-11]],'#4d3c2f',2);oval(c,1,-11,1.6,1.5,'#a28a5f');
  shape(c,[[-4,-34],[4,-34],[4,-29],[0,-27],[-4,-30]],'#b9a186');
  oval(c,0,-41,5.7,8.3,shade(c,-1,-43,10,'#cfbda0','#7b6a59'));
  // Bare head, swept hair, and visible face instead of the metal helmet.
  c.beginPath();c.moveTo(-6,-39);c.bezierCurveTo(-10,-53,8,-55,7,-40);c.lineTo(4,-43);c.lineTo(3,-47);c.quadraticCurveTo(-3,-44,-5,-44);c.closePath();c.fillStyle='#494336';c.fill();
  line(c,[[-5,-47],[0,-49],[4,-47]],'#82745b',.7);
  line(c,[[-4,-41],[-1.5,-41]],'#363c37',.9);line(c,[[1.5,-41],[4,-41]],'#363c37',.9);line(c,[[0,-40],[-1,-37],[1.5,-37]],'#8b7761',.7);line(c,[[-2,-34],[2,-34]],'#655449',.7);
  line(c,[[-8,-30],[-4,-27],[4,-28],[8,-30]],'#a18d68',.7);
  if(tier>=3){line(c,[[-8,-5],[9,-5]],'#baa780',.8);oval(c,0,-26,1.7,2,'#c3ac7a');}
  if(tier>=5)for(const side of [-1,1])line(c,[[side*9,-25],[side*11,-18]],'#beaa7e',.8);
  if(tier===6){c.strokeStyle=['#d1ba80','#ad98bd','#9dafb6','#c3b686'][path];c.globalAlpha*=.55;c.beginPath();c.ellipse(0,10,25,10,0,0,7);c.stroke();}
  c.restore();
 }
 function hero(c,h,{time=0,selected=false,ghost=false,attack=0}={}){
  if(h.type==='leader'){commander(c,h,{time,selected,ghost});return;}
  const tier=Math.max(...h.u),path=h.u.indexOf(tier),type=h.type;let[light,dark]=palettes[type];if(type==='mage'&&tier)[light,dark]=[['#c29365','#774c40'],['#a4c8d2','#46798b'],['#aea7d0','#565a83'],['#bfa3d0','#6a508a']][path];
  const pulse=Math.sin(attack*Math.PI),breathe=Math.sin(time*2+h.id)*.45;const dx=(h.face?.x??h.x+1)-h.x;
  c.save();c.translate(h.x,h.y);if(ghost)c.globalAlpha=.65;oval(c,5,9,20,7,'#10231f55');if(selected){c.strokeStyle='#e7d9a2';c.lineWidth=1.3;c.beginPath();c.ellipse(0,9,22,9,0,0,7);c.stroke();}
  c.translate(pulse*(dx>=0?2:-2),breathe);const cape=Math.sin(time*2+h.id)*2;
  shape(c,[[-8,-34],[8,-34],[15+cape,7],[1,4],[-14+cape,8]],dark,'#27332e');
  // Boots, long limbs, leather straps and individually shaded armor plates.
  line(c,[[-5,-3],[-6,10]],'#313c36',6);line(c,[[5,-3],[7,10]],'#313c36',6);line(c,[[-7,11],[-10,12]],'#242e2a',5);line(c,[[7,11],[11,12]],'#242e2a',5);
  const body=c.createLinearGradient(-10,0,12,0);body.addColorStop(0,light);body.addColorStop(.38,dark);body.addColorStop(.75,light);body.addColorStop(1,dark);
  shape(c,[[-9,-30],[8,-30],[10,-9],[6,0],[-7,0],[-10,-10]],body,'#283933');
  line(c,[[-8,-12],[9,-12]],'#4e4332',3);oval(c,0,-12,2,2,'#c3ad72');
  line(c,[[-9,-29],[-15,-18],[-13,-7]],dark,6);line(c,[[9,-29],[15,-19],[18,-10]],dark,6);
  oval(c,-13,-7,3,3,'#bca082');oval(c,18,-10,3,3,'#bca082');
  oval(c,0,-39,6.2,9,shade(c,0,-39,11,'#cbb598','#746656'));
  line(c,[[-4,-40],[-2,-40]],'#3a3c34',1);line(c,[[2,-40],[4,-40]],'#3a3c34',1);line(c,[[0,-39],[-1,-35],[2,-35]],'#a08265',.8);line(c,[[-2,-32],[3,-32]],'#775b4e',.8);
  if(type==='knight'){
   shape(c,[[-8,-40],[-7,-48],[0,-53],[7,-48],[8,-39],[6,-31],[2,-30],[1,-39],[-1,-39],[-2,-30],[-7,-32]],shade(c,-2,-44,15,tier>=4?'#d6d9d1':'#aab9c1','#36494f'),'#27353b');line(c,[[-6,-40],[-2,-40]],'#18252b',1.3);line(c,[[2,-40],[6,-40]],'#18252b',1.3);line(c,[[0,-51],[0,-41]],'#d5dcd3',.8);
   for(const s of [-1,1]){oval(c,s*10,-28,6,5,shade(c,s*10,-29,7,light,dark));line(c,[[s*6,-7],[s*6,4]],light,3);}
   shape(c,[[-19,-23],[-9,-21],[-9,-5],[-16,1],[-22,-7]],path===2&&tier?'#ae9765':'#74858b','#263d43');line(c,[[-16,-20],[-16,-3]],'#c7b47e',2);line(c,[[-20,-14],[-11,-13]],'#c7b47e',2);
   c.save();c.translate(18,-9);c.rotate(-pulse*1.6);shape(c,[[-2,8],[-2,-26-tier],[0,-33-tier],[3,-26-tier],[2,8]],'#c6d2d4','#354850');line(c,[[0,-28-tier],[0,5]],'#f1f3e7',1);line(c,[[-6,4],[7,4]],'#c7ad70',3);line(c,[[0,7],[0,14]],'#5a4932',3);if(path===3&&tier)oval(c,0,-22,5,18,'#ffe4a522');c.restore();
  }else if(type==='archer'||type==='rogue'){
   c.beginPath();c.moveTo(-9,-31);c.bezierCurveTo(-15,-58,13,-57,10,-31);c.lineTo(6,-35);c.bezierCurveTo(7,-51,-7,-49,-6,-35);c.closePath();c.fillStyle=dark;c.fill();line(c,[[-9,-31],[-6,-47],[0,-51],[8,-44]],light,1);
   if(type==='archer'){line(c,[[-8,-25],[7,-9]],'#ad9870',2);line(c,[[-9,-29],[-16,-49]],'#695c3d',5);for(let i=0;i<3;i++){line(c,[[-15+i*3,-36],[-21+i*3,-55]],'#c0ab7c',1);line(c,[[-21+i*3,-55],[-24+i*3,-54]],'#cccabb',2);}c.beginPath();c.moveTo(20,-37);c.quadraticCurveTo(37+pulse*2,-12,19,10);c.strokeStyle='#c0a071';c.lineWidth=3;c.stroke();line(c,[[20,-37],[18-pulse*8,-12],[19,10]],'#e4dfc2',.8);line(c,[[7-pulse*8,-11],[32-pulse*8,-11]],'#d7c18e',1.3);}else{line(c,[[-6,-33],[7,-32]],dark,6);for(const s of [-1,1]){c.save();c.translate(s*17,-8);c.rotate(s*pulse);shape(c,[[-2,4],[0,-17],[3,-21],[3,4]],'#bfcdd0','#4a5b5f');line(c,[[-4,3],[5,3]],'#baa06b',2);c.restore();}}
  }else if(type==='mage'){
   shape(c,[[-15,-42],[-4,-60],[0,-69],[7,-56],[11,-44],[17,-40]],body,'#303d4b');line(c,[[-16,-41],[16,-39]],light,2);line(c,[[20,11],[19,-38-pulse*6]],'#9b8158',3);oval(c,19,-42-pulse*6,5,7,shade(c,19,-43,8,'#e0eafa',light));oval(c,19,-42-pulse*6,11+Math.sin(time*3)*2,12,light+'22');line(c,[[-5,-28],[-4,-4]],light,1);
  }else{line(c,[[-7,-45],[7,-45]],'#c5ab72',3);for(const x of [-6,0,6])line(c,[[x,-46],[x,-51]],'#d7bd7e',2);line(c,[[-7,-26],[7,-10]],'#bda474',2);line(c,[[21,12],[21,-61]],'#a88c58',3);const wave=Math.sin(time*3)*3;c.beginPath();c.moveTo(22,-60);c.bezierCurveTo(34,-64+wave,37,-52-wave,48,-56+wave);c.lineTo(47,-31+wave);c.bezierCurveTo(34,-32-wave,31,-42+wave,22,-38);c.closePath();c.fillStyle='#9b7761';c.fill();line(c,[[23,-58],[45,-54+wave]],'#d5b884',1);c.fillStyle='#d3bf8d';c.font='16px Georgia';c.fillText('✦',29,-43);}
  if(tier>=3){line(c,[[-8,-28],[8,-28]],'#bdae79',1);oval(c,0,-22,2,3,'#d9c28c');}if(tier===6){c.strokeStyle=light+'aa';c.lineWidth=1;c.beginPath();c.ellipse(0,9,25,10,0,0,7);c.stroke();for(let i=0;i<3;i++)oval(c,Math.cos(time+i*2)*22,-15+Math.sin(time+i*2)*18,1.5,1.5,'#eadba5');}c.restore();
 }
 function enemy(c,e,time){
  const scale=e.type==='tiny'?.7:e.type==='giant'?2:e.type==='dragon'?2.1:e.type==='brute'?1.3:1;
  const frozen=e.effects.some(f=>f.kind==='freeze'),stopped=frozen||e.effects.some(f=>f.kind==='stun'),fear=e.effects.some(f=>f.kind==='fear'),bone=e.flash>0?'#f9f7e9':frozen?'#accdd9':'#ccbea2',walk=stopped?0:Math.sin(e.p*.1+e.id)*3;
  c.save();c.translate(e.x,e.y);oval(c,4,8,14*scale,6*scale,'#15272160');c.scale(scale,scale);c.translate(0,-Math.abs(walk)*.2);
  if(e.type==='dragon'){for(const s of [-1,1]){c.save();c.rotate(s*Math.sin(time*4)*.12);shape(c,[[s*5,-12],[s*19,-41],[s*46,-57],[s*38,-20],[s*29,-29],[s*20,-12],[s*13,-20]],'#656775','#a1a494');line(c,[[s*5,-12],[s*19,-41],[s*46,-57]],bone,2);line(c,[[s*19,-41],[s*29,-29]],bone,1);c.restore();}line(c,[[0,-3],[-13,12],[-30,10],[-41,15+walk]],bone,3);}
  for(const s of [-1,1]){line(c,[[s*4,-7],[s*7,0],[s*6,10+s*walk]],'#514f43',4);line(c,[[s*4,-7],[s*7,0],[s*6,10+s*walk]],bone,2);oval(c,s*7,0,2,2,bone);line(c,[[s*6,10+s*walk],[s*10,11+s*walk]],bone,2);line(c,[[s*7,-27],[s*12,-17],[s*13,-8-s*walk]],bone,2);oval(c,s*13,-8-s*walk,2,3,bone);}
  line(c,[[0,-30],[0,-8]],bone,2);for(let i=0;i<4;i++){line(c,[[-7+i*.5,-27+i*4],[-4,-25+i*4],[0,-24+i*4],[4,-25+i*4],[7-i*.5,-27+i*4]],bone,1.5);}shape(c,[[-6,-10],[6,-10],[4,-5],[-4,-5]],bone);
  oval(c,0,-38,7.5,9,shade(c,-2,-40,12,e.flash>0?'#fff':bone,'#817965'));shape(c,[[-5,-34],[5,-34],[4,-29],[-4,-29]],bone);for(const x of [-3,0,3])line(c,[[x,-33],[x,-30]],'#766c59',.6);oval(c,-3,-39,2.2,2.7,'#30362e');oval(c,3,-39,2.2,2.7,'#30362e');shape(c,[[0,-37],[-1.3,-34],[1.2,-34]],'#4b4d3b');
  if(e.type==='dragon'){oval(c,0,-32,10,5,bone);for(const s of [-1,1]){line(c,[[s*5,-43],[s*10,-52]],bone,2);oval(c,s*3,-39,1.2,1.2,'#b89ccd');}oval(c,-4,-33,1,1,'#424a42');oval(c,4,-33,1,1,'#424a42');}
  if(e.type==='shield')shape(c,[[10,-25],[21,-22],[20,-5],[14,0],[8,-8]],'#677b80','#b0b8a5');
  if(e.type==='brute'||e.type==='giant'){shape(c,[[-12,-29],[-5,-31],[-3,-23],[-12,-22]],'#717775');shape(c,[[6,-31],[12,-29],[13,-21],[5,-23]],'#838780');}
  if(e.type==='captain'){line(c,[[-7,-45],[7,-45]],'#b9a273',3);for(const x of [-6,0,6])line(c,[[x,-45],[x,-50]],'#b9a273',2);line(c,[[17,7],[17,-48]],'#9a8154',2);shape(c,[[18,-48],[33,-43],[30,-27],[18,-31]],'#865952');}
  if(e.type==='shaman'){shape(c,[[-10,-40],[0,-56],[9,-39]],'#776d8c');line(c,[[16,7],[17,-36]],'#8d805e',2);oval(c,17,-40,4,5,'#b19bc4');}
  if(e.type==='runner')line(c,[[-7,-43],[7,-43],[12,-39+walk]],'#ab8261',2);c.restore();
  if(e.shield>0){c.strokeStyle='#b3a1cb99';c.lineWidth=1;c.beginPath();c.ellipse(e.x,e.y-20*scale,17*scale,30*scale,0,0,7);c.stroke();}
  if(e.hp<e.maxHp||['dragon','giant'].includes(e.type)){const w=e.type==='dragon'?76:32*scale;c.fillStyle='#243831';c.fillRect(e.x-w/2,e.y-58*scale,w,4);c.fillStyle=e.type==='dragon'?'#b397bb':'#acb777';c.fillRect(e.x-w/2,e.y-58*scale,w*Math.max(0,e.hp/e.maxHp),4);}
  c.font='10px Georgia';c.textAlign='center';if(e.blocks>0){c.fillStyle='#e1c8e9';c.fillText('◇ '+e.blocks,e.x,e.y-61*scale);}if(fear){c.fillStyle='#cfb5d6';c.fillText('!',e.x,e.y-53*scale);}
  if(e.effects.some(f=>f.kind==='burn'))for(const x of [-6,6])oval(c,e.x+x,e.y-8,2,4+Math.sin(time*14+x)*2,'#e5a35e');if(e.effects.some(f=>f.kind==='poison'))oval(c,e.x-10,e.y-15,2,2,'#a3c477');if(e.effects.some(f=>['hunter','bounty','weak'].includes(f.kind))){c.strokeStyle='#ccb57a';c.lineWidth=1;c.beginPath();c.arc(e.x,e.y-30*scale,12*scale,0,7);c.stroke();}
 }
 function village(c,time=0){for(const [x,y,s] of [[1040,365,.8],[1080,510,.9],[1047,560,.65]]){c.save();c.translate(x,y);c.scale(s,s);oval(c,12,12,39,12,'#18342955');shape(c,[[-29,-35],[20,-39],[37,-24],[37,12],[-29,8]],'#aa9b7d','#505344');shape(c,[[20,-39],[37,-24],[37,12],[20,7]],'#7e7966');shape(c,[[-40,-32],[-5,-70],[45,-30],[16,-25]],'#5d6765','#394e49');shape(c,[[-5,-70],[45,-30],[16,-25]],'#4d5959');for(let i=0;i<5;i++)line(c,[[-31+i*5,-37-i*5],[17+i*4,-31-i*4]],'#7b8175',1);line(c,[[-22,-25],[-22,7],[17,9],[17,-28]],'#635d49',3);line(c,[[-25,-5],[34,0]],'#746950',2);c.fillStyle='#423f34';c.fillRect(-9,-15,13,24);c.fillStyle='#e6bd75';c.fillRect(12,-15,9,11);line(c,[[16,-15],[16,-4]],'#7f6b49',1);shape(c,[[15,-55],[15,-78],[23,-75],[23,-47]],'#8b8a78');for(let i=0;i<3;i++){const t=(time*.16+i/3)%1;oval(c,19+Math.sin(t*5)*9,-80-t*33,3+t*8,4+t*5,`rgba(204,211,195,${(1-t)*.15})`);}c.restore();}c.font='10px Georgia';c.textAlign='center';c.fillStyle='#e7dec1';c.fillText('THE VILLAGE',1024,605);}
 function map(c){const random=rng(817);const g=c.createLinearGradient(0,0,1100,720);g.addColorStop(0,'#34473b');g.addColorStop(.5,'#596049');g.addColorStop(1,'#334b45');c.fillStyle=g;c.fillRect(0,0,1100,720);
  // Ground noise is painted once; path geometry exactly matches the combat engine.
  for(let i=0;i<9000;i++){const x=random()*1100,y=random()*720,r=random()*4+.6;oval(c,x,y,r,r*.5,random()>.5?'#b6b78012':'#152e2417');}
  for(let i=0;i<160;i++){const x=random()*1100,y=random()*720,r=random()*65+15;oval(c,x,y,r,r*.55,random()>.5?'#aba4740b':'#192f2410');}
  const stream=[[-30,642],[130,665],[275,681],[460,640],[630,665],[780,650],[930,695],[1150,670]];line(c,stream,'#324c43',49);line(c,stream,'#4d706a',34);line(c,stream,'#7c9d8b33',16);for(let i=0;i<60;i++){const x=random()*1100,y=650+Math.sin(x*.017)*10;line(c,[[x,y],[x+4+random()*14,y-1]],'#b8c5a722',.8);}
  line(c,GameData.points,'#3e4937',65);line(c,GameData.points,'#6b6953',59);line(c,GameData.points,'#8b8268',50);line(c,GameData.points,'#958b71',40);
  for(let i=0;i<5500;i++){const x=random()*1100,y=random()*720,d=GameEngine.nearest(x,y).distance;if(d<29){oval(c,x,y,random()*3+.4,.4+random()*1.5,random()>.5?'#c7baa044':'#494c3944');}else if(d>33&&d<52){line(c,[[x,y],[x+random()*4-2,y-2-random()*5]],'#334f3266',.7);}else if(d>52&&i%4===0){line(c,[[x,y],[x+2,y-3],[x+3,y]],'#a6ac7055',.8);}}
  for(let i=0;i<38;i++){const x=random()*1100,y=random()*720;if(GameEngine.nearest(x,y).distance>55){shape(c,[[x-7,y],[x-3,y-6],[x+5,y-5],[x+10,y+2],[x+1,y+4]],'#778273','#4c6050');line(c,[[x-3,y-5],[x+4,y-4]],'#b4b7a0',1);}}
  for(let i=0;i<37;i++){const x=random()*1100,y=i<19?40+random()*40:690+random()*40;if(GameEngine.nearest(x,y).distance>70)tree(c,x,y,.5+random()*.4);}
  for(let i=0;i<7;i++){const x=879+(i%4)*37,y=85+Math.floor(i/4)*35;oval(c,x+3,y+8,13,4,'#263d3055');c.fillStyle='#8c9a86';c.beginPath();c.roundRect(x-7,y-18,14,25,[6,6,0,0]);c.fill();line(c,[[x,y-12],[x,y+1]],'#5a705a',1.5);line(c,[[x-3,y-7],[x+3,y-7]],'#5a705a',1.5);}
  for(const [x,y] of [[30,121],[997,388],[1080,506]]){line(c,[[x,y+20],[x,y-30],[x+12,y-30]],'#756447',3);c.fillStyle='#e8c588';c.fillRect(x+7,y-27,9,13);line(c,[[x+5,y-28],[x+17,y-28]],'#473f31',2);const glow=c.createRadialGradient(x+11,y-20,2,x+11,y-20,40);glow.addColorStop(0,'#f8d78c25');glow.addColorStop(1,'#f8d78c00');oval(c,x+11,y-20,40,40,glow);}
  const sun=c.createLinearGradient(80,0,900,650);sun.addColorStop(0,'#e9d7a014');sun.addColorStop(.6,'#e9d7a000');c.fillStyle=sun;c.fillRect(0,0,1100,720);
 }
 const portraits={};function portrait(type){if(!portraits[type]){const a=document.createElement('canvas');a.width=160;a.height=160;const c=a.getContext('2d');c.fillStyle='#202e2c';c.fillRect(0,0,160,160);c.scale(2.2,2.2);hero(c,{type,x:32,y:67,id:0,u:[0,0,0,0]},{time:1});portraits[type]=a.toDataURL();}return `<img src="${portraits[type]}" width="64" height="64" alt="" aria-hidden="true">`;}
 // Keep the interface stable so existing saves and controls do not change.
 window.CartoonArt={tree,hero,enemy,village,map,portrait};
})();
