class ZombieHordeSurvival extends ProjectShowcase {
  slug = "unreal-topdown-shooter-survival";
  order = 4;
  title = "Zombie Horde Survival";
  subtitle = "Top-down shooter";
  engine = "Unreal Engine";
  genre = "Wave survival";
  blurb = "Hold out against zombie waves that double in size every round. Plays with touch, mouse or keyboard.";
  overviewTitle = "Survive the Zombie Apocalypse in Zombie Horde Survival!";
  overview = [
    "Excited to unveil our latest project, Zombie Horde Survival—a top-down casual game designed for thrill-seekers and zombie slayers alike. Prepare to fend off relentless waves of the undead in an action-packed survival experience.",
    "Check out this gameplay snippet and get ready to test your survival skills!",
  ];
  featuresTitle = "Gameplay Features";
  mechanics = [
    { name: "Endless Waves of Zombies", text: "Face off against growing hordes of zombies that increase in number and difficulty with each wave. The longer you survive, the more intense it gets!" },
    { name: "Top-Down Perspective", text: "Strategize your movements and attacks with a clear view of the battlefield, navigating through diverse environments." },
    { name: "Responsive Controls", text: "Whether you're using touch, mouse, or keyboard, our intuitive controls ensure a smooth and engaging experience for all players." },
    { name: "Dynamic Spawning", text: "After each wave, brace yourself for double the zombies! The challenge escalates quickly—how long can you hold out?" },
    { name: "Casual Gameplay", text: "Easy to pick up, but hard to put down! Perfect for casual gamers looking for a quick adrenaline rush or hardcore players seeking a challenge." },
  ];
}
ProjectShowcase.register(new ZombieHordeSurvival());
