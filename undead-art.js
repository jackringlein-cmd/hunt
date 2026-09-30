/* Distinct undead silhouettes; existing enemy IDs retain their gameplay roles. */
window.UndeadArt=(()=>{
 const ink='#14120d';
 // Match the heroes: soft corners, slightly uneven contours, flat colors.
 function line(c,p,color,w=2){c.beginPath();c.moveTo(...p[0]);for(let i=1;i<p.length;i++){const a=p[i-1],b=p[i];c.quadraticCurveTo((a[0]+b[0])/2+.55,(a[1]+b[1])/2-.35,...b);}c.strokeStyle=color;c.lineWidth=w;c.lineJoin='round';c.lineCap='round';c.stroke();}
 function shape(c,p,color){c.beginPath();for(let i=0;i<p.length;i++){const a=p[(i+p.length-1)%p.length],b=p[i],n=p[(i+1)%p.length];const entry=[b[0]*.78+a[0]*.22,b[1]*.78+a[1]*.22],leave=[b[0]*.78+n[0]*.22,b[1]*.78+n[1]*.22];if(i)c.lineTo(...entry);else c.moveTo(...entry);c.quadraticCurveTo(b[0],b[1],...leave);}c.closePath();c.fillStyle=color;c.fill();c.strokeStyle=ink;c.lineWidth=1.65;c.lineJoin='round';c.stroke();}
 function oval(c,x,y,rx,ry,color){c.beginPath();for(let i=0;i<24;i++){const a=i/24*Math.PI*2,r=1+Math.sin(i*1.7)*.035,px=x+Math.cos(a)*rx*r,py=y+Math.sin(a)*ry*r;i?c.lineTo(px,py):c.moveTo(px,py);}c.closePath();c.fillStyle=color;c.fill();c.strokeStyle=ink;c.lineWidth=1.25;c.lineJoin='round';c.stroke();}
 function eyes(c,y,color='#eecc65'){
  // Uneven eyes keep the same drawn-by-hand expression as Jack's heroes.
  oval(c,-5.5,y-1,3.2,4.1,'#fff3cb');oval(c,5,y+.7,2.7,3.5,'#fff3cb');
  oval(c,-5,y-.6,1.6,2.1,color);oval(c,5.5,y+1,1.3,1.8,color);
 }
 function mouth(c,x,y,fangs=false){
  oval(c,x,y,5.5,3.9,'#412817');
  shape(c,[[x-4,y-2.5],[x+3,y-2.3],[x+3,y-.1],[x-4,y-.2]],'#fff1b3');
  line(c,[[x-1,y-2.5],[x-1,y-.1]],ink,.7);
  line(c,[[x-2,y+2.1],[x+2,y+2]],'#fff1b3',1.5);
  if(fangs)for(const side of [-1,1])shape(c,[[x+side*3-1,y-.4],[x+side*3,y+4],[x+side*3+1,y-.4]],'#fff1b3');
 }
 function limb(c,p,color,w=5){line(c,p,ink,w+2);line(c,p,color,w);}
 function draw(c,type,time,stopped=false,frozen=false){
  const t=stopped?0:time,w=Math.sin(t*7),pale=frozen?'#b9e1ed':'#aeb889';c.save();
  if(type==='runner'){
   // Low, long-armed ghoul with hooked claws and a loping run.
   limb(c,[[-5,-10],[-13,0],[-18-w*4,8]],'#6b7868',5);limb(c,[[5,-10],[10,1],[15+w*4,7]],'#6b7868',5);
   shape(c,[[-13,-28],[0,-34],[11,-22],[8,-7],[-9,-8]],pale);
   for(const side of [-1,1]){const x=side*(20+w*3);limb(c,[[side*8,-25],[side*17,-16],[x,-5]],pale,4);for(let i=0;i<3;i++)line(c,[[x+i-1,-5],[x+(i-1)*3,-1],[x+(i-1)*3-2,3]],'#eee1ae',1.4);}
   c.translate(5,-31+Math.sin(t*7)*1.5);shape(c,[[-12,-13],[-4,-18],[9,-15],[13,-5],[8,3],[-8,3],[-14,-4]],pale);eyes(c,-8,'#f9cd4e');mouth(c,1,-.5);
   shape(c,[[-12,-12],[-15,-21],[-7,-17],[-4,-23],[1,-18],[8,-19],[11,-13]],'#394837');
  }else if(type==='shield'){
   // Heavy zombie guard: green flesh, stitched face and battered armor.
   for(const side of [-1,1]){limb(c,[[side*6,-8],[side*8,3],[side*9+w*side,10]],'#52646c',6);line(c,[[side*9,10],[side*15,10]],'#31373b',6);}
   shape(c,[[-14,-32],[12,-32],[16,-9],[7,-4],[-12,-7]],'#727d8e');line(c,[[-8,-24],[7,-20],[-4,-12]],'#bbc0a7',1);
   limb(c,[[-12,-27],[-19,-15],[-20,-3]],pale,5);limb(c,[[12,-25],[21,-12]],pale,5);
   oval(c,0,-41,13,13,pale);eyes(c,-43);mouth(c,-1,-34);line(c,[[-8,-48],[-5,-39]],'#596843',1.3);for(let i=0;i<3;i++)line(c,[[-10,-46+i*3],[-4,-45+i*3]],ink,.7);
   shape(c,[[-15,-47],[-12,-57],[8,-58],[15,-49],[7,-50],[0,-53],[-8,-49]],'#6d7e88');
   shape(c,[[13,-29],[30,-26],[29,-8],[22,0],[12,-8]],'#5c6a76');line(c,[[21,-24],[20,-6]],'#abb5a5',2);line(c,[[15,-17],[26,-17]],'#abb5a5',2);
  }else if(type==='brute'){
   // Grave Troll: a bulky undead with mossy skin, stitched flesh and exposed ribs.
   const hide=frozen?'#b8d9df':'#89936e',shade=frozen?'#94bdc7':'#59684d';
   for(const side of [-1,1]){const x=side*10+w*side*2;limb(c,[[side*8,-10],[x,5],[x,12]],'#665846',8);shape(c,[[x-5,8],[x+4,8],[x+side*11,12],[x+side*11,17],[x-5,17]],'#302d23');}
   c.translate(0,Math.cos(t*5)*.7);
   shape(c,[[-21,-31],[-15,-43],[1,-45],[18,-39],[23,-22],[16,-8],[-14,-8],[-22,-18]],hide);
   shape(c,[[-15,-13],[15,-13],[17,-4],[9,-7],[3,-3],[-5,-6],[-16,-3]],'#655143');
   for(const side of [-1,1]){limb(c,[[side*18,-33],[side*27,-21],[side*28,-5+w*side*2]],hide,8);oval(c,side*28,-3+w*side*2,6,5,shade);for(let i=0;i<3;i++)line(c,[[side*28-3+i*3,-4+w*side*2],[side*28-3+i*3,0+w*side*2]],'#c6c7a3',1);}
   shape(c,[[-13,-31],[-2,-33],[3,-22],[-9,-18],[-15,-23]],shade);
   for(let i=0;i<3;i++)limb(c,[[-11,-29+i*3],[-5,-27+i*3],[0,-28+i*3]],'#ddd0a6',1.4);
   line(c,[[7,-35],[13,-21],[10,-16]],'#48553d',1.1);for(let i=0;i<4;i++)line(c,[[6+i,-33+i*4],[12+i,-34+i*4]],ink,.8);
   oval(c,0,-43,15,14,hide);shape(c,[[-13,-47],[-21,-52],[-17,-41],[-12,-40]],hide);shape(c,[[13,-46],[22,-49],[17,-39],[12,-40]],hide);
   shape(c,[[-14,-50],[-11,-59],[-3,-57],[2,-61],[9,-55],[15,-53],[9,-49],[2,-52],[-6,-50]],'#4b5c3a');
   eyes(c,-43,'#d6bd69');mouth(c,-1,-34);
   for(const side of [-1,1])shape(c,[[side*8-2,-31],[side*8,-39],[side*8+2,-32]],'#eee0b8');
   oval(c,8,-25,2.4,1.8,'#a9ac78');oval(c,-17,-35,2,1.5,'#a9ac78');
  }else if(type==='captain'){
   // Vampire leader, long burgundy cape and fangs.
   shape(c,[[-16,-35],[-23,10+Math.sin(t*4)*3],[0,3],[23,10-Math.sin(t*4)*3],[15,-35]],'#75394d');
   for(const side of [-1,1]){limb(c,[[side*5,-9],[side*7,9+side*w]],'#514139',5);shape(c,[[side*4,7+side*w],[side*10,7+side*w],[side*16,11+side*w],[side*16,15+side*w],[side*4,15+side*w]],'#201a05');}
   shape(c,[[-11,-31],[11,-31],[9,-5],[-10,-5]],'#333247');line(c,[[0,-27],[0,-7]],'#bd9b54',1.5);
   for(const side of [-1,1])limb(c,[[side*9,-28],[side*18,-15-w*2]],'#333247',5);
   shape(c,[[-17,-36],[-6,-28],[0,-35],[7,-28],[18,-36],[14,-21],[-13,-21]],'#a34259');
   oval(c,0,-43,11,14,'#d5c7cf');shape(c,[[-12,-43],[-12,-56],[-3,-60],[9,-56],[12,-43],[5,-51],[0,-48],[-6,-53]],'#282233');eyes(c,-43,'#ff5d5d');mouth(c,0,-34,true);
  }else if(type==='shaman'){
   // Floating wraith: an empty hood and trailing spectral cloth.
   c.translate(0,Math.sin(t*3)*3);shape(c,[[-12,-33],[-21,12],[-12,5],[-5,13],[2,4],[11,11],[20,5],[13,-31]],'#777394');
   for(let i=0;i<3;i++)line(c,[[-9+i*9,-20],[-12+i*10+Math.sin(t*4+i)*3,5]],'#a3bad5',1.5);
   shape(c,[[-16,-30],[-16,-44],[-5,-61],[8,-57],[18,-38],[12,-26]],'#53577e');oval(c,1,-41,10,13,'#24273d');eyes(c,-42,'#9ff3f4');
   for(const side of [-1,1]){limb(c,[[side*11,-27],[side*22,-20-Math.sin(t*3)*3]],'#777caf',5);oval(c,side*24,-21,4,3,'#b9e4de');}
   c.strokeStyle='#91dfed';c.lineWidth=1.5;c.beginPath();c.ellipse(0,-12,29,36,Math.sin(t*2)*.1,0,Math.PI*2);c.stroke();
  }else if(type==='giant'){
   // Broad wrapped mummy; loose bandages sway during its heavy walk.
   const cloth=frozen?'#c6e4e9':'#c9b78b';
   for(const side of [-1,1]){limb(c,[[side*8,-15],[side*11,-2],[side*12,12+side*w]],cloth,8);limb(c,[[side*17,-37],[side*23,-24],[side*24,-8+side*w*3]],cloth,8);for(let i=0;i<4;i++){line(c,[[side*11-4,-1+i*3],[side*11+4,i*3]],'#86795b',1);line(c,[[side*24-4,-23+i*4],[side*24+4,-21+i*4]],'#86795b',1);}}
   shape(c,[[-17,-42],[17,-42],[20,-20],[12,-10],[-11,-10],[-20,-22]],cloth);
   for(let i=0;i<6;i++)line(c,[[-17,-37+i*4],[16,-33+i*4]],'#847655',1.3);
   oval(c,0,-54,15,16,cloth);for(let i=0;i<5;i++)line(c,[[-13,-64+i*5],[13,-61+i*5]],'#847655',1.1);
   shape(c,[[-11,-57],[11,-57],[10,-49],[-10,-49]],'#3d3330');eyes(c,-53,'#ffb647');
   shape(c,[[-16,-33],[-29,-24],[-29+Math.sin(t*4)*4,-7],[-25+Math.sin(t*4)*4,-12],[-24,-25],[-12,-28]],cloth);
   shape(c,[[10,-46],[22,-41],[26+Math.sin(t*4)*4,-32],[22,-33],[17,-40],[8,-42]],cloth);
  }else if(type==='dragon'){
   // A famished purple fantasy wyvern: no legs, matching pointed shoulder wings and a barbed tail.
   const hide=frozen?'#b0cddd':'#84619f',light=frozen?'#c8e7ed':'#b58fc5',dark='#503958',sway=Math.sin(t*4);
   // Spend most of the beat lifting, then sweep down in one short burst.
   const wingPhase=(t%1.6)/1.6;
   const ease=v=>v*v*(3-2*v);
   const lift=wingPhase<.8?ease(wingPhase/.8):1-ease((wingPhase-.8)/.2);
   const wingAngle=1.25-lift*1.2;
   const tail=[[-18,-22],[-32,-16],[-47,-13+sway*3],[-60,-19+sway*5],[-71,-15+sway*6]];
   limb(c,tail,hide,4);line(c,tail,light,1);
   const tip=tail[4];shape(c,[[tip[0]+3,tip[1]-4],[tip[0]-9,tip[1]],[tip[0]+2,tip[1]+4]],'#c9bb9d');
   const drawWing=side=>{
    // Matching downward-tilted wings; the near wing is painted over the body.
    c.save();c.translate(12,-28);c.scale(side,1);c.rotate(wingAngle);c.translate(-5,25);
    const x=34,y=-64;
    const points=[[5,-25],[18,-46],[x,y],[63,-29],[49,-34],[48,-17],[36,-23],[28,-10],[17,-15]];
    c.beginPath();c.moveTo(...points[0]);for(let i=1;i<points.length;i++){const a=points[i-1],b=points[i];c.quadraticCurveTo((a[0]+b[0])/2+.7,(a[1]+b[1])/2,...b);}c.closePath();
    for(const [hx,hy,rx,ry]of [[32,-33,3,5],[42,-39,2,3]]){c.moveTo(hx+rx,hy);c.ellipse(hx,hy,rx,ry,.3,0,Math.PI*2);}
    c.fillStyle='#624575';c.fill('evenodd');c.strokeStyle=ink;c.lineWidth=1.5;c.stroke();
    limb(c,[[5,-25],[18,-46],[x,y]],hide,3);
    for(let i=0;i<3;i++)line(c,[[x,y],[62-i*16,-29+i*9]],light,1.3);
    shape(c,[[x-2,y+2],[x+3,y-8],[x+5,y+1]],'#c9bb9d');
    for(let i=0;i<3;i++)line(c,[[23+i*6,-32-i*4],[27+i*6,-30-i*4]],'#987291',.8);
    c.restore();
   };
   drawWing(1);
   // Hollow belly and narrow waist, with raised ribs beneath sickly purple skin.
   shape(c,[[-23,-28],[-13,-35],[2,-34],[16,-29],[22,-22],[14,-14],[2,-17],[-7,-11],[-20,-15]],hide);
   shape(c,[[-15,-19],[-3,-15],[8,-18],[1,-23],[-10,-24]],dark);
   for(let i=0;i<5;i++){const x=-16+i*6;line(c,[[x,-30],[x-2,-24],[x,-18]],dark,3);line(c,[[x+1,-30],[x-1,-24],[x+1,-18]],light,1.4);}
   for(let i=0;i<6;i++)shape(c,[[-20+i*7,-29],[-19+i*7,-38+(i%2)*3],[-15+i*7,-30]],'#c9bb9d');
   limb(c,[[17,-24],[24,-34],[29,-45],[37,-49]],hide,6);
   line(c,[[18,-24],[24,-36],[29,-45]],light,1.3);
   for(let i=0;i<3;i++)shape(c,[[21+i*4,-29-i*6],[16+i*4,-34-i*6],[24+i*4,-33-i*6]],'#c9bb9d');
   c.save();c.translate(0,Math.sin(t*4)*1.1);
   shape(c,[[28,-49],[29,-59],[38,-64],[47,-60],[50,-53],[66,-47],[69,-40],[63,-35],[51,-34],[41,-39],[33,-38],[27,-43]],hide);
   // Swept horns, cheek fins and gaunt cheekbones.
   shape(c,[[31,-57],[21,-65],[18,-77],[25,-69],[38,-62]],'#c9bb9d');
   shape(c,[[42,-60],[43,-72],[39,-80],[48,-73],[49,-61]],'#c9bb9d');
   shape(c,[[30,-49],[20,-55],[24,-45],[18,-44],[31,-40]],'#694a82');
   shape(c,[[36,-54],[45,-55],[49,-50],[43,-44],[35,-46]],dark);
   oval(c,42,-50,3.5,3,'#d5e878');oval(c,42.7,-50,1,2.6,ink);
   line(c,[[35,-55],[44,-57],[48,-53]],light,1.7);
   shape(c,[[35,-43],[42,-40],[48,-41],[42,-45]],'#65476e');oval(c,63,-42,2,1,ink);
   const jaw=Math.max(0,Math.sin(t*4))*2;
   shape(c,[[39,-39],[50,-36],[65,-38],[62,-31+jaw],[47,-31+jaw],[38,-35]],'#715181');
   line(c,[[43,-36],[63,-37]],ink,2);
   for(let i=0;i<5;i++)shape(c,[[44+i*4,-37],[45+i*4,-32+jaw],[47+i*4,-37]],'#e4d2a6');
   c.restore();
   // Non-gory signs of illness: dull patches, small bumps and drifting plague breath.
   for(const [x,y,r]of [[-15,-27,2.5],[10,-25,2],[25,-36,1.8],[53,-46,2.1],[-35,-16,1.4]]){oval(c,x,y,r,r*.7,'#999b63');oval(c,x+.8,y-.4,.7,.7,'#c0c18c');}
   for(let i=0;i<4;i++)line(c,[[-8+i*4,-30],[-6+i*4,-32],[-4+i*4,-30]],'#ab82ba',.8);
   drawWing(-1);
   c.save();for(let i=0;i<5;i++){c.globalAlpha=.3*(1-i/6);oval(c,65+i*3,-28-((t*12+i*5)%20),2+i*.5,2+i*.4,'#b5c76c');}c.restore();
  }
  c.restore();
 }
 return {draw};
})();
