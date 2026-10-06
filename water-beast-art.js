/* Extinguished Abomination: the fire ape silhouette, cooled and waterlogged. */
window.WaterBeastArt=(()=>{
 const ink='#2d271e';
 function shape(c,p,color){c.beginPath();p.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.fillStyle=color;c.fill();c.strokeStyle=ink;c.lineWidth=2;c.lineJoin='round';c.stroke();}
 function cooled(c,points,bright=false){c.save();c.beginPath();const last=points.at(-1);c.moveTo((last[0]+points[0][0])/2,(last[1]+points[0][1])/2);points.forEach(([x,y],i)=>{const n=points[(i+1)%points.length];c.quadraticCurveTo(x,y,(x+n[0])/2,(y+n[1])/2);});c.closePath();const g=c.createLinearGradient(-30,-75,32,15);g.addColorStop(0,'#302d2b');g.addColorStop(.45,bright?'#746d5b':'#595344');g.addColorStop(.75,'#424c49');g.addColorStop(1,'#252e2d');c.fillStyle=g;c.fill();c.strokeStyle='#242b29';c.lineWidth=2;c.stroke();c.clip();for(let i=0;i<3;i++){c.beginPath();c.moveTo(-26+i*18,20);c.bezierCurveTo(-44+i*18,-5,-2+i*12,-30,-18+i*16,-86);c.strokeStyle=i===1?'#a2bbb142':'#8d826b38';c.lineWidth=5-i;c.stroke();}c.restore();}
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
 cooled(c,[[-22,-19],[-6,-19],[-4,9-step*.3],[-22,13-step*.3],[-26,3]]);
 cooled(c,[[2,-19],[18,-21],[25,7+step*.3],[17,14+step*.3],[2,10]]);
 // Charred spines retain the water creature's jagged exterior.
 for(const points of [
 [[-30,-33],[-43,-47],[-29,-43]],[[-29,-48],[-37,-68],[-20,-57]],
 [[-20,-61],[-26,-83],[-10,-66]],[[-9,-68],[-6,-96],[4,-72]],
 [[6,-67],[15,-87],[20,-58]],[[21,-51],[35,-67],[30,-39]],[[27,-33],[41,-42],[29,-22]]
 ])shape(c,points,'#454437');
 cooled(c,[[-26,-16],[-32,-39],[-24,-62],[-28,-75],[-13,-65],[-6,-85],[7,-71],[11,-77],[25,-58],[32,-35],[22,-11],[-6,-8]]);
 const liftArm=leaping?Math.max(0,Math.sin((age-2)/1.6*Math.PI))*32:0;
 function arm(side){const sx=side*22,ex=side*32,hy=8+side*step-liftArm,hx=side*(34+(running?5:0));for(let i=0;i<3;i++){const sy=-38+i*14,base=side*(31+i*2);shape(c,[[base,sy-7],[base+side*(15-i*2),sy-13],[base+side*3,sy+5]],'#46483b');}cooled(c,[[sx-10,-54],[ex-11,-25],[hx-12,hy-13],[hx-14,hy+4],[hx+8,hy+7],[hx+15,hy-5],[hx+9,hy-18],[ex+10,-13],[sx+11,-39]],true);c.strokeStyle='#a9c8bd88';c.lineWidth=1.2;for(let i=0;i<3;i++){c.beginPath();c.moveTo(hx-6+i*5,hy-4);c.lineTo(hx-5+i*5,hy+1);c.stroke();}}
 arm(-1);
 const biteAge=time-(h.waterBiteAt??-10),jaw=active&&biteAge>=0&&biteAge<.3?Math.sin(biteAge/.3*Math.PI)*9:0;
 c.save();c.translate(jaw*.45,jaw*.12);cooled(c,[[-5,-43],[-3,-56],[8,-59],[24,-49],[27,-34],[19,-21],[3,-25]],true);
 c.strokeStyle=a?.path===3?'#daeaa0':'#a6c8ba';c.lineWidth=2;c.beginPath();c.moveTo(2,-42);c.lineTo(9,-40);c.moveTo(15,-40);c.lineTo(21,-43);c.stroke();
 // A short ape jaw opens for the existing bite animation.
 shape(c,[[5,-31],[20,-32],[23,-27+jaw],[18,-23+jaw],[6,-24+jaw]],'#202b29');
 if(jaw>1){for(let i=0;i<3;i++)shape(c,[[7+i*5,-30],[9+i*5,-26],[11+i*5,-30]],'#bac5af');}
 c.strokeStyle='#827c68';c.lineWidth=2;c.beginPath();c.moveTo(7,-23+jaw);c.quadraticCurveTo(14,-20+jaw,21,-25+jaw);c.stroke();c.restore();arm(1);
 // Water beads descend; faint steam replaces the fire form's rising embers.
 c.save();const opacity=c.globalAlpha;for(let i=0;i<6;i++){const f=(time*.45+i*.17)%1;c.globalAlpha=opacity*(1-f)*.38;c.strokeStyle='#d0ded2';c.lineWidth=1.2;c.beginPath();const sx=-22+i*9;c.moveTo(sx,-56-f*23);c.bezierCurveTo(sx-5,-64-f*23,sx+6,-68-f*23,sx+2,-76-f*23);c.stroke();}c.globalAlpha=opacity*.65;c.fillStyle='#a0c9c5';for(let i=0;i<5;i++){const f=(time*.6+i*.21)%1;c.beginPath();c.ellipse(-30+i*15+Math.sin(i)*3,-30+f*42,1,2,0,0,7);c.fill();}c.restore();
 c.restore();
 if(a?.path===1){c.save();for(let i=0;i<24;i++){const angle=i*2.4,phase=(age*1.8+i*.17)%1,r=18+phase*100;c.globalAlpha=1-phase;c.fillStyle='#9cdff0';c.beginPath();c.ellipse(h.x+Math.cos(angle)*r,h.y+Math.sin(angle)*r*.5-18-20*Math.sin(phase*Math.PI),2,4,angle,0,7);c.fill();}c.restore();}
 if(a?.path===3){c.save();c.strokeStyle='#cedc8190';c.lineWidth=1.5;c.setLineDash([4,5]);c.beginPath();c.moveTo(h.x+23,h.y-49);c.lineTo(a.to.x,a.to.y-12);c.stroke();c.strokeStyle='#e6eca0';c.beginPath();c.arc(a.to.x,a.to.y,15+Math.sin(time*8)*3,0,7);c.stroke();c.restore();}
 }
 return{hero};
})();
