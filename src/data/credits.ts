import type { CityId } from "../types";

export interface PhotoCredit {
  author: string;
  licence: string;
  /** Absent for public domain, which needs no licence deed. */
  licenceUrl?: string;
  /** Commons filename, before cropping. */
  file: string;
}

const LICENCE_URLS: Record<string, string> = {
  "CC BY 2.0": "https://creativecommons.org/licenses/by/2.0/",
  "CC BY 2.5": "https://creativecommons.org/licenses/by/2.5/",
  "CC BY 3.0": "https://creativecommons.org/licenses/by/3.0/",
  "CC BY 4.0": "https://creativecommons.org/licenses/by/4.0/",
  CC0: "https://creativecommons.org/publicdomain/zero/1.0/",
};

function credit(author: string, licence: string, file: string): PhotoCredit {
  return { author, licence, licenceUrl: LICENCE_URLS[licence], file };
}

/**
 * Every photo is CC0, public domain or attribution-only. Share-alike is
 * deliberately excluded: it obliges derivative works to carry the same licence,
 * which is a problem once photos sit inside a product. See CREDITS.md.
 *
 * CC BY requires the credit to reach the person looking at the photo, which is
 * why this is rendered on the city page rather than left in a file.
 */
export const PHOTO_CREDITS: Record<CityId, PhotoCredit> = {
  amsterdam: credit("Jorge Láscar", "CC BY 2.0", "Swans in a canal, Oudezijds Voorburgwal, with Bridge 105 (5822070926).jpg"),
  austin: credit("rutlo", "CC BY 2.0", "Austin Skyline From Mopac.JPG"),
  boston: credit("Nelson48", "Public domain", "Boston Financial District skyline.jpg"),
  chicago: credit("Eric Pancer", "CC BY 2.0", "St. Charles Air Line Bridge and ex-B&O bridge with Chicago skyline.jpg"),
  dc: credit("Carol M. Highsmith", "Public domain", "July 4th fireworks, Washington, D.C. (LOC).jpg"),
  denver: credit("Quintin Soloviev", "CC BY 4.0", "Denver, Colorado skyline (cropped).jpg"),
  honolulu: credit("Cumulus Clouds", "CC BY 2.5", "Waikiki Beach from Diamond Head.jpg"),
  la: credit("Serouj", "Public domain", "Downtown Los Angeles California.jpg"),
  miami: credit("Averette", "CC BY 3.0", "Biscayne Bay south.jpg"),
  neworleans: credit("George Bannister", "CC BY 2.0", "New Orleans from the Air September 2019 - Central Business District Skyline (cropped).jpg"),
  philly: credit("Goldcup", "CC0", "Columbia Bridge Turn 2014.jpg"),
  seattle: credit("Seattle Municipal Archives", "CC BY 2.0", "Space Needle and skyline from Kerry Park, 2000.jpg"),
  vegas: credit("Notdjey", "CC BY 2.0", "Las Vegas by night 2019 - 46671323131.jpg"),
  bangkok: credit("Swaminathan", "CC BY 2.0", "Statetower.jpg"),
  barcelona: credit("M McBey", "CC BY 2.0", "Evening light over Barcelona.jpg"),
  berlin: credit("Bleppo", "Public domain", "Berlin Skyline voll.jpg"),
  bsas: credit("Deensel", "CC BY 2.0", "Puerto Madero, Buenos Aires (40689219792) (cropped).jpg"),
  cairo: credit("Jorge Láscar", "CC BY 2.0", "Cairo Opera House, Al Hurriyah Park and the Nile river (14797782354).jpg"),
  capetown: credit("Danie van der Merwe", "CC BY 2.0", "Table Mountain DanieVDM.jpg"),
  cdmx: credit("Gobierno CDMX", "CC0", "Sobrevuelos CDMX HJ2A4913 (25514321687) (cropped).jpg"),
  cph: credit("OleNeitzel", "CC BY 4.0", "Nyhavn houses and boats.jpg"),
  delhi: credit("Vyacheslav Argenberg", "CC BY 4.0", "Delhi, India, India Gate.jpg"),
  hanoi: credit("David McKelvey", "CC BY 2.0", "Street markets, Urban Discovery Tour, Hanoi (7060671921).jpg"),
  hcmc: credit("dronepicr", "CC BY 2.0", "Ho Chi Minh city (39514086172).jpg"),
  hongkong: credit("Diliff", "CC BY 3.0", "Hong Kong Skyline - Dec 2007.jpg"),
  ist: credit("Hunanuk", "CC0", "Historical peninsula and modern skyline of Istanbul.jpg"),
  kyoto: credit("Kovacs Bela", "CC BY 3.0", "Kiyomizu-dera Temple, Kyoto - panoramio.jpg"),
  lisbon: credit("Dale Cruse", "CC BY 4.0", "Alfama Rooftops and Tagus River View, Lisbon (54733828355).jpg"),
  london: credit("Dronepicr", "CC BY 3.0", "Tower Bridge London (193364901).jpeg"),
  marra: credit("Jorge Láscar", "CC BY 2.0", "Jemaa el-Fnaa (7346166250).jpg"),
  nyc: credit("Jakub Hałun", "CC BY 4.0", "Manhattan skyline from Upper New York Bay, 20231001 1041 0889.jpg"),
  osaka: credit("663highland", "CC BY 2.5", "Osaka Castle 03bs3200.jpg"),
  paris: credit("Jebulon", "CC0", "Pont Alexandre III depuis pont de la Concorde Paris.jpg"),
  porto: credit("Dale Cruse", "CC BY 4.0", "Nighttime View of the Douro Riverfront in Porto, Portugal (54803354871).jpg"),
  prague: credit("Lucas Garron", "CC0", "Prague Castle at Night viewed from Charles Bridge.jpg"),
  rio: credit("Nan Palmero", "CC BY 2.0", "Rio de Janeiro at Night from Sugarloaf (16176006390).jpg"),
  rome: credit("Diliff", "CC BY 3.0", "Trevi Fountain, Rome, Italy 2 - May 2007.jpg"),
  seoul: credit("USAGI_POST", "CC0", "Han River Seoul skyline Pixabay 1214950.jpg"),
  sf: credit("Craig Howell", "CC BY 2.0", "Zeppelin-ride-020100925-195 (5029394846).jpg"),
  singapore: credit("cegoh (Jason Goh)", "CC0", "Skyline of the Central Business District of Singapore seen from across Marina Bay - 20140129.jpg"),
  sydney: credit("sv1ambo", "CC BY 2.0", "Sydney Opera House and Sydney Harbour Bridge (5106362112).jpg"),
  taipei: credit("Sinchen.Lin", "CC BY 2.0", "Taipei Skyline 2016.jpg"),
  tokyo: credit("Ville Miettinen", "CC BY 2.0", "Sunset in Shinjuku.jpg"),
  toronto: credit("Peter_Glyn", "CC0", "Toronto Skyline, Ontario Canada.jpg"),
};

export function commonsUrl(file: string): string {
  return `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file.replace(/ /g, "_"))}`;
}
