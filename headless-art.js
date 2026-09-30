window.HeadlessArt=(()=>{
 const ink='#14120d',skin='#aeb889';
 // Same rounded, slightly uneven contours and flat colors as Jack's heroes.
 function patch(c,p,fill){c.beginPath();for(let i=0;i<p.length;i++){const a=p[(i+p.length-1)%p.length],b=p[i],n=p[(i+1)%p.length];const enter=[b[0]*.8+a[0]*.2,b[1]*.8+a[1]*.2],leave=[b[0]*.8+n[0]*.2,b[1]*.8+n[1]*.2];if(i)c.lineTo(...enter);else c.moveTo(...enter);c.quadraticCurveTo(...b,...leave);}c.closePath();c.fillStyle=fill;c.fill();c.strokeStyle=ink;c.lineWidth=1.6;c.lineJoin='round';c.stroke();}
 function oval(c,x,y,rx,ry,fill){c.beginPath();for(let i=0;i<24;i++){const a=i/24*Math.PI*2,r=1+Math.sin(i*1.7)*.035,px=x+Math.cos(a)*rx*r,py=y+Math.sin(a)*ry*r;i?c.lineTo(px,py):c.moveTo(px,py);}c.closePath();c.fillStyle=fill;c.fill();c.strokeStyle=ink;c.lineWidth=1.5;c.stroke();}
 function limb(c,points,color,width){c.beginPath();c.moveTo(...points[0]);for(let i=1;i<points.length;i++){const a=points[i-1],b=points[i];c.quadraticCurveTo((a[0]+b[0])/2+.5,(a[1]+b[1])/2-.3,...b);}c.lineCap='round';c.lineJoin='round';c.strokeStyle=ink;c.lineWidth=width+2;c.stroke();c.strokeStyle=color;c.lineWidth=width;c.stroke();}
 function head(c,scream=0){
  patch(c,[[-14,-10],[-9,-16],[8,-15],[15,-8],[14,7],[7,14],[-8,13],[-15,5]],skin);
  patch(c,[[-15,-8],[-14,-16],[-7,-21],[-2,-18],[4,-22],[11,-18],[15,-12],[8,-13],[3,-11],[-4,-14],[-10,-10]],'#485332');
  oval(c,-5,-4,3.8,4.8,'#fff3cb');oval(c,6,-2,3,4,'#fff3cb');oval(c,-4.3,-3.5,1.8,2.5,ink);oval(c,6.5,-1.5,1.4,2,ink);
  const depth=4+scream*6,my=7+scream*6;oval(c,-1,my,5.3+scream*1.8,depth,'#412817');
  patch(c,[[-5,my-depth+1],[3,my-depth+1],[3,my-depth+3],[-5,my-depth+3]],'#fff1b3');
  limb(c,[[-3,my+depth-1],[2,my+depth-1]],'#fff1b3',1.2);
  for(let i=0;i<2;i++)limb(c,[[-2+i*2,my-depth+1],[-2+i*2,my-depth+3]],ink,.45);
  limb(c,[[-12,1],[-6,3]],'#66764b',1);for(let i=0;i<3;i++)limb(c,[[-11+i*2,0],[-11+i*2,3]],ink,.55);
 }
 function body(c,e,time){
  c.save();c.translate(e.x,e.y);const frozen=e.effects.some(f=>['freeze','stun'].includes(f.kind)),w=frozen?0:Math.sin(e.p*.11);
  oval(c,0,12,22,5,'#252f2225');
  for(const side of [-1,1]){const x=side*9+w*side*4;limb(c,[[side*6,-10],[x,5],[x,11]],'#6d5005',7);patch(c,[[x-4,7],[x+4,7],[x+side*11,12],[x+side*12,17],[x-4,17]],'#201a05');}
  c.translate(0,w*1.5);
  // An empty shirt collar, with no wound detail.
  patch(c,[[-6,-48],[6,-48],[8,-40],[-7,-40]],skin);oval(c,0,-47,6,2.2,'#69744f');
  patch(c,[[-13,-42],[-5,-44],[0,-39],[6,-44],[13,-41],[16,-16],[9,-10],[4,-13],[-3,-10],[-13,-13]],'#343a55');
  patch(c,[[-9,-28],[-2,-29],[0,-20],[-8,-19]],'#747951');limb(c,[[-7,-27],[-5,-21]],'#d8c994',.8);
  const hand=(x,y)=>{patch(c,[[x-3,y-3],[x+3,y-3],[x+5,y+2],[x+5,y+7],[x+2,y+7],[x+1,y+2],[x-1,y+8],[x-4,y+7],[x-3,y+1],[x-6,y+3],[x-7,y]],skin);};
  limb(c,[[-12,-37],[-21,-25],[-23+w*4,-14]],'#343a55',8);hand(-23+w*4,-11);
  const thrown=e.headThrown,hx=thrown?33:25,hy=thrown?-29:-18;
  limb(c,[[13,-37],[22,-25],[hx,hy]],'#343a55',8);hand(hx,hy+3);
  if(!thrown){c.save();c.translate(29,-14);c.rotate(-.2+w*.09);head(c);c.restore();}
  c.fillStyle='#251f18';c.fillRect(-23,-64,46,5);c.fillStyle='#c6d582';c.fillRect(-22,-63,44*Math.max(0,e.hp/e.maxHp),3);c.restore();
 }
 function projectile(c,h,time){const t=Math.min(1,(time-h.started)/(h.rollEnd-h.started)),scream=time>=h.rollEnd;c.save();c.translate(h.x,h.y-12);oval(c,0,15,15,4,'#252f2225');if(!scream)c.rotate(t*Math.PI*4);else{c.translate(Math.sin(time*65)*2.2,-3);c.scale(1.18,1.12+Math.sin(time*38)*.08);for(let i=0;i<3;i++){const r=22+((time-h.rollEnd)*65+i*20)%65;c.beginPath();c.arc(0,0,r,0,Math.PI*2);c.strokeStyle='#b884d5'+Math.floor((1-(r-22)/65)*150).toString(16).padStart(2,'0');c.lineWidth=3;c.stroke();}}head(c,scream?1.3+Math.sin(time*38)*.15:0);if(scream){for(const side of [-1,1])for(let i=0;i<3;i++)limb(c,[[side*17,1+i*5],[side*(27+Math.sin(time*30+i)*3),-3+i*8]],'#d8adf5',2);}c.restore();}
 function stun(c,h,time){const left=(h.stunnedUntil||0)-time;if(left<=0)return;c.save();c.translate(h.x,h.y-82);for(let i=0;i<3;i++){const a=time*3+i*Math.PI*2/3;c.fillStyle='#ffe079';c.font='bold 18px Georgia';c.fillText('★',Math.cos(a)*23-8,Math.sin(a)*7);}c.fillStyle='#41214e';c.fillRect(-43,-31,86,20);c.fillStyle='#fff0be';c.font='bold 12px Georgia';c.textAlign='center';c.fillText('STUN '+left.toFixed(1)+'s',0,-17);c.restore();}
 return {body,projectile,stun};
})();
