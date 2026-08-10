# Photo credits

Every city photograph in `src/assets/cities/` comes from [Wikimedia Commons](https://commons.wikimedia.org),
cropped to 3:2 and re-encoded. No other changes were made.

**All twelve are CC0 or attribution-only.** Share-alike images were deliberately excluded: CC BY-SA
obliges derivative works to carry the same licence, which is a problem once photos sit inside a
product. Eight of the original photos were share-alike and have been replaced.

The CC BY images require attribution to reach the person looking at the photo, so the credit is
rendered on each city's page in the app — see `src/components/PhotoCreditLine.tsx`. This file is
the full record; the app is what actually discharges the obligation.

| City | Author | Licence | File |
| --- | --- | --- | --- |
| Ho Chi Minh City | dronepicr | CC BY 2.0 | `Ho Chi Minh city (39514086172).jpg` |
| Tokyo | Ville Miettinen | CC BY 2.0 | `Sunset in Shinjuku.jpg` |
| Lisbon | Dale Cruse | CC BY 4.0 | `Alfama Rooftops and Tagus River View, Lisbon (54733828355).jpg` |
| Mexico City | Gobierno CDMX | CC0 | `Sobrevuelos CDMX HJ2A4913 (25514321687) (cropped).jpg` |
| Istanbul | Hunanuk | CC0 | `Historical peninsula and modern skyline of Istanbul.jpg` |
| Seoul | USAGI_POST | CC0 | `Han River Seoul skyline Pixabay 1214950.jpg` |
| Porto | Dale Cruse | CC BY 4.0 | `Nighttime View of the Douro Riverfront in Porto, Portugal (54803354871).jpg` |
| Osaka | 663highland | CC BY 2.5 | `Osaka Castle 03bs3200.jpg` |
| Copenhagen | OleNeitzel | CC BY 4.0 | `Nyhavn houses and boats.jpg` |
| Marrakesh | Jorge Láscar | CC BY 2.0 | `Jemaa el-Fnaa (7346166250).jpg` |
| Taipei | Sinchen.Lin | CC BY 2.0 | `Taipei Skyline 2016.jpg` |
| Buenos Aires | Deensel | CC BY 2.0 | `Puerto Madero, Buenos Aires (40689219792) (cropped).jpg` |

Source page for any of these: `https://commons.wikimedia.org/wiki/File:<filename>`.

## Adding a city

Keep the rule: **CC0, public domain, or CC BY only.** No share-alike, no non-commercial, no
no-derivatives — the last two aren't free licences at all and NC would rule out ever charging for
this.

1. Find the image on Commons and check `License` in its file metadata.
2. Crop to 3:2, save at 540×360, JPEG quality 70. Everything here lands between 25 and 60 KB.
3. Add it to `src/assets/cities/`, to `CITIES` in `src/data/cities.ts`, and to `PHOTO_CREDITS`
   in `src/data/credits.ts`. The credit line on the city page picks it up automatically.

## The better answer, eventually

Let people attach their own photo to a visit. Your picture of a city means more than the canonical
one, and it removes the licensing question entirely for everything except the default a city shows
before anyone has been.
