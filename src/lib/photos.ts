import samskaraMeaningImg from "@/assets/web/samskara-meaning.jpg";
import aboutLifestyleImg from "@/assets/web/about-lifestyle.jpg";
import approachGutImg from "@/assets/web/approach-gut.jpg";
import approachHowImg from "@/assets/web/approach-how.jpg";
import homeHeroImg from "@/assets/web/home-hero.jpg";
import cookingImg from "@/assets/web/cooking.jpg";
import foodImg from "@/assets/web/food-dish.jpg";
import gardenImg from "@/assets/web/garden.jpg";
import keralaImg from "@/assets/web/kerala-landscape.jpg";
import mediterraneanImg from "@/assets/web/mediterranean.jpg";
import portraitHeroImg from "@/assets/web/portrait-hero.jpg";
import programmesHeroImg from "@/assets/web/programmes-hero.jpg";
import spicesImg from "@/assets/web/spices-market.jpg";

type PhotoMeta = {
  src: string;
  placeholder: string;
  aspect: string;
  objectPosition: string;
  captionKey: string;
};

function photo(
  src: string,
  meta: Omit<PhotoMeta, "src" | "placeholder">,
): PhotoMeta {
  return { src, placeholder: src, ...meta };
}

export const photos = {
  homeHero: photo(homeHeroImg, {
    aspect: "4 / 5",
    objectPosition: "50% 32%",
    captionKey: "homePortrait",
  }),
  aboutHero: photo(homeHeroImg, {
    aspect: "4 / 5",
    objectPosition: "50% 32%",
    captionKey: "portrait",
  }),
  aboutLifestyle: photo(aboutLifestyleImg, {
    aspect: "5 / 4",
    objectPosition: "52% 42%",
    captionKey: "lifestyle",
  }),
  samskaraMeaning: photo(samskaraMeaningImg, {
    aspect: "4 / 5",
    objectPosition: "50% 45%",
    captionKey: "mediterranean",
  }),
  approachGut: photo(approachGutImg, {
    aspect: "5 / 4",
    objectPosition: "48% 38%",
    captionKey: "gutFocus",
  }),
  approachHow: photo(approachHowImg, {
    aspect: "5 / 4",
    objectPosition: "50% 40%",
    captionKey: "approachReading",
  }),
  programmesHero: photo(programmesHeroImg, {
    aspect: "5 / 4",
    objectPosition: "55% 28%",
    captionKey: "laptop",
  }),
  portrait: photo(homeHeroImg, {
    aspect: "4 / 5",
    objectPosition: "50% 32%",
    captionKey: "portrait",
  }),
  mediterranean: photo(mediterraneanImg, {
    aspect: "1 / 1",
    objectPosition: "center 58%",
    captionKey: "mediterranean",
  }),
  cooking: photo(cookingImg, {
    aspect: "16 / 10",
    objectPosition: "55% center",
    captionKey: "cooking",
  }),
  samanthaLaptop: photo(programmesHeroImg, {
    aspect: "16 / 10",
    objectPosition: "55% 28%",
    captionKey: "laptop",
  }),
  spices: photo(spicesImg, {
    aspect: "3 / 2",
    objectPosition: "center 42%",
    captionKey: "spices",
  }),
  kerala: photo(keralaImg, {
    aspect: "3 / 2",
    objectPosition: "68% center",
    captionKey: "kerala",
  }),
  food: photo(foodImg, {
    aspect: "4 / 3",
    objectPosition: "center 48%",
    captionKey: "food",
  }),
  garden: photo(gardenImg, {
    aspect: "4 / 5",
    objectPosition: "center 32%",
    captionKey: "garden",
  }),
  portraitAlt: photo(portraitHeroImg, {
    aspect: "1 / 1",
    objectPosition: "center center",
    captionKey: "portrait",
  }),
} as const satisfies Record<string, PhotoMeta>;

export type PhotoKey = keyof typeof photos;
