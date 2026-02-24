"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";

export function useAnimateInView(options?: { once?: boolean; margin?: string }) {
  const ref = useRef(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isInView = useInView(ref, {
    once: options?.once ?? true,
    margin: (options?.margin ?? "-100px") as any,
  });
  return { ref, isInView };
}
