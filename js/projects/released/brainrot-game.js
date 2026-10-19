class BrainrotGame extends ReleasedProject {
  slug = "brainrot-game";
  order = 2;
  title = "Brainrot Game";
  subtitle = "Collect, hatch and compete";
  storeTitle = "Brainrot Game - Steal Brainrots, Viral Meme & Multiplayer Games";
  genre = "Collection game";
  platform = "Amazon Appstore";
  blurb = "A fast-paced collection game packed with chaos, surprises, and nonstop progression: hatch eggs, upgrade Brainrots and steal rare ones from rivals.";

  // From the Amazon Appstore listing
  listingTitle = "BrainRot – Collect, Hatch, Compete!";
  overview = [
    "BrainRot is a fast-paced collection game packed with chaos, surprises, and nonstop progression. Build your ultimate Brainrot collection by hatching eggs, upgrading characters, and outplaying rivals.",
    "Buy eggs from the shop, hatch them to discover new Brainrots, and grow stronger with every upgrade. Explore different zones, steal rare Brainrots, and climb the rankings to prove you have the most powerful collection.",
    "Easy to play, hard to put down—BrainRot is built for quick sessions and addictive progression.",
    "Download now and start hatching Brainrots!",
  ];
  listSections = [
    {
      title: "Key Features",
      items: [
        "Collect and upgrade a wide variety of funny Brainrots",
        "Hatch eggs to unlock new, rare, and secret Brainrots",
        "Each Brainrot has unique traits and personalities",
        "Explore multiple zones and steal Brainrots from others",
        "Fast progression with constant rewards",
        "Compete in rankings and rise to the top",
        "Limited-time events with exclusive Brainrots",
      ],
    },
    {
      title: "Why Play Brain Rot?",
      items: [
        "Simple controls, instant fun",
        "Satisfying collection and upgrade system",
        "Perfect for quick play sessions",
        "Endless progression and competition",
      ],
    },
    {
      title: "Product features",
      items: [
        "Realistic physics simulation with challenging levels across open world city, ocean, and arena terrain",
        "Free offline fun for the whole family — casual and addictive arcade action for kids and adults",
        "Speed, strategy, and survival — dominate the leaderboard in fast multiplayer battles",
        "Unlock and upgrade characters, skins, costumes, and powerups with coins and rewards",
        "Dynamic maps with obstacles, traps, and environments for endless fun and competition",
        "Track your score and earn achievements in career championship tournament mode",
        "Singleplayer and multiplayer — relaxing mode or intense competitive rush with timer",
        "Smooth controls with satisfying sounds, graphics, and camera for adrenaline gameplay",
        "Precision skills, reflexes, and timing challenges across handcrafted adventure terrain",
        "Works on tablet with controller and joystick — education for boys and girls",
      ],
    },
  ];

  stores = [{ name: "Amazon Appstore", url: "https://www.amazon.com/dp/B0GJCLN6GD" }];
  thumbnail = "brainrot-game.jpg";
  art = { color: "#f472b6", glyph: "B" };
}
ProjectShowcase.register(new BrainrotGame());
