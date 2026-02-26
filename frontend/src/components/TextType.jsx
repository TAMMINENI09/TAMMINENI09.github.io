import { useEffect, useMemo, useRef, useState } from "react";

const toTextArray = (value) => {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === "string") return value.length ? [value] : [];
  return [];
};

export default function TextType({
  text,
  typingSpeed = 50,
  deletingSpeed = 30,
  pauseDuration = 2000,
  initialDelay = 0,
  loop = true,
  showCursor = true,
  cursorCharacter = "|",
  cursorBlinkDuration = 0.6,
  startOnVisible = false,
  className = ""
}) {
  const texts = useMemo(() => toTextArray(text), [text]);
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [started, setStarted] = useState(!startOnVisible);
  const [active, setActive] = useState(!startOnVisible && initialDelay === 0);
  const rootRef = useRef(null);
  const delayRef = useRef(null);

  useEffect(() => {
    if (!startOnVisible) return;
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [startOnVisible]);

  useEffect(() => {
    if (!started) return undefined;
    if (initialDelay <= 0) {
      setActive(true);
      return undefined;
    }
    const timeout = setTimeout(() => setActive(true), initialDelay);
    return () => clearTimeout(timeout);
  }, [initialDelay, started]);

  useEffect(() => {
    if (!active) return undefined;
    if (!texts.length) return undefined;

    const currentText = texts[textIndex] || "";

    if (!isDeleting && charIndex === currentText.length) {
      if (!loop && textIndex === texts.length - 1) {
        return undefined;
      }
      delayRef.current = setTimeout(() => setIsDeleting(true), pauseDuration);
      return () => clearTimeout(delayRef.current);
    }

    if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % texts.length);
      return undefined;
    }

    const stepDelay = isDeleting ? deletingSpeed : typingSpeed;
    delayRef.current = setTimeout(() => {
      setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, stepDelay);

    return () => clearTimeout(delayRef.current);
  }, [
    active,
    charIndex,
    deletingSpeed,
    isDeleting,
    loop,
    pauseDuration,
    textIndex,
    texts,
    typingSpeed
  ]);

  useEffect(() => {
    setTextIndex(0);
    setCharIndex(0);
    setIsDeleting(false);
  }, [texts]);

  if (!texts.length) return null;

  const currentText = texts[textIndex] || "";
  const visibleText = currentText.slice(0, charIndex);
  const isDone =
    !loop &&
    textIndex === texts.length - 1 &&
    !isDeleting &&
    charIndex === currentText.length;
  const cursorVisible = showCursor && !isDone;

  return (
    <span ref={rootRef} className={`text-type ${className}`.trim()}>
      <span className="text-type-content">{visibleText}</span>
      <span
        className={`text-type-cursor${cursorVisible ? "" : " is-hidden"}`}
        style={{ animationDuration: `${cursorBlinkDuration}s` }}
        aria-hidden="true"
      >
        {cursorCharacter}
      </span>
    </span>
  );
}
