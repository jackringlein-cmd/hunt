/* Each path contributes its own visible equipment. Both paths remain visible. */
(function(){
 const ink='#20170f';
 function line(c,p,color=ink,w=1.5){c.beginPath();c.moveTo(...p[0]);for(let i=1;i<p.length;i++)c.lineTo(...p[i]);c.lineJoin='round';c.lineCap='round';c.strokeStyle=color;c.lineWidth=w;c.stroke();}
 function shape(c,p,color){c.beginPath();for(let i=0;i<p.length;i++){const a=p[(i+p.length-1)%p.length],b=p[i],d=p[(i+1)%p.length],enter=[b[0]*.9+a[0]*.1,b[1]*.9+a[1]*.1],leave=[b[0]*.9+d[0]*.1,b[1]*.9+d[1]*.1];if(i)c.lineTo(...enter);else c.moveTo(...enter);c.quadraticCurveTo(...b,...leave);}c.closePath();c.fillStyle=color;c.fill();c.strokeStyle=ink;c.lineWidth=1.2;c.lineJoin='round';c.stroke();}
 function circle(c,x,y,r,color){c.beginPath();c.arc(x,y,r,0,7);c.fillStyle=color;c.fill();c.strokeStyle=ink;c.lineWidth=1;c.stroke();}
 function sword(c,x,y,n,color,angle=0){c.save();c.translate(x,y);c.rotate(angle);const len=15+n*4,width=2+n*.45;shape(c,[[-width,3],[-width,-len],[0,-len-5],[width,-len],[width,3]],color);line(c,[[-width-4,3],[width+4,3]],'#986819',3);line(c,[[0,5],[0,12]],'#634322',3);for(let i=0;i<n;i++)line(c,[[-width+1,-5-i*4],[width-1,-7-i*4]],'#56696a',.7);c.restore();}
 function bottle(c,x,y,n,color){shape(c,[[x-2,y-10],[x+2,y-10],[x+2,y-6],[x+5+n*.4,y-3],[x+5+n*.4,y+6],[x-5-n*.4,y+6],[x-5-n*.4,y-3],[x-2,y-6]],color);line(c,[[x-3,y-10],[x+3,y-10]],'#79562e',3);for(let i=0;i<n;i++)line(c,[[x-3,y+4-i*2],[x,y+4-i*2]],'#f5edba',.7);}
 const accents={knight:['#9fc3d4','#c37245','#748aa5','#eac771'],archer:['#b0894c','#a8513e','#73a6a6','#bca665'],rogue:['#aab6b9','#90ad50','#a1875a','#d5aa38'],leader:['#b36546','#855071','#61899b','#cfad51'],mage:['#d87837','#8ac8db','#a897d1','#ba8fbe']};
 // Broad clothing changes make even the first purchases readable at game size.
 const cloths={knight:['#426a87','#a74536','#384b73','#e1ce8d'],archer:['#86602f','#b34836','#3e9195','#637539'],rogue:['#454961','#52782c','#876335','#b48229'],leader:['#9e4938','#71436f','#447b90','#a58032'],mage:['#b44b25','#74b6d3','#6054a2','#a05caa']};
 function main(h){return h.u.indexOf(Math.max(...h.u));}
 function cloth(h,fallback){return Math.max(...h.u)?cloths[h.type][main(h)]:fallback;}
 function back(c,h,time){
  const n=Math.max(...h.u);if(n<2)return;const p=main(h),color=cloths[h.type][p],sway=Math.sin(time*3+h.id)*2;
  // Successive tiers replace the cloak outline, rather than adding tiny marks.
  const width=[0,0,16,21,25,29,33][n],bottom=[0,0,-8,0,6,10,13][n];
  shape(c,[[-10,-33],[-width,-19],[-width-2+sway,bottom],[-width/2,bottom-4],[0,bottom+2],[width/2,bottom-4],[width+sway,bottom],[width,-18],[10,-33]],color);
  line(c,[[-width+2,-15],[-width+sway,bottom-3],[-width/2,bottom-7],[0,bottom-1],[width/2,bottom-7],[width-2+sway,bottom-3],[width-2,-15]],n>=5?'#f5dda0':accents[h.type][p],n>=4?3:2);
  if(n>=4)for(const side of [-1,1])line(c,[[side*12,-26],[side*(width-7),bottom-8]],'#261e304d',2);
 }
 function costume(c,h,time){
  const used=h.u.map((n,p)=>({n,p})).filter(v=>v.n);
  for(let k=0;k<used.length;k++){
   const {n,p}=used[k],color=cloths[h.type][p],trim=accents[h.type][p];
   // Two upgraded paths own opposite halves of the coat, so neither disappears.
   const x=used.length===1?-11:k===0?-11:1,w=used.length===1?22:10;
   shape(c,[[x,-30],[x+w,-30],[x+w+1,-9],[x+w-2,-3],[x,-5]],color);
   line(c,[[x+2,-27],[x+2,-7]],trim,3);
   if(n>=2){shape(c,[[x,-13],[x+w,-13],[x+w,-6],[x,-6]],'#4c3429');circle(c,x+w/2,-10,3,trim);}
   if(n>=3){const side=used.length===1?(p%2?1:-1):k===0?-1:1;shape(c,[[side*9,-33],[side*20,-32],[side*25,-22],[side*12,-23]],color);line(c,[[side*12,-30],[side*20,-28],[side*22,-24]],trim,3);}
   if(n>=4){for(const side of (used.length===1?[-1,1]:[k===0?-1:1])){shape(c,[[side*3,1],[side*12,1],[side*13,9],[side*3,10]],color);line(c,[[side*4,3],[side*11,3]],trim,3);}}
   if(n>=5){shape(c,[[x-1,-32],[x+w/2,-36],[x+w+1,-32],[x+w/2,-25]],'#f3deb0');circle(c,x+w/2,-30,3,trim);}
   if(n===6){for(let i=0;i<3;i++){const a=time*.9+i*Math.PI*2/3;circle(c,Math.cos(a)*28,-21+Math.sin(a)*8,2.3,trim);}}
  }
 }
 function signature(c,h,p,n,color,time,pulse){
  const t=h.type;
  if(t==='knight'){
   if(p===0&&n>=2){c.save();c.translate(24,-8);c.rotate(-pulse*1.5);shape(c,[[-4,0],[-5-n,-22-n*4],[0,-33-n*4],[5+n,-22-n*4],[4,0]],n>=4?'#c6dde1':color);line(c,[[0,-5],[0,-27-n*4]],color,3);c.restore();}
   if(p===1&&n>=2){for(const side of [-1,1])shape(c,[[side*8,-73],[side*(12+n*2),-84-n],[side*(15+n*2),-77],[side*15,-68]],color);}
   if(p===2&&n>=3){const w=10+n*2;shape(c,[[-26-w,-31],[-26+w,-31],[-26+w,-7],[-26,12],[-26-w,-7]],color);shape(c,[[-32,-22],[-20,-22],[-20,-11],[-26,-5],[-32,-11]],'#e6d08b');}
   if(p===3&&n>=2){for(const side of [-1,1])shape(c,[[side*10,-70],[side*20,-75],[side*(20+n*2),-86],[side*(16+n),-65],[side*12,-63]],'#f3dfa1');}
  }else if(t==='archer'){
   if(p===0&&n>=2){for(const y of [-32,2])shape(c,[[30,y],[38+n,y-9],[43+n,y],[36,y+6]],n>=4?'#ddd6a3':color);}
   if(p===1&&n>=2){shape(c,[[-36,-22],[-22,-25],[-20,4],[-34,7]],'#744533');for(let i=0;i<Math.min(n,4);i++){const x=-33+i*4;line(c,[[x,-6],[x-1,-34-i%2*5]],'#e8d099',2);shape(c,[[x-4,-34-i%2*5],[x-1,-41-i%2*5],[x+2,-34-i%2*5]],n>=4?'#ed9d42':color);}if(n>=4)circle(c,-28,-9,5,'#efb047');}
   if(p===2){const elem=['#ed833b','#9de0e5','#cfb4fb'][Math.min(2,n-1)];shape(c,[[31,-29],[38,-42-n],[46,-30],[39,-22]],elem);if(n>=3)line(c,[[40,-42],[47,-34],[41,-28],[48,-20]],'#e5d4ff',3);if(n>=4)circle(c,38,-9,5,'#9de0e5');if(n>=5)circle(c,32,3,5,'#ed833b');}
   if(p===3&&n>=2){shape(c,[[10,-74],[21,-85-n],[26,-80],[21,-69]],color);if(n>=3){line(c,[[23,-26],[41,-26]],'#433828',8);line(c,[[23,-26],[41,-26]],'#dfbc6b',5);circle(c,42,-26,4,'#a4d8da');}}
  }else if(t==='rogue'){
   if(p===0&&n>=2){sword(c,-26,-4,n,'#d4d5e1',-.3-pulse);if(n>=4)shape(c,[[-13,-44],[0,-47],[12,-44],[8,-35],[-8,-35]],color);}
   if(p===1&&n>=2){bottle(c,-31,-17,n,'#9dc353');if(n>=3)bottle(c,20,-9,n-2,'#ccdc78');if(n>=5){circle(c,-31,-39,4,'#b8d87b');circle(c,-24,-47,3,'#b8d87b');}}
   if(p===2&&n>=2){shape(c,[[-34,-22],[-18,-22],[-18,4],[-35,5]],'#795b36');for(let i=0;i<n;i++){const x=-34+i*3;shape(c,[[x,-15],[x+2,-25],[x+4,-15]],'#c9c9ba');}if(n>=4)circle(c,-26,-2,7,'#b9bdac');}
   if(p===3&&n>=2){shape(c,[[15,-23],[32,-22],[36,2],[30,10],[14,7]],'#a0712e');circle(c,25,-5,7,'#efcc68');if(n>=3){circle(c,-21,-7,7,'#d5aa38');line(c,[[-25,-9],[-17,-9]],'#765125',2);}if(n>=5)shape(c,[[-13,-68],[-17,-81],[-7,-76],[0,-84],[7,-76],[15,-80],[12,-68]],'#e1bd62');}
  }else if(t==='leader'){
   // Keep Jack's winter hat, boots and empty hands. Only soft cloth and supplies.
   if(p===0){shape(c,[[-12,-32],[-5,-33],[12,-8],[7,-2]],color);if(n>=2)circle(c,7,-14,4+n*.5,'#efd496');if(n>=4)for(let i=0;i<3;i++)line(c,[[5+i*3,-11],[6+i*3,-2]],color,2);}
   if(p===1){const sway=Math.sin(time*3)*3;shape(c,[[-13,-34],[12,-34],[15,-29],[6,-25],[-11,-27]],color);shape(c,[[-12,-29],[-20,-24],[-25+sway,-5-n*3],[-16+sway,-7-n*3],[-10,-26]],color);if(n>=3)line(c,[[-22+sway,-8-n*3],[-16+sway,-10-n*3]],'#e1c8ab',4);}
   if(p===2&&n>=2){shape(c,[[-34,-25],[-18,-27],[-17,3],[-33,5]],'#e8dab4');line(c,[[-30,-19],[-23,-15],[-29,-9],[-22,-3]],'#517e8b',2);if(n>=4)circle(c,17,-23,6,'#f4d98b');}
   if(p===3&&n>=2){shape(c,[[16,-19],[32,-17],[35,4],[28,10],[16,7]],'#976937');circle(c,25,-4,6,'#f2cf74');if(n>=3)shape(c,[[-30,-13],[-18,-15],[-16,6],[-29,8]],'#d7ba7a');}
   if(n>=5){for(const x of [-14,14])circle(c,x,-72,3,color);line(c,[[-12,-77],[0,-79],[12,-77]],color,3);}
  }else if(t==='mage'){
   const x=25,y=-46-pulse*10;
   if(p===0){shape(c,[[x-8,y+3],[x-10,y-8],[x-4,y-4],[x,y-14-n*2],[x+5,y-6],[x+10,y-10],[x+9,y+3],[x,y+7]],'#ea893d');if(n>=3)shape(c,[[x-4,y+2],[x,y-11],[x+4,y+2]],'#ffe39a');}
   if(p===1){shape(c,[[x-9,y],[x,y-14-n*2],[x+9,y],[x,y+8]],'#a4e1e7');if(n>=3)for(const side of [-1,1])shape(c,[[side*11,-62],[side*18,-77],[side*21,-61]],'#bdebf0');}
   if(p===2){shape(c,[[x-3,y-13-n],[x+9,y-13-n],[x+2,y-2],[x+10,y-2],[x-6,y+14],[x-1,y+1],[x-9,y+1]],'#f1d49a');if(n>=3)line(c,[[-14,-68],[-4,-73],[-9,-78],[2,-83]],'#ddd0ff',3);}
   if(p===3){circle(c,x,y,7+n,'#b786d3');circle(c,x,y,3+n*.4,'#f1d8ff');if(n>=2){shape(c,[[-37,-18],[-19,-22],[-15,2],[-34,7]],'#795185');line(c,[[-33,-14],[-28,1]],'#ebd9b4',3);}if(n>=4){c.strokeStyle='#dcc4ed';c.lineWidth=2;c.beginPath();c.ellipse(x,y,12+n,5+n*.5,-.4,0,7);c.stroke();}}
  }
 }
 function draw(c,h,time,pulse){
  const u=h.u,colors=accents[h.type];
  costume(c,h,time);
  for(let p=0;p<4;p++){
   const n=u[p];if(!n)continue;const color=colors[p];
   if(h.type==='knight'){
    if(p===0){sword(c,24,-8,n,color,-pulse*1.5);if(n>=5){line(c,[[17,8],[29,8]],'#463b27',4);}}
    if(p===1){sword(c,-17,-3,n,'#c8c8ae',-.3+pulse);shape(c,[[-14,9],[-14-n,5],[-10,6],[-8,10]],color);for(let i=0;i<n;i++)line(c,[[-10+i*3,-73],[-12+i*3,-80-i%2*3]],color,2);}
    if(p===2){const w=9+n*1.2;shape(c,[[-25-w,-25-n],[-25+w,-25-n],[-23+w,-5],[-25,5+n],[-27-w,-5]],color);line(c,[[-25,-22-n],[-25,1+n]],'#e6d08b',2);for(let i=0;i<n;i++)line(c,[[-29,-18+i*3],[-21,-18+i*3]],'#e6d08b',1);}
    if(p===3){shape(c,[[-7,-29],[7,-29],[6,-8],[0,-5],[-6,-8]],'#ede1b2');line(c,[[0,-26],[0,-10]],color,2);line(c,[[-4,-19],[4,-19]],color,2);c.strokeStyle=color;c.lineWidth=1+n*.2;c.beginPath();c.ellipse(0,-82-n,11+n,3+n*.35,0,0,7);c.stroke();for(let i=0;i<n;i++)line(c,[[-8+i*3,-6],[-8+i*3,-3]],color,1.5);}
   }else if(h.type==='archer'){
    if(p===0){c.beginPath();c.moveTo(27,-36-n*2);c.quadraticCurveTo(46+n*2,-12,26,9+n);c.strokeStyle=ink;c.lineWidth=4+n*.5;c.stroke();c.strokeStyle=color;c.lineWidth=2+n*.35;c.stroke();for(let i=0;i<n;i++)line(c,[[35+i%2*3,-30+i*6],[40+i%2*3,-32+i*6]],'#e5cb93',1);}
    if(p===1){shape(c,[[-23,-17],[-13,-18],[-12,-1],[-23,1]],'#744533');for(let i=0;i<n;i++){const x=-24+i*2.5;line(c,[[x,0],[x-3,-25-i%2*4]],'#473b20',1.3);shape(c,[[x-5,-25-i%2*4],[x-3,-30-i%2*4],[x-1,-25-i%2*4]],color);}if(n>=4)circle(c,-16,-12,3,'#e69a39');}
    if(p===2){for(let i=0;i<n;i++){const x=-11+i*4;shape(c,[[x,-71],[x-2,-76-i%2*3],[x,-80-i%2*3],[x+2,-76-i%2*3]],['#de743c','#91ced4','#b39bdd'][i%3]);}line(c,[[10,-13],[38,-13]],color,2+n*.2);circle(c,38,-13,2+n*.4,color);}
    if(p===3){circle(c,6,-51,6+n*.45,'#cfddd0');circle(c,6,-51,3,'#3f4d3e');line(c,[[12,-51],[16,-48]],'#4e3a18',1);for(let i=0;i<n;i++)shape(c,[[6+i*3,-72],[9+i*3,-82-i],[11+i*3,-74]],color);}
   }else if(h.type==='rogue'){
    if(p===0){sword(c,25,-3,n,color,pulse*.7);for(let i=0;i<n;i++)line(c,[[-9+i*3,-22],[-8+i*3,-18]],'#dfc9a1',1);}
    if(p===1){bottle(c,-18,-13,n,color);if(n>=3){circle(c,-15,-29,2,'#b4d45a');circle(c,-23,-33,1+n*.2,'#b4d45a');}}
    if(p===2){shape(c,[[-12,1],[-3,-1],[3,5],[0,11],[-12,9]],'#94784e');for(let i=0;i<n;i++)shape(c,[[-12+i*2.5,5],[-11+i*2.5,-2-i%2*2],[-9+i*2.5,5]],'#b9bbae');}
    if(p===3){shape(c,[[8,-3],[19,-5],[22,5+n],[9,8+n]],'#87602e');for(let i=0;i<n;i++)circle(c,11+i%3*3,2+Math.floor(i/3)*4,1.7,'#e6c057');line(c,[[8,-3],[19,-5]],'#d9bb6b',2);}
   }else if(h.type==='leader'){
    // Cloth decorations and useful belongings only; never armor or banners.
    if(p===0){shape(c,[[-11,-30],[-6,-32],[10,-9],[6,-5]],color);for(let i=0;i<n;i++)line(c,[[-8+i*2.6,-27+i*3],[-5+i*2.6,-29+i*3]],'#f1d79d',1.2);}
    if(p===1){shape(c,[[-8,-35],[8,-35],[11,-30],[5,-27],[-8,-30]],color);shape(c,[[-9,-31],[-14,-28],[-15,-9-n*2],[-10,-13-n*2]],color);for(let i=0;i<n;i++)line(c,[[-15,-11-i*2],[-11,-12-i*2]],'#d9b894',.8);}
    if(p===2){shape(c,[[-28,-5],[-16,-9],[-15,6+n],[-27,9+n]],'#e5d6ab');line(c,[[-25,-2],[-18,-4]],'#59717c',1);for(let i=0;i<n;i++)line(c,[[-25,1+i*2],[-18,-1+i*2]],'#59717c',.8);}
    if(p===3){shape(c,[[17,-5],[27,-4],[28,5+n],[18,7+n]],'#825321');for(let i=0;i<n;i++)circle(c,20+i%2*4,0+Math.floor(i/2)*3,1.5,'#d7b752');}
   }else if(h.type==='mage'){
    if(p===0){shape(c,[[-13,-28],[-5,-30],[-5,-7],[-10,-2],[-14,-6]],color);for(let i=0;i<n;i++)shape(c,[[-14,-10-i*3],[-17-i%2*2,-14-i*3],[-12,-13-i*3]],'#f4b14c');}
    if(p===1){for(let i=0;i<n;i++){const x=-13+i*5;shape(c,[[x,-62],[x-2,-69],[x,-73-i%2*3],[x+2,-69]],color);}line(c,[[-11,-60],[12,-60]],'#d8f2ed',1.5);}
    if(p===2){for(let i=0;i<n;i++)line(c,[[12+i%2*4,-30+i*4],[8+i%2*4,-27+i*4],[13+i%2*4,-27+i*4],[10+i%2*4,-23+i*4]],color,1.8);}
    if(p===3){shape(c,[[-29,-6],[-16,-8],[-14,7+n*.5],[-27,9+n*.5]],'#6d436c');line(c,[[-27,-5],[-25,7]],'#e8d6b4',1);for(let i=0;i<n;i++)circle(c,-20+i%2*3,-3+Math.floor(i/2)*3,1.2,color);}
   }
   signature(c,h,p,n,color,time,pulse);
  }
 }
 window.UpgradeLooks={draw,back,cloth};
})();
