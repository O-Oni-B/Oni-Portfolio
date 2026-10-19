class DoodleJump extends ProjectShowcase {
  slug = "doodle-jump";
  order = 1;
  title = "Doodle Jump";
  subtitle = "Endless jumper";
  engine = "Unreal Engine";
  genre = "Vertical platformer";
  orientation = "portrait"; // tall phone-style clip
  previewStart = 20;        // skip the start menu for the card preview
  blurb = "An endless upward jumper with enemies to stomp and jump pads that launch you sky-high.";
  overviewTitle = "Explore the Mechanics of my Unreal Doodle Jump Game";
  overview = [
    "Hey there! I'm showcasing one of my Unreal Engine projects – a Doodle Jump game that's all about defying gravity and reaching new heights!",
    "Doodle Jump Adventures Overview: Dive into an electrifying Unreal Engine game! Guide your bouncy hero through challenges, leaps, and enemies. Test reflexes and timing to reach new heights.",
  ];
  featuresTitle = "Mechanics";
  mechanics = [
    { name: "Jumping", text: "Master the art of continuous upward jumps. Tap or use your controller for precise jumps." },
    { name: "Enemies", text: "Beware mischievous foes in the skies. Dodge swiftly or strategically bounce on their heads." },
    { name: "Horizontal Movement", text: "Navigate diverse landscapes using expansive platforms." },
    { name: "Jump Pads", text: "Discover special pads for sky-high launches. Combine with clever maneuvers to soar even higher!" },
  ];
}
ProjectShowcase.register(new DoodleJump());
