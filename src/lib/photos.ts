// Centralised image sources. Founder portrait is a real photo of Samantha.
// Kerala / spices / food / cooking are user-provided editorial images,
// hosted via Lovable Assets for fast CDN delivery.
import portraitAsset from "@/assets/samantha-portrait.asset.json";
import keralaAsset from "@/assets/kerala.jpg.asset.json";
import spicesAsset from "@/assets/spices.jpg.asset.json";
import foodAsset from "@/assets/food.jpg.asset.json";
import cookingAsset from "@/assets/cooking.jpg.asset.json";

const pexels = (id: number, w = 1600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const photos = {
  portrait: { src: portraitAsset.url, placeholder: portraitAsset.url },
  kerala: { src: keralaAsset.url, placeholder: keralaAsset.url },
  spices: { src: spicesAsset.url, placeholder: spicesAsset.url },
  food: { src: foodAsset.url, placeholder: foodAsset.url },
  cooking: { src: cookingAsset.url, placeholder: cookingAsset.url },
  mediterranean: { src: pexels(32531680), placeholder: pexels(32531680, 24) },
  garden: { src: pexels(37733802), placeholder: pexels(37733802, 24) },
} as const;

export type PhotoKey = keyof typeof photos;
