/* Original fantasy characters, using the supplied image's rough, hand-inked storybook style. */
(function(){
 const ink='#171713';
 function poly(c,p,color,edge=ink,w=2){
  // Ease around each corner with a short curve instead of a sharp point.
  c.beginPath();
  for(let i=0;i<p.length;i++){
   const prev=p[(i+p.length-1)%p.length],v=p[i],next=p[(i+1)%p.length];
   const before=Math.hypot(v[0]-prev[0],v[1]-prev[1])||1,after=Math.hypot(next[0]-v[0],next[1]-v[1])||1;
   const r=Math.min(3.5,before*.24,after*.24);
   const enter=[v[0]+(prev[0]-v[0])*r/before,v[1]+(prev[1]-v[1])*r/before];
   const leave=[v[0]+(next[0]-v[0])*r/after,v[1]+(next[1]-v[1])*r/after];
   if(i)c.lineTo(...enter);else c.moveTo(...enter);
   c.quadraticCurveTo(v[0],v[1],leave[0],leave[1]);
  }
  c.closePath();c.fillStyle=color;c.fill();
  if(edge){c.strokeStyle=edge;c.lineWidth=w*1.05;c.lineJoin='round';c.lineCap='round';c.stroke();
   if(w>=2){c.save();c.clip();for(let i=0;i<p.length;i++){const [x,y]=p[i],next=p[(i+1)%p.length];const dx=next[0]-x,dy=next[1]-y,len=Math.hypot(dx,dy)||1;if(len>9){c.beginPath();c.moveTo(x+dx*.25-dy/len*2,y+dy*.25+dx/len*2);c.lineTo(x+dx*.66-dy/len*1.4,y+dy*.66+dx/len*1.4);c.strokeStyle='#27221c55';c.lineWidth=.65;c.stroke();}}c.restore();}
  }
 }
 function line(c,p,color,w=2){c.beginPath();p.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.strokeStyle=color;c.lineWidth=w;c.lineCap='round';c.lineJoin='round';c.stroke();}
 function oval(c,x,y,rx,ry,color,edge=ink,w=2){c.beginPath();c.ellipse(x,y,rx,ry,0,0,7);c.fillStyle=color;c.fill();if(edge){c.strokeStyle=edge;c.lineWidth=w;c.stroke();}}
 const themes={knight:['#a49d82','#555447','#b0523d'],archer:['#96905b','#4e5339','#b55d3f'],rogue:['#9b7b71','#53423e','#bd7960'],mage:['#989078','#565848','#c1a86b'],leader:['#b1865c','#624a34','#b3533d']};
 function draw(c,h,{time=0,selected=false,ghost=false,attack=0}={}){
  const tier=Math.max(...h.u),path=h.u.indexOf(tier),t=h.type;
  let [light,dark,accent]=themes[t];if(t==='mage'&&tier)[light,dark,accent]=[['#c99063','#78463c','#ffb350'],['#90d0e1','#396985','#bef2ff'],['#a298d9','#4e447c','#d5b5ff'],['#b38de0','#5d4180','#e5c0ff']][path];
  const pulse=Math.sin(attack*Math.PI),breathe=Math.sin(time*2.6+h.id)*.7,cloth=Math.sin(time*2.2+h.id)*1.5;
  c.save();c.translate(h.x,h.y);if(ghost)c.globalAlpha=.65;
  oval(c,3,10,23,8,'#152b3455',null);if(selected)oval(c,0,10,25,10,'#f5d99022','#ffe7a0',1.5);
  c.translate(pulse*2,breathe);
  // Compact proportions, chunky boots, and broad readable hands.
  poly(c,[[-11,-20],[-2,-25],[12,-20],[17+cloth,8],[11,5],[9,10],[4,5],[0,9],[-4,5],[-10,10],[-16+cloth,9]],t==='leader'?'#6c3e39':dark);
  for(const s of [-1,1]){poly(c,[[s*3,-2],[s*11,-1],[s*12,9],[s*4,10]],'#614231');poly(c,[[s*3,7],[s*12,6],[s*16,12],[s*15,16],[s*3,16]],'#8c4031');poly(c,[[s*5,8],[s*11,8],[s*12,10],[s*5,11]],'#b55741',null);line(c,[[s*5,14],[s*13,13]],'#d19c6d',1);}
  poly(c,[[-11,-22],[8,-24],[14,-15],[10,-1],[-9,1],[-15,-12]],dark);
  poly(c,[[-9,-21],[0,-23],[0,-4],[-10,-7]],light,null);poly(c,[[1,-22],[10,-18],[8,-6],[1,-4]],t==='leader'?'#7c7157':'#58676c',null);
  line(c,[[-10,-4],[10,-5]],'#342c26',4);poly(c,[[-2,-7],[3,-7],[3,-2],[-2,-2]],accent,ink,1);
  if(t!=='leader'){poly(c,[[-15,-21],[-7,-24],[-5,-17],[-13,-13],[-18,-15]],light);poly(c,[[9,-24],[17,-20],[18,-14],[11,-13],[7,-18]],dark);line(c,[[-14,-20],[-8,-22]],'#d3c49d',1);line(c,[[11,-21],[16,-18]],light,1);}
  else {line(c,[[-11,-20],[-17,-9]],light,7);line(c,[[11,-20],[15,-8]],dark,7);line(c,[[-8,-18],[-5,-8]],'#b4a078',1);}
  oval(c,-16,-8,5,5,t==='leader'?'#d5ad7f':'#874b36');oval(c,16,-8,5,5,t==='leader'?'#d5ad7f':'#874b36');
  // Oversized faceted hood/helmet around an expressive warm-colored face.
  if(t!=='leader'){
   poly(c,[[-20,-29],[-23,-45],[-18,-59],[-6,-66],[10,-63],[21,-52],[23,-34],[14,-24],[-8,-24]],'#493f32');
   poly(c,[[-18,-48],[-17,-57],[-5,-63],[7,-61],[14,-54],[7,-46]],light);
   poly(c,[[9,-61],[19,-51],[21,-37],[15,-29],[12,-46]],'#6d6250');
   poly(c,[[-21,-44],[-16,-48],[-13,-30],[-18,-29]],dark);
   line(c,[[-17,-56],[-5,-62],[7,-59]],'#d4c79e',1.1);
   poly(c,[[12,-53],[21,-48],[22,-43],[13,-47]],accent,null);
  }
  poly(c,[[-13,-46],[-5,-51],[8,-48],[15,-38],[12,-26],[3,-21],[-10,-26],[-16,-35]],'#ba8656');
  poly(c,[[-13,-44],[-5,-48],[4,-44],[-5,-28],[-11,-29],[-14,-36]],'#d3a16a',null);
  poly(c,[[8,-46],[14,-38],[11,-28],[3,-24],[4,-36]],'#946039',null);
  // Big white eyes with dark pupils, deliberately different original faces.
  const blink=(time+h.id*.57)%5.2<.12;
  if(blink){line(c,[[-11,-36],[-3,-35]],ink,2);line(c,[[3,-36],[10,-35]],ink,2);}else{
   poly(c,[[-12,-40],[-5,-40],[-2,-35],[-4,-29],[-10,-30]],'#f1e9c9','#9d662e',1);
   poly(c,[[1,-39],[8,-41],[12,-37],[10,-28],[3,-28],[0,-32]],'#f1e9c9','#9d662e',1);
   oval(c,-5,-35,2.1,3.4,'#5e3f24',null);oval(c,6,-34,2.8,4,'#5e3f24',null);oval(c,7,-36,1,1.2,'#fff',null);
  }
  line(c,[[-10,-42],[-4,-40]],'#342519',1.8);line(c,[[2,-41],[9,-43]],'#342519',1.8);line(c,[[-3,-26],[1,-25],[6,-27]],'#4b2c21',1.3);line(c,[[-10,-45],[-7,-48],[-5,-44]],'#573b28',1);
  if(t==='leader'){
   // Latest instruction: cloth only, bare head, empty hands, no banner or armor.
   poly(c,[[-16,-38],[-19,-46],[-15,-45],[-17,-51],[-10,-56],[-12,-59],[-3,-58],[0,-62],[5,-58],[12,-55],[11,-51],[17,-44],[13,-40],[10,-48],[5,-45],[3,-49],[-3,-45],[-7,-47],[-11,-44],[-13,-35]],'#4e3023');
   poly(c,[[-13,-50],[-8,-55],[0,-57],[8,-53],[0,-51],[-6,-47]],'#ab6b40',null);
   line(c,[[-9,-22],[-4,-17],[5,-18],[10,-22]],'#c1ab7c',1);
  }else if(t==='knight'){
   poly(c,[[-16,-28],[-10,-24],[-2,-23],[5,-25],[13,-29],[12,-22],[3,-17],[-10,-19]],light);line(c,[[-10,-22],[3,-20],[10,-24]],'#e0e5df',1);
   c.save();c.translate(20,-8);c.rotate(-pulse*1.7);
   poly(c,[[-4,7],[-4,-31],[0,-43],[5,-32],[4,7]],'#c3bfa8');poly(c,[[0,-40],[4,-31],[3,5],[0,5]],'#797764',null);line(c,[[-2,-29],[-2,3]],'#fff7df',1);
   line(c,[[-9,5],[9,5]],'#313a3e',7);line(c,[[-7,4],[7,4]],accent,3);line(c,[[0,9],[0,16]],'#4f3d2b',5);c.restore();
   poly(c,[[-28,-22],[-15,-25],[-9,-17],[-12,2],[-21,9],[-29,0],[-32,-13]],dark);poly(c,[[-26,-19],[-17,-21],[-13,-15],[-16,0],[-21,5],[-26,-1]],light);line(c,[[-21,-17],[-21,0]],accent,3);line(c,[[-26,-10],[-16,-10]],accent,3);
  }else if(t==='archer'){
   for(let i=0;i<3;i++){line(c,[[15+i*3,-16],[25+i*3,-43]],'#cab98f',1.5);poly(c,[[23+i*3,-38],[24+i*3,-47],[29+i*3,-44],[27+i*3,-37]],accent);}
   c.save();c.translate(-24,-12);c.rotate(pulse*.12);
   poly(c,[[0,-36],[-9,-30],[-15,-9],[-12,-3],[-17,18],[-8,33],[1,36],[4,29],[-2,27],[-7,17],[-3,-1],[-6,-7],[-2,-23],[6,-29]],'#574430');
   poly(c,[[-8,-28],[-12,-12],[-8,-9],[-4,-24],[2,-27]],'#9f8058',null);poly(c,[[-10,13],[-12,18],[-5,29],[0,30],[-6,19]],'#866e47',null);
   line(c,[[3,-29],[-4+pulse*9,-1],[1,30]],'#c4b68f',1);line(c,[[-7,-24],[-4,-30]],accent,2.5);line(c,[[-8,23],[-3,29]],accent,2.5);
   for(const [x,y] of [[-9,-9],[-10,14],[-1,31]])oval(c,x,y,2,2,'#20282a','#a7aaa0',1);
   line(c,[[-22,-1],[24,-1]],'#1f282a',5);line(c,[[-20,-2],[22,-2]],accent,2);poly(c,[[-25,-1],[-16,-7],[-17,3]],'#c6d0ca');c.restore();
   line(c,[[-12,-16],[5,-5]],'#2f3330',7);line(c,[[-11,-17],[4,-6]],accent,2);
  }else if(t==='rogue'){
   poly(c,[[-12,-29],[-5,-26],[4,-26],[12,-30],[10,-20],[2,-17],[-9,-22]],dark);line(c,[[-8,-25],[2,-21],[8,-24]],accent,1.5);
   for(const s of [-1,1]){c.save();c.translate(s*20,-5);c.rotate(s*pulse*1.5);poly(c,[[-3,7],[-3,-15],[0,-25],[4,-16],[3,7]],'#c5bea0');poly(c,[[0,-23],[4,-16],[2,4],[0,4]],'#7b7761',null);line(c,[[-7,4],[7,4]],accent,3);c.restore();}
  }else{
   poly(c,[[-18,-49],[-8,-65],[-2,-78],[7,-67],[15,-47],[22,-44],[-20,-43],[-25,-45]],dark);poly(c,[[-7,-63],[-2,-73],[3,-65],[7,-48],[-3,-49]],light,null);line(c,[[-18,-47],[15,-46]],accent,3);
   const cast=pulse*7;line(c,[[24,14],[24,-42-cast]],'#232d31',7);line(c,[[23,12],[23,-41-cast]],'#947d56',3);
   poly(c,[[17,-44-cast],[19,-56-cast],[25,-62-cast],[32,-53-cast],[30,-42-cast],[24,-36-cast]],accent);poly(c,[[19,-53-cast],[25,-59-cast],[25,-42-cast]],'#eddfad',null);poly(c,[[26,-58-cast],[31,-52-cast],[27,-43-cast]],light,null);oval(c,24,-48-cast,14+Math.sin(time*3),17,accent+'22',null);
  }
  // Short ink hatching ties clothing and equipment to the drawn reference.
  for(const side of [-1,1])for(let i=0;i<3;i++)line(c,[[side*(5+i*2),-13+i],[side*(7+i*2),-10+i]],'#211a1588',.65);
  // Cloth embroidery for leaders; additional trim and gems for other classes.
  if(tier>=3){line(c,[[-8,-2],[8,-3]],accent,1.4);oval(c,0,-16,2.5,3,accent,ink,1);}
  if(tier>=5&&t!=='leader')for(const s of [-1,1])line(c,[[s*10,-21],[s*15,-17]],accent,2);
  if(tier===6){oval(c,0,10,26,10,'#fff0a30c',accent+'aa',1);for(let i=0;i<3;i++)oval(c,Math.cos(time+i*2.1)*25,-15+Math.sin(time+i*2.1)*21,2,2,accent,null);}
  c.restore();
 }
 window.HeroicCharacters={draw};
})();
