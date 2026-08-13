import { usePhotos } from "../state/PhotosContext";
import type { City } from "../types";

interface CityPhotoProps {
  city: City;
  /** Empty by default: most of these sit beside the city's name already. */
  alt?: string;
  className?: string;
  loading?: "lazy" | "eager";
}

/**
 * A city's picture, wherever it appears. Everything goes through this rather
 * than reading city.photo directly, so replacing a photo changes it on the
 * card, the stamp, the passport and the comparison at once.
 */
export function CityPhoto({ city, alt = "", className, loading }: CityPhotoProps) {
  const { photoFor } = usePhotos();
  return <img src={photoFor(city)} alt={alt} className={className} loading={loading} />;
}
