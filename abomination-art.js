/* Red hunched creature, long molten crest and yellow fissures from the supplied back view. */
window.AbominationArt=(()=>{
 const ink='#291d22';
 function shape(c,p,fill){c.beginPath();p.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.fillStyle=fill;c.fill();c.strokeStyle=ink;c.lineWidth=2.2;c.lineJoin='round';c.stroke();}
 function organic(c,p,fill){c.beginPath();const last=p.at(-1);c.moveTo((last[0]+p[0][0])/2,(last[1]+p[0][1])/2);p.forEach(([x,y],i)=>{const n=p[(i+1)%p.length];c.quadraticCurveTo(x,y,(x+n[0])/2,(y+n[1])/2);});c.closePath();c.fillStyle=fill;c.fill();c.strokeStyle='#59220d';c.lineWidth=2.3;c.lineJoin='round';c.stroke();}
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
 // A single moving fire volume: uneven edges and broad flowing currents, not flame badges.
 function fireMass(c,points,t,bright=false){c.save();const ys=points.map(p=>p[1]),xs=points.map(p=>p[0]),top=Math.min(...ys),bottom=Math.max(...ys),left=Math.min(...xs),right=Math.max(...xs),w=right-left,h=bottom-top;
  const edge=points.map(([x,y],i)=>[x+Math.sin(t*5+i*2.3)*1.8,y+Math.cos(t*6+i*1.7)*2]);const g=c.createLinearGradient(left,top,right,bottom);g.addColorStop(0,'#8e281c');g.addColorStop(.3,'#cf421c');g.addColorStop(.65,bright?'#ed862e':'#e66b23');g.addColorStop(1,'#a9311c');organic(c,edge,g);c.clip();
  for(let i=0;i<3;i++){const x=left+w*(.18+i*.28),sway=Math.sin(t*4+i*2)*w*.09;c.beginPath();c.moveTo(x,bottom+5);c.bezierCurveTo(x-w*.24,bottom-h*.24,x+w*.3+sway,top+h*.35,x+sway,top-7);c.bezierCurveTo(x+w*.6,top+h*.36,x-w*.03,bottom-h*.15,x+w*.22,bottom+5);c.closePath();c.fillStyle=i===1?'#f2a44299':'#ee772e88';c.fill();}c.restore();organic(c,edge,'#00000000');
 }
 function hero(c,h,{time=0,active=false,selected=false,ghost=false,facing=0}={}){c.save();const initialAlpha=c.globalAlpha;const at=point(h,time);c.translate(at.x,at.y);if(ghost)c.globalAlpha*=.55;c.fillStyle='#3c242538';c.beginPath();c.ellipse(0,8,28,9,0,0,7);c.fill();if(selected){c.strokeStyle='#f6c379';c.lineWidth=2;c.beginPath();c.ellipse(0,8,34,12,0,0,7);c.stroke();}
  if(h.target==='flame'&&h.flameSpot&&!h.flameTravel&&!(h.fireWhip&&time<h.fireWhip.end)){fireMass(c,[[-30,9],[-38,-15],[-20,-39],[-26,-72],[-7,-51],[5,-92],[20,-67],[15,-40],[32,-57],[36,-18],[25,10]],time,true);c.restore();return;}
  const dir=Math.cos(facing)<0?-1:1,back=Math.sin(facing)<-.55;c.scale(dir,1);const pulse=Math.sin(time*3)*1.2,bt=h.fireBoulder?Math.max(0,Math.min(1,(time-h.fireBoulder.start)/1.2)):0,raising=h.fireBoulder?(bt<.65?Math.sin(bt/.65*Math.PI/2):Math.max(0,1-Math.pow((bt-.65)/.35,2))):0;c.translate(0,pulse);
  function strike(side){if(!active||(h.fireWhip&&time<h.fireWhip.end))return 0;const event=(h.firePunches||[]).filter(p=>p.side===side).at(-1);if(!event)return 0;const t=(time-event.start)/.34;if(t<0||t>1)return 0;return t<.22?-.18*Math.sin(t/.22*Math.PI):Math.pow(Math.sin((t-.22)/.78*Math.PI),.7);}
  fireMass(c,[[-22,-19],[-6,-19],[-4,9],[-22,13],[-26,3]],time);
  fireMass(c,[[2,-19],[18,-21],[25,7],[17,14],[2,10]],time+1);
  // Swept crests belong to the torso outline and change shape as it burns.
  fireMass(c,[[-26,-16],[-32,-39],[-24,-62],[-30,-79],[-13,-65],[-6,-91],[7,-74],[11,-82],[25,-58],[32,-35],[22,-11],[-6,-8]],time);
  const whip=h.fireWhip&&time<h.fireWhip.end?Math.sin((time-h.fireWhip.start)/.45*Math.PI):0;
  const frontPunch=strike(1),backPunch=strike(-1),twist=(frontPunch-backPunch)*.085;c.rotate(twist);c.translate((frontPunch-backPunch)*4,-Math.sin(bt*Math.PI)*3);
  const left={x:-34-backPunch*14+raising*19,y:8-pulse-Math.abs(backPunch)*36-raising*75},right={x:34+frontPunch*29-raising*17+whip*13,y:8-pulse-Math.abs(frontPunch)*35-raising*75-whip*28};
  const gripping=h.u[2]&&!h.fireBoulder&&(!!whip||!h.firePunches?.some(p=>time-p.start<.34));if(gripping){const swing=whip*22;left.x=8+swing;left.y=-17-whip*32;right.x=28+swing;right.y=-27-whip*32;}
  function arm(side,hand){const sx=side*22,sy=-46,ex=side*(32-raising*12),ey=-17-raising*39;fireMass(c,[[sx-10,sy-8],[ex-11,ey-8],[hand.x-12,hand.y-13],[hand.x-14,hand.y+4],[hand.x+8,hand.y+7],[hand.x+15,hand.y-5],[hand.x+9,hand.y-18],[ex+10,ey+4],[sx+11,sy+7]],time+side,true);}


  if(h.fireBoulder){const gather=Math.min(1,bt/.65);for(let i=0;i<18;i++){const a=time*9+i*2.4,r=(1-gather)*35+8+(i%3)*4,x=8+Math.cos(a)*r,y=-45-gather*38+Math.sin(a)*r*.65;c.fillStyle=i%3?'#ffb23f':'#fff2ac';c.beginPath();c.arc(x,y,1.5+(i%2),0,7);c.fill();}c.strokeStyle='#ffb34999';c.lineWidth=1.5;for(let j=0;j<2;j++){c.beginPath();c.ellipse(10,-53-gather*24,31-j*7,10,Math.sin(time*4)*.4,0,Math.PI*1.6);c.stroke();}}

  // One continuous grip passes through both hands, behind their curled fingers.
  if(gripping){const handle=[[left.x-8,left.y-3],[right.x+10,right.y-12]];line(c,handle,'#ac3518',8);line(c,handle,'#ffaf3c',5);line(c,handle,'#fff1a0',1.5);}
  arm(-1,left);
  fireMass(c,[[-5,-43],[-3,-56],[8,-59],[24,-49],[27,-34],[19,-21],[3,-25]],time+.5,true);
  if(!back){line(c,[[2,-42],[9,-40]],'#ffcb69',2);line(c,[[15,-40],[21,-43]],'#ffcb69',2);}
  arm(1,right);

  if(gripping){const from={x:right.x+10,y:right.y-12};let pts;
   if(whip&&h.fireWhip.targets.length){const t=(time-h.fireWhip.start)/.45,targets=h.fireWhip.targets,progress=Math.max(0,Math.min(1,(t-.12)/.6)),index=progress*Math.max(0,targets.length-1),a=targets[Math.floor(index)],b=targets[Math.min(targets.length-1,Math.ceil(index))],blend=index%1;
    // One lash sweeps through the struck crowd instead of branching per enemy.
    const target={x:(a.x+(b.x-a.x)*blend-at.x)/dir,y:a.y+(b.y-a.y)*blend-at.y-pulse},reach=Math.min(1,Math.max(0,(t-.05)/.35)),tip={x:from.x+(target.x-from.x)*reach,y:from.y+(target.y-from.y)*reach};
    pts=curvePoints(from,{x:from.x+30,y:from.y-55*Math.sin(t*Math.PI)},{x:tip.x-20,y:tip.y-25*(1-t)},tip);
   }else pts=curvePoints(from,{x:76,y:-62},{x:85,y:7},{x:55,y:17});
   fireRope(c,pts,time,4);
  }
  for(let i=0;i<7;i++){const phase=(time*.6+i*.137)%1;c.globalAlpha=initialAlpha*(ghost?.55:1)*(1-phase);c.fillStyle=i%2?'#ffd672':'#f9792b';c.beginPath();c.ellipse(-26+i*9+Math.sin(time*2+i)*3,-35-phase*53,1.2,2.2,Math.sin(i),0,7);c.fill();}c.globalAlpha=initialAlpha*(ghost?.55:1);
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
