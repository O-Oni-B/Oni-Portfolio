/**
 * Eye of the Divine (EOD) — merged from six LinkedIn development posts.
 * Videos go in assets/eye-of-the-divine/ as 01.mp4, 02.mp4 ... and are found automatically.
 * Video 1, 2 and 3 are gameplay recordings from the editor (ALS movement, sword and M4A1 combat, enemy AI).
 */
class EyeOfTheDivine extends ProjectShowcase {
  slug = "eye-of-the-divine";
  order = 10;
  title = "Eye of the Divine";
  subtitle = "Indian mythology action game";
  engine = "Unreal Engine 5";
  genre = "Action / stealth";
  status = "WIP";
  info = [["Scripting", "C++ and Blueprint"]];
  blurb = "Indian mythology meets an Indian WW1-era world: GASP + ALS traversal, melee and raycast firearms, and stealth against AI that hunts in groups.";

  overviewTitle = "Eye of the Divine (EOD)";
  overview = [
    "Eye of the Divine is a fast-paced action game I'm building in Unreal Engine 5 with a blend of C++ and Blueprint scripting. It draws on the rich lore of Indian mythology, with its ancient tales, iconic deities and legendary warriors, and sets it in an Indian WW1-era world. The game mixes traversal, melee and historical firearms, stealth, and enemies driven by AI.",
    "Combat flows between slashes, dodges and ranged attacks, and precision and timing are the keys to survival. Next up are a modular inventory with quick-access slots for consumables, and more weapons inspired by the legendary weapons of the Indian epics and by iconic firearms of the WW1 era.",
  ];
  featuresTitle = "Features";
  mechanics = [
    { name: "Dynamic Animation System", text: "I integrated the Game Animation Sample Project (GASP) with elements from the Advanced Locomotion System (ALS), so movement feels fluid and responsive, realistic yet fast-paced." },
    { name: "Traversal Overhaul", text: "I updated the GASP traversal system so the player can move seamlessly across any geometry and explore complex environments with ease." },
    { name: "Parkour and Evasion", text: "Dodging, parkour and quick sidesteps keep the player mobile and out of harm's way, so skill-based evasion makes every moment count." },
    { name: "Level Design", text: "I built a rough blockout environment entirely on my own to test mechanics, then expanded it into a larger, more varied environment with areas built for dynamic parkour." },
    { name: "Loadouts and Pickups", text: "The character spawns with a preset loadout of melee and ranged weapons, and weapons scattered across the world can be picked up and added straight to the inventory." },
    { name: "Weapon Switching on the Move", text: "Players can switch or swap weapons mid-game, even while climbing, vaulting or dodging, so movement sequences stay smooth and uninterrupted." },
    { name: "Melee Equipping Overlay", text: "A streamlined overlay state for equipping melee weapons gives smooth transitions into combat." },
    { name: "Raycast Firearms", text: "Guns use raycast mechanics (line trace by channel in Unreal Engine 5) to simulate bolt-action rifles and early handguns, with muzzle flashes, smoke trails and bullet impact decals. The system is modular, so new weapons are easy to add." },
    { name: "AI Perception and Stealth", text: "Enemies detect the player by proximity, line of sight and sound, which opens up stealth play: stay hidden, avoid detection and outsmart your foes." },
    { name: "Coordinated AI", text: "When one enemy spots the player, it alerts the others from the same spawner, and the whole group fires toward the player's last known position." },
    { name: "Adaptive Combat", text: "Enemies switch between ranged and melee attacks based on distance and tactics, while turrets, obstacles and hazards keep the player on their toes." },
    { name: "Core Gameplay Loop", text: "Engage or avoid, stay undetected, react and survive if spotted, then reset and plan to regain the upper hand." },
  ];
}
ProjectShowcase.register(new EyeOfTheDivine());
