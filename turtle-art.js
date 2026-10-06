/* A round, four-flipper turtle with a tiled shell and distinct attack poses. */
window.TurtleArt=(()=>{
 const ink='#293c32';
 function ellipse(c,x,y,rx,ry,fill,stroke=ink){c.beginPath();c.ellipse(x,y,rx,ry,0,0,7);c.fillStyle=fill;c.fill();if(stroke){c.strokeStyle=stroke;c.lineWidth=2;c.stroke();}}
 function shape(c,p,color){c.beginPath();p.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.fillStyle=color;c.fill();c.strokeStyle=ink;c.lineWidth=1.7;c.lineJoin='round';c.stroke();}
 function line(c,p,color=ink,w=2){c.beginPath();p.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.strokeStyle=color;c.lineWidth=w;c.lineCap='round';c.stroke();}
 function ripple(c,x,y,t){for(let i=0;i<2;i++){c.beginPath();c.ellipse(x,y,29+i*9+Math.sin(t*2+i)*2,8+i*4,0,0,7);c.strokeStyle=i?'#b7e9df70':'#79c6c599';c.lineWidth=2;c.stroke();}}
 function shell(c,x,y,angle=0,level=0,loaded=0){c.save();c.translate(x,y);c.rotate(angle);ellipse(c,0,0,26,20,level>=4?'#758965':'#668d4f');ellipse(c,-2,-2,22,16,level>=4?'#b2b282':'#8caf61');shape(c,[[-10,-5],[-4,-13],[7,-10],[12,-2],[5,8],[-7,7]],'#4e784c');line(c,[[-10,-5],[-22,-8]],'#3d6242',1.6);line(c,[[-4,-13],[-5,-18]],'#3d6242',1.6);line(c,[[7,-10],[16,-15]],'#3d6242',1.6);line(c,[[12,-2],[23,1]],'#3d6242',1.6);line(c,[[5,8],[9,15]],'#3d6242',1.6);line(c,[[-7,7],[-17,12]],'#3d6242',1.6);
  if(level>=4)for(const a of [-2.5,-1.3,-.2,.9,2]){const x=Math.cos(a)*23,y=Math.sin(a)*18;shape(c,[[x-4,y],[x,y-8],[x+4,y]],'#dad7b0');}
  if(loaded){ellipse(c,0,-3,11,9,'#354939');for(let i=0;i<Math.min(3,loaded);i++){const x=(i-1)*7;ellipse(c,x,-4,4,4,'#e3dfb4');ellipse(c,x-1,-4,1,1,ink,null);ellipse(c,x+1,-4,1,1,ink,null);}}
  c.restore();
 }
 function body(c,x,y,{time=0,withShell=true,angle=0,dir=1,bite=0,fire=false,level=0,raised=false}={}){c.save();c.translate(x,y);c.rotate(angle);c.scale(dir,1);const paddle=Math.sin(time*3)*2;
  shape(c,[[-20,-5],[-38,-9],[-29,0],[-20,3]],'#6d9f73');
  for(const side of [-1,1])for(const front of [-1,1]){c.save();c.translate(front*16,side*12);c.rotate(front*side*.5+paddle*.025);ellipse(c,0,raised&&front===1?-10:0,11,6,'#8db589');line(c,[[3,0],[7,0]],'#476e54',1);c.restore();}
  ellipse(c,0,-3,24,16,'#a3c59a');if(withShell)shell(c,-3,-9,0,level);else{ellipse(c,-1,-5,17,12,'#dfd39b');line(c,[[-11,-8],[9,-8]],'#b7a972',1);line(c,[[-12,-2],[11,-2]],'#b7a972',1);}
  const head=29+bite*10;ellipse(c,head,-10,13,10,'#92bc83');ellipse(c,head+2,-15,5,5,'#e9ebcf');ellipse(c,head+4,-15,2.2,3,ink,null);ellipse(c,head+4.5,-16,1,1,'#ffffff',null);ellipse(c,head+10,-11,1,1,ink,null);
  if(bite>.15){shape(c,[[head+1,-6],[head+14,-8],[head+10,3+bite*5],[head+1,0]],'#523d37');line(c,[[head+5,-5],[head+7,-1]],'#ece3bd',2);}else line(c,[[head+2,-5],[head+10,-4]],ink,1.5);
  if(fire){for(let i=0;i<3;i++){const q=Math.sin(time*12+i)*2;shape(c,[[head+6+i*4,-3],[head+9+i*4,-15-q-i*2],[head+13+i*4,-3]],i%2?'#ffd178':'#ed8b47');}}
  c.restore();
 }
 function hero(c,h,{time=0,active=false,selected=false,ghost=false,attack=0}={}){c.save();if(ghost)c.globalAlpha=.55;const recovering=(h.turtleRecoverUntil||0)>time,submerged=h.u[3]>0&&h.target==='submerged';ripple(c,h.x,h.y+8,time);if(selected){c.strokeStyle='#f0d98b';c.lineWidth=2;c.beginPath();c.ellipse(h.x,h.y+7,44,17,0,0,7);c.stroke();}
  if(!ghost&&(recovering||submerged)){ellipse(c,h.x,h.y+4,22,7,'#244f5940',null);for(let i=0;i<3;i++)ellipse(c,h.x-12+i*11,h.y-3-((time*12+i*7)%22),2,2,'#b9e4de',null);if(submerged&&active&&time-(h.turtleLastGold??-10)<.7){ellipse(c,h.x,h.y-30,6,7,'#e7c263','#745730');line(c,[[h.x,h.y-34],[h.x,h.y-26]],'#795d35',1.5);}c.restore();return;}
  const a=h.turtleAction,dir=h.face&&h.face.x<h.x?-1:1,common={time,dir,fire:h.u[0]>=3,level:h.u[2],bite:active?Math.max(0,1-(time-(h.turtleBiteAt??-10))/.22):0};
  if(a&&active){const age=time-a.start;if(a.kind==='slam'){shell(c,h.x,h.y-9,0,h.u[2]);let x=h.x,y=h.y,angle=0;if(age<.35){x+=dir*28*age/.35;}else if(age<1){const t=(age-.35)/.65;x+=dir*28+(a.to.x-h.x-dir*28)*t;y+=(a.to.y-h.y)*t-Math.sin(t*Math.PI)*105;}else{const t=Math.min(1,(age-1)/1.1);x=a.to.x+(h.x-a.to.x)*t;y=a.to.y+(h.y-a.to.y)*t;angle=t*Math.PI*4;}body(c,x,y-7,{...common,angle,withShell:false});}
   else{body(c,h.x-18*dir,h.y-4,{...common,withShell:false,raised:age<.8});if(age<.8){const f=Math.min(1,age/.55);shell(c,h.x+dir*12,h.y-12-f*36,Math.sin(f*Math.PI)*.3,h.u[2],a.loaded||0);}}
  }else body(c,h.x,h.y-4,common);c.restore();
 }
 function projectiles(c,game){for(const h of game.s.heroes){if(h.type!=='turtle')continue;const a=h.turtleAction,now=game.s.time;if(a?.kind==='shell'&&now-a.start>=.8){const t=Math.min(1,(now-a.start-.8)/1.6);shell(c,a.x,a.y-Math.sin(t*Math.PI)*20,(now-a.start)*12,h.u[2],a.loaded||0);}
  const b=h.turtleBurst;if(b&&now<b.end){const t=(now-b.start)/.7;c.save();c.globalAlpha=1-t;ellipse(c,b.x,b.y,b.radius*t,b.radius*t*.65,'#e1d5a66a',null);for(let i=0;i<b.shards;i++){const angle=i*Math.PI*2/b.shards,r=15+t*b.radius*1.5,x=b.x+Math.cos(angle)*r,y=b.y+Math.sin(angle)*r;c.save();c.translate(x,y);c.rotate(angle+t*8);shape(c,[[-5,-4],[7,-1],[1,7]],i%2?'#afbe88':'#53744a');c.restore();}c.restore();}
 }}
 return {hero,projectiles};
})();
