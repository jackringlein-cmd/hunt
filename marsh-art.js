// Hand-drawn scenery traced in Jack's original coordinates, then turned clockwise.
window.MarshArt={draw(c,game){
 const turn=([x,y])=>[(714-y)*1100/714,x*720/511];
 const line=(pts,color,w)=>{c.beginPath();c.moveTo(...pts[0]);for(const p of pts.slice(1))c.lineTo(...p);c.lineJoin='round';c.lineCap='round';c.strokeStyle=color;c.lineWidth=w;c.stroke();};
 const blob=(pts,color,outline)=>{c.beginPath();for(let i=0;i<pts.length;i++){const a=pts[(i+pts.length-1)%pts.length],b=pts[i],d=pts[(i+1)%pts.length],entry=[b[0]*.85+a[0]*.15,b[1]*.85+a[1]*.15],exit=[b[0]*.85+d[0]*.15,b[1]*.85+d[1]*.15];i?c.lineTo(...entry):c.moveTo(...entry);c.quadraticCurveTo(...b,...exit);}c.closePath();c.fillStyle=color;c.fill();if(outline){c.strokeStyle=outline;c.lineWidth=2;c.stroke();}};
 c.fillStyle='#892bc1';c.fillRect(0,0,1100,720);
 let seed=371;const rand=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
 // Soft soil patches disappear into the purple ground instead of hard pink outlines.
 for(const [x,y,rx,ry]of [[49,47,38,65],[48,266,30,46],[131,281,52,35],[238,184,80,35],[123,556,70,43],[338,516,70,23],[38,618,38,60]]){const [px,py]=turn([x,y]);c.save();c.translate(px,py);c.scale(ry*1.54,rx*1.4);const g=c.createRadialGradient(0,0,0,0,0,1);g.addColorStop(0,'#d57aaa66');g.addColorStop(.45,'#b765bd44');g.addColorStop(1,'#b765bd00');c.fillStyle=g;c.fillRect(-1,-1,2,2);c.restore();}
 for(let i=0;i<1250;i++){const x=rand()*1100,y=rand()*720;if(game.nearest(x,y).distance<35||game.inWater(x,y))continue;c.fillStyle=i%3?'#b583cc38':'#452a6e38';c.beginPath();c.ellipse(x,y,1+rand()*3,1+rand()*1.5,0,0,7);c.fill();if(i%9===0)line([[x-3,y],[x-1,y-5],[x,y],[x+4,y-4]],'#64447f',1);}

 for(const pool of game.map.water){blob(pool,'#145aa9','#2863bc');c.save();c.clip();const xs=pool.map(p=>p[0]),ys=pool.map(p=>p[1]),left=Math.min(...xs),right=Math.max(...xs),top=Math.min(...ys),bottom=Math.max(...ys);for(let y=top+15;y<bottom;y+=34){const pts=[];for(let x=left;x<=right;x+=9)pts.push([x,y+Math.sin(x*.045+y)*7]);line(pts,'#347bd2',3);}c.restore();}
 // Layered leaf canopies, curved branches and individual leaf veins.
 for(const [sx,sy,scale]of [[180,216,1],[306,41,.6]]){
  const [x,y]=turn([sx+25,sy]);c.save();c.translate(x,y);c.scale(scale,scale);
  c.fillStyle='#33224e40';c.beginPath();c.ellipse(4,43,64,20,0,0,7);c.fill();
  blob([[-15,44],[-8,27],[-11,5],[-6,-24],[8,-32],[12,-14],[5,9],[9,29],[18,44],[5,41],[-3,46]],'#be3e35','#5b242c');
  line([[-4,38],[-6,16],[-3,-3],[0,-22]],'#ed7959',3);
  line([[3,34],[0,22],[3,10]],'#782732',2);
  line([[-10,40],[-3,30]],'#782732',1.5);
  for(const y of [-9,5,20])line([[-6,y],[-1,y+3],[5,y]],'#8c2c30',1.4);
  for(const side of [-1,1]){line([[-2,16],[side*29,-9],[side*45,-29]],'#61252b',10);line([[-2,16],[side*29,-9],[side*45,-29]],'#d94d3c',6);}
  for(let j=0;j<65;j++){const a=j*2.399,r=Math.sqrt(j/65),lx=Math.cos(a)*69*r,ly=-46+Math.sin(a)*50*r;if(Math.abs(lx)<18&&ly>-13)continue;c.save();c.translate(lx,ly);c.rotate(a*.4);const color=['#472264','#612779','#793890','#9650a6','#af6cba'][j%5];c.beginPath();c.moveTo(-13,5);c.bezierCurveTo(-14,-7,0,-14,13,-8);c.bezierCurveTo(14,5,0,13,-13,5);c.fillStyle=color;c.fill();c.strokeStyle='#50235f';c.lineWidth=1;c.stroke();line([[-10,4],[0,-1],[10,-6]],'#c08ac0',1);line([[-3,1],[-5,-5]],'#c08ac080',.8);line([[3,-3],[6,3]],'#c08ac080',.8);c.restore();}
  for(const [mx,my]of [[-35,39],[30,45],[42,32]]){line([[mx,my],[mx,my-9]],'#dec0b1',3);c.fillStyle='#a84473';c.strokeStyle='#643552';c.lineWidth=1.2;c.beginPath();c.ellipse(mx,my-11,9,6,0,Math.PI,Math.PI*2);c.closePath();c.fill();c.stroke();c.fillStyle='#efb0c7';c.fillRect(mx-3,my-15,2,2);c.fillRect(mx+3,my-13,2,2);}
  c.restore();
 }
 line(game.map.points,'#59403e',62);line(game.map.points,'#957254',57);line(game.map.points,'#c5a276',49);
 for(let d=12;d<game.length;d+=19){const p=game.position(d),q=game.position(d+3),angle=Math.atan2(q.y-p.y,q.x-p.x),offset=(rand()-.5)*36;c.save();c.translate(p.x-Math.sin(angle)*offset,p.y+Math.cos(angle)*offset);c.rotate(angle);c.fillStyle=d%3?'#ead1a077':'#83604877';c.beginPath();c.ellipse(0,0,2+rand()*3,1+rand()*2,0,0,7);c.fill();c.restore();}

 // One route through each crossing; small footprints show the direction near the entrance.
 for(const d of [55,80,105]){const p=game.position(d),q=game.position(d+5),angle=Math.atan2(q.y-p.y,q.x-p.x);c.save();c.translate(p.x,p.y);c.rotate(angle);c.fillStyle='#79573d';c.beginPath();c.ellipse(0,-5,4,2,0,0,7);c.ellipse(9,5,4,2,0,0,7);c.fill();c.restore();}
},village(c){
 for(const [x,y,s]of [[1040,275,.65],[1080,373,.6],[1044,200,.7]]){c.save();c.translate(x,y);c.scale(s,s);c.fillStyle='#efdfb1';c.strokeStyle='#231b26';c.lineWidth=2;c.beginPath();c.roundRect(-22,-20,44,33,3);c.fill();c.stroke();c.fillStyle='#652a5e';c.beginPath();c.moveTo(-29,-20);c.lineTo(0,-46);c.lineTo(29,-20);c.closePath();c.fill();c.stroke();c.fillStyle='#654d3b';c.fillRect(-5,-3,10,16);c.fillStyle='#fff1ac';c.fillRect(9,-13,7,7);c.restore();}c.fillStyle='#fff8d9';c.textAlign='left';c.font='11px Georgia';c.fillText('THE VILLAGE',1000,408);
}};
