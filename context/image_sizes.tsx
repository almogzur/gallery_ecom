import { ImageSizesType } from "@/types/main";

export const ImageSizes: ImageSizesType = {
  landscape: {
    xxs: { width: 240, height: 160 },  // ~80% of a 300px screen
    xs: { width: 280, height: 187 },
    sm: { width: 400, height: 267 },
    md: { width: 600, height: 400 },
    lg: { width: 700, height: 467 },
    xl: { width: 840, height: 560 },
    xxl: { width: 1000, height: 667 },
  },
  portrait: {
    xxs: { width: 160, height: 240 },
    xs: { width: 187, height: 280 },
    sm: { width: 267, height: 400 },
    md: { width: 400, height: 600 },
    lg: { width: 467, height: 700 },
    xl: { width: 560, height: 840 },
    xxl: { width: 667, height: 1000 },
  },

}
