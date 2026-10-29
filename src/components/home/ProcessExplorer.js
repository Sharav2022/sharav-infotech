import { useId, useRef, useState } from "react";
import { PROCESS } from "../../content/home";
import classes from "./ProcessExplorer.module.css";

// Discover → Evolve, as an accessible tab interface. The track doubles as a
// progress line: stages up to the selected one are drawn as "complete".
export default function ProcessExplorer() {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const [active, setActive] = useState(0);
  const tabsRef = useRef(null);
  const stage = PROCESS[active];

  const onKeyDown = (event) => {
    const keys = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    let next;
    if (event.key in keys) next = (active + keys[event.key] + PROCESS.length) % PROCESS.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = PROCESS.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    tabsRef.current?.querySelectorAll('[role="tab"]')[next]?.focus();
  };

  return (
    <div className={classes.explorer}>
      <div
        ref={tabsRef}
        role="tablist"
        aria-label="Delivery stages"
        className={classes.track}
        onKeyDown={onKeyDown}
        style={{ "--progress": active / (PROCESS.length - 1) }}
      >
        <span className={classes.rail} aria-hidden="true">
          <span className={classes.railFill} />
        </span>
        {PROCESS.map((item, index) => (
          <button
            key={item.id}
            id={`${uid}-tab-${item.id}`}
            type="button"
            role="tab"
            aria-selected={index === active}
            aria-controls={`${uid}-panel`}
            tabIndex={index === active ? 0 : -1}
            className={classes.step}
            data-complete={index <= active || undefined}
            onClick={() => setActive(index)}
          >
            <span className={classes.node} aria-hidden="true" />
            <span className={classes.stepIndex}>0{index + 1}</span>
            <span className={classes.stepTitle}>{item.title}</span>
          </button>
        ))}
      </div>

      <div
        id={`${uid}-panel`}
        role="tabpanel"
        aria-labelledby={`${uid}-tab-${stage.id}`}
        className={classes.panel}
        key={stage.id}
      >
        <div className={classes.panelHead}>
          <span className={classes.bigIndex} aria-hidden="true">
            0{active + 1}
          </span>
          <h3 className={classes.panelTitle}>{stage.title}</h3>
        </div>
        <dl className={classes.details}>
          <div>
            <dt className="label">The work</dt>
            <dd>{stage.work}</dd>
          </div>
          <div>
            <dt className="label">The value</dt>
            <dd>{stage.value}</dd>
          </div>
          <div>
            <dt className="label">Output</dt>
            <dd className={classes.output}>{stage.output}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
