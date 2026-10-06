/* Brown, spiny aquatic creature based on the lower creature in the reference. */
window.WaterBeastArt=(()=>{
 const ink='#2d271e';
 function shape(c,p,color){c.beginPath();p.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.fillStyle=color;c.fill();c.strokeStyle=ink;c.lineWidth=2;c.lineJoin='round';c.stroke();}
 function limb(c,x,y,bend,light){shape(c,[[x,y],[x+10,y+3],[x+8+bend,y+14],[x+13+bend,y+18],[x+6+bend,y+20],[x+10,y+31],[x+18,y+35],[x+2,y+36],[x-4,y+31],[x+1+bend,y+18],[x-5+bend,y+13]],light?'#906532':'#63411e');}
 function hero(c,h,{time=0,active=false,selected=false,ghost=false,facing=0}={}){
 const a=h.waterAction,age=a?time-a.start:0;let x=h.x,y=h.y,lift=0,submerged=false;
 if(a&&a.path===0){const f=Math.max(0,Math.min(1,age<.7?age/.7:2-age/.7));x+=(a.to.x-h.x)*f;y+=(a.to.y-h.y)*f;}
 if(a&&a.path===2){submerged=age<2;const q=(age-2)/.8,f=Math.max(0,Math.min(1,q<=1?q:2-q));x+=(a.to.x-h.x)*f;y+=(a.to.y-h.y)*f;if(age>=2)lift=Math.sin(Math.max(0,Math.min(1,q<=1?q:q-1))*Math.PI)*(q<=1?105:65);}
 c.save();c.translate(x,y);if(ghost)c.globalAlpha*=.55;
 c.fillStyle='#203b4438';c.beginPath();c.ellipse(0,7,36,10,0,0,7);c.fill();c.strokeStyle=selected?'#f1d594':'#9bdeea99';c.lineWidth=selected?2:1.5;
 for(let i=0;i<2;i++){c.beginPath();c.ellipse(0,7,32+i*8+Math.sin(time*3+i)*2,8+i*4,0,0,7);c.stroke();}
 if(submerged){for(let i=0;i<5;i++){c.beginPath();c.arc(Math.sin(i*2+time)*20,5-((time*12+i*7)%22),2+i%2,0,7);c.stroke();}c.restore();return;}
 c.translate(a?.path===1?Math.sin(time*65)*4:0,-lift+Math.sin(time*3)*1.1);c.scale(Math.cos(facing)<0?-1:1,1);
 const running=a?.path===0,step=running?Math.sin(age*32)*7:Math.sin(time*2)*.6;
 limb(c,-21,-20,-step,false);limb(c,15,-20,step,false);
 // Curling tail, jagged ridge, long toothed muzzle and four angular legs.
 c.beginPath();c.moveTo(-25,-23);c.bezierCurveTo(-62,-23,-63,-62,-43,-65);c.bezierCurveTo(-26,-68,-22,-48,-38,-47);c.lineTo(-34,-54);c.bezierCurveTo(-44,-69,-53,-47,-42,-39);c.lineTo(-22,-35);c.closePath();c.fillStyle='#715022';c.fill();c.strokeStyle=ink;c.lineWidth=2.5;c.stroke();
 shape(c,[[-33,-21],[-40,-31],[-34,-33],[-40,-45],[-29,-41],[-29,-55],[-19,-47],[-13,-62],[-5,-50],[3,-66],[10,-51],[20,-60],[25,-44],[31,-34],[22,-16],[2,-12],[-17,-16]],'#805827');
 shape(c,[[-28,-34],[-14,-43],[-5,-39],[8,-48],[17,-40],[10,-30],[-8,-25],[-23,-27]],'#a17b3b');
 limb(c,-23,-16,step,true);limb(c,11,-17,-step,true);
 const jaw=active&&((time-(h.waterBiteAt??-10))<.3)?Math.sin((time-h.waterBiteAt)/.3*Math.PI)*10:2;
 c.save();c.translate(19,-40);c.rotate(a?.path===3?-.07:Math.sin(time*2)*.025);
 shape(c,[[-12,-7],[-15,-19],[-6,-15],[-6,-27],[2,-18],[11,-25],[14,-15],[27,-15],[34,-11],[45,-12],[41,-5],[48,-3],[38,3],[25,1],[13,5],[5,15],[-6,12],[-9,4]],'#94652e');
 shape(c,[[9,8],[21,6],[36,8],[46,4],[43,13+jaw],[27,17+jaw],[12,15+jaw],[2,19]],'#74491f');
 for(let i=0;i<4;i++)shape(c,[[16+i*6,2],[19+i*6,8],[21+i*6,2]],'#ead8ab');
 shape(c,[[1,-11],[9,-7],[7,1],[1,-3]],'#eecba1');shape(c,[[4,-8],[7,-6],[6,-1],[4,-3]],a?.path===3?'#dff48a':'#bc4e35');
 c.strokeStyle='#c69b51';c.lineWidth=1.3;for(let i=0;i<3;i++){c.beginPath();c.moveTo(13+i*5,-9);c.lineTo(16+i*5,-7);c.stroke();}c.restore();
 for(let i=0;i<7;i++){c.strokeStyle=i%2?'#bc914b':'#4d361f';c.lineWidth=1.4;c.beginPath();c.moveTo(-25+i*6,-32+(i%3)*4);c.lineTo(-21+i*6,-36+(i%3)*4);c.stroke();}
 c.restore();
 if(a?.path===1){c.save();for(let i=0;i<24;i++){const angle=i*2.4,phase=(age*1.8+i*.17)%1,r=18+phase*100;c.globalAlpha=1-phase;c.fillStyle='#9cdff0';c.beginPath();c.ellipse(h.x+Math.cos(angle)*r,h.y+Math.sin(angle)*r*.5-18-20*Math.sin(phase*Math.PI),2,4,angle,0,7);c.fill();}c.restore();}
 if(a?.path===3){c.save();c.strokeStyle='#cedc8190';c.lineWidth=1.5;c.setLineDash([4,5]);c.beginPath();c.moveTo(h.x+23,h.y-49);c.lineTo(a.to.x,a.to.y-12);c.stroke();c.strokeStyle='#e6eca0';c.beginPath();c.arc(a.to.x,a.to.y,15+Math.sin(time*8)*3,0,7);c.stroke();c.restore();}
 }
 return{hero};
})();
