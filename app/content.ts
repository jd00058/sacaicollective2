// All homepage copy lives here so it can be edited without touching layout code.
// Voice: clear, practical, welcoming. Source: AIC/ai_collective_sacramento_brand_context.md

export const LUMA_URL = "https://luma.com/sacaic";
export const LUMA_CALENDAR_ID = "cal-zVNnzeOmzBKEgnP";
export const JOIN_FORM_URL = "https://api.leadconnectorhq.com/widget/form/oMXF7bIGVIB75TA29WGx";

export const nav = [
  { label: "Why", href: "#why" },
  { label: "What we do", href: "#formats" },
  { label: "Who it's for", href: "#who" },
  { label: "Events", href: "#events" },
];

export const hero = {
  lines: ["AI is moving fast.", "Don't figure it out", "alone."],
  body: "AI Collective Sacramento is a local community where curious people learn, build and connect around AI. Developers, business owners, teachers, creatives, state workers and the simply curious, in the same room.",
  primary: "Join the collective",
  secondary: "See events",
  footnote: "The Sacramento chapter of The AI Collective",
};

export const topics = [
  "AI agents",
  "Automations that save real hours",
  "Prompting, explained plainly",
  "AI for small business",
  "AI in the classroom",
  "AI in public service",
  "Creative tools",
  "Responsible AI",
  "The future of work",
  "Builder demos",
];

export const story = {
  intro: "Every week there's a new model, a new tool and a new thing you're supposed to already know. Most people are trying to keep up alone, with twenty tabs open and a feeling they're behind.",
  turn: "It's easier in a room.",
  steps: [
    {
      from: "Confusion",
      to: "Clarity",
      body: "Plain-English explanations of what changed this month and whether it matters to you.",
    },
    {
      from: "Curiosity",
      to: "Confidence",
      body: "Hands-on sessions where you try the tools yourself, next to people who will help when you get stuck.",
    },
    {
      from: "Ideas",
      to: "Implementation",
      body: "Demos, build nights and collaborators that turn the thing you keep thinking about into something that works.",
    },
  ],
};

export const formats = {
  title: "Pick your way in.",
  body: "Some people come to learn, some come to build, most come for both. Every format is designed so you leave with a next step, not just notes.",
  items: [
    {
      name: "Workshops",
      line: "Laptops open. You leave having built something, not just heard about it.",
      goodFor: "Beginners, business owners",
      photo: "workshop",
    },
    {
      name: "Builder meetups",
      line: "Local builders demo their agents, automations and tools. Borrow ideas, find collaborators.",
      goodFor: "Developers, makers",
      photo: "meetup",
    },
    {
      name: "Talks & panels",
      line: "Sacramento leaders on what AI means for work, schools, government and the city.",
      goodFor: "Everyone",
      photo: "talk",
    },
    {
      name: "Build days",
      line: "Bring an idea, leave with a prototype and the people who helped you make it.",
      goodFor: "Builders, students, founders",
      photo: "build",
    },
  ],
};

export const who = {
  title: "Hello, you belong here.",
  body: "You don't need to be technical. You need to be curious. These are the people already pulling up a chair.",
  hint: "Drag the name tags around",
  tags: [
    { role: "just curious", want: "plain answers, zero jargon", tone: "orange" },
    { role: "a developer", want: "demos, agents, people to build with", tone: "ink" },
    { role: "a business owner", want: "automations that save real hours", tone: "ember" },
    { role: "a teacher", want: "classroom-ready ways to use AI", tone: "navy" },
    { role: "a state worker", want: "what AI means for public service", tone: "orange" },
    { role: "a creative", want: "new tools that keep your voice", tone: "ink" },
    { role: "a student", want: "skills, projects and mentors", tone: "navy" },
    { role: "a nonprofit lead", want: "doing more with a small team", tone: "ember" },
    { role: "a founder", want: "feedback and first users", tone: "orange" },
  ],
};

export const events = {
  title: "Come to one. That's how it starts.",
  body: "Everything we run is posted on our Luma calendar. RSVP takes ten seconds, and new faces are the whole point.",
  emptyTitle: "The next one is being planned.",
  emptyBody: "Follow the calendar on Luma and you'll hear the moment it's posted, or join the list and we'll email you the invite.",
  pastLabel: "Recently in the room",
};

// Where each photo was taken (all 2026). Shown as a small caption so it's clear these are our events.
export const photoEvents = {
  kickoff: "Kickoff · Mar 15",
  svp: "AIC × SVP · Apr 15",
  demo: "Demo Night · May 14",
  claude: "Master Claude · Jun 2",
  branding: "Branding with AI · Jun 16",
} as const;

type Photo = {
  file: string;
  alt: string;
  shot: string;
  event: keyof typeof photoEvents;
  ratio: "3/2" | "2/3";
  // Where to anchor the crop when a frame's aspect differs from the photo's.
  position?: string;
};

// Photos live in /public/photos. If a file goes missing, a labeled placeholder
// shows in its spot until it's back.
export const photos = {
  room: { file: "room.jpg", alt: "A packed room of attendees at long tables listening to a speaker", shot: "Wide shot of a packed room", event: "svp", ratio: "3/2", position: "60% 50%" },
  workshop: { file: "workshop.jpg", alt: "Attendees with laptops open, listening during a hands-on workshop", shot: "Hands on laptops, mid-workshop", event: "claude", ratio: "3/2", position: "62% 50%" },
  meetup: { file: "meetup.jpg", alt: "A builder points at their slide while demoing to the room", shot: "Builder demoing to the room", event: "demo", ratio: "3/2", position: "20% 50%" },
  talk: { file: "talk.jpg", alt: "A speaker with a microphone addressing the room", shot: "Speaker at the front, full room", event: "svp", ratio: "2/3", position: "50% 25%" },
  build: { file: "build.jpg", alt: "A group talking through an idea around a table of laptops", shot: "Small group building at a table", event: "branding", ratio: "3/2", position: "38% 50%" },
  laughing: { file: "laughing.jpg", alt: "Two attendees laughing together", shot: "Candid laugh", event: "kickoff", ratio: "3/2" },
  conversation: { file: "conversation.jpg", alt: "Two attendees deep in conversation, one smiling", shot: "Two people mid-conversation", event: "svp", ratio: "2/3" },
  smiles: { file: "smiles.jpg", alt: "Two attendees smiling at the camera, one throwing a peace sign", shot: "Friends at a table", event: "claude", ratio: "3/2" },
  building: { file: "building.jpg", alt: "Two attendees working through something on a laptop together", shot: "Building side by side", event: "demo", ratio: "3/2" },
  pair: { file: "pair.jpg", alt: "Two attendees smiling side by side", shot: "New friends", event: "svp", ratio: "3/2" },
  notes: { file: "notes.jpg", alt: "An attendee taking notes on a tablet during a talk", shot: "Taking notes", event: "demo", ratio: "2/3" },
  table: { file: "table.jpg", alt: "Attendees talking around a round table", shot: "Table conversation", event: "branding", ratio: "3/2" },
  contacts: { file: "contacts.jpg", alt: "Two attendees swapping contact info on their phones", shot: "Swapping numbers", event: "kickoff", ratio: "3/2" },
  applause: { file: "applause.jpg", alt: "Attendees applauding a speaker", shot: "Applause", event: "svp", ratio: "3/2" },
  laptops: { file: "laptops.jpg", alt: "Attendees working on laptops at a shared table", shot: "Laptops at a shared table", event: "claude", ratio: "2/3" },
  audience: { file: "audience.jpg", alt: "An audience smiling during a talk", shot: "Audience smiling", event: "demo", ratio: "3/2" },
  focus: { file: "focus.jpg", alt: "An attendee following along at a laptop", shot: "Following along", event: "claude", ratio: "3/2" },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;

// The full-bleed photo right after the scroll story: the dots were people all along.
export const room = {
  photo: "room" as PhotoKey,
  title: ["Every dot", "is a person."],
  body: "Developers next to teachers. Founders next to state workers. First-timers next to people who have been building for years. This is what it looks like when they share a room.",
};

export const gallery = {
  title: "Inside the room",
  body: "No stage-and-audience energy. People lean in, ask the question everyone else was thinking, and stay after to keep talking.",
  // Runs of four (one tall, three wide) so the three desktop columns balance, with the
  // tall photo at a different height in each column so the wall doesn't read as a grid.
  shots: ["laughing", "conversation", "smiles", "building", "notes", "pair", "table", "contacts", "applause", "audience", "focus", "laptops"] as PhotoKey[],
  footnote: "From our first five events, March to June 2026.",
};

export const partners = {
  title: "Built with Sacramento.",
  body: "Venues, sponsors, speakers and partners keep these events open to everyone. If you want to help Sacramento get better at AI, there's a seat for you at this table too.",
  cta: "Partner with us",
  slots: 6,
};

export const closing = {
  body: "Join the list and we'll send you the next invite. No pitch, no hype. Just good people in Sacramento figuring out AI together.",
  primary: "Join the collective",
  secondary: "Follow on Luma",
};

export const footer = {
  line: "AI Collective Sacramento helps people learn, build and connect around AI so Sacramento can grow into a stronger, more prepared and more innovative AI ecosystem.",
  chapter: "A chapter of The AI Collective",
};
