/* DEMONIC NIGHTMARE, based on Jack's supplied drawing. */
window.NightmareArt=(()=>{
 const ink='#12100f',body='#34312d';
 function line(c,p,color,w=1.5){c.beginPath();c.moveTo(...p[0]);for(let i=1;i<p.length;i++){const a=p[i-1],b=p[i];c.quadraticCurveTo((a[0]+b[0])/2+.4,(a[1]+b[1])/2,...b);}c.strokeStyle=color;c.lineWidth=w;c.lineCap='round';c.lineJoin='round';c.stroke();}
 function shape(c,p,color){c.beginPath();for(let i=0;i<p.length;i++){const a=p[(i+p.length-1)%p.length],b=p[i],d=p[(i+1)%p.length];const v=[b[0]*.9+a[0]*.1,b[1]*.9+a[1]*.1],w=[b[0]*.9+d[0]*.1,b[1]*.9+d[1]*.1];if(i)c.lineTo(...v);else c.moveTo(...v);c.quadraticCurveTo(...b,...w);}c.closePath();c.fillStyle=color;c.fill();c.strokeStyle=ink;c.lineWidth=1.6;c.stroke();}
 function traced(c,points,color,width){c.beginPath();c.moveTo(...points[0]);for(let i=0;i<points.length-1;i++){const a=points[Math.max(0,i-1)],b=points[i],d=points[i+1],e=points[Math.min(points.length-1,i+2)];c.bezierCurveTo(b[0]+(d[0]-a[0])/6,b[1]+(d[1]-a[1])/6,d[0]-(e[0]-b[0])/6,d[1]-(e[1]-b[1])/6,...d);}c.strokeStyle=color;c.lineWidth=width;c.lineJoin='round';c.lineCap='round';c.stroke();}
 function draw(c,e,time,flight){
  c.save();c.translate(e.x,e.y);c.fillStyle='#241e3233';c.beginPath();c.ellipse(0,44,21-flight.lift*6,5-flight.lift*1.5,0,0,Math.PI*2);c.fill();
  c.translate(0,-flight.lift*65+Math.sin(time*3)*1.2);c.scale(1.15,1.15);
  const beat=Math.sin(time*(flight.airborne?9:3));
  for(const side of [-1,1]){c.save();c.scale(side,1);c.translate(9,-34);c.rotate(beat*(flight.airborne?.25:.07));
   shape(c,[[0,0],[16,4],[29,4],[35,-9],[30,-32],[25,-42],[42,-36],[59,-22],[66,0],[66,18],[56,36],[40,48],[46,28],[42,16],[26,9],[13,10]],body);
   line(c,[[0,0],[24,6],[40,-2],[34,-24],[26,-41]],'#898888',1.7);
   for(const pts of [[[40,-2],[52,-7],[57,-17]],[[40,-2],[49,10],[58,13]],[[49,10],[49,27],[43,43]],[[49,27],[58,22],[62,11]],[[24,6],[32,10],[39,8]]])line(c,pts,'#898888',1.2);
   shape(c,[[25,-41],[23,-46],[27,-48],[32,-44],[33,-41]],'#d4d0b7');c.restore();}
  // Clawed arms attach to the torso.
  for(const side of [-1,1]){c.save();c.translate(0,-22);const sway=Math.sin(time*4)*side*2;shape(c,[[side*7,-16],[side*14,-10],[side*23,9+sway],[side*30,23+sway],[side*28,32],[side*19,30],[side*12,12]],'#680b12');shape(c,[[side*8,-18],[side*18,-6],[side*25,11+sway],[side*29,23+sway],[side*24,29],[side*18,24],[side*12,7]],body);for(let i=0;i<3;i++)shape(c,[[side*(19+i*3),25],[side*(20+i*4),36-i*2],[side*(23+i*3),29]],'#594083');c.restore();}
  shape(c,[[-13,-47],[11,-44],[14,-29],[9,-13],[4,-4],[-6,-6],[-12,-27]],body);
  // Both full legs use the arm silhouette, red inner edge and purple claws.
  shape(c,[[-7,-10],[5,-10],[8,2],[4,8],[-5,8],[-9,1]],body);
  for(const side of [-1,1]){
   c.save();c.scale(.78,.88);c.translate(0,10);
   const sway=flight.airborne?Math.sin(time*4)*side*2:Math.sin(time*5)*side*1.2;
   shape(c,[[side*7,-16],[side*14,-10],[side*23,9+sway],[side*30,23+sway],[side*28,32],[side*19,30],[side*12,12]],'#680b12');
   shape(c,[[side*8,-18],[side*18,-6],[side*25,11+sway],[side*29,23+sway],[side*24,29],[side*18,24],[side*12,7]],body);
   for(let i=0;i<3;i++)shape(c,[[side*(19+i*3),25],[side*(20+i*4),36-i*2],[side*(23+i*3),29]],'#594083');
   c.restore();
  }
  // Preserve the exact original purple belly strokes rather than a redraw.
  c.save();c.translate(-677*.225,-334*.225-35);c.scale(.225,.225);
  const bellyPattern=NightmarePatterns.sprites.belly;c.drawImage(bellyPattern.canvas,bellyPattern.x,bellyPattern.y);c.restore();
  // Original long looping horn marks; the two horns have different drawings.
  const hornContours=[
   [[640,103],[617,114],[583,110],[550,93],[519,63],[493,12],[488,28],[492,55],[510,92],[532,124],[558,147],[595,164],[605,208],[623,239],[638,230],[618,182],[621,139]],
   [[770,95],[810,88],[845,77],[874,52],[901,25],[913,12],[919,33],[906,58],[882,80],[857,98],[827,114],[803,136],[787,173],[778,209],[767,223],[774,171],[776,131]]
  ];
  const mapHorn=pts=>pts.map(([x,y])=>[(x-705)*.195,(y-240)*.195-51]);
  for(let i=0;i<2;i++){
   shape(c,mapHorn(hornContours[i]),'#e7ee42');
   c.save();c.translate(-705*.195,-240*.195-51);c.scale(.195,.195);
   const hornPattern=NightmarePatterns.sprites[i===0?'left':'right'];c.drawImage(hornPattern.canvas,hornPattern.x,hornPattern.y);c.restore();
  }
  shape(c,[[-17,-72],[-11,-81],[11,-81],[17,-76],[20,-58],[15,-47],[4,-41],[-10,-45],[-18,-57]],body);
  shape(c,[[-11,-66],[-5,-71],[-4,-63],[-9,-60]],'#eff531');shape(c,[[8,-66],[12,-71],[14,-64],[9,-59]],'#eff531');
  line(c,[[-6,-70],[-8,-61]],ink,1);line(c,[[12,-69],[10,-60]],ink,1);
  shape(c,[[-11,-55],[-5,-58],[0,-53],[7,-54],[13,-51],[8,-47],[1,-49],[-5,-47],[-11,-50]],'#e57926');
  for(let i=0;i<5;i++)shape(c,[[-9+i*4,-54],[ -8+i*4,-50],[-6+i*4,-54]],'#eee4bf');
  c.fillStyle='#241d2c';c.fillRect(-21,-102,42,4);c.fillStyle='#e2de73';c.fillRect(-20,-101,40*Math.max(0,e.hp/e.maxHp),2);
  if(flight.airborne){c.font='bold 9px sans-serif';c.textAlign='center';c.fillStyle='#f3e5ff';c.strokeStyle='#30213b';c.lineWidth=3;c.strokeText('AIRBORNE',0,-109);c.fillText('AIRBORNE',0,-109);}
  c.restore();
 }
 return{draw};
})();
