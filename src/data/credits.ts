import type { CityId } from "../types";

export interface PhotoCredit {
  author: string;
  licence: string;
  licenceUrl: string;
  /** Commons filename, before cropping. */
  file: string;
}

const LICENCE_URLS: Record<string, string> = {
  CC0: "https://creativecommons.org/publicdomain/zero/1.0/",
  "CC BY 2.0": "https://creativecommons.org/licenses/by/2.0/",
  "CC BY 2.5": "https://creativecommons.org/licenses/by/2.5/",
  "CC BY 4.0": "https://creativecommons.org/licenses/by/4.0/",
};

function credit(author: string, licence: string, file: string): PhotoCredit {
  return { author, licence, licenceUrl: LICENCE_URLS[licence], file };
}

/**
 * Every photo is CC0 or attribution-only. Share-alike is deliberately excluded:
 * it obliges derivative works to carry the same licence, which is a problem
 * once photos sit inside a product. See CREDITS.md.
 *
 * CC BY requires the credit to reach the person looking at the photo, which is
 * why this is rendered on the city page rather than left in a file.
 */
export const PHOTO_CREDITS: Record<CityId, PhotoCredit> = {
  hcmc: credit("dronepicr", "CC BY 2.0", "Ho Chi Minh city (39514086172).jpg"),
  tokyo: credit("Ville Miettinen", "CC BY 2.0", "Sunset in Shinjuku.jpg"),
  lisbon: credit("Dale Cruse", "CC BY 4.0", "Alfama Rooftops and Tagus River View, Lisbon (54733828355).jpg"),
  cdmx: credit("Gobierno CDMX", "CC0", "Sobrevuelos CDMX HJ2A4913 (25514321687) (cropped).jpg"),
  ist: credit("Hunanuk", "CC0", "Historical peninsula and modern skyline of Istanbul.jpg"),
  seoul: credit("USAGI_POST", "CC0", "Han River Seoul skyline Pixabay 1214950.jpg"),
  porto: credit("Dale Cruse", "CC BY 4.0", "Nighttime View of the Douro Riverfront in Porto, Portugal (54803354871).jpg"),
  osaka: credit("663highland", "CC BY 2.5", "Osaka Castle 03bs3200.jpg"),
  cph: credit("OleNeitzel", "CC BY 4.0", "Nyhavn houses and boats.jpg"),
  marra: credit("Jorge Láscar", "CC BY 2.0", "Jemaa el-Fnaa (7346166250).jpg"),
  taipei: credit("Sinchen.Lin", "CC BY 2.0", "Taipei Skyline 2016.jpg"),
  bsas: credit("Deensel", "CC BY 2.0", "Puerto Madero, Buenos Aires (40689219792) (cropped).jpg"),
};

export function commonsUrl(file: string): string {
  return `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file.replace(/ /g, "_"))}`;
}
