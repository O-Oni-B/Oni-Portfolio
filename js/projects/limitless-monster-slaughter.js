/**
 * Limitless Monster Slaughter — one project, one post, several clips from different points in development.
 * Clips live in assets/limitless-monster-slaughter/ as 01.mp4, 02.mp4, 03.mp4 ... and are found automatically.
 * Add 04.mp4 to that folder and it appears in the picker as "Video 4".
 */
class LimitlessMonsterSlaughter extends ProjectShowcase {
  slug = "limitless-monster-slaughter";
  order = 9;
  title = "Limitless Monster Slaughter";
  subtitle = "Zombie survival shooter";
  engine = "Unreal Engine";
  genre = "Third-person shooter";
  gore = true;
  blurb = "An adrenaline-fueled third-person shooter that pits you against relentless hordes of zombies in a battle for survival.";


  overviewTitle = "Limitless Monster Slaughter";
  overview = [
    "Limitless Monster Slaughter is an adrenaline-fueled third-person shooter that pits you against relentless hordes of zombies in a battle for survival. With waves of undead enemies coming at you from every direction, your goal is simple: survive as long as you can, using an arsenal of deadly weapons and sheer willpower.",
  ];
  featuresTitle = "Key Features";
  mechanics = [
    { name: "Wave-Based Survival", text: "Face off against endless waves of zombies, each more challenging and numerous than the last. The intensity ramps up with each wave, pushing your skills and strategies to their limits." },
    { name: "Diverse Arsenal", text: "Equip yourself with a wide range of firearms, from pistols and shotguns to assault rifles and sniper rifles. Utilize melee weapons like bats, machetes, and chainsaws to get up close and personal with the undead. Lob grenades to clear out groups of zombies or create strategic advantages during intense battles." },
    { name: "Gore and Carnage", text: "Experience visceral combat with gore-heavy mechanics that emphasize the brutal nature of zombie slaying. Watch as limbs fly and blood splatters in every direction, adding to the chaotic atmosphere of the game." },
    { name: "Resource Management", text: "Scavenge for ammo, health packs, and energy drinks to stay alive and keep your killing spree going. Use energy drinks to boost your speed and stamina, giving you an edge when the undead hordes close in." },
    { name: "Endless Survival Mode", text: "Test your limits in an endless survival mode where the goal is to outlast and outgun the zombie apocalypse. Compete for high scores and see how long you can endure the relentless onslaught." },
    { name: "Cinematic Experience", text: "Immerse yourself in the action with cinematic camera angles and intense sound design that heighten the sense of danger and excitement. The game’s dark, moody atmosphere and detailed environments make every moment feel like a scene from a horror movie." },
  ];
}
ProjectShowcase.register(new LimitlessMonsterSlaughter());
