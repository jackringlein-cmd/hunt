/* Orange-red creature wrapped in a mottled green camouflage fringe, matching the reference. */
window.CamoflaugerArt=(()=>{
 function shape(c,points,color){c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.fillStyle=color;c.fill();c.stroke();}
 function draw(c,e,time){const still=e.effects?.some(f=>['stun','freeze'].includes(f.kind))||(e.gazeUntil||0)>time,step=still?0:Math.sin(e.p*.12)*5;c.save();c.translate(e.x,e.y);c.fillStyle='#20352135';c.beginPath();c.ellipse(0,7,15,4,0,0,7);c.fill();c.translate(0,Math.abs(step)*.15);c.lineJoin='round';c.lineCap='round';c.strokeStyle='#355b3d';c.lineWidth=5;
 const parts=[[[0,-20],[-7,-8],[-6,3-step],[-11,9-step],[-8,13-step],[-1,10-step],[1,-3],[7,-10]],[[5,-18],[12,-8],[9,3+step],[14,9+step],[12,13+step],[5,11+step],[3,2],[5,-6]],[[0,-30],[-10,-31],[-16,-38],[-23,-36],[-21,-27],[-15,-21],[-4,-22]],[[7,-30],[14,-34],[19,-40],[24,-37],[23,-28],[16,-22],[8,-21]],[[0,-31],[-7,-39],[-8,-48],[-4,-57],[4,-60],[13,-59],[16,-53],[14,-43],[7,-38],[8,-31],[13,-26],[15,-18],[10,-10],[3,-7],[-5,-15],[-4,-25]]];
 for(const p of parts)shape(c,p,'#228136');c.save();c.clip();c.restore();
 // Irregular flecks stay within each silhouette piece.
 for(let k=0;k<parts.length;k++){c.save();c.beginPath();parts[k].forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.clip();for(let i=0;i<20;i++){const x=((i*17+k*11)%52)-26,y=((i*23+k*7)%80)-63;c.fillStyle=i%2?'#75a568':'#163f29';c.fillRect(x,y,2,3);}c.restore();}
 c.lineWidth=1.6;c.strokeStyle='#17281d';shape(c,[[-4,-47],[-2,-54],[4,-57],[10,-53],[12,-48],[8,-44],[3,-43],[1,-36],[-2,-36]],'#f72a12');
 shape(c,[[-1,-30],[-5,-28],[-13,-29],[-17,-33],[-21,-31],[-18,-26],[-11,-24],[-3,-24]],'#ff8b11');shape(c,[[5,-30],[11,-30],[18,-34],[20,-32],[17,-28],[9,-25]],'#ff8510');
 shape(c,[[0,-33],[5,-32],[7,-27],[11,-23],[12,-18],[7,-13],[2,-11],[-1,-5],[-1,5-step],[-5,8-step],[-6,4-step],[-5,-7],[-1,-12],[5,-16],[4,-22],[0,-26]],'#ff8010');
 shape(c,[[6,-14],[9,-11],[6,-3],[9,3+step],[12,6+step],[9,8+step],[5,5+step],[2,-2]],'#e94312');c.fillStyle='#090e09';c.beginPath();c.ellipse(7,-50,2.1,2.8,-.35,0,7);c.fill();c.fillStyle='#c9ea78';c.fillRect(6.5,-51,1,1);c.fillStyle='#ffd046';c.beginPath();c.ellipse(0,-31,2.3,3,0,0,7);c.fill();c.restore();}
 return{draw};
})();
