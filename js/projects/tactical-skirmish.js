class TacticalSkirmish extends ProjectShowcase {
  slug = "unreal-tps-skirmish";
  order = 3;
  title = "Tactical Skirmish";
  subtitle = "Third-person shooter";
  engine = "Unreal Engine";
  genre = "Team-based TPS";
  blurb = "Team battles alongside and against AI bots in the shifting, destructible EquipTech Arena.";
  overviewTitle = "Gear Up for Tactical Skirmish in the EquipTech Arena!";
  overview = [
    "I'm excited to share a glimpse into our latest project, Tactical Skirmish—a fast-paced, team-based third-person shooter set in the high-tech, ever-changing EquipTech Arena. Choose your side, strategize with your teammates, and dominate the battlefield!",
    "Check out the gameplay footage above and get ready for a tactical showdown!",
  ];
  featuresTitle = "Game Features";
  mechanics = [
    { name: "Team-Based Combat", text: "Collaborate with AI-controlled teammates to outmaneuver and outshoot the opposing team. Communication and strategy are key to securing victory!" },
    { name: "Third-Person Shooter Mechanics", text: "Experience balanced gameplay with a variety of weapons, each offering unique strengths and weaknesses." },
    { name: "EquipTech Arena", text: "Battle in a dynamic environment featuring changing layouts, destructible cover, and interactive elements. Adapt your tactics to stay ahead in this constantly evolving arena." },
    { name: "AI Bots", text: "Both teams are bolstered by AI bots with varying intelligence and tactics, ensuring a deep and challenging experience every match." },
    { name: "Objectives and Scenarios", text: "Engage in multiple game modes like Capture the Flag, Team Deathmatch, and King of the Hill. Completing objectives is crucial to earning points and securing victory." },
    { name: "Dynamic Cover System", text: "Use the environment to your advantage! Take cover, create new firing angles, and use destructible elements to outplay your opponents." },
  ];
}
ProjectShowcase.register(new TacticalSkirmish());
