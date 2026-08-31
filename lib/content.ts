/**
 * Single source of truth for site copy.
 *
 * FACT DISCIPLINE: anything presented as a statement about the team must come
 * from ubcrover.github.io or the recruitment flyer. Where real content is not
 * yet available it is marked `PLACEHOLDER` in the value itself, so it is
 * obvious on the rendered page that it still needs the team's input. Do not
 * quietly replace a placeholder with a plausible-sounding invention.
 */

export const SITE = {
  name: "UBC Rover",
  domain: "www.ubcrover.com",
  url: "https://www.ubcrover.com",
  tagline: "Design. Build. Compete.",
  slogan: ["Design", "Build", "Compete"],
  blurb:
    "UBC Rover designs and builds advanced semi-autonomous rovers for international competition.",
  email: "rover.ubc@gmail.com",
  address: "LMRS 160, 2259 Lower Mall, Vancouver, BC, Canada V6T 1Z4",
  addressLines: ["LMRS 160", "2259 Lower Mall", "Vancouver, BC, Canada V6T 1Z4"],
  memberCount: 64,
  subteamCount: 7,
} as const;

/* -------------------------------------------------------------------------- */
/* Applications                                                                */
/* -------------------------------------------------------------------------- */

/**
 * The top banner and every "Apply" button point here.
 *
 * TODO(team): replace `formUrl` with the real application form when the Fall
 * cycle opens. While it is null every Apply control routes to /join, which
 * carries the current status — that is deliberate, so nothing ever links to a
 * dead or wrong form.
 */
export const APPLY = {
  formUrl: null as string | null,
  fallbackHref: "/join",
  bannerText: "Applications open every Fall",
  /** Shown on in-page buttons, where "Apply" reads better than the nav label. */
  buttonCta: "Apply Now",
  cta: "Join Us",
} as const;

export const applyHref = (): string => APPLY.formUrl ?? APPLY.fallbackHref;

/**
 * The overall joining package — the equivalent of UBC Formula Electric's
 * "Hiring Package" button at the top of their Join Us page.
 *
 * TODO(team): set `url` to the package (PDF, Drive link or Notion page) when it
 * exists. While it is null the button renders as a visibly disabled placeholder
 * rather than a link to nowhere.
 */
export const JOINING_PACKAGE = {
  url: null as string | null,
  label: "Joining Package",
  pending: "Joining Package — coming soon",
} as const;

/* -------------------------------------------------------------------------- */
/* Home page — "Who we are" figures                                            */
/* -------------------------------------------------------------------------- */

/**
 * TODO(team): `780m` and the screw count need confirming against a real source
 * before this ships — the rest are established figures. The screw count is a
 * deliberate placeholder until someone actually counts them.
 */
export const STATS = [
  { value: "18", label: "Years active" },
  { value: "64", label: "Students on the team" },
  { value: "780m", label: "Effective operational radius" },
  { value: "02", label: "International competitions" },
  { value: "PLACEHOLDER", label: "Screws in the rover" },
] as const;

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
  /** Column span at lg. Four narrow tiles give two clean rows of two. */
  span: "wide" | "narrow";
};

export const SECTIONS: SectionTile[] = [
  {
    index: "01",
    title: "Sub-teams",
    href: "/subteams",
    eyebrow: "How we're organised",
    blurb:
      "Seven sub-teams across mechanical, electrical, software, science and business. Each owns part of the rover \u2014 drivetrain, arm, end effector, comms, control base and the onboard lab.",
    image: "/media/team/software.jpg",
    span: "narrow",
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
    title: "Our Team",
    href: "/team",
    eyebrow: "Who builds it",
    blurb:
      "64 students across engineering, science, and business. Meet the leads and the sub-teams they run.",
    image: "/media/team/arm.jpg",
    span: "narrow",
  },
  {
    index: "04",
    title: "Sponsors",
    href: "/sponsors",
    eyebrow: "Who makes it possible",
    blurb:
      "External support is the engine behind our innovation. Put your brand on the chassis.",
    image: "/media/team/electrical.jpg",
    span: "narrow",
  },
];

/* -------------------------------------------------------------------------- */
/* THE ROVER — subsystems                                                      */
/* -------------------------------------------------------------------------- */

/**
 * Modelled on NASA's Perseverance "Rover Components" page: an anchor list at
 * the top, then one section per subsystem with body copy, a labelled image and
 * a Tech Specs table.
 *
 * TODO(team): every `specs` value and every `detail` paragraph below is a
 * PLACEHOLDER. These need the real numbers from the current rover — motor
 * counts, reduction ratios, payload, reach, bus voltages, radio band and link
 * budget, and so on. The layout is final; the data is not.
 */
export type Subsystem = {
  slug: string;
  name: string;
  /** One-line "main job", the way NASA leads each component. */
  role: string;
  summary: string;
  detail: string[];
  image: string;
  imageCaption: string;
  specs: { label: string; value: string }[];
  /** Which sub-team owns this subsystem. */
  ownedBy: string;
};

export const SUBSYSTEMS: Subsystem[] = [
  {
    slug: "chassis",
    name: "Chassis",
    role: "Carries every other subsystem and keeps it alive over the terrain.",
    summary:
      "The structural backbone. Everything else on the rover mounts to it, so its geometry sets the packaging constraints for the whole vehicle.",
    detail: [
      "PLACEHOLDER — describe the frame architecture: material and stock used, how the warm/protected electronics volume is enclosed, and how the deck is laid out for subsystem mounting.",
      "PLACEHOLDER — describe the weather and dust sealing approach, and what the chassis has to tolerate at URC and CIRC.",
    ],
    image: "/media/team/chassis.jpg",
    imageCaption: "PLACEHOLDER — chassis callout diagram.",
    specs: [
      { label: "Main job", value: "Structural platform for all subsystems" },
      { label: "Material", value: "PLACEHOLDER" },
      { label: "Dimensions", value: "PLACEHOLDER (L × W × H)" },
      { label: "Mass", value: "PLACEHOLDER" },
      { label: "Sealing", value: "PLACEHOLDER" },
    ],
    ownedBy: "chassis",
  },
  {
    slug: "drivetrain",
    name: "Drivetrain",
    role: "Turns power into motion across loose, broken and steep ground.",
    summary:
      "Wheels, suspension, steering and the motors that drive them. This is what decides whether the rover finishes a traverse or gets stuck halfway.",
    detail: [
      "PLACEHOLDER — describe the suspension architecture (rocker-bogie or otherwise), how load is distributed, and the maximum tilt and obstacle height the design targets.",
      "PLACEHOLDER — describe the steering scheme, wheel construction and tread design, and the drive motor and gearbox selection.",
    ],
    image: "/media/rover-mog.jpg",
    imageCaption: "PLACEHOLDER — drivetrain and suspension callout diagram.",
    specs: [
      { label: "Main job", value: "Mobility over Mars-analogue terrain" },
      { label: "Configuration", value: "PLACEHOLDER (wheel count, steering type)" },
      { label: "Suspension", value: "PLACEHOLDER" },
      { label: "Wheel diameter", value: "PLACEHOLDER" },
      { label: "Drive motors", value: "PLACEHOLDER" },
      { label: "Top speed", value: "PLACEHOLDER" },
      { label: "Max grade", value: "PLACEHOLDER" },
    ],
    ownedBy: "chassis",
  },
  {
    slug: "arm",
    name: "Robotic Arm",
    role: "Reaches, positions and applies force away from the rover body.",
    summary:
      "A multi-axis arm with high payload capacity, long reach, and fast end-effector swapping — the subsystem that does the servicing and equipment tasks at competition.",
    detail: [
      "PLACEHOLDER — describe the joint layout and degrees of freedom, the actuator and reduction choices at each joint, and how the arm is controlled from the base station.",
      "PLACEHOLDER — describe the reach envelope and payload at full extension, and how the arm is stowed for driving.",
    ],
    image: "/media/team/arm.jpg",
    imageCaption: "PLACEHOLDER — arm joint callout diagram.",
    specs: [
      { label: "Main job", value: "Manipulation, servicing and equipment tasks" },
      { label: "Degrees of freedom", value: "PLACEHOLDER" },
      { label: "Reach", value: "PLACEHOLDER" },
      { label: "Payload at full extension", value: "PLACEHOLDER" },
      { label: "Actuation", value: "PLACEHOLDER" },
    ],
    ownedBy: "arm",
  },
  {
    slug: "end-effector",
    name: "End Effector",
    role: "The tool at the tip of the arm — swapped to suit the task.",
    summary:
      "Interchangeable tooling on a quick-change interface, so one arm can cover gripping, actuation and sample tasks without a redesign between them.",
    detail: [
      "PLACEHOLDER — describe the quick-change interface: mechanical coupling, how power and signal cross the joint, and how long a swap takes in the field.",
      "PLACEHOLDER — list the tools in the current set and what competition task each one exists for.",
    ],
    image: "/media/team/arm.jpg",
    imageCaption: "PLACEHOLDER — end effector and tool set.",
    specs: [
      { label: "Main job", value: "Task-specific manipulation at the arm tip" },
      { label: "Interface", value: "PLACEHOLDER (quick-change type)" },
      { label: "Tool set", value: "PLACEHOLDER" },
      { label: "Grip force", value: "PLACEHOLDER" },
      { label: "Swap time", value: "PLACEHOLDER" },
    ],
    ownedBy: "arm",
  },
  {
    slug: "rover-lab",
    name: "Rover Lab",
    role: "Collects samples and runs the science onboard.",
    summary:
      "Automated onboard lab systems that collect soil samples, run chemical analyses, and search for signs of life — bringing autonomous science capability to a mobile platform.",
    detail: [
      "PLACEHOLDER — describe the sample acquisition path: how material is collected, transported, and staged for analysis.",
      "PLACEHOLDER — describe the assays and instruments carried, including the microfluidic lab-on-a-chip work and how results are reported to the base station.",
    ],
    image: "/media/team/rover-lab.png",
    imageCaption: "PLACEHOLDER — rover lab internal layout.",
    specs: [
      { label: "Main job", value: "Onboard sample handling and life detection" },
      { label: "Sample intake", value: "PLACEHOLDER" },
      { label: "Assays", value: "PLACEHOLDER" },
      { label: "Instruments", value: "PLACEHOLDER" },
      { label: "Sample capacity", value: "PLACEHOLDER" },
    ],
    ownedBy: "rover-lab",
  },
  {
    slug: "power",
    name: "Power & Electronics",
    role: "Generates, distributes and protects the rover's electrical supply.",
    summary:
      "Battery, power distribution, motor control, lighting and the emergency stop chain — designed safety-first, because an uncommanded motor at competition is a disqualification at best.",
    detail: [
      "PLACEHOLDER — describe the battery chemistry and pack configuration, the distribution topology, and the protection scheme.",
      "PLACEHOLDER — describe the emergency stop architecture and how it satisfies the URC and CIRC safety rules.",
    ],
    image: "/media/team/electrical.jpg",
    imageCaption: "PLACEHOLDER — power distribution board.",
    specs: [
      { label: "Main job", value: "Power generation, distribution and protection" },
      { label: "Battery", value: "PLACEHOLDER (chemistry, capacity)" },
      { label: "Bus voltage", value: "PLACEHOLDER" },
      { label: "Runtime", value: "PLACEHOLDER" },
      { label: "E-stop", value: "PLACEHOLDER" },
    ],
    ownedBy: "electrical",
  },
  {
    slug: "comms",
    name: "Communications",
    role: "Carries commands out to the rover and telemetry back.",
    summary:
      "The radio link between the rover and the control base. Range and reliability set how far the rover can be driven out of line of sight.",
    detail: [
      "PLACEHOLDER — describe the radio hardware, frequency band and antenna configuration on both ends of the link.",
      "PLACEHOLDER — describe the link budget, achieved range at competition, and the behaviour on link loss.",
    ],
    image: "/media/team/electrical.jpg",
    imageCaption: "PLACEHOLDER — antenna and radio callout.",
    specs: [
      { label: "Main job", value: "Command uplink and telemetry downlink" },
      { label: "Band", value: "PLACEHOLDER" },
      { label: "Antennas", value: "PLACEHOLDER" },
      { label: "Range", value: "PLACEHOLDER" },
      { label: "Link loss behaviour", value: "PLACEHOLDER" },
    ],
    ownedBy: "electrical",
  },
  {
    slug: "control-base",
    name: "Control Base",
    role: "Where the operators sit and how they see what the rover sees.",
    summary:
      "The ground station: operator console, camera feeds, telemetry display and the software that runs and monitors the vehicle — including the Unity simulation used for testing and operator training.",
    detail: [
      "PLACEHOLDER — describe the base station hardware, the operator interface, and what the crew sees during a run.",
      "PLACEHOLDER — describe the control and autonomy stack, the safety alerting, and how the Unity simulation is used to train operators before competition.",
    ],
    image: "/media/team/software.jpg",
    imageCaption: "PLACEHOLDER — control base during a run.",
    specs: [
      { label: "Main job", value: "Operator control, telemetry and autonomy" },
      { label: "Console", value: "PLACEHOLDER" },
      { label: "Camera feeds", value: "PLACEHOLDER" },
      { label: "Autonomy", value: "PLACEHOLDER" },
      { label: "Simulation", value: "Unity — used for testing and operator training" },
    ],
    ownedBy: "software",
  },
];

/**
 * CAD viewer placeholder.
 *
 * TODO(team): drop a web-friendly export (GLB/GLTF preferred, or STEP for
 * download) into public/media/cad/ and set `modelUrl`. While it is null the
 * page renders a labelled placeholder frame instead of a broken viewer.
 */
export const CAD = {
  modelUrl: null as string | null,
  downloadUrl: null as string | null,
  note: "PLACEHOLDER — interactive CAD model of the current rover.",
} as const;

/* -------------------------------------------------------------------------- */
/* Sub-teams                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Group photo used behind every team banner on /team.
 *
 * TODO(team): this one shot stands in for all of them. When each sub-team has
 * its own group photo, drop it in public/media/team/ and set `photo` on that
 * sub-team in SUBTEAMS below — the banner picks it up automatically.
 */
export const TEAM_PHOTO = "/media/team/team-photo.jpg";

/** Intro line on /team, between the masthead and the Captains band. */
export const TEAM_INTRO =
  "Get to know the brilliant minds driving innovation at UBC Rover. Each member brings unique expertise to our cutting-edge projects.";

export type Project = {
  index: string;
  title: string;
  eyebrow: string;
  blurb: string;
  image: string;
};

export type OpenRole = {
  title: string;
  /** What you would actually be doing — NOT what the sub-team does. */
  doing: string;
  skills: string[];
};

export type Subteam = {
  slug: string;
  name: string;
  discipline: string;
  /** Group photo for this sub-team's banner. Falls back to TEAM_PHOTO. */
  photo?: string;
  /** TODO(team): sub-team leads to rewrite. Carried over from the old site. */
  blurb: string;
  image: string;
  capabilities: string[];
  /** Rendered as Explore-style tiles on the sub-team's own page. */
  projects: Project[];
  /** Rendered on /join. Strictly roles and responsibilities. */
  openRoles: OpenRole[];
};

const placeholderProjects = (name: string, image: string): Project[] => [
  {
    index: "01",
    title: "Project One",
    eyebrow: "PLACEHOLDER",
    blurb: `PLACEHOLDER — a project the ${name} sub-team delivered. Replace with a real one: what was built, what problem it solved, and what came out of it at competition.`,
    image,
  },
  {
    index: "02",
    title: "Project Two",
    eyebrow: "PLACEHOLDER",
    blurb: `PLACEHOLDER — a second ${name} project. Two to four of these per sub-team reads best in this grid.`,
    image,
  },
  {
    index: "03",
    title: "Project Three",
    eyebrow: "PLACEHOLDER",
    blurb: `PLACEHOLDER — a third ${name} project.`,
    image,
  },
];

const placeholderRoles = (name: string): OpenRole[] => [
  {
    title: "PLACEHOLDER — Role One",
    doing: `PLACEHOLDER — what a new member on ${name} would actually be handed in their first term. Describe the work, not the sub-team.`,
    skills: ["PLACEHOLDER", "PLACEHOLDER"],
  },
  {
    title: "PLACEHOLDER — Role Two",
    doing: "PLACEHOLDER — a second role, with the concrete deliverable attached to it.",
    skills: ["PLACEHOLDER", "PLACEHOLDER"],
  },
];

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
    projects: placeholderProjects("Chassis", "/media/team/chassis.jpg"),
    openRoles: placeholderRoles("Chassis"),
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
    projects: placeholderProjects("Arm", "/media/team/arm.jpg"),
    openRoles: placeholderRoles("Arm"),
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
    projects: placeholderProjects("Rover Lab", "/media/team/rover-lab.png"),
    openRoles: placeholderRoles("Rover Lab"),
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
    projects: placeholderProjects("Electrical", "/media/team/electrical.jpg"),
    openRoles: placeholderRoles("Electrical"),
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
    projects: placeholderProjects("Software", "/media/team/software.jpg"),
    openRoles: placeholderRoles("Software"),
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
    projects: placeholderProjects("Science", "/media/team/science.png"),
    openRoles: placeholderRoles("Science"),
  },
  {
    slug: "business",
    name: "Business",
    discipline: "Operations",
    blurb:
      "We keep the team running and growing by managing finances, sponsorships, and outreach, while promoting our work through marketing, events, and community engagement.",
    image: "/media/team/business.jpeg",
    capabilities: ["Finance", "Sponsorship", "Outreach & events", "Marketing"],
    projects: placeholderProjects("Business", "/media/team/business.jpeg"),
    openRoles: placeholderRoles("Business"),
  },
];

export const getSubteam = (slug: string) => SUBTEAMS.find((t) => t.slug === slug);

/**
 * The leads for a given sub-team, derived from LEADS[].role (e.g. "Chassis
 * Lead"). Derived rather than duplicated so a role change in one place cannot
 * leave the two lists disagreeing. Business currently has no lead listed on the
 * source site, so it correctly returns an empty array.
 */
/**
 * The rover subsystems a given sub-team owns. These render inside the sub-team's
 * own "What we do" section — there is no separate rover page for them to live
 * on. Science and Business own no hardware subsystem and correctly return [].
 */
export const subsystemsForSubteam = (slug: string) =>
  SUBSYSTEMS.filter((sub) => sub.ownedBy === slug);

/** Co-captains — the "Our Captains" band on /team. */
export const CAPTAINS = () => LEADS.filter((l) => /captain/i.test(l.role));

/** Everyone else with a lead title — the "Our Leads" band on /team. */
export const SUBTEAM_LEADS = () => LEADS.filter((l) => !/captain/i.test(l.role));

export const leadsForSubteam = (slug: string) => {
  const team = getSubteam(slug);
  if (!team) return [];
  const name = team.name.toLowerCase();
  return LEADS.filter((l) => l.role.toLowerCase().replace(/ lead$/, "") === name);
};

/* -------------------------------------------------------------------------- */
/* Leadership                                                                  */
/* -------------------------------------------------------------------------- */

export type LeadLink = { kind: "github" | "linkedin" | "website"; href: string };

/**
 * `focal` is the CSS object-position for the portrait crop — these are candid
 * photos, so heads sit at different heights in frame.
 *
 * TODO(team): `links` is empty for everyone. Each lead opts in individually by
 * adding their own entries; nothing is published without them adding it.
 * TODO(team): role titles (taskmaster, systems lead, …) still to be decided.
 */
export type Lead = {
  name: string;
  role: string;
  image: string;
  focal?: string;
  links?: LeadLink[];
};

export const LEADS: Lead[] = [
  {
    name: "Conor O'Neill",
    role: "Co-Captain",
    image: "/media/people/conor.jpg",
    links: [],
  },
  { name: "Myra Wei", role: "Co-Captain", image: "/media/people/myra.jpg", links: [] },
  {
    name: "Andres Fleet",
    role: "Chassis Lead",
    image: "/media/people/andres.jpg",
    links: [],
  },
  { name: "Eric Kondor", role: "Arm Lead", image: "/media/people/eric.jpg", links: [] },
  {
    name: "Lochy Rode",
    role: "Electrical Lead",
    image: "/media/people/lochy.JPG",
    links: [],
  },
  {
    name: "Danyaal Abbas",
    role: "Science Lead",
    image: "/media/people/danyaal.jpg",
    links: [],
  },
  {
    name: "Michael Day",
    role: "Rover Lab Lead",
    image: "/media/people/mike.jpg",
    links: [],
  },
  {
    name: "Rowan Zawadzki",
    role: "Software Lead",
    image: "/media/people/rowan.jpg",
    links: [],
  },
  {
    name: "Riddhima Gupta",
    role: "Software Lead",
    image: "/media/people/riddhima.jpg",
    links: [],
  },
  {
    name: "Cameron Basara",
    role: "Software Lead",
    image: "/media/people/cameron.jpg",
    links: [],
  },
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
  url: string;
  host: string;
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
    url: "https://urc.marssociety.org/",
    host: "The Mars Society",
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
    url: "https://circ.cstag.ca/",
    host: "CSTAG",
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
      { src: "/media/sponsors/protospace.png", name: "Protospace" },
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

/**
 * What sponsorship actually bought.
 *
 * TODO(team): these are PLACEHOLDERS. Replace each with the real story —
 * "thank you Thermo Fisher for the reagents, which let us run X assays at
 * CIRC" — one entry per sponsor you want to call out. Delete any you cannot
 * substantiate rather than leaving the placeholder text live.
 */
export type SponsorImpact = {
  sponsor: string;
  logo: string;
  contribution: string;
  outcome: string;
};

export const SPONSOR_IMPACT: SponsorImpact[] = [
  {
    sponsor: "Thermo Fisher Scientific",
    logo: "/media/sponsors/Thermo_Fisher_Scientific_Logo.png",
    contribution: "PLACEHOLDER — what they provided (e.g. reagents, consumables).",
    outcome:
      "PLACEHOLDER — what that made possible: which assays ran, on which subsystem, at which competition, and what the result was.",
  },
  {
    sponsor: "maxon",
    logo: "/media/sponsors/maxon.png",
    contribution: "PLACEHOLDER — what they provided (e.g. motors, gearheads).",
    outcome: "PLACEHOLDER — which subsystem it went into and what it enabled.",
  },
  {
    sponsor: "Protospace",
    logo: "/media/sponsors/protospace.png",
    contribution: "PLACEHOLDER — what they provided (e.g. fabricated enclosures).",
    outcome: "PLACEHOLDER — what that made possible on the rover.",
  },
];

/* -------------------------------------------------------------------------- */
/* Social channels — exactly the three linked from the source site.            */
/* -------------------------------------------------------------------------- */

export const SOCIALS = [
  {
    label: "Instagram",
    handle: "@ubcrover",
    href: "https://www.instagram.com/ubcrover/",
  },
  { label: "Facebook", handle: "UBCR0ver", href: "https://www.facebook.com/UBCR0ver/" },
  {
    label: "All links",
    handle: "linktr.ee/ubcrover",
    href: "https://linktr.ee/ubcrover",
  },
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
  { label: "Sub-Teams", href: "/subteams" },
  { label: "Competition", href: "/compete" },
  { label: "Our Team", href: "/team" },
  { label: "Contact", href: "/contact" },
] as const;

/**
 * The two calls to action, emphasised at the end of the nav. Kept separate from
 * NAV so the ordering and the bold treatment cannot drift apart.
 */
export const NAV_EMPHASIS = [
  { label: "Sponsors", href: "/sponsors" },
  { label: "Join Us", href: "/join" },
] as const;

/** Every nav destination in order — used by the footer and the mobile panel. */
export const ALL_NAV = [...NAV, ...NAV_EMPHASIS] as const;
