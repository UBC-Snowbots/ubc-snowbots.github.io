# Sub-team Lead Content Form — spec

This document is the source for building a Google Form that collects website
copy from each sub-team lead. Hand it to Gemini in Google Forms and ask it to
build the form from this spec.

**Why this exists.** Most of the technical copy on the UBC Rover site is
currently a visible `PLACEHOLDER`. This form gathers the real text from the
people who actually built each system, in the exact shapes the site renders, so
answers can be pasted straight into `lib/content.ts` with no rewriting.

---

## Instructions for the form builder

- **Title:** `UBC Rover — Sub-team Content Submission`
- **Description:** _Every sub-team lead fills this out once. Your answers go
  directly onto the public website, so write them the way you want them read.
  Budget 30–45 minutes. You can save and return._
- **Collect email addresses:** on.
- **One response per lead**, and allow response editing after submission.
- **Use sections with branching.** After the sub-team question, route each lead
  to only the subsystem sections their team owns (mapping in
  [Section 3](#section-3--what-youve-built-the-long-one)). Do not show a lead
  sections for hardware they do not own.
- **Required fields:** everything in Sections 1, 2 and 3 except where marked
  _optional_. Section 4 requires at least one project. Section 5 is optional.
- Long-answer questions should be **Paragraph** type; short factual ones
  **Short answer**. Where a question expects a number with units, say so in the
  help text — a bare number is not usable.

---

## Section 1 — Who is filling this in

| Question                                    | Type            | Notes                                                                                                             |
| ------------------------------------------- | --------------- | ----------------------------------------------------------------------------------------------------------------- |
| Your name                                   | Short answer    | Required                                                                                                          |
| Your role                                   | Short answer    | e.g. "Chassis Lead". Required                                                                                     |
| Which sub-team are you filling this in for? | Dropdown        | Chassis / Arm / Rover Lab / Electrical / Software / Science / Business. **Required — this drives the branching.** |
| LinkedIn URL                                | Short answer    | Optional. Only added to the site if you provide it                                                                |
| Do you have a portrait photo we can use?    | Multiple choice | Yes, attached below / Yes, I'll send it separately / No                                                           |
| Portrait photo                              | File upload     | Optional. Square crop preferred, at least 800×800                                                                 |

---

## Section 2 — What your sub-team does

This replaces the sub-team description on `/subteams` and the summary on your
sub-team's own page. Two to four sentences. Written for a first-year student who
does not know what your sub-team is, not for a judge.

| Question                                       | Type            | Notes                                                                                 |
| ---------------------------------------------- | --------------- | ------------------------------------------------------------------------------------- |
| In 2–4 sentences, what does your sub-team do?  | Paragraph       | Required. Plain language. Avoid acronyms on first use                                 |
| List 4 things your sub-team is responsible for | Short answer ×4 | Required. 2–4 words each, e.g. "Motor control", "Waterproofing". These render as tags |

---

## Section 3 — What you've built (the long one)

**This is the most important part of the form, and the longest.** It becomes the
technical breakdown on your sub-team's page: what the system is, how it works,
and its specifications.

Ask these questions **once per subsystem** the lead owns. Route by sub-team:

| Sub-team   | Subsystem sections to show          |
| ---------- | ----------------------------------- |
| Chassis    | Chassis, Drivetrain                 |
| Arm        | Robotic Arm, End Effector           |
| Rover Lab  | Rover Lab                           |
| Electrical | Power & Electronics, Communications |
| Software   | Control Base                        |
| Science    | _none — skip to Section 4_          |
| Business   | _none — skip to Section 4_          |

### Questions to repeat for each subsystem

Prefix every question with the subsystem name, e.g. **"Drivetrain — main job"**,
so answers are unambiguous when exported.

| Question                                                | Type         | Guidance to put in help text                                                                                                                                                                                         |
| ------------------------------------------------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Main job — in one sentence, what is this subsystem for? | Short answer | Required. One line, plain language. Example: _"Turns power into motion across loose, broken and steep ground."_                                                                                                      |
| Summary — 2–3 sentences on what it is                   | Paragraph    | Required. What it is and why it matters to the rover as a whole                                                                                                                                                      |
| How it works — the design and the reasoning             | Paragraph    | **Required. Aim for 120–200 words.** Describe the architecture and, importantly, _why_ it is built that way. What were the constraints? What did you choose between?                                                 |
| What it has to survive                                  | Paragraph    | **Required. Aim for 80–150 words.** What this subsystem has to tolerate at URC and CIRC — terrain, temperature, dust, water, vibration, power limits. What has actually failed before, and what changed as a result? |
| Photo of this subsystem                                 | File upload  | Optional but strongly encouraged. A clear shot of the real hardware                                                                                                                                                  |
| Caption for that photo                                  | Short answer | Optional. One line describing what is shown                                                                                                                                                                          |

### Tech specs — per subsystem

Each subsystem has its own spec list. Ask each as a **Short answer**, and put
_"include units"_ in the help text. If a value genuinely does not apply or is not
measured, answer `N/A` rather than leaving it blank — a blank reads as forgotten.

| Subsystem               | Spec fields to ask for                                                                                          |
| ----------------------- | --------------------------------------------------------------------------------------------------------------- |
| **Chassis**             | Material · Dimensions (L × W × H) · Mass · Sealing approach                                                     |
| **Drivetrain**          | Configuration (wheel count, steering type) · Suspension · Wheel diameter · Drive motors · Top speed · Max grade |
| **Robotic Arm**         | Degrees of freedom · Reach · Payload at full extension · Actuation                                              |
| **End Effector**        | Quick-change interface type · Tool set · Grip force · Swap time                                                 |
| **Rover Lab**           | Sample intake · Assays · Instruments · Sample capacity                                                          |
| **Power & Electronics** | Battery (chemistry, capacity) · Bus voltage · Runtime · E-stop architecture                                     |
| **Communications**      | Band · Antennas · Range · Behaviour on link loss                                                                |
| **Control Base**        | Console hardware · Camera feeds · Autonomy · Simulation                                                         |

> Note for Science and Business leads: you own no hardware subsystem, so this
> section is skipped. Section 2 and Section 4 still apply to you.

---

## Section 4 — R&D projects

Two to four projects per sub-team. These are **research and development** efforts
— things you investigated, prototyped or proved out — not routine build tasks.

Repeat this block **2–4 times** (label them "R&D Project 1", "R&D Project 2", …).
Mark the first required, the rest optional.

| Question                                     | Type         | Notes                                                                                                                                                          |
| -------------------------------------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Project title                                | Short answer | Required for project 1. Short and concrete, e.g. "Swappable end-effector coupling"                                                                             |
| One-line label                               | Short answer | 2–4 words shown above the title, e.g. "Prototype", "Test campaign", "2026 redesign"                                                                            |
| What was the question you set out to answer? | Paragraph    | Required. What problem or unknown prompted this?                                                                                                               |
| What did you try, and what happened?         | Paragraph    | Required, 80–150 words. What was built or tested, and the outcome — including if it did not work. A failed experiment with a clear finding is worth publishing |
| Where did it end up?                         | Paragraph    | Is it on the current rover, shelved, or continuing?                                                                                                            |
| Photo                                        | File upload  | Optional                                                                                                                                                       |

---

## Section 5 — Open roles _(optional)_

Feeds the "What you'd be working on" section of `/join`. Skip if you are not
recruiting right now.

Repeat 1–3 times:

| Question                                  | Type         | Notes                                                                                                                                                                                          |
| ----------------------------------------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Role title                                | Short answer | e.g. "Suspension design"                                                                                                                                                                       |
| What would this person actually be doing? | Paragraph    | Required if a title is given. Describe the work a new member would be handed in their first term. **Describe the job, not the sub-team** — "what our sub-team does" already lives in Section 2 |
| Useful skills                             | Short answer | Comma-separated, 2–4 items. Things that help, not hard requirements                                                                                                                            |

---

## Writing guidance to include in the form

Put this in the form description or as a section header, since it determines
whether the answers are usable:

- **Write in plain sentences, not bullet fragments.** Answers are pasted onto
  the site as prose.
- **Prefer specifics over adjectives.** "Six wheels on a rocker-bogie, 20 cm
  diameter" beats "a robust and advanced mobility system".
- **Say what is not done yet.** If a subsystem is mid-redesign, say so — the site
  can carry that honestly. Do not describe an aspiration as if it exists.
- **Numbers need units**, and should be the real measured value, not a target.
- **Do not write marketing copy.** No "cutting-edge", "state-of-the-art",
  "pushing the boundaries". Describe the thing.
- **Acronyms:** expand on first use (URC, CIRC, PDB, BMS, …).

---

## Where each answer lands

For whoever transfers the responses into the codebase — everything goes into
`lib/content.ts`:

| Form section                        | Destination                                      |
| ----------------------------------- | ------------------------------------------------ |
| 1 — name, role, LinkedIn, photo     | `PEOPLE`, plus `SUBTEAM_LEAD_NAMES`              |
| 2 — what the sub-team does          | `SUBTEAMS[].blurb` and `SUBTEAMS[].capabilities` |
| 3 — main job / summary              | `SUBSYSTEMS[].role` and `SUBSYSTEMS[].summary`   |
| 3 — how it works / what it survives | the two entries in `SUBSYSTEMS[].detail`         |
| 3 — tech specs                      | `SUBSYSTEMS[].specs`                             |
| 3 — photo and caption               | `SUBSYSTEMS[].image` and `.imageCaption`         |
| 4 — R&D projects                    | `SUBTEAMS[].projects`                            |
| 5 — open roles                      | `SUBTEAMS[].openRoles`                           |

Photos go in `public/media/` — subsystem shots under `team/`, portraits under
`people/`. Anything still marked `PLACEHOLDER` renders in amber on the live site,
so it is easy to see what is still outstanding.
