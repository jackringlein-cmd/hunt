window.HellHoundArt=(()=>{
 const ink='#201810';
 function shape(c,p,color){c.beginPath();for(let i=0;i<p.length;i++){const a=p[(i+p.length-1)%p.length],b=p[i],n=p[(i+1)%p.length];const x=[b[0]*.8+a[0]*.2,b[1]*.8+a[1]*.2],y=[b[0]*.8+n[0]*.2,b[1]*.8+n[1]*.2];if(i)c.lineTo(...x);else c.moveTo(...x);c.quadraticCurveTo(...b,...y);}c.closePath();c.fillStyle=color;c.fill();c.strokeStyle=ink;c.lineWidth=1.7;c.lineJoin='round';c.stroke();}
 function line(c,p,color,w){c.beginPath();c.moveTo(...p[0]);for(const v of p.slice(1))c.lineTo(...v);c.lineCap='round';c.lineJoin='round';c.strokeStyle=ink;c.lineWidth=w+2;c.stroke();c.strokeStyle=color;c.lineWidth=w;c.stroke();}
 function oval(c,x,y,rx,ry,color){c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fillStyle=color;c.fill();c.strokeStyle=ink;c.lineWidth=1.5;c.stroke();}
 function draw(c,e,time){const stopped=e.effects?.some(f=>['stun','freeze'].includes(f.kind)),t=stopped?0:e.p*.17,hop=stopped?0:Math.sin(t*2)*2,frozen=e.effects?.some(f=>f.kind==='freeze'),fur=frozen?'#a8cdd2':'#171a18',coat=frozen?'#bedce0':'#292d28';const next=window.GameEngine?.position(e.p+3),dir=next&&next.x<e.x-.1?-1:1;c.save();c.translate(e.x,e.y);oval(c,0,7,30,5,'#30251b33');
 // A soft pool of firelight follows the moving belly.
 c.save();c.scale(1,.48);const glow=c.createRadialGradient(0,4,5,0,4,58);glow.addColorStop(0,'#ffb13e88');glow.addColorStop(.5,'#ff8b2444');glow.addColorStop(1,'#ff6c0000');c.fillStyle=glow;c.globalAlpha=.85+Math.sin(time*9)*.15;c.fillRect(-60,-55,120,120);c.restore();c.scale(dir,1);
 // Two far legs and two near legs alternate through a stretched gallop.
 function leg(x,phase,near){const swing=Math.sin(t+phase)*10,lift=Math.max(0,Math.cos(t+phase))*7;line(c,[[x,-15+hop],[x+swing*.45,-4-lift],[x+swing,7-lift]],near?coat:'#111411',near?4:3);line(c,[[x+swing,7-lift],[x+swing+5,7-lift]],near?fur:'#111411',3);}
 leg(-18,Math.PI*.5,false);leg(15,Math.PI*1.5,false);
 // Long tapering whip tail, with a low sweep and hooked tip.
 c.save();c.translate(0,hop);const swish=Math.sin(t*.65)*3;c.beginPath();c.moveTo(-22,-25);c.bezierCurveTo(-35,-28,-43,-13+swish,-51,-18+swish);c.bezierCurveTo(-56,-21+swish,-55,-29+swish,-52,-32+swish);c.bezierCurveTo(-62,-26+swish,-56,-9+swish,-46,-12+swish);c.bezierCurveTo(-36,-13+swish,-31,-20,-23,-19);c.closePath();c.fillStyle=fur;c.fill();c.strokeStyle=ink;c.lineWidth=1.4;c.stroke();c.restore();
 c.save();c.translate(0,hop);shape(c,[[-26,-24],[-17,-33],[5,-31],[22,-35],[27,-22],[19,-12],[1,-15],[-19,-12],[-28,-17]],fur);shape(c,[[-18,-30],[-8,-27],[7,-28],[16,-32],[15,-22],[-4,-21]],'#373b32');
 c.save();c.shadowColor='#ff961f';c.shadowBlur=12+Math.sin(time*10)*2;shape(c,[[-21,-23],[-9,-25],[4,-24],[19,-26],[19,-15],[6,-13],[-5,-16],[-17,-13],[-23,-17]],'#f48b24');c.shadowBlur=5;shape(c,[[-14,-21],[-3,-22],[9,-21],[14,-18],[4,-17],[-6,-19],[-15,-17]],'#ffd36a');c.restore();
 // Straight-edged black spines keep needle-sharp tips.
 for(let i=0;i<5;i++){const x=-21+i*9,height=15+(i%3)*5;c.beginPath();c.moveTo(x-4,-29);c.lineTo(x-7,-29-height);c.lineTo(x+5,-30);c.closePath();c.fillStyle='#0c0f0d';c.fill();c.strokeStyle=ink;c.lineWidth=1.2;c.lineJoin='miter';c.stroke();line(c,[[x-2,-32],[x-4,-38]],'#3c4237',.7);}
 c.save();c.translate(24,-31);c.rotate(Math.sin(t)*.045);
 // Narrow skull, deep cheek, long muzzle and pinned-back ears.
 shape(c,[[-11,-8],[-5,-16],[5,-15],[12,-9],[19,-6],[34,-2],[37,3],[32,7],[16,8],[7,11],[-3,7]],coat);
 shape(c,[[-5,-11],[-20,-24],[-16,-12],[-9,-3]],fur);shape(c,[[3,-13],[-6,-27],[-7,-15],[-1,-8]],fur);
 shape(c,[[11,5],[34,3],[32,10],[16,14],[5,10]],'#151815');
 shape(c,[[32,-2],[38,0],[37,4],[32,5]],'#0e120e');
 shape(c,[[3,-7],[12,-6],[8,-2],[3,-2]],'#efba56');line(c,[[2,-8],[12,-7]],'#10140f',2);line(c,[[8,-5],[8,-3]],'#1a2118',1);
 line(c,[[0,-1],[4,4],[10,5]],'#10140f',1.7);
 shape(c,[[16,6],[20,5],[18,12]],'#eee0b1');shape(c,[[27,5],[30,4],[28,9]],'#eee0b1');line(c,[[16,13],[28,10]],'#704128',1);
 c.restore();c.restore();leg(-18,Math.PI,true);leg(15,0,true);c.restore();c.save();c.fillStyle=ink;c.fillRect(e.x-24,e.y-65,48,5);c.fillStyle='#d6a260';c.fillRect(e.x-23,e.y-64,46*Math.max(0,e.hp/e.maxHp),3);c.restore();}
 function explosion(c,f){const t=Math.max(0,Math.min(1,1-f.life/f.max)),r=f.radius;c.save();c.translate(f.x,f.y-12);const expansion=1-Math.pow(1-t,3);
 // Low shockwave and an irregular billowing fireball.
 c.globalAlpha=Math.max(0,1-t);c.strokeStyle='#ffd080';c.lineWidth=3*(1-t)+1;c.beginPath();c.ellipse(0,10,r*expansion,r*.45*expansion,0,0,Math.PI*2);c.stroke();
 if(t>.22){for(let i=0;i<8;i++){const a=i*Math.PI/4,spread=r*(.32+t*.3),size=r*(.12+t*.12);c.globalAlpha=Math.sin(Math.PI*t)*.48;c.fillStyle=i%2?'#595044':'#756452';c.beginPath();c.arc(Math.cos(a)*spread,Math.sin(a)*spread*.6-r*t*.4,size,0,7);c.fill();}}
 const fire=Math.max(0,1-t/.78);if(fire>0){for(let i=0;i<11;i++){const a=i*2.3999,spread=r*expansion*.55,px=Math.cos(a)*spread,py=Math.sin(a)*spread*.72-r*t*.15,size=r*(.2+Math.sin(i*3)*.045)*fire;c.globalAlpha=Math.min(1,fire*2);c.fillStyle=i%2?'#ed5b1b':'#f79127';c.strokeStyle='#b7411a';c.lineWidth=1.5;c.beginPath();c.arc(px,py,size,0,7);c.fill();c.stroke();c.fillStyle='#ffd466';c.beginPath();c.arc(px-size*.13,py-size*.1,size*.57,0,7);c.fill();}c.globalAlpha=fire;c.fillStyle='#fff0ac';c.beginPath();c.arc(0,-5,r*.28*fire,0,7);c.fill();}
 for(let i=0;i<22;i++){const a=i*2.3999,travel=r*expansion*(.65+(i%4)*.13),x=Math.cos(a)*travel,y=Math.sin(a)*travel*.8+t*t*r*.3;c.globalAlpha=1-t;c.strokeStyle=i%2?'#ffd064':'#f88423';c.lineWidth=2;c.beginPath();c.moveTo(x,y);c.lineTo(x-Math.cos(a)*r*.09*(1-t),y-Math.sin(a)*r*.09*(1-t));c.stroke();}
 if(t<.13){c.globalAlpha=(1-t/.13)*.85;c.fillStyle='#fff6ce';c.beginPath();for(let i=0;i<20;i++){const a=i*Math.PI/10,rad=r*(i%2?.23:.68)*(1+t);i?c.lineTo(Math.cos(a)*rad,Math.sin(a)*rad):c.moveTo(Math.cos(a)*rad,Math.sin(a)*rad);}c.closePath();c.fill();}c.restore();}
 return{draw,explosion};
})();
