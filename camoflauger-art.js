/* Animate the approved hand-drawn bitmap, including its original leaf border. */
window.CamoflaugerArt=(()=>{
 const sprite=new Image(),frames=[],count=64,size=180;
 sprite.src='assets/enemies/camoflauger-refined-green-border.png';
 const smooth=x=>x*x*(3-2*x),clamp=x=>Math.max(0,Math.min(1,x));
 function pose(phase){const step=phase*4,part=step%1,odd=Math.floor(step)%2?1:-1;const hop=Math.pow(Math.sin(part*Math.PI),1.3),turn=phase>.5?smooth((phase-.5)*2)*Math.PI*2:0;
 return{hop,odd,part,turn,kick:Math.sin(part*Math.PI),lean:Math.sin(step*Math.PI)*.12};}
 // Soft local joint weights move the painted limbs and their attached leaves together.
 function warp(x,y,p){let dx=0,dy=0;const weight=(cx,cy,rx,ry)=>Math.exp(-(((x-cx)/rx)**2)-((y-cy)/ry)**2);
 const leftLeg=weight(.40,.78,.16,.22),rightLeg=weight(.66,.82,.14,.16),leftArm=weight(.28,.44,.19,.10),rightArm=weight(.72,.42,.17,.10),head=weight(.5,.19,.19,.22);
 dx+=leftLeg*p.odd*p.kick*.052-rightLeg*p.odd*p.kick*.05;
 dy-=leftLeg*Math.max(0,p.odd)*p.kick*.085+rightLeg*Math.max(0,-p.odd)*p.kick*.08;
 dy+=leftArm*p.odd*p.kick*.045-rightArm*p.odd*p.kick*.045;
 dx+=head*p.lean*.09;return{x:(x+dx-.5)*112,y:(y+dy)*140-130};}
 function triangle(c,a,b,d,ta,tb,td){const det=ta.x*(tb.y-td.y)+tb.x*(td.y-ta.y)+td.x*(ta.y-tb.y);if(Math.abs(det)<1e-8)return;
 const solve=(v1,v2,v3)=>[(v1*(tb.y-td.y)+v2*(td.y-ta.y)+v3*(ta.y-tb.y))/det,(v1*(td.x-tb.x)+v2*(ta.x-td.x)+v3*(tb.x-ta.x))/det,(v1*(tb.x*td.y-td.x*tb.y)+v2*(td.x*ta.y-ta.x*td.y)+v3*(ta.x*tb.y-tb.x*ta.y))/det];
 const X=solve(a.x,b.x,d.x),Y=solve(a.y,b.y,d.y);c.save();c.beginPath();const mx=(a.x+b.x+d.x)/3,my=(a.y+b.y+d.y)/3;for(const [i,v]of [a,b,d].entries()){const x=mx+(v.x-mx)*1.025,y=my+(v.y-my)*1.025;i?c.lineTo(x,y):c.moveTo(x,y);}c.closePath();c.clip();c.transform(X[0],Y[0],X[1],Y[1],X[2],Y[2]);c.drawImage(sprite,0,0);c.restore();}
 function build(){for(let f=0;f<count;f++){const canvas=document.createElement('canvas');canvas.width=canvas.height=size;const c=canvas.getContext('2d'),p=pose(f/count);c.translate(size/2,151);const nx=12,ny=16,points=[];for(let j=0;j<=ny;j++)for(let i=0;i<=nx;i++)points.push({pos:warp(i/nx,j/ny,p),tex:{x:i/nx*sprite.naturalWidth,y:j/ny*sprite.naturalHeight}});for(let j=0;j<ny;j++)for(let i=0;i<nx;i++){const a=points[j*(nx+1)+i],b=points[j*(nx+1)+i+1],d=points[(j+1)*(nx+1)+i],e=points[(j+1)*(nx+1)+i+1];triangle(c,a.pos,b.pos,d.pos,a.tex,b.tex,d.tex);triangle(c,b.pos,e.pos,d.pos,b.tex,e.tex,d.tex);}frames.push(canvas);}}
 sprite.onload=build;
 function draw(c,e,time){if(!frames.length)return;const stopped=e.effects?.some(f=>['stun','freeze'].includes(f.kind))||(e.gazeUntil||0)>time;const phase=stopped?0:((e.p/1150)%1+1)%1,p=pose(phase),lift=p.hop*(phase>.5?24:17),frame=frames[Math.floor(phase*count)%count];
 c.save();c.translate(e.x,e.y);c.fillStyle='#20352135';c.beginPath();c.ellipse(0,8,16-p.hop*5,4-p.hop,0,0,Math.PI*2);c.fill();c.translate(p.odd*p.hop*3,-lift);c.translate(0,-23);c.rotate(p.lean);const facing=Math.cos(p.turn),width=Math.sign(facing||1)*Math.max(.16,Math.abs(facing));c.scale(width,1);c.translate(0,23);const stretch=1+p.hop*.08-(p.part<.12?(1-p.part/.12)*.06:0);c.scale(1/stretch,stretch);c.drawImage(frame,-45,-71,90,90);c.restore();}
 return{draw,ready:()=>frames.length===count};
})();
