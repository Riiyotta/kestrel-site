import { useSpring, useReducedMotion } from 'framer-motion'

// SPEC_PAGES_B §1.1 category colour themes -> existing tint / tag tokens (class names written out for Tailwind).
export const STORY_THEME = {
  pink: { light: 'bg-tint-pink', dark: 'text-tag-text-pink', mid: 'text-tag-meta-pink', fill: 'fill-tag-text-pink', ring: 'bg-tag-text-pink', vars: 'story-theme-pink' },
  yellow: { light: 'bg-tint-yellow', dark: 'text-tag-text-yellow', mid: 'text-tag-meta-yellow', fill: 'fill-tag-text-yellow', ring: 'bg-tag-text-yellow', vars: 'story-theme-yellow' },
  red: { light: 'bg-tint-red', dark: 'text-tag-text-red', mid: 'text-tag-meta-red', fill: 'fill-tag-text-red', ring: 'bg-tag-text-red', vars: 'story-theme-red' },
  green: { light: 'bg-tint-green', dark: 'text-tag-text-green', mid: 'text-tag-meta-green', fill: 'fill-tag-text-green', ring: 'bg-tag-text-green', vars: 'story-theme-green' },
}

// §1.3/§1.4 hover: one spring progress (0 -> 1) shared by the button inversion and the card lift.
// Spec: spring {stiffness ≈300, damping ≈30} (light -> ≈60% @159ms -> done ≈312ms with a slight overshoot).
// Exposed as the CSS var --hp on the card (content.css .story-btn-inner / .story-lift). Reduced motion: instant.
export const STORY_HOVER_SPRING = { stiffness: 300, damping: 30 }

export function useStoryHover() {
  const reduce = useReducedMotion()
  const hp = useSpring(0, STORY_HOVER_SPRING)
  const to = (v) => (reduce ? hp.jump(v) : hp.set(v))
  return {
    style: { '--hp': hp },
    handlers: {
      onHoverStart: () => to(1),
      onHoverEnd: () => to(0),
      onFocus: () => to(1),
      onBlur: () => to(0),
    },
  }
}
