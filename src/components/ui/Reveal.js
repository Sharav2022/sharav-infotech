import { useEffect, useRef } from "react";

// Fades content in once as it enters the viewport. Content is fully visible
// without JavaScript and when the user prefers reduced motion (see globals.css).
export default function Reveal({ as: Tag = "div", delay = 0, children, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!("IntersectionObserver" in window)) {
      node.dataset.reveal = "visible";
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.dataset.reveal = "visible";
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      style={delay ? { "--reveal-delay": `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
