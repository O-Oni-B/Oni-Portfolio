/**
 * DeadZone V2 — the ground-up rebuild, its own card in "Playable Builds".
 * Media: assets/deadzone-v2/01.mp4, 02.mp4 ... and 01.jpg ... (found automatically).
 * Videos 1–2: Unreal Editor recordings (8 and 14 Aug 2025). Videos 3–6: packaged development builds
 * (9 Aug 2026 in 2 parts, 12 Aug 2026 in 2 parts). Images 1–3: procedural level screenshots.
 * Text is the "DEADZONE: reimagining an old idea" LinkedIn post, word for word.
 */
class DeadZoneV2 extends ProjectShowcase {
  slug = "deadzone-v2";
  order = 2;
  category = "builds";
  engine = "Unreal Engine 5.7";
  genre = "Roguelite arcade hack 'n' slash";
  team = "Solo developer";
  status = "WIP";
  info = [["Architecture", "OOP + ECS"]];
  title = "DeadZone V2";
  subtitle = "Roguelite hack 'n' slash rebuild";
  download = "https://drive.google.com/drive/folders/1TLmDehQvSNp8_u0e8UeqXXcPOCVGWKWG?usp=drive_link";
  blurb = "DeadZone rebuilt from the ground up as a roguelite arcade hack 'n' slash: Ember shifts between sword and gun, with procedural runs toward the crystals of the Hollow Moon.";

  overviewTitle = "DEADZONE: reimagining an old idea";
  overview = [
    "A while back I had a concept for a game called Deadzone. It never quite became what I pictured, so I've been rebuilding it from the ground up with a clearer vision: a roguelite arcade hack 'n' slash that is fast, aggressive and full of powers.",
    { heading: "The world" },
    "High above a ruined world hangs the Hollow Moon. It is pitiless and empty, and it spits out shadow-born summons whose only purpose is to consume. The Moon is held together by crystals scattered through its depths. Destroy them, and the Moon falls.",
    "Against it stands Ember, a primordial flame and the last force still resisting the Moon. Ember bends to your will. In an instant it transforms into a sword for close-quarters carnage or a gun for ranged pressure. You can also manipulate it into devastating special attacks that amplify your strength.",
    "Every run is a push toward one of these crystals. Reach it and shatter it, and the explosion consumes you along with it. Then Ember brings you back to continue the mission. Run after run, crystal after crystal, the journey goes on until the Moon is broken.",
    { heading: "Finding Ember" },
    "Ember went through many iterations before it became what it is now. I explored a lot of ideas for how a power like this could feel in the player's hands, and I prototyped and scrapped plenty of them along the way. I was heavily inspired by the Ghost series and God of War Ragnarök, and how both make the player's abilities feel like an extension of the character. That led me to a sleeker idea: a living power the character shapes at will. Landing on it redefined how the whole game plays.",
    { heading: "What I've built so far (solo, in Unreal Engine 5.7)" },
    "The goal from day one was systems that scale. I want to add new abilities, enemies and items without rewriting what's already there.",
    "To get there, most of my systems merge object-oriented design with an Entity Component System (ECS) approach to get the benefits of both. On the OOP side, systems inherit shared logic from parent classes and can override it wherever a specific case needs different behaviour. On the ECS side, functionality lives in modular components that are attached to an entity only when it actually needs them. Nothing carries logic it doesn't use, and new content comes from combining and extending pieces instead of rebuilding them from scratch.",
    "It's been a huge learning experience in architecting gameplay systems that hold up as a project grows. There's a lot more to come. I'd love to hear from anyone else building combat or roguelite systems!",
  ];
  featuresTitle = "Systems";
  mechanics = [
    { name: "Custom ability system", text: "I built my own GAS-style framework from scratch. It covers abilities, costs, cooldowns and attributes like Health and Ember." },
    { name: "Attribute modifier system", text: "Items, buffs and effects stack modifiers onto stats. Every stat recalculates automatically as modifiers are added or removed. This is the backbone that lets new powers plug in cleanly." },
    { name: "Combat system", points: ["Light and heavy combos", "Dodge, block and parry into executions", "Ember transformations and special attacks"] },
    { name: "Black Flash", text: "Inspired by Jujutsu Kaisen, Black Flash is a rare, devastating critical hit. It becomes more likely the better you perform. Landing one can also grant Blessings, which are attribute modifiers applied at runtime that boost your stats mid-run. Taking hits or whiffing pulls you out of the zone, so you have to stay sharp to keep the momentum going." },
    { name: "Scalable enemy framework", text: [
      "Every enemy type runs off its own configuration, which controls its behaviour, aggression, spacing and difficulty. Adding a new enemy means mixing components and building a new config. That makes it easy to grow a varied roster, from basic fodder to shield bearers to heavy brutes.",
      "Positioning was an optimisation challenge. Instead of Unreal's Environment Query System, which generates and scores large sets of points, enemies use lightweight conditional collision checks to find valid positions around the player. That keeps the cost low even when the screen is packed with enemies.",
    ] },
    { name: "Custom state system", text: "This system manages what the player and enemies can and can't do at any given moment. It keeps combat responsive and predictable as more mechanics stack on top." },
    { name: "Dynamic camera system", text: "The camera reads the fight in real time. It pulls back and reframes as more enemies pile in, so a big brawl stays readable. It then tightens back in when it's a one-on-one." },
    { name: "Spawner and procedural generation", points: [
      "Every run builds a new layout, room by room.",
      "The generator handles overlap detection and backtracking when it gets stuck.",
      "Leftover doorways are sealed automatically.",
      "Seeded generation lets you replay a specific layout or go fully random.",
      "Enemies spawn only where they can actually reach you.",
    ] },
    { name: "UI and navigation", text: "A custom HUD shows your abilities and resources. An on-screen compass helps you navigate each procedurally generated level, so you always know where to push next." },
  ];
}
ProjectShowcase.register(new DeadZoneV2());
