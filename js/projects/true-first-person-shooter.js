/**
 * TFPS — True First Person Shooter. A small prototype.
 * Videos live in assets/true-first-person-shooter/ as 01.mp4, 02.mp4 ... and are found automatically.
 * Written from the gameplay videos: Video 1 is the blockout test range, Video 2 is the Crash-inspired map.
 */
class TrueFirstPersonShooter extends ProjectShowcase {
  slug = "true-first-person-shooter";
  order = 5;
  title = "TFPS";
  subtitle = "True first-person shooter";
  engine = "Unreal Engine";
  genre = "First-person shooter";
  status = "Prototype";
  blurb = "A small true first-person shooter with stat-driven weapons, body-part damage, double dash and jump, a grapple hook and peeking.";

  overviewTitle = "TFPS: True First Person Shooter";
  overview = [
    "TFPS is a small first-person shooter prototype built in Unreal Engine around a true first-person setup: the camera sits in the character's head, so you see your own arms and body move instead of a floating pair of arms.",
    "It focuses on movement and gunplay. Weapons run on their own stats, damage depends on where a shot lands on the body, and the player can double dash, double jump, grapple and peek around cover. The videos show it on a blockout test range and on a greybox map inspired by Crash from Call of Duty 4: Modern Warfare.",
  ];
  featuresTitle = "Features";
  mechanics = [
    { name: "True First-Person View", text: "The camera is attached to the full character, so arms, hands and body stay visible and animate with every movement, reload and weapon swap." },
    { name: "Weapon System with Weapon Stats", text: "Each weapon runs on its own stats. The videos show four of them: the Bhari Pichkari, the Silver Assault Rifle, the AR4 and the SMG11, with the weapon name, health and ammo count on the HUD." },
    { name: "Body-Based Damage", text: "Damage depends on the bone that gets hit. In the test video a headshot deals 40, a spine hit 20, a clavicle or upper-arm hit 16 and a lower-arm hit 10, with each hit registered on the server." },
    { name: "Double Dash and Double Jump", text: "Two dashes and a double jump give fast, vertical movement for crossing gaps and reaching rooftops." },
    { name: "Grapple Hook", text: "A grapple hook pulls the player toward ledges and high ground, opening up routes across the map." },
    { name: "Peeking System", text: "Lean out from behind cover to look and shoot around corners while keeping most of the body hidden." },
    { name: "Crash-Inspired Map", text: "A greybox map inspired by Crash from Call of Duty 4, with tight alleys, multi-storey buildings and rooftops to move across." },
  ];
}
ProjectShowcase.register(new TrueFirstPersonShooter());
