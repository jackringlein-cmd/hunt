/* Wooden Abomination: hunched fire-form proportions, rough bark and splinter spikes. */
window.WaterBeastArt=(()=>{
 const ink='#2d271e';
 function shape(c,p,color){c.beginPath();p.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.fillStyle=color;c.fill();c.strokeStyle=ink;c.lineWidth=2;c.lineJoin='round';c.stroke();}
 function cooled(c,points,bright=false){c.save();c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();const g=c.createLinearGradient(-30,-75,32,15);g.addColorStop(0,'#42281a');g.addColorStop(.45,bright?'#a77947':'#80552f');g.addColorStop(.75,'#704623');g.addColorStop(1,'#39251a');c.fillStyle=g;c.fill();c.strokeStyle='#332115';c.lineWidth=2;c.stroke();c.clip();for(let i=0;i<3;i++){c.beginPath();c.moveTo(-26+i*18,20);c.bezierCurveTo(-44+i*18,-5,-2+i*12,-30,-18+i*16,-86);c.strokeStyle=i===1?'#e0b37d80':'#321a1277';c.lineWidth=2-i*.35;c.stroke();}for(let i=0;i<4;i++){const x=-17+i*12,y=-50+i%2*22;c.beginPath();c.ellipse(x,y,2.5,5.5,-.2,0,7);c.strokeStyle='#3c241a88';c.lineWidth=1;c.stroke();}c.restore();}
 function spike(c,x,y,dx,dy,size=8){const len=Math.hypot(dx,dy)||1,nx=-dy/len*size*.4,ny=dx/len*size*.4;shape(c,[[x+nx,y+ny],[x+dx,y+dy],[x-nx,y-ny]],'#a47542');shape(c,[[x,y],[x+dx,y+dy],[x-nx,y-ny]],'#63401f');}
 function hero(c,h,{time=0,active=false,selected=false,ghost=false,facing=0}={}){
 const a=h.waterAction,age=a?time-a.start:0;let x=h.x,y=h.y,lift=0,submerged=false;
 if(a&&a.path===0){const f=Math.max(0,Math.min(1,age<.7?age/.7:2-age/.7));x+=(a.to.x-h.x)*f;y+=(a.to.y-h.y)*f;}
 if(a&&a.path===2){submerged=age<2;const q=(age-2)/.8,f=Math.max(0,Math.min(1,q<=1?q:2-q));x+=(a.to.x-h.x)*f;y+=(a.to.y-h.y)*f;if(age>=2)lift=Math.sin(Math.max(0,Math.min(1,q<=1?q:q-1))*Math.PI)*(q<=1?105:65);}
 c.save();c.translate(x,y);if(ghost)c.globalAlpha*=.55;
 c.fillStyle='#203b4438';c.beginPath();c.ellipse(0,7,36,10,0,0,7);c.fill();c.strokeStyle=selected?'#f1d594':'#9bdeea99';c.lineWidth=selected?2:1.5;
 for(let i=0;i<2;i++){c.beginPath();c.ellipse(0,7,32+i*8+Math.sin(time*3+i)*2,8+i*4,0,0,7);c.stroke();}
 if(submerged){for(let i=0;i<5;i++){c.beginPath();c.arc(Math.sin(i*2+time)*20,5-((time*12+i*7)%22),2+i%2,0,7);c.stroke();}c.restore();return;}
 c.translate(a?.path===1?Math.sin(time*65)*4:0,-lift+Math.sin(time*3)*1.1);c.scale(Math.cos(facing)<0?-1:1,1);
 const running=a?.path===0,step=running?Math.sin(age*32)*9:0,leaping=a?.path===2;
 // Match the fire form's hunched back, lowered face and long grounded arms.
 cooled(c,[[-19,-17],[-7,-16],[-4,7-step*.3],[-8,13-step*.3],[-23,13-step*.3],[-24,7]]);
 cooled(c,[[4,-18],[17,-18],[22,7+step*.3],[19,13+step*.3],[5,13+step*.3],[1,7]]);
 // Charred spines retain the water creature's jagged exterior.
 for(const points of [
 [[-30,-33],[-43,-47],[-29,-43]],[[-29,-48],[-37,-68],[-20,-57]],
 [[-20,-61],[-26,-83],[-10,-66]],[[-9,-68],[-6,-96],[4,-72]],
 [[6,-67],[15,-87],[20,-58]],[[21,-51],[35,-67],[30,-39]],[[27,-33],[41,-42],[29,-22]]
 ])shape(c,points,'#81552f');
 cooled(c,[[-27,-24],[-29,-45],[-21,-61],[-8,-70],[8,-68],[25,-57],[30,-36],[23,-17],[6,-9],[-13,-11]]);
 cooled(c,[[-23,-48],[-16,-59],[-4,-63],[12,-60],[22,-49],[15,-34],[-5,-31]],true);
 for(const [x,y,dx,dy]of [[-17,-51,-7,-17],[-5,-56,0,-16],[12,-51,8,-17],[-15,-30,-8,-13],[0,-25,3,-15],[19,-24,10,-13],[-12,-13,-5,-12],[8,-15,8,-17],[-24,-22,-15,-8],[22,-38,15,-9]])spike(c,x,y,dx,dy);
 for(const side of [-1,1]){const dy=side*step*.3;spike(c,side*19,5+dy,side*11,-8,7);spike(c,side*15,-3+dy,side*9,-16,8);spike(c,side*9,6+dy,-side*6,-11,6);spike(c,side*20,-12+dy,side*13,-13,8);}
 const liftArm=leaping?Math.max(0,Math.sin((age-2)/1.6*Math.PI))*32:0;
 function arm(side){const sx=side*22,ex=side*32,hy=8+side*step-liftArm,hx=side*(34+(running?5:0));for(let i=0;i<3;i++){const sy=-38+i*14,base=side*(31+i*2);shape(c,[[base,sy-7],[base+side*(15-i*2),sy-13],[base+side*3,sy+5]],'#916339');}const ey=-17-liftArm*.5;cooled(c,[[sx-9,-52],[sx+5,-57],[sx+13,-44],[ex+9,ey-10],[ex+13,ey-3],[ex+8,ey+8],[hx+11,hy-15],[hx+8,hy-4],[hx-9,hy-5],[ex-10,ey+8],[ex-14,ey-2],[ex-8,ey-12],[sx-12,-38]],true);
 cooled(c,[[hx-12,hy-11],[hx-7,hy-18],[hx+1,hy-16],[hx+7,hy-20],[hx+13,hy-11],[hx+11,hy-3],[hx+14,hy+3],[hx+5,hy+7],[hx-3,hy+4],[hx-12,hy+6],[hx-14,hy-2]],true);
 for(let i=0;i<3;i++)spike(c,hx-7+i*7,hy-8,(i-1)*5,-12-i%2*5,6);spike(c,ex,ey-3,side*18,-13,9);spike(c,sx,-45,side*15,-21,10);spike(c,ex-side*6,ey+2,-side*10,-12,7);spike(c,hx+side*10,hy-3,side*13,-8,6);}
 arm(-1);
 const biteAge=time-(h.waterBiteAt??-10),jaw=active&&biteAge>=0&&biteAge<.3?Math.sin(biteAge/.3*Math.PI)*9:0;
 arm(1);
 c.save();c.translate(jaw*.45,jaw*.12);
 // Pointed wooden ears and a canine muzzle echo the original creature.
 shape(c,[[-4,-46],[-12,-73],[5,-57]],'#896039');shape(c,[[13,-53],[27,-73],[27,-44]],'#9d7042');shape(c,[[-4,-55],[-8,-66],[0,-58]],'#48301e');shape(c,[[20,-56],[25,-65],[24,-53]],'#48301e');
 cooled(c,[[-3,-51],[9,-56],[23,-49],[27,-36],[22,-24],[4,-23],[-5,-34]],true);
 if(Math.sin(facing)>=-.55){cooled(c,[[2,-44],[11,-47],[22,-42],[22,-33],[15,-29],[3,-32]]);}
 c.strokeStyle=a?.path===3?'#daeaa0':'#a6c8ba';c.lineWidth=2;c.beginPath();c.moveTo(2,-42);c.lineTo(9,-40);c.moveTo(15,-40);c.lineTo(21,-43);c.stroke();
 for(const [x,y,dx,dy]of [[-1,-48,-9,-13],[9,-54,1,-15],[23,-46,10,-11]])spike(c,x,y,dx,dy,6);
 // A long snout, dark nose, lower jaw and two fangs give a clear dog profile.
 cooled(c,[[12,-39],[25,-39],[38,-35],[43,-30],[39,-25],[24,-23],[14,-27]],true);
 shape(c,[[35,-35],[43,-34],[45,-30],[40,-27],[35,-29]],'#2b211a');
 cooled(c,[[17,-26],[39,-27],[38,-19+jaw],[29,-16+jaw],[15,-21+jaw]],true);
 c.strokeStyle='#342419';c.lineWidth=2;c.beginPath();c.moveTo(18,-25);c.quadraticCurveTo(29,-21+jaw,40,-26);c.stroke();
 for(const x of [23,34])shape(c,[[x,-25],[x+3,-19+jaw*.35],[x+5,-26]],'#dac39a');
 spike(c,-3,-32,-13,-7,7);spike(c,8,-25,-8,-10,6);spike(c,20,-22,0,-10,5);
 c.strokeStyle='#c29b64';c.lineWidth=1.2;c.beginPath();c.moveTo(24,-34);c.lineTo(32,-32);c.stroke();c.restore();
 // Water beads descend; faint steam replaces the fire form's rising embers.
 c.save();const opacity=c.globalAlpha;for(let i=0;i<6;i++){const f=(time*.45+i*.17)%1;c.globalAlpha=opacity*(1-f)*.38;c.strokeStyle='#d0ded2';c.lineWidth=1.2;c.beginPath();const sx=-22+i*9;c.moveTo(sx,-56-f*23);c.bezierCurveTo(sx-5,-64-f*23,sx+6,-68-f*23,sx+2,-76-f*23);c.stroke();}c.globalAlpha=opacity*.65;c.fillStyle='#a0c9c5';for(let i=0;i<5;i++){const f=(time*.6+i*.21)%1;c.beginPath();c.ellipse(-30+i*15+Math.sin(i)*3,-30+f*42,1,2,0,0,7);c.fill();}c.restore();
 c.restore();
 if(a?.path===1){c.save();for(let i=0;i<24;i++){const angle=i*2.4,phase=(age*1.8+i*.17)%1,r=18+phase*100;c.globalAlpha=1-phase;c.fillStyle='#9cdff0';c.beginPath();c.ellipse(h.x+Math.cos(angle)*r,h.y+Math.sin(angle)*r*.5-18-20*Math.sin(phase*Math.PI),2,4,angle,0,7);c.fill();}c.restore();}
 if(a?.path===3){c.save();c.strokeStyle='#cedc8190';c.lineWidth=1.5;c.setLineDash([4,5]);c.beginPath();c.moveTo(h.x+23,h.y-49);c.lineTo(a.to.x,a.to.y-12);c.stroke();c.strokeStyle='#e6eca0';c.beginPath();c.arc(a.to.x,a.to.y,15+Math.sin(time*8)*3,0,7);c.stroke();c.restore();}
 }
 return{hero};
})();
