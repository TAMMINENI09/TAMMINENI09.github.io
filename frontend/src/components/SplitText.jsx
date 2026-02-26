import { useEffect, useMemo, useRef, useState } from "react";

const toSegments = (value, mode) => {
  if (typeof value !== "string") return [];
  if (mode === "words") {
    return value.split(/(\s+)/).filter((segment) => segment.length > 0);
  }
  return Array.from(value);
};

export default function SplitText({
  text,
  mode = "chars",
  stagger = 0.035,
  delay = 0,
  startOnVisible = true,
  replayOnMount = true,
  hoverReplay = true,
  className = ""
}) {
  const rootRef = useRef(null);
  const [active, setActive] = useState(!startOnVisible);
  const [hoverActive, setHoverActive] = useState(false);
  const segments = useMemo(() => toSegments(text || "", mode), [text, mode]);
  const hoverTimerRef = useRef(null);

  useEffect(() => {
    if (!startOnVisible) return;
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (replayOnMount) {
            setActive(false);
            requestAnimationFrame(() => setActive(true));
          } else {
            setActive(true);
          }
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [replayOnMount, startOnVisible]);

  useEffect(() => {
    if (startOnVisible) return;
    if (!replayOnMount) return;
    setActive(false);
    requestAnimationFrame(() => setActive(true));
  }, [replayOnMount, startOnVisible, text, mode]);

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    };
  }, []);

  const totalHoverDuration = (segments.length - 1) * stagger + 0.6;

  const handleMouseEnter = () => {
    if (!hoverReplay) return;
    if (hoverActive) return;
    setHoverActive(true);
    const ms = Math.max(0, totalHoverDuration * 1000);
    hoverTimerRef.current = setTimeout(() => {
      setHoverActive(false);
    }, ms);
  };

  return (
    <span
      ref={rootRef}
      className={`split-text ${active ? "is-active" : ""} ${
        hoverActive ? "is-hover-animating" : ""
      } ${className}`.trim()}
      onMouseEnter={handleMouseEnter}
    >
      {segments.map((segment, index) => (
        <span
          key={`${segment}-${index}`}
          className={`split-text-piece${segment.trim() === "" ? " is-space" : ""}`}
          style={{
            transitionDelay: `${delay + index * stagger}s`,
            "--stagger-delay": `${delay + index * stagger}s`
          }}
          aria-hidden="true"
        >
          {segment}
        </span>
      ))}
      <span className="sr-only">{text}</span>
    </span>
  );
}
