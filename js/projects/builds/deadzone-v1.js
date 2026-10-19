/**
 * DeadZone V1 — a playable WIP build, its own card in "Playable Builds".
 * Media: assets/deadzone-v1/01.mp4, 02.mp4 ... and 01.jpg, 02.jpg ... (found automatically).
 * Video 1 is the "deadzone test 1" cut; the rest are dev recordings in date order (Jul–Sep 2024),
 * with long recordings split into parts of about 3 minutes.
 * Text is the DeadZone development update post, word for word.
 */
class DeadZoneV1 extends ProjectShowcase {
  slug = "deadzone-v1";
  order = 1;
  category = "builds";
  engine = "Unreal Engine";
  genre = "Action";
  status = "WIP";
  title = "DeadZone V1";
  subtitle = "Combat feedback build";
  download = "https://drive.google.com/drive/folders/1k2Fa7sT37v1uuhufPeJsdV_nYK45HjgC?usp=drive_link";
  gore = true;
  blurb = "A playable WIP build focused on combat feel: directional melee hit reactions, HUD hit markers and ALS ragdoll physics.";

  overviewTitle = "DeadZone Development Update";
  overview = [
    "Excited to share some new progress in DeadZone! We've been focusing on refining combat feedback to make each battle more immersive and responsive.",
    "These updates make DeadZone's combat system more tactile and rewarding, giving players a seamless and immersive gameplay experience. Whether you're fighting up close or from a distance, every action feels impactful!",
    "What’s Next? Further optimizing the HUD for better accessibility. Adding AI responses to ragdoll events for even more dynamic encounters.",
  ];
  featuresTitle = "What's New?";
  mechanics = [
    { name: "Melee Hit Reactions", text: "Enemies now react dynamically to melee attacks, flinching or staggering in the direction of the incoming strike. This subtle enhancement adds realism and helps players feel the weight of their actions in close combat." },
    { name: "Ranged Attack Feedback in HUD", text: "Hit markers have been added to the HUD to instantly convey successful ranged attacks. Different visual cues for normal hits, critical hits, and headshots ensure clarity and keep combat engaging." },
    { name: "ALS Ragdoll Integration", text: "Implemented realistic ragdoll physics using the Advanced Locomotion System (ALS). Enemies now collapse dynamically, reacting to explosions, ember slashes, and other external forces, making combat scenarios more lifelike." },
  ];
}
ProjectShowcase.register(new DeadZoneV1());
