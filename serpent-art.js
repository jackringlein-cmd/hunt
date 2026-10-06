/* Canvas-native serpent animation matches the game's outlined, flat-color art. */
window.SerpentArt=(()=>{
 const ink='#253436';
 const pathColors=['#d8ad60','#50d5dc','#ece5bd','#869bff'];
 function plate(c,points,fill){c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.fillStyle=fill;c.fill();c.strokeStyle=ink;c.lineWidth=1.5;c.stroke();}
 function upgrades(c,u,time,head=false){
  // Each purchased tier adds a large, persistent feature; crosspaths combine.
  for(let p=0;p<4;p++){const n=u[p];if(!n)continue;const color=pathColors[p];
   if(!head){
    if(p===0){for(let i=0;i<n;i++){const x=27-i*10,y=24+Math.sin(i*.5)*5;plate(c,[[x-5,y-6],[x+4,y-8],[x+8,y+3],[x,y+7],[x-6,y+2]],i%2?'#a97b40':color);}if(n>=3)plate(c,[[-25,-12],[-35,-21],[-20,-28],[-9,-19],[-10,-5]],color);if(n>=5)plate(c,[[20,14],[30,-4],[34,15],[44,7],[40,26]],'#f3d991');}
    if(p===1){for(let i=0;i<n;i++){const x=30-i*11,y=25+Math.sin(i*.5)*4;plate(c,[[x-5,y],[x-11,y+10+n*2],[x+6,y+4]],i%2?'#2589b9':color);}if(n>=3){c.strokeStyle='#9effee';c.lineWidth=2;for(let i=0;i<n;i++){c.beginPath();c.arc(-14+i*8,5+i*3,3,0,7);c.stroke();}}}
    if(p===2){for(let i=0;i<n;i++){const x=-14+i*7,y=-9+i*5;plate(c,[[x,y],[x-20-i*2,y-19-Math.sin(time*2)*2],[x-12,y+7],[x+3,y+5]],i%2?'#b5d6db':color);}if(n>=4){c.strokeStyle='#edd699';c.lineWidth=3;c.beginPath();c.ellipse(5,25,35,8,0,0,7);c.stroke();}}
    if(p===3){for(let i=0;i<n;i++){const x=30-i*10,y=19+Math.sin(i*.5)*4;plate(c,[[x-5,y],[x-1,y-11-n*2],[x+5,y-3],[x+6,y+5]],i%2?'#badbff':color);}if(n>=3){c.strokeStyle='#e1faff';c.lineWidth=2;c.beginPath();c.moveTo(-12,-12);c.bezierCurveTo(-8,3,36,8,29,25);c.stroke();}}
   }else{
    if(p===0){plate(c,[[-13,-9],[-6,-17],[12,-12],[18,-5],[4,-9],[-10,-2]],color);if(n>=2)plate(c,[[9,8],[30,8],[27,15+n],[13,14+n]],'#c0904b');if(n>=4)for(const x of [-10,4])plate(c,[[x,-11],[x-8,-26-n*2],[x+7,-14]],'#fff0bd');}
    if(p===1){plate(c,[[-12,0],[-33-n*2,-15-n*2],[-29,4],[-33-n*2,15+n],[-9,9]],color);if(n>=2){c.strokeStyle='#b4ffeb';c.lineWidth=2;for(let i=0;i<n;i++){c.beginPath();c.moveTo(-12+i*5,4);c.lineTo(-10+i*5,9);c.stroke();}}if(n>=5){c.beginPath();c.moveTo(0,-10);c.quadraticCurveTo(13,-45,23,-29+Math.sin(time*3)*3);c.stroke();oval(c,23,-29+Math.sin(time*3)*3,4,4,'#dbfff3');}}
    if(p===2){for(let i=0;i<n;i++)plate(c,[[-12+i*5,-9],[-19+i*5,-27-n*2],[i*5,-13]],i%2?'#fff7d8':color);if(n>=3)oval(c,0,-12,4,5,'#72e4dc');if(n===6){c.strokeStyle='#fff1ad';c.lineWidth=2;c.beginPath();c.ellipse(0,-42,24,6,0,0,7);c.stroke();}}
    if(p===3){plate(c,[[10,-7],[20,-10],[29,-4],[26,2],[14,0]],color);if(n>=2)for(let i=0;i<n-1;i++)plate(c,[[-12+i*5,-10],[-15+i*5,-23-n*2],[i*5-4,-13]],'#acccff');if(n>=4){c.strokeStyle='#e9ffff';c.lineWidth=3;c.beginPath();c.arc(23,4,10,-1.2,1.2);c.stroke();}}
    if(n===6){c.save();c.globalAlpha=.65;c.strokeStyle=color;c.lineWidth=2;c.beginPath();c.arc(0,-2,35+Math.sin(time*2)*2,3.6,5.8);c.stroke();c.restore();}
   }
  }
 }
 function oval(c,x,y,rx,ry,fill){c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fillStyle=fill;c.fill();c.strokeStyle=ink;c.lineWidth=2;c.stroke();}
 function ripple(c,x,y,t,r=24){c.strokeStyle='#c3eff2';c.lineWidth=2;for(let i=0;i<3;i++){c.globalAlpha=.6-i*.15;c.beginPath();c.ellipse(x,y,r+i*7+Math.sin(t*3+i)*2,6+i*3,0,0,7);c.stroke();}c.globalAlpha=1;}
 // Shared flowing water: deep edges, translucent shallows and moving foam.
 function stream(c,points,width,time){if(points.length<2)return;c.save();c.lineCap='round';c.lineJoin='round';
  const trace=()=>{c.beginPath();points.forEach((p,i)=>i?c.lineTo(p.x,p.y):c.moveTo(p.x,p.y));};
  for(const [w,color] of [[width+5,'#22697c99'],[width,'#239cbdcc'],[width*.72,'#49cbd6bb'],[width*.32,'#a1eaf077']]){trace();c.lineWidth=w;c.strokeStyle=color;c.stroke();}
  trace();c.strokeStyle='#e0ffffbb';c.lineWidth=2;c.setLineDash([9,17,3,22]);c.lineDashOffset=-time*32;c.stroke();c.setLineDash([]);
  for(let i=1;i<points.length;i+=3){const p=points[i];c.beginPath();c.ellipse(p.x+Math.sin(time*2+i)*width*.24,p.y+Math.cos(time*2+i)*width*.14,3.5,1.5,0,0,7);c.fillStyle='#e1ffff99';c.fill();}c.restore();
 }
 function water(c,game){const t=game.s.time;c.save();for(const pool of game.map.water||[]){c.save();c.beginPath();pool.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.clip();
  const xs=pool.map(p=>p[0]),ys=pool.map(p=>p[1]),left=Math.min(...xs),right=Math.max(...xs),top=Math.min(...ys),bottom=Math.max(...ys);
  const shade=c.createLinearGradient(left,top,right,bottom);shade.addColorStop(0,game.s.mapId==='volcano'?'#195a7d':'#155b80');shade.addColorStop(.45,game.s.mapId==='volcano'?'#298fab':'#238fab');shade.addColorStop(.75,game.s.mapId==='volcano'?'#6acacb':'#48c4ca');shade.addColorStop(1,game.s.mapId==='volcano'?'#287e9b':'#23708d');c.fillStyle=shade;c.fillRect(left,top,right-left,bottom-top);
  for(let y=top-10;y<bottom+10;y+=14){c.beginPath();for(let x=left-10;x<right+10;x+=7){const yy=y+Math.sin(x*.035+t*1.5+y)*3; x===left-10?c.moveTo(x,yy):c.lineTo(x,yy);}c.strokeStyle='#b4f4f066';c.lineWidth=1.6;c.setLineDash([18,24,6,31]);c.lineDashOffset=-t*15-y;c.stroke();}c.restore();}c.restore();}
 function streams(c,game){
  for(const h of game.s.heroes){const s=h.serpentStream;if(!s?.visual||!game.s.active||game.s.time>=s.end||(h.stunnedUntil||0)>game.s.time)continue;
   const v=s.visual,age=game.s.time-s.start,source=h.u[1]?game.serpentLurkPoint(h):h;
   const a={x:source.x+18,y:source.y-30},b={x:v.tx,y:v.ty-12},pts=[];
   for(let i=0;i<=24;i++){const p=i/24;pts.push({x:a.x+(b.x-a.x)*p,y:a.y+(b.y-a.y)*p+Math.sin(p*24-age*18)*3});}
   c.save();stream(c,pts,v.width,age*2);
   for(let i=0;i<8;i++){const angle=i*2.4+age*7,r=12+Math.sin(age*12+i)*7;c.beginPath();c.ellipse(b.x+Math.cos(angle)*r,b.y+Math.sin(angle)*r*.65,2,4,angle,0,7);c.fillStyle='#bffaff';c.fill();}c.restore();
  }
 }
 function projectile(c,f){if(f.type!=='waterBeam'&&f.type!=='waterShot')return false;const t=1-f.life/f.max;const a={x:f.x,y:f.y-30},b={x:f.tx,y:f.ty-12};
  if(f.type==='waterBeam'){const pts=[];for(let i=0;i<=16;i++){const p=i/16;pts.push({x:a.x+(b.x-a.x)*p,y:a.y+(b.y-a.y)*p+Math.sin(p*24-t*18)*3});}stream(c,pts,f.radius||24,t*2);}
  else {const p=Math.min(1,t*1.6);const head={x:a.x+(b.x-a.x)*p,y:a.y+(b.y-a.y)*p};stream(c,[{x:head.x-(b.x-a.x)*.15,y:head.y-(b.y-a.y)*.15},head],10,t);}
  for(let i=0;i<9;i++){const ang=i*2.4+t*3,r=(8+t*20);c.beginPath();c.ellipse(b.x+Math.cos(ang)*r,b.y+Math.sin(ang)*r*.65,2,4,ang,0,7);c.fillStyle=i%2?'#bffaff':'#49bcd8';c.fill();}return true;
 }
 function hitTest(h,p){return h.type==='serpent'&&h.u[1]>0?Math.abs(p.x-h.x)<=26&&p.y>=h.y-48&&p.y<=h.y+14:Math.hypot(h.x-p.x,h.y-p.y)<50;}
 function totem(c,h,time,selected){c.save();c.translate(h.x,h.y);oval(c,0,8,24,8,'#163b5688');
  if(selected){c.strokeStyle='#ffe5a0';c.lineWidth=3;c.beginPath();c.ellipse(0,9,28,11,0,0,7);c.stroke();}
  const stone=(points,color)=>{c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.fillStyle=color;c.fill();c.strokeStyle=ink;c.lineWidth=2;c.stroke();};
  stone([[-21,6],[-18,-2],[18,-2],[22,7],[15,12],[-15,12]],'#387caa');
  stone([[-15,3],[-13,-34],[-7,-44],[10,-43],[16,-33],[14,3]],'#3c86bd');
  stone([[6,-42],[10,-43],[16,-33],[14,3],[6,4]],'#24537f');
  stone([[-13,-34],[-7,-44],[10,-43],[6,-35]],'#77bce0');
  c.strokeStyle='#a5f3fa';c.lineWidth=2.5;c.beginPath();c.moveTo(-5,-30);c.bezierCurveTo(10,-35,9,-20,-3,-21);c.bezierCurveTo(-13,-22,-11,-10,3,-12);c.lineTo(5,-7);c.stroke();
  c.strokeStyle='#1e5078';c.lineWidth=1;c.beginPath();c.moveTo(-13,-11);c.lineTo(-7,-15);c.lineTo(-10,-19);c.moveTo(13,-29);c.lineTo(9,-26);c.stroke();
  for(let p=0;p<4;p++)for(let i=0;i<h.u[p];i++){const x=-12+p*8,y=1-i*6;plate(c,[[x-2,y],[x,y-3],[x+2,y],[x,y+3]],pathColors[p]);}
  const level=h.u[1];if(level>=2)for(const side of [-1,1])plate(c,[[side*14,-6],[side*(18+level),-18-level*3],[side*21,4]],'#53b9d5');if(level>=4)plate(c,[[-12,-42],[0,-46-level*2],[12,-42],[0,-35]],'#a0f3f7');
  c.fillStyle='#befaff';c.globalAlpha=.6+Math.sin(time*2)*.2;c.beginPath();c.arc(-3,-29,2,0,7);c.fill();c.restore();}
 function hero(c,h,{time=0,active=false,ghost=false,selected=false,attack=0,facing=0}={}){
  if(h.u?.[1]>0&&!ghost)totem(c,h,time,selected);
  c.save();const dive=active?h.serpentDive:null,progress=dive?Math.min(1,(time-dive.start)/2):0;
  const lurking=h.u?.[1]>0&&h.serpentLurk&&!ghost;let x=lurking?h.serpentLurk.x:h.x,y=lurking?h.serpentLurk.y:h.y;if(dive){x=dive.x;y=dive.y;}
  c.translate(x,y);if(ghost)c.globalAlpha=.55;ripple(c,0,8,time);if(selected){c.strokeStyle='#efdba0';c.beginPath();c.ellipse(0,9,32,12,0,0,7);c.stroke();}
  const surfaced=!active||(dive?progress<.22:(h.serpentSurfaceUntil||0)>time||(h.serpentAction?.end||0)>time);
  if(lurking&&!surfaced){c.fillStyle='#16445455';c.beginPath();c.ellipse(0,5,20,5,0,0,7);c.fill();c.restore();return;}
  if(dive){const height=Math.max(.05,1-progress/.22);c.globalAlpha=.5+.5*height;c.scale(1,height);}
  const u=h.u||[0,0,0,0],tier=Math.max(...u),dir=Math.cos(facing)<-.1?-1:1;c.scale(dir,1);
  const sway=Math.sin(time*2.5)*3,reach=attack*8,throwing=h.serpentAction&&time<h.serpentAction.end;
  const lift=throwing?Math.sin((time-h.serpentAction.start)/.9*Math.PI)*22:0;
  // A broad trunk flows into a tapering, swaying tail instead of a round coil.
  const tailWave=Math.sin(time*2.1)*4,bodyColor=['#4faaa9','#48a4b0','#4098ad','#337f9e','#2d7495','#28658c','#20597f'][u[1]];
  c.lineCap='round';c.lineJoin='round';c.beginPath();
  c.moveTo(8+sway,-44-lift);
  c.bezierCurveTo(-14,-44-lift,-30,-19,-17,-1);
  c.bezierCurveTo(-3,17,20,5,25,15);
  c.bezierCurveTo(31,30,-19,28,-56,10+tailWave);
  c.bezierCurveTo(-40,30+tailWave,12,45,36,29);
  c.bezierCurveTo(58,10,19,-10,3,-12);
  c.bezierCurveTo(-5,-15,4,-25-lift,16+sway,-28-lift);
  c.closePath();c.fillStyle=bodyColor;c.fill();c.strokeStyle=ink;c.lineWidth=2.5+u[0]*.18;c.stroke();
  c.beginPath();c.moveTo(-10,-15);c.bezierCurveTo(-12,4,23,0,31,17);c.bezierCurveTo(35,29,-6,34,-45,17+tailWave);
  c.strokeStyle='#a4d7bd';c.lineWidth=4;c.stroke();
  for(let i=0;i<3+tier;i++){const px=-16+i*4,py=-13-i*3;c.beginPath();c.moveTo(px,py);c.lineTo(px-8-u[3],py-11);c.lineTo(px+6,py-4);c.closePath();c.fillStyle=u[3]>=3?'#a4c9f3':'#81cecf';c.fill();c.strokeStyle=ink;c.lineWidth=1.5;c.stroke();}
  // Scales get smaller as the tail narrows toward its pointed end.
  c.strokeStyle='#174f62';c.lineWidth=1;
  for(let i=0;i<10;i++){const p=i/9,px=30-p*72,py=24+Math.sin(p*Math.PI)*8-p*8+tailWave*p*.4;c.beginPath();c.arc(px,py,3-p*2,.15,2.7);c.stroke();}
  for(let i=0;i<5;i++){c.beginPath();c.moveTo(-17,-9-i*4);c.quadraticCurveTo(-12,-6-i*4,-7,-10-i*4);c.strokeStyle='#b5e2ca';c.lineWidth=2;c.stroke();}
  upgrades(c,u,time);
  c.translate(9+sway+reach,-37-lift);
  // Swept horns and a ribbed cheek fin give the head a sea-dragon silhouette.
  for(const offset of [-7,7]){c.beginPath();c.moveTo(offset,-7);c.quadraticCurveTo(offset-15,-22,offset-8,-32-tier);c.quadraticCurveTo(offset-3,-18,offset+7,-9);c.fillStyle='#e1d8af';c.fill();c.strokeStyle=ink;c.lineWidth=2;c.stroke();}
  c.beginPath();c.moveTo(-10,-5);c.lineTo(-29,-15);c.quadraticCurveTo(-21,-1,-29,12);c.lineTo(-10,9);c.closePath();c.fillStyle='#419ab6';c.fill();c.stroke();for(let i=0;i<3;i++){c.beginPath();c.moveTo(-10,1);c.lineTo(-25,-9+i*8);c.lineWidth=1;c.stroke();}
  oval(c,0,0,17,12,'#68bcb8');oval(c,17,5,17,8,'#9cd6c4');
  c.beginPath();c.moveTo(-10,-4);c.quadraticCurveTo(0,-11,12,-8);c.strokeStyle='#24677b';c.lineWidth=3;c.stroke();
  for(let i=0;i<4;i++){c.beginPath();c.arc(-8+i*4,5+(i%2)*2,2.5,0,Math.PI);c.lineWidth=1;c.stroke();}
  oval(c,28,2,1.6,1,'#25454b');
  c.beginPath();c.moveTo(10,10);c.quadraticCurveTo(23,15,31,8);c.strokeStyle=ink;c.lineWidth=2;c.stroke();
  for(let i=0;i<3;i++){c.beginPath();c.moveTo(14+i*5,11);c.lineTo(16+i*5,16+attack*3);c.lineTo(18+i*5,11);c.fillStyle='#fff1d2';c.fill();c.stroke();}
  c.beginPath();c.moveTo(4,10);c.quadraticCurveTo(-1,22,10+Math.sin(time*3)*3,24);c.strokeStyle='#b9e6d9';c.lineWidth=2;c.stroke();
  c.beginPath();c.moveTo(-11,-6);c.lineTo(-19,-22-u[0]);c.lineTo(-2,-10);c.fillStyle='#99d7e2';c.fill();c.stroke();
  oval(c,5,-4,5,5,'#eee8c6');oval(c,7,-4,1.6,3,'#202b2d');c.beginPath();c.moveTo(12,8);c.lineTo(25,8);c.stroke();
  if(u[0]){c.fillStyle='#eee4b7';for(let i=0;i<Math.min(u[0]+1,4);i++){c.beginPath();c.moveTo(10+i*4,9);c.lineTo(12+i*4,15);c.lineTo(14+i*4,9);c.fill();}}
  if(u[2]){c.fillStyle='#e9d9a2';c.beginPath();c.moveTo(-10,-13);c.lineTo(-8,-23);c.lineTo(-2,-18);c.lineTo(4,-24-u[2]);c.lineTo(9,-12);c.fill();c.stroke();}
  if(u[3]){c.strokeStyle='#d6f9fc';c.lineWidth=2;for(let i=0;i<u[3];i++){c.beginPath();c.arc(14,5,10+i*2,-.5,.5);c.stroke();}}
  upgrades(c,u,time,true);
  c.restore();
 }
 function submerged(c,e,time){c.save();ripple(c,e.x,e.y,time,20);c.fillStyle='#254f6866';c.beginPath();c.ellipse(e.x,e.y,15,8,0,0,7);c.fill();c.restore();}
 function field(c,game){water(c,game);for(const h of game.s.heroes){const sections=game.floodSections(h);c.save();c.beginPath();c.arc(h.x,h.y,game.range(h),0,Math.PI*2);c.clip();for(const pts of sections){const near=pts.reduce((a,b)=>Math.hypot(a.x-h.x,a.y-h.y)<Math.hypot(b.x-h.x,b.y-h.y)?a:b);const bridge=[];for(let i=0;i<=12;i++){const p=i/12;bridge.push({x:h.x+(near.x-h.x)*p+Math.sin(p*Math.PI)*10,y:h.y+(near.y-h.y)*p});}stream(c,bridge,22,game.s.time);stream(c,pts,43,game.s.time);}c.restore();}}
 function goose(c,x,y,t){c.save();c.translate(x,y+Math.sin(t*2));oval(c,0,0,12,7,'#ede7d0');c.beginPath();c.moveTo(7,-2);c.quadraticCurveTo(14,-9,11,-17);c.strokeStyle=ink;c.lineWidth=8;c.stroke();c.strokeStyle='#ede7d0';c.lineWidth=5;c.stroke();oval(c,11,-18,5,4,'#ede7d0');c.fillStyle='#d2a65b';c.beginPath();c.moveTo(15,-20);c.lineTo(23,-17);c.lineTo(15,-16);c.fill();oval(c,12,-19,1,1,ink);c.restore();}
 function geese(c,game){for(const g of game.s.geese||[])goose(c,g.x,g.y,game.s.time);for(const h of game.s.heroes)if((h.gooseBurstUntil||0)>game.s.time)for(let i=0;i<6;i++){const a=i*Math.PI/3;goose(c,h.x+Math.cos(a)*55,h.y+Math.sin(a)*35,game.s.time);}}
 return {hero,submerged,field,geese,streams,projectile,hitTest};
})();
