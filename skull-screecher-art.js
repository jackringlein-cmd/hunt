window.SkullScreecherArt=(()=>{
 const ink='#181710',bone='#ded3ae',shade='#b5ad91';
 function shape(c,p,fill){c.beginPath();for(let i=0;i<p.length;i++){const a=p[(i+p.length-1)%p.length],b=p[i],n=p[(i+1)%p.length],entry=[b[0]*.88+a[0]*.12,b[1]*.88+a[1]*.12],leave=[b[0]*.88+n[0]*.12,b[1]*.88+n[1]*.12];if(i)c.lineTo(...entry);else c.moveTo(...entry);c.quadraticCurveTo(...b,...leave);}c.closePath();c.fillStyle=fill;c.fill();c.strokeStyle=ink;c.lineWidth=1.8;c.lineJoin='round';c.stroke();}
 function line(c,p,color,w=2){c.beginPath();c.moveTo(...p[0]);for(const v of p.slice(1))c.lineTo(...v);c.strokeStyle=color;c.lineWidth=w;c.lineCap='round';c.lineJoin='round';c.stroke();}
 function oval(c,x,y,rx,ry,fill){c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fillStyle=fill;c.fill();c.strokeStyle=ink;c.lineWidth=1.3;c.stroke();}
 function boneLink(c,a,b,w=4){line(c,[a,b],ink,w+3);line(c,[a,b],bone,w);oval(c,a[0],a[1],w*.65,w*.65,shade);oval(c,b[0],b[1],w*.65,w*.65,bone);}
 function draw(c,e,time){const clock=e.visualTime??time,screaming=e.screechPhase==='scream',walk=e.moving?Math.sin((e.walkTravel||0)*.12):0,breathe=Math.sin(clock*2.5+e.id)*.7,shake=screaming?Math.sin(clock*55)*1.5:0;c.save();c.translate(e.x,e.y);c.scale(.375,.375);oval(c,0,6,29,6,'#30271922');
 // Both pairs share the same jointed bones and broad, split feet.
 function leg(side,rear){const stride=walk*(rear?-1:1),knee=[side*(rear?25:14)+stride*side*3,rear?-21:-13],foot=[side*(rear?36:21)+stride*side*5,rear?-3:5];boneLink(c,[side*2,-39],knee,3);boneLink(c,knee,foot,3);shape(c,[[foot[0]-side*5,foot[1]-3],[foot[0]+side*5,foot[1]-2],[foot[0]+side*10,foot[1]+9],[foot[0]+side*1,foot[1]+4],[foot[0]-side*8,foot[1]+7]],bone);}
 for(const rear of [true,false])for(const side of [-1,1])leg(side,rear);
 c.translate(shake,breathe);
 // Wide top and tapering chin preserve the drawing's unusual inverted triangle.
 c.save();c.translate(0,-39);c.rotate(screaming?Math.sin(clock*35)*.025:walk*.025);shape(c,[[-32,-58],[-25,-62],[26,-60],[33,-56],[28,-43],[18,-30],[10,-15],[0,1],[-10,-15],[-20,-31],[-29,-45]],bone);shape(c,[[23,-52],[27,-44],[16,-28],[0,0],[8,-26]],shade);
 // Mouth sits on the top edge; the upper jaw lifts upward when screaming.
 const open=screaming?12+Math.sin(clock*32)*1.5:3+Math.sin(clock*2)*.4;shape(c,[[-20,-60],[-12,-62-open],[11,-62-open],[21,-60],[13,-56],[-12,-56]],'#252119');line(c,[[-20,-60],[-12,-62-open],[11,-62-open],[21,-60]],bone,2.4);for(let i=0;i<5;i++){const x=-13+i*6;shape(c,[[x,-57],[x+3,-57],[x+1.5,-60]],'#f3e7c3');}if(screaming)for(let i=0;i<4;i++){const x=-10+i*6;shape(c,[[x,-61-open],[x+3,-61-open],[x+1.5,-57-open]],'#f3e7c3');}
 line(c,[[-6,-36],[-1,-31],[2,-24]],shade,1.1);c.restore();
 if(screaming){for(let i=0;i<3;i++){const r=20+((clock-e.screamStarted)*70+i*24)%85;c.beginPath();c.ellipse(0,-103,r,r*.55,0,0,7);c.strokeStyle='#a595b0';c.globalAlpha=(1-(r-20)/85)*.6;c.lineWidth=2;c.stroke();}c.globalAlpha=1;}
 c.fillStyle=ink;c.fillRect(-30,-128,60,5);c.fillStyle='#c7bb8a';c.fillRect(-29,-127,58*Math.max(0,e.hp/e.maxHp),3);c.restore();}
 return{draw};
})();
