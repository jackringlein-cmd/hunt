/* Native outlined artwork; double-rang silhouette follows the supplied paired hooks. */
window.ToolmakerArt=(()=>{
 const ink='#2b2927';
 function shape(c,points,fill){c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.fillStyle=fill;c.fill();c.strokeStyle=ink;c.lineWidth=2;c.stroke();}
 function oval(c,x,y,rx,ry,fill){c.beginPath();c.ellipse(x,y,rx,ry,0,0,7);c.fillStyle=fill;c.fill();c.strokeStyle=ink;c.lineWidth=2;c.stroke();}
 function line(c,pts,color,width){c.beginPath();pts.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.strokeStyle=color;c.lineWidth=width;c.lineCap='round';c.stroke();}
 function rang(c,x,y,angle=0,size=16){c.save();c.translate(x,y);c.rotate(angle);c.scale(size/28,size/28);
  // Two broad opposing hooked blades connected through the middle.
  const p=new Path2D('M 2 -25 C -6 -28 -22 -30 -28 -18 C -34 -8 -31 4 -32 15 C -29 24 -16 29 -2 28 C -14 22 -25 19 -24 3 L 14 3 C 24 3 23 10 20 14 L 0 24 C 19 26 30 16 31 4 C 35 -10 29 -19 19 -23 L 1 -31 C 11 -27 15 -23 15 -14 L 15 -5 L -23 -6 C -23 -11 -19 -16 -12 -16 Z');
  c.fillStyle='#b9c8c6';c.fill(p);c.strokeStyle=ink;c.lineWidth=2.8;c.stroke(p);line(c,[[-19,-2],[16,-1]],'#eef0d4',2);c.restore();
 }
 function weapon(c,x,y,angle,index=0,scale=1){c.save();c.translate(x,y);c.rotate(angle);c.scale(scale,scale);line(c,[[0,2],[0,-25]],ink,6);line(c,[[0,2],[0,-25]],'#946640',3);
  switch(index%6){case 0:shape(c,[[-10,-31],[9,-32],[11,-21],[-10,-20]],'#a8b8b9');break;case 1:shape(c,[[0,-43],[6,-32],[3,-13],[-3,-13],[-5,-32]],'#d7dcca');line(c,[[-8,-14],[8,-14]],'#c9a356',3);break;case 2:shape(c,[[0,-33],[14,-36],[17,-21],[0,-20]],'#a9b8ba');break;case 3:shape(c,[[0,-42],[6,-31],[0,-22],[-6,-31]],'#cad5cf');break;case 4:oval(c,0,-28,8,10,'#8e9595');break;case 5:line(c,[[0,-25],[9,-33],[16,-27],[13,-16]],'#c8d4ce',5);break;}c.restore();}
 function arm(c,sx,sy,ex,ey,hx,hy){
  // Tapered upper arm, bent elbow and narrower wrist share one soft outline.
  const dx=hx-sx,dy=hy-sy,length=Math.hypot(dx,dy)||1,nx=-dy/length,ny=dx/length;
  c.beginPath();c.moveTo(sx+nx*6,sy+ny*6);c.quadraticCurveTo(ex+nx*7,ey+ny*7,hx+nx*3,hy+ny*3);c.lineTo(hx-nx*3,hy-ny*3);c.quadraticCurveTo(ex-nx*5,ey-ny*5,sx-nx*6,sy-ny*6);c.quadraticCurveTo(sx-nx*2-3,sy-8,sx+nx*6,sy+ny*6);c.fillStyle='#e2b38d';c.fill();c.strokeStyle=ink;c.lineWidth=1.7;c.stroke();
  line(c,[[ex-nx*2,ey-ny*2],[ex+nx*2,ey+ny*2]],'#b98363',1);
  c.save();c.translate(sx,sy);c.rotate(Math.atan2(dy,dx)-Math.PI/2);c.beginPath();c.moveTo(-7,-4);c.quadraticCurveTo(-9,2,-6,7);c.quadraticCurveTo(0,10,7,6);c.lineTo(7,-4);c.closePath();c.fillStyle='#a0afb0';c.fill();c.strokeStyle=ink;c.stroke();line(c,[[-5,5],[0,6],[5,5]],'#d0d8cc',1);c.restore();
  c.save();c.translate(hx,hy);c.rotate(Math.atan2(dy,dx)-Math.PI/2);c.beginPath();c.moveTo(-4,-4);c.quadraticCurveTo(-8,-1,-6,3);c.lineTo(-3,6);c.quadraticCurveTo(0,9,5,5);c.quadraticCurveTo(8,3,5,-1);c.quadraticCurveTo(10,-5,6,-6);c.lineTo(2,-3);c.closePath();c.fillStyle='#ac7950';c.fill();c.strokeStyle=ink;c.stroke();for(let i=0;i<3;i++)line(c,[[-3+i*2,2],[-2+i*2,5]],'#744d36',.8);c.restore();
 }
 function hero(c,h,{time=0,active=false,selected=false,ghost=false,attack=0,facing=0}={}){
  c.save();c.translate(h.x,h.y);if(ghost)c.globalAlpha=.55;const u=h.u,tier=Math.max(...u),swing=active&&h.toolSwing&&time<h.toolSwing.end?Math.sin((time-h.toolSwing.start)/.45*Math.PI):attack;
  oval(c,0,10,22,6,'#382a2525');if(selected){c.strokeStyle='#ebd99d';c.beginPath();c.ellipse(0,10,28,10,0,0,7);c.stroke();}
  const frame=((Math.round(facing/(Math.PI/4))%8)+8)%8,angle=frame*Math.PI/4;
  const side=Math.sin(angle),back=Math.cos(angle)<-.35,profile=frame===2||frame===6;
  const handX=frame===0?24:side*25,handY=-18+Math.cos(angle)*9;
  const count=[1,2,4,6,8,10,12][u[0]];
  if(u[0])for(let i=0;i<count;i++){const a=i*Math.PI*2/count;weapon(c,Math.cos(a)*(23+swing*9),-22+Math.sin(a)*22,a+Math.PI/2+swing*.9,i,.6);}
  for(const sign of [-1,1]){c.save();c.scale(sign,1);c.beginPath();c.moveTo(3,-4);c.lineTo(13,-4);c.quadraticCurveTo(12,5,18,7);c.bezierCurveTo(27,10,23,16,17,16);c.lineTo(3,15);c.quadraticCurveTo(1,8,3,-4);c.fillStyle='#655247';c.fill();c.strokeStyle=ink;c.lineWidth=2;c.stroke();line(c,[[4,12],[12,13],[21,12]],'#99806a',1.2);c.restore();}
  const shoulder=profile?11:17,shift=side*4;
  shape(c,[[-shoulder+shift,-39],[shoulder+shift,-39],[shoulder,-8],[10,4],[-12,3],[-shoulder,-12]],'#677f88');
  if(back){line(c,[[-10,-35],[8,0]],'#b98552',4);line(c,[[10,-35],[-8,0]],'#b98552',4);}
  else {c.beginPath();c.moveTo(-9+shift,-36);c.quadraticCurveTo(shift,-32,9+shift,-36);c.quadraticCurveTo(9,-15,profile?9:14,0);c.quadraticCurveTo(3,7,-11,2);c.quadraticCurveTo(-8,-15,-9+shift,-36);c.fillStyle='#b9824e';c.fill();c.strokeStyle=ink;c.lineWidth=2;c.stroke();line(c,[[-7,-21],[-5,-17],[-6,-6]],'#d7a66b',1);line(c,[[-9,-13],[10,-13]],'#6e4934',3);for(const x of [-6,6])oval(c,x+shift,-30,1.5,1.5,'#ebc77b');shape(c,[[-5,-10],[7,-10],[7,-2],[-5,-2]],'#88603d');}
  // The near arm reaches toward the selected facing frame; the far arm rests behind it.
  arm(c,-shoulder,-32,-shoulder-9,-23,-shoulder,-12);
  arm(c,shoulder,-32,handX+8,-25,handX+swing*side*10,handY);
  const hx=side*3;
  oval(c,hx,-49,profile?13:16,17,'#edc29d');
  // Rounded hair and a short soft beard replace the staring goggles and pointed beard.
  if(back){oval(c,hx,-52,15,16,'#79533d');line(c,[[hx-9,-53],[hx-7,-62],[hx+4,-65]],'#9f7150',2);oval(c,hx+side*13,-48,3,5,'#e3b18b');}
  else {
   c.beginPath();c.moveTo(hx-15,-53);c.bezierCurveTo(hx-18,-73,hx+17,-75,hx+16,-54);c.quadraticCurveTo(hx+7,-63,hx-2,-60);c.quadraticCurveTo(hx-9,-56,hx-15,-53);c.fillStyle='#79533d';c.fill();c.strokeStyle=ink;c.lineWidth=2;c.stroke();
   c.beginPath();c.moveTo(hx-12,-43);c.quadraticCurveTo(hx,-35,hx+12,-43);c.quadraticCurveTo(hx+10,-29,hx,-30);c.quadraticCurveTo(hx-11,-30,hx-12,-43);c.fillStyle='#946444';c.fill();c.stroke();
   const eyes=profile?[side*7]:[-6+side*4,6+side*4];for(const ex of eyes){oval(c,hx+ex,-51,3.3,4,'#fff5e2');c.beginPath();c.ellipse(hx+ex+side,-51,2,2.7,0,0,7);c.fillStyle='#439bd1';c.fill();c.beginPath();c.arc(hx+ex+side-.5,-52,.8,0,7);c.fillStyle='#ffffff';c.fill();line(c,[[hx+ex-3,-58],[hx+ex,-59],[hx+ex+3,-58]],'#79533d',1.5);}
   oval(c,hx+side*12,-46,3.5,3,'#e4ac83');
   c.beginPath();c.moveTo(hx-4+side*6,-40);c.quadraticCurveTo(hx+side*6,-35,hx+5+side*6,-40);c.strokeStyle='#4f372d';c.lineWidth=1.8;c.stroke();
  }
  if(u[1]){const held=Math.max(0,(u[1]>=2?2:1)-(h.rangsInFlight||0));if(held>=1)rang(c,handX,handY,time*(active?4:0),u[1]>=4?17:14);if(held>=2)rang(c,-shoulder,-18,-time*(active?4:0),14);}else weapon(c,handX+swing*side*10,handY,-side*.7+swing*(side||1)*1.3,0,.9);
  if(u[2]){oval(c,-11,-5,5,6,'#5b6462');for(let i=0;i<u[2];i++)oval(c,-12+i*4,-17,1.5,2,'#d5bd78');}
  if(u[3]){line(c,[[11,-34],[20,-49],[27,-45]],'#c7b5a0',3);oval(c,20,-46,4,4,'#989cac');}
  if(tier===6){line(c,[[-12,-63],[0,-67],[12,-62]],'#dbb963',3);}c.restore();
 }
 function ground(c,game){const w=game.s.workshop;if(!w)return;
  for(const t of w.traps){c.save();c.translate(t.x,t.y);const time=game.s.time;
   oval(c,0,8,t.kind==='boulder'?32:25,8,'#30251e33');
   if(t.kind==='jaw'){
    oval(c,0,0,23,13,'#4c5357');oval(c,0,0,16,8,'#927a55');
    for(const side of [-1,1]){line(c,[[-22,side*7],[0,side*15],[22,side*7]],'#b8cbd0',5);for(let i=0;i<5;i++){const x=-17+i*8;shape(c,[[x-4,side*10],[x,side*2],[x+4,side*10]],'#e0e9df');}}
    oval(c,0,0,6,4,'#b78952');for(let i=0;i<4;i++)oval(c,23+i*5,7+i*2,4,2,'#7c8586');
   }else if(t.kind==='oil'){
    c.beginPath();c.moveTo(-28,0);c.bezierCurveTo(-33,-15,-12,-13,-6,-10);c.bezierCurveTo(12,-21,35,-6,27,3);c.bezierCurveTo(36,18,5,15,-5,11);c.bezierCurveTo(-21,19,-34,9,-28,0);c.fillStyle='#242238';c.fill();c.strokeStyle=ink;c.lineWidth=2;c.stroke();
    line(c,[[-18,-3],[-7,-6],[8,-4],[16,0]],'#6c749c',3);line(c,[[-8,6],[7,9],[19,5]],'#628e84',2);
    for(let i=0;i<3;i++)oval(c,-14+i*13,3+Math.sin(time*2+i)*2,2+i%2,1.5,'#9c81b5');
    c.save();c.translate(-19,-11);c.rotate(-.7);shape(c,[[-7,-10],[7,-10],[8,7],[-8,7]],'#685d71');line(c,[[-7,-6],[7,-6]],'#b4a1ba',3);line(c,[[-8,4],[8,4]],'#b4a1ba',3);c.restore();
   }else if(t.kind==='anvil'){
    line(c,[[-23,8],[-23,-47],[23,-47],[23,8]],'#755033',6);line(c,[[-23,-32],[-10,-46],[10,-46],[23,-32]],'#b08b55',3);
    for(const x of [-8,8])line(c,[[x,-46],[x,-29]],'#ced3d2',2);
    shape(c,[[-22,-29],[20,-29],[29,-24],[11,-18],[6,-18],[6,-7],[16,-3],[-14,-3],[-5,-9],[-5,-19],[-20,-20]],'#879eac');line(c,[[-19,-27],[18,-27]],'#e1eef1',3);oval(c,0,5,11,5,'#bc7751');
   }else if(t.kind==='saw'){
    shape(c,[[-24,8],[-21,-7],[20,-7],[25,8]],'#61584c');line(c,[[-19,9],[18,9]],'#c99547',4);
    c.save();c.translate(0,-9);c.rotate(time*4);const teeth=[];for(let i=0;i<32;i++){const a=i*Math.PI/16,r=i%2?17:23;teeth.push([Math.cos(a)*r,Math.sin(a)*r]);}shape(c,teeth,'#c9d8db');oval(c,0,0,12,12,'#7d919c');line(c,[[-8,0],[8,0]],'#b8c9cc',2);oval(c,0,0,4,4,'#e1ab56');c.restore();
   }else if(t.kind==='shrapnel'){
    shape(c,[[-18,8],[-18,-19],[14,-19],[21,-11],[21,8]],'#ac4c34');shape(c,[[-18,-19],[-10,-26],[21,-24],[14,-19]],'#d08a48');shape(c,[[14,-19],[21,-24],[21,8],[14,9]],'#713831');
    for(const x of [-12,8])line(c,[[x,-18],[x,8]],'#d8b47b',3);
    for(let i=0;i<5;i++){const x=-11+i*7;shape(c,[[x-3,-22],[x+1,-34-(i%2)*5],[x+4,-23]],'#d6ded9');}
    shape(c,[[-7,-13],[4,-13],[8,-3],[-10,-3]],'#f4c959');line(c,[[-1,-11],[-1,-7]],'#442e26',2);oval(c,-1,-5,1,1,'#442e26');line(c,[[21,-16],[28,-22],[30,-17]],'#a78a59',2);
   }else if(t.kind==='boulder'){
    shape(c,[[-30,13],[-26,-4],[23,-4],[31,13]],'#9b7846');for(const x of [-27,27])line(c,[[x,11],[x,-43]],'#684630',6);line(c,[[-30,-42],[30,-42]],'#a27b4b',5);
    shape(c,[[-22,-14],[-20,-31],[-6,-43],[15,-37],[25,-21],[18,-6],[-5,-3]],'#8f9691');line(c,[[-7,-39],[0,-24],[17,-20],[10,-8]],'#586466',3);line(c,[[-17,-29],[-12,-19],[-20,-13]],'#d0d4c7',2);line(c,[[-26,-11],[27,-11]],'#c8a76b',4);line(c,[[-25,7],[-9,-7],[8,-7],[26,7]],'#634732',4);
   }c.restore();}
  for(const t of w.turrets){c.save();c.translate(t.x,t.y);const a=t.face?Math.atan2(t.face.y-t.y,t.face.x-t.x):0;line(c,[[-15,10],[0,-5],[14,10]],'#4d3d32',5);oval(c,0,0,13,7,'#8c7656');c.rotate(a);const size=t.level>=6?1.35:1;c.scale(size,size);shape(c,[[-14,-5],[19,-5],[21,4],[-13,5]],t.level>=3?'#aab6b2':'#9c7648');line(c,[[9,-19],[17,-10],[18,0],[17,10],[9,19]],'#665038',5);line(c,[[9,-19],[-3,0],[9,19]],'#e4d8b5',1.5);line(c,[[-10,0],[25,0]],'#d9d9bc',3);if(t.level>=2)line(c,[[-10,5],[25,5]],'#d9d9bc',2);if(t.level>=5)oval(c,1,-1,4,4,'#d7a454');c.restore();}
 }
 function projectiles(c,game){const w=game.s.workshop;if(!w)return;for(const r of w.rangs)rang(c,r.x,r.y-15,(game.s.time-r.start)*17*(r.spin||1)+(r.lane<0?Math.PI/2:0),18);for(const b of w.boulders){c.save();c.translate(b.x,b.y-15);c.rotate(b.rotation);shape(c,[[-25,-10],[-16,-28],[8,-30],[28,-12],[26,13],[6,27],[-18,22],[-29,5]],'#949a8e');line(c,[[-13,-23],[-3,-4],[16,1],[20,15]],'#60665e',3);line(c,[[-3,-4],[-15,10]],'#c2c5b2',2);c.restore();}}
 return {hero,ground,projectiles,rang};
})();
