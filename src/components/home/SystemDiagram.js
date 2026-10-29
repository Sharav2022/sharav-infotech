import { useEffect, useId, useRef, useState } from "react";
import classes from "./SystemDiagram.module.css";

// An illustrative reference architecture. Each stage highlights the parts of a
// system that the corresponding stage of Sharav's delivery work touches.

const NODES = [
  { id: "experience", kind: "UI", label: "Experience layer", x: 40, y: 40, w: 200, h: 64 },
  { id: "integrations", kind: "EXT", label: "Integrations", x: 360, y: 40, w: 200, h: 64 },
  { id: "api", kind: "API", label: "API gateway", x: 56, y: 190, w: 168, h: 56 },
  { id: "services", kind: "SVC", label: "Application services", x: 376, y: 190, w: 168, h: 56 },
  { id: "monitor", kind: "OBS", label: "Monitoring", x: 56, y: 300, w: 168, h: 56 },
  { id: "data", kind: "DB", label: "Data store", x: 376, y: 300, w: 168, h: 56 },
  { id: "pipeline", kind: "CI", label: "Delivery pipeline", x: 190, y: 428, w: 220, h: 52 },
];

const EDGES = [
  { id: "e1", d: "M140 104V190" },
  { id: "e2", d: "M224 218H376" },
  { id: "e3", d: "M460 190V104" },
  { id: "e4", d: "M460 246V300" },
  { id: "e5", d: "M376 328H224" },
  { id: "e6", d: "M300 428V392" },
];

const STAGES = [
  {
    id: "design",
    label: "Design",
    nodes: ["experience"],
    edges: ["e1"],
    caption: "User journeys, interface and interaction design define the experience layer.",
  },
  {
    id: "architect",
    label: "Architect",
    nodes: ["api", "services", "data", "integrations"],
    edges: ["e2", "e3", "e4"],
    caption: "Services, data and integrations are shaped for scale, security and change.",
  },
  {
    id: "validate",
    label: "Build & validate",
    nodes: ["pipeline", "services", "api"],
    edges: ["e6", "e2"],
    caption: "Every change is built, tested and validated before it reaches production.",
  },
  {
    id: "operate",
    label: "Operate",
    nodes: ["monitor", "data", "services"],
    edges: ["e5", "e4"],
    caption: "After launch the system is monitored, patched, reported on and evolved.",
  },
];

const STAGE_MS = 4200;

export default function SystemDiagram() {
  const rawId = useId();
  const uid = rawId.replace(/[^a-zA-Z0-9]/g, "");
  const rootRef = useRef(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [userControlled, setUserControlled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(true);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const node = rootRef.current;
    if (!node || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const cycling = !paused && !userControlled && visible && !reducedMotion;

  useEffect(() => {
    if (!cycling) return;
    const timer = setInterval(() => setActive((i) => (i + 1) % STAGES.length), STAGE_MS);
    return () => clearInterval(timer);
  }, [cycling]);

  const stage = STAGES[active];

  const select = (index) => {
    setUserControlled(true);
    setActive(index);
  };

  const onTabKey = (event) => {
    const delta = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
    if (delta === undefined) return;
    event.preventDefault();
    const next = (active + delta + STAGES.length) % STAGES.length;
    select(next);
    rootRef.current?.querySelector(`[data-stage-index="${next}"]`)?.focus();
  };

  return (
    <figure
      ref={rootRef}
      className={classes.frame}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <div className={classes.chrome}>
        <span className={classes.dots} aria-hidden="true">
          <i /> <i /> <i />
        </span>
        <span className="label">Reference architecture</span>
        <span className={`label ${classes.status}`} data-live={cycling || undefined}>
          {cycling ? "Live" : "Paused"}
        </span>
      </div>

      <svg
        className={classes.svg}
        viewBox="0 0 600 500"
        role="img"
        aria-labelledby={`${uid}-title ${uid}-desc`}
      >
        <title id={`${uid}-title`}>Illustrative system architecture</title>
        <desc id={`${uid}-desc`}>
          An experience layer connects through an API gateway to application
          services in a cloud platform, which use a data store and external
          integrations, are deployed by a delivery pipeline and observed by
          monitoring. Currently highlighted: {stage.label}.
        </desc>

        <defs>
          <pattern id={`${uid}-dots`} width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" className={classes.gridDot} />
          </pattern>
        </defs>

        <rect width="600" height="500" fill={`url(#${uid}-dots)`} />

        <g className={classes.boundary} data-active={stage.id === "architect" || undefined}>
          <rect x="24" y="150" width="552" height="242" rx="10" />
          <text x="40" y="172" className={classes.boundaryLabel}>
            CLOUD PLATFORM
          </text>
        </g>

        {EDGES.map((edge) => {
          const on = stage.edges.includes(edge.id);
          return (
            <g key={edge.id}>
              <path id={`${uid}-${edge.id}`} d={edge.d} className={classes.edge} data-active={on || undefined} />
              {on && !reducedMotion && (
                <circle r="3.5" className={classes.packet}>
                  <animateMotion dur="1.6s" repeatCount="indefinite" calcMode="spline" keyTimes="0;1" keySplines="0.4 0 0.2 1">
                    <mpath href={`#${uid}-${edge.id}`} />
                  </animateMotion>
                </circle>
              )}
            </g>
          );
        })}

        {NODES.map((node) => {
          const on = stage.nodes.includes(node.id);
          return (
            <g key={node.id} className={classes.node} data-active={on || undefined}>
              <rect x={node.x} y={node.y} width={node.w} height={node.h} rx="6" />
              <text x={node.x + 16} y={node.y + 22} className={classes.kind}>
                {node.kind}
              </text>
              <text x={node.x + 16} y={node.y + node.h - 16} className={classes.nodeLabel}>
                {node.label}
              </text>
              <circle cx={node.x + node.w - 16} cy={node.y + 18} r="3.5" className={classes.indicator} />
            </g>
          );
        })}
      </svg>

      <figcaption className={classes.inspector}>
        <div role="tablist" aria-label="Delivery stages" className={classes.tabs} onKeyDown={onTabKey}>
          {STAGES.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              data-stage-index={index}
              aria-selected={index === active}
              aria-controls={`${uid}-caption`}
              tabIndex={index === active ? 0 : -1}
              className={classes.tab}
              onClick={() => select(index)}
            >
              <span className={classes.tabIndex}>0{index + 1}</span>
              {item.label}
              {index === active && cycling && (
                <span key={active} className={classes.progress} style={{ animationDuration: `${STAGE_MS}ms` }} />
              )}
            </button>
          ))}
        </div>
        <p id={`${uid}-caption`} role="tabpanel" className={classes.caption} aria-live="polite">
          {stage.caption}
        </p>
      </figcaption>
    </figure>
  );
}
