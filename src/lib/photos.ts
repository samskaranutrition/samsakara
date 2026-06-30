// Centralised image sources served from /public/images.
const image = (filename: string) => `/images/${filename}`;

type PhotoMeta = {
  src: string;
  placeholder: string;
  /** CSS aspect-ratio value */
  aspect: string;
  /** CSS object-position for cover crops */
  objectPosition: string;
  captionKey: string;
};

export const photos = {
  portrait: {
    src: image("samantha-portrait.jpg"),
    placeholder: image("samantha-portrait.jpg"),
    aspect: "4 / 5",
    objectPosition: "42% 22%",
    captionKey: "portrait",
  },
  mediterranean: {
    src: image("mediterranean.jpg"),
    placeholder: image("mediterranean.jpg"),
    aspect: "1 / 1",
    objectPosition: "center 58%",
    captionKey: "mediterranean",
  },
  cooking: {
    src: image("cooking.jpg"),
    placeholder: image("cooking.jpg"),
    aspect: "16 / 10",
    objectPosition: "55% center",
    captionKey: "cooking",
  },
  samanthaLaptop: {
    src: image("cooking.jpg"),
    placeholder: image("cooking.jpg"),
    aspect: "16 / 10",
    objectPosition: "55% center",
    captionKey: "laptop",
  },
  spices: {
    src: image("spices.jpg"),
    placeholder: image("spices.jpg"),
    aspect: "3 / 2",
    objectPosition: "center 42%",
    captionKey: "spices",
  },
  kerala: {
    src: image("kerala.jpg"),
    placeholder: image("kerala.jpg"),
    aspect: "3 / 2",
    objectPosition: "68% center",
    captionKey: "kerala",
  },
  food: {
    src: image("food.jpg"),
    placeholder: image("food.jpg"),
    aspect: "4 / 3",
    objectPosition: "center 48%",
    captionKey: "food",
  },
  garden: {
    src: image("garden.jpg"),
    placeholder: image("garden.jpg"),
    aspect: "4 / 5",
    objectPosition: "center 32%",
    captionKey: "garden",
  },
} as const satisfies Record<string, PhotoMeta>;

export type PhotoKey = keyof typeof photos;
