/* Individually drawn poses: no mesh warping, squash, mirroring or flattened turns. */
window.CamoflaugerArt=(()=>{
 const sheet=new Image(),frames=[];
 const lifts=[0,3,17,0,3,19,0,2,3,2,4,0];
 sheet.onload=()=>{const canvas=document.createElement('canvas');canvas.width=sheet.naturalWidth;canvas.height=sheet.naturalHeight;const c=canvas.getContext('2d',{willReadFrequently:true});c.drawImage(sheet,0,0);const {data}=c.getImageData(0,0,canvas.width,canvas.height),w=canvas.width,h=canvas.height;
 // These row boundaries follow the actual spacing of the hand-drawn sheet.
 const rows=[0,.322,.64,1];for(let row=0;row<3;row++)for(let col=0;col<4;col++){const left=Math.floor(col*w/4),right=Math.floor((col+1)*w/4),top=Math.floor(rows[row]*h),bottom=Math.floor(rows[row+1]*h);let x0=right,y0=bottom,x1=left,y1=top;for(let y=top;y<bottom;y++)for(let x=left;x<right;x++)if(data[(y*w+x)*4+3]>24){x0=Math.min(x0,x);x1=Math.max(x1,x);y0=Math.min(y0,y);y1=Math.max(y1,y);}frames.push({x:x0,y:y0,w:x1-x0+1,h:y1-y0+1});}};
 sheet.src='assets/enemies/camoflauger-skip-turn-sheet.png';
 function draw(c,e,time){if(frames.length!==12)return;const stopped=e.effects?.some(f=>['stun','freeze'].includes(f.kind))||(e.gazeUntil||0)>time,phase=stopped?0:((e.p/950)%1+1)%1,index=Math.floor(phase*12),f=frames[index],scale=68/frames[0].h,lift=stopped?0:lifts[index];c.save();c.translate(e.x,e.y);c.fillStyle='#20352135';c.beginPath();c.ellipse(0,8,16-lift*.2,4-lift*.07,0,0,Math.PI*2);c.fill();c.drawImage(sheet,f.x,f.y,f.w,f.h,-f.w*scale/2,10-f.h*scale-lift,f.w*scale,f.h*scale);c.restore();}
 return{draw,ready:()=>frames.length===12};
})();
