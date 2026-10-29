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

// Drop real photos into /public/photos using these file names and they replace
// the placeholders automatically on the next build. Ideal size: 2400px wide JPG.
export const photos = {
  workshop: { file: "workshop.jpg", alt: "Attendees working on laptops during a hands-on AI workshop", shot: "Hands on laptops, mid-workshop" },
  meetup: { file: "meetup.jpg", alt: "A local builder demoing a project to a room of attendees", shot: "Builder demoing to the room" },
  talk: { file: "talk.jpg", alt: "A speaker presenting to a full room in Sacramento", shot: "Speaker at the front, full room" },
  build: { file: "build.jpg", alt: "A small group building together around a table", shot: "Small group building at a table" },
  room: { file: "room.jpg", alt: "A full room at an AI Collective Sacramento event", shot: "Wide shot of a packed room" },
  conversation: { file: "conversation.jpg", alt: "Two attendees in conversation after a talk", shot: "Two people mid-conversation" },
  group: { file: "group.jpg", alt: "Group photo of AI Collective Sacramento members", shot: "Group photo at the end of the night" },
  laughing: { file: "laughing.jpg", alt: "Attendees laughing during a session", shot: "Candid laugh during a session" },
} as const;

export type PhotoKey = keyof typeof photos;

export const gallery = {
  title: "Inside the room",
  body: "No stage-and-audience energy. People lean in, ask the question everyone else was thinking, and stay after to keep talking.",
  shots: ["room", "conversation", "laughing", "group"] as PhotoKey[],
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
