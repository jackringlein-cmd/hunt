/* Distance-driven rolling rock: native Canvas art matching the outlined game style. */
window.IronBallArt=(()=>{
 const outline=[[-43,-10],[-36,-29],[-20,-43],[2,-46],[23,-39],[39,-24],[45,-2],[39,23],[22,40],[-2,44],[-25,36],[-41,16]];
 function polygon(c,p,fill,stroke='#262c2e',width=2){c.beginPath();p.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.fillStyle=fill;c.fill();c.strokeStyle=stroke;c.lineWidth=width;c.lineJoin='round';c.stroke();}
 function draw(c,e,time){c.save();c.translate(e.x,e.y);c.fillStyle='#222c2840';c.beginPath();c.ellipse(0,9,43,10,0,0,Math.PI*2);c.fill();c.translate(0,-36);c.rotate((e.p||0)/44);polygon(c,outline,'#77776e','#242a27',3);
 polygon(c,[[-43,-10],[-20,-43],[-9,-17],[-24,8]],'#a09d8d');polygon(c,[[-24,8],[-9,-17],[18,-8],[22,40],[-2,44]],'#64695f');polygon(c,[[2,-46],[23,-39],[39,-24],[18,-8],[-9,-17]],'#99998a');polygon(c,[[18,-8],[45,-2],[39,23],[22,40]],'#545c57');
 for(const [x,y,a,s] of [[-23,-19,.2,1],[10,-28,-.4,.85],[27,0,.5,1],[-6,13,-.1,1.15],[-24,21,.7,.65],[17,29,0,.65]]){c.save();c.translate(x,y);c.rotate(a);c.scale(s,s);polygon(c,[[-11,-5],[-4,-12],[7,-10],[12,0],[6,10],[-8,8]],'#b5bfc2','#353e43',2);polygon(c,[[-4,-12],[7,-10],[3,-1],[-11,-5]],'#e1e7dd','#879494',1);polygon(c,[[3,-1],[12,0],[6,10],[-1,6]],'#758990','#879494',1);c.restore();}
 c.strokeStyle='#343b34';c.lineWidth=2;c.beginPath();c.moveTo(-37,0);c.lineTo(-30,4);c.lineTo(-34,13);c.moveTo(1,-41);c.lineTo(-3,-33);c.moveTo(36,13);c.lineTo(29,18);c.stroke();c.restore();}
 return{draw};})();
