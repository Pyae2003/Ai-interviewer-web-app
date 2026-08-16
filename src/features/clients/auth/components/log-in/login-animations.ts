import type { Variants } from "framer-motion";

export const brandContainerVariants: Variants = {
  hidden: {},

  visible: {
    transition: {
      delayChildren: 0.05,
      staggerChildren: 0.1,
    },
  },
};

export const badgeVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 6,
    scale: 0.97,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,

    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export const robotVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    rotate: -5,
  },

  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,

    transition: {
      duration: 0.4,
      delay: 0.1,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export const contentVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 8,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export const headlineContainerVariants: Variants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

export const headlineWordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 6,
    filter: "blur(2px)",
  },

  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",

    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.55,
      delay: 0.12,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};