import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CustomCursor from "../components/CustomCursor";
import MagneticButton from "../components/MagneticButton";

import nebulaImg from "../assets/project-nebula.jpg";
import fluxImg from "../assets/project-flux.jpg";
import meridianImg from "../assets/project-meridian.jpg";
import onyxImg from "../assets/project-onyx.jpg";
import prismImg from "../assets/project-prism.jpg";
import auroraImg from "../assets/project-aurora.jpg";
import abyssImg from "../assets/project-abyss.jpg";
import paradoxImg from "../assets/project-paradox.jpg";
import heroBgImg from "../assets/hero-bg.jpg";
import teamImg from "../assets/team-studio.jpg";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "STUDIO — Projects" },
      { name: "description", content: "Selected work from our studio." },
    ],
  }),
});

const PROJECTS = [
  { title: "Nebula", category: "Brand", img: nebulaImg },
  { title: "Flux", category: "Platform", img: fluxImg },
  { title: "Meridian", category: "Mobile", img: meridianImg },
  { title: "Onyx", category: "Commerce", img: onyxImg },
  { title: "Prism", category: "Data", img: prismImg },
  { title: "Aurora", category: "Product", img: auroraImg },
  { title: "Abyss", category: "Immersive", img: abyssImg },
  { title: "Paradox", category: "Architecture", img: paradoxImg },
];

const CAPABILITIES = [
  { icon: "◈", label: "Strategy" },
  { icon: "◐", label: "Design" },
  { icon: "△", label: "Development" },
  { icon: "◇", label: "Motion" },
];

const STATS = [
  { value: 127, suffix: "+", label: "Projects" },
  { value: 42, suffix: "", label: "Clients" },
  { value: 8, suffix: "", label: "Awards" },
  { value: 12, suffix: "yr", label: "Experience" },
];

function Index() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroImageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marquee2Ref = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const horizontalWrapRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const fullImageRef = useRef<HTMLDivElement>(null);
  const staggerGridRef = useRef<HTMLDivElement>(null);
  const capRefs = useRef<(HTMLDivElement | null)[]>([]);
  const statRefs = useRef<(HTMLDivElement | null)[]>([]);
  const revealTextRef = useRef<HTMLDivElement>(null);
  const teamImageRef = useRef<HTMLDivElement>(null);
  const splitImageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const parallaxBgRef = useRef<HTMLDivElement>(null);
  const morphBlobRef = useRef<HTMLDivElement>(null);
  const mouseGlowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const distortGridRef = useRef<HTMLDivElement>(null);

  // Global mouse state
  const mouse = useRef({ x: 0, y: 0, prevX: 0, prevY: 0, speed: 0 });

  useEffect(() => {
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      // ═══════ GLOBAL MOUSE TRACKING ═══════
      const onMouseMove = (e: MouseEvent) => {
        const m = mouse.current;
        m.prevX = m.x;
        m.prevY = m.y;
        m.x = e.clientX;
        m.y = e.clientY;
        const dx = m.x - m.prevX;
        const dy = m.y - m.prevY;
        m.speed = Math.min(Math.sqrt(dx * dx + dy * dy), 200);

        // Spotlight follows mouse with momentum
        if (spotlightRef.current) {
          gsap.to(spotlightRef.current, {
            x: e.clientX,
            y: e.clientY,
            duration: 1.2,
            ease: "power3.out",
          });
          // Spotlight size reacts to speed
          const spotSize = 700 + m.speed * 3;
          gsap.to(spotlightRef.current, {
            width: spotSize,
            height: spotSize,
            duration: 0.5,
            ease: "power2.out",
          });
        }

        // Morph blob follows with heavy delay
        if (morphBlobRef.current) {
          gsap.to(morphBlobRef.current, {
            x: e.clientX,
            y: e.clientY,
            duration: 2.5,
            ease: "power1.out",
          });
          // Blob shape morphs based on velocity
          const skewX = dx * 0.3;
          const skewY = dy * 0.3;
          gsap.to(morphBlobRef.current, {
            skewX,
            skewY,
            scaleX: 1 + m.speed * 0.003,
            scaleY: 1 - m.speed * 0.002,
            duration: 0.4,
            ease: "power2.out",
          });
        }

        // Hero section — deep parallax layers
        if (heroSectionRef.current) {
          const cx = (e.clientX / window.innerWidth - 0.5) * 2;
          const cy = (e.clientY / window.innerHeight - 0.5) * 2;

          // Background parallax
          if (parallaxBgRef.current) {
            gsap.to(parallaxBgRef.current, {
              x: cx * -30,
              y: cy * -30,
              duration: 1.5,
              ease: "power2.out",
            });
          }

          // Hero images — each layer at different depth
          heroImageRefs.current.forEach((el, i) => {
            if (!el) return;
            const depth = (i + 1) * 15;
            gsap.to(el, {
              x: cx * depth,
              y: cy * depth,
              rotateY: cx * (3 + i * 2),
              rotateX: cy * -(3 + i * 2),
              duration: 1 + i * 0.3,
              ease: "power2.out",
            });
          });

          // Title perspective shift
          if (heroTitleRef.current) {
            gsap.to(heroTitleRef.current, {
              rotateY: cx * 5,
              rotateX: cy * -3,
              x: cx * 10,
              y: cy * 8,
              duration: 1,
              ease: "power2.out",
            });
          }
        }

        // Section-local mouse glows
        mouseGlowRefs.current.forEach((el) => {
          if (!el) return;
          const rect = el.parentElement?.getBoundingClientRect();
          if (!rect) return;
          if (e.clientY > rect.top && e.clientY < rect.bottom) {
            const localX = e.clientX - rect.left;
            const localY = e.clientY - rect.top;
            gsap.to(el, {
              x: localX,
              y: localY,
              opacity: 0.15,
              duration: 0.8,
              ease: "power2.out",
            });
          } else {
            gsap.to(el, { opacity: 0, duration: 0.5 });
          }
        });

        // Distort grid — items repel from cursor
        if (distortGridRef.current) {
          const items = distortGridRef.current.querySelectorAll("[data-distort-item]");
          items.forEach((item) => {
            const rect = (item as HTMLElement).getBoundingClientRect();
            const itemCX = rect.left + rect.width / 2;
            const itemCY = rect.top + rect.height / 2;
            const distX = e.clientX - itemCX;
            const distY = e.clientY - itemCY;
            const dist = Math.sqrt(distX * distX + distY * distY);
            const maxDist = 350;

            if (dist < maxDist) {
              const force = (1 - dist / maxDist) * 25;
              const angle = Math.atan2(distY, distX);
              gsap.to(item, {
                x: -Math.cos(angle) * force,
                y: -Math.sin(angle) * force,
                scale: 1 + (1 - dist / maxDist) * 0.08,
                rotation: (1 - dist / maxDist) * (distX > 0 ? -3 : 3),
                duration: 0.5,
                ease: "power2.out",
              });
            } else {
              gsap.to(item, {
                x: 0,
                y: 0,
                scale: 1,
                rotation: 0,
                duration: 0.8,
                ease: "elastic.out(1, 0.5)",
              });
            }
          });
        }
      };
      window.addEventListener("mousemove", onMouseMove);

      // ═══════ PROGRESS BAR ═══════
      if (progressRef.current) {
        gsap.to(progressRef.current, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.3,
          },
        });
      }

      // ═══════ HERO TITLE — letter split ═══════
      if (heroTitleRef.current) {
        const text = heroTitleRef.current.textContent || "";
        heroTitleRef.current.innerHTML = text
          .split("")
          .map((c) => `<span class="inline-block">${c === " " ? "&nbsp;" : c}</span>`)
          .join("");
        const chars = heroTitleRef.current.querySelectorAll("span");
        gsap.from(chars, {
          yPercent: 140,
          rotateZ: () => gsap.utils.random(-20, 20),
          scale: 0.5,
          opacity: 0,
          duration: 1.4,
          ease: "back.out(1.7)",
          stagger: 0.05,
          delay: 0.3,
        });
      }

      // ═══════ HERO FLOATING IMAGES ═══════
      heroImageRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.from(el, {
          scale: 0,
          opacity: 0,
          rotation: gsap.utils.random(-30, 30),
          duration: 1.6,
          delay: 0.8 + i * 0.2,
          ease: "elastic.out(1, 0.6)",
        });
        gsap.to(el, {
          y: `+=${gsap.utils.random(8, 20)}`,
          rotation: `+=${gsap.utils.random(-4, 4)}`,
          duration: gsap.utils.random(2, 3.5),
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: i * 0.4,
        });
        gsap.to(el, {
          yPercent: -50 - i * 20,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 2 },
        });
      });

      // ═══════ MARQUEES ═══════
      [marqueeRef, marquee2Ref].forEach((ref, i) => {
        if (ref.current) {
          gsap.to(ref.current, {
            xPercent: i === 0 ? -50 : 50,
            ease: "none",
            duration: i === 0 ? 30 : 35,
            repeat: -1,
          });
        }
      });

      // ═══════ FULL-BLEED IMAGE ═══════
      if (fullImageRef.current) {
        const img = fullImageRef.current.querySelector("img");
        gsap.from(fullImageRef.current, {
          clipPath: "inset(50% 50% 50% 50%)",
          duration: 1.5,
          ease: "power4.inOut",
          scrollTrigger: { trigger: fullImageRef.current, start: "top 80%", end: "top 20%", scrub: 1 },
        });
        if (img) {
          gsap.to(img, {
            scale: 1.2,
            ease: "none",
            scrollTrigger: { trigger: fullImageRef.current, start: "top bottom", end: "bottom top", scrub: 1.5 },
          });
        }
      }

      // ═══════ CAPABILITIES ═══════
      capRefs.current.forEach((el) => {
        if (!el) return;
        const icon = el.querySelector("[data-cap-icon]");
        const line = el.querySelector("[data-cap-line]");
        gsap.from(el, {
          x: -100, opacity: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
        if (icon) gsap.to(icon, { rotation: 360, duration: 8, repeat: -1, ease: "none" });
        if (line) gsap.from(line, { scaleX: 0, duration: 1.2, ease: "power2.inOut", scrollTrigger: { trigger: el, start: "top 80%" } });
      });

      // ═══════ STATS ═══════
      statRefs.current.forEach((el) => {
        if (!el) return;
        const numEl = el.querySelector("[data-stat-num]");
        if (!numEl) return;
        const target = parseInt(numEl.getAttribute("data-target") || "0");
        gsap.from(el, {
          y: 60, opacity: 0, scale: 0.8, duration: 0.8, ease: "back.out(1.7)",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
        ScrollTrigger.create({
          trigger: el, start: "top 85%", once: true,
          onEnter: () => {
            gsap.to({ val: 0 }, {
              val: target, duration: 2, ease: "power2.out",
              onUpdate: function () { numEl.textContent = String(Math.round(this.targets()[0].val)); },
            });
          },
        });
      });

      // ═══════ BIG TEXT REVEAL ═══════
      if (revealTextRef.current) {
        const words = revealTextRef.current.querySelectorAll("[data-word]");
        gsap.from(words, {
          yPercent: 100, opacity: 0, rotateX: -60, stagger: 0.1, duration: 1, ease: "power4.out",
          scrollTrigger: { trigger: revealTextRef.current, start: "top 75%" },
        });
      }

      // ═══════ STAGGER GRID ═══════
      if (staggerGridRef.current) {
        const items = staggerGridRef.current.querySelectorAll("[data-grid-item]");
        items.forEach((item, i) => {
          const img = item.querySelector("img");
          gsap.from(item, {
            y: 100 + i * 20, opacity: 0, scale: 0.9,
            rotation: gsap.utils.random(-5, 5), duration: 1.2, ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 90%" },
          });
          if (img) {
            // 3D tilt on hover
            (item as HTMLElement).addEventListener("mousemove", (e: MouseEvent) => {
              const rect = (item as HTMLElement).getBoundingClientRect();
              const rx = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
              const ry = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
              gsap.to(item, { rotateY: rx, rotateX: ry, duration: 0.4, ease: "power2.out" });
              gsap.to(img, { scale: 1.12, x: rx * -1.5, y: ry * -1.5, duration: 0.4, ease: "power2.out" });
            });
            (item as HTMLElement).addEventListener("mouseleave", () => {
              gsap.to(item, { rotateY: 0, rotateX: 0, duration: 0.8, ease: "elastic.out(1, 0.5)" });
              gsap.to(img, { scale: 1, x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.5)" });
            });
          }
        });
      }

      // ═══════ HORIZONTAL SCROLL ═══════
      mm.add("(min-width: 768px)", () => {
        if (horizontalRef.current && horizontalWrapRef.current) {
          const scrollWidth = horizontalWrapRef.current.scrollWidth - window.innerWidth;
          gsap.to(horizontalWrapRef.current, {
            x: -scrollWidth, ease: "none",
            scrollTrigger: {
              trigger: horizontalRef.current, start: "top top",
              end: () => `+=${scrollWidth}`, scrub: 1, pin: true, anticipatePin: 1,
            },
          });
        }
      });

      // ═══════ PROJECT CARDS — deep 3D tilt + image shift ═══════
      projectRefs.current.forEach((el) => {
        if (!el) return;
        const img = el.querySelector("img");
        const overlay = el.querySelector("[data-overlay]");
        const title = el.querySelector("[data-title]");
        const cat = el.querySelector("[data-cat]");
        const shine = el.querySelector("[data-shine]");

        gsap.from(el, {
          clipPath: "inset(100% 0 0 0)", duration: 1.2, ease: "power4.inOut",
          scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
        });

        el.addEventListener("mouseenter", () => {
          gsap.to(img, { scale: 1.15, duration: 0.8, ease: "power2.out" });
          gsap.to(overlay, { opacity: 1, duration: 0.4 });
          gsap.to(title, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" });
          gsap.to(cat, { y: 0, opacity: 1, duration: 0.4, delay: 0.1, ease: "power3.out" });
        });
        el.addEventListener("mouseleave", () => {
          gsap.to(img, { scale: 1, x: 0, y: 0, duration: 0.8, ease: "power2.out" });
          gsap.to(overlay, { opacity: 0, duration: 0.4 });
          gsap.to(title, { y: 30, opacity: 0, duration: 0.3 });
          gsap.to(cat, { y: 15, opacity: 0, duration: 0.3 });
          gsap.to(el, { rotateY: 0, rotateX: 0, duration: 0.8, ease: "elastic.out(1, 0.5)" });
          if (shine) gsap.to(shine, { opacity: 0, duration: 0.3 });
        });

        el.addEventListener("mousemove", (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const nx = (e.clientX - rect.left) / rect.width;
          const ny = (e.clientY - rect.top) / rect.height;
          const rx = (nx - 0.5) * 24;
          const ry = (ny - 0.5) * -24;
          gsap.to(el, { rotateY: rx, rotateX: ry, duration: 0.4, ease: "power2.out" });
          // Counter-move image for depth
          if (img) {
            gsap.to(img, { x: rx * -2, y: ry * 2, duration: 0.4, ease: "power2.out" });
          }
          // Moving shine/highlight
          if (shine) {
            gsap.to(shine, {
              opacity: 0.15,
              background: `radial-gradient(circle at ${nx * 100}% ${ny * 100}%, oklch(1 0 0 / 25%) 0%, transparent 60%)`,
              duration: 0.3,
            });
          }
        });
      });

      // ═══════ SPLIT IMAGES ═══════
      splitImageRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.from(el, {
          x: i % 2 === 0 ? -200 : 200, opacity: 0, rotation: i % 2 === 0 ? -8 : 8,
          duration: 1.4, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
        gsap.to(el, {
          yPercent: i % 2 === 0 ? -10 : 10, ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 2 },
        });

        // Mouse tilt on split images
        (el as HTMLElement).addEventListener("mousemove", (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const rx = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
          const ry = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
          gsap.to(el, { rotateY: rx, rotateX: ry, scale: 1.02, duration: 0.5, ease: "power2.out" });
          const img = el.querySelector("img");
          if (img) gsap.to(img, { x: rx * -2, y: ry * -2, scale: 1.08, duration: 0.5, ease: "power2.out" });
        });
        (el as HTMLElement).addEventListener("mouseleave", () => {
          gsap.to(el, { rotateY: 0, rotateX: 0, scale: 1, duration: 0.8, ease: "elastic.out(1, 0.5)" });
          const img = el.querySelector("img");
          if (img) gsap.to(img, { x: 0, y: 0, scale: 1, duration: 0.8, ease: "elastic.out(1, 0.5)" });
        });
      });

      // ═══════ TEAM IMAGE ═══════
      if (teamImageRef.current) {
        const img = teamImageRef.current.querySelector("img");
        gsap.from(teamImageRef.current, {
          clipPath: "inset(20% 20% 20% 20% round 2rem)",
          scrollTrigger: { trigger: teamImageRef.current, start: "top 80%", end: "top 20%", scrub: 1 },
        });
        if (img) {
          gsap.to(img, {
            scale: 1.15, ease: "none",
            scrollTrigger: { trigger: teamImageRef.current, start: "top bottom", end: "bottom top", scrub: 2 },
          });
        }
      }

      return () => {
        window.removeEventListener("mousemove", onMouseMove);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="noise-bg min-h-screen overflow-x-hidden bg-background">
      <CustomCursor />

      {/* Progress bar */}
      <div
        ref={progressRef}
        className="fixed top-0 left-0 right-0 z-[100] h-[2px] bg-primary origin-left"
        style={{ transform: "scaleX(0)" }}
      />

      {/* Spotlight — speed reactive */}
      <div
        ref={spotlightRef}
        className="pointer-events-none fixed top-0 left-0 z-[1] -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 700,
          height: 700,
          background: "radial-gradient(circle, oklch(0.85 0.18 65 / 6%) 0%, transparent 70%)",
        }}
      />

      {/* Morph blob — velocity-distorted */}
      <div
        ref={morphBlobRef}
        className="pointer-events-none fixed top-0 left-0 z-[0] -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 400,
          height: 400,
          borderRadius: "40% 60% 70% 30% / 50% 40% 60% 50%",
          background: "radial-gradient(circle, oklch(0.7 0.2 330 / 4%) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* ═══════════ HERO ═══════════ */}
      <section
        ref={heroSectionRef}
        className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
        style={{ perspective: "1200px" }}
      >
        {/* Background layer for parallax */}
        <div
          ref={parallaxBgRef}
          className="absolute inset-[-50px] z-0"
          style={{
            background: "radial-gradient(ellipse at 30% 50%, oklch(0.15 0.04 260) 0%, transparent 70%), radial-gradient(ellipse at 70% 60%, oklch(0.12 0.03 330) 0%, transparent 60%)",
          }}
        />

        {PROJECTS.slice(0, 4).map((p, i) => {
          const positions = [
            { top: "8%", left: "6%", width: 180 },
            { top: "12%", right: "5%", width: 160 },
            { bottom: "15%", left: "10%", width: 150 },
            { bottom: "10%", right: "12%", width: 170 },
          ];
          const pos = positions[i];
          return (
            <div
              key={p.title}
              ref={(el) => { heroImageRefs.current[i] = el; }}
              className="absolute rounded-xl overflow-hidden glow-border opacity-50"
              style={{ ...pos, transformStyle: "preserve-3d" }}
            >
              <img
                src={p.img}
                alt=""
                className="block object-cover"
                style={{ width: pos.width, height: pos.width * 1.3 }}
              />
            </div>
          );
        })}

        <div className="relative z-10 text-center" style={{ transformStyle: "preserve-3d" }}>
          <h1
            ref={heroTitleRef}
            className="font-display text-7xl font-extrabold tracking-tighter sm:text-9xl lg:text-[12rem] leading-[0.85]"
            style={{ transformStyle: "preserve-3d" }}
          >
            STUDIO
          </h1>
          <p className="mt-4 font-mono text-xs tracking-[0.4em] text-muted-foreground uppercase">
            Selected Work
          </p>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="h-14 w-px bg-gradient-to-b from-primary to-transparent animate-pulse" />
        </div>
      </section>

      {/* ═══════════ MARQUEE 1 ═══════════ */}
      <section className="overflow-hidden border-y border-border py-5">
        <div ref={marqueeRef} className="flex whitespace-nowrap gap-20">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="font-display text-6xl font-extrabold text-muted/30 tracking-tighter select-none">
              DESIGN • DEVELOP • DELIVER •&nbsp;
            </span>
          ))}
        </div>
      </section>

      {/* ═══════════ FULL BLEED IMAGE ═══════════ */}
      <section className="relative overflow-hidden" style={{ height: "70vh" }}>
        <div ref={fullImageRef} className="absolute inset-0" style={{ clipPath: "inset(0 0 0 0)" }}>
          <img src={heroBgImg} alt="" className="w-full h-full object-cover" loading="lazy" />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, oklch(0.08 0.01 260 / 40%), oklch(0.08 0.01 260 / 90%))" }}
          />
        </div>
      </section>

      {/* ═══════════ BIG TEXT REVEAL ═══════════ */}
      <section className="px-6 py-32 md:px-16 lg:px-24">
        <div ref={revealTextRef} className="max-w-5xl" style={{ perspective: "800px" }}>
          {["We", "craft", "digital", "wonders."].map((word) => (
            <span key={word} data-word className="inline-block font-display text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl mr-4 lg:mr-6">
              <span className={word === "wonders." ? "text-gradient" : ""}>{word}</span>
            </span>
          ))}
        </div>
      </section>

      {/* ═══════════ DISTORT CAPABILITIES (mouse repel) ═══════════ */}
      <section className="relative px-6 py-20 md:px-16 lg:px-24 overflow-hidden">
        {/* Section mouse glow */}
        <div
          ref={(el) => { mouseGlowRefs.current[0] = el; }}
          className="pointer-events-none absolute z-0 -translate-x-1/2 -translate-y-1/2 opacity-0"
          style={{
            width: 500,
            height: 500,
            background: "radial-gradient(circle, oklch(0.85 0.18 65 / 12%) 0%, transparent 70%)",
          }}
        />
        <div ref={distortGridRef}>
          {CAPABILITIES.map((cap, i) => (
            <div
              key={cap.label}
              ref={(el) => { capRefs.current[i] = el; }}
              data-distort-item
              className="group relative z-10 flex items-center gap-6 py-8"
            >
              <span data-cap-icon className="flex-shrink-0 text-3xl text-primary">{cap.icon}</span>
              <span className="font-display text-3xl font-bold tracking-tight sm:text-5xl transition-colors duration-300 group-hover:text-primary">
                {cap.label}
              </span>
              <div data-cap-line className="flex-1 h-px bg-border origin-left ml-6" />
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ SPLIT IMAGES ═══════════ */}
      <section className="px-6 py-20 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {[auroraImg, abyssImg].map((img, i) => (
            <div
              key={i}
              ref={(el) => { splitImageRefs.current[i] = el; }}
              className="relative overflow-hidden rounded-2xl aspect-[3/4]"
              style={{ perspective: "800px", transformStyle: "preserve-3d" }}
            >
              <img src={img} alt="" loading="lazy" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ STATS ═══════════ */}
      <section className="relative px-6 py-24 md:px-16 lg:px-24 overflow-hidden">
        <div
          ref={(el) => { mouseGlowRefs.current[1] = el; }}
          className="pointer-events-none absolute z-0 -translate-x-1/2 -translate-y-1/2 opacity-0"
          style={{
            width: 600,
            height: 600,
            background: "radial-gradient(circle, oklch(0.7 0.2 330 / 10%) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <div key={stat.label} ref={(el) => { statRefs.current[i] = el; }} className="text-center">
              <div className="font-display text-5xl font-extrabold tracking-tight sm:text-7xl text-gradient">
                <span data-stat-num data-target={stat.value}>0</span>
                <span>{stat.suffix}</span>
              </div>
              <span className="mt-2 block font-mono text-xs tracking-widest text-muted-foreground uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ MARQUEE 2 ═══════════ */}
      <section className="overflow-hidden border-y border-border py-4">
        <div ref={marquee2Ref} className="flex whitespace-nowrap gap-20" style={{ transform: "translateX(-50%)" }}>
          {[...Array(4)].map((_, i) => (
            <span key={i} className="font-display text-5xl font-extrabold text-muted/20 tracking-tighter select-none">
              BRAND • MOTION • CODE • ART •&nbsp;
            </span>
          ))}
        </div>
      </section>

      {/* ═══════════ STAGGER GRID ═══════════ */}
      <section className="px-6 py-24 md:px-16 lg:px-24">
        <div ref={staggerGridRef} className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {PROJECTS.slice(0, 6).map((project, i) => {
            const heights = ["aspect-[3/4]", "aspect-[4/5]", "aspect-square", "aspect-[3/4]", "aspect-[4/5]", "aspect-square"];
            return (
              <div
                key={project.title + "-grid"}
                data-grid-item
                className={`relative overflow-hidden rounded-xl ${heights[i]} ${i === 1 ? "md:mt-16" : i === 2 ? "md:mt-8" : ""}`}
                style={{ perspective: "800px", transformStyle: "preserve-3d" }}
              >
                <img src={project.img} alt={project.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700" />
                <div
                  className="absolute inset-0 flex items-end p-4"
                  style={{ background: "linear-gradient(to top, oklch(0 0 0 / 60%) 0%, transparent 50%)" }}
                >
                  <span className="font-display text-lg font-bold">{project.title}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════ HORIZONTAL SCROLL GALLERY ═══════════ */}
      <section ref={horizontalRef} className="relative">
        <div
          ref={horizontalWrapRef}
          className="flex items-center gap-8 px-8 py-16 md:py-0 md:h-screen md:flex-nowrap flex-wrap md:gap-12 md:px-16"
        >
          {PROJECTS.map((project, i) => (
            <div
              key={project.title}
              ref={(el) => { projectRefs.current[i] = el; }}
              className="relative flex-shrink-0 w-[80vw] sm:w-[55vw] md:w-[35vw] lg:w-[28vw] aspect-[3/4] rounded-2xl overflow-hidden"
              style={{ perspective: "1000px", clipPath: "inset(0 0 0 0)", transformStyle: "preserve-3d" }}
              data-magnetic
            >
              <img src={project.img} alt={project.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
              {/* Shine overlay for mouse highlight */}
              <div data-shine className="absolute inset-0 z-10 opacity-0 pointer-events-none" />
              <div
                data-overlay
                className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 z-20"
                style={{ background: "linear-gradient(to top, oklch(0 0 0 / 80%) 0%, transparent 60%)" }}
              >
                <h2 data-title className="font-display text-3xl font-bold text-foreground translate-y-[30px] opacity-0">
                  {project.title}
                </h2>
                <span data-cat className="mt-1 font-mono text-xs tracking-widest text-primary uppercase translate-y-[15px] opacity-0">
                  {project.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ TEAM IMAGE ═══════════ */}
      <section className="px-6 py-24 md:px-16 lg:px-24">
        <div
          ref={teamImageRef}
          className="relative overflow-hidden rounded-3xl"
          style={{ height: "60vh", clipPath: "inset(0 0 0 0 round 1.5rem)" }}
        >
          <img src={teamImg} alt="" loading="lazy" className="w-full h-full object-cover" />
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: "oklch(0 0 0 / 50%)" }}
          >
            <span className="font-display text-5xl font-extrabold tracking-tight sm:text-7xl text-foreground">
              The Team
            </span>
          </div>
        </div>
      </section>

      {/* ═══════════ SPLIT IMAGES 2 ═══════════ */}
      <section className="px-6 py-16 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {[paradoxImg, prismImg].map((img, i) => (
            <div
              key={`split2-${i}`}
              ref={(el) => { splitImageRefs.current[i + 2] = el; }}
              className="relative overflow-hidden rounded-2xl aspect-[4/5]"
              style={{ perspective: "800px", transformStyle: "preserve-3d" }}
            >
              <img src={img} alt="" loading="lazy" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="border-t border-border px-6 py-20 md:px-16 lg:px-24">
        <div className="flex flex-col items-center text-center gap-8">
          <h3 className="font-display text-5xl font-extrabold tracking-tight sm:text-7xl text-gradient">
            Let's talk
          </h3>
          <MagneticButton>
            <span className="inline-flex items-center gap-3 rounded-full border border-primary px-10 py-5 font-mono text-sm text-primary tracking-wide transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_40px_oklch(0.85_0.18_65_/_30%)]">
              Contact →
            </span>
          </MagneticButton>
          <p className="mt-8 font-mono text-xs text-muted-foreground">© 2025 made with ❤️ by kweiaa Dev Team</p>
        </div>
      </footer>
    </div>
  );
}
