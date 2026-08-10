import { PHOTO_CREDITS, commonsUrl } from "../data/credits";
import type { CityId } from "../types";

/**
 * CC BY obliges the credit to reach whoever is looking at the photo, so this
 * sits under the stamp on the city page rather than only in a repo file.
 */
export function PhotoCreditLine({ city }: { city: CityId }) {
  const credit = PHOTO_CREDITS[city];
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
