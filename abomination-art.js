/* Red hunched creature, long molten crest and yellow fissures from the supplied back view. */
window.AbominationArt=(()=>{
 const ink='#291d22';
 function shape(c,p,fill){c.beginPath();p.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.fillStyle=fill;c.fill();c.strokeStyle=ink;c.lineWidth=2.2;c.lineJoin='round';c.stroke();}
 function organic(c,p,fill){c.beginPath();const last=p.at(-1);c.moveTo((last[0]+p[0][0])/2,(last[1]+p[0][1])/2);p.forEach(([x,y],i)=>{const n=p[(i+1)%p.length];c.quadraticCurveTo(x,y,(x+n[0])/2,(y+n[1])/2);});c.closePath();c.fillStyle=fill;c.fill();c.strokeStyle=ink;c.lineWidth=2.2;c.stroke();}
 function line(c,p,color,w=2){c.beginPath();p.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.strokeStyle=color;c.lineWidth=w;c.lineCap='round';c.lineJoin='round';c.stroke();}
 function fissure(c,p){line(c,p,'#ff721b',5);line(c,p,'#ffd64a',2.7);line(c,p,'#fff6ad',.9);}
 function flame(c,x,y,size,t,color='#ee5127',outlined=true){c.save();c.translate(x,y);const sway=Math.sin(t*7)*size*.1;c.beginPath();c.moveTo(-size*.4,0);c.bezierCurveTo(-size*.7,-size*.4,-size*.1,-size*.7,-size*.15+sway,-size*1.5);c.bezierCurveTo(size*.45,-size*.95,size*.1,-size*.7,size*.45,-size*.95);c.bezierCurveTo(size*.6,-size*.4,size*.5,-size*.1,size*.3,0);c.closePath();c.fillStyle=color;c.fill();if(outlined){c.strokeStyle=ink;c.lineWidth=2;c.stroke();}c.beginPath();c.moveTo(-size*.2,0);c.quadraticCurveTo(-size*.32,-size*.35,size*.02+sway*.5,-size*.92);c.quadraticCurveTo(size*.4,-size*.2,size*.18,0);c.fillStyle='#ffce48';c.fill();c.beginPath();c.moveTo(-size*.08,0);c.quadraticCurveTo(-size*.15,-size*.18,size*.03,-size*.42);c.quadraticCurveTo(size*.19,-size*.1,size*.1,0);c.fillStyle='#fff3b6';c.fill();c.restore();}
 // Pure fire: flickering edges, white-hot cores, and loose embers, with no stone surface.
 function boulder(c,x,y,r,t){c.save();c.translate(x,y);const glow=c.createRadialGradient(0,0,r*.2,0,0,r*1.9);glow.addColorStop(0,'#ffdc6cbb');glow.addColorStop(.5,'#ff801c66');glow.addColorStop(1,'#ff4b0000');c.fillStyle=glow;c.fillRect(-r*2,-r*2,r*4,r*4);
  for(const [k,color]of [[1,'#f34a16'],[.8,'#ff9420'],[.57,'#ffe06a'],[.3,'#fff6cb']]){c.beginPath();for(let i=0;i<=48;i++){const a=i/48*Math.PI*2,rr=r*k*(1+.1*Math.sin(a*7+t*12)+.06*Math.cos(a*11-t*9));const px=Math.cos(a)*rr,py=Math.sin(a)*rr;i?c.lineTo(px,py):c.moveTo(px,py);}c.closePath();c.fillStyle=color;c.fill();}
  for(let i=0;i<9;i++){const a=i*Math.PI*2/9+t*.7;c.save();c.translate(Math.cos(a)*r*.72,Math.sin(a)*r*.72);c.rotate(a+Math.PI/2);flame(c,0,0,r*(.35+.12*Math.sin(t*9+i)),t+i,'#ff6a1c',false);c.restore();}
  for(let i=0;i<6;i++){const a=i*2.4+t*2,rr=r*(1.2+(t*1.7+i*.17)%1);c.fillStyle=i%2?'#ffbc40':'#fff0a8';c.beginPath();c.arc(Math.cos(a)*rr,Math.sin(a)*rr,Math.max(.7,r*.05),0,7);c.fill();}c.restore();}
 function fireRope(c,pts,t,width=7){c.save();c.shadowColor='#ff7b19';c.shadowBlur=12;for(const [color,w]of [['#f04d18',width+4],['#ff9e25',width],['#ffe477',width*.5],['#fff5c5',width*.18]])line(c,pts,color,w);c.shadowBlur=0;for(let i=1;i<pts.length;i+=2){const [x,y]=pts[i];flame(c,x,y,4+width*.5+Math.sin(t*11+i)*2,t+i,'#ff7d20',false);}c.restore();}
 function curvePoints(a,b,d,e){const pts=[];for(let i=0;i<=24;i++){const t=i/24,u=1-t;pts.push([u*u*u*a.x+3*u*u*t*b.x+3*u*t*t*d.x+t*t*t*e.x,u*u*u*a.y+3*u*u*t*b.y+3*u*t*t*d.y+t*t*t*e.y]);}return pts;}
 function point(h,time){const a=h.flameTravel;if(a){const f=Math.max(0,Math.min(1,(time-a.start)/(a.end-a.start)));return{x:a.from.x+(a.to.x-a.from.x)*f,y:a.from.y+(a.to.y-a.from.y)*f};}return h.target==='flame'&&h.flameSpot?h.flameSpot:h;}
 function whipPose(t){const keys=[[0,0,0,0],[.25,-25,-24,-.23],[.48,32,-29,.2],[.68,40,6,.27],[1,0,0,0]];let i=0;while(i<keys.length-2&&t>keys[i+1][0])i++;const a=keys[i],b=keys[i+1],q=Math.max(0,Math.min(1,(t-a[0])/(b[0]-a[0]))),f=q*q*(3-2*q);return{x:a[1]+(b[1]-a[1])*f,y:a[2]+(b[2]-a[2])*f,lean:a[3]+(b[3]-a[3])*f};}
 function hero(c,h,{time=0,active=false,selected=false,ghost=false,facing=0}={}){c.save();const initialAlpha=c.globalAlpha;const at=point(h,time);c.translate(at.x,at.y);if(ghost)c.globalAlpha*=.55;c.fillStyle='#3c242538';c.beginPath();c.ellipse(0,8,28,9,0,0,7);c.fill();if(selected){c.strokeStyle='#f6c379';c.lineWidth=2;c.beginPath();c.ellipse(0,8,34,12,0,0,7);c.stroke();}
  if(h.target==='flame'&&h.flameSpot&&!h.flameTravel&&!(h.fireWhip&&time<h.fireWhip.end)){const n=h.u[1],size=46+n*4;const glow=c.createRadialGradient(0,-30,4,0,-30,85);glow.addColorStop(0,'#ffb54466');glow.addColorStop(1,'#ff9c0000');c.fillStyle=glow;c.fillRect(-85,-115,170,170);flame(c,0,8,size,time);flame(c,-20,9,25,time+1);flame(c,20,9,27,time+2);c.restore();return;}
  const dir=Math.cos(facing)<0?-1:1,back=Math.sin(facing)<-.55;c.scale(dir,1);const pulse=Math.sin(time*3)*1.2,bt=h.fireBoulder?Math.max(0,Math.min(1,(time-h.fireBoulder.start)/1.2)):0,raising=h.fireBoulder?(bt<.65?Math.sin(bt/.65*Math.PI/2):Math.max(0,1-Math.pow((bt-.65)/.35,2))):0;const whipTime=h.fireWhip&&time<h.fireWhip.end?Math.max(0,(time-h.fireWhip.start)/(h.fireWhip.end-h.fireWhip.start)):-1,pose=whipTime>=0?whipPose(whipTime):{x:0,y:0,lean:0};c.translate(pose.x*.14,pulse+Math.abs(pose.lean)*7);c.rotate(pose.lean);
  function strike(side){if(!active||(h.fireWhip&&time<h.fireWhip.end))return 0;const event=(h.firePunches||[]).filter(p=>p.side===side).at(-1);if(!event)return 0;const t=(time-event.start)/.34;if(t<0||t>1)return 0;return t<.22?-.18*Math.sin(t/.22*Math.PI):Math.pow(Math.sin((t-.22)/.78*Math.PI),.7);}
  const aura=c.createRadialGradient(0,-30,8,0,-30,65);aura.addColorStop(0,'#ffad2930');aura.addColorStop(1,'#ffad2900');c.fillStyle=aura;c.fillRect(-65,-95,130,130);
  for(let i=0;i<9;i++)flame(c,-24+i*6,-35-Math.sin(i/8*Math.PI)*21,9+(i%3)*3,time+i*.7,i%2?'#ec4d22':'#bf3024');
  // A broad slouched ape: shoulders above its head and both knuckles on the ground.
  organic(c,[[-19,-17],[-7,-16],[-4,7],[-8,13],[-23,13],[-24,7]],'#852124');organic(c,[[4,-18],[17,-18],[22,7],[19,13],[5,13],[1,7]],'#a82c24');
  organic(c,[[-27,-24],[-29,-45],[-21,-61],[-8,-70],[8,-68],[25,-57],[30,-36],[23,-17],[6,-9],[-13,-11]],'#aa2925');
  organic(c,[[-23,-48],[-16,-59],[-4,-63],[12,-60],[22,-49],[15,-34],[-5,-31]],'#bf3528');
  const whip=h.fireWhip&&time<h.fireWhip.end?Math.sin((time-h.fireWhip.start)/.45*Math.PI):0;
  const frontPunch=strike(1),backPunch=strike(-1),twist=(frontPunch-backPunch)*.085;c.rotate(twist);c.translate((frontPunch-backPunch)*4,-Math.sin(bt*Math.PI)*3);
  const left={x:-34-backPunch*14+raising*19,y:8-pulse-Math.abs(backPunch)*36-raising*75},right={x:34+frontPunch*29-raising*17+whip*13,y:8-pulse-Math.abs(frontPunch)*35-raising*75-whip*28};
  const gripping=h.u[2]&&!h.fireBoulder&&(whipTime>=0||!h.firePunches?.some(p=>time-p.start<.34));if(gripping){left.x=8+pose.x;left.y=-17+pose.y;right.x=28+pose.x;right.y=-27+pose.y-12*Math.sin(Math.max(0,whipTime)*Math.PI);}
  function arm(side,hand){const shoulder={x:side*22,y:-46},elbow={x:side*(32-raising*12)+pose.x*.45,y:-17-raising*39+pose.y*.65};line(c,[[shoulder.x,shoulder.y],[elbow.x,elbow.y],[hand.x,hand.y-8]],ink,23);line(c,[[shoulder.x,shoulder.y],[elbow.x,elbow.y],[hand.x,hand.y-8]],side<0?'#8d2325':'#b63227',18);organic(c,[[hand.x-11,hand.y-13],[hand.x-5,hand.y-18],[hand.x+9,hand.y-15],[hand.x+13,hand.y-6],[hand.x+10,hand.y+5],[hand.x-11,hand.y+5]],side<0?'#962726':'#c0392b');for(let i=0;i<3;i++)line(c,[[hand.x-6+i*6,hand.y-2],[hand.x-6+i*6,hand.y+4]],'#54242a',1.5);fissure(c,[[shoulder.x,shoulder.y+4],[elbow.x-2,elbow.y-3],[hand.x-4,hand.y-8],[hand.x+4,hand.y-5]]);}
  if(h.fireBoulder){const gather=Math.min(1,bt/.65);for(let i=0;i<18;i++){const a=time*9+i*2.4,r=(1-gather)*35+8+(i%3)*4,x=8+Math.cos(a)*r,y=-45-gather*38+Math.sin(a)*r*.65;c.fillStyle=i%3?'#ffb23f':'#fff2ac';c.beginPath();c.arc(x,y,1.5+(i%2),0,7);c.fill();}c.strokeStyle='#ffb34999';c.lineWidth=1.5;for(let j=0;j<2;j++){c.beginPath();c.ellipse(10,-53-gather*24,31-j*7,10,Math.sin(time*4)*.4,0,Math.PI*1.6);c.stroke();}}
  for(let i=0;i<6;i++)flame(c,-19+i*7,-21-(i%2)*7,9+(i%3)*2,time+i,'#e95324');
  // One continuous grip passes through both hands, behind their curled fingers.
  if(gripping){const handle=[[left.x-8,left.y-3],[right.x+10,right.y-12]];line(c,handle,'#ac3518',8);line(c,handle,'#ffaf3c',5);line(c,handle,'#fff1a0',1.5);}
  arm(-1,left);
  // The lowered head has a heavy brow, short muzzle and glowing eyes, not a long snout.
  organic(c,[[-3,-51],[9,-56],[23,-49],[27,-36],[22,-24],[4,-23],[-5,-34]],'#9b2525');
  if(!back){organic(c,[[2,-44],[11,-47],[22,-42],[22,-33],[15,-29],[3,-32]],'#4a2528');line(c,[[2,-42],[9,-40]],'#efb34f',3);line(c,[[14,-41],[21,-43]],'#efb34f',3);line(c,[[3,-39],[8,-38]],'#fff3ad',1.6);line(c,[[15,-38],[20,-39]],'#fff3ad',1.6);organic(c,[[7,-33],[20,-33],[25,-27],[21,-20],[5,-21],[2,-27]],'#ba5b3e');line(c,[[7,-25],[20,-25]],'#54282a',2);line(c,[[11,-30],[15,-30]],'#462429',3);}
  arm(1,right);
  for(const hand of [left,right]){flame(c,hand.x-7,hand.y-4,7,time+hand.x);flame(c,hand.x+6,hand.y-6,8,time-hand.x);}
  if(gripping){const from={x:right.x+10,y:right.y-12};let pts;
   if(whipTime>=0&&h.fireWhip.targets.length){const t=whipTime,targets=h.fireWhip.targets,progress=Math.max(0,Math.min(1,(t-.26)/.4)),index=progress*Math.max(0,targets.length-1),a=targets[Math.floor(index)],b=targets[Math.min(targets.length-1,Math.ceil(index))],blend=index%1;
    const wx=(a.x+(b.x-a.x)*blend-at.x)/dir-pose.x*.14,wy=a.y+(b.y-a.y)*blend-at.y-pulse-Math.abs(pose.lean)*7,co=Math.cos(pose.lean),si=Math.sin(pose.lean),target={x:wx*co+wy*si,y:-wx*si+wy*co};
    if(t<.26){const wind=t/.26;pts=curvePoints(from,{x:from.x-15-wind*60,y:from.y-65},{x:from.x-95-wind*25,y:from.y-85+wind*30},{x:from.x-45-wind*35,y:from.y+15});}
    else if(t<.68){const snap=Math.min(1,(t-.26)/.2),reach=1-(1-snap)**3,dx=target.x-from.x,dy=target.y-from.y,tip={x:from.x+dx*reach,y:from.y+dy*reach};pts=curvePoints(from,{x:from.x+dx*.25,y:from.y-65*(1-snap)},{x:from.x+dx*.75,y:from.y+dy*.7-35*Math.sin(progress*Math.PI)},tip);}
    else{const settle=(t-.68)/.32,tip={x:target.x+(55-target.x)*settle,y:target.y+(17-target.y)*settle};pts=curvePoints(from,{x:from.x+75,y:from.y+25*Math.sin(settle*Math.PI)},{x:tip.x+30*(1-settle),y:tip.y-55*Math.sin(settle*Math.PI)},tip);}
    // Brief motion streaks follow the fast crack, fading before the whip settles.
    if(t>.3&&t<.6){c.save();c.globalAlpha*=.2;for(const offset of [7,14])line(c,pts.map(([x,y],i)=>[x,y-offset*Math.sin(i/24*Math.PI)]),'#f5a343',2);c.restore();}
   }else pts=curvePoints(from,{x:76,y:-62},{x:85,y:7},{x:55,y:17});
   fireRope(c,pts,time,4);
  }

  for(let i=0;i<7;i++){const phase=(time*.6+i*.137)%1;c.globalAlpha=initialAlpha*(ghost?.55:1)*(1-phase);c.fillStyle=i%2?'#ffd672':'#f9792b';c.beginPath();c.ellipse(-26+i*9+Math.sin(time*2+i)*3,-35-phase*53,1.2,2.2,Math.sin(i),0,7);c.fill();}c.globalAlpha=initialAlpha*(ghost?.55:1);
  fissure(c,[[-21,-54],[-9,-62],[3,-61],[10,-54]]);fissure(c,[[-16,-37],[-11,-23],[-13,-6],[-14,8]]);fissure(c,[[18,-21],[11,-8],[13,8]]);
  // Molten cracks and short flames keep the reference's red-and-gold character.
  flame(c,-14,-54,10,time+1);flame(c,5,-60,13,time+2);flame(c,right.x+1,right.y-5,5+frontPunch*14,time);flame(c,left.x,left.y-5,5+backPunch*14,time+2);
  if(h.fireBoulder&&bt<.65){const size=4+26*Math.pow(Math.min(1,bt/.5),.7);boulder(c,12,-48-39*raising,size,time*2);flame(c,10,-45-39*raising,size*.6,time*2,'#ff7020',false);}
  c.restore();
 }
 function effects(c,game){for(const h of game.s.heroes){if(h.type!=='abomination')continue;const now=game.s.time;
  for(const p of h.firePunches||[]){const t=(now-p.start)/.34;if(t<0||t>1)continue;const side=p.side,from={x:h.x+side*30,y:h.y-5};c.save();c.globalAlpha=(1-t)*.65;c.beginPath();c.moveTo(from.x,from.y);c.quadraticCurveTo(h.x+side*58,h.y-55,p.x,p.y);c.strokeStyle='#ffb442';c.lineWidth=5*(1-t)+1;c.stroke();if(t>.22)for(let i=0;i<7;i++){const a=i*2.4+p.start,r=5+t*23;c.fillStyle=i%2?'#ff9a38':'#ffe69d';c.beginPath();c.arc(p.x+Math.cos(a)*r,p.y+Math.sin(a)*r,2*(1-t)+.7,0,7);c.fill();}c.restore();}
  const w=h.fireWhip;if(w&&now<w.end){const t=(now-w.start)/.45;if(t>.55){c.save();c.globalAlpha=1-t;for(const to of w.targets)for(let i=0;i<4;i++){const a=i*Math.PI/2,r=(t-.55)*45;line(c,[[to.x+Math.cos(a)*r,to.y+Math.sin(a)*r],[to.x+Math.cos(a)*(r+5),to.y+Math.sin(a)*(r+5)]],'#ffdd77',1.5);}c.restore();}}
  const b=h.fireBoulder;if(b){const t=(now-b.start)/1.2;if(t>=.65){const f=Math.min(1,Math.pow((t-.65)/.35,2)),x=h.x+12+(b.to.x-h.x-12)*f,y=h.y-88+(b.to.y-h.y+88)*f;for(let i=3;i>=1;i--){c.save();c.globalAlpha=.1;const trail=Math.max(0,f-i*.09);boulder(c,h.x+12+(b.to.x-h.x-12)*trail,h.y-88+(b.to.y-h.y+88)*trail,30,now);c.restore();}boulder(c,x,y,30,now*3);flame(c,x,y-12,19,now,'#ff7020',false);}}
  const sh=h.fireShatter;if(sh&&now<sh.end){const t=(now-sh.start)/.75;c.save();c.globalAlpha=1-t;for(let j=0;j<2;j++){c.beginPath();c.ellipse(sh.x,sh.y,(12+t*sh.radius)*(1+j*.25),(8+t*sh.radius*.5)*(1+j*.25),0,0,7);c.strokeStyle=j?'#ff922e':'#ffe6a0';c.lineWidth=4*(1-t)+1;c.stroke();}for(let i=0;i<12;i++){const a=i*Math.PI/6,r=10+t*sh.radius*1.5;boulder(c,sh.x+Math.cos(a)*r,sh.y+Math.sin(a)*r-Math.sin(t*Math.PI)*40,7*(1-t*.5),now*7+i);if(i%2===0)flame(c,sh.x+Math.cos(a)*r,sh.y+Math.sin(a)*r,10*(1-t),now+i,'#ff7020',false);}c.restore();}
 }}
 return {hero,effects};
})();
