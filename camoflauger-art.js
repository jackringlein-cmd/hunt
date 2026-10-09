/* Orange-red dancer wearing individual leaves, following the supplied reference. */
window.CamoflaugerArt=(()=>{
 function leaf(c,x,y,angle,size,color){c.save();c.translate(x,y);c.rotate(angle);c.beginPath();c.moveTo(0,0);c.bezierCurveTo(-size*.65,-size*.35,-size*.45,-size*.85,0,-size);c.bezierCurveTo(size*.5,-size*.75,size*.6,-size*.25,0,0);c.fillStyle=color;c.fill();c.strokeStyle='#244b29';c.lineWidth=1;c.stroke();c.beginPath();c.moveTo(0,-1);c.lineTo(0,-size*.82);c.moveTo(0,-size*.4);c.lineTo(-size*.22,-size*.57);c.moveTo(0,-size*.58);c.lineTo(size*.2,-size*.73);c.strokeStyle='#92b95a';c.lineWidth=.65;c.stroke();c.restore();}
 function leaves(c,x,y,angle,phase){const colors=['#398b38','#5b9c3c','#26753b'];for(let i=0;i<3;i++)leaf(c,x+(i-1)*2,y,angle+(i-1)*.7+Math.sin(phase+i)*.13,8+i%2*2,colors[i]);}
 function limb(c,points,color,width=6){for(const [stroke,w]of [['#25321e',width+2],[color,width]]){c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.strokeStyle=stroke;c.lineWidth=w;c.stroke();}}
 function draw(c,e,time){const still=e.effects?.some(f=>['stun','freeze'].includes(f.kind))||(e.gazeUntil||0)>time;
 // Travel drives the dance so pause, slow, fear and knockback stay in step.
 const beat=still?0:e.p*.085,sway=still?0:Math.sin(beat),bounce=still?0:Math.abs(Math.sin(beat))*4;
 c.save();c.translate(e.x,e.y);c.fillStyle='#20352135';c.beginPath();c.ellipse(0,9,16-bounce*.4,4,0,0,7);c.fill();c.translate(sway*2,-bounce);c.lineJoin='round';c.lineCap='round';
 // Alternating high knees and outward kicks, with leaves attached to each ankle.
 for(const side of [-1,1]){const phase=beat+(side===1?Math.PI:0),lift=still?0:Math.max(0,Math.sin(phase)),swing=still?0:Math.cos(phase);const hip=[side*3,-14],knee=[side*(6+lift*5)+swing*2,-5-lift*7],foot=[side*(8+lift*7)+swing*3,8-lift*11];leaves(c,foot[0],foot[1]+1,side*.8+Math.PI,phase);limb(c,[hip,knee,foot,[foot[0]+side*3,foot[1]-1]],side<0?'#ff8212':'#ed4a12');leaf(c,knee[0]+side*3,knee[1],side*1.5,7,'#4b9137');}
 c.save();c.translate(1,-20);c.rotate(sway*.16);c.translate(-1,20);
 // Leaf skirt and shoulder clusters have visible pointed tips and veins.
 for(let i=0;i<5;i++)leaf(c,-5+i*3,-15,Math.PI+(i-2)*.35+Math.sin(beat+i)*.1,9,'#39823a');
 for(const side of [-1,1]){const phase=beat+(side===1?Math.PI:0),wave=still?0:Math.sin(phase),elbow=[side*(14+wave*3),-27+wave*5],hand=[side*(22+wave*2),-36-wave*8];leaves(c,hand[0],hand[1],side*.7,phase);limb(c,[[side*4,-30],elbow,hand],side<0?'#ff961a':'#ff7810',6);leaf(c,elbow[0],elbow[1]+2,side*1.9,8,'#609a3b');leaves(c,side*6,-30,side*1.2,phase+.5);}
 // Curved orange body remains visible between the leaves.
 c.beginPath();c.moveTo(-2,-35);c.bezierCurveTo(4,-36,7,-30,6,-27);c.bezierCurveTo(6,-24,13,-22,10,-17);c.lineTo(3,-11);c.lineTo(-2,-14);c.lineTo(4,-20);c.bezierCurveTo(2,-24,-4,-25,-2,-30);c.closePath();c.fillStyle='#ff8010';c.fill();c.strokeStyle='#28351e';c.lineWidth=1.6;c.stroke();
 // A leafy hood, not a continuous green border; head nods against the body sway.
 c.save();c.translate(1,-37);c.rotate(-sway*.12);c.translate(-1,37);
 for(const [x,y,a]of [[-3,-39,-1.2],[-6,-46,-1],[-5,-53,-.6],[0,-57,-.3],[6,-57,.3],[12,-53,.9],[12,-46,1.3]])leaf(c,x,y,a+Math.sin(beat+x)*.08,9,'#3c883a');
 c.beginPath();c.moveTo(-2,-37);c.lineTo(-4,-47);c.quadraticCurveTo(-4,-54,3,-56);c.quadraticCurveTo(8,-57,12,-49);c.quadraticCurveTo(14,-45,6,-43);c.lineTo(2,-37);c.closePath();c.fillStyle='#f52b12';c.fill();c.strokeStyle='#24341e';c.lineWidth=1.6;c.stroke();c.fillStyle='#0d160c';c.beginPath();c.ellipse(6,-50,2.2,2.8,-.3,0,7);c.fill();c.fillStyle='#d9ee8c';c.fillRect(5.8,-51.5,1,1);c.restore();
 leaf(c,-2,-32,-1.1,7,'#79a540');c.fillStyle='#ffd046';c.beginPath();c.ellipse(0,-31,2.3,3,0,0,7);c.fill();c.restore();c.restore();}
 return{draw};
})();
