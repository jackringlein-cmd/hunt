/* Individually drawn poses: no mesh warping, squash, mirroring or flattened turns. */
window.GreaterImpArt=(()=>{
 const sheet=new Image(),frames=[];
 const lifts=[0,3,5,18,0,3,15,2,3,2,0,0];
 sheet.onload=()=>{const canvas=document.createElement('canvas');canvas.width=sheet.naturalWidth;canvas.height=sheet.naturalHeight;const c=canvas.getContext('2d',{willReadFrequently:true});c.drawImage(sheet,0,0);const {data}=c.getImageData(0,0,canvas.width,canvas.height),w=canvas.width,h=canvas.height;
 // These row boundaries follow the actual spacing of the hand-drawn sheet.
 const rows=[0,.5,1];for(let row=0;row<2;row++)for(let col=0;col<4;col++){const left=Math.floor(col*w/4),right=Math.floor((col+1)*w/4),top=Math.floor(rows[row]*h),bottom=Math.floor(rows[row+1]*h);let x0=right,y0=bottom,x1=left,y1=top;for(let y=top;y<bottom;y++)for(let x=left;x<right;x++)if(data[(y*w+x)*4+3]>24){x0=Math.min(x0,x);x1=Math.max(x1,x);y0=Math.min(y0,y);y1=Math.max(y1,y);}frames.push({x:x0,y:y0,w:x1-x0+1,h:y1-y0+1});}};
 sheet.src='assets/enemies/greater-imp-sheet.png';
 function draw(c,e,time){if(frames.length!==8)return;const stopped=e.effects?.some(f=>['stun','freeze'].includes(f.kind))||(e.gazeUntil||0)>time,phase=stopped?0:((e.p/220)%1+1)%1,index=Math.floor(phase*8),f=frames[index],scale=86/frames[0].h,lift=0;c.save();c.translate(e.x,e.y);c.fillStyle='#20352135';c.beginPath();c.ellipse(0,8,16-lift*.2,4-lift*.07,0,0,Math.PI*2);c.fill();c.drawImage(sheet,f.x,f.y,f.w,f.h,-f.w*scale/2,10-f.h*scale-lift,f.w*scale,f.h*scale);c.restore();}
 return{draw,ready:()=>frames.length===8};
})();
