"use client";

import { type Variants, motion } from "framer-motion";
import type { ElementType, ReactNode } from "react";
import React from "react";

interface AnimatedGroupProps {
  children: ReactNode;
  className?: string;
  variants?: {
    container?: Variants;
    item?: Variants;
  };
  preset?: PresetType;
  as?: ElementType;
  asChild?: ElementType;
}

type PresetType =
  | "fade"
  | "slide"
  | "scale"
  | "blur"
  | "blur-slide"
  | "zoom"
  | "flip"
  | "bounce"
  | "rotate"
  | "swing";

// --- Static Content ---
const defaultContainerVariants: Variants = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const defaultItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const presetVariants: Record<PresetType, Variants> = {
  fade: {},
  slide: { hidden: { y: 20 }, visible: { y: 0 } },
  scale: { hidden: { scale: 0.8 }, visible: { scale: 1 } },
  blur: { hidden: { filter: "blur(4px)" }, visible: { filter: "blur(0px)" } },
  "blur-slide": {
    hidden: { filter: "blur(4px)", y: 20 },
    visible: { filter: "blur(0px)", y: 0 },
  },
  zoom: {
    hidden: { scale: 0.5 },
    visible: {
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  },
  flip: {
    hidden: { rotateX: -90 },
    visible: {
      rotateX: 0,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  },
  bounce: {
    hidden: { y: -50 },
    visible: {
      y: 0,
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
  },
  rotate: {
    hidden: { rotate: -180 },
    visible: {
      rotate: 0,
      transition: { type: "spring", stiffness: 200, damping: 15 },
    },
  },
  swing: {
    hidden: { rotate: -10 },
    visible: {
      rotate: 0,
      transition: { type: "spring", stiffness: 300, damping: 8 },
    },
  },
};

// --- Helpers ---
function mergeVariants(base: Variants, override?: Variants): Variants {
  return {
    hidden: { ...base.hidden, ...(override?.hidden ?? {}) },
    visible: { ...base.visible, ...(override?.visible ?? {}) },
  };
}

// --- Component ---
function AnimatedGroup({
  children,
  className,
  variants,
  preset,
  as = "div",
  asChild = "div",
}: AnimatedGroupProps) {
  const Container = React.useMemo(() => motion.create(as), [as]);
  const Item = React.useMemo(() => motion.create(asChild), [asChild]);

  const containerVariants = variants?.container
    ? mergeVariants(defaultContainerVariants, variants.container)
    : defaultContainerVariants;

  const itemVariants = variants?.item
    ? mergeVariants(defaultItemVariants, variants.item)
    : mergeVariants(
        defaultItemVariants,
        preset ? presetVariants[preset] : undefined,
      );

  return (
    <Container
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      {...(className ? { className } : {})}
    >
      {React.Children.map(children, (child, i) => (
        <Item
          key={
            React.isValidElement(child) && child.key !== null ? child.key : i
          }
          variants={itemVariants}
        >
          {child}
        </Item>
      ))}
    </Container>
  );
}

export { AnimatedGroup };
