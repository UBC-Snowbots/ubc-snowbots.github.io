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
  formUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLScKwPUzilAh6Iyq0v1xhxPfeMoywmIl6XQo5ipadU_MnVOm8Q/viewform" as
      string | null,
  fallbackHref: "/join",
  bannerText: "Applications open every Fall",
  /** Shown on in-page buttons, where "Apply" reads better than the nav label. */
  buttonCta: "Apply Now",
  cta: "Join Us",
} as const;

export const applyHref = (): string => APPLY.formUrl ?? APPLY.fallbackHref;

/**
 * True while the apply target is the external form rather than the /join page.
 *
 * The two need different link handling - an external form should open in a new
 * tab and carry rel="noreferrer noopener", an internal route should not - and
 * which one it is depends on a value that changes between seasons. Deriving it
 * means no call site has to be edited when the form is swapped out or pulled.
 */
export const applyIsExternal = (): boolean => applyHref().startsWith("http");

/**
 * The overall joining package — the equivalent of UBC Formula Electric's
 * "Hiring Package" button at the top of their Join Us page.
 *
 * TODO(team): set `url` to the package (PDF, Drive link or Notion page) when it
 * exists. While it is null the button renders as a visibly disabled placeholder
 * rather than a link to nowhere.
 */

export const RECRUITMENT_PACKAGE = {
  url: "https://ugc.production.linktr.ee/431d8953-3a37-4834-a853-4a16f3f74138_2026-27-Recruitment-Package.pdf" as
    string | null,
  label: "Recruitment Package",
  pending: "Recruitment Package - coming soon",
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
  { value: "749", label: "Components in the rover" },
];

/* -------------------------------------------------------------------------- */
/* Home page section tiles — the "click and enter" grid                        */
/* -------------------------------------------------------------------------- */

export type SectionTile = {
  title: string;
  href: string;
  /**
   * Five or six words. These are labels, not summaries — the tile's job is to
   * say where the link goes, and the page behind it does the explaining. The
   * long versions read as filler once four of them sit in a grid together.
   */
  blurb: string;
  image: string;
  /** Column span at lg. Four narrow tiles give two clean rows of two. */
  span: "wide" | "narrow";
};

export const SECTIONS: SectionTile[] = [
  {
    title: "Competition",
    href: "/compete",
    blurb: "Utah desert, Alberta badlands",
    image: "/media/team/chassis.jpg",
    span: "narrow",
  },
  {
    title: "Our Team",
    href: "/team",
    blurb: "Sixty-four students who build it",
    image: "/media/team/arm.jpg",
    span: "narrow",
  },
  {
    title: "Sponsors",
    href: "/sponsors",
    blurb: "Put your name on Mars",
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

/** One row of a subsystem's tech-spec table. */
export type Spec = { label: string; value: string };

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
   * Tech specs as datasheet rows.
   *
   * Most leads DID submit these as label/value lines; an earlier version of
   * this file flattened them into sentences, which lost the scannability that
   * made them worth collecting. Where a lead wrote prose instead, the rows here
   * carry only figures they stated explicitly — nothing is derived or inferred.
   */
  specs?: Spec[];
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
  /** Which subteam owns this subsystem. */
  ownedBy: string;
};

export const SUBSYSTEMS: Subsystem[] = [
  /* ---- Chassis ------------------------------------------------------- */
  {
    slug: "frame",
    name: "Frame",
    role: "Safely carries all the components of the Rover.",
    summary:
      "The frame is a modular foundation of the chassis. It allows for flexibility in attachment location, and is designed for easy assembly in the field. The frame allows the rover to be a test and competition vehicle.",
    detail: [
      "The design philosophy was to make the frame as flexible as possible. To minimize assembly, the frame was bent to reduce the number of components, and the number of fasteners was minimized. PEM nuts are used for screwing attachments into the frame. Simply put, the frame is an electrical enclosure that is designed for modularity, flexibility, and reliability.",
      "The frame has to survive thousands of cycles of assembly and disassembly, bumps while traversing over rough terrain, and unexpected weather, if need be. The frame allows for the rover to function as a device in a stable, predictable manner.",
    ],
    specs: [
      { label: "Material", value: "Powder-coated aluminium 5052-H12" },
      { label: "Dimensions", value: "600 × 590 × 200 mm" },
      { label: "Weight", value: "5 kg" },
      { label: "Attachment points", value: "400+" },
      { label: "Weather resistance", value: "Rain- and dust-proof" },
      { label: "Wiring", value: "Super clean" },
    ],
    photos: [
      { src: "/media/subsystems/frame.jpg", caption: "The bare frame during assembly." },
    ],
    photoSlot: "CHASSIS-01",
    ownedBy: "chassis",
  },
  {
    slug: "drivetrain",
    name: "Drivetrain",
    role: "Allows traversal over challenging terrain while keeping the chassis level and maintaining traction.",
    summary:
      "The rocker-bogie suspension system allows for traversal over uneven terrain while still maintaining the vehicle more or less level with equal contact force on each wheel. Six wheels follow the tried-and-tested NASA design that has been used for three generations of rover.",
    detail: [
      "The design philosophy of the rocker-bogie suspension system is weight minimization. Topology optimization was performed on the differential and the rocker-bogie legs. The rocker-bogie system has a greater moment of inertia due to the use of struts that increase the second moment of area while minimizing added weight, similar to a plane wing. Our drivetrain was selected to optimize available power per kg while maintaining speed and hill climbing ability.",
      "Obstacles we need to traverse can be up to 30 cm in height, drops up to 1 m, and hills as steep as 35\u00b0. The suspension system must be able to endure forces that include the weight of the rover, arm, and any added components all while handling this rough terrain.",
    ],
    specs: [
      { label: "Wheels", value: "6" },
      { label: "Mass", value: "6 kg" },
      { label: "Power", value: "900 W" },
      { label: "Torque", value: "33 N·m" },
      { label: "Max speed", value: "13 km/h" },
    ],
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
      {
        src: "/media/subsystems/rover-driving-1.mp4",
        kind: "video",
        caption: "Driving on pavement.",
      },
      {
        src: "/media/subsystems/rover-driving-2.mp4",
        kind: "video",
        caption: "Climbing a curb.",
      },
    ],
    photoSlot: "CHASSIS-02",
    ownedBy: "chassis",
  },
  {
    slug: "comms-relay",
    name: "Comms Relay",
    role: "Deployable module to increase the range of the rover.",
    summary:
      "The comms relay allows for the rover to communicate over longer distances or around structures that block the signal from the comms base antenna. The comms relay can deploy from the rover automatically, and allows for the absence of human intervention in extending the rover's range.",
    detail: [
      "The comms relay is designed around deploying the most stable and reliable relay while still ensuring portability. Still in the developmental and testing phases, the comms relay relies on a rack and pinion mechanism that prioritizes reliability.",
      "The comms relay has to survive the inclement weather, harsh terrain, and unpredictable landing conditions.",
    ],
    specs: [
      { label: "Material", value: "3D-printed PLA" },
      { label: "Weight", value: "2 kg" },
      { label: "Deployable height", value: "0.4 m" },
    ],
    photos: [
      {
        src: "/media/subsystems/comms-relay.jpg",
        caption: "The assembled comms relay on its stand.",
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
      "The primary design focus was precision through survival - specifically within our competitions we have to carry heavy items and deal with vibrations. Our main goals for design are to be both fail-safe and fail-proof. The way to do that, we found is through simplifying our designs and building them for both assembly and debugging.",
      "The desert is dusty and warm and sometimes wet. The arm needs to survive all of that. It also needs to function as protection and mounting for wires, cameras - all in the hot desert sun. But all while surviving we also need to be at high precision at our end effector.",
    ],
    specs: [
      { label: "Length", value: "1 m" },
      { label: "Degrees of freedom", value: "6" },
      { label: "Payload", value: "5 kg at millimetre precision" },
    ],
    photos: [
      {
        src: "/media/subsystems/arm-6dof.jpg",
        caption: "The arm on the bench, wiring exposed.",
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
    specs: [
      { label: "Payload", value: "Over 5 kg" },
      { label: "Tooling", value: "Wire cutters, screwdrivers" },
      { label: "Coupling", value: "Hot-swappable" },
    ],
    photos: [
      {
        src: "/media/subsystems/arm-end-effector.jpg",
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
    specs: [
      { label: "PCBs", value: "6" },
      { label: "Motors", value: "7, all with encoders" },
      { label: "Stall current", value: "Over 100 A on some" },
      { label: "Cameras", value: "2" },
      { label: "Microcontrollers", value: "1, end-effector mounted" },
    ],
    photos: [
      {
        src: "/media/subsystems/arm-electrical.jpg",
        caption: "Power distribution and motor driver boards, wired up.",
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
      "Our network has an effective range of 780 m with an average latency of under 3 ms. It can also stream up to 5 camera feeds at 30 fps simultaneously.",
    ],
    specs: [
      { label: "Bandwidth", value: "20–80 MHz" },
      { label: "Antennas", value: "2 omnidirectional, 5 GHz powerbeam" },
      { label: "Range", value: "780 m" },
      { label: "Latency", value: "Under 3 ms" },
      { label: "Camera feeds", value: "5" },
      { label: "Compression", value: "H.265" },
    ],
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
      "We chose a VSLAM based approach over relying solely on GNSS because GPS accuracy alone isn't sufficient for precise final-approach navigation to posts and objects, especially in terrain with signal degradation. VSLAM lets the rover build a local map in real time and correct its position using visual features. For the arm, our only supported autonomy stack involves RL - which is still in development. Using behavior trees and excluding an observation module, we trained a hierarchical reinforcement learning model to dynamically press keys on a keyboard in simulation. Overall, we prioritized modularity between the navigation stack and the manipulation stack so each can be tested and tuned independently before integration.",
      "The subsystem has to operate over unstructured, uneven outdoor Mars-like terrain without reliable GPS lock at every point along the course, using onboard cameras as the primary sensing source. It must reliably detect AR tags, and small ground objects under variable outdoor lighting. The arm's vision-guided keypress task demands sub-centimeter positioning accuracy despite vibration and imperfect stopping position from the drive system.",
    ],
    specs: [
      { label: "Task completion accuracy", value: "98.7%" },
      {
        label: "Method",
        value: "RL with domain randomisation, excluding observation module",
      },
    ],
    photoSlot: "SOFTWARE-02",
    expects: ["Software RL.mp4 - video"],
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
    specs: [
      { label: "Startup time", value: "1.5 minutes" },
      { label: "Configurable physical controls", value: "34" },
      { label: "Total screen space", value: "550 cm²" },
      { label: "Monitors", value: "3" },
    ],
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
      "Firmware is a joint team between electrical and software. Our firmware protects our hardware by setting hard limits, while pushing our hardware to its full capabilities. We make sure the software side can utilize all our hardware's features through standardized, simple interfaces.",
      "Our firmware operates across distributed boards exposed to vibration, EMI, and unreliable links back to the main computer. It must detect faults and recover on its own, with zero tolerance for corrupting sensor/actuator state mid-operation.",
    ],
    specs: [
      { label: "Boards running custom firmware", value: "8" },
      { label: "Favourite controller", value: "STM32G474" },
      { label: "Favourite protocol", value: "CAN FD, with SIC transceivers" },
    ],
    photos: [
      {
        src: "/media/subsystems/firmware-esp32.jpg",
        caption: "An ESP32 dev board on the bench.",
      },
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
      "Due to the nature of our competitions, we prioritise efficiency when interchanging the many loads our rover hosts. Our system makes this possible with its durable XT30 connectors and fuse holders. This way, we simply need to plug in and fuse the required power lines for a specific task - it is a flexible and intuitive design.",
      "Our power distribution boards are built to withstand 90 A of continuous current. It can supply power on four different voltage rails, totalling 22 individual channels. All of this operates under 1000 W+ loads in high heat conditions to keep the rover's heart beating.",
    ],
    specs: [
      { label: "Input voltage", value: "19–21 V" },
      { label: "Output rails", value: "5 V, 12 V, 18 V, 24 V" },
      { label: "Channels", value: "22" },
      { label: "Continuous current", value: "90 A" },
      { label: "Load", value: "1000 W+" },
      { label: "Per-output connector", value: "XT30 with fuse holder" },
    ],
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
    specs: [
      { label: "Supply rail", value: "18 V" },
      { label: "LEDs", value: "4" },
      { label: "Driver", value: "Constant current" },
      { label: "Colour range", value: "Any HEX value" },
      { label: "Additional", value: "Floodlight on the PTZ camera" },
    ],
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
      "As the wheels and top plate of the chassis frequently need to be removed, we decided to use aviator connectors to attach the drivers to the motors. These are durable and easy to use, so assembly can happen in a timely manner - which is extremely important in a competition environment. Wiring therefore plays an important and often overlooked role in the drivetrain system's success.",
      "The motor drivers can provide over 1000 W of power to our drivetrain. This allows masterful maneuvering of rocky terrain, loose gravel and steep cliffs. This is all operating with 50 kg of mass from the battery, chassis and arm.",
    ],
    specs: [
      { label: "Drivers", value: "Phidget VINT, one isolated per motor" },
      { label: "Motors driven", value: "6" },
      { label: "Voltage", value: "24 V" },
      { label: "Current rating", value: "20 A" },
      { label: "Drivetrain power", value: "Over 1000 W" },
    ],
    photos: [
      { src: "/media/subsystems/motor-drivers.jpg", caption: "Driver board detail." },
    ],
    photoSlot: "ELECTRICAL-03",
    ownedBy: "electrical",
  },

  /* ---- Rover Lab ----------------------------------------------------- */
  {
    slug: "soil-collection",
    name: "Soil Collection",
    role: "Collects and caches soil samples for experimentation.",
    summary:
      "The soil collection system provides a method to extract and store samples from dense, dry terrain. It features a drill, a vacuum pump, and a tri-chambered collection carousel, equipping the rover with the ability to analyze multiple sites in one short expedition.",
    detail: [
      "Competition conditions, such as the weather and soil composition, tend to vary heavily by location. The soil collection system is built to be resilient and adaptable. Its main goal is to efficiently gather samples, regardless of the environmental challenges that it may face.",
      "The soil collection system operates under strict time constraints, with most competition exploration periods lasting from 30 minutes to an hour. It must also overcome uneven terrain with unknown geological composition, variations in soil moisture content, and be sturdy enough to survive the journey to and from the sample site.",
    ],
    specs: [
      { label: "Max sample depth", value: "30 cm below surface" },
      { label: "Max collection rate", value: "40 L/min" },
      { label: "Drill motor", value: "12 V stepper" },
      { label: "Caching", value: "Tri-chambered carousel" },
    ],
    photos: [
      {
        src: "/media/subsystems/rover-lab-soil-collection.jpg",
        caption: "The soil collection hopper.",
      },
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
    ],
    photoSlot: "ROVERLAB-01",
    ownedBy: "rover-lab",
  },
  {
    slug: "soil-processing",
    name: "Soil Processing",
    role: "Processes soil samples for biochemical analysis.",
    summary:
      "Rover Lab's soil processing system prepares samples using agitation, filtration, and separation. Pumps and valves control the flow of fluid from each compartment. The end result is a homogenized, clear sample that the science team can use for scientific experiments.",
    detail: [
      "This system expects the unexpected. It is manufactured to produce consistent results whilst being flexible by design. By using swappable filters of varying sizes and adjustable agitator blade speeds, Rover Lab is able to react appropriately to variations in soil composition.",
      "It is impossible to predict the exact contents that enter the processing assembly. It must account for blockages, insoluble objects, and potential damage to its components. It also needs to monitor the progress of each processing stage, preventing the sample from premature analysis and ensuring that the chemical assays deliver accurate results.",
    ],
    specs: [
      { label: "Max agitator speed", value: "12,000 RPM" },
      { label: "Filtration", value: "Swappable micrometre mesh" },
      { label: "Flow control", value: "Pumps and solenoid valves" },
    ],
    photos: [
      {
        src: "/media/subsystems/rover-lab-pumps.jpg",
        caption: "Pumps and tubing on the bench.",
      },
    ],
    photoSlot: "ROVERLAB-02",
    ownedBy: "rover-lab",
  },
  {
    slug: "rover-lab-electrical",
    name: "Electrical Systems",
    role: "Centralizes the power requirements, drivers, and wiring required to run Rover Lab's electromechanical payload.",
    summary:
      "Electrical components are the heart and brain of Rover Lab's functionality. Through the use of microcontrollers, circuit boards, and a PCB for the 2026/27 season, this subsystem controls and powers the lab. Every manual or automatic command is linked back to this electrical core, allowing for seamless and efficient control of the rover's soil collection and processing abilities.",
    detail: [
      "The challenges that the electrical system has faced so far involve organization, durability, and power distribution amongst components. This subsystem's focus is to constantly improve the repairability, security, and cohesiveness of Rover Lab's electrical components.",
      "Navigating rocky surfaces poses the risk of unplugged wires or damaged electrical connections, which can cause the failure of a scientific expedition. Components powered by up to 24 V can short circuit and become hazardous when exposed to moisture. Rover Lab's electrical system implements safeguards and solutions to prevent these issues from interfering with the success of the lab.",
    ],
    specs: [
      { label: "Max simultaneous actuators + sensors", value: "10" },
      { label: "Supported voltage rails", value: "5 V, 12 V, 24 V" },
    ],
    photos: [
      {
        src: "/media/subsystems/rover-lab-control-box.jpg",
        caption: "Control electronics in their enclosure.",
      },
    ],
    photoSlot: "ROVERLAB-03",
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
    specs: [
      { label: "2025–26 sponsorship value", value: "$12,500" },
      { label: "Sponsors", value: "14" },
      { label: "Highest all-time donation", value: "$9,860" },
      { label: "Chassis real-estate", value: "70% unbranded" },
    ],
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
  note: "PLACEHOLDER - interactive CAD model of the current rover.",
} as const;

/* -------------------------------------------------------------------------- */
/* Subteams                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Group photo used behind every team banner on /team.
 *
 * TODO(team): this one shot stands in for all of them. When each subteam has
 * its own group photo, drop it in public/media/team/ and set `photo` on that
 * subteam in SUBTEAMS below — the banner picks it up automatically.
 */
export const TEAM_PHOTO = "/media/team/team-photo.jpg";

/** Intro line on /team, between the masthead and the Captains band. */
export const TEAM_INTRO =
  "Get to know the brilliant minds driving innovation at UBC Rover. Each member brings unique expertise to our cutting-edge projects.";

export type OpenRole = {
  title: string;
  /** What you would actually be doing — NOT what the subteam does. */
  doing: string;
  skills: string[];
};

export type Subteam = {
  slug: string;
  name: string;
  discipline: string;
  /** Group photo for this subteam's banner. Falls back to TEAM_PHOTO. */
  photo?: string;
  /** TODO(team): subteam leads to rewrite. Carried over from the old site. */
  blurb: string;
  image: string;
  capabilities: string[];
  /** Rendered on /join. Strictly roles and responsibilities. */
  openRoles: OpenRole[];
};

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
    openRoles: [
      {
        title: "Mechanical design",
        doing:
          "Contribute to the design and development of Chassis subsystems, propose solutions to open-ended problems, and support fabrication through machining, 3D printing and other shop processes. This year's projects are a drivetrain upgrade, a baseplate upgrade, and adding individual steering to the wheels.",
        skills: [
          "SolidWorks or similar CAD",
          "Machining and shop access a plus",
          "Mechanical design intuition",
        ],
      },
      {
        title: "Integration projects",
        doing:
          "Chassis leads integration with the other subteams. Tentative projects include a modular battery system that adjusts capacity to the task, and a deployable communications relay to double our effective range.",
        skills: [
          "DFMA principles",
          "Load analysis and material selection",
          "Reading electrical constraints into mechanical design",
        ],
      },
    ],
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
    openRoles: [
      {
        title: "Arm",
        doing:
          "Polishing the arm so it runs precisely, repeatably and reliably ahead of the University Rover Challenge. Design work, manufacturing, and running tests of arm performance.",
        skills: [
          "SolidWorks",
          "Mechanical loading and stress analysis",
          "Machine design, gear selection a plus",
        ],
      },
      {
        title: "End effector",
        doing:
          "Adding capability to the rover's hand through the design of new hot-swappable End of Arm Tooling.",
        skills: ["Additive manufacturing", "Electromechanical actuators", "DFM/DFA"],
      },
      {
        title: "Electrical integration",
        doing:
          "PCB design, wiring and motor management across the arm. Members focus on one area but are expected to become familiar with every aspect of building a robotic arm, from mechanical design through to electronics.",
        skills: ["PCB design", "Electronics familiarity", "Wiring and motor management"],
      },
    ],
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
    openRoles: [
      {
        title: "Systems engineering",
        doing:
          "Embedded systems, control, and simulation - from small microcontrollers up to the main drive system and the human-machine interface.",
        skills: [
          "C++ or Python",
          "STM32, Arduino or Teensy",
          "FreeRTOS, Zephyr or CMSIS",
        ],
      },
      {
        title: "Autonomy",
        doing:
          "Navigation and perception: computer vision, data from LiDAR, IMUs and cameras, and autonomous search and pathfinding algorithms.",
        skills: ["ROS", "Computer vision", "Sensor fusion"],
      },
      {
        title: "Communications",
        doing:
          "Long-distance Wi-Fi, the deployable relay, radio comms, network testing and Linux networking.",
        skills: ["Linux", "Networking and radio", "Git and working in a team"],
      },
    ],
  },
  {
    slug: "electrical",
    name: "Electrical",
    discipline: "Electrical",
    blurb:
      "Here in the Electrical team, we do everything from high-level design and PCB manufacturing to testing and integration. We put in the hours to ensure the safety of the rover and everyone around it. And in a high stakes competition environment, when the rover loses its heartbeat, Electrical is ready - multimeters in hand - to bring it back to life.",
    image: "/media/team/electrical.jpg",
    capabilities: [
      "Motor control",
      "Power distribution",
      "Emergency stop systems",
      "Competition-ready PCBs",
    ],
    openRoles: [
      {
        title: "Power systems",
        doing:
          "Learn how lithium battery power systems are designed, tested and integrated into a larger system. This year that means collecting accurate power consumption data and speccing a new battery.",
        skills: [
          "Lithium batteries, BMS and protection circuits",
          "Lab work: debugging, soldering, verification",
        ],
      },
      {
        title: "PCBs and embedded systems",
        doing:
          "Design and test in-house PCBs for motor controllers, sensor boards, power distribution and real-time microcontroller systems. This year: using sensors to collect real-time current and voltage data, and installing new motor drivers.",
        skills: [
          "PCB layout and routing, Altium",
          "Microcontrollers, sensors, firmware",
          "PID and system identification",
        ],
      },
    ],
  },
  {
    slug: "rover-lab",
    name: "Rover Lab",
    discipline: "Mechatronics",
    blurb:
      "Collect, process, and analyze: the Rover Lab team builds the engineering systems that allow for scientific experiments to be carried out onboard the rover. Using a collection of sensors, motors, pumps, and other electromechanical components, we work under adverse, time-sensitive conditions to discover which lifeforms exist beyond Earth.",
    image: "/media/team/rover-lab.jpg",
    capabilities: [
      "Soil collection",
      "Soil processing",
      "Onboard biochemical analysis",
      "Fluid filtration",
    ],
    openRoles: [
      {
        title: "Soil collection",
        doing:
          "Develop a mechanism to break up the arid, compact soil found on Mars, a method to cache the samples, and feedback and control through sensors, cameras and similar peripherals.",
        skills: ["SolidWorks", "Rapid prototyping", "Design for manufacturability"],
      },
      {
        title: "Soil processing",
        doing:
          "Build a leak-proof, clog-resistant fluid transport system, manufacture and test filtration methods from material choice to design, and work to the science team's agitator RPM and sample turbidity specifications.",
        skills: [
          "CAD for fluid systems",
          "Manufacturing and testing",
          "Working to a specification",
        ],
      },
      {
        title: "Electrical systems",
        doing:
          "Design and manufacture a custom PCB that controls the lab's motors, valves and linear actuators, solder prototype boards, and route cabling to prevent damage and disconnection.",
        skills: ["PCB design", "Soldering", "Microcontrollers and basic programming"],
      },
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
    openRoles: [
      {
        title: "Life detection",
        doing:
          "Optimise the life-detection assays that run on the onboard spectrophotometer, and develop new ones. Team expert on astrobiology and the biology of Mars.",
        skills: [
          "Biochem, microbio or biomedical background",
          "Wet lab skills",
          "Experimental design",
        ],
      },
      {
        title: "Instrumentation",
        doing:
          "Optimise the onboard spectrophotometer across its design, function, calibration and integration with Rover Lab, and develop the novel sensors that life detection needs.",
        skills: [
          "Optical systems and lab instruments",
          "Arduino, Raspberry Pi or STM32",
          "CAD",
        ],
      },
      {
        title: "Geology",
        doing:
          "Optimise a custom stratigraphic profile interpretation pipeline, and work with the software team to train a computer vision model to read those profiles.",
        skills: [
          "Earth science or geological engineering",
          "Mineral and geological identification",
          "Interest in computer vision",
        ],
      },
      {
        title: "Lab-on-a-chip",
        doing:
          "Use our FormLabs 3B+ resin printer to miniaturise life-detection assays, design chips with integrated sensors, and take microfluidic design to a university design team competition for the first time.",
        skills: ["Fluid dynamics", "SolidWorks", "Resin printing"],
      },
    ],
  },
  {
    slug: "business",
    name: "Business",
    discipline: "Operations",
    blurb:
      "The technical subteams might build the brain and skeleton of the rover, but Business is the blood that keeps the entire team pumping. We secure the corporate sponsorships, capital, and resources required to turn our ideas into a highly competitive Rover. By directing our digital brand, managing the treasury, and producing critical media like the SAR video, we build the operational foundation that makes UBC Rover possible.",
    image: "/media/team/business.jpeg",
    capabilities: ["Sponsor outreach", "Treasury", "Digital brand", "Media production"],
    openRoles: [
      {
        title: "Sponsor outreach",
        doing:
          "Lead direct outreach to corporate sponsors, manage professional communications, and negotiate funding or in-kind manufacturing donations. You would also develop and distribute the team's core sponsorship package. Three positions.",
        skills: [
          "Persuasive writing",
          "Professional communication",
          "Organisation and follow-through",
        ],
      },
      {
        title: "Social media",
        doing:
          "Take primary ownership of creating, managing and scheduling content across every platform, and work with the engineering subteams to turn technical updates into posts people actually read. One to two positions.",
        skills: ["Canva or Adobe Creative Suite", "Visual storytelling", "Consistency"],
      },
      {
        title: "Videographer",
        doing:
          "Produce, shoot and edit the System Acceptance Review video - the single most important competition submission of the year - plus content for technical showcases and sponsor updates. One position.",
        skills: [
          "Premiere or DaVinci Resolve",
          "Shooting on location",
          "Short-form editing",
        ],
      },
      {
        title: "Brand management",
        doing:
          "Oversee a cohesive visual identity across the logo, merchandise, stickers and banners, and develop and maintain the website: UI/UX, keeping it current, and managing the application portals. Two positions.",
        skills: ["Graphic design", "Web design and UI/UX", "Event branding"],
      },
      {
        title: "Treasury",
        doing:
          "Manage the team's finances: budgets, expense tracking and forecasting across every subteam, plus reimbursements and procurement logistics so parts arrive on time. One position.",
        skills: [
          "Spreadsheets and financial tracking",
          "Detail orientation",
          "Clear reporting",
        ],
      },
    ],
  },
];

export const getSubteam = (slug: string) => SUBTEAMS.find((t) => t.slug === slug);

/**
 * The leads for a given subteam, derived from LEADS[].role (e.g. "Chassis
 * Lead"). Derived rather than duplicated so a role change in one place cannot
 * leave the two lists disagreeing. Business currently has no lead listed on the
 * source site, so it correctly returns an empty array.
 */
/**
 * The rover subsystems a given subteam owns. These render inside the subteam's
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
 * This shape exists because roles are many-to-many: Rowan is both a captain and
 * a software lead. A single `role` field per person cannot express that without
 * duplicating photos and links, which then drift apart. Andres and Jennifer
 * used to hold two roles each as well — Andres captain + chassis, Jennifer
 * rover lab + science — and both reduced to one when Eugene and Danyaal took
 * those subteams, which is exactly the churn this shape absorbs without
 * touching a photo.
 *
 * `image` is optional — where there is no portrait the card renders initials
 * rather than a stock silhouette. See components/MemberCard.tsx.
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
    image: "/media/people/jennifer.jpg",
    links: li("https://www.linkedin.com/in/jennifer-phung-734541338/"),
  },
  {
    name: "William Banquier",
    image: "/media/people/william.jpg",
    links: li("https://www.linkedin.com/in/william-banquier/"),
  },
  {
    name: "Matt Yung",
    image: "/media/people/matt.jpg",
    links: li("https://www.linkedin.com/in/mattyung12/"),
  },
  // TODO(team): Eugene has no LinkedIn on record yet.
  { name: "Eugene Lee", image: "/media/people/eugene.jpg" },
  // TODO(team): Danyaal has no LinkedIn on record yet.
  { name: "Danyaal Abbas", image: "/media/people/danyaal.jpg" },
  // TODO(team): Darwyn has no LinkedIn on record yet.
  { name: "Darwyn M", image: "/media/people/darwyn.jpg" },
];

const person = (name: string): Person => PEOPLE.find((p) => p.name === name) ?? { name };

/** Team captains. */
export const CAPTAIN_NAMES = ["Andres Fleet", "Rowan Zawadzki"] as const;

/**
 * Leads per subteam.
 *
 * TODO(team): Business has no lead on record. Its band shows a card-shaped
 * placeholder until someone supplies a name — an obvious gap beats a stale one.
 */
export const SUBTEAM_LEAD_NAMES: Record<string, string[]> = {
  chassis: ["Eugene Lee"],
  arm: ["William Banquier", "Matt Yung"],
  "rover-lab": ["Jennifer Phung"],
  electrical: ["Darwyn M"],
  software: ["Rowan Zawadzki", "Aaron Rhim", "Ben Newington", "Riddhima Gupta"],
  science: ["Danyaal Abbas"],
  business: [],
};

export const CAPTAINS = (): Person[] => CAPTAIN_NAMES.map(person);

export const leadsForSubteam = (slug: string): Person[] =>
  (SUBTEAM_LEAD_NAMES[slug] ?? []).map(person);

/** Label shown under a name in a subteam band, e.g. "Chassis Lead". */
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
    location: "Mars Desert Research Station - Hanksville, Utah",
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
    location: "The badlands - Drumheller, Alberta",
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
      { src: "/media/sponsors/protospace.png", name: "Protospace Mfg" },
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
    sponsor: "Protospace Mfg",
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

/**
 * A nav entry. `menu` turns it into a drop-down trigger rather than a link:
 * the subteams no longer have an index page, so "Subteams" is a heading for
 * seven destinations rather than a destination itself.
 */
/**
 * A nav entry. `menu` turns it into a drop-down trigger rather than a link:
 * the subteams no longer have an index page, so "Subteams" is a heading for
 * seven destinations rather than a destination itself.
 *
 * The drop-down's third column is not stored here — it is derived from
 * SUBSYSTEMS via subsystemsForSubteam(), so a subteam gaining or losing a
 * subsystem updates the menu with nothing to keep in sync.
 */
export type NavItem = {
  label: string;
  href?: string;
  menu?: {
    /** Shown on the left of the panel, describing the whole group. */
    description: string;
    items: { label: string; slug: string; href: string }[];
  };
};

export const NAV: NavItem[] = [
  {
    label: "Subteams",
    menu: {
      description:
        "Seven subteams build one rover. Each one owns its part of the machine from the first sketch to the last bolt, and then stands behind it at competition.",
      items: SUBTEAMS.map((t) => ({
        label: t.name,
        slug: t.slug,
        href: `/subteams/${t.slug}`,
      })),
    },
  },
  { label: "Competition", href: "/compete" },
  { label: "Our Team", href: "/team" },
  { label: "Sponsors", href: "/sponsors" },
];

export const NAV_EMPHASIS: { label: string; href: string }[] = [
  { label: "Contact", href: "/contact" },
  { label: "Join Us", href: "/join" },
];

/**
 * Every nav DESTINATION in order — used by the footer and the mobile panel.
 * Subteams is not among them: it is a group heading with no page of its own,
 * so it expands to its seven subteams rather than appearing as a dead link.
 */
export const ALL_NAV: { label: string; href: string }[] = [
  ...NAV.flatMap((n) =>
    n.menu ? n.menu.items.map((i) => ({ label: i.label, href: i.href })) : [],
  ),
  ...NAV.filter((n) => n.href).map((n) => ({ label: n.label, href: n.href as string })),
  ...NAV_EMPHASIS,
];
