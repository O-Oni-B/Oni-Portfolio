class SnakeGame extends ReleasedProject {
  slug = "snake-game";
  order = 1;
  title = "Snake It!";
  subtitle = "Online multiplayer snake battler";
  storeTitle = "Snake Game - Silther Worms Snake Fight Online Multiplayer Games";
  genre = "Multiplayer .io";
  platform = "Amazon Appstore";
  blurb = "A fast-paced, modern reinvention of the classic Snake game that blends nostalgic arcade fun with intense real-time multiplayer competition.";

  // From the Amazon Appstore listing
  overview = [
    "Welcome to Snake It!, a fast-paced, modern reinvention of the classic Snake game that blends nostalgic arcade fun with intense real-time multiplayer competition. If you love action-packed casual games where every second matters and every move could make the difference between victory and defeat, then Snake It! is the game you’ve been waiting for.",
    "Slither, survive, grow, and dominate in a massive arena filled with hungry rivals, strategic power-ups, and thrilling surprises. Your only goal? Stay alive longer than anyone else and become the biggest snake on the battlefield.",
    "Every match starts small. Your snake is tiny, fragile, and vulnerable. The world around you is full of glowing orbs of energy that let you grow longer and stronger. But you are not alone. Dozens of other snakes share the same space, and they all want to be the biggest.",
    "The longer your snake becomes, the more powerful you feel — but also the harder it becomes to control. That balance between power and risk is what makes every second in Snake It so exciting.",
  ];
  listSections = [
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

  stores = [{ name: "Amazon Appstore", url: "https://www.amazon.com/dp/B0G5QRQR4B" }];
  thumbnail = "snake-game.jpg";
  art = { color: "#4ade80", glyph: "S" };
}
ProjectShowcase.register(new SnakeGame());
