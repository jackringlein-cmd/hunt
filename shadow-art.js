window.ShadowArt=(()=>{
 const ink='#14120d',skin='#30322f';
 // Flat charcoal fills and irregular rounded contours match the other undead.
 function shape(c,p,color){c.beginPath();for(let i=0;i<p.length;i++){const a=p[(i+p.length-1)%p.length],b=p[i],n=p[(i+1)%p.length];const entry=[b[0]*.8+a[0]*.2,b[1]*.8+a[1]*.2],leave=[b[0]*.8+n[0]*.2,b[1]*.8+n[1]*.2];if(i)c.lineTo(...entry);else c.moveTo(...entry);c.quadraticCurveTo(b[0],b[1],...leave);}c.closePath();c.fillStyle=color;c.fill();c.strokeStyle=ink;c.lineWidth=1.7;c.lineJoin='round';c.stroke();}
 function oval(c,x,y,rx,ry,fill){c.beginPath();for(let i=0;i<24;i++){const a=i/24*Math.PI*2,r=1+Math.sin(i*1.7)*.03,px=x+Math.cos(a)*rx*r,py=y+Math.sin(a)*ry*r;i?c.lineTo(px,py):c.moveTo(px,py);}c.closePath();c.fillStyle=fill;c.fill();c.strokeStyle=ink;c.lineWidth=2;c.stroke();}
 function limb(c,p,color,w){c.beginPath();c.moveTo(...p[0]);for(const v of p.slice(1))c.lineTo(...v);c.lineCap='round';c.lineJoin='round';c.strokeStyle=ink;c.lineWidth=w+3;c.stroke();c.strokeStyle=color;c.lineWidth=w;c.stroke();}
 function draw(c,e,time){const age=e.shadowAge||0,phase=Math.max(0,age-5)%7,immune=age>=5&&phase<5,enter=immune?Math.min(1,phase/.65):0,exit=age>=10&&!immune?Math.min(1,(phase-5)/.65):1,visible=immune?1-enter:exit,walk=Math.sin(e.p*.09);c.save();c.translate(e.x,e.y);
 oval(c,0,6,immune?31:23,immune?9:6,immune?'#171914':'#24251e55');
 if(immune){for(let i=0;i<3;i++){c.beginPath();c.ellipse(0,6,18+i*6+Math.sin(age*8+i)*2,3+i*2,0,0,Math.PI*2);c.strokeStyle='#727b6566';c.lineWidth=1.5;c.stroke();}if(enter===1){for(const side of [-1,1])oval(c,side*7,4,3,1.2,'#d6d6a0');}}
 if(visible>0){c.save();c.beginPath();c.rect(-65,-120,130,130);c.clip();const sinking=(1-visible)*77;c.translate(0,sinking);const crawl=age>=10&&!immune?1-exit:0;c.rotate(crawl*.2);
 for(const side of [-1,1]){const foot=side*11+walk*side*3;limb(c,[[side*4,-15],[side*8+walk*side*2,-4],[foot,8]],'#252722',3);oval(c,side*8+walk*side*2,-4,2.4,2.3,skin);limb(c,[[foot,8],[foot+side*7,9]],skin,2.7);}
 // Sunken belly, narrow pelvis, protruding ribs and shoulders.
 shape(c,[[-9,-44],[-3,-48],[5,-46],[10,-40],[8,-31],[4,-24],[4,-17],[7,-13],[2,-11],[-5,-13],[-4,-24],[-8,-32]],skin);
 limb(c,[[-7,-42],[0,-39],[7,-41]],'#686b5c',1.2);
 limb(c,[[0,-38],[1,-28]],'#5e6255',1);
 for(let i=0;i<3;i++)for(const side of [-1,1])limb(c,[[side*2,-36+i*3],[side*(7-i*.6),-35+i*3]],'#737565',1);
 shape(c,[[-3,-26],[3,-26],[2,-18],[-2,-18]],'#191b18');
 for(const side of [-1,1]){const x=side*(21+crawl*13),y=-5-crawl*36;limb(c,[[side*9,-41],[side*17,-25-crawl*12],[x,y]],skin,3);oval(c,side*17,-25-crawl*12,2.4,2.4,'#44483d');for(let k=0;k<3;k++)limb(c,[[x+(k-1)*2,y],[x+(k-1)*4,y+7],[x+(k-1)*4-1,y+10]],'#858672',1);}
 c.translate(3,-53+walk*.5);shape(c,[[-8,-10],[-3,-15],[5,-14],[10,-8],[8,0],[5,5],[4,11],[-2,12],[-5,7],[-8,2],[-10,-4]],skin);
 for(const side of [-1,1]){oval(c,side*4,-3,3.1,4.2,'#131510');oval(c,side*4,-2,1.2,1.8,'#d7d2a0');}
 // Hollow cheeks and a pinched jaw, with the game's small cream teeth.
 limb(c,[[-7,2],[-3,5]],'#11140f',2);limb(c,[[7,2],[4,5]],'#11140f',2);oval(c,0,7,2.8,3.2,'#12140f');limb(c,[[-2,5],[2,5]],'#b8b398',1.2);limb(c,[[-6,-10],[-1,-13],[6,-11]],'#55594c',1);
 c.restore();}
 // A dark lip covers the sinking feet and rising hands.
 if(immune||exit<1)oval(c,0,10,30,3,'#171914');
 c.fillStyle='#272130';c.fillRect(-23,-83,46,5);c.fillStyle=immune?'#b18ddb':'#b6cb8b';c.fillRect(-22,-82,44*Math.max(0,e.hp/e.maxHp),3);c.restore();}
 return{draw};
})();
