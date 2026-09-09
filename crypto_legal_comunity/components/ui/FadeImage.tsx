"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { editorialEase } from "@/lib/motion";

type FadeImageProps = {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
  wrapperClassName?: string;
  priority?: boolean;
  zoomOnHover?: boolean;
};

/**
 * Image with a skeleton-then-fade-in entrance: a quiet shimmering placeholder
 * holds the exact same box (zero layout shift), and the image fades in over
 * it once decoded. Hover zoom is opt-in because it only makes sense when the
 * image sits inside a `group` container.
 */
export default function FadeImage({
  src,
  alt,
  sizes = "100vw",
  className = "",
  wrapperClassName = "",
  priority = false,
  zoomOnHover = false,
}: FadeImageProps) {
  const [loaded, setLoaded] = useState(false);
  const reduce = useReducedMotion();

  return (
    <>
      {/* Skeleton — absolutely positioned so it never affects layout. */}
      {!loaded && (
        <span
          aria-hidden="true"
          className={`clc-skeleton absolute inset-0 ${wrapperClassName}`}
        />
      )}
      <motion.span
        className={`absolute inset-0 ${zoomOnHover && !reduce ? "transition-transform duration-700 ease-out group-hover:scale-[1.04]" : ""}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: reduce ? 0.1 : 0.7, ease: editorialEase }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          onLoad={() => setLoaded(true)}
          className={className}
        />
      </motion.span>
    </>
  );
}
