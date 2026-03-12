"use client";

import { useEffect, useState, useRef, useCallback } from "react";

/**
 * Custom hook to track which section is currently in the viewport.
 * Uses IntersectionObserver for performant scroll-based highlighting.
 */
export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      // Find the entry with the highest intersection ratio
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visible.length > 0) {
        const id = visible[0].target.getAttribute("id");
        if (id) setActiveSection(id);
      }
    },
    []
  );

  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleIntersect, {
      rootMargin: "-20% 0px -60% 0px",
      threshold: [0, 0.25, 0.5, 0.75, 1],
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [sectionIds, handleIntersect]);

  return activeSection;
}
