# The Hunt for the Necromancer — Complete Game Design & Handoff

This document is self-contained. It records Jack's accepted game design, the current local prototype, and things that still need checking. Give this whole file to another chat. That chat does not need the original conversation to understand the game.

## 1. About Jack and how to work with him

- The creator is **Jack**, age **11**.
- Ask questions in simple, plain language. Do not use jargon.
- Jack chose the ideas and approved the numbers below. Preserve those choices unless he asks to change them.
- The game is inspired by **Bloons Tower Defense 6**, but uses original fantasy heroes, skeleton enemies, art, and music.
- Jack asked to build a playable game, not just plan it. A local browser version now exists.
- Latest art reference: Jack’s simple hand-drawn person with wobbly black lines, flat yellow skin, a fluffy brown winter hat and brown trousers, a navy shirt, big dark boots, uneven eyes, and a toothy mouth. Saved at references/jack-drawing-reference.png. This supersedes the earlier shaggy-monster and shiny-archer styles. Latest feature request: every upgrade changes a hero’s appearance, and every legal combination has a unique mixed appearance.

## 2. Story and goal

A village is trying to hunt a necromancer. He keeps summoning and reviving dead creatures to stop the villagers. He has found a huge supply of skeletons and now sends constant waves toward the village. Fantasy heroes defend it.

Monsters follow a **visible fixed path** to the village. Heroes stay where they are placed. Defeated monsters provide bones, which automatically become money. The player uses that same money to buy heroes and their upgrades.

Survive **100 waves** to win the current game. Jack originally said difficulty would decide the wave count, but chose 100 for now; other difficulty modes are not yet designed. After winning, the player may continue into endless waves. The necromancer himself has no designed playable boss encounter yet. The normal game's final boss is the Bone Dragon.

## 3. Villagers, money, and losing

- Start with **100 villagers** and **200 money** (called gold coins in the current screen).
- Each enemy that reaches the village removes its listed number of villagers. A basic skeleton removes 1. The Bone Dragon removes 50.
- Gold income is independent of villager population. Enemy rewards, bonus gold and round-completion income remain full even at 50 villagers or fewer. A basic skeleton always gives 5 base gold.
- At **0 villagers**, the player loses. Villagers do not regenerate over time or at fixed round milestones. On every map, completing a round that introduces at least one previously unseen enemy type restores up to 10 villagers, capped at 101. Multiple new types in the same round award only one bonus. Spawned enemy types also count. Pending rewards persist through saves and pay only on successful round completion; they never reduce an existing population above 101. Gravestones are decorative and clicking them does nothing; villagers cannot be purchased through graves.
- Completing a wave gives **20 extra money**, reduced to **10** under the penalty.
- Sell heroes for **70% of the money actually spent on the hero and upgrades**. Discounts therefore reduce the eventual refund. The prototype rounds sale refunds down.
- Players may buy, upgrade, and sell between waves and while a wave is running. Settings pause the game and block those actions.

## 4. Map, view, and art

- First map: a **forest path with lots of bends**, leading to the village. The prototype names it **The Whispering Woods**.
- View from above at a **slight angle**, showing faces and bodies.
- Trees block hero placement. A tree costs **25 money** to remove. Tree hitbox dimensions are increased by 75%: the hero-placement blocking radius is 85.75 map units (previously 49), and the canopy/trunk click regions are 1.75 times their previous width and height.
- Jack requested trees be **50% larger**: all tree artwork is drawn at 1.5× its previous width and height, including decorative trees. Tree positions and the existing gameplay placement footprint stay the same; clicking the enlarged canopy selects the tree.
- Heroes must be beside the path, not on it. The current map includes grass, a stream, gravestones, lanterns, and village houses.
- Original art direction: a mix of **colorful and cartoony** and **dark and spooky**.
- Current direction: simple hand-drawn fantasy matching Jack’s newest person drawing. Use flat colors, slightly uneven rounded outlines, expressive unequal eyes, long sleeves, dark boots, and recognizable class equipment. Apply the same simple style to the forest, enemies, and village. UI uses pale notebook/parchment colors with navy accents. Keep the leader in ordinary navy cloth, brown trousers, dark boots, a fluffy brown winter hat with white ends, and empty hands; upgrades may add cloth or utility items, never armor or a banner.
- Heroes now change substantially at every upgrade: tier 1 adds path-colored clothing and gear, tier 2 adds a short cloak and belt, tier 3 widens the cloak and adds shoulder pieces, tier 4 adds boot cuffs and a longer cloak, tier 5 adds a bright collar and trim, and tier 6 adds a full cloak and orbiting accents. Class-specific weapons, elemental staff tops, quivers, traps, bottles and supplies grow alongside these changes. Two chosen paths keep separate coat panels and equipment. All eight directions and portraits share these looks. The Leader retains the original winter hat, empty hands and boots, using cloth and supplies instead of armor or banners.
- Leader visual design: navy cloth shirt, brown trousers, matching long dark boots with raised toes, a fluffy brown winter hat with white ends, no helmet, armor, or banner. Upgrade paths add a cloth sash, scarf, notes, or a money pouch. These never give the leader an attack.
- Unique upgrade appearance rule: all four paths contribute independently to the drawing, so both chosen paths stay visible. Every purchased tier changes equipment or details. Map sprites and selected-hero portraits use the same upgraded drawing. The 145 legal upgrade states per hero (including the unupgraded state) were rendered and compared: all 725 hero appearances are distinct.
- Range circles appear **only while placing or selecting a hero**, disappearing when the player clicks away.
- Selecting a hero shows its range circle only; the red obstacle shot-direction overlay has been removed at Jack’s request.

## 5. Animation and audio

The Leader uses Jack’s original drawing: a fluffy brown winter hat with a white fur rim and fluffy white ends (not hair), uneven eyes, a toothy open mouth, long yellow neck, navy shirt, brown trousers, oversized boots, and visible fingers. Eight direction frames preserve that design. Both boots now match the longer right boot, with raised toes pointing outward. The left boot mirrors the right boot in all direction frames. Idle breathing, waving during waves, and a raised-hand shout pose accompany fear and abilities. Cloth upgrade decorations remain; no armor, banner, or weapon.

The Bone Giant is a cyclops skeleton with one glowing red eye, a broad rib cage, and heavy jointed limbs. Its walk rocks the shoulders, swings the arms, and moves the jaw. The Bone Dragon is a long skeletal dragon with a horned skull, teeth, rib cage, four clawed legs, bare wing bones, and an articulated tail. Wing flaps, alternating steps, neck bobbing, jaw movement, and tail waves animate together. Freeze and stun stop both movement cycles. Boss stats remain unchanged.

Latest enemy appearance and displayed-name update (supersedes earlier boss artwork descriptions):

| Before | Old look | Now | New look |
|---|---|---|---|
| Skeleton | Basic bones | Skeleton | Unchanged |
| Tiny Skeleton | Small skeleton | Tiny Skeleton | Unchanged |
| Skeleton Brute (later called Weaker Cyclops) | Larger skeleton with shoulder plates | Grave Troll | Bulky moss-green undead troll, stitched skin, exposed ribs, pointed ears and tusks |
| Skeleton Runner | Skeleton with a red headband | Ghoul | Hunched green body, long arms, hooked claws, fast loping run |
| Shield Skeleton | Skeleton carrying a shield | Zombie Guard | Green stitched face, battered armor and a large shield |
| Bone Captain | Crowned skeleton with a banner | Vampire Lord | Pale face, fangs, dark clothes and a waving burgundy cape |
| Bone Shaman | Skeleton with a pointed hat and staff | Wraith | Floating hood, glowing eyes, trailing ghostly robes and a shield aura |
| Skeleton Giant (later called Mummy Colossus) | Wrapped mummy body | Weaker Cyclops | Restored large cyclops skeleton with one glowing red eye, broad ribs and heavy swinging limbs |
| Bone Dragon | Dragon skeleton with bare wing bones | Plague Wyvern | Famished purple fantasy wyvern with no legs, the original pointed purple wings tilted downward, mirrored at the shoulders; the left wing is drawn in front of the torso and tail wherever they overlap; each 1.6-second wingbeat lifts high over 1.28 seconds, then drops quickly over 0.32 seconds, swept horns, hollow belly, visible ribs, wing holes, barbed tail, sickly skin patches and plague mist |

The new undead artwork matches Jack’s drawing with soft uneven black contours, rounded corners, flat muted colors, unequal expressive eyes, and simple toothy mouths. Existing movement cycles remain. Combat values and internal enemy IDs stay unchanged.

Ability uses now show a colored burst and a label naming the caster class, ability, and its effect for 1.8 real animation seconds (readable at fast game speeds). The source hero stays marked during timed effects, with countdowns. Targeted casts show a brief source-to-target trail; zones show boundaries and elemental particles, leader boosts highlight nearby allies, traps glow when placed, and melee bursts show expanding waves or cuts. Settings pauses the visuals; failed casts produce no activation notice. Combat behavior is unchanged.

DEMONIC NIGHTMARE is based on references/demonic-nightmare-reference.png: dark charcoal body and huge veined wings, yellow horns with distinct left/right purple markings traced from the reference, original purple horn and belly strokes copied directly from the reference as colored vector rectangles, preserving original pixel colors and uniform proportions, separate purple-clawed arms attached at the upper torso (not the hips); wings retain their earlier attachment, yellow eyes, no forehead symbol, two planted dark legs matching the full arm silhouette, with red inner edges and purple claws, and red inner leg edges. It has 225 HP, moves 1.6 times as fast as a basic Skeleton, costs 5 villagers on escape, and rewards 22 gold. Its wave budget cost is 12. At least one appears on round 90; it is eligible afterward except the fixed round 100 lineup. Always airborne from the moment it spawns; it never lands. The Flaming Abomination’s fire whip counts as melee and cannot hit it. Airborne enemies cannot be hit by melee or trigger ground traps; Archer/Mage direct hits have a seeded 40% chance to connect. Burning and ongoing fire still work. It rejects all harmful status effects except burn. It remains airborne through pause and save/continue. The drawing rises above a shrinking shadow, flaps faster in flight, and displays AIRBORNE.

Two maps are playable: The Whispering Woods (original) and Moonlit Marsh (Jack's reference map rotated 90 degrees clockwise: textured purple ground with softly faded pink patches, a sandy-gold curling path with stones and crossings, irregular blue pools, and decorative purple trees with layered leaves and veins, raised canopies, and thick exposed red bark with highlighted grooves and red branches. No removable trees or graves. Enemies enter at the bottom left and finish at the village on the right. Pools block new hero placement. Source reference: references/jack-marsh-map.png). The main menu opens a separate map chooser with preview cards and independent Continue/Start Again buttons. Each Game owns its own route geometry, used for movement, placement, traps, targeted abilities, throws and escape. The chosen map is saved; older saves default to the forest. Restart confirmation applies only to the selected map; other map saves remain intact. Retry retains the current map.

Jack asked for sound effects, custom music, and fuller animation. Heroes use eight drawn direction frames: front, front diagonals, sides, rear diagonals, and back. Each angle uses separately drawn face and body shapes, with a single eye and nose in profile and no facial features on the back; there is no squashing or shearing. Left views mirror the matching right drawings. Attack and reload animations continue in the directional views. Attacking heroes quickly turn toward their chosen target using the shortest turn, keep their last direction when no target is in range during a wave, and turn back to the camera between waves. Newly placed heroes begin facing the camera until a target is available. Turning pauses with Settings and saves with the hero. Leaders turn toward enemies when using their fear shout or an ability, and otherwise hold their last direction during the round. Archers reach back to their quiver, nock an arrow, pull the bowstring before their next shot, and recoil on release. Heroes lean into attacks, leaders gesture during waves, and mages gather orbiting casting sparks. Preparation scales with attack speed, only plays with a target in range, and freezes with Settings. Combat timing is unchanged. Elemental Arrows have fire/frost trails and impact sparks; lightning has bright branching-looking zigzags. Burning enemies shed embers, slowed enemies have snowflakes, frozen enemies have ice shells, stunned enemies have orbiting stars, and poison bubbles rise. Wild Weather has moving clouds and rain; other elemental ground areas have drifting particles. These effects follow the game clock and pause with Settings. Firecracker Arrow impacts show a small expanding orange-and-yellow explosion with flying sparks, fading over 0.45 seconds. Explosion Time uses a larger burst. Damage and attack timing stay the same.

The current art pass includes breathing heroes, sword and dagger swings, bow drawing, staff casting, moving cloth cloaks, walking skeletons, flapping dragon wings, moving tails, swaying removable trees, chimney smoke, and animated fire/poison effects. These are drawn in code; they are not video recordings or a full 3D animation system. Combat visuals should remain readable at higher game speeds. Freezing/stunning enemies should stop their walking animation. Opening Settings freezes game animation and combat.

Original synthesized soundtracks exist: **Lanterns in the Woods** for menu/preparation, **Hold the Path** for battles, **The Bone Crown** for boss/endless play, and a victory theme. Sounds include sword/dagger swings, arrows, spells, upgrades/purchases, wave starts/completions, abilities, explosions, fear, village damage, and defeat. The volume slider controls both music and effects and can mute them. Browser audio begins after the first user interaction. The music tracks are generated with Web Audio. The Skull Screecher uses a trimmed CC0 horror scream recording by Vinrax; source and processing details are in assets/audio/CREDITS.md.

## 6. Hero placement, targeting, and base statistics

Heroes never walk around. Leaders do not attack. Before upgrades, a knight's swing can hit **3 enemies**; an archer, mage, or rogue hits **1**. Mage projectiles initially deal single-target damage until an appropriate upgrade changes that.

| Hero | Purchase cost | Damage per hit | Time between attacks | Reach compared with a knight |
|---|---:|---:|---:|---|
| Knight | 75 | 10 | 1 second | 1× |
| Archer | 100 | 12 | 1 second | 3× |
| Rogue | 90 | 13 | 0.7 seconds | 1× |
| Leader | 125 | 0 (never attacks) | — | 2× support reach |
| Mage | 150 | 15 | 1.5 seconds | 2.5× |
| Tool Maker | 140 | 18 | 1.5 seconds | 90 melee / 240 with Double-Rang |
| Water Serpant | 150 | 16 water damage | 1.3 seconds | 210 map units; water placement only |

**Current hero balance:** All attacking heroes deal 25% more damage than the base values in the tables and upgrade descriptions below, including abilities, traps, explosions, burns, and poison. This multiplier applies once, before enemy armor, and combines with support bonuses. Leader damage and attack-speed bonus amounts are 25% stronger (a 10% bonus becomes 12.5%); this includes Battle Roar, Village Festival, and Wise General’s damage vulnerability. Matching boosts still do not stack. Hero costs, range, base attack intervals, cooldowns, control effects, and economy bonuses are unchanged. Existing saved heroes receive this adjustment automatically. During rounds **1 through 15**, attacking heroes also receive a temporary **15% attack-speed bonus**: divide their attack interval, after other speed bonuses, by 1.15. The bonus ends when round 16 begins. It does not change leader support, ability cooldowns, trap placement timers, or damage-over-time tick rates. It applies automatically when loading an early-round save.

Every unupgraded leader makes nearby heroes attack **10% faster**. This base amount is now **12.5%** with the current hero balance adjustment.

Attacking heroes can aim at: **closest to the village**, **farthest from the village**, **strongest**, or **nearest to the hero**. The prototype uses highest current health for strongest. The prototype's knight starting reach is 85 map units, so the other ranges are 255, 85, 170, and 212.5 respectively.

## 7. Upgrade rules

- Every hero has **4 paths**, each with **6 upgrades**, purchased in order.
- A single hero may use **2 paths**. Buying the first upgrade in a second path permanently locks the two unused paths for that hero.
- Only one chosen path may go past upgrade 2. It can reach **6**; the other can reach **2**.
- The main path is determined by the first path taken to upgrade 3; choosing a path first does not by itself force it to be the main path.
- **Headless Zombie artwork:** Matches Jack’s hand-drawn style with soft uneven black outlines, muted green skin, unequal eyes, a toothy mouth, a patched navy shirt, brown trousers, big dark boots and visible fingers. The carried, rolling and screaming head share the same face. Existing animations and gameplay remain unchanged.
- Each enemy can receive at most **3 successful fear or knockback effects combined** in its lifetime. Failed attempts (including shadow immunity and boss effect blocks) do not consume a use. The third effect runs normally; subsequent fear and knockback cannot apply or refresh. Tiny swarms share the count, and a single area application counts once per swarm. Counts persist through saves and shadow phases. Other status effects remain unaffected.
- **Werewolf:** 405 base HP (same as Weaker Cyclops), half the Weaker Cyclops movement speed, first eligible on round 60, budget cost 14, reward 18, village loss 5. Uses assets/enemies/werewolf-poses-marked.png, an eight-frame transparent sprite sheet generated from the user’s drawing. A separate eight-frame walking sheet (assets/enemies/werewolf-walk-marked.png) uses heel contact, knee bend, passing and push-off poses; its full cycle advances over 72 path units and stops when movement stops. Authored pickup, chest lift, overhead, behind-back, swing and release poses replace the old twisted cutout arms; complete frames render without arm deformation. Gray skin, green markings, a pale gray patch on one side of the forehead and rough outlines retain the reference character. Walking faces along the path, retaining its incoming orientation on vertical segments and reversing under fear. Every 5 simulation seconds, picks the nearest eligible enemy within 100 units, winds up continuously for 0.75 seconds and throws it in a low 1.6-second arc (40 units of extra height) 2,000 path units ahead (capped just before the exit). Hand movement interpolates continuously through pickup, lift, overhead, windup and swing; the release follow-through uses eight newly drawn arm-lowering frames over 1 second before walking resumes while the projectile continues. Never overlaps throws; waits for nearby allies if none are available. Tiny Skeleton swarms travel together, with individual damage and deaths. Skull Screechers and hidden Shadow Gouls cannot be picked up. Death, stun, freeze or fear interrupts the carrier before release; released projectiles continue after carrier death. Throw state survives save/load and pause. Preview: werewolf-preview/watch-demo.html.
- **Skull Screecher:** 240,000 base HP, first eligible on round 80, budget cost 100, 120 gold reward. Reference: references/skull-screecher-reference.png. A broad inverted-triangle skull with a top-edge mouth, no eyes, and four matching jointed bone legs with broad split feet, drawn at 37.5% of its original size animates in the hand-drawn palette. Wanders back and forth with random pauses for 15 simulation seconds after spawning, without escaping. Then selects the two closest heroes by distance, projects their midpoint onto the path, follows the route, and steps at most 26 units from the centerline to its edge. Plays a 1.4-second layered monster screech made from the recorded voice, with a descending shriek and low throat layer at peak gain 0.55, with other sounds lowered to 25% during the screech and restored over 0.25 seconds afterward, applies the same full 15-second hero stun, and dies. One remaining hero can be targeted; with none it screams and dies without stunning. Replans if a target is sold before the scream. Immune to every status effect, knockback, enemy shields, captain speed boosts and damage-vulnerability debuffs; ordinary damage still works. Killing it early prevents its scream. Existing round-end stun cleanup applies. Wandering, targets, approach and scream timing survive saves and pause.
- **Hell Hound:** First appears on round 55. 99 HP, three times the regular Ghoul’s speed, 12 gold reward, 3 villagers lost on escape, wave budget cost 8. Black coat with a glowing orange belly and warm ground light. Animated four-legged gallop, bobbing long-muzzled head, jaw, curved whip tail and sharp black back spines. The blast has a white-hot flash, billowing orange flames, a shockwave, smoke and sparks. On death it explodes in radius 240 for 225 base damage to other enemies; armor, shields and Shadow Goul immunity still apply. No hero damage bonuses apply. Explosions can chain through other Hell Hounds and pay normal kill rewards. Heroes and villagers are not damaged by the blast. Escaping does not trigger an explosion.
- **Shadow Goul:** 337.5 HP, slow movement (60% of basic Skeleton speed), first eligible at wave 45, 16 gold reward, 4 villagers lost on escape, wave budget cost 12. Five seconds after spawning it sinks into its shadow, becoming immune to all damage and harmful effects for 5 seconds. Shadow entry repeats every 7 seconds, leaving 2 seconds vulnerable between phases. Entering shadow removes existing debuffs, including damage over time, stun and fear; new ones cannot apply. It continues moving in shadow. Sinking and crawling-out animations share the saved simulation clock and pause with the game.
- **Headless Zombie:** 180 HP, 30% faster than a basic Skeleton, introduced at wave 30 with one guaranteed spawn, with half the selection weight of other eligible enemy types. At one-third HP (including a lethal hit), it throws its head once. It rolls for 1.2 seconds halfway toward the highest-investment unstunned hero within 180 pixels, or 85 pixels forward if none is nearby. It opens its jaw wide, shakes and sends out sound waves with a synthesized scream at half its original volume (no on-screen scream text) for 1 second, then vanishes and stuns the highest-investment hero within 180 pixels of the head for 15 simulation seconds. Already stunned heroes cannot be targeted, including at scream resolution. If no eligible hero is nearby, no stun is applied. All remaining hero stuns clear on round completion. Stun blocks attacks, new traps, fear calls, and manual abilities; allied buffs, passive bonuses, traps, ongoing damage and weakening effects from that hero are suspended too; unexpired effects resume afterward. Heads persist after body death and save/load, and delay wave completion until resolved.
- For each hero type and specific upgrade path, allow at most **3 heroes at exactly level 4**, **2 at exactly level 5**, and **1 at level 6**. Higher levels do not count toward lower-level limits; upgrading frees the previous level’s slot. Different paths and hero types have separate limits. Selling a hero frees its slots. Existing heroes in older saves are kept even if already above a limit; new purchases cannot exceed the applicable limit. The upgrade panel explains when a limit blocks an upgrade.
- Every upgrade retains earlier upgrades in that path unless the description replaces a number or effect.
- All prices below buy **just that upgrade**, not the whole path.
- The listed damage/effects describe that path by itself, before any additional cross-path or leader bonuses unless stated.
- Matching leader boosts count only once, using the strongest version. Different types of boosts can work together.
- Abilities that the player activates have buttons along the bottom of the screen. Their buttons show the remaining wait in seconds.

### Current ability progression

- Knight stun durations are reduced by 75%: Shield Bash 0.25s; upgraded bash and Shield Slam 0.5s; tier-6 Seismic Slam 0.625s, A Thousand Cuts 1.5625s, and Unbreakable Guardian 1.25s.

- Only tier 6 unlocks a primary ability. There are no secondary abilities.
- Original tier-4 and tier-5 passive upgrades remain. Earthshaker retains its original passive effects alongside Seismic Slam.
- Tier-6 abilities retain 125% primary strength and 20% shorter base cooldowns. Second Wind clears other eligible cooldowns but cannot shorten itself or another Second Wind.
- Ability damage is before the existing 25% hero bonus and support/enemy modifiers.
- Existing saves use these unlock rules automatically; primary cooldowns are preserved.
- ABILITY_GUIDE.md lists all current abilities.

## 8. Complete hero upgrade catalogue

All **240 upgrades** and their prices follow. Names reflect Jack's changes, especially **A Thousand Cuts**, **VALLEY OF ARROWS** (keep this exact name), and **Explosion Time**.

### Knight

#### Mighty Sword

| Level | Upgrade | Cost | Effect |
|---|---|---:|---|
| 1 | Sharp Edge | 40 | Sword damage becomes 15. |
| 2 | Longer Sword | 60 | Reach increases by 25%. |
| 3 | Wide Swing | 150 | Each swing hits up to 6 enemies. |
| 4 | Heavy Steel | 350 | Sword damage becomes 35. Sword attacks can now damage Ironlings and other enemies with Iron Hardness (Pursuit Rocks also require camouflage detection). |
| 5 | Ground Slam | 900 | Every fourth swing also slams all enemies in reach for 60 damage. Use Attack rotation beside targeting to choose its order and number of uses, or turn it off. Listed automatic attack counts apply until you save a custom rotation. |
| 6 | Earthshaker | 2,500 | Sword: 60 damage. Slam: 150. A wave travels toward the entrance for twice your reach, dealing 100 damage. Seismic Slam: Slam every enemy in reach for 250 damage; push back 53.125 and stun 0.625 seconds. Base wait: 32 seconds. |

Base-reference interaction notes (ability numbers superseded by the current table): A target can take damage from the sword, the ground slam, and the traveling wave. Earthshaker is a passive upgrade, not a button ability.

#### Swift Blade

| Level | Upgrade | Cost | Effect |
|---|---|---:|---|
| 1 | Quick Hands | 40 | Swings every 0.8 seconds. |
| 2 | Light Sword | 65 | Swings every 0.6 seconds. |
| 3 | Double Strike | 160 | Every third swing hits twice. |
| 4 | Twin Blades | 400 | Swings every 0.4 seconds. |
| 5 | Blade Flurry | 950 | Every 8 seconds, swings twice as fast for 3 seconds. |
| 6 | A Thousand Cuts | 2,800 | A Thousand Cuts: 20 cuts of 31.25 damage per enemy over 1 second; stun 1.5625 seconds. Base wait: 33.6 seconds. |

Base-reference interaction notes (ability numbers superseded by the current table): The sword still deals 10 damage without other bonuses. A Thousand Cuts hits all enemies in reach when activated with 20 cuts of 25 damage, for 500 total per enemy, over a 1-second burst. Its stun lasts 5 seconds; its cooldown is exactly 42 seconds. Blade Flurry doubles swing speed for 3 seconds every 8 seconds.

#### Shield Guardian

| Level | Upgrade | Cost | Effect |
|---|---|---:|---|
| 1 | Shield Bash | 50 | Every third attack bashes one enemy for 15 damage and stuns for 0.25 seconds. Shield bashes can damage Ironlings and other enemies with Iron Hardness (Pursuit Rocks also require camouflage detection). Use Attack rotation beside targeting to choose its order and number of uses, or turn it off. Listed automatic attack counts apply until you save a custom rotation. |
| 2 | Strong Shove | 75 | Bashes also push enemies back half your starting reach. |
| 3 | Wide Shield | 175 | Bashes hit up to 5 enemies. |
| 4 | Crushing Bash | 350 | Bashes deal 40 damage and stun for 0.5 seconds. |
| 5 | Shield Slam | 850 | Every third bash also slams all enemies in reach for 80 damage and a 0.5-second stun. |
| 6 | Unbreakable Guardian | 2,400 | Unbreakable Guardian: Deal 250 damage to enemies in reach, push back 106.25, and stun 1.25 seconds. Base wait: 28 seconds. |

Base-reference interaction notes (ability numbers superseded by the current table): Regular sword hits still deal 10 damage. Strong Shove pushes by half a starting knight reach (42.5 map units); Unbreakable Guardian pushes by one starting reach (85). Enemies can take both bash and slam damage; their stun times do not add together.

#### Holy Knight

| Level | Upgrade | Cost | Effect |
|---|---|---:|---|
| 1 | Blessed Blade | 45 | Adds 5 holy damage per sword hit. This entire hero can no longer affect enemies with Energy Shield. |
| 2 | Lingering Light | 70 | Burns enemies for 3 damage per second for 3 seconds. Holy burns and later light attacks can damage Ironlings and other enemies with Iron Hardness (Pursuit Rocks also require camouflage detection). |
| 3 | Radiant Swing | 170 | Every third swing sends light through up to 8 enemies for 25 damage. This hero can now detect Camoflaugers, Pursuit Rocks and Hidden Mummies with all attacks, effects and traps, including crosspaths. Use Attack rotation beside targeting to choose its order and number of uses, or turn it off. Listed automatic attack counts apply until you save a custom rotation. |
| 4 | Sacred Fire | 400 | Burns deal 8 per second for 5 seconds. Light waves apply the burn too. |
| 5 | Spreading Light | 1,000 | Defeated burning enemies spread their fire to nearby enemies. |
| 6 | Dawnbringer | 2,700 | Dawnbringer: Deal 375 damage in reach and burn for 31.25 damage per second for 8 seconds. Base wait: 36 seconds. |

Base-reference interaction notes (ability numbers superseded by the current table): Blessed Blade gives 15 total sword damage. Radiant Swing hits up to 8 enemies. Spreading Light reaches half a starting knight reach. Repeated burns from the same knight refresh their duration; they do not stack, and a weaker burn does not replace a stronger one.

### Archer

#### Powerful Arrows

| Level | Upgrade | Cost | Effect |
|---|---|---:|---|
| 1 | Sharp Tips | 45 | Arrows deal 18 damage. |
| 2 | Piercing Arrows | 75 | Each arrow pierces 2 enemies. |
| 3 | Heavy Arrows | 175 | Arrows deal 30 damage and ignore 3 armor. |
| 4 | Skewer Shot | 400 | Arrows pierce 6 enemies. |
| 5 | Splinter Shot | 1,000 | Each hit releases 3 splinters, dealing 8 damage to different nearby enemies. |
| 6 | VALLEY OF ARROWS | 3,500 | VALLEY OF ARROWS: Splitting arrows deal 50 per hit. Each branch stops after 10 hits. Base wait: 32 seconds. |

Base-reference interaction notes (ability numbers superseded by the current table): Splinters cannot make more splinters. VALLEY OF ARROWS arrows may return to an earlier target but cannot immediately hit the same enemy they just struck. Each branch stops after its tenth hit. An arrow with no other living enemy in the archer’s range disappears. The ability arrows do not make Splinter Shot splinters.

#### Rapid Fire

| Level | Upgrade | Cost | Effect |
|---|---|---:|---|
| 1 | Quick Draw | 40 | Shoots every 0.8 seconds. |
| 2 | Double Nock | 90 | Fires 2 arrows per attack. |
| 3 | Trick Shot | 180 | Every third attack also drops 3 arrows for 18 damage each. The extra falling arrows can damage Ironlings and other enemies with Iron Hardness (Pursuit Rocks also require camouflage detection). This entire hero can no longer affect enemies with Energy Shield. Use Attack rotation beside targeting to choose its order and number of uses, or turn it off. Listed automatic attack counts apply until you save a custom rotation. |
| 4 | Explosive Rhythm | 425 | Every fifth attack has firecracker arrows: explosions deal 20 damage. |
| 5 | Perfect Rhythm | 1,050 | Every third attack has firecrackers, including its falling arrows. |
| 6 | Explosion Time | 2,800 | Explosion Time: For 5 seconds, arrows add explosions dealing 75 damage in radius 85. Base wait: 48 seconds. |

Base-reference interaction notes (ability numbers superseded by the current table): Firecracker explosions reach half a starting knight reach and add 20 damage. Explosion Time explosions reach a full starting knight reach and add 60 damage. The large explosions replace the small firecracker explosions. Direct arrow damage and explosion damage both apply. Explosion Time lasts exactly 5 seconds and has a 60-second cooldown.

#### Elemental Arrows

| Level | Upgrade | Cost | Effect |
|---|---|---:|---|
| 1 | Flaming Tips | 50 | Arrows burn for 3 damage per second for 3 seconds. Arrows and their burns can damage Ironlings and other enemies with Iron Hardness (Pursuit Rocks also require camouflage detection). This entire hero can no longer affect enemies with Energy Shield. |
| 2 | Frostbite | 85 | Arrows slow by 25% for 2 seconds. |
| 3 | Lightning Leap | 200 | Every third arrow jumps lightning through 3 other enemies for 15 damage each. Use Attack rotation beside targeting to choose its order and number of uses, or turn it off. Listed automatic attack counts apply until you save a custom rotation. |
| 4 | Cold Snap | 450 | Every third hit on the same enemy freezes it for 1 second. |
| 5 | Thunder and Flame | 1,100 | Lightning deals 30 damage and applies the burn. |
| 6 | Wild Weather | 2,900 | Wild Weather: 8-second storm: 25 burn damage per second, 50% slow, and up to 5 lightning hits of 50 each second. Base wait: 36 seconds. |

Base-reference interaction notes (ability numbers superseded by the current table): Lightning jumps to 3 other enemies. Wild Weather may be placed anywhere on the path; its circle is two starting knight reaches across (radius 85 map units). It lasts 8 seconds, deals 20 fire damage each second, slows by 40%, and strikes up to 5 enemies per second for 40 damage each. Repeated burns from the same archer refresh. Only the strongest slowing effect applies.

#### Eagle Eye

| Level | Upgrade | Cost | Effect |
|---|---|---:|---|
| 1 | Keen Sight | 35 | Reach increases 25%. |
| 2 | Steady Aim | 65 | Arrows deal double damage to full-health enemies. This hero can now detect Camoflaugers, Pursuit Rocks and Hidden Mummies with all attacks, effects and traps, including crosspaths. |
| 3 | Hunter’s Mark | 225 | Marks the strongest enemy in reach. All heroes deal 20% more damage to it. |
| 4 | Watchtower | 550 | Can shoot and mark anywhere on the map. |
| 5 | Find the Weak Spot | 1,200 | Each hit on the marked enemy adds 4 damage, up to 40. Resets when the target changes. |
| 6 | Perfect Shot | 2,800 | Perfect Shot: Deal 2500 damage to one enemy anywhere, ignoring armor. Base wait: 40 seconds. |

Base-reference interaction notes (ability numbers superseded by the current table): Steady Aim doubles a normal 12-damage arrow to 24 against full-health enemies. Only one enemy per archer is marked. Matching Hunter’s Marks do not add together. Find the Weak Spot adds 4 damage per hit up to 40 and resets when the marked target changes. Perfect Shot benefits from Hunter’s Mark but not Steady Aim’s full-health doubling.

### Rogue

#### Assassin

| Level | Upgrade | Cost | Effect |
|---|---|---:|---|
| 1 | Sharp Daggers | 40 | Dagger damage becomes 18. |
| 2 | Pick a Target | 65 | Deals 10 extra damage to the strongest enemy in reach. This hero can now detect Camoflaugers, Pursuit Rocks and Hidden Mummies with all attacks, effects and traps, including crosspaths. |
| 3 | Vital Strike | 160 | Every third attack deals double damage. Vital Strike critical hits can damage Ironlings and other enemies with Iron Hardness (Pursuit Rocks also require camouflage detection). |
| 4 | Marked for Death | 450 | Hits on a marked target add 3 damage, up to 30. Its mark and damage bonus move to a new enemy when it falls. |
| 5 | Hidden Weakness | 1,100 | Every third hit on the marked enemy makes it take 25% more damage from all heroes for 3 seconds. |
| 6 | Death Strike | 2,600 | Death Strike: Deal 1250 damage plus 25 per 1% of target health lost. Base wait: 36 seconds. |

Base-reference interaction notes (ability numbers superseded by the current table): Chain of Shadows was removed as a separate upgrade: its mark-transfer effect is included in Marked for Death. Hidden Weakness is the accepted fifth upgrade. It lasts 3 seconds. Death Strike deals 2,000 damage against an enemy at half health; it benefits from Hidden Weakness but does not get doubled by Vital Strike.

#### Poison Master

| Level | Upgrade | Cost | Effect |
|---|---|---:|---|
| 1 | Poisoned Daggers | 45 | Poison deals 4 damage per second for 3 seconds. |
| 2 | Lasting Venom | 60 | Poison lasts 6 seconds. |
| 3 | Stronger Dose | 175 | Repeated hits add 2 poison damage per second, up to 14. |
| 4 | Spreading Sickness | 400 | Defeated poisoned enemies leave a cloud for 3 seconds. It poisons for 8 per second for 6 seconds. |
| 5 | Withering Poison | 1,000 | Poisoned enemies move 20% slower and lose 3 armor. |
| 6 | Toxic Fog | 2,500 | Toxic Fog: Fog lasts 8 seconds and applies 62.5 poison damage per second, lingering 6 seconds. Base wait: 36 seconds. |

Base-reference interaction notes (ability numbers superseded by the current table): Spreading Sickness clouds last 3 seconds and have radius equal to the rogue’s starting reach (85). Toxic Fog has the same radius, lasts 8 seconds, and refreshes its 6-second poison while an enemy remains inside. Only the strongest poison from the same rogue deals damage at once. Withering Poison slows by 20% and reduces armor by 3, never below zero.

#### Trap Maker

| Level | Upgrade | Cost | Effect |
|---|---|---:|---|
| 1 | Hidden Spikes | 50 | Places a trap every 5 seconds. It hits 3 enemies for 20 damage each and lasts 30 seconds. Use Attack rotation beside targeting to choose its order and number of uses, or turn it off. Listed automatic attack counts apply until you save a custom rotation. |
| 2 | Sticky Trap | 70 | Traps slow by 30% for 3 seconds. |
| 3 | Spring Trap | 180 | Every third trap pushes enemies back one starting reach. |
| 4 | Packed with Trouble | 350 | Traps hit 8 enemies before breaking. |
| 5 | Chain Reaction | 950 | Traps explode for 60 damage when breaking or expiring. |
| 6 | The Floor Is Traps | 2,400 | The Floor Is Traps: Place 15 upgraded traps, every third one a spring trap. Base wait: 32 seconds. |

Base-reference interaction notes (ability numbers superseded by the current table): Normal traps are placed every 5 seconds and last 30 seconds. Each trap can hit an individual enemy only once. Spring traps push by one rogue starting reach (85). Chain Reaction explosions have radius half that reach (42.5), dealing 60 damage. Traps explode when used up or when they expire. The Floor Is Traps places 12 traps, including 4 spring traps, with all purchased trap upgrades. The rogue still attacks with daggers.

#### Treasure Hunter

| Level | Upgrade | Cost | Effect |
|---|---|---:|---|
| 1 | Bone Collector | 80 | Your defeated enemies give 10% more money. |
| 2 | Helping Hand | 100 | Other heroes in reach deal 10% more damage. |
| 3 | Loaded Pockets | 200 | Every fifth attack also throws a 40-damage bomb. Use Attack rotation beside targeting to choose its order and number of uses, or turn it off. Listed automatic attack counts apply until you save a custom rotation. |
| 4 | Finders Keepers | 650 | Enemies defeated by other heroes in reach give 5% more money. |
| 5 | Bounty Hunter | 1,400 | Marks the strongest enemy for a 25% money bounty. |
| 6 | Payday | 3,200 | Payday: For 10 seconds, rewards in reach gain 62.5% extra gold. Base wait: 48 seconds. |

Base-reference interaction notes (ability numbers superseded by the current table): Helping Hand improves other heroes’ damage by 10%. Loaded Pockets bombs have radius 42.5. Only one bounty is active per rogue. Matching money boosts from multiple rogues count only once. Passive bonuses are halved: own kills +10%, allied kills +5%, bounty +25%. Payday and Festival give +62.5% gold at tier 6. Different passive bonuses add before the strongest ability multiplier. Base rewards keep their normal rounding; fractional bonus gold carries between kills and survives saves.

### Leader

#### Battle Captain

| Level | Upgrade | Cost | Effect |
|---|---|---:|---|
| 1 | Rallying Cry | 65 | Nearby heroes deal 10% more damage. |
| 2 | Keep Up! | 100 | Attack-speed boost rises from 10% to 20%. |
| 3 | Stand Together | 250 | Nearby heroes deal another 10% damage when beside another attacking hero. |
| 4 | Lead the Charge | 500 | Attack-speed boost rises to 50% for the first 5 seconds of a wave. |
| 5 | Keep Fighting! | 1,400 | Every fifth attack lands an extra hit. Extra hits do not trigger special effects. |
| 6 | Battle Roar | 4,000 | Battle Roar: For 8 seconds, nearby heroes gain 125% damage and attack speed (before the Leader bonus buff); stronger passive bonuses are retained. Base wait: 48 seconds. |

Base-reference interaction notes (ability numbers superseded by the current table): Stand Together requires another attacking hero within one knight starting reach of the buffed hero. Battle Roar replaces this leader’s smaller damage/speed boosts while active. Keep Fighting extra hits do not trigger abilities, explosions, or more extra hits.

#### Fearsome Commander

| Level | Upgrade | Cost | Effect |
|---|---|---:|---|
| 1 | Scary Shout | 55 | Every 6 seconds, fears one enemy for 1 second. |
| 2 | Booming Voice | 70 | Fear reaches 25% farther. |
| 3 | Mass Panic | 200 | Shouts scare up to 6 enemies. |
| 4 | Shaking Boots | 400 | After fear ends, affected enemies move 30% slower for 3 seconds. |
| 5 | Terrifying Presence | 1,000 | Shouts every 4 seconds. Fear lasts 2 seconds. |
| 6 | Run for Your Lives! | 2,600 | Run for Your Lives!: Fear all enemies in fear range for 6.25 seconds. Base wait: 48 seconds. |

Base-reference interaction notes (ability numbers superseded by the current table): Scary Shout acts every 6 seconds on one enemy for 1 second. Terrifying Presence changes this to every 4 seconds for 2 seconds. Mass Panic allows 6 targets. Run for Your Lives! has Jack’s changed cooldown of 60 seconds, not the earlier 45. If an enemy blocks fear, it also avoids that shout’s follow-up slow. Fear duration reductions still apply after immunity blocks are exhausted.

#### Wise General

| Level | Upgrade | Cost | Effect |
|---|---|---:|---|
| 1 | Watchful Eyes | 60 | Nearby attacking heroes gain 15% reach. |
| 2 | Ready Sooner | 125 | Nearby heroes’ ability waits become 10% shorter. |
| 3 | Spot the Weakness | 300 | Enemies in reach take 15% more damage from heroes also in reach. |
| 4 | Shared Plans | 500 | The leader’s own reach increases 30%. |
| 5 | Perfect Timing | 1,600 | A nearby ability use removes 2 seconds from other nearby waits, at most once every 5 seconds. |
| 6 | Second Wind | 4,500 | Second Wind: Remove 100% of remaining waits from nearby abilities. Cannot shorten Second Wind. Base wait: 72 seconds. |

Base-reference interaction notes (ability numbers superseded by the current table): Ready Sooner makes a 60-second cooldown become 54 seconds. Shared Plans increases the leader’s own range by 30%. Perfect Timing can trigger at most once every 5 seconds, reducing other nearby ability waits by 2 seconds. Second Wind cannot reset itself or any other Second Wind. No other leader power can shorten its 90-second wait.

#### Village Champion

| Level | Upgrade | Cost | Effect |
|---|---|---:|---|
| 1 | Better Bargains | 100 | Other heroes’ upgrades cost 5% less in reach. |
| 2 | Waste Nothing | 150 | Enemies defeated in reach give 5% more money. |
| 3 | Welcome, Heroes! | 300 | New heroes in reach cost 10% less. |
| 4 | Village Supplies | 750 | Gives 15 money after each wave, or 8 with 50 villagers or fewer. |
| 5 | Master Bargainer | 1,600 | Both discounts rise to 15%. |
| 6 | Village Festival | 3,500 | Village Festival: For 10 seconds, rewards in reach gain 62.5% gold and nearby heroes gain 37.5% attack speed before the Leader bonus buff. Base wait: 48 seconds. |

Base-reference interaction notes (ability numbers superseded by the current table): Village Supplies grants 15 each completed wave, or 8 with 50 or fewer villagers. Master Bargainer replaces the earlier discounts with 15% for hero purchases and upgrades. Discounted prices round up. Village Festival and Payday share the strongest +62.5% gold boost; they do not stack. Festival’s 30% speed boost replaces the normal 10% leader boost while active.

### Mage

#### Fire Mage

| Level | Upgrade | Cost | Effect |
|---|---|---:|---|
| 1 | Fireball | 55 | Fireballs explode for 15 damage in a small area. Fireballs and their later fire effects can damage Ironlings and other enemies with Iron Hardness (Pursuit Rocks also require camouflage detection). |
| 2 | Lasting Flames | 75 | Burns for 4 per second for 3 seconds. |
| 3 | Bigger Blast | 175 | Explosions grow to one knight’s starting reach. |
| 4 | Burning Ground | 425 | Leaves fire for 4 seconds, dealing 10 damage per second. |
| 5 | Wildfire | 1,100 | Burns deal 10 per second and spread to nearby enemies. |
| 6 | Meteor Shower | 2,900 | Meteor Shower: For 8 seconds, drop 2 meteors per second, each dealing 125 damage, plus purchased burns and fire patches. Base wait: 48 seconds. |

Base-reference interaction notes (ability numbers superseded by the current table): Initial fireball radius is half a starting knight reach (42.5), growing to a full starting reach (85). Burning Ground lasts 4 seconds and deals 10 damage per second. Wildfire spreads burn once per second to enemies within 42.5. Meteor Shower drops 2 meteors per second for 8 seconds, each dealing 100 damage in radius 85. Meteors burn and leave fire patches. Overlapping patches from the same mage do not stack damage. Repeated burns refresh.

#### Ice Mage

| Level | Upgrade | Cost | Effect |
|---|---|---:|---|
| 1 | Chilling Bolts | 50 | Hits slow by 25% for 2 seconds. |
| 2 | Deep Freeze | 65 | Slow lasts 4 seconds. |
| 3 | Frozen Solid | 200 | Every third hit on an enemy freezes it for 1.5 seconds. |
| 4 | Shattering Ice | 400 | Defeated frozen enemies burst for 30 damage nearby. |
| 5 | Slippery Path | 1,050 | Attacks leave ice for 5 seconds, slowing enemies 40%. |
| 6 | Blizzard | 2,800 | Blizzard: 8-second storm: 31.25 damage per second, 50% slow, and 1.25-second freezes at seconds 2, 4, 6, and 8. Base wait: 44 seconds. |

Base-reference interaction notes (ability numbers superseded by the current table): Ice patches have radius 42.5 and last 5 seconds. Blizzard lasts 8 seconds over the mage’s reach, deals 25 damage per second, and slows by 40%. It freezes for 1 second at seconds 2, 4, 6, and 8. Overlapping freeze durations do not add together; only the strongest slowing effect applies. Giants and Dragons use their immunity blocks against these effects.

#### Storm Mage

| Level | Upgrade | Cost | Effect |
|---|---|---:|---|
| 1 | Lightning Bolt | 60 | Lightning hits 2 enemies for 15 damage each. Use Attack rotation beside targeting to choose its order and number of uses, or turn it off. Listed automatic attack counts apply until you save a custom rotation. |
| 2 | Longer Sparks | 70 | Lightning jumps twice as far. |
| 3 | Chain Lightning | 200 | Lightning hits up to 6 enemies. |
| 4 | Thunderclap | 450 | Every fifth attack deals 25 damage and stuns for 1 second throughout your reach. Use Attack rotation beside targeting to choose its order and number of uses, or turn it off. Listed automatic attack counts apply until you save a custom rotation. |
| 5 | Building Charge | 1,150 | Each jump adds 5 damage: 15, 20, 25, 30, 35, 40. |
| 6 | Eye of the Storm | 3,000 | Eye of the Storm: For 8 seconds, strike 4 times per second for 75 damage; every third strike stuns for 1.25 seconds. Base wait: 48 seconds. |

Base-reference interaction notes (ability numbers superseded by the current table): Initial jump distance is one knight starting reach (85), increasing to 170. Each normal chain hits any one enemy at most once. Building Charge makes a full six-target chain deal 15, 20, 25, 30, 35, and 40 damage. Eye of the Storm strikes 4 times per second for 8 seconds, 60 damage each, and stuns the target of every third strike for 1 second. Ability strikes may repeatedly hit a target but do not jump. Regular attacks continue during the ability.

#### Arcane Mage

| Level | Upgrade | Cost | Effect |
|---|---|---:|---|
| 1 | Magic Missile | 35 | Magic follows its target and deals 15 damage. This hero can now detect Camoflaugers, Pursuit Rocks and Hidden Mummies with all attacks, effects and traps, including crosspaths. |
| 2 | Armor Breaker | 80 | Ignores 3 armor. Main magic attacks and later arcane attacks can damage Ironlings and other enemies with Iron Hardness (Pursuit Rocks also require camouflage detection). |
| 3 | Piercing Beam | 200 | Every third attack becomes a 30-damage beam through up to 8 enemies. Use Attack rotation beside targeting to choose its order and number of uses, or turn it off. Listed automatic attack counts apply until you save a custom rotation. |
| 4 | Arcane Echo | 450 | Each beam repeats after 0.3 seconds. |
| 5 | Unstable Magic | 1,100 | Beam hits mark enemies for 5 seconds. Defeated marked enemies explode for 50 damage nearby. |
| 6 | Arcane Overload | 3,100 | Arcane Overload: For 8 seconds, every attack is a 125-damage armor-ignoring beam. Purchased echoes remain. Base wait: 48 seconds. |

Base-reference interaction notes (ability numbers superseded by the current table): Normal beams hit up to 8 enemies in a line within reach. Arcane Echo repeats the beam on the same line after 0.3 seconds for full damage. Unstable Magic marks last 5 seconds; defeated marked enemies explode for 50 damage in radius 85. Beam hits refresh the mark. Each enemy explodes only once; explosions do not create new marks. Arcane Overload beams keep the echo and ignore all armor.

### Water Serpant

#### Undertow Wrestler

| Level | Upgrade | Cost | Effect |
|---|---|---:|---|
| 1 | Coiling Grip | 60 | Every 5 seconds, throw a small enemy at another enemy farther back on the path; deals 35 damage to both. Moves an entire Tiny Skeleton swarm together. Uses a knockback charge. Use Attack rotation beside targeting to choose its order and number of uses, or turn it off. Listed automatic attack counts apply until you save a custom rotation. |
| 2 | Strong Coils | 110 | Can also throw Zombie Guards and Headless Zombies. Collision damage rises to 60. |
| 3 | Monster Wrestler | 260 | Can also throw Grave Trolls and Werewolves. Collision damage rises to 110. |
| 4 | Crushing Landing | 650 | Can also throw Vampire Lords. Collision damage rises to 200; throws every 4 seconds. |
| 5 | Colossal Grip | 1,600 | Can throw Weaker Cyclops. Collision damage rises to 400; throws every 3 seconds. Bosses and status-immune enemies cannot be thrown. |
| 6 | Leviathan Hurl | 4,200 | Leviathan Hurl: Immediately attempts a colossal throw dealing 1000 collision damage to both enemies. Bosses and knockback-immune enemies resist. Base wait: 36 seconds. |

Base-reference interaction notes (ability numbers superseded by the current table): Uses the existing two-path rules, tier limits, immunity checks and hero damage bonuses.

#### Drowned Passage

| Level | Upgrade | Cost | Effect |
|---|---|---:|---|
| 1 | Flooded Trail | 65 | Floods around path corners. Water heroes can be placed here. If the flood disappears, they sell for the normal refund unless natural water or another flood supports them, or they have their own flood. Becomes the main attack, replacing water shots. Waits hidden beneath the flooded path and surfaces only to grab an enemy. Holds it under for 2 seconds, then rests by size: Tiny Skeleton 0.5s; Skeleton/Ghoul 1s; guard, headless, hound or shadow 2s; troll, fusion or werewolf 3s; vampire 4s; cyclops 6s; wyvern 8s. Attack-speed bonuses shorten the rest. Buying another path upgrade changes the main attack. The other purchased path can attack during its cooldown. Drowns enemies with base HP up to 80; stronger enemies resurface and take 45 water damage. Stun immunity, effect blocks and the 12-control limit apply. Use Attack rotation beside targeting to choose its order and number of uses, or turn it off. Listed automatic attack counts apply until you save a custom rotation. |
| 2 | Hidden Hunter | 120 | Drowns enemies with base HP up to 200; stronger enemies take 80 water damage. |
| 3 | Deep Current | 275 | Drowns enemies with base HP up to 500; stronger enemies take 150 water damage. |
| 4 | Hungry Depths | 700 | Drowns enemies with base HP up to 1200; stronger enemies take 250 water damage. Recovery after dragging is reduced by one-sixth. |
| 5 | Abyssal Passage | 1,700 | Drowns enemies with base HP up to 2000; stronger enemies take 400 water damage. Recovery after dragging is reduced by one-third. Bosses always resurface after 2 seconds. |
| 6 | Call of the Abyss | 4,500 | Call of the Abyss: Drags up to 5 enemies in flooded reach underwater for 2 seconds. Small enemies drown; strong enemies resurface and take 1000 water damage. Bosses always resurface. Normal immunities and control limits apply. Base wait: 40 seconds. |

Base-reference interaction notes (ability numbers superseded by the current table): Uses the existing two-path rules, tier limits, immunity checks and hero damage bonuses.

#### Decoy Flock

| Level | Upgrade | Cost | Effect |
|---|---|---:|---|
| 1 | False Goose | 50 | Places a fake goose on the path every 5 seconds. The first enemy near it stops for 0.5 seconds. Decoys last 12 seconds. Use Attack rotation beside targeting to choose its order and number of uses, or turn it off. Listed automatic attack counts apply until you save a custom rotation. |
| 2 | Startling Honk | 95 | Alternates stopping enemies and making them retreat for 1 second. |
| 3 | Goose Patrol | 225 | Each goose affects up to 3 nearby enemies. |
| 4 | Raucous Flock | 550 | Stops last 1 second; retreat lasts 1.5 seconds. |
| 5 | Grand Goose Parade | 1,300 | Places geese every 3 seconds; each affects up to 6 enemies. Stuns and fear respect immunities and lifetime limits. |
| 6 | Wild Goose Chase | 3,500 | Wild Goose Chase: Spectral geese stop up to 12 enemies in reach for 2.5 seconds, or fear them for 3.75 seconds if their stun allowance is exhausted. Immunities and control limits apply. Base wait: 36 seconds. |

Base-reference interaction notes (ability numbers superseded by the current table): Uses the existing two-path rules, tier limits, immunity checks and hero damage bonuses.

#### Torrent Cannon

| Level | Upgrade | Cost | Effect |
|---|---|---:|---|
| 1 | Water Jet | 55 | Replaces water bolts with one uninterrupted one-second water stream through up to 3 enemies, dealing 110 water damage over the full stream to each. Follows new targets while enemies remain in reach, then rests for 3 seconds. Speed buffs shorten the rest. Use Attack rotation beside targeting to choose its order and number of uses, or turn it off. Listed automatic attack counts apply until you save a custom rotation. |
| 2 | Pressurized Stream | 100 | Stream hits up to 5 enemies for 160 damage each over one second. Water streams can now damage Ironlings and other enemies with Iron Hardness (Pursuit Rocks also require camouflage detection). |
| 3 | Sweeping Torrent | 250 | Stream hits up to 8 enemies for 250 damage each over one second and pushes them 30 path units backward. |
| 4 | Raging Rapids | 600 | Wider stream deals 400 damage over one second, ignores 3 armor, and pushes 50 units. |
| 5 | Tidal Cannon | 1,500 | Stream hits up to 12 enemies for 650 damage each over one second and pushes 80 units. Stream recovery drops to 2 seconds. Each stream pushes each enemy once; knockback has its normal 3-use limit. |
| 6 | Worldbreaker Wave | 4,000 | Worldbreaker Wave: A broad water beam deals 750 damage to up to 20 enemies and pushes them back 150 units. Normal knockback limits apply. Base wait: 40 seconds. |

Base-reference interaction notes (ability numbers superseded by the current table): Uses the existing two-path rules, tier limits, immunity checks and hero damage bonuses.

### Tool Maker

#### Walking Armory

| Level | Upgrade | Cost | Effect |
|---|---|---:|---|
| 1 | Second Steel | 55 | Swings 2 melee weapons together, each hitting up to 3 enemies for 22 damage. Use Attack rotation beside targeting to choose its order and number of uses, or turn it off. Listed automatic attack counts apply until you save a custom rotation. |
| 2 | Fourfold Forge | 100 | Swings 4 weapons for 26 damage each. |
| 3 | Six-Sided Swing | 240 | Swings 6 weapons for 32 damage each. |
| 4 | Eightfold Arsenal | 600 | Swings 8 weapons for 40 damage each. |
| 5 | Ten Tons of Trouble | 1,500 | Swings 10 weapons for 48 damage each. |
| 6 | Twelvefold Tempest | 4,800 | Permanently swings 12 weapons together for 60 damage each; spreads hits across up to 36 nearby enemies. Forge Frenzy: Instantly swing all 12 weapons for 150 damage per weapon, each hitting up to 3 enemies in melee reach. Base wait: 40 seconds. |

Base-reference interaction notes (ability numbers superseded by the current table): Uses the existing two-path rules, tier limits, immunity checks and hero damage bonuses.

#### Returning Ruin

| Level | Upgrade | Cost | Effect |
|---|---|---:|---|
| 1 | Double-Rang | 60 | Replaces the hammer with a hooked double-rang that tracks its moving target on the outward flight, then returns. Range 240. Deals 24 damage, piercing up to 3 enemies outward and 3 on return. Waits for at least one double-rang to return before throwing another volley, including Rebound Storm. Purchased extra melee weapons still swing at nearby enemies. Use Attack rotation beside targeting to choose its order and number of uses, or turn it off. Listed automatic attack counts apply until you save a custom rotation. |
| 2 | Twin Return | 110 | Throws 2 double-rangs together, each dealing 24 damage with 3 pierce per leg. |
| 3 | Honed Hooks | 275 | Each double-rang deals 38 damage and pierces 5 enemies per leg. |
| 4 | Crowd Carvers | 650 | Deals 60 damage and pierces 8 enemies per leg. |
| 5 | Razor Rebound | 1,600 | Deals 90 damage and pierces 12 enemies per leg. |
| 6 | Endless Return | 4,400 | Permanently deals 125 damage and pierces 18 enemies per leg. Rebound Storm: Launch 6 double-rangs, each dealing 187.5 damage and piercing 24 enemies on each leg. Base wait: 40 seconds. |

Base-reference interaction notes (ability numbers superseded by the current table): Uses the existing two-path rules, tier limits, immunity checks and hero damage bonuses.

#### Devious Devices

| Level | Upgrade | Cost | Effect |
|---|---|---:|---|
| 1 | Snapjaw Kit | 65 | Builds a snapjaw on the path in reach every 7.5 seconds. Deals 45 damage and stops one enemy for 0.5 seconds. Traps last 30 seconds. Use Attack rotation beside targeting to choose its order and number of uses, or turn it off. Listed automatic attack counts apply until you save a custom rotation. |
| 2 | Oil Slick | 115 | Also builds oil traps: 20 damage and 40% slow for 3 seconds in a small area. Alternates trap types. |
| 3 | Spring Anvil | 280 | Adds spring anvils: 100 damage and 50-unit knockback to nearby enemies. |
| 4 | Buzzsaw Box | 700 | Adds buzzsaw boxes: hits up to 6 nearby enemies for 140 damage. |
| 5 | Shrapnel Crate | 1,700 | Adds shrapnel crates: 220 damage in a larger area. Normal trap construction speeds up to every 5 seconds. |
| 6 | Boulder Trap | 5,000 | Keeps previous traps and builds a large Boulder Trap every 30 seconds. When triggered, its boulder rolls toward the entrance for up to 8 seconds, dealing 1600 damage per enemy. Disappears after dealing 7500 total damage or reaching the entrance. Boulder Trap: Place a Boulder Trap in reach. Its boulder deals 2000 damage per enemy with a 9375 total damage budget and rolls for up to 8 seconds. Base wait: 64 seconds. Use Attack rotation beside targeting to choose its order and number of uses, or turn it off. Listed automatic attack counts apply until you save a custom rotation. |

Base-reference interaction notes (ability numbers superseded by the current table): Uses the existing two-path rules, tier limits, immunity checks and hero damage bonuses.

#### Clockwork Arsenal

| Level | Upgrade | Cost | Effect |
|---|---|---:|---|
| 1 | Pocket Crossbow | 70 | Builds one nearby crossbow turret. Shoots for 18 damage every 1.25 seconds within 170 reach. Turrets disappear when their Tool Maker is sold. Use Attack rotation beside targeting to choose its order and number of uses, or turn it off. Listed automatic attack counts apply until you save a custom rotation. |
| 2 | Twin-Feed Loader | 125 | Maintains 2 turrets. Each fires 2 bolts at up to 2 targets for 24 damage each. |
| 3 | Steel Piercers | 300 | Maintains 3 turrets. Piercing bolts hit up to 3 enemies for 36 damage each. |
| 4 | Workshop Row | 750 | Maintains 4 turrets. Bolts deal 48 damage each. |
| 5 | Blast Bolts | 1,800 | Maintains 6 turrets. Explosive bolts deal 65 damage plus a 50-damage burst around the target. Turret bolts and their explosions can now damage Ironlings and other enemies with Iron Hardness (Pursuit Rocks also require camouflage detection). These turrets cannot affect enemies with Energy Shield. |
| 6 | Siege Engineers | 5,200 | Maintains 8 siege turrets with 255 reach. Fires every 0.875 seconds; bolts deal 90 damage, pierce 6 enemies and keep explosive impacts. Overclock Workshop: For 8 seconds, turrets fire 2.25 times as fast. Base wait: 48 seconds. |

Base-reference interaction notes (ability numbers superseded by the current table): Uses the existing two-path rules, tier limits, immunity checks and hero damage bonuses.

### Pirate

#### Ironclad Charge

| Level | Upgrade | Cost | Effect |
|---|---|---:|---|
| 1 | Bow Bash | 55 | Every 5 seconds, lunges its boat at enemies in reach and returns. Deals 45 damage to up to 3 enemies along the charge. Use Attack rotation beside targeting to choose its order and number of uses, or turn it off. Listed automatic attack counts apply until you save a custom rotation. |
| 2 | Iron Prow | 100 | Metal prow deals 80 damage and ignores 3 armor. |
| 3 | Razor Bow | 250 | Sharpened prow deals 140 damage through up to 5 enemies. |
| 4 | Boarding Breaker | 600 | Deals 240 damage through up to 8 enemies. Charges every 4 seconds. Boat charges can now damage Ironlings and other enemies with Iron Hardness (Pursuit Rocks also require camouflage detection). |
| 5 | Dreadnought | 1,500 | Deals 400 damage through up to 12 enemies. |
| 6 | Unstoppable Keel | 4,400 | Deals 650 damage through up to 16 enemies. Dreadnought Rush: Ram through up to 24 enemies for 1500 damage, ignoring armor. Base wait: 40 seconds. |

Base-reference interaction notes (ability numbers superseded by the current table): Uses the existing two-path rules, tier limits, immunity checks and hero damage bonuses.

#### Razor Reef

| Level | Upgrade | Cost | Effect |
|---|---|---:|---|
| 1 | Jagged Stones | 45 | Throws sharper rocks for 22 damage, piercing 2 enemies. |
| 2 | Skimming Shards | 90 | Throws for 32 damage with 3 pierce. Range rises to 260. |
| 3 | Splintered Slate | 225 | Throws for 48 damage with 5 pierce. |
| 4 | Obsidian Skippers | 550 | Throws for 72 damage with 8 pierce and ignores 3 armor. |
| 5 | Razorfall | 1,400 | Throws for 105 damage with 12 pierce. |
| 6 | Reef Shredder | 4,000 | Throws for 150 damage with 18 pierce. Razor Squall: Hurl a razor-rock fan through every enemy in reach for 562.5 physical damage. Base wait: 36 seconds. |

Base-reference interaction notes (ability numbers superseded by the current table): Uses the existing two-path rules, tier limits, immunity checks and hero damage bonuses.

#### Broadside Inferno

| Level | Upgrade | Cost | Effect |
|---|---|---:|---|
| 1 | Deck Cannon | 70 | Adds a cannon firing every 5 seconds. Explodes for 80 fire damage within 45 units. Fire immunities apply. Rocks continue between cannon shots. Cannon shots can damage Ironlings and other enemies with Iron Hardness (Pursuit Rocks also require camouflage detection). Use Attack rotation beside targeting to choose its order and number of uses, or turn it off. Listed automatic attack counts apply until you save a custom rotation. |
| 2 | Hot Shot | 130 | Explosions deal 140 fire damage within 55 units. Cannon reload takes 5.5 seconds. Cannon damage cannot affect enemies with Energy Shield. |
| 3 | Twin Broadside | 325 | Adds a second cannon. Each shot deals 200 fire damage within 60 units; reload takes 6 seconds. |
| 4 | Powder Kegs | 800 | Each cannon deals 320 fire damage within 70 units; reload takes 6.5 seconds. |
| 5 | Hellfire Battery | 1,900 | Adds a third cannon. Each shot deals 480 fire damage within 80 units; reload takes 7 seconds. |
| 6 | Floating Fortress | 5,200 | Adds a fourth cannon. Each shot deals 700 fire damage within 90 units; reload takes 7.5 seconds. Burning Broadside: Fire 6 cannonballs at enemies in reach; each explodes for 812.5 fire damage in a 90-unit area. Base wait: 48 seconds. |

Base-reference interaction notes (ability numbers superseded by the current table): Uses the existing two-path rules, tier limits, immunity checks and hero damage bonuses.

#### Captain’s Comeback

| Level | Upgrade | Cost | Effect |
|---|---|---:|---|
| 1 | Flying Tricorn | 50 | Every 5 seconds, throws a returning hat. Deals 10 damage, piercing 2 enemies per leg. Stuns enemies with base HP up to 200 for 0.5 seconds. Use Attack rotation beside targeting to choose its order and number of uses, or turn it off. Listed automatic attack counts apply until you save a custom rotation. |
| 2 | Weighted Brim | 95 | Deals 18 damage with 3 pierce; stuns enemies up to 500 base HP for 0.75 seconds. |
| 3 | Steel-Lined Hat | 240 | Deals 30 damage with 4 pierce; stuns enemies up to 1500 base HP for 1 second. |
| 4 | Giant Stopper | 600 | Deals 45 damage with 5 pierce; stuns enemies up to 15000 base HP for 1.25 seconds, including Weaker Cyclops after their blocks are spent. |
| 5 | Admiral’s Return | 1,500 | Deals 65 damage with 6 pierce; can stun any size enemy, including bosses, for 1.5 seconds. Immunities, effect blocks and the 12-control limit apply. |
| 6 | Crown of the Corsair | 4,200 | Deals 90 damage with 8 pierce; stuns for 2 seconds. Hat returns before another can be thrown. Captain’s Command: Throw an empowered returning hat for 187.5 damage and 2.5-second stuns of any size enemy. Normal immunity and control limits apply. Base wait: 40 seconds. |

Base-reference interaction notes (ability numbers superseded by the current table): Uses the existing two-path rules, tier limits, immunity checks and hero damage bonuses.

### Turtle

#### Blazing Jaws

| Level | Upgrade | Cost | Effect |
|---|---|---:|---|
| 1 | Quick Snap | 45 | Bites every 1.05 seconds for 24 damage. |
| 2 | Double-Time Jaws | 95 | Bites every 0.8 seconds for 30 damage. |
| 3 | Ember Bite | 240 | Bites catch fire: 42 fire damage every 0.65 seconds, plus 6 burn damage per second for 3 seconds. Fire immunities apply. Flaming bites and their burns can damage Ironlings and other enemies with Iron Hardness (Pursuit Rocks also require camouflage detection). Bite damage and burns cannot affect enemies with Energy Shield. |
| 4 | Furnace Fangs | 600 | 60 fire damage every 0.5 seconds; burn rises to 10 per second. |
| 5 | Inferno Snapper | 1,500 | 85 fire damage every 0.4 seconds; burn rises to 16 per second. |
| 6 | Volcanic Maw | 4,300 | 120 fire damage every 0.3 seconds; burn rises to 24 per second. Feeding Frenzy: For 8 seconds, bite 2.25 times as fast. Cannot attack while submerged. Base wait: 40 seconds. |

Base-reference interaction notes (ability numbers superseded by the current table): Uses the existing two-path rules, tier limits, immunity checks and hero damage bonuses.

#### Tidal Body Slam

| Level | Upgrade | Cost | Effect |
|---|---|---:|---|
| 1 | Belly Flop | 60 | Leaves its shell, leaps high with one full flip onto the path, slams up to 4 enemies for 60 damage within 45 units, rolls back to its shell with tucked head and flippers and puts its shell on. Starts every 6 seconds within 230 reach. Use Attack rotation beside targeting to choose its order and number of uses, or turn it off. Listed automatic attack counts apply until you save a custom rotation. |
| 2 | Heavy Landing | 120 | 100 damage, 55 impact radius, up to 6 enemies. Body slams can now damage Ironlings and other enemies with Iron Hardness (Pursuit Rocks also require camouflage detection). |
| 3 | Crashing Tides | 300 | 170 damage, 65 radius, up to 9 enemies. Starts every 5 seconds. |
| 4 | Breaker Belly | 750 | 280 damage, 75 radius, up to 12 enemies. |
| 5 | Tidal Colossus | 1,800 | 450 damage, 85 radius, up to 18 enemies. Starts every 4 seconds. |
| 6 | Oceanfall | 5,000 | 700 damage, 100 radius, up to 25 enemies. Oceanquake: Leap onto the path for 1250 damage to up to 35 enemies within 120 units, then roll home. Base wait: 44 seconds. |

Base-reference interaction notes (ability numbers superseded by the current table): Uses the existing two-path rules, tier limits, immunity checks and hero damage bonuses.

#### Shellstorm

| Level | Upgrade | Cost | Effect |
|---|---|---:|---|
| 1 | Shell Courier | 70 | Has 1 shell space; packs enemies of up to 200 base HP per member into its shell, then throws it out and back. 45 collision damage, 3 pierce per leg, 230 reach, 7-second wait. Captured enemies take 45 damage when released at their original path position. Tiny skeletons use 0.1 space each, ordinary enemies 1, Grave Trolls, Flesh Golems and Werewolves 2, and Weaker Cyclops 3. Tiny groups stay together. Control immunities and limits apply; can throw an empty shell if no enemy can be packed. Use Attack rotation beside targeting to choose its order and number of uses, or turn it off. Listed automatic attack counts apply until you save a custom rotation. |
| 2 | Packed Shell | 135 | Has 2 shell spaces; packs enemies of up to 500 base HP. 80 damage, 5 pierce per leg. |
| 3 | Ricochet Carapace | 340 | Has 3 shell spaces; packs enemies of up to 1500 base HP. 140 damage, 8 pierce. Throws every 6 seconds. |
| 4 | Splinter Shell | 850 | Has 4 shell spaces; packs enemies of up to 2500 base HP. 220 damage, 12 pierce. Shell now explodes at the far end instead of returning, for 160 physical damage in 90 units, spraying 8 shards for 45 damage each. Turtle submerges for 1 second and resurfaces wearing a new shell. |
| 5 | Shrapnel Squall | 2,100 | Has 5 shell spaces; packs enemies of up to 15000 base HP. 350 damage, 16 pierce; explosion 260 damage in 110 units, 12 shards at 70 damage. Throws every 5 seconds. |
| 6 | Shell Cataclysm | 5,600 | Has 6 shell spaces; packs enemies of up to 15000 base HP. 520 damage, 22 pierce; explosion 420 damage in 130 units, 16 shards at 100 damage. Carapace Cyclone: Throw an explosive shell for 875 collision damage, 30 pierce per leg, a 625-damage burst and 16 shards at 150 damage each. Submerge for 1 second to regrow the shell. Base wait: 48 seconds. |

Base-reference interaction notes (ability numbers superseded by the current table): Uses the existing two-path rules, tier limits, immunity checks and hero damage bonuses.

#### Sunken Treasure

| Level | Upgrade | Cost | Effect |
|---|---|---:|---|
| 1 | Treasure Diver | 80 | Adds a Submerge button beside targeting. Press to earn gold underwater; press Return to normal to surface. While submerged, cannot attack and earns 1 gold every 3 seconds of active round time. No income while stunned or between rounds. |
| 2 | Pearl Seeker | 160 | Submerged income rises to 1 gold every 2 seconds. This hero can now detect Camoflaugers, Pursuit Rocks and Hidden Mummies with all attacks, effects and traps, including crosspaths. |
| 3 | Coral Cache | 400 | Submerged income rises to 1 gold per second. |
| 4 | Sunken Vault | 1,000 | Submerged income rises to 2 gold per second. |
| 5 | Deep-Sea Riches | 2,400 | Submerged income rises to 3 gold per second. |
| 6 | Abyssal Treasury | 6,000 | Submerged income rises to 5 gold per second. Treasure Tide: Submerge and earn 2.25 times normal treasure income for 10 seconds. Attacking stays disabled while submerged. Base wait: 48 seconds. |

Base-reference interaction notes (ability numbers superseded by the current table): Uses the existing two-path rules, tier limits, immunity checks and hero damage bonuses.

### Flaming Abomination

#### Flurry of Blows

| Level | Upgrade | Cost | Effect |
|---|---|---:|---|
| 1 | Hot Hands | 55 | 30 fire damage per punch every 0.9 seconds. |
| 2 | Rapid Embers | 110 | 38 fire damage every 0.65 seconds. |
| 3 | Blistering Combo | 275 | 48 fire damage every 0.45 seconds. |
| 4 | Furnace Fists | 700 | 65 fire damage every 0.3 seconds. |
| 5 | Blazing Barrage | 1,750 | 85 fire damage every 0.2 seconds. |
| 6 | Endless Flurry | 4,900 | 115 fire damage every 0.13 seconds. Overheated Onslaught: For 8 seconds, punch 2.25 times as fast. Base wait: 40 seconds. |

Base-reference interaction notes (ability numbers superseded by the current table): Uses the existing two-path rules, tier limits, immunity checks and hero damage bonuses.

#### Living Inferno

| Level | Upgrade | Cost | Effect |
|---|---|---:|---|
| 1 | Become the Flame | 70 | Unlocks a Living Flame button beside targeting. Press it and choose a path point in reach; moves there, becomes a tall flame and stays until you press Return to normal. Aim priority stays separate. Replaces other attacks. Deals 18 fire damage every 0.5 seconds within 38 units and burns for 6 damage per second for 3 seconds. |
| 2 | Hungry Fire | 140 | 28 contact damage; burn 10 per second. |
| 3 | Roaring Column | 350 | 45 contact damage within 43 units; burn 16 per second. This hero can now detect Camoflaugers, Pursuit Rocks and Hidden Mummies with all attacks, effects and traps, including crosspaths. |
| 4 | Inferno Heart | 875 | 70 contact damage within 48 units; burn 25 per second. |
| 5 | Towering Pyre | 2,200 | 110 contact damage within 54 units; burn 40 per second. |
| 6 | Everlasting Inferno | 6,000 | 170 contact damage within 60 units; burn 60 per second. Solar Pillar: Become a flame at your locked spot, or the nearest path point in reach. For 8 seconds, contact damage and burn are 2.25 times as strong. Base wait: 48 seconds. |

Base-reference interaction notes (ability numbers superseded by the current table): Uses the existing two-path rules, tier limits, immunity checks and hero damage bonuses.

#### Scorchlash

| Level | Upgrade | Cost | Effect |
|---|---|---:|---|
| 1 | Conjured Lash | 65 | Two-handed fire whip: 75 damage every 3 seconds, 220 reach, 35 knockback. Alternates with punches and other unlocked attacks at any tier. Use Attack rotation beside targeting to choose counts, order or disable attacks. Melee reach stays 95. |
| 2 | Long Ember | 130 | 120 fire damage within 240 reach; 45 knockback. |
| 3 | Searing Crack | 325 | 190 fire damage, strikes up to 2 enemies; 60 knockback. |
| 4 | Backdraft Whip | 800 | 300 fire damage within 270 reach, up to 3 enemies; 75 knockback. |
| 5 | Wildfire Chain | 1,950 | 460 fire damage, up to 4 enemies; 90 knockback, every 2.5 seconds. |
| 6 | Horizon Scourge | 5,500 | 700 fire damage within 300 reach, up to 6 enemies; 110 knockback. Existing three-displacement and immunity limits apply. Worldfire Lash: Whip up to 12 enemies for 1250 fire damage each, with 130 knockback. Normal displacement limits apply. Base wait: 44 seconds. |

Base-reference interaction notes (ability numbers superseded by the current table): Uses the existing two-path rules, tier limits, immunity checks and hero damage bonuses.

#### Molten Cataclysm

| Level | Upgrade | Cost | Effect |
|---|---|---:|---|
| 1 | Conjure Boulder | 80 | Conjures a large fire boulder, raises it and smashes it onto enemies within 95 melee reach. 220 fire damage within 45 units, up to 4 targets; boulder shatters, then needs 10 seconds to recharge. Use Attack rotation beside targeting to choose its order and number of uses, or turn it off. Listed automatic attack counts apply until you save a custom rotation. |
| 2 | Magma Mass | 160 | 360 damage within 50 units, up to 6 targets. |
| 3 | Crushing Sun | 400 | 580 damage within 55 units, up to 8 targets. |
| 4 | Volcanic Hammer | 1,000 | 900 damage within 60 units, up to 12 targets. |
| 5 | Caldera Breaker | 2,500 | 1400 damage within 65 units, up to 16 targets; recharge falls to 9 seconds. |
| 6 | Molten Cataclysm | 6,800 | 2200 damage within 75 units, up to 24 targets. Falling Sun: Conjure and smash a boulder for 3750 fire damage within 100 units of a melee target, hitting up to 35 enemies. Base wait: 52 seconds. |

Base-reference interaction notes (ability numbers superseded by the current table): Uses the existing two-path rules, tier limits, immunity checks and hero damage bonuses.

### Abomination

#### Crashing Surge

| Level | Upgrade | Cost | Effect |
|---|---|---:|---|
| 1 | Surging Charge | 65 | Dash out and back, dealing 70 water damage per pass to up to 12 enemies per pass. Recover without attacking for 3 seconds; 8-second cooldown. Use Attack rotation beside targeting to choose its order and number of uses, or turn it off. Listed automatic attack counts apply until you save a custom rotation. |
| 2 | Cutting Wake | 140 | Dash out and back, dealing 105 water damage per pass to up to 16 enemies per pass. Recover without attacking for 3 seconds; 8-second cooldown. |
| 3 | Tidal Sprint | 350 | Dash out and back, dealing 140 water damage per pass to up to 20 enemies per pass. Recover without attacking for 3 seconds; 8-second cooldown. |
| 4 | Razor Current | 900 | Dash out and back, dealing 175 water damage per pass to up to 24 enemies per pass. Recover without attacking for 3 seconds; 8-second cooldown. |
| 5 | Maelstrom Run | 2,300 | Dash out and back, dealing 210 water damage per pass to up to 28 enemies per pass. Recover without attacking for 3 seconds; 8-second cooldown. |
| 6 | Unstoppable Undertow | 6,200 | Dash out and back, dealing 245 water damage per pass to up to 32 enemies per pass. Recover without attacking for 3 seconds; 8-second cooldown. Tier-6 ability: Tidal Overdrive. Immediately begins this path attack at 125% damage or slow duration. Base wait: 36 seconds. |

Base-reference interaction notes (ability numbers superseded by the current table): Uses the existing two-path rules, tier limits, immunity checks and hero damage bonuses.

#### Stormshake

| Level | Upgrade | Cost | Effect |
|---|---|---:|---|
| 1 | Wet Fur | 65 | Shake for 3 seconds, spraying enemies within 230 reach once per second. Slows by 25% for 2.5 seconds. Cannot attack during shaking; 9-second cooldown. Use Attack rotation beside targeting to choose its order and number of uses, or turn it off. Listed automatic attack counts apply until you save a custom rotation. |
| 2 | Heavy Spray | 140 | Shake for 3 seconds, spraying enemies within 230 reach once per second. Slows by 30% for 3 seconds. Cannot attack during shaking; 9-second cooldown. |
| 3 | Chilling Shower | 350 | Shake for 3 seconds, spraying enemies within 230 reach once per second. Slows by 35% for 3.5 seconds. Cannot attack during shaking; 9-second cooldown. |
| 4 | Saturating Storm | 900 | Shake for 3 seconds, spraying enemies within 230 reach once per second. Slows by 40% for 4 seconds. Cannot attack during shaking; 9-second cooldown. |
| 5 | Cloudburst Coat | 2,300 | Shake for 3 seconds, spraying enemies within 230 reach once per second. Slows by 45% for 4.5 seconds. Cannot attack during shaking; 9-second cooldown. |
| 6 | Walking Monsoon | 6,200 | Shake for 3 seconds, spraying enemies within 230 reach once per second. Slows by 50% for 5 seconds. Cannot attack during shaking; 9-second cooldown. Tier-6 ability: Monsoon Burst. Immediately begins this path attack at 125% damage or slow duration. Base wait: 40 seconds. |

Base-reference interaction notes (ability numbers superseded by the current table): Uses the existing two-path rules, tier limits, immunity checks and hero damage bonuses.

#### Deepwater Ambush

| Level | Upgrade | Cost | Effect |
|---|---|---:|---|
| 1 | Silent Dive | 65 | Dive for 2 seconds, then leap onto the strongest enemy in 230 reach for 400 water damage in a 40 radius. Leap back into the water; 16-second cooldown. Use Attack rotation beside targeting to choose its order and number of uses, or turn it off. Listed automatic attack counts apply until you save a custom rotation. |
| 2 | Heavy Landing | 140 | Dive for 2 seconds, then leap onto the strongest enemy in 230 reach for 600 water damage in a 45 radius. Leap back into the water; 16-second cooldown. Leap landings can now damage Ironlings and other enemies with Iron Hardness (Pursuit Rocks also require camouflage detection). |
| 3 | Abyss Hunter | 350 | Dive for 2 seconds, then leap onto the strongest enemy in 230 reach for 800 water damage in a 50 radius. Leap back into the water; 16-second cooldown. |
| 4 | Crushing Breach | 900 | Dive for 2 seconds, then leap onto the strongest enemy in 230 reach for 1000 water damage in a 55 radius. Leap back into the water; 16-second cooldown. |
| 5 | Leviathan Leap | 2,300 | Dive for 2 seconds, then leap onto the strongest enemy in 230 reach for 1200 water damage in a 60 radius. Leap back into the water; 16-second cooldown. |
| 6 | Depths Unleashed | 6,200 | Dive for 2 seconds, then leap onto the strongest enemy in 230 reach for 1400 water damage in a 65 radius. Leap back into the water; 16-second cooldown. Tier-6 ability: Abyssal Cataclysm. Immediately begins this path attack at 125% damage or slow duration. Base wait: 48 seconds. |

Base-reference interaction notes (ability numbers superseded by the current table): Uses the existing two-path rules, tier limits, immunity checks and hero damage bonuses.

#### Predator’s Glare

| Level | Upgrade | Cost | Effect |
|---|---|---:|---|
| 1 | Unblinking Eyes | 65 | Stare at the strongest eligible enemy for 2 seconds, then stop it for 2.5 seconds, ignoring all immunities. No damage or other attacks during the stare. Cannot stack; 3 seconds of protection after it ends; maximum 2 stops per enemy across all heroes. 10-second cooldown. Use Attack rotation beside targeting to choose its order and number of uses, or turn it off. Listed automatic attack counts apply until you save a custom rotation. |
| 2 | Dread Focus | 140 | Stare at the strongest eligible enemy for 2 seconds, then stop it for 3 seconds, ignoring all immunities. No damage or other attacks during the stare. Cannot stack; 3 seconds of protection after it ends; maximum 2 stops per enemy across all heroes. 10-second cooldown. This hero can now detect Camoflaugers, Pursuit Rocks and Hidden Mummies with all attacks, effects and traps, including crosspaths. |
| 3 | Paralyzing Presence | 350 | Stare at the strongest eligible enemy for 2 seconds, then stop it for 3.5 seconds, ignoring all immunities. No damage or other attacks during the stare. Cannot stack; 3 seconds of protection after it ends; maximum 2 stops per enemy across all heroes. 10-second cooldown. |
| 4 | Ancient Terror | 900 | Stare at the strongest eligible enemy for 2 seconds, then stop it for 4 seconds, ignoring all immunities. No damage or other attacks during the stare. Cannot stack; 3 seconds of protection after it ends; maximum 2 stops per enemy across all heroes. 10-second cooldown. |
| 5 | Apex Stare | 2,300 | Stare at the strongest eligible enemy for 2 seconds, then stop it for 4.5 seconds, ignoring all immunities. No damage or other attacks during the stare. Cannot stack; 3 seconds of protection after it ends; maximum 2 stops per enemy across all heroes. 10-second cooldown. |
| 6 | Absolute Dread | 6,200 | Stare at the strongest eligible enemy for 2 seconds, then stop it for 5 seconds, ignoring all immunities. No damage or other attacks during the stare. Cannot stack; 3 seconds of protection after it ends; maximum 2 stops per enemy across all heroes. 10-second cooldown. Tier-6 ability: Sovereign Stare. Immediately begins a glare with 25% longer stop duration; all immunity, stacking and lifetime rules remain. Base wait: 52 seconds. |

Base-reference interaction notes (ability numbers superseded by the current table): Uses the existing two-path rules, tier limits, immunity checks and hero damage bonuses.

## 9. Enemy catalogue

All skeleton enemies move 68% faster than their previous speeds, including the already-doubled Runner. Walking times are rounded to two decimal places and are for the whole path at normal game speed, without boosts, slows, stuns, or fear. Lower time means faster movement. Earliest wave is the earliest permitted appearance, not a guaranteed first appearance (except the fixed first wave and wave 100).

| Enemy | Health | Money reward | Villagers lost | Walking time | Earliest wave |
|---|---:|---:|---:|---|---:|
| DEMONIC NIGHTMARE | 225 | 22 | 5 | 11.16 seconds | 90 |
| Skull Screecher | 240,000 | 120 | 0 | 26.79 seconds | 80 |
| Werewolf | 405 | 18 | 5 | 53.57 seconds | 60 |
| Hell Hound | 99 | 12 | 3 | 1.79 seconds | 55 |
| Shadow Goul | 337.5 | 16 | 4 | 29.76 seconds | 45 |
| Headless Zombie | 180 | 12 | 3 | 13.74 seconds | 30 |
| Camoflauger | 148.5 | 12 | 2 | 6.12 seconds | 53 |
| Greater Imp | 337.5 | 18 | 4 | 33.48 seconds | 50 |
| Iron Ball | 13,500 | 100 | 20 | 10.63 seconds | 95 |
| Hidden Mummy | 405 | 22 | 5 | 11.16 seconds | 65 |
| Pursuit Rock | 225 | 22 | 5 | 11.16 seconds | 73 |
| Ironling | 180 | 15 | 3 | 26.79 seconds | 47 |
| Fusion Skeleton | 270 | 20 | 5 | 26.79 seconds | 20 |
| Skeleton | 63 | 5 | 1 | 17.86 seconds | 1 |
| Tiny Skeleton | 22.5 | 2 | 1 | 14.29 seconds | 3 |
| Ghoul | 49.5 | 5 | 1 | 5.36 seconds | 5 |
| Zombie Guard | 146.25 | 10 | 3 | 21.43 seconds | 10 |
| Grave Troll | 405 | 15 | 5 | 26.79 seconds | 15 |
| Vampire Lord | 1,012.5 | 30 | 10 | 17.86 seconds | 25 |
| Wraith | 675 | 25 | 10 | 21.43 seconds | 35 |
| Weaker Cyclops | 13,500 | 100 | 20 | 35.71 seconds | 75 |
| Plague Wyvern | 84,825 | 500 | 50 | 29.76 seconds | 100 |

### Enemy rules and naming

- **Fusion Skeleton:** 270 base HP, exactly two-thirds of the Grave Troll’s 405 HP. First eligible on wave 20. Uses the Grave Troll’s speed, gives 20 gold, and removes 5 villagers if it reaches the village. Its colored, joint-animated shape follows references/fusion-skeleton-reference.png. When defeated, its central chamber bursts over 1.2 seconds of game time; after the animation, five independent swarms of ten Tiny Skeletons (50 total) appear at its path position. Each swarm retains separate movement-effect sharing. Small formation offsets make the five groups visible. The wave cannot complete until the burst and its offspring are finished. Leaking does not trigger a burst. Burst timing and swarm offsets are saved, and pause freezes the animation and spawn timer. Endless scaling applies normally to the shell and the Tiny Skeletons.

- **Bone Swarm** means exactly 10 Tiny Skeletons spawned at the same time. They move together in a tight circle that shrinks as members die. Each is a separate damage and chain-lightning target. Slows, knockback, freeze, stun, and fear affect the whole group; one attack or trap pushes a group only once. Burns and poison damage remain individual. The circle radius is 7 × sqrt(survivors − 1) map units. Saved games preserve group membership; older queued individuals are bundled in tens (rounding the last bundle up), and already-active tinies are grouped without adding members. Each tiny skeleton separately has 22.5 health, gives 2 money, and removes 1 villager. It is not a tenth enemy with one shared health bar.
- **Shield Skeleton:** reduces every ordinary hit by 3 damage. Every hit still does at least 1. Armor-ignoring damage bypasses the stated armor amount.
- **Bone Captain:** previously called Skeleton Captain in early discussion. Use Bone Captain as the final name. Each gives nearby enemies **20% extra movement speed**. Only **2** boosts stack, for **40% maximum**, never 44%. The current prototype uses a 180-unit aura and excludes self from its own aura; that distance/self-rule was an implementation choice.
- **Bone Shaman:** every 5 seconds, gives one nearby monster a shield absorbing 40 damage. An enemy can have only one such shield. The prototype's radius is 160 units.
- **Skeleton Giant:** also called Bone Giant in some messages; these mean the same enemy. Immune to its first **7 harmful-effect applications**. Repeated effects of the same kind each consume a block. After blocks run out, fear still lasts **30% less time**: a 5-second fear becomes **3.5 seconds**.
- **Bone Dragon:** immune to its first **15 harmful-effect applications**. After blocks run out, fear still lasts **65% less time**: a 5-second fear becomes **1.75 seconds**.
- Blocking a harmful effect does not block ordinary damage. Freeze, stun, fear, slow, poison and other negative effects use the immunity system. Exact handling of every combined multi-effect attack should continue to be tested.
- All unlisted enemies have no special fear resistance or harmful-effect blocks.

## 10. Waves, winning, and endless play

- Wave 1: **10 basic skeletons**, entering **2.5 seconds apart**.
- Other waves change each game. Early waves use weak enemies. Tougher types cannot appear before the earliest waves listed above.
- Giants cannot appear before **wave 75**. The prototype places one on wave 75.
- No Bone Dragon appears before wave 100.
- **Wave 100 is fixed: one Bone Dragon followed by exactly 10 Bone Captains. No additional enemies.**
- A wave ends only when every enemy has either been defeated or reached the village. Even Auto-start must wait for this.
- The player presses **Start Wave**, unless **Auto-start Waves** is enabled in Settings. Auto-start begins the next wave on the same rendered frame that the previous wave completes, with no intentional waiting period. Battle music continues without switching to preparation music. New enemy hints appear as a brief toast during the transition. Auto-start also resumes from a saved between-wave state or after enabling it in Settings; the first wave still waits for the player. Pausing, defeat, and the wave-100 victory choice block automatic starts.
- Win by finishing wave 100 with villagers remaining. Victory screen: **“The village is saved!”** with **Keep Playing** and **Main Menu**.
- Choosing Keep Playing enables waves beyond 100. Bone Dragons may return in those waves.
- For each wave beyond 100, add **5% of base health** and **1% of base speed**. These are additive increases from the wave-100 baseline, not compounded each wave. Wave 110 has 50% extra health and 10% extra speed. A Dragon at wave 110 has 135,000 health.
- Defeat screen: **“The village has fallen”**, the wave reached, **Try Again**, and **Main Menu**.

### Random-wave implementation (starting balance, not a separately approved final schedule)

The local prototype generates a wave budget of floor(8 + wave × 2.1 + wave^1.38 × 0.24). Every tenth wave receives a 35% budget increase, except the fixed wave 100. The mixed difficulty increase adds another 50% enemy health and multiplies the random-wave budget by 22/15 (about 46.7% more), rounded to the nearest integer after the tenth-wave bonus. This targets roughly 2.2 times the previous total health load, not an exact measured difficulty multiplier. Fixed wave 1 and 100 lineups remain unchanged. Already-running waves keep their queued lineup; newly prepared waves use the larger budget. Enemy budget costs are: Skeleton 1; Tiny bundle of 10: 4; Runner 1.2; Shield 3; Brute 6; Fusion Skeleton 26; Headless Zombie 8; Shadow Goul 12; Hell Hound 8; Skull Screecher 100; Captain 12; Shaman 11; Giant 65; Dragon 180. It chooses eligible enemy types until the budget is exhausted, with a maximum of 440 individual enemies, counting each Tiny bundle as 10 and reserving 51 places for a Fusion Skeleton plus its 50 offspring. Wave 75 includes a Giant; every tenth endless wave includes a Dragon. Early-wave easing: rounds 2–15 reduce the final budget by 40% on round 2, tapering linearly to 10% on round 15 (round to the nearest integer). Spawn gaps are 35% longer on round 2, tapering linearly to 10% longer on round 15. Round 1 still has ten basic Skeletons, now 2.5 seconds apart. Rounds 16 onward retain their existing balance. Prepared early waves in older saves regenerate; active queues are preserved. Normal spawn spacing is max(0.3, 1.6 − wave × 0.009) seconds; wave 100 spacing is 1.2 seconds. These wave-size and spacing formulas are implementation choices and need balancing through play.

## 11. Game speed

| Speed | Unlock |
|---|---|
| 1× and 2× | Available immediately |
| 3× | After beating wave 50 |
| 4× | After beating wave 75 |
| 5× | After beating wave 100 |

Unlocked speeds **stay unlocked for future games**, even after starting over. All combat timers, movement, statuses, and ability cooldowns should run in game time. Music does not speed up with the simulation.

## 12. Menus, settings, and controls

### Main menu

**Play · Choose a Map**, **Settings**, and **Version**. Continue buttons appear only in the map chooser. Version opens a popup with Exit in the top-left corner and two choices: Computer version and Mobile version welcome soren. Mobile mode uses a stacked phone layout, larger touch targets, a correctly scaled touch canvas, scrollable menus and bigger upgrade text; computer mode restores the normal layout. The choice is saved in preferences, and both versions share the same per-map saves. Touch placement, starting waves, portrait/landscape layouts, preference persistence and save preservation were checked in tests/version-check.cjs. Play opens a separate map screen with a picture, description and saved wave for each map. Continue on a map restores its own progress. Start Again confirms that only that map will be restarted. Cancel returns to the map chooser. Back to Main Menu returns to the title screen. Permanent speed unlocks and settings are shared across maps.

### Settings and pause

- Gear button in the **top-right corner**.
- No separate Pause button. Pressing Settings pauses play and opens a small settings box.
- While Settings is open, the player cannot look around/interact with the map, buy, sell, or upgrade heroes.
- Settings: **Game Hints**, **Auto-start Waves**, **Show Beginner Guide**, **Volume**, **Save and Exit**.
- **Game Hints** and **Show Beginner Guide** default **on**. Auto-start defaults off in the prototype.
- Volume is a slider allowing silence; prototype default is 45%.
- Closing Settings resumes the game.
- The prototype also opens Settings on tab hiding to prevent the game running unseen.

### Guide and hints

- First-game guide explains placing a hero, starting a wave, and buying an upgrade.
- Has **Skip Guide**. Settings can disable it before the first game. Preferences persist.
- The Skip Guide bug was fixed: its button was being recreated every 150 ms, swallowing slower clicks. The guide now redraws only when its step changes, retaining button identity and keyboard focus.
- Hints warn before a new enemy appears and give a short, simple explanation.
- Hints also warn about hard waves. They must describe the upcoming generated lineup, not an unrelated fixed schedule. Prototype treats every tenth wave as hard.

### Battle controls

- Hero shop and hero information panel are on the **right**. The seven gravestones are decorative; clicking them opens no panel and does not change the current selection.
- Clicking an upgrade shows its name, cost, and explanation, with a **separate Buy button**. During combat, gold, prices, affordability, and hero stats update without replacing the selected hero’s buttons. Upgrade clicks and keyboard focus therefore survive income changes at fast game speeds. The regression check is `tests/upgrade-check.cjs`. After buying, its detail panel closes and only the next unpurchased upgrade is offered for that path. Purchased upgrade names are not listed as options; filled dots show progress and completed paths say **Path complete**. Upgrade path names are displayed above each upgrade row beside its progress dots, including locked and completed paths. Individual upgrade names remain visible.
- The selected hero panel also shows aim choice and Sell.
- Ability buttons are along the **bottom**; unavailable abilities show their wait. Buttons retain their identity while cooldown labels update, so held mouse clicks and keyboard focus survive the 150 ms UI refresh. Targeted abilities activate after choosing an enemy or path location. The regression check is `tests/ability-check.cjs`.
- Some abilities activate immediately; targeted abilities ask the player to click an enemy or path location. Wild Weather works anywhere on the path; Perfect Shot works anywhere on the map. Other targeted abilities must be within the hero's reach.
- Selecting a hero or placing one shows its range circle. Clicking away hides it. Heroes have a 50-map-unit click radius (previously 30). Overlapping click areas select the nearest hero. This does not change attack range or placement spacing.
- Prototype shortcuts: Space starts a wave; Escape cancels placement/targeting or closes Settings. These are convenience choices, not replacements for screen buttons.

## 13. Saving

- Automatically save after **every completed wave**.
- **Save and Exit** saves the current situation, including a battle in progress, before returning to the main menu.
- Continue resumes from the saved situation. Save heroes, upgrades, spending, trees, money, villagers, wave, enemies, their health/statuses, pending attacks, traps, zones, queued spawns, ability waits, and random-wave state.
- Keep global settings and unlocked speeds separately so starting a new run does not erase them.
- Prototype uses browser localStorage with one independent game per map in necromancer-jack-map-saves-v1. Each saved entry contains the full game state, including active waves. The previous single-slot save is imported automatically without deleting its original backup: `necromancer-jack-save-v1`. Preferences: `necromancer-jack-prefs-v1`.
- Browser/address matters: changing browser or switching from localhost to a file URL creates a different storage area. Clearing browser data erases saves. There is no cloud save or account system.

## 14. How to run and continue development

Project folder on Jack's computer:

```text
C:\Users\angel\OneDrive\Desktop\Hunt For the Necromancer
```

Current local address: **http://127.0.0.1:4173/**.

- Double-click **Play Game.cmd** to launch. It runs Start-Game.ps1, starts the local server when needed, and opens the browser.
- Or run **node server.js** from the folder.
- No application packages need installing to play. The game uses plain JavaScript, Canvas 2D, CSS, Web Audio, and Node's built-in HTTP server. There is no Unity/Godot project.
- If Node is unavailable, the launcher falls back to opening index.html directly. Browser storage then differs from localhost.
- Decorative fonts may load from Google Fonts; built-in fonts work offline. Art and music are created locally in code.
- The app runs locally; no public hosting/deployment has been requested.

### File guide

| File | Purpose |
|---|---|
| index.html | Game screen and script/style loading |
| data.js | All hero/enemy definitions, 240 upgrade names/descriptions/prices, path points, tree positions |
| engine.js | Combat, waves, damage, effects, abilities, economy, upgrade limits, serializable game state |
| game.js | Menus, controls, rendering loop, saved preferences, guide, UI, game events |
| drawing-art.js | Current art: map, enemies, heroes, and portraits based on Jack’s person drawing |
| upgrade-looks.js | Independent visual changes for all 20 paths; mixed upgrade combinations |
| heroic-heroes.js | Previous renderer, retained but no longer loaded |
| heroic-art.js | Previous environment renderer, retained but no longer loaded |
| forest-art.js | Previous realistic renderer, retained but no longer loaded |
| skull-screecher-art.js | Reference-based Skull Screecher walking, claws and scream |
| hellhound-art.js | Animated quadruped Hell Hound |
| shadow-art.js | Shadow Goul sinking, shadow travel and crawling emergence |
| headless-art.js | Headless Zombie, bowling head, scream and stun countdown |
| fusion-art.js | Colored reference-based Fusion Skeleton and chamber-burst animation |
| cartoon-art.js | Previous cartoon renderer, retained but no longer loaded |
| style.css | Base layout |
| heroic.css | Base stylized UI layout |
| inked.css | Earlier styling layer |
| drawing.css | Current flat parchment/navy UI overrides |
| forest.css | Previous realistic UI styling, no longer loaded |
| cartoon.css | Previous round cartoon UI, retained but no longer loaded |
| audio.js | Original music patterns and sound generation |
| server.js | Local-only server on port 4173 |
| Play Game.cmd / Start-Game.ps1 | Windows launcher |
| README.md | Short play/development guide |
| GAME_DESIGN.md | This complete, shareable design and handoff |
| scripts/write-design.cjs | Regenerates this document; update its written rules too when the design changes |
| tests/engine.test.js | Game-rule tests |
| tests/browser-check.cjs | Browser gameplay/control checks |
| tests/guide-check.cjs | Skip Guide regression checks |
| tests/appearance-check.cjs | Checks every legal upgrade drawing for uniqueness and verifies portrait changes |

### Existing validation

All **23 engine tests** passed before the visual-only update. After the latest reference-inspired art update, browser checks passed again for placement, upgrades, saving/loading mid-wave, pause, settings, audio startup, ability controls, boss wave, victory/endless, speed unlocks, new-game confirmation, and a smaller screen. The guide regression also passed again (slow mouse click, saved preference, step progression, keyboard dismissal). The updated game was visually checked in browser screenshots. The appearance check rendered all 145 legal states for each of five heroes (725 total), found no duplicate drawings within a class, and confirmed that purchasing either a first-path or second-path upgrade updates the selected portrait. These checks do **not** mean someone has completed and balanced an entire normal 100-wave run.

Run engine tests with `node --test tests/engine.test.js`. Optional browser tests use Playwright and installed Microsoft Edge; set PLAYWRIGHT_MODULE to the available Playwright package path if necessary. Use isolated browser contexts for tests so Jack's real saved game is not replaced.

## 15. Important handoff notes and remaining work

1. **Do not silently change Jack's accepted numbers.** If a balance problem is found, explain it in plain language and propose a concrete adjustment.
2. The rule tables above are the intended design. Code is a first playable implementation and may contain defects or incomplete edge-case interactions; do not assume passing tests prove every combination.
3. A full 100-wave human playthrough and difficulty tuning are still needed. Random-wave composition/size is a starting formula, not Jack's final schedule.
4. Test combinations of two paths, damage bonuses, armor, immunity blocks, poison/fire spreading, multiple leaders, money bonuses, and simultaneous abilities. Some interactions were implemented without separate design approval.
5. Some prototype choices need future review: support aura distances, overlapping different bonuses, when marks change targets, and fire/poison application details. Match the descriptions rather than inventing extra exceptions without telling Jack.
6. Current projectile animation is a visual effect; damage is generally resolved when the attack fires. Physical projectile collision/travel-time damage was not agreed as a requirement.
7. The latest visual direction follows Jack’s hand-drawn person (references/jack-drawing-reference.png), superseding all earlier image styles. Every upgrade must visually change a hero, and each legal combination must have its own mixed appearance. Keep the leader free of armor and banners. Currency remains Gold Coins.
8. After code changes, Jack should use **Settings → Save and Exit**, refresh the browser, and choose **Continue** to load the update safely.
9. This document includes everything decided in the design conversation, not a copy of all source code. Another chat needs the project files to edit or run the existing game; it can use this document alone to understand or rebuild the intended design.
10. Keep this document current when Jack approves new changes. Mark proposed ideas as proposals until he accepts them.


Slow limit: Each enemy can receive 12 successful slow, freeze or stun applications in total during its lifetime, shared across all sources. Refreshes count; the final accepted effect finishes normally. Later applications cannot extend it. Withering poison uses a separately capped slow while retaining poison damage and armor weakening. Area effects count once per swarm member per source, effect type and simulation instant. Immune and boss-blocked attempts do not count. Counts persist in saves. Fear and knockback retain their separate shared limit of 3.


Upgrade viewer: View upgrades beside Sell opens a paused full-screen catalogue for the selected hero. Four visually distinct paths show all six tiers. Click any card (including locked/purchased cards) for its live description, price, purchase status and tier appearance. Browsing never spends coins. Back to game or Escape restores the previous pause state. Colors, icons and role labels distinguish paths; combat balance is unchanged. Source: upgrade-viewer.js and upgrade-viewer.css.


Non-boss milestone health: after round 45, and every 20 completed rounds afterward, non-boss HP gains another multiplicative 15%. Starts on rounds 46, 66, 86, 106, 126 and so on. Formula: 1.15 ^ max(0, floor((wave - 46) / 20) + 1). Only Plague Wyvern (dragon) is exempt. Weaker Cyclops (giant) receives the repeating health buffs. Multiplies existing endless HP scaling; speed, gold and village damage are unchanged. Applies to spawned swarms and Fusion offspring. Existing saved enemies migrate once, preserving their health percentage.


Enemy damage traits: Hell Hound is immune to fire damage and burns. Wraith takes damage only from fire. Headless Zombie is immune to poison, including Withering Poison. All three traits are stated in their live enemy hints. Fire sources: Fire Mage fireballs, burns from any hero, fire ground, Meteor Shower, Dawnbringer impact and the burning damage of Wild Weather. Physical weapon hits, traps, arcane beams, lightning and non-fire explosions remain non-fire even on a cross-pathed hero. Hell Hound death explosions are physical blasts and can still chain; they cannot damage Wraiths. Immunities reject damage before shield absorption and reject burn/poison applications. Old saves discard incompatible burn/poison effects. Existing hidden Shadow immunity and other status rules still apply.


Additional enemy traits: Zombie Guard and Plague Wyvern are immune to poison damage and Withering Poison. Fusion Skeleton is immune to knockback; its released Tiny Skeletons are not. Werewolf is immune to fear; stun and freeze can still interrupt its pickup before release. Vampire Lord takes 50% extra fire damage, including burns, while other damage is unchanged. Traits and counters appear in enemy descriptions. Rejected effects spend no status-block or lifetime-control charges. Saved enemies discard newly incompatible effects.


Player name: defaults to Player. Main Menu > Change Name opens a 24-character name field with Save Name and Cancel. Blank names reset to Player. The menu greeting and hero sidebar use the chosen name, safely rendered as text. Names persist in browser preferences across maps and reloads; existing save storage keys remain compatible.


Water Serpant: sixth hero, costs 150 gold, base water bolt 16 damage every 1.3 seconds with 210 reach. Existing hero damage and early-round speed buffs apply. Can be placed only in the forest river or marsh pools, away from the path, obstacles and other heroes. Land heroes cannot occupy water. Four six-tier paths: Undertow Wrestler (growing enemy weight capacity, collisions and backward throws), Drowned Passage (flood only path sections in reach, animated dives and two-second captures), Decoy Flock (visible fake geese alternating stun and fear), Torrent Cannon (piercing water beams and increasing knockback). Drowned enemies use base HP thresholds independent of late-wave scaling; bosses always resurface. Water damage does not hurt fire-only Wraiths; hidden Shadows and status-immune enemies resist captures. Boss effect blocks, 12-control and 3-displacement limits apply. Swarms throw together; collision damages each carried member and the target once. Captures and throws save and pause with simulation time, end safely if the owner is stunned or sold, and keep the wave active while victims remain. Existing two-path rules, exact-tier limits and tier-6-only primary abilities apply. Art, water overlay, geese, throw motion and dive animation are drawn with the existing canvas style. Sources: serpent-mechanics.js and serpent-art.js.


Water Serpant main attack update: the most recently upgraded path becomes its automatic main attack (throw, flooded-path grab, goose decoys or water beam). Buying Flooded Trail stops ordinary water shots. Older saves with a flood upgrade default to that attack. The serpent waits hidden beneath the flooded path between attacks, briefly surfaces to grab, then submerges again. Its pool remains its placement and range anchor; either the pool anchor or underwater ripple can be clicked to select it. Purchased flooding remains visible and tier-6 abilities remain usable. Main-attack choice persists in saves, appears in the hero panel, and the main attack interval uses hero attack-speed bonuses.


Water Serpant surfaces between rounds: while no wave is active, its full body is visible at its flooded-path position. Starting the next wave restores its underwater waiting behavior. Pausing an active wave does not surface it.


Serpent drag recovery now depends on enemy size, measured after the unchanged two-second capture: Tiny Skeleton 0.5 seconds; Skeleton/Ghoul 1; Zombie Guard/Headless Zombie/Hell Hound/Shadow Goul 2; Grave Troll/Fusion Skeleton/Werewolf 3; Vampire Lord 4; Weaker Cyclops 6; Plague Wyvern 8. Tier 4 multiplies recovery by 5/6; tiers 5-6 by 4/6. Hero speed bonuses shorten recovery but not capture duration. Multi-target ability uses the longest recovery among captured enemies. Uses fixed enemy classes, not scaling HP. Failed grabs keep their existing retry interval. Deadlines persist in saves and pause with simulation time.


Serpent crosspath fallback: the most recently upgraded path stays preferred. While it is on cooldown, the other purchased path can perform its attack on a separate saved cooldown using that path tier and speed bonuses. Finishes an active two-second capture or throw before starting another attack. Drag recovery remains size-based and is not extended or reset by a fallback beam, goose or throw. No unpurchased fallback attacks. Upgrading a path only initializes its cooldown on its first purchase; it does not reset the other path recovery.


Water Jet and its upgrades now fire five water-beam pulses at 0, 0.2, 0.4, 0.6 and 0.8 seconds during a one-second stream, retargeting each pulse. Each pulse uses the purchased beam damage/pierce/armor values. Each enemy or swarm is pushed at most once per stream, respecting the lifetime cap. Recovery after the stream is 3 seconds, or 2 at tiers 5-6, shortened by attack-speed buffs. Stream length and pulse rate stay fixed. Stops when no targets remain; stun cancels the stream. Stream state saves and pauses with simulation time. Crosspath attacks wait for the stream to end, then can fire during its independent recovery. Worldbreaker Wave remains its separate single-blast ability.


Water stream visual correction: Water Jet draws one persistent unbroken water stream for the full one-second firing period, with flowing foam and continuous impact spray. Internal damage updates do not spawn separate beams or restart the animation. Damage, recovery and crosspath behavior are unchanged. Upgrade descriptions give full-stream damage.


Tool Maker: seventh hero, 140 gold, base hammer attacks every 1.2 seconds for 18 damage before hero bonuses. Walking Armory gains 2/4/6/8/10/12 simultaneous melee weapons, each sweeping up to 3 targets. Returning Ruin replaces the hammer with the reference-shaped hooked double-rang: 1 projectile at tier 1 and 2 at tier 2 onward, each travelling outward and returning over 1.4 seconds with separate per-leg pierce/hit lists. Purchased melee weapons remain usable nearby. Devious Devices cycles snapjaw, oil, spring anvil, buzzsaw and shrapnel traps, with a tier-6 Boulder Trap constructed every 24 seconds. The boulder rolls toward the entrance at 65 path units per second, hits each enemy once for 1600 base damage, lasts up to 8 seconds and expires after dealing 10000 actual total damage including shields. Clockwork Arsenal maintains 1/2/3/4/6/8 turrets across tiers 1-6 on clear nearby land, with twin bolts, piercing shots, explosives and siege upgrades. All devices use saved simulation time, pause normally, and stop when their owner is stunned. Selling removes owned devices. Wave completion clears projectiles/boulders; turrets and remaining traps persist. Four primary tier-6 abilities retain existing two-path and tier-limit rules. Double-rang reference: references/double-rang-reference.png. Sources: toolmaker-mechanics.js, toolmaker-art.js; dedicated checks: tests/toolmaker.test.js.


Double-rang return rule: a Tool Maker cannot launch another volley until all of its own double-rangs return. Applies to ordinary throws and Rebound Storm; blocked ability attempts spend no cooldown. Other Tool Makers remain independent. Melee crosspath swings, traps and turrets can still work while rangs are in flight. Saved flights preserve the restriction.


Correction to double-rang return rule: only ONE outstanding double-rang must return before the Tool Maker can launch its next volley, even if others remain airborne. Each launch records all currently outstanding projectile IDs; the next launch waits for at least one of those to return. Applies to ordinary volleys and Rebound Storm and persists through saves. Supersedes the earlier all-rangs-return rule.


Double-rang accuracy: outward flights continuously track the selected enemy position, including bends, rather than aiming at its old position with a spread. If that target dies or goes underwater, redirects toward another available enemy in reach. Swept collision checks run from the actual previous projectile position. The return flight, per-leg pierce limits, enemy immunities, and at-least-one-return rule remain.


Twin double-rang visual fix: paired throws leave from opposite sides and follow separate mirrored arcs with opposite spins. Their centers remain separated even when pursuing the same enemy, converging only close enough to both register hits. Outbound target tracking, pierce and return gating are unchanged. Arc lane and spin are saved with each projectile.


Tool Maker balance nerf: all owned damage, including melee, double-rangs, traps, turrets, explosions, boulders and abilities, is multiplied by 0.75 after the standard 1.25 hero bonus, giving 0.9375 times listed base damage before support and armor. Base attack wait increases from 1.2 to 1.5 seconds. Turret firing waits increase from 1 to 1.25 seconds, and tier-6 waits from 0.7 to 0.875 seconds. Normal trap construction waits increase from 6/4 to 7.5/5 seconds; boulder construction from 24 to 30 seconds. Boulder total damage budget drops from 10000 to 7500. Weapon counts, 1/2/3/4/6/8 turret counts, targeting, range, pierce, prices and return rules stay the same. UI damage and upgrade notes reflect the multiplier.


Pirate: eighth hero, 150 gold, water-only including flooded path sections. Base physical rock deals 14 damage every 1.2 seconds within 220 reach, with normal hero bonuses. Four paths: Ironclad Charge (animated boat ram; metal and sharpened prow), Razor Reef (22/32/48/72/105/150 damage, 2/3/5/8/12/18 pierce), Broadside Inferno (1/1/2/2/3/4 fire cannons; 5/5.5/6/6.5/7/7.5-second reload), Captain’s Comeback (returning hat; stuns increasingly large enemies, obeying immunities, effect blocks and lifetime control limits). Hats must return before another throw. Stunned pirates cannot attack; selling removes owned attacks, and round completion clears them. Tier-6 primary abilities only; existing crosspath and tier limits apply. Sources: pirate-mechanics.js, pirate-art.js; tests/pirate.test.js.


Moonlit Marsh life reward: completing rounds 30, 60, 90 and every further multiple of 30 restores 50 villagers for free. This applies only to the second map (marsh), includes endless rounds, and can raise lives above 100. It is awarded once on successful round completion, before the round-end save; loading a completed round does not award it again. The forest map and lost games receive no reward.


Third map — Volcanic Ruins: an independent saved adventure with an ash-brown curling road on grey rocky ground, following Jack’s drawing, a broad orange lava shoreline and southwest lava pool (not buildable), three blue fresh-water pools for Water Serpants and Pirates, no cleric graves, and a southern outpost. Uses the existing enemy waves, prices and starting resources. Road movement, water placement and trap placement use this map’s own geometry. One decorative burning trunk without branches or leaves. Smooth lava and water shorelines are shared by placement and drawing. Existing enemy progress is migrated to the reshaped route. No removable trees. All maps grant only the new-enemy introduction reward: up to 10 villagers, capped at 101, after clearing the introducing round. Canvas scenery: volcano-art.js.


Turtle: ninth hero, water-only including flooded paths, 130 gold. Base melee bite: 20 physical damage every 1.4 seconds within 110 reach. Four six-tier paths: Blazing Jaws speeds bites and switches them to fire at tier 3, with burns; Tidal Body Slam leaves its shell, leaps high with one full flip above the path, lands with capped area damage, rolls back to its shell with tucked head and flippers and wears its shell again; Shellstorm quickly scoops eligible enemies into its shell, with 1–6 spaces across upgrades (tiny 0.1 per member, ordinary 1, brute/fusion/werewolf 2, giant 3; swarms stay together), then packs these groups into a returning shell, damages collisions and releases surviving passengers at their original route position. Tier 4+ shells explode at the far end instead of returning, spray physical shrapnel and require 1 second underwater to regrow a shell. Special attacks reach 230 units; bites remain melee. Capture obeys enemy size, immunity, blocks and the 12-control cap; swarms travel together. Shellstorm cannot capture bosses. Selling, stun or switching on Submerged releases passengers safely. Sunken Treasure unlocks a Submerge toggle beside targeting, with a Return to normal action to surface: stops all attacks and earns 1/3, 1/2, 1, 2, 3 or 5 gold per active-round second across tiers 1-6. No income while stunned or between rounds. Fractional earnings persist through saves and mode changes. Crosspathed specials alternate when ready; abilities unlock only at tier 6. Sources: turtle-mechanics.js and turtle-art.js; tests/turtle.test.js.


Flaming Abomination: tenth hero, 160 gold; land/lava fire form or water/flooded-path beast form. Red fire ape with a broad hunched back, lowered ape face, long heavy arms, and both fists planted on the ground while idle. Curved silhouettes, layered animated flame tongues, rising embers and yellow-white molten fissures follow the supplied red upper creature; arms lift for punches, whips and overhead boulders. Base melee attack: 24 fire damage every 1.25 seconds within 95 reach, plus a 2-second burn at 4 damage per second. Four paths: Flurry of Blows (faster punches), Living Inferno (Living Flame toggle beside targeting: choose and lock a legal path point inside anchor range; travel there and become a tall flame until Return to normal is pressed), Scorchlash (two-handed fire whip alternating with punches and unlocked boulders at any tier; use Attack rotation to configure counts and order or disable attacks, with knockback, outer reach 220/240/240/270/270/300 and unchanged inner melee reach), Molten Cataclysm (conjured fire boulder, 1.2-second windup, capped area impact on a melee target, visible shattering, 10-second recharge or 9 at tier 5+). Flame damage is throttled per enemy every 0.5 seconds, applies burn and detects path crossings. Form disables other attacks; stun suspends all attacks. Flame position persists between rounds and saves; turning the flame toggle off returns to the original placement without changing aim priority. Fire immunity, hidden Shadow immunity, and the three-displacement limit apply. All 24 upgrade descriptions and tier-six primary abilities are included. Files: abomination-mechanics.js, abomination-art.js, tests/abomination.test.js.


Abomination placement forms: land keeps Flaming Abomination; lava keeps the fire form and multiplies all its fire damage, burn and ability damage by 1.10. Natural water or a flooded path creates the permanent Abomination variant at the same 160-gold price, with its own 24 upgrades and saved form. Flood-dependent placement follows other water heroes: if its supporting flood disappears, the tower is sold with the normal refund. Hovering across the water boundary crossfades artwork over 0.22 seconds. The extinguished form is an extinguished version of the fire ape: the same hunched back, swept crest, lowered face and long grounded arms, with prominent charred spikes along its back, shoulders and forearms, cooled charcoal-brown surfaces, wet highlights, dripping water and faint steam. Its bite/dash/shake/dive/leap/glare animations remain. Base bite: 28 physical damage, 1.4-second interval, 95 melee reach; special attacks use 230 reach. Paths: Crashing Surge, Stormshake, Deepwater Ambush, Predator’s Glare. Exclusive actions; bite and other actions stop during specials. Dash hits each enemy once per pass and enforces 3 seconds of recovery. Glare takes 2 seconds, deals no damage and ignores status immunities, boss blocks and the ordinary slow cap. It cannot stack, shares a 2-stop lifetime cap across towers, and allows another stop only 3 seconds after the preceding stop expires. Swarms share the stop and limits. Stunned casters pause their actions and suppress their existing debuffs. Saves preserve action progress and shared glare counters; round end returns the beast home.


Volcanic Ruins placement: the entire large upper lava pool is forbidden for all towers, including Flaming Abomination. The smaller lower lava pool still accepts Flaming Abomination and grants its 10% lava damage bonus. Existing placed heroes are not removed.


Plague Wyvern balance: base health reduced 35%, from 130,500 to 84,825. Speed, poison immunity, 15 effect blocks, fear resistance, reward and village damage are unchanged. Endless scaling uses the new base health. Existing saved Wyverns receive the reduction once, preserving their remaining health percentage.


Ironling: first appears on round 47 (one guaranteed, then joins eligible random waves). Base health 180, two-thirds of Fusion Skeleton; movement time 45/1.68 seconds, identical to Fusion. Standard non-boss and endless health scaling applies. Reward 15 gold; village loss 3; wave budget cost 8. Animated grey hunched shell, short blunt head, black eye, two reaching arms and walking legs follow the supplied reference. Iron shell rejects unqualified tower damage and damaging statuses before shields or HP are touched. Slow, stun, freeze, fear, knockback and non-damaging debuffs still follow their normal rules. Crosspaths and later tiers retain eligibility, but do not unlock unrelated attacks. Counters: Knight Shield Bash and its upgrades; Lingering Light burns/holy attacks; Heavy Steel sword attacks; Archer Trick Shot bonus arrows; Flaming Tips arrows and burns; Rogue Vital Strike critical hits and Death Strike; Mage Armor Breaker projectiles/beams and arcane explosions; Fireball and its fire-path damage; Serpent Pressurized Stream beams; Tool Maker Blast Bolts turrets; Pirate Deck Cannon broadsides and Boarding Breaker rams; Turtle Heavy Landing slams and Ember Bite fire bites/burns; Extinguished Abomination Heavy Landing leaps. All fire-form Flaming Abomination damage works, even unupgraded. Poison, unrelated crosspath weapons, basic attacks without their qualifying upgrades, and unlisted abilities remain blocked. Enemy-caused Hell Hound explosions still work. Sources: ironling-art.js, engine.js; tests/ironling.test.js.


Camoflauger: introduced on round 53 with one guaranteed spawn; eligible in later random waves. Base HP 148.5 (three regular Ghouls), speed 7/8 of a regular Ghoul, reward 12 gold, village loss 2, wave budget cost 7. Normal non-boss health scaling applies. Uses the approved black-outlined salamander image with varied hand-drawn leaves on a filled green border (assets/enemies/camoflauger-refined-green-border.png). Animation uses 12 individually drawn poses from assets/enemies/camoflauger-skip-turn-sheet.png, based on the approved artwork: raised knees, skipping leaps, landings, side views and a leafy back view. Frames retain their proportions with no mesh deformation, squash or flattened turns. Movement drives frame selection and stun/freeze stops it. Heroes ignore it unless they own Radiant Swing, Steady Aim, Pick a Target, Magic Missile, Roaring Column, Pearl Seeker or Dread Focus; crosspaths and higher tiers count. Detection applies to every attack and effect owned by that hero, including traps. Unqualified heroes cannot target, damage, debuff, knock back, capture or stop it. Their traps and decoys do not trigger, and piercing/chain attacks skip it without consuming hits. Enemy-caused Hell Hound explosions still work. Upgrade descriptions explain detection. Animated comparison: enemy-preview.html. Tests: tests/camoflauger.test.js.


Attack rotation: heroes with multiple unlocked attacks have a button beside aim priority. The paused editor lets players choose an ordered repeating list, with 0–99 successful uses per step (0 disables that entry), duplicate steps, reordering, removal, and restoration of automatic attacks. An empty list disables automatic attacks. Cooldowns, range, targets, stun and exclusive actions still apply; failed attempts never advance the sequence. Launched projectiles and attacks complete normally; abilities remain manual. A stream, volley, trap placement or turret volley counts as one use, not one use per damage tick or target. New attacks remain excluded from an existing custom list until added. Order and partial counts save with the hero. Flame and submerged modes override attacks while active, preserve rotation progress and aim priority, and use separate themed toggle icons which change to a return symbol when active. Old saves with modes stored in targeting migrate automatically. Sources: attack-rotation.js and hero-controls.js; tests/attack-rotation.test.js.

Pursuit Rock: first appears on round 73 (one guaranteed), then eligible in random waves. Base HP 225 and speed match Demonic Nightmare; remains grounded. Reward 22 gold, loss 5 villagers, budget cost 16. Combines Iron Hardness (formerly Iron Shell) and Camouflage: detection is required for all hero interactions, plus an eligible specific attack for damage and damaging effects. Non-damaging effects work once detected. Uses individually drawn leafy rock skipping/turning poses.

Hidden Mummy: first appears on round 65 (one guaranteed), then eligible in random waves. Base HP 405 matches Werewolf; speed matches Pursuit Rock. Reward 22 gold, loss 5 villagers, budget cost 14. Camouflage requires the same detection upgrades as Camoflauger for all hero attacks, effects and traps. No Iron Hardness or additional immunity. Uses 12 individually drawn bandaged mummy poses with a leafy border, skipping and turning.

Iron Ball: first appears on round 95 with one guaranteed spawn; eligible in later random waves. Base HP 13,500 matches Weaker Cyclops; speed is 1.05 times Pursuit Rock. Iron Hardness restricts damage and damaging effects to qualified attacks, while non-damaging effects work normally. No Camouflage. Reward 100 gold, loss 20 villagers, budget cost 90. Large angular boulder with silver iron deposits; rotation follows distance traveled, so it stops rolling when movement stops.

Greater Imp: round 50 guaranteed debut, HP 337.5 (5/6 Werewolf), speed 1/3 Hidden Mummy. Reward 18 gold, loss 4 villagers, wave budget 12. Energy Shield blocks all attacks/effects from Mages, fire Abominations, Blessed Blade Knights and Trick Shot or Flaming Tips Archers, including crosspaths/higher tiers. Water Serpant may affect it only with path-one throws and path-two drags. Blast Bolts turrets, Hot Shot cannons, Ember Bite damage/burns are blocked while other attacks from those heroes work. Eight drawn walking poses preserve the reference red imp with black horns and oversized claws.

Retry Last Round: defeat screen restores and restarts the failed round from its pre-round checkpoint, including heroes/upgrades, gold, villagers, trees, cooldowns, seeded random state and the same wave lineup. Mid-round spending and rewards are rolled back. Checkpoint persists in saves and is replaced each round without nesting. Older saves without a checkpoint gain retry support on their next round start.

Village Diary: main-menu collection shared across maps and new games in this browser. Only actual kills count, including each tiny skeleton and enemy-caused kills; escapes never count. Unlock name/art at 1 defeat, number-free gameplay description at 40 total, base stats plus full mechanics at 100 total, lore at 200 total. Lore defaults to the literal placeholder lore discription. Skeleton lore: The first monsterous presence brought back using dark magic. Thankfully they are very easy to destroy. Progress persists independently of saves/retries; kills in retried rounds still count. Previous versions did not record kills, so tracking begins with this update.
