/* Hand-drawn boss skeletons. Shared by the game and exported sprite previews. */
window.BossArt=(()=>{
 const ink='#262119';
 function line(c,p,color,w=2){c.beginPath();c.moveTo(...p[0]);for(const v of p.slice(1))c.lineTo(...v);c.strokeStyle=color;c.lineWidth=w;c.lineCap='round';c.lineJoin='round';c.stroke();}
 function bone(c,p,color,w=3){line(c,p,ink,w+2);line(c,p,color,w);}
 function shape(c,p,color){c.beginPath();c.moveTo(...p[0]);for(const v of p.slice(1))c.lineTo(...v);c.closePath();c.fillStyle=color;c.fill();c.strokeStyle=ink;c.lineWidth=1.3;c.lineJoin='round';c.stroke();}
 function oval(c,x,y,rx,ry,color,outline=true){c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fillStyle=color;c.fill();if(outline){c.strokeStyle=ink;c.lineWidth=1.2;c.stroke();}}
 function giant(c,phase,color){
  const stride=Math.sin(phase),bob=Math.cos(phase*2)*1.1;
  for(const side of [-1,1]){
   const knee=side*10+stride*side*3,foot=side*12;
   bone(c,[[side*7,-10],[knee,0],[foot,11+Math.max(0,stride*side)*2]],color,4);
   oval(c,knee,0,3,2.7,color);
   for(let i=0;i<3;i++)bone(c,[[foot-3+i*3,10],[foot-4+i*3,14+Math.max(0,stride*side)*2]],color,1.8);
  }
  c.save();c.translate(0,bob);c.rotate(stride*.035);
  shape(c,[[-11,-15],[-5,-17],[0,-13],[6,-17],[12,-14],[8,-7],[3,-9],[0,-5],[-4,-9],[-9,-7]],color);
  bone(c,[[0,-37],[0,-14]],color,4);
  for(let i=0;i<5;i++){
   const y=-35+i*4,w=14-i*1.5;
   for(const side of [-1,1])bone(c,[[side*2,y],[side*w,y+1],[side*(w-2),y+5],[side*4,y+6]],color,2.3);
  }
  bone(c,[[-18,-36],[-7,-39],[0,-37],[8,-39],[18,-35]],color,3.6);
  for(const side of [-1,1]){
   const sway=stride*side*4;
   bone(c,[[side*18,-35],[side*23,-22+sway],[side*25,-8+sway]],color,4);
   oval(c,side*23,-22+sway,3,3,color);
   for(let i=0;i<3;i++)bone(c,[[side*25+(i-1)*2.5,-8+sway],[side*27+(i-1)*3,-1+sway]],color,1.6);
  }
  // A cyclops skull: one large central socket, never a second eye.
  bone(c,[[0,-40],[0,-44]],color,4);
  shape(c,[[-14,-60],[-8,-67],[6,-68],[15,-61],[16,-51],[10,-45],[7,-41],[-7,-41],[-13,-47],[-16,-53]],color);
  oval(c,0,-56,8.5,8,ink,false);
  oval(c,0,-56,5.5,5.4,'#9e1826',false);oval(c,.5,-56,3.2,3.8,'#ff3c39',false);oval(c,1,-57,1.2,1.7,'#ffd7a2',false);
  shape(c,[[-2,-47],[0,-50],[3,-47]],ink);
  const jaw=Math.max(0,Math.sin(phase))*1.6;
  bone(c,[[-10,-45],[-8,-39+jaw],[7,-39+jaw],[10,-45]],color,2.8);
  for(let i=0;i<5;i++)line(c,[[-6+i*3,-44],[-6+i*3,-41+jaw]],ink,.9);
  line(c,[[-10,-62],[-7,-59],[-9,-57]],'#8e8266',.9);
  c.restore();
 }
 function dragon(c,phase,color){
  const flap=Math.sin(phase),stride=Math.sin(phase*2),bob=Math.cos(phase)*1.3;
  c.save();c.translate(0,bob);
  // Long articulated tail, tapering into a bone spear.
  const tail=[[-19,-19]];for(let i=1;i<=7;i++)tail.push([-19-i*6,-19+i*2.7+Math.sin(phase-i*.5)*i*.7]);
  for(let i=1;i<tail.length;i++){bone(c,[tail[i-1],tail[i]],color,Math.max(1,4-i*.45));oval(c,...tail[i],Math.max(.8,2-i*.17),1.6,color);}
  const tip=tail[7];shape(c,[[tip[0]+2,tip[1]-3],[tip[0]-8,tip[1]+2],[tip[0]+3,tip[1]+3]],color);
  // Bare wing bones and finger spars; no skin or feathers.
  for(const side of [-1,1]){
   const root=side===-1?-9:4,elbowX=root+side*14,elbowY=-48-flap*8,wristX=root+side*27,wristY=-66-flap*12;
   bone(c,[[root,-26],[elbowX,elbowY],[wristX,wristY]],color,3);
   oval(c,elbowX,elbowY,2.5,2.5,color);oval(c,wristX,wristY,2,2,color);
   for(let i=0;i<3;i++){const endX=wristX+side*(27-i*10),endY=-52+i*22-flap*(7-i*2);bone(c,[[wristX,wristY],[endX-3*side,endY-8],[endX,endY]],color,1.5);}
   shape(c,[[wristX-2,wristY],[wristX+side*6,wristY-9],[wristX+2,wristY+2]],color);
  }
  // Four jointed legs with claws, moving in alternating pairs.
  for(const far of [true,false])for(const x of [-15,14]){
   const step=stride*(x<0?-1:1)*(far?-1:1),y=far?-16:-12,offset=far?5:0;
   bone(c,[[x+offset,y],[x+3+step*2,-2],[x+7+step*3,8]],far?'#b6ac91':color,2.5);
   for(let i=0;i<3;i++)bone(c,[[x+7+step*3,8],[x+10+i*2+step*3,11-i]],color,1.1);
  }
  bone(c,[[-23,-22],[-12,-30],[1,-31],[15,-26],[22,-31]],color,4);
  for(let i=0;i<6;i++){
   const x=-17+i*6,y=-28+Math.abs(i-2.5)*1.1;
   bone(c,[[x,y],[x-2,y+8],[x+1,-12],[x+5,-10]],color,2);
   shape(c,[[x-2,y-2],[x,y-8],[x+3,y-2]],color);
  }
  // Curved vertebrae lead to an unmistakably long dragon skull.
  bone(c,[[19,-27],[25,-36],[29,-44],[35,-47]],color,3.6);
  for(let i=0;i<3;i++)oval(c,23+i*4,-32-i*6,2.8,2,color);
  c.save();c.translate(34,-46);c.rotate(Math.sin(phase)*.06);
  shape(c,[[-7,-7],[-4,-15],[7,-17],[16,-10],[28,-7],[31,0],[23,5],[10,4],[4,8],[-5,4]],color);
  shape(c,[[-3,-13],[-10,-27],[2,-19],[5,-15]],color);shape(c,[[7,-16],[10,-28],[15,-19],[14,-12]],color);
  shape(c,[[2,-10],[10,-11],[13,-6],[7,-2],[1,-4]],ink);oval(c,7,-7,2.2,2,'#d64d3e',false);
  oval(c,25,-3,2,1.2,ink,false);
  const jaw=2+Math.max(0,Math.sin(phase))*3;
  bone(c,[[0,4],[9,9+jaw],[26,8+jaw],[29,3]],color,2.4);
  for(let i=0;i<5;i++){const x=8+i*4;shape(c,[[x,3],[x+2,8],[x+3,3]],color);}
  c.restore();c.restore();
 }
 function draw(c,type,time,stopped=false,color='#e6d6a7'){const phase=stopped?0:time*4;if(type==='giant')giant(c,phase,color);else dragon(c,phase,color);}
 return {draw};
})();
