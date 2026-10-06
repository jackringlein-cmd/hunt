/* A round, four-flipper turtle with a tiled shell and distinct attack poses. */
window.TurtleArt=(()=>{
 const ink='#293c32';
 function ellipse(c,x,y,rx,ry,fill,stroke=ink){c.beginPath();c.ellipse(x,y,rx,ry,0,0,7);c.fillStyle=fill;c.fill();if(stroke){c.strokeStyle=stroke;c.lineWidth=2;c.stroke();}}
 function shape(c,p,color){c.beginPath();p.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.fillStyle=color;c.fill();c.strokeStyle=ink;c.lineWidth=1.7;c.lineJoin='round';c.stroke();}
 function line(c,p,color=ink,w=2){c.beginPath();p.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.strokeStyle=color;c.lineWidth=w;c.lineCap='round';c.stroke();}
 function ripple(c,x,y,t){for(let i=0;i<2;i++){c.beginPath();c.ellipse(x,y,29+i*9+Math.sin(t*2+i)*2,8+i*4,0,0,7);c.strokeStyle=i?'#b7e9df70':'#79c6c599';c.lineWidth=2;c.stroke();}}
 function shell(c,x,y,angle=0,level=0,loaded=0){c.save();c.translate(x,y);c.rotate(angle);ellipse(c,0,0,26,20,level>=4?'#758965':'#668d4f');ellipse(c,-2,-2,22,16,level>=4?'#b2b282':'#8caf61');shape(c,[[-10,-5],[-4,-13],[7,-10],[12,-2],[5,8],[-7,7]],'#4e784c');line(c,[[-10,-5],[-22,-8]],'#3d6242',1.6);line(c,[[-4,-13],[-5,-18]],'#3d6242',1.6);line(c,[[7,-10],[16,-15]],'#3d6242',1.6);line(c,[[12,-2],[23,1]],'#3d6242',1.6);line(c,[[5,8],[9,15]],'#3d6242',1.6);line(c,[[-7,7],[-17,12]],'#3d6242',1.6);
  for(let i=0;i<9;i++){const a=i*Math.PI*2/9,x=Math.cos(a)*24,y=Math.sin(a)*18;line(c,[[x*.88,y*.88],[x,y]],'#d8cd93',2);}
  line(c,[[-16,-10],[-11,-14],[-7,-15]],'#d5dfa7',2);line(c,[[3,-6],[6,-3],[4,2]],'#8fa26b',1.4);line(c,[[14,3],[17,7],[14,10]],'#436644',1);
  if(level>=4)for(const a of [-2.5,-1.3,-.2,.9,2]){const x=Math.cos(a)*23,y=Math.sin(a)*18;shape(c,[[x-4,y],[x,y-8],[x+4,y]],'#dad7b0');}
  if(loaded){ellipse(c,0,-3,11,9,'#354939');for(let i=0;i<Math.min(3,loaded);i++){const x=(i-1)*7;ellipse(c,x,-4,4,4,'#e3dfb4');ellipse(c,x-1,-4,1,1,ink,null);ellipse(c,x+1,-4,1,1,ink,null);}}
  c.restore();
 }
 function flipper(c,x,y,angle,front){c.save();c.translate(x,y);c.rotate(angle);
  c.beginPath();c.moveTo(-5,-4);c.bezierCurveTo(1,-9,9,-5,12,1);c.bezierCurveTo(18,7,23,9,21,12);c.bezierCurveTo(14,17,3,9,-3,5);c.quadraticCurveTo(-8,1,-5,-4);c.fillStyle=front?'#7caa78':'#608a68';c.fill();c.strokeStyle=ink;c.lineWidth=2;c.stroke();
  line(c,[[2,-2],[7,3],[15,9]],'#bad09c',1.5);for(let i=0;i<3;i++)line(c,[[12+i*3,8],[12+i*3,11]],'#3e634b',1);
  for(const [x,y]of [[0,0],[4,3],[8,6]])ellipse(c,x,y,1.6,1.2,'#456e53',null);c.restore();
 }
 function body(c,x,y,{time=0,withShell=true,angle=0,dir=1,bite=0,fire=false,level=0,raised=false,pose='swim'}={}){c.save();c.translate(x,y);c.rotate(angle);c.scale(dir,1);
  const paddle=Math.sin(time*(pose==='return'?13:3))*.22,tuck=pose==='rise',spread=pose==='fall',brace=pose==='land';
  // Curved tail, separate shoulder joints and bending flippers replace plain ovals.
  c.beginPath();c.moveTo(-18,-4);c.bezierCurveTo(-28,-5,-32,5+paddle*9,-39,1);c.quadraticCurveTo(-29,14,-19,5);c.fillStyle='#7a9f6e';c.fill();c.strokeStyle=ink;c.lineWidth=2;c.stroke();
  flipper(c,-17,-10,tuck?-.9:spread?-1.9:-1.4+paddle,false);flipper(c,15,-11,raised?-2:spread?-1.2:tuck?.3:-.55-paddle,false);
  c.beginPath();c.moveTo(-23,-7);c.bezierCurveTo(-25,-19,10,-22,23,-9);c.quadraticCurveTo(28,6,10,11);c.quadraticCurveTo(-14,16,-23,-7);c.fillStyle='#a7bd82';c.fill();c.stroke();
  if(withShell)shell(c,-3,-9,0,level);else{ellipse(c,-1,-5,20,14,'#ddc68e');for(let i=0;i<3;i++){const y=-13+i*8;line(c,[[-15,y],[-5,y+2],[5,y],[14,y+2]],'#a79265',1.4);}line(c,[[-2,-17],[0,-8],[-2,0],[0,8]],'#a79265',1.5);}
  flipper(c,-16,7,tuck?-2.4:spread?.4:brace?.15:1.1-paddle,true);flipper(c,17,6,raised?-1.8:tuck?2.4:spread?-.5:brace?.05:.35+paddle,true);
  const head=29+bite*10,hy=brace?-5:tuck?-15:-10;
  // The neck stretches separately from the broad cheek and hooked beak.
  c.beginPath();c.moveTo(15,-13);c.quadraticCurveTo(24,-18,head+1,hy-5);c.lineTo(head+3,hy+7);c.quadraticCurveTo(21,hy+13,16,1);c.fillStyle='#719b69';c.fill();c.stroke();
  c.save();c.translate(head,hy);c.rotate(tuck?-.18:spread?.16:0);
  c.beginPath();c.moveTo(-12,-4);c.bezierCurveTo(-12,-15,4,-15,11,-8);c.quadraticCurveTo(18,-6,17,0);c.lineTo(12,4);c.quadraticCurveTo(7,13,-5,8);c.quadraticCurveTo(-13,5,-12,-4);c.fillStyle='#91b579';c.fill();c.stroke();
  ellipse(c,1,-6,5.5,5.8,'#f2e8c4');ellipse(c,3,-6,2.8,3.6,'#96703d',null);ellipse(c,4,-6,1.4,2.6,ink,null);ellipse(c,4.5,-7,1,1,'#ffffff',null);
  line(c,[[-5,-12],[1,-13],[6,-10]],'#526d45',2);ellipse(c,13,-3,1,1,ink,null);
  for(const [x,y]of [[-7,0],[-4,3],[0,5]]){ellipse(c,x,y,2,1.5,'#6f955f',null);line(c,[[x-1,y-1],[x+1,y-1]],'#b9cd97',.8);}
  if(bite>.15){shape(c,[[2,3],[16,0],[12,12+bite*5],[2,7]],'#523d37');line(c,[[5,4],[8,8]],'#ece3bd',2);}else{line(c,[[3,4],[12,3],[16,0]],ink,1.5);line(c,[[3,7],[9,7]],'#c8d2a1',1.4);}
  if(fire)for(let i=0;i<3;i++){const q=Math.sin(time*12+i)*2;shape(c,[[6+i*4,7],[9+i*4,-5-q-i*2],[13+i*4,7]],i%2?'#ffd178':'#ed8b47');}
  c.restore();c.restore();
 }
 // Eight articulated roll poses: the torso, neck, tail and flippers move separately.
 function roll(c,x,y,common,t){
  if(t<.08||t>.92){body(c,x,y,{...common,withShell:false,pose:t<.5?'rise':'fall'});return;}
  const poses=[
   [23,-8,-25,3,23,15,0], [10,-22,-16,20,18,22,-.8],
   [-12,-23,17,18,20,21,-1.7], [-24,-6,24,-9,25,15,-2.6],
   [-19,14,18,-21,23,18,-3.4], [-2,24,-5,-26,17,24,-4.1],
   [20,14,-24,-9,22,19,-5.2], [25,-5,-27,2,24,15,-6.28]
  ];
  const f=t*7,i=Math.min(6,Math.floor(f)),blend=f-i,v=poses[i].map((n,k)=>n+(poses[i+1][k]-n)*blend),[hx,hy,tx,ty,rx,ry,headAngle]=v;
  c.save();c.translate(x,y);c.scale(common.dir,1);
  // Rear limbs curl behind the torso, then extend as the belly comes around.
  const curl=Math.sin(t*Math.PI),legAngle=headAngle*.65;
  flipper(c,tx*.55,ty*.55,legAngle+1.8,false);flipper(c,-hx*.45,-hy*.45,legAngle-1.2,false);
  c.beginPath();c.moveTo(tx*.6,ty*.6);c.quadraticCurveTo(tx*1.2-4,ty*1.15,tx*1.4,ty*1.3);c.quadraticCurveTo(tx*.8+5,ty*.8+5,tx*.6+3,ty*.6+4);c.fillStyle='#719667';c.fill();c.strokeStyle=ink;c.lineWidth=2;c.stroke();
  ellipse(c,0,0,rx,ry,'#83a572');
  // Belly plates move across the body as the back turns toward the camera.
  const belly=Math.cos(t*Math.PI*2),front=belly>-.35;
  if(front){const offset=Math.sin(t*Math.PI*2)*7;ellipse(c,offset,2,rx*.76,ry*.8,'#d9c38b');for(let j=-1;j<=1;j++){const yy=j*ry*.45;line(c,[[offset-rx*.6,yy],[offset,yy+2],[offset+rx*.6,yy]],'#a28d61',1.3);}line(c,[[offset,-ry*.65],[offset+2,0],[offset,ry*.7]],'#a28d61',1.4);}
  else{for(let j=0;j<5;j++){const xx=-12+j*6;line(c,[[xx,-ry*.5],[xx+3,-ry*.2],[xx+1,ry*.35]],'#54764e',1.5);}line(c,[[-12,-ry*.55],[-3,-ry*.72],[7,-ry*.55]],'#b8cf93',2);}
  const tuck=1-curl*.23;c.save();c.translate(hx*tuck,hy*tuck);c.rotate(headAngle);
  c.beginPath();c.moveTo(-9,-7);c.quadraticCurveTo(0,-13,9,-7);c.quadraticCurveTo(16,-5,14,2);c.quadraticCurveTo(5,11,-7,6);c.closePath();c.fillStyle='#92b47c';c.fill();c.stroke();
  ellipse(c,2,-4,4.5,4.5,'#f0e7c7');ellipse(c,3,-4,2,2.5,'#725b36',null);ellipse(c,3.5,-5,1,1,'#fff',null);line(c,[[5,3],[11,2]],ink,1.5);ellipse(c,11,-2,1,1,ink,null);line(c,[[-5,2],[-1,4]],'#52724e',1.2);c.restore();
  flipper(c,hx*.45+5,hy*.45+6,headAngle+.7+curl,true);flipper(c,tx*.48-4,ty*.48+5,headAngle-1.4-curl,true);c.restore();
 }
 function landing(c,a,age){const t=(age-1)/.85;if(t<0||t>1)return;c.save();c.translate(a.to.x,a.to.y);c.globalAlpha=1-t;
  for(let j=0;j<3;j++){c.beginPath();c.ellipse(0,0,12+t*a.radius+j*8,5+t*a.radius*.38+j*3,0,0,7);c.strokeStyle=j%2?'#e8d5a5':'#ab916c';c.lineWidth=(1-t)*4+1;c.stroke();}
  for(let i=0;i<14;i++){const q=i*Math.PI*2/14,r=14+t*a.radius*.85,x=Math.cos(q)*r,y=Math.sin(q)*r*.35-Math.sin(t*Math.PI)*(18+i%4*8);if(i%2){ellipse(c,x,y,7+t*13,4+t*7,'#c3af8970',null);}else{c.save();c.translate(x,y);c.rotate(q+t*5);shape(c,[[-3,-2],[1,-4],[5,0],[1,3],[-3,2]],'#81766b');c.restore();}}
  for(let i=0;i<7;i++){const q=i*Math.PI*2/7;line(c,[[Math.cos(q)*15,Math.sin(q)*6],[Math.cos(q)*(25+t*25),Math.sin(q)*(10+t*10)]],'#fff2be',3*(1-t));}c.restore();
 }
 function hero(c,h,{time=0,active=false,selected=false,ghost=false,attack=0}={}){c.save();if(ghost)c.globalAlpha=.55;const recovering=(h.turtleRecoverUntil||0)>time,submerged=h.u[3]>0&&h.target==='submerged';ripple(c,h.x,h.y+8,time);if(selected){c.strokeStyle='#f0d98b';c.lineWidth=2;c.beginPath();c.ellipse(h.x,h.y+7,44,17,0,0,7);c.stroke();}
  if(!ghost&&(recovering||submerged)){ellipse(c,h.x,h.y+4,22,7,'#244f5940',null);for(let i=0;i<3;i++)ellipse(c,h.x-12+i*11,h.y-3-((time*12+i*7)%22),2,2,'#b9e4de',null);if(submerged&&active&&time-(h.turtleLastGold??-10)<.7){ellipse(c,h.x,h.y-30,6,7,'#e7c263','#745730');line(c,[[h.x,h.y-34],[h.x,h.y-26]],'#795d35',1.5);}c.restore();return;}
  const a=h.turtleAction,dir=h.face&&h.face.x<h.x?-1:1,common={time,dir,fire:h.u[0]>=3,level:h.u[2],bite:active?Math.max(0,1-(time-(h.turtleBiteAt??-10))/.22):0};
  if(a&&active){const age=time-a.start;if(a.kind==='slam'){shell(c,h.x,h.y-9,0,h.u[2]);let x=h.x,y=h.y,pose='rise',rollTime=null;if(age<.35){x+=dir*28*age/.35;}else if(age<1){const t=(age-.35)/.65;x+=dir*28+(a.to.x-h.x-dir*28)*t;y+=(a.to.y-h.y)*t-Math.sin(t*Math.PI)*175;pose=t<.55?'rise':'fall';rollTime=t;}else{const t=Math.min(1,(age-1)/1.1);x=a.to.x+(h.x-a.to.x)*t;y=a.to.y+(h.y-a.to.y)*t;pose=t<.16?'land':'return';}landing(c,a,age);if(rollTime!==null)roll(c,x,y-7,common,rollTime);else body(c,x,y-7,{...common,pose,withShell:false});}
   else{body(c,h.x-18*dir,h.y-4,{...common,withShell:false,raised:age<.8});if(age<.8){const f=Math.min(1,age/.55);shell(c,h.x+dir*12,h.y-12-f*36,Math.sin(f*Math.PI)*.3,h.u[2],a.loaded||0);}}
  }else body(c,h.x,h.y-4,common);c.restore();
 }
 function projectiles(c,game){for(const h of game.s.heroes){if(h.type!=='turtle')continue;const a=h.turtleAction,now=game.s.time;if(a?.kind==='shell'&&now-a.start>=.8){const t=Math.min(1,(now-a.start-.8)/1.6);shell(c,a.x,a.y-Math.sin(t*Math.PI)*20,(now-a.start)*12,h.u[2],a.loaded||0);}
  const b=h.turtleBurst;if(b&&now<b.end){const t=(now-b.start)/.7;c.save();c.globalAlpha=1-t;ellipse(c,b.x,b.y,b.radius*t,b.radius*t*.65,'#e1d5a66a',null);for(let i=0;i<b.shards;i++){const angle=i*Math.PI*2/b.shards,r=15+t*b.radius*1.5,x=b.x+Math.cos(angle)*r,y=b.y+Math.sin(angle)*r;c.save();c.translate(x,y);c.rotate(angle+t*8);shape(c,[[-5,-4],[7,-1],[1,7]],i%2?'#afbe88':'#53744a');c.restore();}c.restore();}
 }}
 return {hero,projectiles};
})();
