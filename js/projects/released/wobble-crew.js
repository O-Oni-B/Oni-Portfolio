class WobbleCrew extends ReleasedProject {
  slug = "wobble-crew";
  order = 3;
  title = "Wobble Crew";
  subtitle = "Party platformer";
  storeTitle = "Wobble Crew Game - Party Falling Guys Platform Games";
  genre = "Party racing";
  platform = "Amazon Appstore, Google Play (TV)";
  publisher = "RI Casual Offline Games";
  blurb = "A fun and chaotic party game where wobbly characters race through wild obstacle courses, with boosts like Speed, Jump, Dash and Slow-Mo.";

  // Description from the Google Play listing; product features from the Amazon Appstore listing
  overview = [
    "Welcome to Wobble Crew, a fun and chaotic party game where wobbly characters race through wild obstacle courses.",
    "Race through colorful arenas filled with moving platforms, tricky traps, and challenging routes.",
    "Unlock fun characters, skins, and outfits to personalize your wobbly hero.",
    "Jump into the chaos and prove you have what it takes to lead the Wobble Crew to victory.",
  ];
  listSections = [
    {
      title: "Boosts",
      intro: "Master special abilities that can help you during each race:",
      items: [
        { name: "Speed Boost", text: "Run faster and race ahead." },
        { name: "Jump Boost", text: "Reach higher platforms and clear tough obstacles." },
        { name: "Dash", text: "Burst forward to dodge traps and close the gap." },
        { name: "Slow-Mo", text: "Slow down time to time difficult jumps." },
        { name: "Custom Checkpoint", text: "Save your progress and continue your run." },
      ],
    },
    {
      title: "Features",
      items: [
        "Fast-paced obstacle racing gameplay",
        "Fun party-style challenges",
        "Elimination-style rounds",
        "Fun characters and customizable skins",
        "Colorful environments and exciting levels",
        "Easy controls with challenging gameplay",
      ],
    },
    {
      title: "Product features (Amazon)",
      items: [
        "Realistic physics simulation with challenging levels across beautiful world terrain and scenery",
        "Free offline fun for the whole family — casual and addictive arcade action for kids and adults",
        "Collect, match, and compete in open world adventure maps with powerups and boosters",
        "Unlock and upgrade characters, skins, and costumes with coins and rewards",
        "Dynamic themes with night, sunset, ocean, mountain, and city environments",
        "Track your score on the leaderboard and earn rewards in career championship tournament mode",
        "Multiplayer and singleplayer — relaxing endless mode or intense survival challenge with timer",
        "Smooth controls with satisfying sounds, graphics, and adrenaline camera views",
        "Precision skills, reflexes, strategy, and timing challenges across handcrafted terrain",
        "Works on tablet with controller and joystick — education for boys and girls",
      ],
    },
  ];
  listing = [
    ["Category", "Adventure"],
    ["Rated", "Everyone"],
    ["Store notes", "Contains ads, in-app purchases"],
    ["Updated", "Jul 25, 2026 (Google Play)"],
  ];

  stores = [
    { name: "Amazon Appstore", url: "https://www.amazon.com/dp/B0GRCMKH6N" },
    { name: "Google Play (TV)", url: "https://play.google.com/store/apps/details?id=com.renderedideas.wobblecrew.tv" },
  ];
  thumbnail = "wobble-crew.jpg";
  art = { color: "#ffb547", glyph: "W" };
}
ProjectShowcase.register(new WobbleCrew());
