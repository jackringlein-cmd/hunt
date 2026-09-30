(function(root){

const path=(name,costs,names,descriptions,ability=null)=>({name,costs,names,descriptions,ability});

const heroes={

 knight:{name:'Knight',cost:75,damage:10,interval:1,range:85,color:'#9ab8cb',role:'Sword • close range',paths:[

 path('Mighty Sword',[40,60,150,350,900,2500],['Sharp Edge','Longer Sword','Wide Swing','Heavy Steel','Ground Slam','Earthshaker'],['Sword damage becomes 15.','Reach increases by 25%.','Each swing hits up to 6 enemies.','Sword damage becomes 35.','Every fourth swing also slams all enemies in reach for 60 damage.','Sword: 60 damage. Slam: 150. A wave travels toward the entrance for twice your reach, dealing 100 damage.']),

 path('Swift Blade',[40,65,160,400,950,2800],['Quick Hands','Light Sword','Double Strike','Twin Blades','Blade Flurry','A Thousand Cuts'],['Swings every 0.8 seconds.','Swings every 0.6 seconds.','Every third swing hits twice.','Swings every 0.4 seconds.','Every 8 seconds, swings twice as fast for 3 seconds.','Cuts all enemies in reach 20 times for 25 damage per cut. Stuns for 1.25 seconds. 42-second wait.'],{name:'A Thousand Cuts',cooldown:42,mode:'self'}),

 path('Shield Guardian',[50,75,175,350,850,2400],['Shield Bash','Strong Shove','Wide Shield','Crushing Bash','Shield Slam','Unbreakable Guardian'],['Every third attack bashes one enemy for 15 damage and stuns for 0.25 seconds.','Bashes also push enemies back half your starting reach.','Bashes hit up to 5 enemies.','Bashes deal 40 damage and stun for 0.5 seconds.','Every third bash also slams all enemies in reach for 80 damage and a 0.5-second stun.','Blast all enemies in reach for 200 damage, push back one starting reach, and stun for 1 second. 35-second wait.'],{name:'Unbreakable Guardian',cooldown:35,mode:'self'}),

 path('Holy Knight',[45,70,170,400,1000,2700],['Blessed Blade','Lingering Light','Radiant Swing','Sacred Fire','Spreading Light','Dawnbringer'],['Adds 5 holy damage per sword hit.','Burns enemies for 3 damage per second for 3 seconds.','Every third swing sends light through up to 8 enemies for 25 damage.','Burns deal 8 per second for 5 seconds. Light waves apply the burn too.','Defeated burning enemies spread their fire to nearby enemies.','Hits all enemies in reach for 300 damage and burns for 25 per second for 8 seconds. 45-second wait.'],{name:'Dawnbringer',cooldown:45,mode:'self'})]},

 archer:{name:'Archer',cost:100,damage:12,interval:1,range:255,color:'#9cbd72',role:'Bow • long range',paths:[

 path('Powerful Arrows',[45,75,175,400,1000,3500],['Sharp Tips','Piercing Arrows','Heavy Arrows','Skewer Shot','Splinter Shot','VALLEY OF ARROWS'],['Arrows deal 18 damage.','Each arrow pierces 2 enemies.','Arrows deal 30 damage and ignore 3 armor.','Arrows pierce 6 enemies.','Each hit releases 3 splinters, dealing 8 damage to different nearby enemies.','One fast arrow splits into two on every hit. Each branch stops after 10 hits. Each hit deals 40 damage. 40-second wait.'],{name:'VALLEY OF ARROWS',cooldown:40,mode:'self'}),

 path('Rapid Fire',[40,90,180,425,1050,2800],['Quick Draw','Double Nock','Trick Shot','Explosive Rhythm','Perfect Rhythm','Explosion Time'],['Shoots every 0.8 seconds.','Fires 2 arrows per attack.','Every third attack also drops 3 arrows for 18 damage each.','Every fifth attack has firecracker arrows: explosions deal 20 damage.','Every third attack has firecrackers, including its falling arrows.','Every arrow causes a large 60-damage explosion for 5 seconds. 60-second wait.'],{name:'Explosion Time',cooldown:60,mode:'self'}),

 path('Elemental Arrows',[50,85,200,450,1100,2900],['Flaming Tips','Frostbite','Lightning Leap','Cold Snap','Thunder and Flame','Wild Weather'],['Arrows burn for 3 damage per second for 3 seconds.','Arrows slow by 25% for 2 seconds.','Every third arrow jumps lightning through 3 other enemies for 15 damage each.','Every third hit on the same enemy freezes it for 1 second.','Lightning deals 30 damage and applies the burn.','Choose a storm anywhere on the path for 8 seconds. Burns for 20 per second, slows 40%, and strikes up to 5 enemies each second for 40 damage. 45-second wait.'],{name:'Wild Weather',cooldown:45,mode:'point-any'}),

 path('Eagle Eye',[35,65,225,550,1200,2800],['Keen Sight','Steady Aim','Hunter’s Mark','Watchtower','Find the Weak Spot','Perfect Shot'],['Reach increases 25%.','Arrows deal double damage to full-health enemies.','Marks the strongest enemy in reach. All heroes deal 20% more damage to it.','Can shoot and mark anywhere on the map.','Each hit on the marked enemy adds 4 damage, up to 40. Resets when the target changes.','Choose any enemy on the map. Deal 2,000 damage, ignoring armor. 50-second wait.'],{name:'Perfect Shot',cooldown:50,mode:'enemy-any'})]},

 rogue:{name:'Rogue',cost:90,damage:13,interval:.7,range:85,color:'#b8a1d4',role:'Daggers • clever tricks',paths:[

 path('Assassin',[40,65,160,450,1100,2600],['Sharp Daggers','Pick a Target','Vital Strike','Marked for Death','Hidden Weakness','Death Strike'],['Dagger damage becomes 18.','Deals 10 extra damage to the strongest enemy in reach.','Every third attack deals double damage.','Hits on a marked target add 3 damage, up to 30. Its mark and damage bonus move to a new enemy when it falls.','Every third hit on the marked enemy makes it take 25% more damage from all heroes for 3 seconds.','Choose an enemy in reach. Deal 1,000 damage plus 20 for each 1% of health it has lost. 45-second wait.'],{name:'Death Strike',cooldown:45,mode:'enemy'}),

 path('Poison Master',[45,60,175,400,1000,2500],['Poisoned Daggers','Lasting Venom','Stronger Dose','Spreading Sickness','Withering Poison','Toxic Fog'],['Poison deals 4 damage per second for 3 seconds.','Poison lasts 6 seconds.','Repeated hits add 2 poison damage per second, up to 14.','Defeated poisoned enemies leave a cloud for 3 seconds. It poisons for 8 per second for 6 seconds.','Poisoned enemies move 20% slower and lose 3 armor.','Choose fog on the path within reach for 8 seconds. Poison deals 50 per second and lingers for 6 seconds. 45-second wait.'],{name:'Toxic Fog',cooldown:45,mode:'point'}),

 path('Trap Maker',[50,70,180,350,950,2400],['Hidden Spikes','Sticky Trap','Spring Trap','Packed with Trouble','Chain Reaction','The Floor Is Traps'],['Places a trap every 5 seconds. It hits 3 enemies for 20 damage each and lasts 30 seconds.','Traps slow by 30% for 3 seconds.','Every third trap pushes enemies back one starting reach.','Traps hit 8 enemies before breaking.','Traps explode for 60 damage when breaking or expiring.','Places 12 upgraded traps in reach, including 4 spring traps. 40-second wait.'],{name:'The Floor Is Traps',cooldown:40,mode:'self'}),

 path('Treasure Hunter',[80,100,200,650,1400,3200],['Bone Collector','Helping Hand','Loaded Pockets','Finders Keepers','Bounty Hunter','Payday'],['Your defeated enemies give 10% more money.','Other heroes in reach deal 10% more damage.','Every fifth attack also throws a 40-damage bomb.','Enemies defeated by other heroes in reach give 5% more money.','Marks the strongest enemy for a 25% money bounty.','Doubles rewards for enemies defeated in reach for 10 seconds. 60-second wait.'],{name:'Payday',cooldown:60,mode:'self'})]},

 leader:{name:'Leader',cost:125,damage:0,interval:1,range:170,color:'#e2b76a',role:'Support • strengthens heroes',paths:[

 path('Battle Captain',[65,100,250,500,1400,4000],['Rallying Cry','Keep Up!','Stand Together','Lead the Charge','Keep Fighting!','Battle Roar'],['Nearby heroes deal 10% more damage.','Attack-speed boost rises from 10% to 20%.','Nearby heroes deal another 10% damage when beside another attacking hero.','Attack-speed boost rises to 50% for the first 5 seconds of a wave.','Every fifth attack lands an extra hit. Extra hits do not trigger special effects.','Doubles nearby heroes’ damage and attack speed for 8 seconds. Replaces this leader’s smaller boosts. 60-second wait.'],{name:'Battle Roar',cooldown:60,mode:'self'}),

 path('Fearsome Commander',[55,70,200,400,1000,2600],['Scary Shout','Booming Voice','Mass Panic','Shaking Boots','Terrifying Presence','Run for Your Lives!'],['Every 6 seconds, fears one enemy for 1 second.','Fear reaches 25% farther.','Shouts scare up to 6 enemies.','After fear ends, affected enemies move 30% slower for 3 seconds.','Shouts every 4 seconds. Fear lasts 2 seconds.','Fears all enemies in fear range for 5 seconds. 60-second wait.'],{name:'Run for Your Lives!',cooldown:60,mode:'self'}),

 path('Wise General',[60,125,300,500,1600,4500],['Watchful Eyes','Ready Sooner','Spot the Weakness','Shared Plans','Perfect Timing','Second Wind'],['Nearby attacking heroes gain 15% reach.','Nearby heroes’ ability waits become 10% shorter.','Enemies in reach take 15% more damage from heroes also in reach.','The leader’s own reach increases 30%.','A nearby ability use removes 2 seconds from other nearby waits, at most once every 5 seconds.','Readies nearby abilities. Cannot reset Second Wind. Its own 90-second wait cannot be shortened.'],{name:'Second Wind',cooldown:90,mode:'self'}),

 path('Village Champion',[100,150,300,750,1600,3500],['Better Bargains','Waste Nothing','Welcome, Heroes!','Village Supplies','Master Bargainer','Village Festival'],['Other heroes’ upgrades cost 5% less in reach.','Enemies defeated in reach give 5% more money.','New heroes in reach cost 10% less.','Gives 15 money after each wave, or 8 with 50 villagers or fewer.','Both discounts rise to 15%.','Doubles rewards in reach and boosts attack speed by 30% for 10 seconds. 60-second wait.'],{name:'Village Festival',cooldown:60,mode:'self'})]},

 mage:{name:'Mage',cost:150,damage:15,interval:1.5,range:212.5,color:'#89aecf',role:'Staff • powerful magic',paths:[

 path('Fire Mage',[55,75,175,425,1100,2900],['Fireball','Lasting Flames','Bigger Blast','Burning Ground','Wildfire','Meteor Shower'],['Fireballs explode for 15 damage in a small area.','Burns for 4 per second for 3 seconds.','Explosions grow to one knight’s starting reach.','Leaves fire for 4 seconds, dealing 10 damage per second.','Burns deal 10 per second and spread to nearby enemies.','Rains 2 meteors each second for 8 seconds onto a chosen spot in reach. Each deals 100 damage, burns, and leaves fire. 60-second wait.'],{name:'Meteor Shower',cooldown:60,mode:'point'}),

 path('Ice Mage',[50,65,200,400,1050,2800],['Chilling Bolts','Deep Freeze','Frozen Solid','Shattering Ice','Slippery Path','Blizzard'],['Hits slow by 25% for 2 seconds.','Slow lasts 4 seconds.','Every third hit on an enemy freezes it for 1.5 seconds.','Defeated frozen enemies burst for 30 damage nearby.','Attacks leave ice for 5 seconds, slowing enemies 40%.','An 8-second storm in reach deals 25 damage per second and slows 40%. Freezes for 1 second at seconds 2, 4, 6, and 8. 55-second wait.'],{name:'Blizzard',cooldown:55,mode:'self'}),

 path('Storm Mage',[60,70,200,450,1150,3000],['Lightning Bolt','Longer Sparks','Chain Lightning','Thunderclap','Building Charge','Eye of the Storm'],['Lightning hits 2 enemies for 15 damage each.','Lightning jumps twice as far.','Lightning hits up to 6 enemies.','Every fifth attack deals 25 damage and stuns for 1 second throughout your reach.','Each jump adds 5 damage: 15, 20, 25, 30, 35, 40.','Strikes 4 times each second for 8 seconds. Each strike deals 60 damage. Every third strike stuns for 1 second. 60-second wait.'],{name:'Eye of the Storm',cooldown:60,mode:'self'}),

 path('Arcane Mage',[35,80,200,450,1100,3100],['Magic Missile','Armor Breaker','Piercing Beam','Arcane Echo','Unstable Magic','Arcane Overload'],['Magic follows its target and deals 15 damage.','Ignores 3 armor.','Every third attack becomes a 30-damage beam through up to 8 enemies.','Each beam repeats after 0.3 seconds.','Beam hits mark enemies for 5 seconds. Defeated marked enemies explode for 50 damage nearby.','Every attack is a 100-damage beam for 8 seconds, ignoring armor. Beams still echo. 60-second wait.'],{name:'Arcane Overload',cooldown:60,mode:'self'})]}

};

// Ability progression preserves every original passive upgrade.

heroes.knight.paths[0].ability={name:'Seismic Slam',cooldown:40,mode:'self'};

const primaryEffects={

 knight:[p=>'Slam every enemy in reach for '+200*p+' damage; push back '+42.5*p+' and stun '+.5*p+' seconds.',p=>'20 cuts of '+25*p+' damage per enemy over 1 second; stun '+1.25*p+' seconds.',p=>'Deal '+200*p+' damage to enemies in reach, push back '+85*p+', and stun '+p+' seconds.',p=>'Deal '+300*p+' damage in reach and burn for '+25*p+' damage per second for 8 seconds.'],

 archer:[p=>'Splitting arrows deal '+40*p+' per hit. Each branch stops after 10 hits.',p=>'For 5 seconds, arrows add explosions dealing '+60*p+' damage in radius 85.',p=>'8-second storm: '+20*p+' burn damage per second, '+40*p+'% slow, and up to 5 lightning hits of '+40*p+' each second.',p=>'Deal '+2000*p+' damage to one enemy anywhere, ignoring armor.'],

 rogue:[p=>'Deal '+1000*p+' damage plus '+20*p+' per 1% of target health lost.',p=>'Fog lasts 8 seconds and applies '+50*p+' poison damage per second, lingering 6 seconds.',p=>'Place '+Math.round(12*p)+' upgraded traps, every third one a spring trap.',p=>'For 10 seconds, rewards in reach gain '+50*p+'% extra gold.'],

 leader:[p=>'For 8 seconds, nearby heroes gain '+100*p+'% damage and attack speed (before the Leader bonus buff); stronger passive bonuses are retained.',p=>'Fear all enemies in fear range for '+5*p+' seconds.',p=>'Remove '+Math.min(100,100*p)+'% of remaining waits from nearby abilities. Cannot shorten Second Wind.',p=>'For 10 seconds, rewards in reach gain '+50*p+'% gold and nearby heroes gain '+30*p+'% attack speed before the Leader bonus buff.'],

 mage:[p=>'For 8 seconds, drop 2 meteors per second, each dealing '+100*p+' damage, plus purchased burns and fire patches.',p=>'8-second storm: '+25*p+' damage per second, '+40*p+'% slow, and '+p+'-second freezes at seconds 2, 4, 6, and 8.',p=>'For 8 seconds, strike 4 times per second for '+60*p+' damage; every third strike stuns for '+p+' seconds.',p=>'For 8 seconds, every attack is a '+100*p+'-damage armor-ignoring beam. Purchased echoes remain.']

};

for(const [type,hero] of Object.entries(heroes))hero.paths.forEach((p,i)=>{

 p.ability.tierDescriptions=[4,5,6].map(tier=>primaryEffects[type][i]({4:.4,5:.7,6:1.25}[tier])+' Base wait: '+Number((p.ability.cooldown*(tier===6?.8:1)).toFixed(2))+' seconds.');

 p.descriptions[5]=(type==='knight'&&i===0?p.descriptions[5]+' ':'')+p.ability.name+': '+p.ability.tierDescriptions[2];



});

const enemies={

 nightmare:{name:'DEMONIC NIGHTMARE',hp:225,loss:5,reward:22,time:30/1.68/1.6,wave:90,color:'#71608e',hint:'Quick but fragile. First flies after 7 seconds, then every 7 seconds for 4 seconds. While airborne, melee cannot reach it and ranged attacks have a 40% hit chance. Immune to harmful effects except burning.'},

 screecher:{name:'Skull Screecher',hp:240000,loss:0,reward:120,time:45/1.68,wave:80,color:'#d4ccb0',hint:'Wanders slowly, then stuns heros.'},

 werewolf:{name:'Werewolf',immuneEffects:['fear'],hp:405,loss:5,reward:18,time:90/1.68,wave:60,color:'#777d73',hint:'FEAR IMMUNE: cannot be frightened into retreating. Stun or freeze it to interrupt a pickup before the throw. Slowly stalks the path. Every 5 seconds, picks up a nearby enemy and throws it far ahead. Tiny Skeleton swarms are thrown together.'},

 hellhound:{name:'Hell Hound',immuneDamage:['fire'],hp:99,loss:3,reward:12,time:9/1.68/3,wave:55,color:'#252a24',hint:'FIRE IMMUNE: fireballs, burns, fire pools and meteors cannot hurt it. Weapons, poison and non-fire magic still work. Runs on four legs at three times a Ghoul’s speed. On death, explodes for 225 damage to enemies within 240 map units. Can trigger other Hell Hounds. Does not explode when escaping.'},

 shadow:{name:'Shadow Goul',hp:337.5,loss:4,reward:16,time:50/1.68,wave:45,color:'#30322f',hint:'Slowly stalks the path. After 5 seconds, sinks into its shadow for 5 seconds of immunity to all damage and harmful effects. Repeats every 7 seconds, leaving a 2-second vulnerable window.'},

 headless:{name:'Headless Zombie',immuneDamage:['poison'],hp:180,loss:3,reward:12,time:30/1.68/1.3,wave:35,color:'#9eaf78',hint:'POISON IMMUNE: poison damage and Withering Poison cannot affect it. Weapons, fire and other magic still work. At one-third health, bowls its matching head halfway toward a nearby hero. After screaming, the head vanishes and stuns the nearby unstunned hero with the most gold invested for 15 seconds. All hero stuns end when the round ends.'},

 fusion:{name:'Fusion Skeleton',immuneEffects:['push'],hp:270,loss:5,reward:20,time:45/1.68,wave:20,color:'#b2a98a',hint:'KNOCKBACK IMMUNE: its heavy fused body cannot be pushed backward. Slow, stun and fear still work within their normal limits. Its chest bursts open when defeated, releasing five swarms of ten Tiny Skeletons.'},

 skeleton:{name:'Skeleton',hp:63,loss:1,reward:5,time:30/1.68,wave:1,color:'#ded9ba',hint:'A basic skeleton. Stop it before it reaches the village.'},

 tiny:{name:'Tiny Skeleton',hp:22.5,loss:1,reward:2,time:24/1.68,wave:3,color:'#cfcaac',hint:'Tiny skeletons arrive ten at a time in a tight circle. Each has 22.5 health. Slows and knockback affect the whole group.'},

 runner:{name:'Ghoul',hp:49.5,loss:1,reward:5,time:9/1.68,wave:5,color:'#bec99b',hint:'Ghouls run fast, but have little health.'},

 shield:{name:'Zombie Guard',immuneDamage:['poison'],hp:146.25,loss:3,reward:10,time:36/1.68,wave:10,armor:3,color:'#abb8b7',hint:'POISON IMMUNE: poison and Withering Poison cannot affect it. Use strong weapon hits, fire or other magic. Armor reduces every hit by 3. Strong attacks help!'},

 brute:{name:'Grave Troll',hp:405,loss:5,reward:15,time:45/1.68,wave:15,color:'#d3b29a',hint:'Slow and tough. It costs 5 villagers if it gets through.'},

 captain:{name:'Vampire Lord',damageTaken:{fire:1.5},hp:1012.5,loss:10,reward:30,time:30/1.68,wave:25,color:'#e4bd6a',hint:'FIRE WEAKNESS: takes 50% more damage from fire, including burns. Other damage works normally. Makes nearby enemies 20% faster. Two boosts can work together.'},

 shaman:{name:'Wraith',onlyDamage:'fire',hp:675,loss:10,reward:25,time:36/1.68,wave:35,color:'#b2a0d5',hint:'FIRE ONLY: only fire damage can hurt it. Use Fire Mage fireballs, burning arrows or blades, fire pools, or meteors. Weapons, poison and non-fire magic deal no damage. Gives a nearby monster a shield that absorbs 40 damage.'},

 giant:{name:'Weaker Cyclops',hp:13500,loss:20,reward:100,time:60/1.68,wave:75,blocks:7,fearReduction:.3,color:'#d1c0a5',hint:'Blocks its first 7 harmful effects. Fear lasts 30% less time.'},

 dragon:{name:'Plague Wyvern',immuneDamage:['poison'],boss:true,hp:130500,loss:50,reward:500,time:50/1.68,wave:100,blocks:15,fearReduction:.65,color:'#d9c9d9',hint:'POISON IMMUNE: poison and Withering Poison cannot affect this plague boss. Weapons, fire and other magic still work. The final boss! Blocks 15 harmful effects. Fear lasts 65% less time.'}

};

const points=[[-40,160],[205,160],[265,230],[265,320],[135,385],[135,500],[350,500],[435,410],[435,235],[575,160],[740,160],[795,230],[795,330],[650,395],[650,505],[805,550],[960,515],[1040,440],[1140,440]];

const trees=[{id:1,x:145,y:265},{id:2,x:345,y:185},{id:3,x:345,y:325},{id:4,x:525,y:335},{id:5,x:560,y:470},{id:6,x:865,y:405},{id:7,x:910,y:260},{id:8,x:745,y:460},{id:9,x:335,y:610},{id:10,x:55,y:350},{id:11,x:640,y:270},{id:12,x:940,y:610}];

const graves=Array.from({length:7},(_,i)=>({id:i+1,x:879+(i%4)*37,y:85+Math.floor(i/4)*35}));

// Round each bend into short segments shared by movement and drawing.

function roundedRoute(anchors){const out=[anchors[0]];for(let i=1;i<anchors.length-1;i++){const a=anchors[i-1],b=anchors[i],c=anchors[i+1],before=[b[0]+(a[0]-b[0])*.22,b[1]+(a[1]-b[1])*.22],after=[b[0]+(c[0]-b[0])*.22,b[1]+(c[1]-b[1])*.22];out.push(before);for(let j=1;j<=12;j++){const t=j/12,q=1-t;out.push([q*q*before[0]+2*q*t*b[0]+t*t*after[0],q*q*before[1]+2*q*t*b[1]+t*t*after[1]]);}}out.push(anchors[anchors.length-1]);return out;}

// Jack's portrait sketch turned clockwise into the landscape playfield.

const marshTurn=([x,y])=>[(714-y)*1100/714,x*720/511];

const marshRoute=roundedRoute([[225,-30],[235,78],[300,112],[397,135],[443,165],[490,205],[505,242],[503,400],[480,545],[448,549],[432,525],[451,440],[446,305],[432,259],[397,252],[369,265],[287,265],[263,297],[243,355],[237,405],[266,399],[295,365],[330,360],[368,379],[379,406],[370,434],[318,467],[280,501],[244,546],[239,614],[237,672],[174,677],[104,657],[58,620],[49,574],[58,511],[87,468],[129,452],[164,466],[196,508],[233,570],[269,613],[362,597],[408,600],[449,630],[479,674],[503,745]].map(marshTurn));

const marshWater=[[[71,93],[94,86],[123,105],[132,146],[120,163],[83,172]],[[375,54],[395,23],[429,-5],[464,0],[485,37],[488,75],[464,96],[424,88]],[[7,533],[9,470],[25,396],[36,337],[60,310],[101,294],[144,300],[177,329],[189,367],[181,399],[152,408],[119,399],[79,419],[51,454],[27,534]],[[309,290],[362,279],[401,287],[422,311],[429,374],[414,374],[397,341],[359,329],[321,327],[308,313]],[[298,714],[303,675],[332,649],[379,634],[420,642],[452,674],[479,714]]].map(p=>p.map(marshTurn));

const maps={forest:{id:'forest',name:'The Whispering Woods',description:'Forest bends and a riverside village.',points,trees,graves},marsh:{id:'marsh',name:'Moonlit Marsh',description:'Purple marsh with a winding ochre path and blue pools.',points:marshRoute.slice().reverse(),water:marshWater,previousPoints:roundedRoute([[-40,560],[150,550],[400,410],[640,270],[790,140],[945,150],[995,235],[950,320],[810,380],[650,400],[450,245],[280,145],[130,190],[95,290],[170,385],[390,520],[640,605],[840,575],[970,480],[1040,440],[1140,440]]),trees:[],graves:[]} };



const data={heroes,enemies,points,trees,graves,maps,villagerPrices:[{max:65,cost:10},{max:85,cost:20},{max:100,cost:100},{max:110,cost:500},{max:Number.MAX_SAFE_INTEGER,cost:1000}],treeHitboxScale:1.75,heroDamageScale:1.25,leaderBoostScale:1.25,width:1100,height:720};

if(typeof module!=='undefined')module.exports=data;else root.GameData=data;

})(typeof window==='undefined'?globalThis:window);

