import { useCallback } from "react";

export const useSmoothScroll = () => {
  const smoothScrollTo = useCallback((targetId: string) => {
    const element = document.querySelector(targetId);

    if (element) {
      const headerOffset = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, []);

  return smoothScrollTo;
};
