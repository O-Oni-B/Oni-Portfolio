/**
 * Urban Reign — one project, two versions.
 * V1: Batman-style free-flow combat. V2: Jujutsu Kaisen-inspired supernatural powers.
 * The page opens on the latest version; the switcher moves between them.
 */
class UrbanReign extends ProjectShowcase {
  slug = "urban-reign";
  order = 6;
  title = "Urban Reign";
  engine = "Unreal Engine";
  genre = "Melee action";
  status = "WIP";
  blurb = "A free-flow brawler that grew from Batman-style combat in V1 to curse energy, Domain Expansions and Black Flash in V2.";

  versions = [
    {
      label: "V1",
      subtitle: "Free-flow brawler",
      note: "V1 is the original: Batman-style free-flow combat in a spotlight arena.",
      overviewTitle: "Step into the Spotlight with Urban Reign!",
      overview: [
        "Thrilled to share an early glimpse of our very WIP (Work-In-Progress) action game, Urban Reign—where gritty, hand-to-hand combat meets atmospheric, spotlight-lit arenas. Inspired by the iconic Batman free-flow combat system, this game challenges you to master fluid, combo-driven battles in a world where precision and timing are everything.",
        "This project is still very much in the WIP stage, but I am excited to share the journey with you. Check out the gameplay footage above and get a taste of what’s to come!",
      ],
      featuresTitle: "Key Features",
      mechanics: [
        { name: "Free-Flow Combat", text: "Seamlessly string together attacks, counters, and takedowns in a fluid dance of destruction as you face off against multiple enemies." },
        { name: "Atmospheric Arena", text: "Fight in a dark, isolated environment where a single spotlight pierces the shadows, adding tension and focus to each encounter." },
        { name: "Dynamic Enemy Encounters", text: "Adapt your tactics on the fly as you face a variety of enemies with distinct fighting styles and strategies." },
        { name: "Cinematic Presentation", text: "Experience intense, movie-like combat scenes with dynamic camera angles and dramatic lighting." },
      ],
    },
    {
      label: "V2",
      subtitle: "Supernatural free-flow brawler",
      note: "V2 adds Jujutsu Kaisen-inspired powers: Cleave, Domain Expansions and Black Flash.",
      overviewTitle: "Introducing Urban Reign v2: The Next Evolution in Combat Gaming!",
      overview: [
        "I’m excited to unveil the latest update to Urban Reign, where I've tried to push the boundaries of combat gaming with new supernatural elements!",
        "Urban Reign v2 challenges you to master arcane powers and dominate the arena with a fusion of brutal combat and mystical prowess. Are you ready to rise to the challenge?",
      ],
      featuresTitle: "Features",
      mechanics: [
        { name: "Supernatural Combat", text: "Dive into advanced techniques inspired by Sukuna’s Cleave and combat system of Jujutsu Kaisen. Enhance your attacks with potent curse energy for a truly devastating impact." },
        { name: "Domain Expansions", text: "Unleash your own Domain Expansions to reshape the battlefield. Craft specialized arenas that boost your abilities and trap opponents within your cursed domain." },
        { name: "Black Flash Probability", text: "Engage in high-stakes combat with the Black Flash. Master this high-damage strike, where success is influenced by a strategic risk and reward element." },
        { name: "Enhanced Free-Flow Combat", text: "Experience an evolved free-flow combat system that blends physical prowess with mystical abilities. Adapt your tactics to face foes wielding curse energy." },
        { name: "Atmospheric Arena", text: "Immerse yourself in the dark, spotlight-lit arena, now enhanced by eerie curse energy and dynamic Domain Expansions for a more immersive experience." },
        { name: "Cinematic Presentation", text: "Enjoy dramatic camera angles and lighting that combine gritty action with supernatural spectacle, delivering a truly cinematic experience." },
      ],
    },
  ];
}
ProjectShowcase.register(new UrbanReign());
