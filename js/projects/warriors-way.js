/**
 * Warrior's Way — one project, two versions.
 * V1: sword, shield and parry. V2: Leviathan-style axe and the Gameplay Ability System.
 * Both versions show gore, so the content warning is set once for the whole project.
 */
class WarriorsWay extends ProjectShowcase {
  slug = "warriors-way";
  order = 8;
  title = "Warrior's Way";
  engine = "Unreal Engine";
  genre = "Melee action";
  status = "WIP";
  team = "Solo developer";
  contentWarning = "This clip shows blood and gore from the combat system.";
  blurb = "Medieval melee combat that grew from sword, shield and parry in V1 to a Leviathan-style axe and unlockable abilities in V2.";

  versions = [
    {
      label: "V1",
      subtitle: "Medieval melee action",
      note: "V1 is the original sword-and-shield version with block and parry.",
      overviewTitle: "Introducing Warrior's Way: A Brutal Test of Skill and Strategy!",
      overview: [
        "I'm excited to share my latest project, Warrior's Way (v1), a medieval-inspired action game that I’ve been passionately developing as a solo creator. This game is a culmination of my dedication to creating an intense and immersive combat experience that challenges players at every turn. While this is just the beginning, the idea is very much a work in progress (WIP), and I’m eager to see how it evolves.",
        "Warrior's Way is more than just a game; it’s a brutal test of skill, strategy, and the will to conquer. As a solo developer, I’ve poured my heart and soul into this v1 project, and I can’t wait to see where it leads. The journey is just beginning, and I’m excited to share this work in progress with you all.",
      ],
      featuresTitle: "Features",
      mechanics: [
        { name: "Medieval Combat Mastery", text: "Take control of a skilled warrior wielding a sword, shield, and dual-edged blade. Whether you’re launching aggressive assaults or holding the line with your shield, every move counts." },
        { name: "Advanced AI Opponents", text: "Face off against strong enemies offering dynamic and challenging encounters that keep you on your toes." },
        { name: "Blocking and Parry System", text: "Perfect the art of blocking and parrying in a system that rewards timing and precision. Turn defense into offense and seize every opportunity to strike back." },
        { name: "Brutal Gore and Realism", text: "Experience the visceral reality of medieval warfare with a brutal gore system that brings the gritty, bloody battles to life." },
        { name: "Dynamic Combat Flow", text: "Master the balance between offense and defense to create a seamless flow of combat that is both challenging and satisfying." },
      ],
    },
    {
      label: "V2",
      subtitle: "Medieval melee action + GAS",
      note: "V2 swaps the sword for a Leviathan-style axe and adds the Gameplay Ability System.",
      overviewTitle: "Warrior’s Way v2: A Brutal Evolution in Medieval Combat!",
      overview: [
        "I’m excited to share the progress on my project, Warrior’s Way v2, where traditional medieval combat meets modern gameplay innovation. Building on the foundations of v1, this new version takes the visceral, close-quarters battles to the next level.",
        "Warrior’s Way v2 is a testament to the evolution of my game development journey, combining the raw intensity of medieval combat with modern gameplay mechanics. This project is still a work-in-progress, and I’m excited to continue refining and expanding on these ideas.",
      ],
      featuresTitle: "Features",
      mechanics: [
        { name: "Leviathan Axe Mechanics", text: "In v2, the sword has been replaced with a mighty axe, inspired by the Leviathan Axe mechanics from other iconic games. This weapon brings new weight and impact to every strike, allowing for devastating, sweeping attacks that can cleave through multiple enemies." },
        { name: "Expanded Combat Arsenal", text: "In addition to the axe, the combat system now includes dual-blade weaponry and hand-to-hand combat, giving players a versatile toolkit to dominate the battlefield." },
        { name: "Enhanced Gore Effects", text: "v2 features even more detailed and realistic gore, amplifying the brutal and immersive nature of combat." },
        { name: "Character Modeling and New Animations", text: "A fully developed character model and fresh animations have been integrated into the combat system, providing a fluid and responsive gameplay experience." },
        { name: "Gameplay Ability System Integration", text: "Leveraging Unreal Engine’s powerful Gameplay Ability System, v2 allows for dynamic and customizable combat, with unlockable abilities that let you tailor your warrior’s fighting style to your preferences." },
      ],
      info: [["Systems", "Gameplay Ability System"]],
    },
  ];
}
ProjectShowcase.register(new WarriorsWay());
