import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { FiArrowRight, FiCheck, FiChevronDown, FiGithub, FiPlay, FiTerminal } from "react-icons/fi";

const features = [
  [
    "01",
    "AI Coding",
    "Turn intent into production-ready code with context-aware assistance across the whole workspace.",
  ],
  [
    "02",
    "Agent Mode",
    "Delegate multi-step work to an agent that can inspect, edit, run, test, and explain changes.",
  ],
  [
    "03",
    "Terminal",
    "A terminal that lives beside your editor, so your feedback loop never leaves the workspace.",
  ],
  [
    "04",
    "Git & GitHub",
    "Review diffs, manage branches, and keep every AI-assisted change close to version control.",
  ],
  [
    "05",
    "Cloud Workspaces",
    "Pick up your work from a focused, browser-first environment built for momentum.",
  ],
  [
    "06",
    "Engine architecture",
    "A flexible foundation for connecting the coding models and runtimes your team already uses.",
  ],
] as const;

const faqs = [
  [
    "Is CORTEX an IDE or an AI assistant?",
    "Both. CORTEX brings the editor, terminal, Git context, and agent workflows together in one workspace.",
  ],
  [
    "Can I use my existing coding agents?",
    "CORTEX is designed around an engine architecture that can connect to supported runtimes and providers. Availability depends on your deployment.",
  ],
  [
    "Is my code sent to CORTEX?",
    "CORTEX is web-first, but provider authentication and model behavior remain controlled by the runtimes you connect. Review your deployment configuration before enabling production access.",
  ],
  [
    "What is included in the plans?",
    "The plan cards are intentionally positioned as a starting point. Final limits and paid entitlements should be configured before launch.",
  ],
];

function CortexMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={compact ? "cortex-mark cortex-mark--compact" : "cortex-mark"}>
      <span className="cortex-mark__glyph">✦</span>
      <span>CORTEX</span>
    </span>
  );
}

function IdePreview() {
  return (
    <div className="ide-preview" aria-label="CORTEX IDE preview">
      <div className="ide-preview__topbar">
        <div className="ide-preview__dots">
          <i />
          <i />
          <i />
        </div>
        <span>cortex / workspaces / launch.ts</span>
        <span className="ide-preview__status">● connected</span>
      </div>
      <div className="ide-preview__body">
        <aside className="ide-preview__sidebar">
          <div className="ide-preview__sidebar-brand">C</div>
          <div className="ide-preview__side-icons">
            ⌘<br />◫<br />⌁<br />⚙
          </div>
        </aside>
        <div className="ide-preview__files">
          <strong>WORKSPACE</strong>
          <span>⌄ src</span>
          <span className="active">◈ launch.ts</span>
          <span>◇ app.tsx</span>
          <span>◇ engine.ts</span>
          <span>⌄ tests</span>
          <span>◇ launch.test.ts</span>
          <div className="ide-preview__agent">
            <span className="agent-dot" /> AGENT MODE <b>LIVE</b>
          </div>
        </div>
        <div className="ide-preview__editor">
          <div className="ide-preview__tabs">
            <span className="selected">launch.ts</span>
            <span>engine.ts</span>
            <span>+ </span>
          </div>
          <pre>
            <em>01</em> <b>import</b> {"{"} createWorkspace {"}"} <b>from</b> <u>"@cortex/core"</u>
            {"\n"}
            <em>02</em>
            {"\n"}
            <em>03</em> <b>const</b> workspace = <b>await</b> createWorkspace({"{"}
            {"\n"}
            <em>04</em> name: <u>"product-launch"</u>,{"\n"}
            <em>05</em> agent: <u>"cortex-coder"</u>,{"\n"}
            <em>06</em> {"}"});{"\n"}
            <em>07</em>
            {"\n"}
            <em>08</em> <b>await</b> workspace.run(<u>"ship the first slice"</u>);
          </pre>
          <div className="ide-preview__cursor" />
        </div>
        <aside className="ide-preview__chat">
          <div className="ide-preview__chat-label">
            <span className="agent-dot" /> CORTEX AGENT <span>•••</span>
          </div>
          <p>I've mapped the workspace and found the best entry point.</p>
          <div className="ide-preview__task">
            <span>✓</span> Inspect repository
          </div>
          <div className="ide-preview__task">
            <span>✓</span> Create implementation plan
          </div>
          <div className="ide-preview__task ide-preview__task--active">
            <span>◌</span> Build and run tests
          </div>
          <div className="ide-preview__prompt">
            Ask CORTEX anything <FiArrowRight />
          </div>
        </aside>
      </div>
      <div className="ide-preview__terminal">
        <span>
          <FiTerminal /> TERMINAL
        </span>
        <span>main ✓</span>
        <code>$ npm run test -- --watch</code>
        <small>
          {" "}
          PASS src/launch.test.ts <b>✓ 12 tests</b>
        </small>
      </div>
    </div>
  );
}

export function MarketingLanding() {
  const [openFaq, setOpenFaq] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeMobileMenu = () => setMobileMenuOpen(false);
  return (
    <main className="marketing-shell">
      <nav className="marketing-nav">
        <Link to="/" className="marketing-logo">
          <CortexMark />
        </Link>
        <div className="marketing-links">
          <a href="#product">Product</a>
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#resources">Resources</a>
        </div>
        <div className="marketing-actions">
          <Link to="/sign-in" className="marketing-signin">
            Sign in
          </Link>
          <Link to="/sign-up" className="button button--small">
            Get started <FiArrowRight />
          </Link>
        </div>
        <button
          className="marketing-menu"
          type="button"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          ☰
        </button>
      </nav>
      {mobileMenuOpen && (
        <div className="marketing-mobile-panel">
          <a href="#product" onClick={closeMobileMenu}>
            Product
          </a>
          <a href="#features" onClick={closeMobileMenu}>
            Features
          </a>
          <a href="#pricing" onClick={closeMobileMenu}>
            Pricing
          </a>
          <a href="#resources" onClick={closeMobileMenu}>
            Resources
          </a>
          <Link to="/sign-in" onClick={closeMobileMenu}>
            Sign in
          </Link>
        </div>
      )}
      <section className="marketing-hero" id="product">
        <div className="marketing-hero__glow" />
        <div className="eyebrow">
          <span className="eyebrow__dot" /> THE AI DEVELOPMENT WORKSPACE
        </div>
        <h1>
          Build what’s next,
          <br />
          <span>with an agent on your side.</span>
        </h1>
        <p>
          CORTEX brings AI coding, agent mode, terminal, Git, and your workspace into one focused
          place to turn ideas into shipped software.
        </p>
        <div className="hero-actions">
          <Link to="/sign-up" className="button">
            Get started <FiArrowRight />
          </Link>
          <a href="#how-it-works" className="button button--ghost">
            <FiPlay /> See how it works
          </a>
        </div>
        <div className="hero-note">
          <span className="avatar-stack">
            <i /> <i /> <i />
          </span>{" "}
          Built for the way modern teams ship <span className="hero-note__line" /> Web-first ·
          Git-native
        </div>
      </section>
      <section className="preview-section">
        <IdePreview />
      </section>
      <section className="signal-row">
        <div>
          <b>01</b>
          <span>One workspace</span>
        </div>
        <div>
          <b>02</b>
          <span>Context-aware agents</span>
        </div>
        <div>
          <b>03</b>
          <span>From idea to deploy</span>
        </div>
      </section>
      <section className="section-block section-block--features" id="features">
        <div className="section-heading">
          <div>
            <div className="eyebrow">WHY CORTEX</div>
            <h2>
              The shortest path from
              <br />
              <span>thought to working code.</span>
            </h2>
          </div>
          <p>
            Everything you need to move fast without losing the thread. CORTEX keeps your code,
            agent, and feedback loop in the same frame.
          </p>
        </div>
        <div className="feature-grid">
          {features.map(([number, title, description]) => (
            <article className="feature-card" key={title}>
              <span className="feature-card__number">{number}</span>
              <div className="feature-card__icon">
                {title === "Terminal" ? (
                  <FiTerminal />
                ) : title === "Git & GitHub" ? (
                  <FiGithub />
                ) : (
                  "✦"
                )}
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
              <a href="#how-it-works">
                Explore <FiArrowRight />
              </a>
            </article>
          ))}
        </div>
      </section>
      <section className="workflow-section" id="how-it-works">
        <div className="eyebrow">HOW IT WORKS</div>
        <h2>
          Idea in.
          <br />
          <span>Software out.</span>
        </h2>
        <p>
          Stay in flow while CORTEX handles the connective tissue between a good idea and a reliable
          release.
        </p>
        <div className="workflow-steps">
          {["Idea", "Agent", "Code", "Test", "Git", "Deploy"].map((step, index) => (
            <div className="workflow-step" key={step}>
              <span>0{index + 1}</span>
              <b>{step}</b>
              {index < 5 && <FiArrowRight />}
            </div>
          ))}
        </div>
      </section>
      <section className="engine-section">
        <div className="engine-section__copy">
          <div className="eyebrow">THE CORTEX ENGINE</div>
          <h2>
            Your codebase has a<br />
            <span>new kind of teammate.</span>
          </h2>
          <p>
            Agent Mode is built to work with your real workspace: inspect the code, make a plan, run
            the terminal, test the change, and show you what happened.
          </p>
          <div className="engine-points">
            <div>
              <FiCheck /> Context before action
            </div>
            <div>
              <FiCheck /> Visible, reviewable changes
            </div>
            <div>
              <FiCheck /> Built for existing runtimes
            </div>
          </div>
        </div>
        <div className="engine-orbit">
          <div className="orbit-ring orbit-ring--one" />
          <div className="orbit-ring orbit-ring--two" />
          <div className="orbit-core">
            ✦
            <small>
              AGENT
              <br />
              MODE
            </small>
          </div>
          <span className="orbit-label orbit-label--top">CONTEXT</span>
          <span className="orbit-label orbit-label--right">EXECUTE</span>
          <span className="orbit-label orbit-label--bottom">VERIFY</span>
          <span className="orbit-label orbit-label--left">SHIP</span>
        </div>
      </section>
      <section className="founder-section" id="founder">
        <div className="founder-section__photo-wrap">
          <div className="founder-section__photo-frame">
            <img
              src="/cortex-founder.jpeg"
              alt="The founder and creator of CORTEX"
              className="founder-section__photo"
            />
          </div>
          <span className="founder-section__stamp">CORTEX / ORIGIN 01</span>
        </div>
        <div className="founder-section__copy">
          <div className="eyebrow">THE PERSON BEHIND CORTEX</div>
          <h2>
            Built from a<br />
            <span>founder’s vision.</span>
          </h2>
          <p>
            CORTEX is created by the person pictured here: a founder focused on making software
            development more direct, more human, and more capable with AI.
          </p>
          <div className="founder-section__signature">
            <span className="founder-section__line" />
            <span>Founder &amp; creator of CORTEX</span>
          </div>
        </div>
      </section>
      <section className="pricing-section" id="pricing">
        <div className="section-heading section-heading--center">
          <div className="eyebrow">SIMPLE BY DESIGN</div>
          <h2>
            Start focused.
            <br />
            <span>Scale when ready.</span>
          </h2>
          <p>
            Plans are a clear starting point while CORTEX evolves. Configure final limits and
            entitlements for your deployment.
          </p>
        </div>
        <div className="pricing-grid">
          {[
            [
              "Free",
              "$0",
              "For exploring the CORTEX workflow",
              ["Core workspace", "AI coding preview", "Git-native flow"],
            ],
            [
              "Pro",
              "$20",
              "For builders shipping every week",
              ["Everything in Free", "Expanded agent usage", "Priority workspace features"],
            ],
            [
              "Team",
              "Let’s talk",
              "For teams building together",
              ["Shared workspaces", "Team controls", "Deployment guidance"],
            ],
          ].map(([name, price, description, items], index) => (
            <article
              className={`pricing-card ${index === 1 ? "pricing-card--featured" : ""}`}
              key={name as string}
            >
              {index === 1 && <div className="pricing-card__tag">MOST POPULAR</div>}
              <h3>{name}</h3>
              <div className="pricing-card__price">
                {price}
                {price !== "Let’s talk" && <small>/ mo</small>}
              </div>
              <p>{description}</p>
              <Link
                to="/sign-up"
                className={index === 1 ? "button button--full" : "button button--outline"}
              >
                {name === "Team" ? "Talk to us" : "Get started"} <FiArrowRight />
              </Link>
              <ul>
                {(items as string[]).map((item) => (
                  <li key={item}>
                    <FiCheck /> {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
      <section className="faq-section" id="resources">
        <div className="section-heading">
          <div>
            <div className="eyebrow">FAQ</div>
            <h2>
              Questions,
              <br />
              <span>answered.</span>
            </h2>
          </div>
          <p>
            Still curious? We’re building the documentation and community around the real CORTEX
            workflow.
          </p>
        </div>
        <div className="faq-list">
          {faqs.map(([question, answer], index) => (
            <div className={`faq-item ${openFaq === index ? "faq-item--open" : ""}`} key={question}>
              <button onClick={() => setOpenFaq(openFaq === index ? -1 : index)}>
                <span>{question}</span>
                <FiChevronDown />
              </button>
              {openFaq === index && <p>{answer}</p>}
            </div>
          ))}
        </div>
      </section>
      <section className="final-cta">
        <div className="eyebrow">READY WHEN YOU ARE</div>
        <h2>
          Start building with
          <br />
          <span>CORTEX.</span>
        </h2>
        <p>Your next idea deserves a workspace that can keep up.</p>
        <Link to="/sign-up" className="button">
          Get started <FiArrowRight />
        </Link>
      </section>
      <footer className="marketing-footer">
        <Link to="/" className="marketing-logo">
          <CortexMark compact />
        </Link>
        <span>© 2026 CORTEX. Built for the next build.</span>
        <div>
          <a href="#product">Product</a>
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a
            href="https://github.com/Frankenstein-Labs/CORTEX_IDE"
            target="_blank"
            rel="noreferrer"
          >
            <FiGithub /> GitHub
          </a>
        </div>
      </footer>
    </main>
  );
}

export { CortexMark };
