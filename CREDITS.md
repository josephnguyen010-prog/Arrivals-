# Photo credits

Every city photograph in `src/assets/cities/` comes from [Wikimedia Commons](https://commons.wikimedia.org),
cropped to 3:2 and re-encoded. No other changes were made.

**All 32 are CC0, public domain or attribution-only.** Share-alike images were deliberately
excluded: CC BY-SA obliges derivative works to carry the same licence, which is a problem once
photos sit inside a product.

The CC BY images require attribution to reach the person looking at the photo, so the credit is
rendered on each city's page in the app — see `src/components/PhotoCreditLine.tsx`. This file is
the full record; the app is what actually discharges the obligation.

| City | Author | Licence | File |
| --- | --- | --- | --- |
| Amsterdam | Jorge LÃ¡scar | CC BY 2.0 | `Swans in a canal, Oudezijds Voorburgwal, with Bridge 105 (5822070926).jpg` |
| Bangkok | Swaminathan | CC BY 2.0 | `Statetower.jpg` |
| Barcelona | M McBey | CC BY 2.0 | `Evening light over Barcelona.jpg` |
| Berlin | Bleppo | Public domain | `Berlin Skyline voll.jpg` |
| Buenos Aires | Deensel | CC BY 2.0 | `Puerto Madero, Buenos Aires (40689219792) (cropped).jpg` |
| Cairo | Jorge LÃ¡scar | CC BY 2.0 | `Cairo Opera House, Al Hurriyah Park and the Nile river (14797782354).jpg` |
| Cape Town | Danie van der Merwe | CC BY 2.0 | `Table Mountain DanieVDM.jpg` |
| Copenhagen | OleNeitzel | CC BY 4.0 | `Nyhavn houses and boats.jpg` |
| Delhi | Vyacheslav Argenberg | CC BY 4.0 | `Delhi, India, India Gate.jpg` |
| Hanoi | David McKelvey | CC BY 2.0 | `Street markets, Urban Discovery Tour, Hanoi (7060671921).jpg` |
| Ho Chi Minh City | dronepicr | CC BY 2.0 | `Ho Chi Minh city (39514086172).jpg` |
| Hong Kong | Diliff | CC BY 3.0 | `Hong Kong Skyline - Dec 2007.jpg` |
| Istanbul | Hunanuk | CC0 | `Historical peninsula and modern skyline of Istanbul.jpg` |
| Kyoto | Kovacs Bela | CC BY 3.0 | `Kiyomizu-dera Temple, Kyoto - panoramio.jpg` |
| Lisbon | Dale Cruse | CC BY 4.0 | `Alfama Rooftops and Tagus River View, Lisbon (54733828355).jpg` |
| London | Dronepicr | CC BY 3.0 | `Tower Bridge London (193364901).jpeg` |
| Marrakesh | Jorge LÃ¡scar | CC BY 2.0 | `Jemaa el-Fnaa (7346166250).jpg` |
| Mexico City | Gobierno CDMX | CC0 | `Sobrevuelos CDMX HJ2A4913 (25514321687) (cropped).jpg` |
| New York | Jakub HaÅ‚un | CC BY 4.0 | `Manhattan skyline from Upper New York Bay, 20231001 1041 0889.jpg` |
| Osaka | 663highland | CC BY 2.5 | `Osaka Castle 03bs3200.jpg` |
| Paris | Jebulon | CC0 | `Pont Alexandre III depuis pont de la Concorde Paris.jpg` |
| Porto | Dale Cruse | CC BY 4.0 | `Nighttime View of the Douro Riverfront in Porto, Portugal (54803354871).jpg` |
| Prague | Lucas Garron | CC0 | `Prague Castle at Night viewed from Charles Bridge.jpg` |
| Rio de Janeiro | Nan Palmero | CC BY 2.0 | `Rio de Janeiro at Night from Sugarloaf (16176006390).jpg` |
| Rome | Diliff | CC BY 3.0 | `Trevi Fountain, Rome, Italy 2 - May 2007.jpg` |
| San Francisco | Craig Howell | CC BY 2.0 | `Zeppelin-ride-020100925-195 (5029394846).jpg` |
| Seoul | USAGI_POST | CC0 | `Han River Seoul skyline Pixabay 1214950.jpg` |
| Singapore | cegoh (Jason Goh) | CC0 | `Skyline of the Central Business District of Singapore seen from across Marina Bay - 20140129.jpg` |
| Sydney | sv1ambo | CC BY 2.0 | `Sydney Opera House and Sydney Harbour Bridge (5106362112).jpg` |
| Taipei | Sinchen.Lin | CC BY 2.0 | `Taipei Skyline 2016.jpg` |
| Tokyo | Ville Miettinen | CC BY 2.0 | `Sunset in Shinjuku.jpg` |
| Toronto | Peter_Glyn | CC0 | `Toronto Skyline, Ontario Canada.jpg` |

Source page for any of these: `https://commons.wikimedia.org/wiki/File:<filename>`.

## Adding a city

Keep the rule: **CC0, public domain, or CC BY only.** No share-alike, no non-commercial, no
no-derivatives — the last two aren't free licences at all and NC would rule out ever charging for
this.

1. Find the image on Commons and check `License` in its file metadata.
2. Crop to 3:2, save at 540x360, JPEG quality 70. Everything here lands between 25 and 60 KB.
3. Add it to `src/assets/cities/`, to `CITIES` in `src/data/cities.ts`, and to `PHOTO_CREDITS`
   in `src/data/credits.ts`. The credit line on the city page picks it up automatically.

Two traps worth knowing, both hit while assembling this set. Keyword search on Commons happily
returns 18th-century engravings and century-old black-and-white photographs, because they are
public domain and match the words; sampling the image's colour saturation rejects them without
guessing from titles. And a city's Wikipedia lead image is often a better single photograph than
anything keyword search finds — but check its licence, because plenty are share-alike.

## The better answer, eventually

Let people attach their own photo to a visit. Your picture of a city means more than the canonical
one, and it removes the licensing question entirely for everything except the default a city shows
before anyone has been.