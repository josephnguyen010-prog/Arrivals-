import { PHOTO_CREDITS, commonsUrl } from "../data/credits";
import { usePhotos } from "../state/PhotosContext";
import type { CityId } from "../types";

/**
 * CC BY obliges the credit to reach whoever is looking at the photo, so this
 * sits under the stamp on the city page rather than only in a repo file. Once
 * the photo is the reader's own there is nobody to credit — and crediting a
 * photographer for a picture that is no longer theirs would be worse than
 * saying nothing.
 */
export function PhotoCreditLine({ city }: { city: CityId }) {
  const { isYours } = usePhotos();
  const credit = PHOTO_CREDITS[city];

  if (isYours(city)) return <p className="photo-credit">Your photo</p>;
  if (!credit) return null;

  return (
    <p className="photo-credit">
      Photo{" "}
      <a href={commonsUrl(credit.file)} target="_blank" rel="noreferrer noopener">
        {credit.author}
      </a>
      {credit.licenceUrl ? (
        <>
          {" · "}
          <a href={credit.licenceUrl} target="_blank" rel="noreferrer noopener">
            {credit.licence}
          </a>
        </>
      ) : (
        ` · ${credit.licence}`
      )}
      {credit.licence !== "CC0" && ", cropped"}
    </p>
  );
}
