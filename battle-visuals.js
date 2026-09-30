// Lightweight canvas effects: all motion follows the paused game clock.
window.BattleVisuals=(()=>{
 const circle=(c,x,y,r,color)=>{c.fillStyle=color;c.beginPath();c.arc(x,y,Math.max(.1,r),0,Math.PI*2);c.fill();};
 function spark(c,x,y,r,color){c.strokeStyle=color;c.lineWidth=1.7;c.beginPath();c.moveTo(x-r,y);c.lineTo(x+r,y);c.moveTo(x,y-r);c.lineTo(x,y+r);c.stroke();}
 function projectile(c,f){
  const t=1-f.life/f.max;
  if(f.type==='lightning'){
   const dx=f.tx-f.x,dy=f.ty-f.y,len=Math.hypot(dx,dy)||1;
   c.beginPath();c.moveTo(f.x,f.y-18);
   for(let i=1;i<=7;i++){const p=i/7,j=i===7?0:Math.sin(i*12.7+Math.floor(t*7))*9;c.lineTo(f.x+dx*p-dy/len*j,f.y-18+dy*p+dx/len*j);}
   c.strokeStyle='#598ae4';c.lineWidth=6;c.stroke();c.strokeStyle='#e5fbff';c.lineWidth=2;c.stroke();spark(c,f.tx,f.ty-18,9*(1-t),'#e8ffff');return true;
  }
  if(f.type==='elementImpact'){
   for(let i=0;i<7;i++){const a=i*Math.PI*2/7,r=5+t*23;spark(c,f.x+Math.cos(a)*r,f.y-16+Math.sin(a)*r,3*(1-t),i%2?'#ffb645':f.color);}return true;
  }
  if(f.type!=='arrow')return false;
  const dx=f.tx-f.x,dy=f.ty-f.y,angle=Math.atan2(dy,dx),level=f.element||0;
  c.translate(f.x,f.y-16);c.rotate(angle);const length=Math.hypot(dx,dy);
  c.strokeStyle=level>=2?'#92dcf4':level?'#ff9b3c':f.color;c.lineWidth=level?3:1.8;c.beginPath();c.moveTo(0,0);c.lineTo(length,0);c.stroke();
  if(level){for(let i=0;i<7;i++){const x=length*(i/7),w=Math.sin(i*2+t*12)*4;circle(c,x,w,2.5*(1-t)+.5,i%2&&level>=2?'#caf4ff':'#ffaf43');}}
  c.fillStyle=level>=2?'#e0faff':'#ffe4a1';c.beginPath();c.moveTo(length+4,0);c.lineTo(length-5,-3);c.lineTo(length-5,3);c.closePath();c.fill();return true;
 }
 function status(c,e,time){
  c.save();const x=e.x,y=e.y-18;
  for(const f of e.effects){
   if(f.kind==='burn')for(let i=0;i<4;i++){const t=(time*1.8+i*.25)%1;circle(c,x-12+i*8+Math.sin(time*5+i)*3,y+13-t*29,3*(1-t)+1,i%2?'#ffd15c':'#f47b32');}
   if(f.kind==='slow')for(let i=0;i<3;i++){const a=time+i*Math.PI*2/3;spark(c,x+Math.cos(a)*18,y+Math.sin(a)*10,3,'#a5e7fa');}
   if(f.kind==='freeze'){c.fillStyle='#b4eaff66';c.strokeStyle='#b8f3ff';c.lineWidth=2;c.beginPath();c.moveTo(x-18,y+22);c.lineTo(x-21,y-13);c.lineTo(x-7,y-32);c.lineTo(x+15,y-25);c.lineTo(x+21,y+20);c.closePath();c.fill();c.stroke();spark(c,x+10,y-19,7,'#edffff');}
   if(f.kind==='poison')for(let i=0;i<3;i++){const t=(time+i*.33)%1;circle(c,x+Math.sin(i*5)*15,y+8-t*22,2+t*2,'#99bd5999');}
   if(f.kind==='stun')for(let i=0;i<3;i++){const a=time*3+i*2.1;spark(c,x+Math.cos(a)*17,y-28+Math.sin(a)*5,4,'#ffdf71');}
  }c.restore();
 }
 function zone(c,z,time){
  c.save();
  if(z.kind==='weather'||z.kind==='blizzard'){
   c.beginPath();c.arc(z.x,z.y,z.r,0,Math.PI*2);c.clip();
   for(let i=0;i<26;i++){const x=z.x-z.r+(i*47)%(z.r*2),y=z.y-z.r+((time*95+i*29)%(z.r*2));c.strokeStyle=i%3?'#b7e8f9aa':'#ffba6577';c.lineWidth=2;c.beginPath();c.moveTo(x,y);c.lineTo(x-4,y+10);c.stroke();}
   c.restore();c.save();for(let i=0;i<5;i++)circle(c,z.x+(i-2)*22,z.y-z.r*.65+Math.sin(time*2+i)*3,18,'#58657c99');
  }else if(['fire','poison','fog','ice'].includes(z.kind)){
   for(let i=0;i<12;i++){const a=i*2.4+time*.3,r=z.r*Math.sqrt((i+1)/13),x=z.x+Math.cos(a)*r,y=z.y+Math.sin(a)*r;circle(c,x,y-Math.sin(time*3+i)*5,2.5,z.kind==='fire'?'#ffb34799':z.kind==='ice'?'#d1f4ff99':'#b0ca7299');}
  }c.restore();
 }
 return {projectile,status,zone};
})();
