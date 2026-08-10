import type { Spot } from "../types";

/**
 * Sample spots, so the section isn't empty on first run.
 *
 * The places are real and well known; the opinions are written for the
 * prototype and are not anybody's actual recommendations. Links use Google's
 * documented Maps search URL, which resolves for any query — no invented place
 * ids, and nothing that can rot into a dead link.
 */
function maps(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

let counter = 0;
function spot(
  city: string,
  category: Spot["category"],
  name: string,
  note: string,
  mapsQuery?: string,
): Spot {
  counter += 1;
  return {
    id: `seed${counter}`,
    city,
    category,
    name,
    note,
    url: mapsQuery ? maps(mapsQuery) : undefined,
  };
}

export const SEED_SPOTS: Spot[] = [
  // Ho Chi Minh City
  spot("hcmc", "Favourite restaurant", "Bánh Mì Huỳnh Hoa", "The queue moves fast. Ask for less pâté if you're new to it.", "Banh Mi Huynh Hoa Ho Chi Minh City"),
  spot("hcmc", "Hidden gem", "The Café Apartments, 42 Nguyễn Huệ", "A whole tower block of tiny cafés. Pay the lift fee, start at the top, walk down.", "42 Nguyen Hue Cafe Apartments Ho Chi Minh City"),
  spot("hcmc", "Must-see view", "Landmark 81 SkyView", "Go an hour before sunset and stay for the lights coming on.", "Landmark 81 SkyView Ho Chi Minh City"),
  spot("hcmc", "Skip it", "Bùi Viện walking street", "Loud, and priced for people who don't know better. One lap is plenty."),

  // Tokyo
  spot("tokyo", "Must-see view", "Tokyo Metropolitan Government Building", "The observation deck is free, and on a clear winter morning you get Fuji.", "Tokyo Metropolitan Government Building observation deck"),
  spot("tokyo", "Hidden gem", "Omoide Yokocho", "Six seats per bar, smoke in the rafters. Go early or you won't get in.", "Omoide Yokocho Shinjuku Tokyo"),
  spot("tokyo", "Favourite restaurant", "Tsukiji Outer Market", "The inner market moved; the outer one is still where you eat. Standing room, before ten.", "Tsukiji Outer Market Tokyo"),

  // Istanbul
  spot("ist", "Favourite restaurant", "Çiya Sofrası", "Anatolian home cooking on the Asian side. Point at what looks good.", "Ciya Sofrasi Kadikoy Istanbul"),
  spot("ist", "Hidden gem", "The Kadıköy–Eminönü ferry", "Twenty minutes, a glass of tea, and you're on another continent. Cheapest thing in the city.", "Kadikoy ferry terminal Istanbul"),
  spot("ist", "Must-see view", "Süleymaniye Mosque terrace", "The Golden Horn from above, and far quieter than the tower everyone queues for.", "Suleymaniye Mosque Istanbul"),

  // Lisbon
  spot("lisbon", "Must-see view", "Miradouro da Senhora do Monte", "The highest of the miradouros and the last to fill up. Bring something to drink.", "Miradouro da Senhora do Monte Lisbon"),
  spot("lisbon", "Hidden gem", "Feira da Ladra", "Tuesday and Saturday. Half junk, half genuinely good, all cheap before noon.", "Feira da Ladra Lisbon"),
  spot("lisbon", "Skip it", "Tram 28 at midday", "Same route, standing, full of pickpockets. Walk it, or go at seven in the morning."),

  // Paris
  spot("paris", "Must-see view", "Tour Montparnasse rooftop", "The only view of Paris with the Eiffel Tower actually in it. That's the whole argument.", "Tour Montparnasse observation deck Paris"),
  spot("paris", "Hidden gem", "Marché d'Aligre", "A covered market, an open one and a flea market on the same square. Mornings only.", "Marche d'Aligre Paris"),

  // Mexico City
  spot("cdmx", "Favourite restaurant", "Mercado de Medellín", "Colombian, Cuban and Mexican counters side by side. Eat standing at whichever has the queue.", "Mercado de Medellin Mexico City"),
  spot("cdmx", "Must-see view", "Torre Latinoamericana", "Cheaper than the newer tower and the view includes the newer tower.", "Torre Latinoamericana Mexico City"),

  // Kyoto
  spot("kyoto", "Hidden gem", "Fushimi Inari before seven", "The gates are empty at dawn and unbearable by ten. It is genuinely worth the alarm.", "Fushimi Inari Taisha Kyoto"),

  // New York
  spot("nyc", "Hidden gem", "Roosevelt Island Tramway", "A cable car over the East River for the price of a subway ride.", "Roosevelt Island Tramway New York"),

  // Bangkok
  spot("bangkok", "Favourite restaurant", "Or Tor Kor Market", "The produce market next to Chatuchak, with a food hall most visitors walk straight past.", "Or Tor Kor Market Bangkok"),

  // Copenhagen
  spot("cph", "Hidden gem", "Assistens Cemetery", "Locals sunbathe between the graves. Somehow it isn't strange.", "Assistens Cemetery Copenhagen"),
];
