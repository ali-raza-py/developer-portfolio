export type ProjectTier = 'featured' | 'engineering' | 'experiments'

export type ProjectStatus = 'shipped' | 'in-progress' | 'active'

export type ArchitectureStep = {
  label: string
  note?: string
}

export type ProjectState = {
  implemented: string[]
  inProgress: string[]
  planned: string[]
}

export type Project = {
  slug: string
  index: string
  title: string
  tagline: string
  tier: ProjectTier
  category: string
  status: ProjectStatus
  statusLabel: string
  year: string
  shortDescription: string
  description: string[]
  role: string
  team?: string
  stack: string[]
  stackNote?: string
  problem: string[]
  approach: string[]
  architecture: {
    caption: string
    steps: ArchitectureStep[]
  }
  features: string[]
  /** Optional honesty split (implemented / in progress / planned). */
  state?: ProjectState
  decisions: { title: string; body: string }[]
  challenges: { title: string; body: string }[]
  outcome: string[]
  lessons: string[]
  githubUrl: string
  liveUrl?: string
  images: string[]
  featured: boolean
}

/**
 * ADD PROJECT HERE
 * Append a new Project object inside the `projects` array below.
 * Every field must describe something verifiable — never invent metrics,
 * users, or features. A case-study page is generated per slug automatically.
 */
export const projects: Project[] = [
  {
    slug: 'medicare-ai',
    index: '01',
    title: 'MediCare AI',
    tagline:
      'AI-powered medical document intelligence — from scanned paperwork to structured, understandable information.',
    tier: 'featured',
    category: 'AI · Health · Full-Stack',
    status: 'in-progress',
    statusLabel: 'Hackathon prototype',
    year: '2026',
    shortDescription:
      'Upload a medical document, extract its text with PaddleOCR, interpret it with Groq AI, and review it through patient and hospital portals.',
    description: [
      'Medical documents are often difficult to understand, poorly structured, and trapped inside images or scanned paperwork. MediCare AI converts them into structured, understandable digital information through an end-to-end pipeline.',
      'The platform combines PaddleOCR for medical-document text extraction with Groq-powered AI for interpretation and patient-friendly explanations, while providing structured patient management and role-based portal access for individuals and healthcare organizations.',
      'Built for the Alibaba Cloud AI Hackathon Pakistan 2026 as a prototype — explicitly not a substitute for professional medical advice, diagnosis, or treatment.',
    ],
    role: 'Design, architecture, and full-stack implementation.',
    stack: [
      'Next.js',
      'React',
      'TypeScript',
      'Python',
      'PaddleOCR',
      'Groq AI',
      'Supabase',
      'JWT Auth',
      'Vercel',
    ],
    problem: [
      'Prescriptions, lab reports, and clinical records frequently arrive as images or scans — information that cannot be searched, stored structurally, or easily understood by patients.',
      'The same document serves two audiences: an individual trying to understand their own medical information, and a healthcare provider who needs authorized access to patient records. Generic AI chatbots with a medical theme solve neither.',
    ],
    approach: [
      'Build a pipeline instead of a chatbot: real medical document → OCR → structured information → AI interpretation → patient/healthcare workflow.',
      'Keep the OCR layer separate from the AI layer so extracted text can be processed independently and inspected before AI interpretation.',
      'Frame AI strictly as assistance: source document → extraction → interpretation → human review. AI output is never treated as an unquestionable medical authority.',
      'Separate Frontend, Backend/API, OCR + AI processing, and Data storage into distinct layers so compute-heavy OCR work and application traffic can be handled independently.',
      'Enforce authentication, authorization, input validation, and server-side access control so patient information is only visible to authorized roles.',
    ],
    architecture: {
      caption: 'Document processing pipeline',
      steps: [
        { label: 'Medical Document', note: 'Prescription, lab report, form, or scan' },
        { label: 'Image Upload' },
        { label: 'PaddleOCR', note: 'Text extraction — independent of AI' },
        { label: 'Text Extraction' },
        { label: 'Structured Medical Information' },
        { label: 'Groq AI', note: 'Interpretation layer' },
        { label: 'AI-Powered Interpretation', note: 'Assistance, never diagnosis' },
        { label: 'Patient / Healthcare Portal', note: 'Role-aware access' },
      ],
    },
    features: [
      'Medical document OCR — extract text from prescriptions, laboratory reports, medical forms, and scanned documents.',
      'AI-powered interpretation — medication information, dosage when present in the source document, terminology explanations, and patient-friendly summaries.',
      'Individual / patient portal — upload documents, run OCR, view interpreted information, and manage medical records.',
      'Hospital portal — authorized access to patient documents, OCR results, and AI-assisted information.',
      'Separated OCR and AI layers so extraction can be inspected before interpretation.',
      'Testing coverage around authentication, API behavior, OCR processing, and patient/hospital workflows.',
    ],
    decisions: [
      {
        title: 'Pipeline over chatbot',
        body: 'Differentiation comes from connecting document intelligence, healthcare records, AI interpretation, and patient/provider workflows — not from providing another chat interface.',
      },
      {
        title: 'Two independent processing layers',
        body: 'OCR is kept separate from AI interpretation so extracted text can be verified on its own before any model sees it, and so the layers can scale independently.',
      },
      {
        title: 'AI framed as assistance',
        body: 'Every AI output path ends in human review. The README carries an explicit disclaimer: prototype only, no diagnosis, verify against the original document.',
      },
      {
        title: 'Server-side enforcement',
        body: 'Access control is enforced on the server, secrets stay out of source control, and errors are written so they do not leak sensitive information.',
      },
    ],
    challenges: [
      {
        title: 'OCR quality varies with real documents',
        body: 'Document quality, formatting, handwriting, image resolution, and layout all affect extraction — which is why the pipeline inspects OCR output before AI interpretation instead of trusting it blindly.',
      },
      {
        title: 'Healthcare data demands discipline',
        body: 'Authentication, authorization, input validation, API validation, and secure secret handling are treated as requirements, not polish.',
      },
      {
        title: 'Hackathon scope vs. honesty',
        body: 'Documentation deliberately warns against claiming services that are not actually in the deployed architecture — the repository must reflect the real implementation.',
      },
    ],
    outcome: [
      'Working prototype built and deployed for the Alibaba Cloud AI Hackathon Pakistan 2026 (medicare-ai-sigma.vercel.app).',
      'End-to-end pipeline implemented: upload → PaddleOCR extraction → Groq interpretation → role-aware patient and hospital portals.',
      'Repository includes e2e OCR pipeline tests and benchmark scripts alongside application code.',
      'Explicit prototype disclaimer maintained — no medical diagnosis capability is claimed.',
    ],
    lessons: [
      'Separating extraction from interpretation makes an AI system inspectable instead of magical.',
      'In a healthcare-shaped product, what you refuse to claim matters as much as what you build.',
      'A layered architecture (frontend / API / processing / storage) keeps a hackathon project honest about what is actually running.',
    ],
    githubUrl: 'https://github.com/ali-raza-py/medicare-ai',
    liveUrl: 'https://medicare-ai-sigma.vercel.app',
    images: [],
    featured: true,
  },
  {
    slug: 'ai-hub',
    index: '02',
    title: 'AI-HUB',
    tagline:
      'A structured knowledge base for AI developer tools — 102 registered tools generated from one verified registry.',
    tier: 'featured',
    category: 'Developer Tools · Data Engineering',
    status: 'active',
    statusLabel: 'Active — verified Sep 2026',
    year: '2026',
    shortDescription:
      'A maintainable reference for AI coding tools built like a small database: one YAML registry, Python validation and generation scripts, and CI that fails when generated pages drift.',
    description: [
      'AI-HUB answers one question well: "Which AI developer tool should I actually use — and why?" It is not a link dump or a hype list. It is a reference built like a small database with a single source of truth.',
      '102 registered tools, 40 detailed tool pages, 6 categories, 10 comparison guides, and 1 master matrix — all generated from one verified registry. Every entry carries a Last verified date; anything unverifiable against an official source is marked Unknown and never guessed.',
      'Produced with AI-assisted research, but reviewed and verified against official sources before anything is stored in the registry — a process the repository documents openly.',
    ],
    role: 'Registry design, validation and generation scripts, CI pipeline, and site structure.',
    stack: [
      'Python',
      'TypeScript',
      'YAML registry',
      'GitHub Actions',
      'markdownlint',
      'Static site generation',
    ],
    problem: [
      'AI tooling changes weekly — pricing, models, platforms, and features drift constantly. A hand-maintained list of 100+ tools rots silently and becomes untrustworthy.',
      'Most "awesome AI tools" pages are link dumps with no verification model, no status handling for discontinued tools, and no way to prove generated content matches its source.',
    ],
    approach: [
      'Treat content as data: edit ai-coding-tools/data/tools.yaml — the single source of truth — never the generated pages.',
      'Validate before anything generates: schema, enums, duplicate detection, and reference checks must print RESULT: VALID with 0 errors.',
      'Generate everything derived: 102 tool pages, indexes, comparison tables, and the master matrix all come from the registry via scripts.',
      'Verify links in CI: internal link integrity must report 0 broken; external links re-checked weekly (report-only, because networks flake).',
      'Mark uncertainty honestly: unverifiable facts are "Unknown"; archived, discontinued, or renamed tools stay in the registry with an explicit status instead of being silently deleted.',
    ],
    architecture: {
      caption: 'Registry-to-site generation pipeline',
      steps: [
        { label: 'data/tools.yaml', note: 'Single source of truth — 102 tools' },
        { label: 'validate-data.py', note: 'Schema, enums, duplicates, references' },
        { label: 'generate-tool-pages.py', note: '40 detailed tool pages' },
        { label: 'generate-index.py', note: 'Indexes, comparisons, master matrix' },
        { label: 'check-links.py', note: 'Internal link integrity — 0 broken' },
        { label: 'check-external-links.py', note: 'Best-effort live URL check' },
        { label: 'CI — validate.yml', note: 'Regeneration parity + markdown lint' },
      ],
    },
    features: [
      '102 registered tools across 6 categories, each with a Last verified date (current pass: September 2026).',
      '40 detailed tool pages generated from the registry, 10 comparison guides, and 1 master matrix.',
      'Compatibility classification (Recommended / Usable with limitations / Not ideal) for a specific 8 GB RAM machine — derived from documented requirements and hardware reasoning, not personal benchmarks.',
      'Beginner and reference guides: autocomplete vs chat vs agent, BYOK, MCP, RAG, autonomy scale (L0–L5), AI coding security, hardware and student guides.',
      "Explicit lifecycle status — e.g., Roo Code's May 2026 shutdown and gpt-engineer's April 2026 archive are documented, never silently removed.",
      'CI enforces 0 validation errors, regeneration parity, internal link integrity, and markdown linting on every push; external links re-checked weekly.',
    ],
    decisions: [
      {
        title: 'Registry first, pages second',
        body: 'Generated files are never edited by hand. Contributors edit the registry and cite official sources — regeneration parity in CI fails the build if generated output drifts from the registry.',
      },
      {
        title: 'Unknown beats guessed',
        body: 'Anything that cannot be verified against an official source is marked Unknown. No benchmarks or statistics are invented; capability verdicts derive only from documented features.',
      },
      {
        title: 'Keep the dead tools',
        body: 'Discontinued, renamed, and acquired tools stay in the registry with explicit status flags — history is data, and deleting it would corrupt comparisons.',
      },
      {
        title: 'Transparency about AI involvement',
        body: 'The repository states plainly that research is AI-assisted, with human review against official sources before storage — disclosed as a process, not hidden.',
      },
    ],
    challenges: [
      {
        title: 'Keeping 100+ pages honest',
        body: 'Manual sync is impossible at this scale — solved with generation parity checks so CI fails whenever pages no longer match the registry.',
      },
      {
        title: 'External link rot',
        body: 'Live URL checks are noisy because networks fail; they run weekly and report-only, while deterministic internal link checks gate every push.',
      },
      {
        title: 'Pricing and platform drift',
        body: 'Advertised price ≠ total cost and features change monthly — mitigated by per-entry verification dates instead of pretending content is permanently true.',
      },
    ],
    outcome: [
      'A working content pipeline: 102 tools, 40 tool pages, 6 categories, 10 comparison guides, and 1 master matrix — all generated from one registry.',
      'CI-gated quality: validation with 0 errors, regeneration parity, internal link integrity, and markdown lint on every push.',
      'MIT-licensed so others can fork, correct, and build on the system.',
    ],
    lessons: [
      'Content scales like software when you give it a schema, a validator, and a generator.',
      'A "Last verified" date is more honest than an evergreen claim.',
      'The most valuable engineering in a knowledge base is the machinery that proves it is still true.',
    ],
    githubUrl: 'https://github.com/ali-raza-py/AI-HUB',
    images: [],
    featured: true,
  },
  {
    slug: 'code-yaar',
    index: '03',
    title: 'Code-Yaar',
    tagline:
      'Think. Build. Evolve. — a software engineering education platform, currently in disciplined definition phase.',
    tier: 'featured',
    category: 'Education · Platform',
    status: 'in-progress',
    statusLabel: 'Documentation phase',
    year: '2026',
    shortDescription:
      'A student-focused platform intended to move learners from passive tutorials to real projects and proof of work — documented before a line of product code is written.',
    description: [
      'Code-Yaar is being developed as a student-focused technology and software engineering platform intended to help learners move beyond passive tutorial consumption toward practical technical skills, real projects, and demonstrable outcomes.',
      'The product vision: help aspiring developers Learn, Build, and Prove. The intended audience is students and beginner-to-intermediate learners interested in programming, software engineering, computer science, AI/ML, and career-oriented learning.',
      'The repository currently contains no application implementation. It holds five product and engineering documents — a PRD, architecture, MVP roadmap, current-progress report, and AI coding rules — written deliberately so future progress is measurable instead of claimed.',
    ],
    role: 'Product definition, requirements, architecture planning, and progress-tracking system.',
    stack: [
      'Product documentation',
      'PRD',
      'Architecture planning',
      'MVP roadmap',
      'Status tracking',
    ],
    stackNote:
      'Target direction recorded in docs: Python, Next.js/React/TypeScript, Django, PostgreSQL, Supabase — no code exists yet.',
    problem: [
      'Many learners consume programming content without developing practical ability: tutorial dependence, limited project practice, weak problem-solving confidence, unclear next steps, and difficulty producing credible evidence of skill.',
      'Most education platforms promise outcomes they cannot prove. Starting Code-Yaar with an honest status system prevents that pattern from day one.',
    ],
    approach: [
      'Write the PRD, architecture, and roadmap first — scope drift is prevented by an approved MVP definition before any foundation work.',
      'Define a strict status vocabulary (Implemented / Verified / In Progress / Planned / Proposed / Deferred / Not Implemented / TBD) so every future claim must carry evidence.',
      'Center the product on one loop: Learn → Build → Prove — learning direction, hands-on practice, project work, proof of work, feedback, progression.',
      'Keep explicit non-goals: not a university replacement, not a social network, not a course marketplace, not a recruitment platform, not a full IDE.',
    ],
    architecture: {
      caption: 'Planned product loop (proposed — no code yet)',
      steps: [
        { label: 'Learning Direction', note: 'What to learn next' },
        { label: 'Learn', note: 'Guided content and concepts' },
        { label: 'Build', note: 'Hands-on practice and projects' },
        { label: 'Prove', note: 'Proof of work / portfolio evidence' },
        { label: 'Feedback & Progression', note: 'Review and next step' },
      ],
    },
    features: [
      'Product Requirements Document (v0.1, Draft) — problem framing, personas, user needs, value proposition, and functional requirements.',
      'Architecture document — records intended stack direction and states plainly what does not yet exist.',
      'MVP roadmap — four phases (Foundation → MVP → Validation → Expansion) with priorities, dependencies, and completion criteria.',
      'Current-progress report — a source-of-truth status table with evidence columns as observed on 2026-09-10.',
      'AI coding rules — boundaries for AI-assisted development on the project.',
    ],
    state: {
      implemented: [
        'Five-document product suite: PRD, architecture, MVP roadmap, current progress, AI coding rules.',
        'Status vocabulary and evidence-based progress tracking.',
        'Explicit MVP non-goals and scope exclusions.',
      ],
      inProgress: [
        'MVP definition and primary persona decision (flagged P0, awaiting product-owner decision).',
        'Architecture and stack decisions — direction recorded, nothing implemented.',
      ],
      planned: [
        'Repository foundation: source layout, package setup, basic checks.',
        'Learner entry point, first learning direction, hands-on practice, one meaningful build workflow, basic proof of work.',
        'Automated verification: tests, linting, type checking, build checks.',
        'Feedback workflow, progression tracking, community and AI assistance (post-MVP, proposed).',
      ],
    },
    decisions: [
      {
        title: 'Documentation before code',
        body: 'The first commit is a plan, not scaffolding. CURRENT-PROGRESS.md states honestly that no product feature exists in the codebase — planned work is never dressed up as shipped.',
      },
      {
        title: 'Evidence columns',
        body: 'Every status entry records where the claim is proven (which file, which test). A feature is only "Implemented" when code exists for it.',
      },
      {
        title: 'Named non-goals',
        body: 'University replacement, social network, course marketplace, recruitment platform, full IDE, and broad AI platform are explicitly excluded from initial scope.',
      },
      {
        title: 'No dates until they are real',
        body: 'The roadmap carries no deadlines because none have been decided — false dates create false pressure and dishonest reporting.',
      },
    ],
    challenges: [
      {
        title: 'Resisting premature scaffolding',
        body: 'The temptation with a platform idea is to create repositories and boilerplate immediately. The project instead holds until MVP scope is approved.',
      },
      {
        title: 'Keeping honesty as the brand',
        body: 'An education platform that overstates its own progress would contradict its own message — the status vocabulary exists to make overstatement structurally impossible.',
      },
    ],
    outcome: [
      'Complete, reviewed product documentation suite published publicly on GitHub.',
      'A measurable baseline: anyone can compare future progress against the 2026-09-10 status report.',
      'Clear MVP definition work queued as P0 with acceptance criteria — before any implementation begins.',
    ],
    lessons: [
      'Writing "no product feature exists" in your own progress report is the most credible thing a pre-launch project can do.',
      'A status vocabulary is an engineering tool — it turns future progress claims into checkable assertions.',
      'Scope discipline (what the product is not) defines a project faster than feature lists.',
    ],
    githubUrl: 'https://github.com/ali-raza-py/Code-Yaar',
    images: [],
    featured: true,
  },
  {
    slug: 'algorify',
    index: '04',
    title: 'Algorify',
    tagline: 'See the algorithm. Understand the motion. — an event-driven sorting laboratory built with Python, Dash, and Plotly.',
    tier: 'engineering',
    category: 'Algorithms · Visualization',
    status: 'shipped',
    statusLabel: 'Complete — deployed guides included',
    year: '2026',
    shortDescription:
      'Run a real sorting algorithm, pause its decisions, and inspect how an unordered array becomes ordered — with playback controls, a seekable timeline, exact metrics, and highlighted pseudocode.',
    description: [
      'Algorify is an event-driven sorting laboratory: a real algorithm runs once, emits a complete trace of events, and the interface replays that trace so every comparison, swap, and pivot can be inspected step by step.',
      'The editorial landing page, interactive canvas instrument, and light/dark laboratory are designed as one product — built for Data Structures and Python Programming study.',
      'Genuine bubble, selection, insertion, Lomuto quick, and merge sort — not animations that pretend to sort.',
    ],
    role: 'Algorithm engine, event model, visualization, playback system, and product design.',
    stack: [
      'Python 3.10+',
      'Dash',
      'Plotly',
      'Clientside JavaScript',
      'Pure-Python algorithm engine',
      'WSGI deployment',
    ],
    problem: [
      'Sorting is usually taught as code you read, not a process you watch with full control — most visualizations play too fast, skip detail, or fake the algorithm with scripted animations.',
      'Students need to pause mid-decision, step backward, read the exact operands and pseudocode line, and see honest counters — not a decorative bar dance.',
    ],
    approach: [
      'Compute the full trace once: Python validates input, runs the genuine algorithm, and emits independent JSON event snapshots stored in a browser-local Dash store.',
      'Replay, never recompute: a synchronous clientside playback reducer advances the precomputed trace — sorting logic never reruns on timer ticks.',
      'Treat the interface as an instrument: custom Plotly vertical bars with active-index indicators, final-position diamonds, pivot reference lines, exchange arrows, region boundaries, and insertion holes.',
      'Make state inspectable: exact comparison/swap/operation counters, event history, an execution DNA view of the last 180 events, live explanations, and highlighted pseudocode update together.',
    ],
      architecture: {
      caption: 'Trace pipeline — compute once, replay many',
      steps: [
        { label: 'Python input validation', note: 'Random or manual arrays, 1–48 values' },
        { label: 'Genuine sorting algorithm', note: 'Computed once per input/algorithm' },
        { label: 'JSON event snapshots', note: 'Independent events in a browser-local store' },
        { label: 'Clientside playback reducer', note: 'Synchronous — no recompute on ticks' },
        { label: 'Plotly figure + metrics + trace', note: 'Bars, counters, pseudocode, state' },
      ],
    },
    features: [
      'Genuine bubble, selection, insertion, Lomuto quick, and merge sort.',
      'Play/pause, single step, step backward, replay, reset, and a seekable execution timeline.',
      'Playback speeds 0.25×, 0.5×, 1×, 2×, 4× — at 1× each event lasts 360 ms and no events are skipped.',
      'Random arrays of 8, 16, 24, 32, or 48 values (default 32), plus validated manual input of 1–48 integers from −999 to 999 including duplicates, zeros, and negatives.',
      'Exact comparison, swap, and operation counters; event history; last-180-event execution DNA; live explanations; highlighted pseudocode.',
      'Custom Plotly bars with active-index indicators, final-position diamonds, pivot reference lines, exchange arrows, region boundaries, and insertion holes.',
      'Keyboard controls, focus indicators, descriptive graph text, mobile layouts, and reduced-motion support.',
    ],
    decisions: [
      {
        title: 'Compute once, replay forever',
        body: 'The algorithm runs a single time per input and emits a complete event trace. Playback never re-executes sorting logic — so playback is deterministic, seekable, and cheap.',
      },
      {
        title: 'Pure algorithm engine',
        body: 'algorithm_engine.py has no Dash dependency: each invocation owns its counters, workspace, and event list. The engine is testable independently of the UI framework.',
      },
      {
        title: 'Clientside synchronous playback',
        body: 'A single clientside callback advances the trace and updates every dependent visual together — avoiding server round-trips that would make stepping feel laggy.',
      },
      {
        title: 'Reset returns to the original array',
        body: 'Replay studies the same data honestly; a new array is always an explicit action, so algorithm comparisons on identical input stay possible.',
      },
    ],
    challenges: [
      {
        title: 'Stepping backward',
        body: 'Reverse navigation required designing the event model around immutable snapshots — every step must be reconstructable without re-running the algorithm.',
      },
      {
        title: 'Merge sort buffers',
        body: 'Merge operations read buffered operands that source bars may have already overwritten — the visualization had to track actual buffered values separately from bar positions.',
      },
      {
        title: 'Hidden tabs and timers',
        body: 'Timer ticks must not advance event positions when a tab is hidden, and invalid manual input must preserve the previous trace and pause any run.',
      },
    ],
    outcome: [
      'A working laboratory: five genuine algorithms with playback, seeking, exact metrics, execution history, and pseudocode — self-contained with no database, API, or credentials.',
      'Deployment paths documented for PythonAnywhere, Render, and Railway with a full verification checklist.',
      'Browser tests that check mobile overflow, catch console errors, and generate screenshots of home and lab views.',
    ],
    lessons: [
      'An event-snapshot model separates computation from presentation — and makes "step backward" possible at all.',
      'Exact counters turn Big-O from a formula into something you can watch happen.',
      'Building the algorithm yourself (Lomuto partition, merge buffers) is how the details stop being memorized and start being understood.',
    ],
    githubUrl: 'https://github.com/ali-raza-py/Algorify',
    images: [],
    featured: false,
  },
]

export const featuredProjects = projects.filter((project) => project.featured)
export const engineeringProjects = projects.filter(
  (project) => project.tier === 'engineering',
)

/** Smaller verified repositories — listed in the archive, linked straight to GitHub. */
export const experiments: Array<{
  name: string
  description: string
  language: string
  url: string
}> = [
  {
    name: 'C-Journey',
    description: 'C++ learning repository — exercises and progress through the language (MIT).',
    language: 'C++',
    url: 'https://github.com/ali-raza-py/C-Journey',
  },
  {
    name: 'Python-Bank_Management_system',
    description: 'Bank management system built in Python.',
    language: 'Python',
    url: 'https://github.com/ali-raza-py/Python-Bank_Management_system',
  },
  {
    name: 'OOP-IN-PYTHON',
    description: 'Object-oriented programming concepts worked through in Python.',
    language: 'Python',
    url: 'https://github.com/ali-raza-py/OOP-IN-PYTHON',
  },
  {
    name: 'Projects',
    description: 'Collection of GUI and CLI based projects.',
    language: 'Python',
    url: 'https://github.com/ali-raza-py/Projects',
  },
  {
    name: 'Steam-Up-Course',
    description: 'My whole course work (MIT).',
    language: 'Python',
    url: 'https://github.com/ali-raza-py/Steam-Up-Course',
  },
  {
    name: 'developer-portfolio',
    description: 'The source of this portfolio site.',
    language: 'HTML',
    url: 'https://github.com/ali-raza-py/developer-portfolio',
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}