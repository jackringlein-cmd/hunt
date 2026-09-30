/* Jack's drawing reference: flat colors, loose black contours, and expressive faces. */
(function(){
 const ink='#14120d',skin='#ffdc75';
 function stroke(c,p,color=ink,w=2){c.beginPath();c.moveTo(...p[0]);for(let i=1;i<p.length;i++){const a=p[i-1],b=p[i];c.quadraticCurveTo((a[0]+b[0])/2+.6,(a[1]+b[1])/2-.4,...b);}c.strokeStyle=color;c.lineWidth=w;c.lineCap='round';c.lineJoin='round';c.stroke();}
 function patch(c,p,color,w=1.8){
  c.beginPath();
  for(let i=0;i<p.length;i++){const a=p[(i+p.length-1)%p.length],b=p[i],n=p[(i+1)%p.length];const enter=[b[0]*.84+a[0]*.16,b[1]*.84+a[1]*.16],leave=[b[0]*.84+n[0]*.16,b[1]*.84+n[1]*.16];if(i)c.lineTo(...enter);else c.moveTo(...enter);c.quadraticCurveTo(b[0],b[1],...leave);}
  c.closePath();c.fillStyle=color;c.fill();c.strokeStyle=ink;c.lineWidth=w;c.lineJoin='round';c.stroke();
 }
 function oval(c,x,y,rx,ry,color,outline=true){c.beginPath();for(let i=0;i<24;i++){const a=i/24*Math.PI*2,r=1+Math.sin(i*1.7)*.028,px=x+Math.cos(a)*rx*r,py=y+Math.sin(a)*ry*r;i?c.lineTo(px,py):c.moveTo(px,py);}c.closePath();c.fillStyle=color;c.fill();if(outline){c.strokeStyle=ink;c.lineWidth=1.6;c.lineJoin='round';c.stroke();}}
 // Eight drawn views, with matching left/right poses. No face scaling or shearing.
 function turnedHero(c,h,frame,time,attack,windup){
  const left=frame>4,view=left?8-frame:frame,t=h.type;
  const profile=view===2,rear=view>=3,back=view===4;
  const pulse=Math.sin(attack*Math.PI),pull=windup>=.35?(windup-.35)/.65:attack>0?Math.max(0,1-attack*5):0;
  const shirt=UpgradeLooks.cloth(h,{knight:'#727d8e',archer:'#394e23',rogue:'#4b244c',mage:'#24366c',leader:'#130c4b'}[t]);
  c.save();if(left)c.scale(-1,1);UpgradeLooks.back(c,h,time);
  // Separate foot placements and shoulder outlines for each direction.
  const poses={
   1:{body:[[-12,-29],[-3,-34],[12,-30],[15,-7],[-8,-5]],feet:[[-9,12],[10,15]],head:[[-13,-60],[-7,-66],[9,-64],[17,-57],[18,-48],[12,-40],[-5,-39],[-13,-47]]},
   2:{body:[[-9,-30],[3,-34],[11,-28],[10,-5],[-8,-5]],feet:[[-6,10],[6,16]],head:[[-12,-60],[-5,-66],[8,-63],[12,-55],[19,-51],[13,-48],[13,-42],[4,-39],[-10,-44]]},
   3:{body:[[-14,-30],[1,-34],[13,-27],[9,-5],[-13,-7]],feet:[[-10,15],[9,10]],head:[[-15,-58],[-8,-66],[9,-65],[16,-57],[14,-44],[5,-39],[-11,-43]]},
   4:{body:[[-13,-30],[-5,-34],[8,-34],[14,-29],[11,-5],[-11,-5]],feet:[[-10,13],[10,13]],head:[[-15,-58],[-9,-65],[8,-65],[15,-59],[14,-44],[6,-39],[-8,-40],[-15,-46]]}
  },p=poses[view];
  for(const [x,y] of p.feet){stroke(c,[[x*.7,-7],[x,y-3]],'#6d5005',8);patch(c,[[x-5,y-5],[x+3,y-5],[x+10,y],[x+9,y+5],[x-6,y+5]],'#201a05');}
  stroke(c,[[-5,-28],[-16,-19],[-14,-4-pulse*5]],shirt,8);
  oval(c,-14,-3-pulse*5,3,4,skin);
  patch(c,p.body,shirt);stroke(c,[[rear?4:-4,-30],[rear?2:0,-7]],rear?'#252632':'#b7a077',1);
  const handX=back?17:profile?25:27,handY=-17-pulse*5;
  if(t==='archer'){
   // Draw the rear quiver before the neck and head.
   patch(c,[[-15,-13],[-20,-42],[-9,-45],[-5,-16]],'#795131');
   for(let i=0;i<3;i++)stroke(c,[[-16+i*3,-37],[-20+i*3,-56]],'#dec18a',1.5);
   stroke(c,[[5,-28],[16,-24],[handX,handY]],shirt,8);oval(c,handX,handY,3.5,4,skin);
   const reach=windup>0&&windup<.35?Math.sin(windup/.35*Math.PI):0;
   const hx=handX-8-pull*17-reach*22,hy=handY-reach*24;
   stroke(c,[[-8,-26],[-8,-14],[hx,hy]],shirt,7);oval(c,hx,hy,3.5,4,skin);
   c.beginPath();c.moveTo(handX,-39);c.bezierCurveTo(handX+17-pull*4,-30,handX+17-pull*4,-4,handX,5);c.strokeStyle=ink;c.lineWidth=4;c.stroke();c.strokeStyle='#85572c';c.lineWidth=2;c.stroke();
   stroke(c,[[handX,-39],[handX-8-pull*17,handY],[handX,5]],'#e3d6a6',1.2);
   if(windup>=.28||attack>0&&attack<.15){stroke(c,[[hx,handY],[handX+14,handY]],'#dec18a',2);patch(c,[[handX+13,handY-3],[handX+20,handY],[handX+13,handY+3]],'#d5d8cf',.8);}
  }else{
   stroke(c,[[9,-27],[17,-21],[handX,handY]],shirt,8);oval(c,handX,handY,3.5,4,skin);
   if(t==='mage'){stroke(c,[[handX,12],[handX,-43-pulse*6]],'#654722',4);oval(c,handX,-48-pulse*6,6,7,'#ac92d2');}
   if(t==='knight'||t==='rogue'){c.save();c.translate(handX,handY);c.rotate(-pulse*1.5);const len=t==='knight'?29:18;patch(c,[[-2,7],[-3,-len],[1,-len-6],[4,-len],[3,7]],'#c0c8c5');stroke(c,[[-7,4],[8,4]],'#715116',3);c.restore();if(t==='knight')patch(c,[[-23,-26],[-11,-24],[-9,-8],[-17,1],[-25,-8]],'#7d7c70');}
  }
  patch(c,[[-5,-42],[5,-42],[7,-30],[-5,-29]],skin);
  patch(c,p.head,skin);
  if(!rear){
   // A profile has one eye and a protruding nose; angled views have two offset eyes.
   if(!profile){oval(c,0,-54,3.7,5,'#fff9de');oval(c,1,-53,1.8,2.5,ink,false);}
   oval(c,profile?9:11,-53,profile?3.5:2.8,4.6,'#fff9de');oval(c,profile?10:12,-52,1.6,2.4,ink,false);
   if(!profile)stroke(c,[[13,-51],[17,-48],[13,-47]],'#9f7531',1.2);
   stroke(c,[[profile?8:5,-43],[profile?13:12,-43]],ink,2);
   oval(c,-9,-49,3,4,skin);stroke(c,[[-10,-50],[-8,-48]],'#b98b45',1);
  }
  const cover=t==='knight'?'#a3a6a5':t==='mage'?'#26366b':t==='rogue'?'#4b244c':t==='leader'?'#8e6905':'#79502a';
  if(rear)patch(c,p.head,cover);
  else patch(c,[[-14,-46],[-15,-60],[-7,-68],[8,-65],[12,-59],[2,-61],[-5,-56],[-6,-45]],cover);
  if(t==='archer'){patch(c,[[-16,-61],[-9,-72],[4,-73],[15,-64],[18,-60],[5,-63]],'#415824');stroke(c,[[-4,-70],[2,-80]],'#a5772d',2);}
  if(t==='knight')patch(c,[[-16,-57],[-15,-68],[-5,-75],[8,-72],[15,-63],[11,-58],[5,-65],[-8,-64],[-10,-56]],cover);
  if(t==='mage')patch(c,[[-19,-62],[-8,-65],[-3,-84],[8,-74],[11,-64],[20,-60],[4,-58]],cover);
  if(rear)stroke(c,[[-5,-59],[-4,-47]],t==='knight'?'#626e75':'#403024',1.4);
  UpgradeLooks.draw(c,h,time,pulse);
  c.restore();
 }
 // The Leader keeps Jack's original long neck, flat hair, fingers and toothy mouth.
 function jackLeader(c,h,frame,time,active,shouting){
  const left=frame>4,view=left?8-frame:frame,profile=view===2,rear=view>=3;
  const navy=UpgradeLooks.cloth(h,'#130c4b'),hat='#8e6905';
  c.save();if(left)c.scale(-1,1);UpgradeLooks.back(c,h,time);
  const wave=active?Math.sin(time*5+h.id):0,lift=shouting?19:active?5+wave*5:0;
  // Large boots and the familiar brown trousers, with drawn angled poses.
  const far=view===2?-3:-9,near=view===2?6:9;
  patch(c,[[far-4,-5],[near+4,-5],[near+5,12],[near-3,13],[0,1],[far+3,12],[far-5,12]],'#6d5005');
  // Both boots use the long raised-toe outline, mirrored to point outward.
  c.save();c.translate(far+9,0);
  patch(c,[[-4,3],[-11,3],[-11,6],[-14,9],[-19,11],[-24,11],[-28,8],[-30,7],[-32,12],[-33,17],[-30,20],[-5,20],[-4,16]],'#201a05');c.restore();
  c.save();c.translate(near-9,0);
  patch(c,[[4,3],[11,3],[11,6],[14,9],[19,11],[24,11],[28,8],[30,7],[32,12],[33,17],[30,20],[5,20],[4,16]],'#201a05');c.restore();
  patch(c,[[-10,-32],[8,-32],[13,-24],[11,-6],[-11,-6],[-13,-23]],navy);
  const hand=(x,y,flip)=>{
   c.save();c.translate(x,y);c.scale(flip,1);
   patch(c,[[-3,-4],[3,-4],[5,0],[6,7],[3,8],[2,3],[1,9],[-2,9],[-2,2],[-5,5],[-7,4],[-6,0]],skin,1.1);c.restore();
  };
  // Loose sleeves bend at the elbows; open fingers follow the hands.
  const lx=shouting?-17:-23,ly=shouting?-34:-3-lift*.35;
  const rx=shouting?18:25,ry=-4-lift;
  stroke(c,[[-9,-29],[-20,-23],[lx,ly-4]],ink,10);stroke(c,[[-9,-29],[-20,-23],[lx,ly-4]],navy,8);
  stroke(c,[[9,-29],[21,-23-lift*.4],[rx,ry-4]],ink,10);stroke(c,[[9,-29],[21,-23-lift*.4],[rx,ry-4]],navy,8);
  hand(lx,ly,-1);hand(rx,ry,1);
  patch(c,[[-6,-47],[5,-47],[6,-31],[2,-28],[-5,-30]],skin);
  const faces=[
   [[-16,-66],[15,-66],[16,-53],[12,-45],[5,-41],[-10,-43],[-16,-49]],
   [[-15,-65],[11,-67],[18,-59],[18,-51],[12,-43],[-5,-41],[-15,-48]],
   [[-13,-64],[7,-67],[12,-58],[20,-54],[14,-51],[14,-45],[5,-41],[-11,-46]],
   [[-16,-63],[-8,-68],[10,-66],[16,-58],[13,-44],[1,-41],[-13,-46]],
   [[-16,-63],[-8,-68],[10,-67],[16,-61],[14,-47],[6,-42],[-9,-44],[-16,-50]]
  ];
  patch(c,faces[view],skin);
  if(!rear){
   const blink=(time+h.id*.4)%5<.11;
   const eyes=view===0?[[-7,-58,3],[6,-56,2.6]]:profile?[[10,-57,2.8]]:[[0,-59,3],[12,-56,2.3]];
   for(const [x,y,r] of eyes){if(blink)stroke(c,[[x-r,y],[x+r,y]],ink,1.5);else{oval(c,x,y,r,r+1.4,'#fff9de');oval(c,x+.7,y+.4,1.6,2,ink,false);}}
   const mx=view===0?-5:profile?11:8,my=-45,open=shouting?7:4.8;
   oval(c,mx,my,profile?3.2:5,open,'#412817');
   stroke(c,[[mx-3,my-open+2],[mx+2,my-open+1]],'#fff1b3',2.5);
   stroke(c,[[mx-2,my+open-1],[mx+2,my+open-2]],'#fff1b3',2);
   for(let i=0;i<2;i++)stroke(c,[[mx-1+i*2,my-open],[mx-1+i*2,my-open+3]],ink,.6);
   if(profile)oval(c,-5,-52,3,4,skin);
  }
  // Jack's brown winter hat, with a soft white rim and fluffy white ends.
  patch(c,[[-19,-64],[-18,-76],[-13,-81],[1,-82],[14,-80],[20,-74],[20,-65],[15,-61],[7,-62],[-1,-61],[-10,-62]],hat);
  for(let i=0;i<8;i++)oval(c,-16+i*4.6,-63+Math.sin(i*1.6)*.8,3.5,2.6,'#fff9e9',false);
  stroke(c,[[-18,-61],[-8,-60],[2,-60],[12,-60],[19,-62]],ink,1.2);
  patch(c,[[-19,-68],[-14,-66],[-14,-56],[-18,-53],[-21,-56]],hat,1.2);
  patch(c,[[16,-68],[21,-67],[22,-57],[19,-53],[15,-56]],hat,1.2);
  const flutter=active?Math.sin(time*5)*1.2:Math.sin(time*2)*.4;
  for(const x of [-18,19]){oval(c,x,-54+flutter,4,3.5,'#fff9e9');oval(c,x-2,-54+flutter,2.3,2,'#fff9e9',false);oval(c,x+2,-55+flutter,2.2,2,'#fff9e9',false);}
  stroke(c,[[-12,-73],[-8,-76],[-4,-74]],'#aa8229',1.3);
  stroke(c,[[6,-75],[10,-77],[14,-74]],'#aa8229',1.3);
  UpgradeLooks.draw(c,h,time,shouting?1:Math.max(0,wave)*.4);
  if(shouting&&!rear){for(let i=0;i<3;i++)stroke(c,[[22+i*2,-55+i*7],[29+i*3,-57+i*8]],'#6d5005',1.6);}
  c.restore();
 }
 function hero(c,h,{time=0,selected=false,ghost=false,attack=0,windup=0,active=false,facing=0,shouting=false}={}){
  const t=h.type,tier=Math.max(...h.u),path=h.u.indexOf(tier),pulse=Math.sin(attack*Math.PI),bob=Math.sin(time*2+h.id)*.4;
  const shirts={leader:'#130c4b',knight:'#727d8e',archer:'#394e23',rogue:'#4b244c',mage:'#24366c'};
  c.save();c.translate(h.x,h.y+bob);c.rotate(t==='leader'?(active?Math.sin(time*3)*.025:0):pulse*.065-windup*.035);if(ghost)c.globalAlpha=.65;
  oval(c,1,12,19,5,'#2e291b22',false);if(selected){c.strokeStyle='#594928';c.lineWidth=1.2;c.setLineDash([3,4]);c.beginPath();c.ellipse(0,11,24,8,0,0,7);c.stroke();c.setLineDash([]);}
  const frame=((Math.round(facing/(Math.PI/4))%8)+8)%8;
  if(t==='leader'){jackLeader(c,h,frame,time,active,shouting);c.restore();return;}
  if(frame!==0){turnedHero(c,h,frame,time,attack,windup);c.restore();return;}
  const side=0,back=false;shirts[t]=UpgradeLooks.cloth(h,shirts[t]);UpgradeLooks.back(c,h,time);
  c.save();
  // Brown trousers and oversized dark boots echo Jack's supplied character.
  patch(c,[[-10,-5],[10,-5],[11,11],[4,12],[0,1],[-3,11],[-11,12]],'#6d5005');
  patch(c,[[-11,9],[-4,9],[-2,16],[-16,17],[-18,14]],'#201a05');
  patch(c,[[4,9],[11,9],[16,12],[20,11],[20,16],[4,17]],'#201a05');
  // Bent sleeves move with the attack but the hero stays planted.
  const raised=t==='leader'&&active?4+Math.sin(time*4)*4:pulse*10+windup*4;
  if(t==='archer'){
   patch(c,[[-10,-32],[10,-32],[11,-5],[-10,-5]],shirts[t]);
   // The bow arm holds steady while the other hand reaches back to the quiver.
   const reach=windup>0&&windup<.35?Math.sin(windup/.35*Math.PI):0;
   const pull=windup>=.35?(windup-.35)/.65:attack>0?Math.max(0,1-attack*5):0;
   const handX=19-pull*17-reach*25,handY=-17-reach*30;
   stroke(c,[[8,-28],[19,-25],[29,-17]],shirts[t],8);
   stroke(c,[[-9,-28],[-15,-17],[handX,handY]],shirts[t],8);
   oval(c,29,-17,3.5,4,skin);oval(c,handX,handY,3.5,4,skin);
  }else{
  patch(c,[[-8,-32],[-15,-30],[-22,-23],[-24,-7],[-18,-5],[-16,-19],[-10,-22],[-10,-5],[10,-5],[10,-22],[16,-20],[19,-7-raised],[25,-8-raised],[22,-25-raised*.3],[13,-31],[7,-32]],shirts[t]);
  for(const side of [-1,1]){const y=side===1?-5-raised:-4;patch(c,[[side*19,y],[side*24,y-1],[side*27,y+3],[side*28,y+9],[side*25,y+9],[side*23,y+4],[side*22,y+10],[side*19,y+9],[side*19,y+3],[side*17,y+5],[side*16,y+2]],skin,1.2);}
  }
  patch(c,[[-5,-42],[5,-42],[6,-29],[2,-27],[-5,-29]],skin);
  patch(c,[[-14,-61],[-9,-65],[10,-64],[16,-58],[14,-43],[7,-38],[-8,-39],[-15,-44]],skin);
  c.save();c.translate(Math.abs(side)*5,0);
  if(!back){
  // Unequal eyes and a toothy oval mouth, directly guided by the drawing.
  const blink=(time+h.id*.4)%5<.11;
  if(blink){stroke(c,[[-9,-53],[-4,-53]]);stroke(c,[[3,-51],[8,-51]]);}else{
   patch(c,[[-10,-58],[-5,-59],[-2,-56],[-3,-50],[-8,-49],[-11,-52]],'#fff9de',1.3);
   patch(c,[[3,-56],[8,-55],[10,-52],[8,-47],[3,-48],[1,-51]],'#fff9de',1.3);
   oval(c,-6,-54,2.2,2.8,ink,false);oval(c,6,-51,1.8,2.4,ink,false);
  }
  oval(c,-1,-41,5.5,4.7,'#412817');
  patch(c,[[-5,-44],[3,-44],[3,-41],[-5,-41]],'#fff1b3',.8);patch(c,[[-3,-38],[3,-39],[2,-37],[-3,-37]],'#fff1b3',.8);
  stroke(c,[[-2,-44],[-2,-41]],ink,.7);stroke(c,[[1,-44],[1,-41]],ink,.7);
  }else{
   patch(c,[[-14,-60],[-8,-65],[10,-64],[15,-58],[14,-44],[5,-39],[-9,-42]],t==='knight'?'#a3a6a5':t==='mage'?'#26366b':t==='rogue'?'#4b244c':'#79502a');
  }
  c.restore();
  if(t==='leader'){
   // No helmet, armor, banner or weapon. Navy shirt and bare hands.
   patch(c,[[-15,-59],[-17,-64],[-14,-73],[-5,-74],[3,-73],[12,-74],[18,-68],[17,-60],[12,-57],[7,-61],[2,-58],[-3,-61],[-8,-58],[-11,-61]],'#8e6905');
   if(h.u[1]>0&&Math.sin(time*3)>.75)for(let i=0;i<3;i++)stroke(c,[[-19-i*2,-46+i*6],[-26-i*2,-49+i*7]],ink,1);
  }else if(t==='knight'){
   patch(c,[[-17,-57],[-17,-67],[-9,-75],[5,-75],[17,-67],[18,-56],[12,-60],[10,-65],[-10,-65],[-12,-58]],'#a3a6a5');
   stroke(c,[[-10,-69],[8,-70]],'#333735',1);
   c.save();c.translate(23,-9);c.rotate(-pulse*1.5);patch(c,[[-2,10],[-3,-21],[0,-29],[4,-21],[3,10]],'#c0c8c5');stroke(c,[[-8,7],[8,7]],'#715116',4);stroke(c,[[0,10],[0,18]],'#684326',4);c.restore();
   patch(c,[[-31,-22],[-19,-25],[-15,-18],[-18,-3],[-24,2],[-32,-5]],'#7d7c70');stroke(c,[[-25,-20],[-24,-3]],'#342b16',2);
  }else if(t==='archer'){
   patch(c,[[-18,-62],[-10,-72],[4,-73],[14,-67],[18,-61],[7,-63],[-5,-61]],'#415824');
   stroke(c,[[7,-70],[14,-80]],'#a5772d',2);
   const pull=windup>=.35?(windup-.35)/.65:attack>0?Math.max(0,1-attack*5):0;
   const recoil=attack>0?Math.sin(attack*Math.PI*6)*(1-attack)*2:0;
   c.beginPath();c.moveTo(26,-39);c.bezierCurveTo(44-pull*4,-29,43-pull*4,-5,25,5);c.strokeStyle=ink;c.lineWidth=4;c.stroke();c.strokeStyle='#85572c';c.lineWidth=2;c.stroke();
   stroke(c,[[26,-39],[21-pull*18+recoil,-17],[25,5]],'#e3d6a6',1.2);
   if(windup>=.28||attack>0&&attack<.15){const tail=19-pull*17;stroke(c,[[tail,-17],[40,-17]],'#dec18a',2);patch(c,[[40,-20],[46,-17],[40,-14]],'#d5d8cf',.8);stroke(c,[[tail,-17],[tail-4,-21]],'#e9e0c7',2);}
   // Spare arrows bob in the quiver as the archer reloads.
   patch(c,[[-23,-25],[-19,-44],[-12,-42],[-14,-22]],'#795131');
   for(let i=0;i<3;i++)stroke(c,[[-20+i*3,-38],[-22+i*3,-54+Math.sin(time*3+i)*.6]],'#d9c08a',1.3);

  }else if(t==='rogue'){
   patch(c,[[-17,-44],[-19,-61],[-9,-73],[4,-74],[17,-61],[17,-43],[12,-47],[12,-59],[1,-65],[-12,-60],[-12,-46]],'#4b244c');
   patch(c,[[-10,-45],[-2,-42],[9,-45],[9,-39],[-2,-36],[-11,-40]],'#513548');
   for(const side of [-1,1]){c.save();c.translate(side*24,-4);c.rotate(side*pulse);patch(c,[[-2,6],[-2,-10],[1,-18],[4,-10],[3,6]],'#bac0b7');stroke(c,[[-6,4],[6,4]],'#78552b',2);c.restore();}
  }else{
   patch(c,[[-21,-62],[-9,-65],[-3,-85],[7,-76],[11,-63],[22,-61],[11,-58],[-12,-58]],'#26366b');
   if(pulse>0||windup>0){c.save();c.globalAlpha=Math.max(pulse,windup)*.7;for(let i=0;i<4;i++){const a=time*9+i*Math.PI/2;oval(c,25+Math.cos(a)*12,-45-raised+Math.sin(a)*12,2,2,'#e0cdff',false);}c.restore();}
   stroke(c,[[25,14],[25,-39-raised]],'#654722',4);oval(c,25,-45-raised,6,7,['#dc8c38','#a2d7dc','#ac92d2','#d5a0d8'][path]);
  }
  UpgradeLooks.draw(c,h,time,pulse);
  if(tier>=3){stroke(c,[[-8,-7],[9,-7]],'#bc9246',1.2);oval(c,0,-23,2,2,'#cdb058');}
  if(tier===6){c.strokeStyle='#b6a05c';c.lineWidth=1;c.beginPath();c.ellipse(0,12,23,7,0,0,7);c.stroke();}
  c.restore();
  c.restore();
 }
 function tree(c,x,y,s=1,time=0){c.save();c.translate(x,y);c.scale(s*1.5,s*1.5);oval(c,2,8,29,7,'#33281722',false);patch(c,[[-7,8],[-5,-39],[6,-42],[8,9],[1,6]],'#805b21');c.translate(Math.sin(time+x)*1.2,0);patch(c,[[-33,-35],[-40,-49],[-32,-61],[-24,-63],[-22,-76],[-8,-80],[0,-75],[12,-81],[28,-71],[27,-62],[39,-53],[36,-40],[23,-32],[9,-36],[-4,-31],[-19,-35]],'#697647');stroke(c,[[-20,-52],[-15,-57],[-7,-51]],'#343e26',1);stroke(c,[[9,-63],[16,-60],[15,-53]],'#343e26',1);stroke(c,[[-1,-41],[0,-21],[4,-11]],'#332915',1);c.restore();}
 function enemy(c,e,time){if(e.type==='werewolf'){WerewolfArt.draw(c,e,time);return;}if(e.type==='screecher'){SkullScreecherArt.draw(c,e,time);return;}if(e.type==='hellhound'){HellHoundArt.draw(c,e,time);return;}if(e.type==='shadow'){ShadowArt.draw(c,e,time);return;}if(e.type==='headless'){HeadlessArt.body(c,e,time);return;}if(e.type==='fusion'){FusionArt.draw(c,e,time);return;}const s=e.type==='tiny'?.65:e.type==='giant'?1.9:e.type==='dragon'?2.2:e.type==='brute'?1.3:1,stopped=e.effects.some(f=>['stun','freeze'].includes(f.kind)),walk=stopped?0:Math.sin(e.p*.1)*3,bone=e.effects.some(f=>f.kind==='freeze')?'#b5d8dc':'#e6d6a7';c.save();c.translate(e.x,e.y);c.scale(s,s);oval(c,0,8,14,5,'#33281722',false);
  if(e.type==='giant'){BossArt.draw(c,e.type,time,stopped,bone);}else if(['runner','shield','brute','captain','shaman','dragon'].includes(e.type)){UndeadArt.draw(c,e.type,time,stopped,e.effects.some(f=>f.kind==='freeze'));}else{
  for(const side of [-1,1]){stroke(c,[[side*5,-7],[side*7,6+side*walk]],ink,5);stroke(c,[[side*5,-7],[side*7,6+side*walk]],bone,3);stroke(c,[[side*7,-24],[side*14,-10-side*walk]],ink,5);stroke(c,[[side*7,-24],[side*14,-10-side*walk]],bone,3);}
  stroke(c,[[0,-27],[0,-6]],ink,4);stroke(c,[[0,-27],[0,-6]],bone,2);for(let i=0;i<3;i++){stroke(c,[[-7,-24+i*5],[0,-20+i*5],[7,-24+i*5]],ink,4);stroke(c,[[-7,-24+i*5],[0,-20+i*5],[7,-24+i*5]],bone,2);}
  patch(c,[[-13,-44],[-7,-49],[7,-47],[14,-41],[12,-30],[6,-26],[-10,-28],[-14,-35]],bone);oval(c,-6,-39,3.5,4,ink,false);oval(c,5,-38,3,4,ink,false);stroke(c,[[-6,-31],[6,-30]],ink,1.2);for(let i=0;i<3;i++)stroke(c,[[-4+i*3,-33],[-4+i*3,-28]],ink,.8);
  if(e.type==='shield')patch(c,[[10,-25],[24,-23],[24,-7],[17,-1],[9,-8]],'#7c7b64');if(['brute','giant'].includes(e.type)){patch(c,[[-13,-26],[-7,-30],[-4,-23],[-13,-19]],'#736a55');}
  if(e.type==='captain'){patch(c,[[-11,-45],[-13,-55],[-5,-49],[0,-58],[5,-49],[12,-54],[10,-45]],'#ab8727');stroke(c,[[20,9],[20,-48]],'#493217',2);patch(c,[[21,-48],[35,-43],[32,-29],[21,-33]],'#873b32');}
  if(e.type==='shaman'){patch(c,[[-16,-44],[-5,-59],[1,-63],[9,-45]],'#5e4c6a');stroke(c,[[19,5],[19,-34]],'#664628',3);oval(c,19,-38,4,5,'#b493bb');}
  if(e.type==='runner')stroke(c,[[-13,-44],[12,-42],[17,-36+walk]],'#aa4e31',3);
  }
  c.restore();if(e.hp<e.maxHp||['giant','dragon'].includes(e.type)){c.fillStyle='#362f1b';c.fillRect(e.x-20*s,e.y-(e.type==='dragon'?90:e.type==='giant'?74:61)*s,40*s,4);c.fillStyle='#8d9c57';c.fillRect(e.x-20*s,e.y-(e.type==='dragon'?90:e.type==='giant'?74:61)*s,40*s*Math.max(0,e.hp/e.maxHp),4);}if(e.blocks>0){c.font='11px Georgia';c.textAlign='center';c.fillStyle='#4c3658';c.fillText('◇ '+e.blocks,e.x,e.y-(e.type==='dragon'?95:e.type==='giant'?79:65)*s);}if(e.shield>0){c.strokeStyle='#aa86b4';c.lineWidth=1;c.beginPath();c.ellipse(e.x,e.y-23*s,20*s,29*s,0,0,7);c.stroke();}if(e.effects.some(f=>f.kind==='burn'))oval(c,e.x-8,e.y-5,3,6+Math.sin(time*12),'#d98231');if(e.effects.some(f=>f.kind==='poison'))oval(c,e.x+10,e.y-12,3,3,'#799e35');if(e.effects.some(f=>f.kind==='fear')){c.fillStyle='#674278';c.font='bold 15px Georgia';c.fillText('!',e.x,e.y-53*s);}}
 function village(c,time=0){for(const [x,y,s] of [[1040,365,.8],[1080,510,.9],[1047,560,.65]]){c.save();c.translate(x,y);c.scale(s,s);patch(c,[[-27,-31],[28,-32],[29,9],[-28,9]],'#ddcb8a');patch(c,[[-36,-31],[-3,-64],[36,-30]],'#6b3a2b');patch(c,[[-7,9],[-7,-16],[6,-16],[6,9]],'#533511');patch(c,[[13,-19],[23,-19],[23,-8],[13,-8]],'#f6db69');stroke(c,[[18,-18],[18,-8]],ink,1);c.restore();}c.font='11px Georgia';c.fillStyle='#342918';c.textAlign='center';c.fillText('THE VILLAGE',1024,605);}
 function map(c,game){if(game?.s.mapId==='marsh'){MarshArt.draw(c,game);return;}c.fillStyle='#d1d4a5';c.fillRect(0,0,1100,720);stroke(c,[[-30,642],[130,665],[275,681],[460,640],[630,665],[780,650],[930,695],[1150,670]],'#272c22',37);stroke(c,[[-30,642],[130,665],[275,681],[460,640],[630,665],[780,650],[930,695],[1150,670]],'#95b8b8',32);stroke(c,GameData.points,ink,59);stroke(c,GameData.points,'#d2b784',54);
  let seed=43;const rand=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
  for(let i=0;i<180;i++){const x=rand()*1100,y=rand()*720;if(GameEngine.nearest(x,y).distance>43)stroke(c,[[x-3,y],[x-1,y-5],[x+2,y],[x+5,y-3]],'#727647',.75);}
  for(let i=0;i<32;i++){const x=rand()*1100,y=i<16?35+rand()*35:685+rand()*38;if(GameEngine.nearest(x,y).distance>68)tree(c,x,y,.5+rand()*.3);}
  for(const {x,y} of GameData.graves){patch(c,[[x-7,y+7],[x-8,y-12],[x-3,y-18],[x+6,y-16],[x+8,y+7]],'#a7aa90',1);stroke(c,[[x,y-11],[x,y+1]],'#414934',1);stroke(c,[[x-3,y-6],[x+3,y-6]],'#414934',1);}
 }
 const portraits={};function portrait(type,upgrades=[0,0,0,0]){const key=type+':'+upgrades.join('-');if(!portraits[key]){const a=document.createElement('canvas');a.width=180;a.height=180;const c=a.getContext('2d');c.scale(1.6,1.6);hero(c,{type,id:0,x:54,y:88,u:upgrades},{time:1});portraits[key]=a.toDataURL();}return '<img src="'+portraits[key]+'" width="64" height="64" alt="" aria-hidden="true">';}
 window.CartoonArt={hero,enemy,tree,map,village,portrait};
})();
