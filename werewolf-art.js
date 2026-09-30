/* Drawn animation frames: arms are rendered as authored, never twisted or stretched. */
(function(root){
 const sprite=new Image();sprite.src=new URL('assets/enemies/werewolf-poses-marked.png',document.currentScript.src).href;
 const walkSprite=new Image();walkSprite.src=new URL('assets/enemies/werewolf-walk-marked.png',document.currentScript.src).href;
 const recoverySprite=new Image();recoverySprite.src=new URL('assets/enemies/werewolf-follow-through.png',document.currentScript.src).href;
 const recoveryAnchors=[275,675,1085,1495,272,675,1068,1467];
 const walkAnchors=[236,620,1032,1457,221,620,1028,1455];
 // The authored drawings face left. Follow the route, retaining the
 // incoming orientation on vertical stretches instead of flipping each frame.
 function facingFor(e,time=0){if(e.throwGrip)return e.throwFacing||1;let distance=Math.max(0,e.p),direction=1;const points=root.GameData.points;
 for(let i=1;i<points.length;i++){const dx=points[i][0]-points[i-1][0],dy=points[i][1]-points[i-1][1],length=Math.hypot(dx,dy);if(dx!==0)direction=Math.sign(dx);if(distance<length)break;distance-=length;}
 if(e.effects?.some(f=>f.kind==='fear'&&f.end>time))direction*=-1;return direction>0?-1:1;}
 function walkFrameFor(e){return Math.floor(Math.max(0,e.p)/9)%8;}
 // Source rectangles and foot anchors in the generated sheet.
 const frames=[
 [0,0,413,461,240,450],[413,0,414,461,620,450],
 [827,0,413,461,1040,450],[1240,0,414,461,1460,450],
 [0,461,413,490,240,920],[413,461,414,490,630,920],
 [827,461,413,490,1100,920],[1240,461,414,490,1510,920]
 ];
 function frameFor(e){if(e.throwGrip){const p=e.throwPose||0;return e.throwStage==='release'?Math.min(7,Math.floor((e.throwRecovery||0)*8)):2+Math.min(4,Math.round(p*4));}return walkFrameFor(e);}
 function draw(c,e,time){if(!sprite.complete||!sprite.naturalWidth)return;const index=frameFor(e);let source=sprite,rect=frames[index],scale=.36;if(!e.throwGrip){if(!walkSprite.complete||!walkSprite.naturalWidth)return;source=walkSprite;const col=index%4,row=Math.floor(index/4),cw=source.naturalWidth/4;rect=[col*cw,row*480,cw,row?source.naturalHeight-480:480,walkAnchors[index],row?929:465];scale=row?.375:.36;}if(e.throwGrip&&e.throwStage==='release'&&recoverySprite.complete&&recoverySprite.naturalWidth){source=recoverySprite;const col=index%4,row=Math.floor(index/4),bounds=[0,444,836,1243,source.naturalWidth];rect=[bounds[col],row*475,bounds[col+1]-bounds[col],row?source.naturalHeight-475:475,recoveryAnchors[index],row?904:450];scale=.375;}const [x,y,w,h,ax,ay]=rect;
 c.save();c.translate(e.x,e.y);c.fillStyle='#19241d30';c.beginPath();c.ellipse(0,4,33,8,0,0,7);c.fill();c.scale(facingFor(e,time),1);
 c.drawImage(source,x,y,w,h,(x-ax)*scale,(y-ay)*scale,w*scale,h*scale);c.restore();
 }
 root.WerewolfArt={draw,sprite,walkSprite,recoverySprite,frameFor,walkFrameFor,facingFor};
})(window);
