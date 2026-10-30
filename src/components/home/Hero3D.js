import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import classes from "./Hero3D.module.css";

// The hero's "Glass Core" scene. A pre-rendered poster of the same scene shows
// immediately (and is all that low-power, reduced-motion or no-WebGL visitors
// get); capable devices then upgrade to the live Three.js scene, which is
// loaded lazily so it never delays the first paint.
const START_TIME = 4.2; // matches the frame used for the poster render
const CAMERA = [0, 0.6, 9.2];

function canRunLiveScene() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (navigator.connection?.saveData) return false;
  const lowPower = (navigator.hardwareConcurrency || 8) <= 4 && (navigator.deviceMemory || 8) <= 4;
  if (lowPower) return false;
  try {
    return !!document.createElement("canvas").getContext("webgl2");
  } catch {
    return false;
  }
}

export default function Hero3D() {
  const frameRef = useRef(null);
  const canvasRef = useRef(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    if (!canRunLiveScene()) return;
    let disposed = false;
    let cleanup = () => {};

    const start = async () => {
      const [{ createStudio, disposeScene }, { buildHeroScene }] = await Promise.all([
        import("../../three/studio.js"),
        import("../../three/heroScene.js"),
      ]);
      if (disposed) return;

      const frame = frameRef.current;
      const canvas = canvasRef.current;
      const { width, height } = frame.getBoundingClientRect();
      const studio = createStudio({
        canvas,
        width,
        height,
        pixelRatio: Math.min(window.devicePixelRatio || 1, 1.75),
      });
      studio.camera.position.set(...CAMERA);
      studio.camera.lookAt(0, 0, 0);
      const hero = buildHeroScene(studio);

      let visible = true;
      let raf = 0;
      let last = performance.now();
      let t = START_TIME;

      const render = (now) => {
        t += Math.min((now - last) / 1000, 0.05);
        last = now;
        hero.update(t);
        studio.renderer.render(studio.scene, studio.camera);
        raf = visible ? requestAnimationFrame(render) : 0;
      };

      const resize = () => {
        const box = frame.getBoundingClientRect();
        studio.renderer.setSize(box.width, box.height, false);
        studio.camera.aspect = box.width / box.height;
        studio.camera.updateProjectionMatrix();
      };
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(frame);

      const visibility = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting && !document.hidden;
        if (visible && !raf) {
          last = performance.now();
          raf = requestAnimationFrame(render);
        }
      });
      visibility.observe(frame);

      const onPointer = (event) => {
        const box = frame.getBoundingClientRect();
        hero.pointer.set(
          ((event.clientX - box.left) / box.width) * 2 - 1,
          -(((event.clientY - box.top) / box.height) * 2 - 1)
        );
      };
      const onLeave = () => hero.pointer.set(0, 0);
      frame.addEventListener("pointermove", onPointer);
      frame.addEventListener("pointerleave", onLeave);

      // Reveal the canvas only once a real frame exists, so there is no flash.
      hero.update(t);
      studio.renderer.render(studio.scene, studio.camera);
      raf = requestAnimationFrame((now) => {
        last = now;
        setLive(true);
        render(now);
      });

      cleanup = () => {
        cancelAnimationFrame(raf);
        resizeObserver.disconnect();
        visibility.disconnect();
        frame.removeEventListener("pointermove", onPointer);
        frame.removeEventListener("pointerleave", onLeave);
        disposeScene(studio.scene);
        studio.pmrem.dispose();
        studio.renderer.dispose();
      };
    };

    // Defer until the browser is idle so the scene never competes with first paint.
    const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 300));
    const handle = idle(() => start().catch(() => setLive(false)));

    return () => {
      disposed = true;
      (window.cancelIdleCallback || clearTimeout)(handle);
      cleanup();
    };
  }, []);

  return (
    <div ref={frameRef} className={classes.frame} data-live={live || undefined}>
      <Image
        src="/images/3d/hero.webp"
        alt=""
        fill
        priority
        sizes="(min-width: 1024px) 50vw, 100vw"
        className={classes.poster}
      />
      <canvas ref={canvasRef} className={classes.canvas} aria-hidden="true" />
      <span className="visually-hidden">
        Illustration: a faceted glass core surrounded by orbiting application
        modules, each connected to the core.
      </span>
    </div>
  );
}
