/* Saved per-hero attack orders. Existing projectiles finish; only new attacks are gated. */
(function(root){function install(Game,D){
 Game.prototype.attackOptions=function(h){const a=[],add=(id,name,yes=true)=>{if(yes)a.push({id,name});},u=h.u;
 switch(h.type){case 'knight':add('basic','Sword');add('slam','Ground Slam',u[0]>=5);add('bash','Shield Bash',u[2]>0);add('radiant','Radiant Swing',u[3]>=3);break;
 case 'archer':add('basic','Arrow volley');add('trick','Trick Shot',u[1]>=3);add('lightning','Lightning Leap',u[2]>=3);break;
 case 'rogue':add('basic','Daggers');add('bomb','Bomb',u[3]>=3);add('trap','Traps',u[2]>0);break;
 case 'mage':add('basic',u[0]?'Fireball':'Magic bolt');add('beam','Piercing Beam',u[3]>=3);add('lightning','Chain lightning',u[2]>0);add('shock','Thunderclap',u[2]>=4);break;
 case 'abomination':add('punch','Flaming punch');add('whip','Fire Whip',u[2]>0);add('boulder','Fire Boulder',u[3]>0);break;
 case 'waterbeast':add('bite','Bite');['Dash','Stormshake','Diving leap','Predator’s Glare'].forEach((n,p)=>add('water'+p,n,u[p]>0));break;
 case 'turtle':add('bite','Bite');add('slam','Body slam',u[1]>0);add('shell','Shell throw',u[2]>0);break;
 case 'pirate':add('rock','Rock volley');add('ram','Boat ram',u[0]>0);add('cannon','Cannon broadside',u[2]>0);add('hat','Hat throw',u[3]>0);break;
 case 'toolmaker':add('melee','Melee weapons',!u[1]||u[0]>0);add('rang','Double-rang volley',u[1]>0);add('trap','Crafted traps',u[2]>0);add('boulderTrap','Boulder trap',u[2]>=6);add('turret','Turret volley',u[3]>0);break;
 case 'serpent':if(u.some(Boolean)){['Enemy throw','Underwater drag','Goose decoy','Water stream'].forEach((n,p)=>add('serpent'+p,n,u[p]>0));}else add('bolt','Water bolt');break;
 }return a;};
 Game.prototype.attackPlan=function(h){if(Array.isArray(h.attackRotation)){const ids=new Set(this.attackOptions(h).map(a=>a.id));return h.attackRotation.filter(r=>ids.has(r.attack)&&r.count>0);}if(h.type==='abomination'&&h.u[2])return this.attackOptions(h).map(a=>({attack:a.id,count:1}));return null;};
 Game.prototype.setAttackRotation=function(h,rows){if(!h||!Array.isArray(rows)||rows.length>32)return false;const ids=new Set(this.attackOptions(h).map(a=>a.id));if(rows.some(r=>!ids.has(r.attack)||!Number.isInteger(r.count)||r.count<0||r.count>99))return false;h.attackRotation=rows.map(r=>({attack:r.attack,count:r.count}));h.attackCursor=0;h.attackUsed=0;return true;};
 Game.prototype.resetAttackRotation=function(h){delete h.attackRotation;h.attackCursor=0;h.attackUsed=0;};
 Game.prototype.currentAttack=function(h){const plan=this.attackPlan(h);if(!plan)return null;if(!plan.length)return '';return plan[(h.attackCursor||0)%plan.length].attack;};
 Game.prototype.attackAllowed=function(h,key){if(this.manualAttack)return true;const current=this.currentAttack(h);if(!Array.isArray(h.attackRotation)&&h.type==='abomination'&&h.u[2]&&key==='whip'&&current==='punch'&&!this.abominationTargets(h,this.abominationMelee(h)).length)return true;return current===null||current===key;};
 Game.prototype.attackEnabled=function(h,key){const plan=this.attackPlan(h);return !plan||plan.some(r=>r.attack===key);};
 Game.prototype.attackDone=function(h,key){if(this.manualAttack)return;const plan=this.attackPlan(h);if(!plan?.length)return;const cursor=(h.attackCursor||0)%plan.length;if(plan[cursor].attack!==key)return;h.attackUsed=(h.attackUsed||0)+1;if(h.attackUsed>=plan[cursor].count){h.attackUsed=0;h.attackCursor=(cursor+1)%plan.length;}};
 Game.prototype.attackComponent=function(h,key,normal=true){return this.attackPlan(h)===null?normal:this.attackAllowed(h,key);};
 // Wrap the actual start of multi-hit attacks, never their later damage ticks.
 const wrap=(name,keyOf,success=r=>r===true)=>{const original=Game.prototype[name];Game.prototype[name]=function(h,...args){const key=typeof keyOf==='function'?keyOf(h,...args):keyOf;if(!this.attackAllowed(h,key))return false;const result=original.call(this,h,...args);if(success(result))this.attackDone(h,key);return result;};};
 for(const [name,key]of [['pirateAttack','rock'],['pirateCharge','ram'],['pirateBroadside','cannon'],['launchPirateHat','hat'],['toolMelee','melee'],['launchRangs','rang'],['turtleAttack','bite'],['turtleSlam','slam'],['turtleShell','shell'],['waterBeastBite','bite'],['abominationAttack','punch'],['abominationWhip','whip'],['abominationBoulder','boulder'],['serpentThrow','serpent0'],['serpentDrag','serpent1']])wrap(name,key);
 wrap('toolTrap',(h,kind)=>kind==='boulder'?'boulderTrap':'trap');wrap('startWaterAction',(h,p)=>'water'+p);const serpentAttack=Game.prototype.serpentAttack;Game.prototype.serpentAttack=function(h,p){const mode=p??this.serpentMainPath(h),key=mode>=0?'serpent'+mode:'bolt';if(!this.attackAllowed(h,key))return false;const used=serpentAttack.call(this,h,p);if(used)this.attackDone(h,key);return used;};
 const attack=Game.prototype.attack;Game.prototype.attack=function(h){if(!['knight','archer','rogue','mage'].includes(h.type))return attack.call(this,h);const choice=this.currentAttack(h);if(choice===''||choice==='trap')return false;const result=attack.call(this,h);if(result&&choice)this.attackDone(h,choice);return result;};
 const cast=Game.prototype.cast;Game.prototype.cast=function(...args){const old=this.manualAttack;this.manualAttack=true;try{return cast.apply(this,args);}finally{this.manualAttack=old;}};
 const trap=Game.prototype.trap;Game.prototype.trap=function(h,...args){if(!this.attackAllowed(h,'trap'))return false;trap.call(this,h,...args);this.attackDone(h,'trap');return true;};
 // Migrate old targeting-menu modes without changing the player's aim priority.
 const prepare=Game.prototype.prepare;Game.prototype.prepare=function(){for(const h of this.s.heroes){if(['flame','submerged'].includes(h.target)){h.mode=h.target;h.target=h.previousTarget||'first';delete h.previousTarget;}}return prepare.call(this);};
 }
 if(typeof module!=='undefined')module.exports=install;else root.installAttackRotation=install;
})(typeof window==='undefined'?globalThis:window);
