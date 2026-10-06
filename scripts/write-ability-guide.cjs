const fs=require('node:fs');
const path=require('node:path');
const D=require('../data.js');
let text='# Hero Ability Guide\n\nAbilities unlock only at tier 6. There are no secondary abilities. Original tier-4 and tier-5 upgrades remain. Tier-6 abilities retain 125% strength and 20% shorter base waits. Damage below is before the 25% hero damage bonus and support bonuses. Tool Maker then applies its 25% damage reduction, for 93.75% of listed damage before support. Second Wind cannot shorten itself or another Second Wind.\n';
for(const hero of Object.values(D.heroes)){
 text+='\n## '+hero.name+'\n';
 for(const p of hero.paths){
  text+='\n### '+p.name+'\n\n**Primary: '+p.ability.name+'**\n\n| Tier | Effect |\n|---|---|\n';
  for(let i=2;i<3;i++)text+='| '+(i+4)+' | '+p.ability.tierDescriptions[i]+' |\n';
 }
}
fs.writeFileSync(path.join(__dirname,'..','ABILITY_GUIDE.md'),text,'utf8');
console.log('Updated ABILITY_GUIDE.md for all 40 paths.');
