/* Orange-red dancer wearing individual leaves, following the supplied reference. */
window.CamoflaugerArt=(()=>{
 function leaf(c,x,y,angle,size,color){c.save();c.translate(x,y);c.rotate(angle);c.beginPath();c.moveTo(0,0);c.bezierCurveTo(-size*.65,-size*.35,-size*.45,-size*.85,0,-size);c.bezierCurveTo(size*.5,-size*.75,size*.6,-size*.25,0,0);c.fillStyle=color;c.fill();c.strokeStyle='#244b29';c.lineWidth=1;c.stroke();c.beginPath();c.moveTo(0,-1);c.lineTo(0,-size*.82);c.moveTo(0,-size*.4);c.lineTo(-size*.22,-size*.57);c.moveTo(0,-size*.58);c.lineTo(size*.2,-size*.73);c.strokeStyle='#92b95a';c.lineWidth=.65;c.stroke();c.restore();}
 const greens=['#1d5530','#26773a','#398b38','#5b9c3c','#83ad48','#496c2c','#327f59'];
 function leaves(c,x,y,angle,phase){for(let i=0;i<3;i++)leaf(c,x+(i-1)*2,y,angle+(i-1)*.7+Math.sin(phase+i)*.12,10+i%3,greens[(i+Math.floor(Math.abs(x)))%greens.length]);}
 function cover(c,points,phase){for(let j=1;j<points.length;j++){const a=points[j-1],b=points[j];for(let i=0;i<2;i++){const t=(i+.4)/2,x=a[0]+(b[0]-a[0])*t,y=a[1]+(b[1]-a[1])*t;for(const side of [-1,1])leaf(c,x+side*2,y,side*(1.3+i*.15)+Math.sin(phase+i)*.12,8.5+i%2,greens[(j*3+i+(side+1))%greens.length]);}}}
 function limb(c,points,color,width=6){for(const [stroke,w]of [['#25321e',width+2],[color,width]]){c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.strokeStyle=stroke;c.lineWidth=w;c.stroke();}}
 function draw(c,e,time){const still=e.effects?.some(f=>['stun','freeze'].includes(f.kind))||(e.gazeUntil||0)>time;
 // Travel drives the dance so pause, slow, fear and knockback stay in step.
 const cycle=still?0:((e.p/1800)%1+1)%1,beat=cycle*Math.PI*2;
 const pulse=(a,b)=>cycle>=a&&cycle<b?Math.sin((cycle-a)/(b-a)*Math.PI):0;
 const leftKick=pulse(0,.13),rightKick=pulse(.13,.26),kick=leftKick+rightKick;
 const shuffle=cycle>=.26&&cycle<.4?Math.sin((cycle-.26)/.14*Math.PI*6):0;
 const shimmy=cycle>=.4&&cycle<.52?Math.sin((cycle-.4)/.12*Math.PI*8):0;
 const crouch=pulse(.52,.58),jump=cycle>=.58&&cycle<.77?(cycle-.58)/.19:0;
 const bounce=Math.sin(jump*Math.PI)*30,spin=jump*jump*(3-2*jump)*Math.PI*2;
 const clap=pulse(.81,.92),bow=pulse(.92,1),sway=(rightKick-leftKick)*.4+shimmy*.25;
 const landing=pulse(.77,.81)*3;

 c.save();c.translate(e.x,e.y);c.fillStyle='#20352135';c.beginPath();c.ellipse(0,9,16-bounce*.18,4,0,0,7);c.fill();c.translate(sway*2+shuffle*3,-bounce+crouch*5+landing+bow*4);c.translate(0,-22);c.rotate(spin);c.translate(0,22);c.lineJoin='round';c.lineCap='round';
 // Alternating kicks, heel shuffle, shoulder shimmy, jump-spin, overhead clap and bow.
 for(const side of [-1,1]){const phase=beat+side,legKick=side<0?leftKick:rightKick,hip=[side*3,-14],knee=[side*(7+legKick*11)+shuffle*3,-5-legKick*19],foot=[side*(9+legKick*21)+shuffle*5,8-legKick*51-Math.max(0,shuffle*side)*5];if(jump){knee[0]=side*10;knee[1]=-6;foot[0]=side*16;foot[1]=3;}const points=[hip,knee,foot,[foot[0]+side*3,foot[1]-1]];limb(c,points,side<0?'#ff8212':'#ed4a12');cover(c,points,phase);leaves(c,foot[0],foot[1]+1,side*.8+Math.PI,phase);}

 c.save();c.translate(1,-20);c.rotate(sway*.35+bow*.6);c.translate(-1,20);
 // Leaf skirt and shoulder clusters have visible pointed tips and veins.
 for(let i=0;i<5;i++)leaf(c,-5+i*3,-15,Math.PI+(i-2)*.35+Math.sin(beat+i)*.1,9,'#39823a');
 for(const side of [-1,1]){const phase=beat+(side===1?Math.PI:0),wave=kick,elbow=[side*(14+wave*3),-27-wave*5-jump*4],hand=[side*(22+wave*2)*(1-clap*.94),-31-wave*12-(jump?10:0)-clap*38+bow*12];elbow[1]+=shimmy*side*4-clap*13;leaves(c,hand[0],hand[1],side*.7,phase);limb(c,[[side*4,-30],elbow,hand],side<0?'#ff961a':'#ff7810',6);cover(c,[[side*4,-30],elbow,hand],phase);leaves(c,side*6,-30,side*1.2,phase+.5);}
 // Curved orange body remains visible between the leaves.
 c.beginPath();c.moveTo(-2,-35);c.bezierCurveTo(4,-36,7,-30,6,-27);c.bezierCurveTo(6,-24,13,-22,10,-17);c.lineTo(3,-11);c.lineTo(-2,-14);c.lineTo(4,-20);c.bezierCurveTo(2,-24,-4,-25,-2,-30);c.closePath();c.fillStyle='#ff8010';c.fill();c.strokeStyle='#28351e';c.lineWidth=1.6;c.stroke();
 for(let row=0;row<3;row++)for(let col=0;col<2;col++)leaf(c,-2+col*6+Math.sin(row)*3,-13-row*7,(col-.5)*.9+Math.PI,10+(row+col)%3,greens[(row*3+col)%greens.length]);
 // A leafy hood, not a continuous green border; head nods against the body sway.
 c.save();c.translate(1,-37);c.rotate(-sway*.12);c.translate(-1,37);
 for(const [x,y,a]of [[-3,-39,-1.2],[-6,-46,-1],[-5,-53,-.6],[0,-57,-.3],[6,-57,.3],[12,-53,.9],[12,-46,1.3]])leaf(c,x,y,a+Math.sin(beat+x)*.08,9,'#3c883a');
 c.beginPath();c.moveTo(-2,-37);c.lineTo(-4,-47);c.quadraticCurveTo(-4,-54,3,-56);c.quadraticCurveTo(8,-57,12,-49);c.quadraticCurveTo(14,-45,6,-43);c.lineTo(2,-37);c.closePath();c.fillStyle='#f52b12';c.fill();c.strokeStyle='#24341e';c.lineWidth=1.6;c.stroke();for(const [x,y,a]of [[-3,-42,-1],[-4,-47,-1.3],[-2,-53,-.4],[3,-55,.2],[11,-46,1.5],[3,-39,2.8]])leaves(c,x,y,a,beat+x);c.fillStyle='#0d160c';c.beginPath();c.ellipse(6,-50,2.2,2.8,-.3,0,7);c.fill();c.fillStyle='#d9ee8c';c.fillRect(5.8,-51.5,1,1);c.restore();
 leaf(c,-2,-32,-1.1,7,'#79a540');c.fillStyle='#ffd046';c.beginPath();c.ellipse(0,-31,2.3,3,0,0,7);c.fill();c.restore();c.restore();}
 return{draw};
})();
