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
 * `780m` is the Software team's measured network range (see the
 * comms-perception subsystem). All figures here are now confirmed.
 */
/* Typed rather than `as const`: the home page renders a value of "PLACEHOLDER"
   in a smaller placeholder style, and a literal union would make that check
   provably false and fail the build the moment every stat has a real value. */
export const STATS: { value: string; label: string }[] = [
  { value: "18", label: "Years active" },
  { value: "64", label: "Students on the team" },
  { value: "780m", label: "Effective operational radius" },
  { value: "02", label: "International competitions" },
  { value: "120", label: "Screws in the rover" },
];

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
/**
 * One item in a photo slot. `kind: "video"` renders a <video> slide — the
 * Software team supplied an RL demo as MP4, not a still.
 */
export type Photo = { src: string; caption?: string; kind?: "image" | "video" };

export type Subsystem = {
  slug: string;
  name: string;
  /** One-line "main job" — the lead's own one-sentence answer. */
  role: string;
  /** 2–3 sentences describing the subsystem. */
  summary: string;
  /** [design decisions and philosophy, what it has to survive] */
  detail: string[];
  /**
   * A single line the lead explicitly marked "Bolded:" in the content doc.
   * Kept as its own field rather than folded into `summary` so the emphasis
   * they asked for actually survives onto the page.
   */
  callout?: string;
  /**
   * Tech specs as prose. The leads wrote these as paragraphs, not label/value
   * pairs, so the model matches what they actually submitted rather than
   * forcing their sentences into a table they were never written for.
   */
  techSpecs?: string;
  /**
   * Photos for this subsystem. More than one renders a gallery with prev/next
   * controls along the bottom of the frame. Absent until the files arrive, at
   * which point the placeholder frame is replaced with no reflow.
   */
  photos?: Photo[];
  imageCaption?: string;
  /** Human-readable slot id shown in the placeholder, e.g. "CHASSIS-01". */
  photoSlot: string;
  /**
   * Source filenames from the team Drive earmarked for this slot, listed in the
   * placeholder. Recorded so the intended mapping is visible and correctable
   * before the files are converted and dropped in.
   */
  expects?: string[];
  /** Which sub-team owns this subsystem. */
  ownedBy: string;
};

export const SUBSYSTEMS: Subsystem[] = [
  /* ---- Chassis ------------------------------------------------------- */
  {
    slug: "frame",
    name: "Frame",
    role: "Carry the rest of the rover's components safely.",
    summary:
      "The frame is a modular foundation of the chassis. It allows for flexibility in attachment location, and is designed for easy assembly in the field. The frame allows the rover to be a test and competition vehicle.",
    detail: [
      "The design philosophy was to make the frame as flexible as possible. To minimize assembly, the frame was bent to reduce the number of components, and the number of fasteners was minimized. PEM nuts are used for screwing attachments into the frame. Simply put, the frame is an electrical enclosure that is designed for modularity, flexibility, and reliability.",
      "The frame has to survive thousands of cycles of assembly and disassembly, bumps while traversing over rough terrain, and unexpected weather, if need be. The frame allows for the rover to function as a device in a stable, predictable manner.",
    ],
    techSpecs:
      "The frame is manufactured using sheet metal bending using Aluminum 5052-T6 to allow for good bending. The high magnesium content of the alloy allows for high strength and corrosion resistance while still retaining good bending manufacturability. The frame has 400+ attachment points to allow for flexibility.",
    photos: [
      { src: "/media/subsystems/frame.jpg", caption: "The bare frame during assembly." },
    ],
    photoSlot: "CHASSIS-01",
    ownedBy: "chassis",
  },
  {
    slug: "drivetrain",
    name: "Drivetrain",
    role: "Allow traversal over rough terrain while keeping the chassis and components from moving.",
    summary:
      "The rocker-bogie suspension system allows for traversal over uneven terrain while still maintaining the vehicle more or less level. Six wheels follow the tried-and-tested NASA design that has been used for three generations of rover.",
    detail: [
      "The design philosophy of the rocker-bogie suspension system is weight minimization. Topology optimization was performed on the differential and the rocker-bogie legs. The differential links are made of brass and are self-lubricating. The rocker-bogie system has a greater moment of inertia due to the use of struts that increase the second moment of area while minimizing added weight, similar to a plane wing.",
      "Uneven terrain can range up to obstacles 20 cm in height, such as a rock. The suspension system must be able to endure forces that include the weight of the rover, arm, and any added components while handling rough terrain.",
    ],
    techSpecs:
      "The drivetrain has six wheels, is constructed out of Aluminum-6061, and is manufactured mainly using the waterjet.",
    // The two "chassis" shots from Drive live here rather than under Frame:
    // both foreground the six wheels and the rocker-bogie, which is drivetrain,
    // not the frame. Filenames alone would have put them in the wrong slot.
    photos: [
      {
        src: "/media/subsystems/drivetrain-badlands.jpg",
        caption: "Six-wheel rocker-bogie in the Drumheller badlands.",
      },
      {
        src: "/media/subsystems/drivetrain-rear.jpg",
        caption: "Rear three-quarter view.",
      },
    ],
    photoSlot: "CHASSIS-02",
    ownedBy: "chassis",
  },
  {
    slug: "comms-relay",
    name: "Comms Relay",
    role: "Extends the communication range and driving range of the rover.",
    summary:
      "The comms relay allows for the rover to communicate over longer distances or around structures that block the signal from the comms base antenna. The comms relay can deploy from the rover automatically, and allows for the absence of human intervention in extending the rover's range.",
    detail: [
      "The comms relay is designed around deploying the most stable and reliable relay while still ensuring portability. Still in the developmental and testing phases, the comms relay relies on a gear mechanism that prioritizes reliability.",
      "The comms relay has to survive inclement weather, harsh terrain, and unpredictable landing spots.",
    ],
    techSpecs:
      "The comms relay extends the rover's range by 1 km. It is 3D-printed and weighs 5 lbs.",
    photos: [
      {
        src: "/media/subsystems/comms-relay.jpg",
        caption: "Relay components: antenna, battery, single-board computer.",
      },
    ],
    photoSlot: "CHASSIS-03",
    ownedBy: "chassis",
  },

  /* ---- Arm ----------------------------------------------------------- */
  {
    slug: "arm",
    name: "6 DOF Arm",
    role: "Starting from the chassis and ending with a differential, this 6 degree of freedom one meter long arm performs all payload manipulation and movement for the rover.",
    summary:
      "The one meter long arm goes from our moving chassis to our high precision end effector; mounted on a differential. The six degrees of freedom allows us to impact and perform every task as needed.",
    detail: [
      "The primary design focus was precision through survival — specifically within our competitions we have to carry heavy items and deal with vibrations. Our main goals for design are to be both fail-safe and fail-proof. The way to do that, we found is through simplifying our designs and building them for both assembly and debugging.",
      "The desert is dusty and warm and sometimes wet. The arm needs to survive all of that. It also needs to function as protection and mounting for wires, cameras — all in the hot desert sun. But all while surviving we also need to be at high precision at our end effector.",
    ],
    techSpecs:
      "1 meter long, 6 degrees of freedom, 5 kg payload at millimeter precision.",
    photos: [
      {
        src: "/media/subsystems/arm-6dof.jpg",
        caption: "The arm mounted on the rover.",
      },
    ],
    photoSlot: "ARM-01",
    ownedBy: "arm",
  },
  {
    slug: "end-effector",
    name: "End Effector",
    role: "The end effector performs manipulations involving tool use and object manipulation.",
    summary:
      "Past the differential we have our hot swappable end effector system. Attached to that is our end effector. It takes the high precision given from the arm and converts it into usable manipulations. It acts as our interface to the real world.",
    detail: [
      "Part of the main motivation for our design on the end effector ties closely to material analysis. As the end effector is so close to the payload we were able to utilize more additively manufactured plastics thus allowing for tighter iteration cycles for those parts, from this we allowed part complexity to increase to really build out non-traditional solutions and to find new paradigms with respect to how we combine plastic and metal parts on the solution.",
      "We also have a swappable end effector system, which uses a custom spring locking mechanism combined with spring loaded magnetic pogo pin connectors to attach all wiring instruments to the rest of the system.",
      "The end effector has all the same heat / dust / wet requirements as the arm. Really hot day's dust always attacking it, we also need to monitor vibrations as anything from the system gets amplified as it comes all the way up to the end effector. We had to design it with that in mind.",
    ],
    techSpecs:
      "Over 5 kg payload. Tool use — wire cutters, screwdrivers. Hot swappable system.",
    photos: [
      {
        src: "/media/subsystems/arm-end-effector.png",
        caption: "The end effector gripping a payload.",
      },
    ],
    photoSlot: "ARM-02",
    ownedBy: "arm",
  },
  {
    slug: "arm-electrical",
    name: "Electrical and Hardware Integration",
    role: "PCBs, motors and wires, combining the moving parts and the electrical parts and the static parts.",
    summary:
      "The arm contains six PCB boards, 7 high current motors all with high fidelity position encoding and 2 cameras. The arm must be able to move quick, be built fast all while connecting to the rest of the rover with a few wires.",
    detail: [
      "Our motor system uses an arm wide CAN bus. To make termination and wire management simpler we utilize custom printed circuit boards that handle can organization, high power organization, sensor wire management. The fundamental goal with these decisions and other decisions with the subsystem were: how can we design to be fail-safe in both production and debugging while still letting us iterate quickly.",
      "PCBs and electrical circuits (especially high current high voltage ones like what we have) must be protected properly to function in high heat, high dust deserts. Alongside that everything needs to be spec'd perfectly as a failure with respect to any high current system could result in literal flames.",
    ],
    techSpecs:
      "6 PCBs. 7 motors with encoders, some with over 100 amp stall current. 2 cameras. 1 end-effector-mounted microcontroller.",
    photos: [
      {
        src: "/media/subsystems/arm-electrical.png",
        caption: "A custom CAN board mounted on the arm.",
      },
    ],
    photoSlot: "ARM-03",
    ownedBy: "arm",
  },

  /* ---- Software ------------------------------------------------------ */
  {
    slug: "comms-perception",
    name: "Communications & Perception",
    role: "This critical subsystem allows the operator to control and see our rover in real time.",
    summary:
      "Our communications system is a 5 GHz point-to-point network, optimized for range and throughput. Using H.265 compression, we can stream multiple camera feeds at the same time over our network.",
    detail: [
      "Many teams use two omnidirectional antennas, however we use a dish to manually or automatically rotate towards the rover. This allows us to communicate with our rover at large distances with a high throughput.",
      "Our network has an effective range of 780 m with an average latency of under 3 ms. It can also stream up to 5 camera feeds simultaneously.",
    ],
    techSpecs:
      "20-80 MHz bandwidth, 2 omni directional antennas, 5 GHz powerbeam antenna, 5 cameras",
    photos: [
      {
        src: "/media/subsystems/comms-dish.jpg",
        caption: "The dish at competition, tracking the rover downrange.",
      },
    ],
    photoSlot: "SOFTWARE-01",
    ownedBy: "software",
  },
  {
    slug: "autonomy",
    name: "Autonomy",
    role: "Enables the rover to navigate, perceive, and manipulate its environment without direct human control.",
    summary:
      "The Autonomy subsystem gives the rover the ability to independently traverse unknown terrain and perform manipulation tasks with the robotic arm. It combines Visual SLAM (VSLAM) for localization and path planning with computer vision for object and marker detection, allowing the rover to complete GNSS-only navigation, AR tag post-finding, and object-retrieval missions autonomously.",
    detail: [
      "We chose a VSLAM based approach over relying solely on GNSS because GPS accuracy alone isn't sufficient for precise final-approach navigation to posts and objects, especially in terrain with signal degradation. VSLAM lets the rover build a local map in real time and correct its position using visual features. For the arm, our only supported autonomy stack involves RL — which is still in development. Using behavior trees and excluding an observation module, we trained a hierarchical reinforcement learning model to dynamically press keys on a keyboard in simulation. Overall, we prioritized modularity between the navigation stack and the manipulation stack so each can be tested and tuned independently before integration.",
      "The subsystem has to operate over unstructured, uneven outdoor Mars-like terrain without reliable GPS lock at every point along the course, using onboard cameras as the primary sensing source. It must reliably detect AR tags, and small ground objects under variable outdoor lighting. The arm's vision-guided keypress task demands sub-centimeter positioning accuracy despite vibration and imperfect stopping position from the drive system.",
    ],
    techSpecs:
      "98.7% task completion accuracy using RL with domain randomization (excluding observation module).",
    photoSlot: "SOFTWARE-02",
    expects: ["Software RL.mp4 — video"],
    ownedBy: "software",
  },
  {
    slug: "control-base",
    name: "Control Base",
    role: "The control base serves to control the rover and all its subsystems in one place during the competition.",
    summary:
      "This system has two parts. The human-machine interface (HMI) is a high-level layer that provides an intuitive visualization of the rover. Beneath it, the control stack is a low-level layer that translates joystick movements and button presses on the control base into the signals that operate the rover itself.",
    detail: [
      "One important feature on our control base is having cleanly split roles. The HMI serves only as the frontend of the control base and we use many ROS nodes to provide a trustworthy backend for this system. This also allows for a modular codebase which is integral for collaboration across multiple projects and the addition of new features depending on what the other subteams require.",
      "This subsystem operates under highly illuminated spaces. For efficient operator control, our monitors require especially high nits so that even in the brightest conditions, the operator can see everything happening easily. Our existing setup has 3 monitors, however we are considering adding additional monitors to have more room for telemetry and operation panels.",
    ],
    techSpecs: "1000 nit monitors, 2 analog joysticks, 10 buttons.",
    photos: [
      {
        src: "/media/subsystems/control-base.jpg",
        caption: "The control base set up in the field.",
      },
    ],
    photoSlot: "SOFTWARE-03",
    ownedBy: "software",
  },
  {
    slug: "firmware",
    name: "Firmware & Embedded Systems",
    role: "Firmware is the glue connecting our software to our sensors and actuators.",
    summary:
      "While our on-board computers handle more general tasks, our firmware is built for specific applications. It is the final layer of code that will translate a raw voltage into a temperature reading, or a software command into motor movement.",
    detail: [
      "Firmware is a joint team between Electrical and Software.",
      "PLACEHOLDER — operating conditions not yet supplied for this subsystem.",
    ],
    photoSlot: "SOFTWARE-04",
    ownedBy: "software",
  },

  /* ---- Electrical ---------------------------------------------------- */
  {
    slug: "power-distribution",
    name: "Power Distribution",
    role: "Provides electrical power to all the rover's loads.",
    summary:
      "The power distribution system takes the battery's input voltage and regulates it into our desired output voltages. The main loads we drive are the motors, the robotic arm and the science module. These all have specific power needs that our power distribution system is there to support.",
    detail: [
      "Due to the nature of our competitions, we prioritise efficiency when interchanging the many loads our rover hosts. Our system makes this possible with its durable XT30 connectors and fuse holders. This way, we simply need to plug in and fuse the required power lines for a specific task — it is a flexible and intuitive design.",
      "Our power distribution boards are built to withstand 90 A of continuous current. It can supply power on four different voltage rails, totalling 22 individual channels. All of this operates under 1000 W+ loads in high heat conditions to keep the rover's heart beating.",
    ],
    techSpecs:
      "The input voltage for our power distribution boards ranges from 19–21 V. Its output voltages include 5 V, 12 V, 18 V and 24 V rails. Each output has an XT30 connector and a fuse holder for easy access and rotations. These feed all onboard systems including the drivetrain, the robotic arm and end effector, onboard computer, communications and a science testing module.",
    photos: [
      {
        src: "/media/subsystems/power-distribution.jpg",
        caption: "Distribution boards with XT30 connectors.",
      },
      {
        src: "/media/subsystems/power-distribution-bench.jpg",
        caption: "A board on the bench during build.",
      },
    ],
    photoSlot: "ELECTRICAL-01",
    ownedBy: "electrical",
  },
  {
    slug: "lighting",
    name: "Lighting System",
    role: "Allows visibility during night tasks.",
    summary:
      "We use four separate high efficiency LED lights in our system. This allows better peripheral views, leading to a smoother and safer ride.",
    detail: [
      "Competition night tasks require a lighting system that can be controlled remotely from the operations base. We have on/off as well as dimming controls, as some competition tasks have specific no-light zones. Our system allows for this flexibility, thanks to software integration.",
      "The lighting system's water-resistant protection and brightness controls allow us to see in clear skies and rainstorms alike. We not only perform in turbulent weather, but we also perform in style thanks to the colour changing feature that allows our lights to range any HEX value.",
    ],
    techSpecs:
      "Powered by the 18 V rail, the lighting system uses an LED driver to ensure constant current. This improves brightness consistency across all four LEDs. Our design also powers a floodlight mounted on top of the PTZ camera for maximum coverage.",
    photoSlot: "ELECTRICAL-02",
    ownedBy: "electrical",
  },
  {
    slug: "motor-drivers",
    name: "Motor Drivers",
    role: "Powers the drivetrain motors.",
    summary:
      "The motor drivers receive software communications and send commands and power to the motors. They also deal with feedback, allowing the control base to access position, velocity and acceleration data to better understand the unique Mars-like terrains.",
    detail: [
      "As the wheels and top plate of the chassis frequently need to be removed, we decided to use aviator connectors to attach the drivers to the motors. These are durable and easy to use, so assembly can happen in a timely manner — which is extremely important in a competition environment. Wiring therefore plays an important and often overlooked role in the drivetrain system's success.",
      "The motor drivers can provide over 1000 W of power to our drivetrain. This allows masterful maneuvering of rocky terrain, loose gravel and steep cliffs. This is all operating with over 40 kg of weight from the battery, chassis and arm module.",
    ],
    techSpecs:
      "The driver system is composed of Phidget VINT motor drivers at 24 V with a 20 A current rating. Each of the six motors has an isolated driver to improve system resiliency and allow for more complicated maneuvers.",
    photos: [
      { src: "/media/subsystems/motor-drivers.jpg", caption: "Driver board detail." },
    ],
    photoSlot: "ELECTRICAL-03",
    ownedBy: "electrical",
  },

  /* ---- Rover Lab ----------------------------------------------------- */
  {
    slug: "rover-lab",
    name: "Rover Lab",
    role: "PLACEHOLDER — the Rover Lab lead has not filled in the content doc yet.",
    summary: "PLACEHOLDER — awaiting the Rover Lab sub-team's submission.",
    detail: [
      "PLACEHOLDER — design decisions and philosophy.",
      "PLACEHOLDER — what this subsystem has to survive.",
    ],
    photos: [
      { src: "/media/subsystems/rover-lab-above.jpg", caption: "From above." },
      {
        src: "/media/subsystems/rover-lab-front-left.jpg",
        caption: "From the front left.",
      },
      {
        src: "/media/subsystems/rover-lab-rear-left.jpg",
        caption: "From the rear left.",
      },
      { src: "/media/subsystems/rover-lab-behind.jpg", caption: "From behind." },
      {
        src: "/media/subsystems/rover-lab-soil-collection.jpg",
        caption: "Soil collection.",
      },
    ],
    photoSlot: "ROVERLAB-01",
    ownedBy: "rover-lab",
  },

  /* ---- Business ------------------------------------------------------ */
  {
    slug: "sponsor-outreach",
    name: "Sponsor Outreach",
    role: "We secure additional funding for the team.",
    summary:
      "No money means no Rover. We reach out to local and national companies to ask for discounts, free equipment, and in the best case, cold hard cash.",
    detail: [
      "We understand nothing is ever free. Part of the challenge is explaining the benefits of sponsorship to companies. By working closely with our marketing subteam, we offer tailored posts highlighting sponsors and show that we can expand brand outreach.",
    ],
    techSpecs:
      "2025–26 sponsorship value: $12,500, across 14 sponsors. Highest all-time single donation: $9,860. Chassis real-estate: 70% unbranded.",
    photoSlot: "BUSINESS-01",
    ownedBy: "business",
  },
  {
    slug: "social-media",
    name: "Social Media",
    role: "We put UBC Rover on the map.",
    summary:
      "Our job is to capture and tell UBC Rover's story to the world. We follow the team on testing days and milestones to capture the moment in photos and videos. Then, we post on Instagram, LinkedIn, etc. to show major technical milestones, as well as our people and culture.",
    callout:
      "Our most important job is to help create the System Acceptance Review, our make or break submission to qualify for competition.",
    detail: [
      "Having a strong social media presence provides many benefits. Most notably, more incentive for companies to sponsor us, and a larger pool to recruit from. With thoughtful, sustained activity on our platforms, we can gain more influence and present ourselves as a professional, passionate, and real team.",
      "One year Tesla came to recruit from UBC design teams. A recruiter told us: \u201cYou are one of the coolest robotics teams at UBC, why have we never heard of you?\u201d That interaction sparked us to prioritize our social media presence and take our public image more seriously.",
    ],
    photoSlot: "BUSINESS-02",
    ownedBy: "business",
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
  eyebrow?: string;
  blurb: string;
  image?: string;
  /** Human-readable slot id shown in the placeholder, e.g. "CHASSIS-P1". */
  photoSlot: string;
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
  /** R&D projects, rendered as Explore-style tiles on the sub-team page. */
  projects: Project[];
  /** Rendered on /join. Strictly roles and responsibilities. */
  openRoles: OpenRole[];
};

const placeholderProjects = (name: string, slug: string): Project[] => [
  {
    index: "01",
    title: "Project One",
    eyebrow: "PLACEHOLDER",
    blurb: `PLACEHOLDER — an R&D project the ${name} sub-team took on. Replace with a real one: the question it set out to answer, what was tried, and what came of it.`,
    photoSlot: `${slug.toUpperCase()}-P1`,
  },
  {
    index: "02",
    title: "Project Two",
    eyebrow: "PLACEHOLDER",
    blurb: `PLACEHOLDER — a second ${name} R&D project. Two to four per sub-team reads best in this grid.`,
    photoSlot: `${slug.toUpperCase()}-P2`,
  },
  {
    index: "03",
    title: "Project Three",
    eyebrow: "PLACEHOLDER",
    blurb: `PLACEHOLDER — a third ${name} R&D project.`,
    photoSlot: `${slug.toUpperCase()}-P3`,
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
      "The Chassis team does hands-on, in-person assembly while learning and practicing mechanical design. We get our hands dirty, which is exactly why we can explain and stand behind every design decision we make. We are the main driver of integration, pulling the work of every other subteam together into a traversal-ready vehicle. Our job is to carry those components on a foundation that is reliable, debuggable, and clean.",
    image: "/media/team/chassis.jpg",
    capabilities: [
      "Suspension & drivetrain",
      "Steerable wheels",
      "Waterproofing",
      "Systems integration",
    ],
    projects: [
      {
        index: "01",
        title: "Drivetrain design",
        blurb:
          "Motor selection and integration so that all six wheels are securely held and easy to install. Includes R&D into steerable wheels.",
        photoSlot: "CHASSIS-P1",
      },
      {
        index: "02",
        title: "Rebuilt baseplate layout",
        blurb:
          "Apply competition learnings from last year's baseplate to build a better layout: a more accessible and debuggable rover.",
        photoSlot: "CHASSIS-P2",
      },
      {
        index: "03",
        title: "Mini-rover",
        blurb:
          "Build a mini-rover so the software team can test autonomous navigation at a smaller scale that is easier to debug and carry.",
        photoSlot: "CHASSIS-P3",
      },
      {
        index: "04",
        title: "Comms relay",
        blurb:
          "Design and implement a comms relay for reliable long-range communication.",
        photoSlot: "CHASSIS-P4",
      },
    ],
    openRoles: placeholderRoles("Chassis"),
  },
  {
    slug: "arm",
    name: "Arm",
    discipline: "Mechanical",
    blurb:
      "Manipulation of objects is paramount to all future Martian exploration. The arm team makes that possible. We have a 6 + 1 dof robotic arm which represents the penultimate student robotics object at UBC.",
    image: "/media/team/arm.jpg",
    capabilities: [
      "6 DOF manipulation",
      "Hot-swappable tooling",
      "Arm-wide CAN bus",
      "Custom PCBs",
    ],
    projects: [
      {
        index: "01",
        title: "Axis redesign",
        blurb: "Redesign of some axis.",
        photoSlot: "ARM-P1",
      },
      {
        index: "02",
        title: "Assembly and wiring",
        blurb: "Upgrading design for more focus on assembly and wiring.",
        photoSlot: "ARM-P2",
      },
      {
        index: "03",
        title: "Competition post-mortem",
        blurb:
          "Analysis and redesign with respect to problem points from our last competition.",
        photoSlot: "ARM-P3",
      },
    ],
    openRoles: placeholderRoles("Arm"),
  },
  {
    slug: "software",
    name: "Software",
    discipline: "Software",
    blurb:
      "Software makes sure we can control, communicate, automate, and see the rover. We utilize the full potential of our hardware with tuned control loops, thorough testing, and streamlined communication between each subsystem. Our expertise includes blowing up motors, and kindly asking the mechanical teams for unscheduled maintenance.",
    image: "/media/team/software.jpg",
    capabilities: [
      "Control systems",
      "Safety & telemetry alerts",
      "Unity simulation",
      "Operator training",
    ],
    // TODO(team): the four items the Software lead listed under "subteam
    // projects" are the four subsystems already documented above
    // (Communications & Perception, Autonomy, Control Base, Firmware), so
    // rendering them here would duplicate that section verbatim. Needs real
    // R&D projects: the question investigated and what came of it.
    projects: placeholderProjects("Software", "software"),
    openRoles: placeholderRoles("Software"),
  },
  {
    slug: "electrical",
    name: "Electrical",
    discipline: "Electrical",
    blurb:
      "Here in the Electrical team, we do everything from high-level design and PCB manufacturing to testing and integration. We put in the hours to ensure the safety of the rover and everyone around it. And in a high stakes competition environment, when the rover loses its heartbeat, Electrical is ready — multimeters in hand — to bring it back to life.",
    image: "/media/team/electrical.jpg",
    capabilities: [
      "Motor control",
      "Power distribution",
      "Emergency stop systems",
      "Competition-ready PCBs",
    ],
    projects: [
      {
        index: "01",
        title: "Battery speccing",
        blurb: "Collecting power consumption data on our loads to spec our main battery.",
        photoSlot: "ELECTRICAL-P1",
      },
      {
        index: "02",
        title: "Performance feedback",
        blurb:
          "Using sensors to relay current and voltage readings to our control base in real time.",
        photoSlot: "ELECTRICAL-P2",
      },
      {
        index: "03",
        title: "Remote stop",
        blurb: "A software-operated emergency kill switch for the rover.",
        photoSlot: "ELECTRICAL-P3",
      },
    ],
    openRoles: placeholderRoles("Electrical"),
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
    projects: placeholderProjects("Rover Lab", "roverlab"),
    openRoles: placeholderRoles("Rover Lab"),
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
    projects: placeholderProjects("Science", "science"),
    openRoles: placeholderRoles("Science"),
  },
  {
    slug: "business",
    name: "Business",
    discipline: "Operations",
    blurb:
      "The technical subteams might build the brain and skeleton of the rover, but Business is the blood that keeps the entire team pumping. We secure the corporate sponsorships, capital, and resources required to turn our ideas into a highly competitive Rover. By directing our digital brand, managing the treasury, and producing critical media like the SAR video, we build the operational foundation that makes UBC Rover possible.",
    image: "/media/team/business.jpeg",
    capabilities: ["Sponsor outreach", "Treasury", "Digital brand", "Media production"],
    projects: placeholderProjects("Business", "business"),
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

/* -------------------------------------------------------------------------- */
/* People                                                                      */
/* -------------------------------------------------------------------------- */

export type LeadLink = { kind: "github" | "linkedin" | "website"; href: string };

/**
 * A person is stored once, with their photo and links, and referenced by name
 * from the role lists below.
 *
 * This shape exists because roles are many-to-many: Andres is both a captain
 * and the chassis lead, Rowan is both a captain and a software lead, and
 * Jennifer leads two sub-teams. A single `role` field per person cannot express
 * that without duplicating photos and links, which then drift apart.
 *
 * `image` is optional — where there is no portrait the card renders initials
 * rather than a stock silhouette. See components/MemberCard.tsx.
 * TODO(team): Andres and Darwyn are still without portraits.
 */
export type Person = {
  name: string;
  image?: string;
  /** object-position for the crop; these are candid photos, not headshots. */
  focal?: string;
  links?: LeadLink[];
};

const li = (href: string): LeadLink[] => [{ kind: "linkedin", href }];

export const PEOPLE: Person[] = [
  {
    name: "Andres Fleet",
    image: "/media/people/andres.jpg",
    links: li("https://www.linkedin.com/in/andresfleet/"),
  },
  {
    name: "Rowan Zawadzki",
    image: "/media/people/rowan.jpg",
    links: li("https://www.linkedin.com/in/rowan-zawadzki-4b7539158/"),
  },
  {
    name: "Aaron Rhim",
    image: "/media/people/aaron.jpg",
    links: li("https://www.linkedin.com/in/aaronrhim/"),
  },
  {
    name: "Ben Newington",
    image: "/media/people/ben.jpg",
    links: li("https://www.linkedin.com/in/bennewington/"),
  },
  {
    name: "Riddhima Gupta",
    image: "/media/people/riddhima.jpg",
    links: li("https://www.linkedin.com/in/riddhima-gupta081/"),
  },
  {
    name: "Jennifer Phung",
    image: "/media/people/jennifer.png",
    links: li("https://www.linkedin.com/in/jennifer-phung-734541338/"),
  },
  {
    name: "William Banquier",
    image: "/media/people/william.png",
    links: li("https://www.linkedin.com/in/william-banquier/"),
  },
  {
    name: "Matt Yung",
    image: "/media/people/matt.jpg",
    links: li("https://www.linkedin.com/in/mattyung12/"),
  },
  // TODO(team): Darwyn has no portrait and no LinkedIn on record yet.
  { name: "Darwyn M" },
];

const person = (name: string): Person => PEOPLE.find((p) => p.name === name) ?? { name };

/** Team captains. */
export const CAPTAIN_NAMES = ["Andres Fleet", "Rowan Zawadzki"] as const;

/**
 * Leads per sub-team.
 *
 * TODO(team): Science and Business have no lead on record. Their bands show a
 * card-shaped placeholder until someone supplies a name — an obvious gap beats
 * a stale one.
 */
export const SUBTEAM_LEAD_NAMES: Record<string, string[]> = {
  chassis: ["Andres Fleet"],
  arm: ["William Banquier", "Matt Yung"],
  "rover-lab": ["Jennifer Phung"],
  electrical: ["Darwyn M"],
  software: ["Rowan Zawadzki", "Aaron Rhim", "Ben Newington", "Riddhima Gupta"],
  science: [],
  business: [],
};

export const CAPTAINS = (): Person[] => CAPTAIN_NAMES.map(person);

export const leadsForSubteam = (slug: string): Person[] =>
  (SUBTEAM_LEAD_NAMES[slug] ?? []).map(person);

/** Label shown under a name in a sub-team band, e.g. "Chassis Lead". */
export const leadTitleFor = (slug: string): string => {
  const team = getSubteam(slug);
  return team ? `${team.name} Lead` : "Lead";
};

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
 * Which tier a sponsor sits in is a commitment the team made to that sponsor,
 * so never reshuffle these on your own judgement — only on the team's word.
 *
 * Base list came from ubcrover.github.io/index.html. Since then, Aaron moved
 * maxon (was Friends) and Protospace (was Supporters) up to Champion. The other
 * Champions were left where they were: the instruction named the sponsors being
 * given write-ups, which is not the same as a new Champion roster, and demoting
 * someone on an inference is not a thing to get wrong.
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
      { src: "/media/sponsors/maxon.png", name: "maxon" },
      { src: "/media/sponsors/protospace.png", name: "Protospace" },
      { src: "/media/sponsors/EDENTECH_logo.jpg", name: "Eden Tech" },
      {
        src: "/media/sponsors/AARC-WEST-Industrial-logo.png",
        name: "AARC-WEST Industrial",
      },
      { src: "/media/sponsors/Northstar-Access.png", name: "Northstar Access" },
      { src: "/media/sponsors/ubcengglogo.png", name: "UBC Engineering" },
    ],
  },
  {
    tier: "Supporters",
    logos: [
      { src: "/media/sponsors/McCrae.png", name: "McCrae" },
      { src: "/media/sponsors/tradecomm.jpg", name: "Tradecomm" },
      { src: "/media/sponsors/ubcmec.png", name: "UBC MEC" },
      { src: "/media/sponsors/petrokleen.jpg", name: "Petrokleen" },
    ],
  },
  {
    tier: "Friends",
    logos: [
      { src: "/media/sponsors/gct.jpg", name: "GCT" },
      { src: "/media/sponsors/electromate.jpg", name: "Electromate" },
      { src: "/media/sponsors/MistyWest.png", name: "MistyWest" },
    ],
  },
];

/** The write-up for a sponsor, matched by the name used in SPONSOR_TIERS. */
export const sponsorBlurbFor = (name: string): string | undefined =>
  SPONSOR_IMPACT.find((s) => s.sponsor === name)?.blurb;

/** What the team actually offers sponsors, per the source site. Not tiered. */
export const SPONSOR_OFFER =
  "In appreciation of your partnership, we feature your brand on our competition apparel, our digital platforms, and directly on the rover chassis as it tackles the toughest terrains.";

/**
 * What sponsorship actually bought — the team's own words.
 *
 * Written by the sponsorship leads, reproduced verbatim. Two edits only, both
 * mechanical: "protoype" -> "prototype", and "ThermoFisher" -> "Thermo Fisher",
 * which is how the company writes its own name and how it appears in
 * SPONSOR_TIERS. Do not tighten or re-voice these — they are commitments made
 * to sponsors, and the specifics (66% weight, 90% assembly time) are claims the
 * team is standing behind.
 *
 * Ordered Partners first, then Champions, matching the tier list below.
 *
 * Surfaced on the sponsor logo itself via sponsorBlurbFor(), not as a separate
 * section — the write-up belongs to the logo, so it lives with it.
 */
export type SponsorImpact = {
  sponsor: string;
  logo: string;
  /** One paragraph. Prose, not a contribution/outcome split — see the git history. */
  blurb: string;
};

export const SPONSOR_IMPACT: SponsorImpact[] = [
  {
    sponsor: "Thermo Fisher Scientific",
    logo: "/media/sponsors/Thermo_Fisher_Scientific_Logo.png",
    blurb:
      "Our partnership with Thermo Fisher Scientific allows us to procure lab-grade chemicals and equipment to develop, test, and perform our suite of biochemical assays at a price suitable for a student design team. Their generous support has permitted the science subteam to rapidly prototype and iterate on complex lab-on-a-chip systems without needing to ration reagents, supporting our mission to be the first university engineering team to apply microfluidics in Martian life-detection systems.",
  },
  {
    sponsor: "Ember Prototypes",
    logo: "/media/sponsors/Ember_Prototypes_Logo.jpg",
    blurb:
      "Ember Prototypes has unlocked entirely new rapid manufacturing avenues for us through their generous sponsorship of a Form 3B+ printer, a resin starter package, and the Ember Prototypes Toolkit. Crucially, this setup drives our initiative to become the first student robotics team to develop functional microfluidic lab-on-a-chip systems for Martian life detection. Beyond bio-assay chips, we leverage this technology across the entire rover. We use Clear resin to produce optically transparent, waterproof enclosures for our main floodlights and status indicators, and engineering resins to print intricate, high-strength geometries for our robotic arm's end effector.",
  },
  {
    sponsor: "maxon",
    logo: "/media/sponsors/maxon.png",
    blurb:
      "Support from Maxon has enabled a ground-up redesign of our mobility platform through a complete drivetrain upgrade. Integrating their high-efficiency motors allowed us to significantly increase output torque and speed without drawing additional electrical power, all while slashing overall drivetrain weight by 66%. This critical reduction unlocked the available mass to develop our new individual wheel steering system, drastically improving the rover's maneuverability across harsh, complex terrain.",
  },
  {
    sponsor: "Protospace",
    logo: "/media/sponsors/protospace.png",
    blurb:
      "Support from Protospace Mfg has been central to the structural overhaul of our rover. Leveraging their generous machining credit, we remanufactured our full suspension assembly to interface with our upgraded drivetrain and fabricated an all-new modular frame system that cuts assembly/disassembly time by 90%. On top of fabrication, Protospace provided powder-coating in UBC blue, ensuring our chassis is as sharp as it is rugged at competition.",
  },
  {
    sponsor: "Eden Tech",
    logo: "/media/sponsors/EDENTECH_logo.jpg",
    blurb:
      "Eden Tech supported our science subteam by providing full access to FLUI'DEVICE, their specialized microfluidic design and simulation platform. We utilized the software to model intricate internal channel networks and validate fluid dynamics before manufacturing. This capability streamlined our lab-on-a-chip prototyping cycle, bringing us closer to fielding an autonomous microfluidics assay system on the rover.",
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

/**
 * Google Analytics 4 measurement ID.
 *
 * Typed as `string` rather than left to infer a literal: a literal type would
 * let TypeScript prove the `GA_MEASUREMENT_ID &&` guard in app/layout.tsx is
 * always truthy, and narrowing like that has already broken a build in this
 * repo (see STATS). Widening keeps the guard meaningful, so blanking this
 * string is all it takes to turn analytics off.
 */
export const GA_MEASUREMENT_ID: string = "G-FL983GJFMG";

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
