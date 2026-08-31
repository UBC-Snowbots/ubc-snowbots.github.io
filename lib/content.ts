/**
 * Single source of truth for site copy.
 *
 * Every factual claim here (member counts, names, roles, sub-team charters,
 * competitions, sponsor tiers, contact details) was carried over from the
 * existing ubcrover.github.io site. Nothing is invented. Update this file and
 * every page follows.
 */

export const SITE = {
  name: "UBC Rover",
  domain: "www.ubcrover.com",
  url: "https://www.ubcrover.com",
  tagline: "Engineering the future of autonomy.",
  triad: ["Design.", "Code.", "Compete."],
  blurb:
    "UBC Rover designs and builds advanced semi-autonomous rovers for international competition.",
  email: "rover.ubc@gmail.com",
  address: "2345 East Mall, Vancouver, BC, Canada, V6T 1Z4",
  memberCount: 64,
  subteamCount: 7,
} as const;

/* -------------------------------------------------------------------------- */
/* Home page section tiles — the "click and enter" grid                        */
/* -------------------------------------------------------------------------- */

export type SectionTile = {
  index: string;
  title: string;
  href: string;
  eyebrow: string;
  blurb: string;
  image: string;
  /** Tailwind column span at lg. Creates the Anduril-style uneven mosaic. */
  span: "wide" | "narrow";
};

export const SECTIONS: SectionTile[] = [
  {
    index: "01",
    title: "The Rover",
    href: "/rover",
    eyebrow: "The machine",
    blurb:
      "Seven sub-teams, one vehicle. Chassis to end-effector, power rail to perception stack — how the rover is actually put together.",
    image: "/media/rover-mog.jpg",
    span: "wide",
  },
  {
    index: "02",
    title: "Competition",
    href: "/compete",
    eyebrow: "Where we prove it",
    blurb:
      "The University Rover Challenge in the Utah desert, and the Canadian International Rover Challenge in the Alberta badlands.",
    image: "/media/team/chassis.jpg",
    span: "narrow",
  },
  {
    index: "03",
    title: "The Team",
    href: "/team",
    eyebrow: "Who builds it",
    blurb:
      "64 students across engineering, science, and business. Meet the leads and the sub-teams they run.",
    image: "/media/team/software.jpg",
    span: "narrow",
  },
  {
    index: "04",
    title: "Join Us",
    href: "/join",
    eyebrow: "Get on the team",
    blurb:
      "Hands-on experience in robotics, software and mechanical design. Recruitment opens every Fall.",
    image: "/media/team/electrical.jpg",
    span: "narrow",
  },
  {
    index: "05",
    title: "Sponsors",
    href: "/sponsors",
    eyebrow: "Who makes it possible",
    blurb:
      "External support is the engine behind our innovation. Put your brand on the chassis.",
    image: "/media/team/arm.jpg",
    // Narrow, so the five tiles resolve as 1 wide + 2 full rows of 2. Making
    // this one wide leaves tile 04 stranded beside an empty cell at lg.
    span: "narrow",
  },
];

/* -------------------------------------------------------------------------- */
/* Sub-teams                                                                   */
/* -------------------------------------------------------------------------- */

export type Subteam = {
  slug: string;
  name: string;
  discipline: string;
  blurb: string;
  image: string;
  capabilities: string[];
};

export const SUBTEAMS: Subteam[] = [
  {
    slug: "chassis",
    name: "Chassis",
    discipline: "Mechanical",
    blurb:
      "We shape the rover's mechanical backbone, creating a strong, lightweight platform for Mars-like terrains while integrating all subteams, and advancing mobility innovations, such as steerable wheels and waterproofing.",
    image: "/media/team/chassis.jpg",
    capabilities: [
      "Suspension & drivetrain",
      "Steerable wheels",
      "Waterproofing",
      "Systems integration",
    ],
  },
  {
    slug: "arm",
    name: "Arm",
    discipline: "Mechanical",
    blurb:
      "We develop a multi-axis robotic arm capable of high payload capacity, long reach, and fast end-effector swapping.",
    image: "/media/team/arm.jpg",
    capabilities: [
      "Multi-axis kinematics",
      "High payload capacity",
      "Swappable end-effectors",
      "Long reach",
    ],
  },
  {
    slug: "rover-lab",
    name: "Rover Lab",
    discipline: "Mechatronics",
    blurb:
      "We create and assemble automated onboard lab systems that collect soil samples, run chemical analyses, and search for signs of life — bringing fully autonomous science capabilities to a mobile rover.",
    image: "/media/team/rover-lab.png",
    capabilities: [
      "Soil sample collection",
      "Onboard chemical analysis",
      "Life detection",
      "Autonomous lab systems",
    ],
  },
  {
    slug: "electrical",
    name: "Electrical",
    discipline: "Electrical",
    blurb:
      "We power the rover's performance by designing reliable, safety-focused electronics — from motor control and power distribution to lighting and emergency systems — while building competition-ready PCBs for both the rover lab and Mini Rover.",
    image: "/media/team/electrical.jpg",
    capabilities: [
      "Motor control",
      "Power distribution",
      "Emergency stop systems",
      "Competition-ready PCBs",
    ],
  },
  {
    slug: "software",
    name: "Software",
    discipline: "Software",
    blurb:
      "We build the software that runs and monitors the rover, focusing on reliable control systems, safety alerts, and advancing our Unity simulation used for testing and operator training.",
    image: "/media/team/software.jpg",
    capabilities: [
      "Control systems",
      "Safety & telemetry alerts",
      "Unity simulation",
      "Operator training",
    ],
  },
  {
    slug: "science",
    name: "Science",
    discipline: "Science",
    blurb:
      "We design an autonomous life-detection lab for the rover, combining biochemical assays, custom instruments, microfluidic lab-on-a-chip systems, and computer vision to analyze Martian habitability with minimal samples.",
    image: "/media/team/science.png",
    capabilities: [
      "Biochemical assays",
      "Microfluidic lab-on-a-chip",
      "Computer vision",
      "Habitability analysis",
    ],
  },
  {
    slug: "business",
    name: "Business",
    discipline: "Operations",
    blurb:
      "We keep the team running and growing by managing finances, sponsorships, and outreach, while promoting our work through marketing, events, and community engagement.",
    image: "/media/team/business.jpeg",
    capabilities: ["Finance", "Sponsorship", "Outreach & events", "Marketing"],
  },
];

/* -------------------------------------------------------------------------- */
/* Leadership                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * `focal` is the CSS object-position for the portrait crop. These are candid
 * photos rather than studio headshots, so heads sit at wildly different heights
 * in the frame; without a focal point the 3:4 crop cuts some faces off and
 * leaves others tiny. Default is "50% 30%", which suits most upper-body shots.
 */
export type Lead = { name: string; role: string; image: string; focal?: string };

export const LEADS: Lead[] = [
  { name: "Conor O'Neill", role: "Co-Captain", image: "/media/people/conor.jpg" },
  { name: "Myra Wei", role: "Co-Captain", image: "/media/people/myra.jpg" },
  { name: "Andres Fleet", role: "Chassis Lead", image: "/media/people/andres.jpg" },
  { name: "Eric Kondor", role: "Arm Lead", image: "/media/people/eric.jpg" },
  { name: "Lochy Rode", role: "Electrical Lead", image: "/media/people/lochy.JPG" },
  { name: "Danyaal Abbas", role: "Science Lead", image: "/media/people/danyaal.jpg" },
  { name: "Michael Day", role: "Rover Lab Lead", image: "/media/people/mike.jpg" },
  { name: "Rowan Zawadzki", role: "Software Lead", image: "/media/people/rowan.jpg" },
  { name: "Riddhima Gupta", role: "Software Lead", image: "/media/people/riddhima.jpg" },
  { name: "Cameron Basara", role: "Software Lead", image: "/media/people/cameron.jpg" },
];

/* -------------------------------------------------------------------------- */
/* Competitions                                                                */
/* -------------------------------------------------------------------------- */

export type Competition = {
  abbr: string;
  name: string;
  location: string;
  blurb: string;
  image: string;
  facts: { label: string; value: string }[];
};

export const COMPETITIONS: Competition[] = [
  {
    abbr: "URC",
    name: "University Rover Challenge",
    location: "Mars Desert Research Station — Hanksville, Utah",
    blurb:
      "The world's premier robotics competition, held at the Mars Desert Research Station in Utah. Teams from around the globe push their rovers to the limit in extreme heat and difficult terrain.",
    image: "/media/rover-mog.jpg",
    facts: [
      { label: "Terrain", value: "Mars-analogue desert" },
      { label: "Field", value: "International" },
      { label: "Tests", value: "Science, delivery, servicing, autonomy" },
    ],
  },
  {
    abbr: "CIRC",
    name: "Canadian International Rover Challenge",
    location: "The badlands — Drumheller, Alberta",
    blurb:
      "Held in the badlands of Drumheller, Alberta. We compete in tasks simulating a disaster at an early Martian colony, requiring search and rescue, equipment servicing, and night operations.",
    image: "/media/team/chassis.jpg",
    facts: [
      { label: "Terrain", value: "Alberta badlands" },
      { label: "Scenario", value: "Martian colony disaster" },
      { label: "Tests", value: "Search & rescue, servicing, night ops" },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Sponsors                                                                    */
/* -------------------------------------------------------------------------- */

export type Sponsor = { src: string; name: string };
export type SponsorTier = { tier: string; logos: Sponsor[] };

/**
 * Tier membership is copied EXACTLY from ubcrover.github.io/index.html. Do not
 * reshuffle these — which tier a sponsor sits in is a commitment the team made
 * to that sponsor.
 *
 * There is deliberately no per-tier "benefits" copy here. The source site
 * promises one undifferentiated thing (brand on competition apparel, digital
 * platforms and the rover chassis) and does not tier those benefits, so
 * inventing a ladder would be making contractual claims on the team's behalf.
 */
export const SPONSOR_TIERS: SponsorTier[] = [
  {
    tier: "Partner",
    logos: [
      {
        src: "/media/sponsors/Thermo_Fisher_Scientific_Logo.png",
        name: "Thermo Fisher Scientific",
      },
      { src: "/media/sponsors/Ember_Prototypes_Logo.jpg", name: "Ember Prototypes" },
    ],
  },
  {
    tier: "Champion",
    logos: [
      {
        src: "/media/sponsors/AARC-WEST-Industrial-logo.png",
        name: "AARC-WEST Industrial",
      },
      { src: "/media/sponsors/Northstar-Access.png", name: "Northstar Access" },
      { src: "/media/sponsors/ubcengglogo.png", name: "UBC Engineering" },
      { src: "/media/sponsors/EDENTECH_logo.jpg", name: "EDENTECH" },
    ],
  },
  {
    tier: "Supporters",
    logos: [
      { src: "/media/sponsors/McCrae.png", name: "McCrae" },
      { src: "/media/sponsors/tradecomm.jpg", name: "Tradecomm" },
      { src: "/media/sponsors/ubcmec.png", name: "UBC MEC" },
      { src: "/media/sponsors/petrokleen.jpg", name: "Petrokleen" },
      { src: "/media/sponsors/protocase.png", name: "Protocase" },
    ],
  },
  {
    tier: "Friends",
    logos: [
      { src: "/media/sponsors/gct.jpg", name: "GCT" },
      { src: "/media/sponsors/electromate.jpg", name: "Electromate" },
      { src: "/media/sponsors/maxon.png", name: "maxon" },
      { src: "/media/sponsors/MistyWest.png", name: "MistyWest" },
    ],
  },
];

/** What the team actually offers sponsors, per the source site. Not tiered. */
export const SPONSOR_OFFER =
  "In appreciation of your partnership, we feature your brand on our competition apparel, our digital platforms, and directly on the rover chassis as it tackles the toughest terrains.";

/* -------------------------------------------------------------------------- */
/* Social channels — exactly the three linked from the source site.            */
/* -------------------------------------------------------------------------- */

export const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/ubcrover/" },
  { label: "Facebook", href: "https://www.facebook.com/UBCR0ver/" },
  { label: "All links", href: "https://linktr.ee/ubcrover" },
] as const;

/** The contact form on the source site posts here. Same endpoint, new styling. */
export const FORMSPREE_ENDPOINT = "https://formspree.io/f/mojkoall";

export const INQUIRY_TYPES = [
  "General Inquiry",
  "Sponsorship",
  "Recruitment / Joining",
  "Media & Press",
  "Events & Partnership",
] as const;

/* -------------------------------------------------------------------------- */
/* Navigation                                                                  */
/* -------------------------------------------------------------------------- */

export const NAV = [
  { label: "The Rover", href: "/rover" },
  { label: "Competition", href: "/compete" },
  { label: "Team", href: "/team" },
  { label: "Sponsors", href: "/sponsors" },
  { label: "Contact", href: "/contact" },
] as const;

/** Recruitment state — flip this one flag when the cycle opens. */
export const RECRUITMENT = {
  open: false,
  status: "Closed",
  detail:
    "Our main recruitment cycle runs every Fall (September). Watch our socials for the announcement.",
} as const;
