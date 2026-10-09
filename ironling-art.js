/* Ironling follows the reference: hunched silver shell, short protruding head and dangling limbs. */
window.IronlingArt=(()=>{
 function shape(c,p,fill){c.beginPath();p.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.fillStyle=fill;c.fill();c.strokeStyle='#252726';c.lineWidth=2;c.lineJoin='round';c.stroke();}
 function draw(c,e,time){const stopped=e.effects?.some(f=>['stun','freeze'].includes(f.kind))||(e.gazeUntil||0)>(e.visualTime||time),step=stopped?0:Math.sin(e.p*.11)*5;const dir=e.direction??(Math.cos(e.angle??0)<0?-1:1);c.save();c.translate(e.x,e.y);c.scale(dir,1);c.fillStyle='#28302b33';c.beginPath();c.ellipse(0,8,17,5,0,0,7);c.fill();
 shape(c,[[-7,-13],[-2,-13],[-1,-3],[-5+step,3],[-6+step,12],[-13+step,16],[-11+step,5]],'#7d8581');
 shape(c,[[2,-14],[8,-12],[8,-3],[12-step,2],[12-step,7],[16-step,11],[16-step,15],[11-step,15],[7-step,6],[3,-2]],'#a1a6a2');
 c.translate(0,Math.abs(step)*.12);
 shape(c,[[6,-29],[13,-27],[17,-22],[24,-21],[27,-17],[24,-14],[20,-18],[14,-18],[10,-21]],'#b4b9b5');
 shape(c,[[7,-22],[12,-19],[16,-13],[21,-11],[20,-6],[15,-8],[11,-13],[5,-15]],'#929a95');
 shape(c,[[-5,-42],[7,-46],[14,-49],[25,-49],[25,-44],[31,-43],[31,-36],[23,-36],[20,-30],[12,-28],[5,-34]],'#a4aaa5');
 shape(c,[[16,-44],[21,-44],[23,-41],[21,-38],[16,-39]],'#1b211e');
 shape(c,[[-17,-40],[-5,-42],[7,-36],[11,-24],[8,-13],[-4,-10],[-16,-12],[-23,-25],[-20,-32]],'#8f9691');
 shape(c,[[-16,-37],[-7,-40],[3,-35],[5,-25],[-3,-29],[-13,-26],[-18,-22],[-19,-29]],'#b8bdb7');
 c.save();c.strokeStyle='#d6d9d2';c.lineWidth=2.4;c.lineCap='round';for(const [x,y,dx,dy]of [[-14,-32,5,-5],[-7,-33,7,-3],[-14,-25,0,5],[-5,-26,3,-5],[3,-25,-2,5],[-11,-16,3,0],[-1,-15,4,0]]){c.beginPath();c.moveTo(x,y);c.lineTo(x+dx,y+dy);c.stroke();}c.restore();
 if(e.flash>0){c.globalAlpha=Math.min(.55,e.flash*3);c.strokeStyle='#f8eee1';c.lineWidth=3;c.beginPath();c.ellipse(-5,-26,17,16,0,0,7);c.stroke();}c.restore();}
 return{draw};
})();
