import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    const trailsContainer = trailsRef.current;
    if (!cursor || !follower || !trailsContainer) return;

    const pos = { x: 0, y: 0 };
    const vel = { x: 0, y: 0 };
    const prevPos = { x: 0, y: 0 };
    const speed = { value: 0 };
    let hovering = false;

    // Create trail dots pool
    const TRAIL_COUNT = 12;
    const trails: HTMLDivElement[] = [];
    for (let i = 0; i < TRAIL_COUNT; i++) {
      const dot = document.createElement("div");
      dot.className = "pointer-events-none fixed top-0 left-0 z-[9997] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen";
      const size = 6 - i * 0.3;
      dot.style.width = `${size}px`;
      dot.style.height = `${size}px`;
      dot.style.backgroundColor = `rgba(34, 211, 238, ${0.8 - i * 0.05})`; // cyan-400 equivalent
      dot.style.boxShadow = `0 0 ${10 - i}px rgba(34, 211, 238, 0.5)`;
      trailsContainer.appendChild(dot);
      trails.push(dot);
    }

    const trailPositions = trails.map(() => ({ x: 0, y: 0 }));

    const onMove = (e: MouseEvent) => {
      prevPos.x = pos.x;
      prevPos.y = pos.y;
      pos.x = e.clientX;
      pos.y = e.clientY;

      const dx = pos.x - prevPos.x;
      const dy = pos.y - prevPos.y;
      speed.value = Math.min(Math.sqrt(dx * dx + dy * dy), 150);

      // Stretch cursor based on velocity
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      const scaleX = 1 + speed.value * 0.008;
      const scaleY = 1 - speed.value * 0.003;

      gsap.to(cursor, {
        x: pos.x,
        y: pos.y,
        rotation: hovering ? 0 : angle,
        scaleX: hovering ? 3 : scaleX,
        scaleY: hovering ? 3 : scaleY,
        duration: 0.1,
        ease: "power2.out",
      });
    };

    const onEnterInteractive = () => {
      hovering = true;
      gsap.to(cursor, { scale: 3, opacity: 0.5, duration: 0.3 });
      gsap.to(follower, { scale: 1.5, duration: 0.3 });
    };

    const onLeaveInteractive = () => {
      hovering = false;
      gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 });
      gsap.to(follower, { scale: 1, duration: 0.3 });
    };

    // Follower + trail with spring physics
    gsap.ticker.add(() => {
      const dt = 1 - Math.pow(0.08, gsap.ticker.deltaRatio());
      vel.x += (pos.x - vel.x) * dt;
      vel.y += (pos.y - vel.y) * dt;

      // Follower rotation based on movement direction
      const fdx = pos.x - vel.x;
      const fdy = pos.y - vel.y;
      const dist = Math.sqrt(fdx * fdx + fdy * fdy);
      const followerScale = 1 + dist * 0.003;

      gsap.set(follower, {
        x: vel.x,
        y: vel.y,
        scaleX: followerScale,
        scaleY: 2 - followerScale,
      });

      // Trail with cascading delay
      for (let i = 0; i < TRAIL_COUNT; i++) {
        const prev = i === 0 ? { x: vel.x, y: vel.y } : trailPositions[i - 1];
        const ease = 0.12 - i * 0.006;
        trailPositions[i].x += (prev.x - trailPositions[i].x) * ease;
        trailPositions[i].y += (prev.y - trailPositions[i].y) * ease;
        gsap.set(trails[i], { x: trailPositions[i].x, y: trailPositions[i].y });
      }
    });

    window.addEventListener("mousemove", onMove);

    const setupInteractives = () => {
      const interactives = document.querySelectorAll("a, button, [data-magnetic]");
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", onEnterInteractive);
        el.addEventListener("mouseleave", onLeaveInteractive);
      });
      return interactives;
    };

    const interactives = setupInteractives();

    // Click ripple effect
    const onClick = (e: MouseEvent) => {
      const ripple = document.createElement("div");
      ripple.className = "pointer-events-none fixed z-[9996] -translate-x-1/2 -translate-y-1/2 rounded-full border mix-blend-screen";
      ripple.style.left = "0px";
      ripple.style.top = "0px";
      ripple.style.width = "10px";
      ripple.style.height = "10px";
      ripple.style.borderColor = "rgba(168, 85, 247, 0.8)"; // purple-500 equivalent
      ripple.style.boxShadow = "0 0 15px rgba(168, 85, 247, 0.5)";
      document.body.appendChild(ripple);

      gsap.set(ripple, { x: e.clientX, y: e.clientY });
      gsap.to(ripple, {
        width: 300,
        height: 300,
        opacity: 0,
        borderWidth: 0,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => ripple.remove(),
      });

      // Second ring
      const ripple2 = ripple.cloneNode() as HTMLDivElement;
      document.body.appendChild(ripple2);
      gsap.set(ripple2, { x: e.clientX, y: e.clientY });
      gsap.to(ripple2, {
        width: 200,
        height: 200,
        opacity: 0,
        borderWidth: 0,
        duration: 0.6,
        delay: 0.1,
        ease: "power2.out",
        onComplete: () => ripple2.remove(),
      });
    };
    window.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterInteractive);
        el.removeEventListener("mouseleave", onLeaveInteractive);
      });
      trails.forEach((t) => t.remove());
    };
  }, []);

  return (
    <>
      {/* Cursor dot — dynamic glowing neon dot */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
        style={{ width: 14, height: 14 }}
      >
        <div className="h-full w-full rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 shadow-[0_0_10px_2px_rgba(168,85,247,0.8)]" />
      </div>
      {/* Follower ring — neon glowing ring */}
      <div
        ref={followerRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
        style={{ width: 44, height: 44 }}
      >
        <div className="h-full w-full rounded-full border-[2px] border-cyan-400 opacity-60 shadow-[0_0_15px_rgba(34,211,238,0.6)]" />
      </div>
      {/* Trail container */}
      <div ref={trailsRef} />
    </>
  );
}
