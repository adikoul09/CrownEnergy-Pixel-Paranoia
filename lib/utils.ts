import { createCn } from "cn/config"

/**
 * Class merging that knows the Crown Energy type scale. Without this, custom
 * sizes such as `text-display-m` read as colours and are dropped in favour of
 * `text-bone` — silently collapsing headlines to body size.
 */
export const cn = createCn({
  extend: {
    classGroups: {
      "font-size": [{ text: ["display-xl", "display-l", "display-m", "title", "body-l", "body", "label"] }],
      tracking: [{ tracking: ["wordmark"] }],
    },
  },
})
