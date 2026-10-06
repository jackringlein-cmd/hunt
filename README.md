# The Hunt for the Necromancer

A browser tower-defense game with ten heroes, four upgrade paths each, and 240 upgrades.

## Play

Double-click **Play Game.cmd**. It starts the game and opens it in your browser.

You can also run `node server.js` and visit **http://127.0.0.1:4173**.
No packages need to be installed. If Node is not available, the launcher opens `index.html` directly.

Use the same browser and address each time: saves are stored in that browser. The file version and the localhost version have separate saves. Clearing browser data removes saves.

## Controls

- Choose a hero on the right, then click clear grass beside the path.
- Click a placed hero to choose its aim, read upgrades, buy them, or sell it.
- Click a tree to clear it for 25 coins.
- Press **Start Wave** (or Space) when ready.
- Click the buttons at the bottom to use unlocked abilities. Some ask you to choose an enemy or a spot on the path.
- Press Escape to cancel placement or an ability choice.
- Open the gear in the top-right for hints, auto-start, the guide, volume, and **Save and Exit**. This pauses play and blocks the map.

Sound begins after your first click. The volume slider controls music and sound effects.

## Included

- Illustrated forest, marsh, and volcanic ruins maps, land and water heroes, removable forest trees, and a village to defend.
- Ten heroes, forty upgrade paths, and 192 upgrades.
- One six-upgrade path and one two-upgrade path per hero.
- Nine enemy types, armor, shields, harmful-effect blocks, and fear resistance.
- Random waves with agreed first appearances. Wave 100 is exactly one Bone Dragon followed by ten Bone Captains.
- 100 villagers, 200 starting coins, reduced money at 50 villagers, and 70% sale refunds.
- Automatic saves after waves and mid-wave Save and Exit, including enemies and ability waits.
- Persistent speed unlocks at waves 50, 75, and 100; endless play after victory.
- First-game guide, enemy hints, hard-wave warnings, enemy aiming, and range circles only when placing or selecting heroes.
- Original synthesized music: **Lanterns in the Woods** (menu/preparation), **Hold the Path** (battle), **The Bone Crown** (boss/endless), and a victory theme.
- Synthesized sword, arrow, spell, coin, wave, ability, explosion, and village-danger sounds. No third-party music recordings or artwork.

## First-version balance notes

The agreed numbers are implemented, but the whole 100-wave game still needs human playtesting for difficulty and fun. Random wave sizes, some distances, and interactions not specified in the design use starting values. The forest art is drawn with code and can be replaced or improved later.

Matching leader bonuses do not stack; the strongest applies. Second Wind cannot be reset or shortened. Matching income boosts do not stack, and Payday plus Village Festival cannot quadruple rewards. Fire patches from one mage do not stack their damage on an enemy. Fractional rewards and discounted prices round up; sale refunds round down.

## Files

- `data.js`: hero prices, upgrade names/descriptions, enemies, map, and tree positions.
- `engine.js`: fighting, waves, abilities, money, saves, and upgrade rules.
- `game.js`: drawing, menus, controls, guide, and persistent speed unlocks.
- `audio.js`: original music compositions and sound synthesis.
- `style.css`: screen layout and appearance.
- `drawing-art.js`, `upgrade-looks.js`, and `drawing.css`: current flat hand-drawn style and 725 unique hero/upgrade appearances. Earlier styles remain in the folder but their renderers are not loaded.
- `GAME_DESIGN.md` (also `GAME_DESIGN.txt`): complete design document to share with another chat, including all 120 upgrades and accepted rules.
- `tests/engine.test.js`: game-rule tests; run `node --test tests/engine.test.js`.
- `tests/browser-check.cjs`: optional Playwright browser checks. Requires Playwright and Edge; accepts `PLAYWRIGHT_MODULE` and `BROWSER_CHANNEL` environment variables.

Everything runs locally. Only the optional display fonts load from the internet; built-in fonts are used when offline.

## Development and GitHub

Repository: https://github.com/jackringlein-cmd/hunt (main). Completed changes are committed and synced here. Generated screenshots and the separate Sites publishing checkout are ignored. GitHub updates do not automatically republish the separate Sites website.

Run all gameplay checks with `node --test tests/engine.test.js tests/serpent.test.js tests/toolmaker.test.js tests/pirate.test.js tests/turtle.test.js tests/abomination.test.js tests/water-beast.test.js`.

Pirate costs 150 gold and is placed in water or a flooded path. Its base attack throws rocks. Its paths are Ironclad Charge (boat rams), Razor Reef (piercing rocks), Broadside Inferno (fire cannons with increasing reload time), and Captain’s Comeback (returning hats that stun increasingly large enemies).

Turtle is a water-only melee hero with Blazing Jaws, Tidal Body Slam, Shellstorm, and Sunken Treasure paths. Sunken Treasure unlocks a Submerged targeting choice that trades attacking for steady gold during the round.

Flaming Abomination: a land hero with Flurry of Blows, Living Inferno, Scorchlash, and Molten Cataclysm. Living Flame targeting locks it to a chosen path point; selecting another target mode returns it home. Whip upgrades show separate outer whip and inner melee range circles.

Flaming Abomination changes permanently into Abomination when placed in natural water or on a flooded path, with 24 alternate upgrades: Crashing Surge, Stormshake, Deepwater Ambush and Predator’s Glare. Lava placement keeps the fire form and grants 10% extra damage. The placement preview blends between land and water forms.
