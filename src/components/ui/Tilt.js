import { useRef } from "react";

// Pointer-driven 3D tilt for cards. Writes --rx / --ry (degrees) and
// --mx / --my (pointer position, for a moving highlight); the CSS decides how
// to use them and disables the effect under reduced motion.
export default function Tilt({ as: Tag = "div", max = 6, children, ...rest }) {
  const ref = useRef(null);

  const move = (event) => {
    if (event.pointerType !== "mouse") return;
    const node = ref.current;
    const box = node.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width;
    const y = (event.clientY - box.top) / box.height;
    node.style.setProperty("--ry", `${(x - 0.5) * max * 2}deg`);
    node.style.setProperty("--rx", `${(0.5 - y) * max * 2}deg`);
    node.style.setProperty("--mx", `${x * 100}%`);
    node.style.setProperty("--my", `${y * 100}%`);
  };

  const leave = () => {
    const node = ref.current;
    node.style.setProperty("--rx", "0deg");
    node.style.setProperty("--ry", "0deg");
  };

  return (
    <Tag ref={ref} data-tilt="" onPointerMove={move} onPointerLeave={leave} {...rest}>
      {children}
    </Tag>
  );
}
