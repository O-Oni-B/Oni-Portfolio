class MetallicOdyssey extends ProjectShowcase {
  slug = "unreal-3d-platformer";
  order = 2;
  title = "Metallic Odyssey";
  subtitle = "3D side-scrolling platformer";
  engine = "Unreal Engine";
  genre = "Side-scrolling platformer";
  status = "In development";
  blurb = "A side-scroller of reflective metal and glowing platforms, with patrolling enemies and triggered events.";
  overviewTitle = "Embark on a Glowing Adventure with Metallic Odyssey!";
  overview = [
    "I'm thrilled to share a sneak peek of our upcoming side-scrolling platformer, Metallic Odyssey—a visually stunning journey where art meets challenge. Crafted with Unreal Engine, this game is a mesmerizing blend of simplistic metallic textures and ethereal glowing platforms.",
    "Check out this short gameplay clip to experience the magic firsthand!",
  ];
  featuresTitle = "Gameplay Highlights";
  mechanics = [
    { name: "Glowing Aesthetics", text: "Dive into a captivating world of reflective metallic textures and stunning visual effects." },
    { name: "Patrolling Enemies", text: "Tackle unique enemies with diverse movement patterns and abilities that keep you on your toes." },
    { name: "Moving Platforms", text: "Navigate through intricate levels using dynamic platforms that add depth to both traversal and puzzle-solving." },
    { name: "Interactive Events", text: "Trigger events that open new areas, deactivate barriers, and uncover hidden paths to progress." },
  ];
}
ProjectShowcase.register(new MetallicOdyssey());
