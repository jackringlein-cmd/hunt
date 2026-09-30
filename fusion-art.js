/* Animated, colored trace of Jack's Fusion Skeleton drawing.
   Coordinates follow the supplied drawing; separate limbs allow animation. */
window.FusionArt=(()=>{
 const ink='#181511',bone='#dfd0a8',shade='#aaa17e',rim='#87776c';
 function shape(c,points,fill){c.beginPath();c.moveTo(...points[0]);for(let i=1;i<points.length;i++)c.lineTo(...points[i]);c.closePath();c.fillStyle=fill;c.fill();c.strokeStyle=ink;c.lineWidth=3.7;c.lineJoin='round';c.lineCap='round';c.stroke();}
 function line(c,points,color=ink,width=3.5){c.beginPath();c.moveTo(...points[0]);for(const p of points.slice(1))c.lineTo(...p);c.strokeStyle=color;c.lineWidth=width;c.lineJoin='round';c.lineCap='round';c.stroke();}
 function oval(c,x,y,rx,ry,fill){c.beginPath();c.ellipse(x,y,rx,ry,0,0,7);c.fillStyle=fill;c.fill();c.strokeStyle=ink;c.lineWidth=3;c.stroke();}
 function joint(c,x,y,angle,draw){c.save();c.translate(x,y);c.rotate(angle);c.translate(-x,-y);draw();c.restore();}
 function tiny(c,x,y,angle,t){c.save();c.translate(x,y);c.rotate(angle);oval(c,0,-9,8,9,'#f5e8c5');oval(c,-3,-11,1.7,2,ink);oval(c,3,-11,1.7,2,ink);line(c,[[0,0],[0,18]],bone,5);line(c,[[-10,5],[0,8],[10,3]],bone,4);line(c,[[-9,11],[0,14],[9,10]],bone,4);line(c,[[0,18],[-8,29+Math.sin(t)*3]],bone,5);line(c,[[0,18],[8,29-Math.sin(t)*3]],bone,5);c.restore();}
 function draw(c,e,time,death=null){
  const dying=death!==null,t=dying?Math.max(0,Math.min(1,death)):0;
  const frozen=e.effects?.some(f=>f.kind==='freeze'),stopped=frozen||e.effects?.some(f=>f.kind==='stun');
  const phase=stopped?0:e.p*.065+time*.7,step=stopped?0:Math.sin(phase),breath=stopped?0:Math.sin(time*2.4+e.id)*2;
  const open=dying?Math.max(0,(t-.22)/.78):0,shake=dying?Math.sin(t*75)*(1-t)*6:0;
  c.save();c.translate(e.x,e.y);c.scale(.19,.19);c.translate(-675,-718);
  c.save();c.globalAlpha=.2*(1-t*.8);oval(c,688,722,176,27,'#343424');c.restore();
  if(dying)c.globalAlpha=Math.max(0,1-Math.max(0,t-.78)*4);
  c.translate(shake,dying?t*24:-Math.abs(step)*5);
  const bodyColor=frozen?'#b7d9df':bone;
  // Legs and irregular clawed feet preserve the reference's uneven silhouette.
  joint(c,648,548,dying?-t*.2:step*.075,()=>{
   shape(c,[[626,546],[605,575],[593,603],[588,652],[578,691],[583,715],[557,726],[533,724],[520,719],[552,710],[520,715],[517,709],[548,699],[521,708],[519,700],[546,691],[571,693],[583,700],[597,674],[615,651],[627,641],[641,645],[654,658],[650,679],[630,704],[599,721],[574,727],[552,728],[558,717],[581,709],[592,684],[612,650],[633,641],[653,654],[666,628],[681,610],[680,552]],bodyColor);
  });
  joint(c,704,548,dying?t*.2:-step*.075,()=>{
   shape(c,[[678,549],[722,560],[751,574],[778,590],[791,612],[800,645],[810,670],[817,694],[830,678],[850,676],[870,681],[861,689],[841,695],[862,689],[877,688],[884,693],[867,701],[850,704],[877,703],[885,710],[867,716],[846,717],[822,722],[803,715],[786,707],[771,691],[753,665],[744,650],[721,651],[706,637],[696,608]],bodyColor);
   line(c,[[695,592],[712,592]]);line(c,[[759,646],[767,618]]);
  });
  // Broad, bent arms with jagged fingers.
  joint(c,567,393,dying?-t*.35:step*.045,()=>{
   shape(c,[[575,366],[518,366],[485,375],[459,401],[451,422],[440,466],[437,484],[449,487],[471,478],[507,451],[542,437],[567,441]],bodyColor);
   shape(c,[[444,476],[432,501],[421,510],[423,526],[436,513],[443,525],[449,517],[457,531],[463,514],[473,509],[484,478],[462,486]],bodyColor);
  });
  joint(c,827,341,dying?t*.4:-step*.05,()=>{
   shape(c,[[831,313],[860,306],[917,298],[949,298],[979,306],[998,320],[1014,340],[1027,367],[1038,399],[1041,423],[1025,432],[1010,429],[1000,410],[981,398],[958,391],[903,389],[848,389]],bodyColor);
   shape(c,[[1022,426],[1006,435],[994,452],[992,487],[1005,458],[1014,443],[1017,478],[1026,449],[1032,468],[1038,444],[1047,459],[1049,436],[1059,438],[1059,400],[1052,415],[1047,399],[1040,405],[1038,426]],bodyColor);
  });
  c.translate(0,dying?0:breath);
  // Shell, central chamber, and visible inhabitants.
  shape(c,[[621,312],[656,301],[704,279],[741,277],[776,277],[808,290],[833,305],[850,330],[855,351],[849,384],[838,420],[822,457],[802,499],[778,530],[749,551],[716,556],[680,544],[621,545],[591,538],[571,519],[562,496],[560,447],[557,405],[567,367],[585,337],[607,316]],bodyColor);
  shape(c,[[576,347],[617,335],[665,327],[694,315],[676,332],[645,350],[625,369],[619,391],[625,423],[642,453],[666,473],[701,484],[738,478],[763,456],[780,425],[791,389],[791,350],[788,311],[806,329],[816,354],[823,388],[817,426],[800,467],[781,505],[748,540],[719,550],[680,538],[651,515],[637,480],[617,464],[596,442],[583,412]],shade);
  shape(c,[[653,349],[693,326],[734,326],[754,345],[772,373],[788,409],[787,450],[787,485],[754,495],[711,485],[673,470],[648,445],[632,413],[634,379]],rim);
  const glow=dying?'#ddeda1':frozen?'#c4e7f1':'#9fbba2';
  shape(c,[[670,365],[699,355],[716,351],[737,374],[755,404],[763,434],[750,462],[720,473],[687,465],[661,448],[651,421],[653,391]],glow);
  c.save();c.beginPath();c.ellipse(708,414,52,60,0,0,7);c.clip();
  for(let i=0;i<5;i++)tiny(c,679+(i%3)*22,391+Math.floor(i/3)*36,(i-2)*.48+Math.sin(time*2+i)*.08,stopped?0:time*5+i);
  c.restore();
  // The chamber's two curved doors split apart during death.
  for(const side of [-1,1]){c.save();c.translate(side*open*112,-open*18);joint(c,708,415,side*open*.6,()=>{
   const pts=side<0?[[689,347],[663,352],[644,371],[637,396],[644,427],[657,453],[684,471],[701,476],[681,459],[665,435],[659,411],[662,384],[676,367]]:[[713,351],[738,364],[755,388],[765,416],[758,443],[742,461],[715,473],[695,475],[721,487],[749,479],[771,459],[782,430],[778,398],[760,369],[738,349]];
   shape(c,pts,bodyColor);
  });c.restore();}
  line(c,[[638,479],[675,474],[708,487],[751,491],[747,500],[705,495],[659,502]],ink,3);
  // Large uneven skull and open mouth, as in the drawing.
  joint(c,667,292,dying?-.15*t:Math.sin(time*1.8)*.025,()=>{
   shape(c,[[622,305],[603,284],[592,268],[581,238],[578,197],[577,172],[583,151],[595,139],[615,127],[633,112],[645,118],[658,114],[672,111],[692,116],[705,130],[713,147],[717,173],[718,206],[717,249],[719,280],[696,289],[679,307],[650,312]],bodyColor);
   shape(c,[[618,167],[632,163],[644,166],[640,179],[633,191],[622,192],[615,187],[614,176]],ink);
   shape(c,[[670,168],[689,163],[694,167],[693,186],[681,188],[666,187],[665,177]],ink);
   const jaw=dying?t*7:Math.max(0,Math.sin(time*2))*3;c.save();c.translate(0,jaw);
   oval(c,665,260,20,28,ink);
   shape(c,[[635,226],[648,220],[662,219],[663,235],[652,239],[641,237]],'#f7eccd');
   shape(c,[[664,220],[680,220],[697,226],[698,239],[689,252],[680,239],[665,236]],'#f7eccd');
   shape(c,[[641,275],[653,278],[651,295],[640,299],[632,293]],'#f7eccd');
   shape(c,[[660,278],[676,280],[692,268],[697,279],[694,291],[674,299],[651,303]],'#f7eccd');line(c,[[628,241],[643,254]]);c.restore();
  });
  if(dying){c.save();c.globalAlpha=(1-t)*.9;for(let i=0;i<10;i++){const a=i*2.4,r=25+open*130;shape(c,[[708+Math.cos(a)*r,414+Math.sin(a)*r],[715+Math.cos(a)*r,408+Math.sin(a)*r],[720+Math.cos(a)*r,420+Math.sin(a)*r]],i%2?'#d8ceaf':'#9fbd9d');}c.restore();}
  c.restore();
  if(!dying&&e.hp<e.maxHp){c.fillStyle='#332a20';c.fillRect(e.x-23,e.y-121,46,5);c.fillStyle='#aaca85';c.fillRect(e.x-22,e.y-120,44*Math.max(0,e.hp/e.maxHp),3);}
 }
 return{draw};
})();
