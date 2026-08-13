import type { CityId } from "../types";

/**
 * The things worth knowing before you go, or worth remembering after. Kept to
 * what is firmly established and short enough to read in one pass — this is a
 * postcard back, not an encyclopedia entry.
 *
 * A real build would pull this from Wikidata alongside the city list itself.
 */
export interface CityFacts {
  /** One sentence. */
  history: string;
  /** Three things to eat, the ones the city is actually known for. */
  dishes: string[];
  landmarks: string[];
  /** One more thing worth knowing, and the only line here meant to surprise. */
  fact: string;
}

export const CITY_FACTS: Record<CityId, CityFacts> = {
  amsterdam: {
    history:
      "A fishing village that dammed the Amstel around 1270 and spent the 17th century as the richest port in the world.",
    dishes: ["Stroopwafel", "Bitterballen", "Raw herring"],
    landmarks: ["The canal ring", "Rijksmuseum", "Anne Frank House"],
    fact: "The houses are narrow because tax was charged on the width of the canal frontage.",
  },
  austin: {
    history:
      "Founded as Waterloo and renamed in 1839 when it was picked as the capital of the Republic of Texas.",
    dishes: ["Brisket", "Breakfast tacos", "Queso"],
    landmarks: [
      "Texas State Capitol",
      "Congress Avenue bats",
      "Barton Springs",
    ],
    fact: "The bats under Congress Avenue Bridge are the largest urban colony in North America — around 1.5 million of them.",
  },
  bangkok: {
    history:
      "Made the capital in 1782, when the Chakri dynasty moved the court across the river from Thonburi.",
    dishes: ["Pad thai", "Som tam", "Boat noodles"],
    landmarks: ["Grand Palace", "Wat Pho", "Wat Arun"],
    fact: "Its full ceremonial name runs to 168 letters and holds the record for the longest place name in the world.",
  },
  barcelona: {
    history:
      "Roman Barcino, then a Mediterranean sea power; the 1888 and 1929 expos and the 1992 Olympics each rebuilt it.",
    dishes: ["Pa amb tomàquet", "Fideuà", "Crema catalana"],
    landmarks: ["Sagrada Família", "Park Güell", "La Rambla"],
    fact: "The Sagrada Família has been under construction since 1882 and still isn't finished.",
  },
  berlin: {
    history:
      "Prussian capital, then German, then cut in two by a wall for 28 years until 1989.",
    dishes: ["Currywurst", "Döner kebab", "Berliner doughnut"],
    landmarks: ["Brandenburg Gate", "Reichstag", "East Side Gallery"],
    fact: "The city has more bridges than Venice — somewhere around 900 of them.",
  },
  boston: {
    history:
      "Founded by Puritans in 1630 and the staging ground for the American Revolution.",
    dishes: ["Clam chowder", "Lobster roll", "Boston cream pie"],
    landmarks: ["Fenway Park", "The Freedom Trail", "Boston Common"],
    fact: "The subway opened in 1897, the first in the United States.",
  },
  bsas: {
    history:
      "Founded twice — 1536 and again in 1580 — and rebuilt by the waves of immigrants who arrived by ship.",
    dishes: ["Asado", "Empanadas", "Dulce de leche"],
    landmarks: ["Teatro Colón", "Caminito, La Boca", "Recoleta Cemetery"],
    fact: "Its widest street, 9 de Julio, runs to sixteen lanes.",
  },
  cairo: {
    history:
      "Founded in 969 by the Fatimids beside older capitals; the pyramids at Giza predate it by three and a half thousand years.",
    dishes: ["Koshari", "Ful medames", "Molokhia"],
    landmarks: ["Pyramids of Giza", "Egyptian Museum", "Khan el-Khalili"],
    fact: "The Great Pyramid was the tallest building on earth for some 3,800 years.",
  },
  capetown: {
    history:
      "A Dutch East India Company supply station from 1652, and still where Parliament sits — one of the country's three capitals; Robben Island, in its bay, held Nelson Mandela for eighteen years.",
    dishes: ["Bobotie", "Gatsby", "Koeksisters"],
    landmarks: ["Table Mountain", "Robben Island", "Cape of Good Hope"],
    fact: "Table Mountain makes its own cloud — the 'tablecloth' pours over the edge and evaporates halfway down.",
  },
  cdmx: {
    history:
      "Built on the lake island of Tenochtitlan, razed by Cortés in 1521, and sinking into the drained lakebed ever since.",
    dishes: ["Tacos al pastor", "Tlacoyos", "Chiles en nogada"],
    landmarks: ["The Zócalo", "Frida Kahlo Museum", "Teotihuacan"],
    fact: "Built on a drained lake, the city has sunk about ten metres in the last century.",
  },
  chicago: {
    history:
      "Burned down in 1871, and answered by inventing the steel-framed skyscraper.",
    dishes: ["Deep-dish pizza", "Italian beef", "Chicago-style hot dog"],
    landmarks: ["Cloud Gate", "Willis Tower", "Art Institute"],
    fact: "The Chicago River was reversed in 1900 so it would flow away from the lake the city drinks from.",
  },
  cph: {
    history:
      "A herring market fortified by Bishop Absalon in 1167, and the seat of the Danish crown ever since.",
    dishes: ["Smørrebrød", "Frikadeller", "Wienerbrød"],
    landmarks: ["Nyhavn", "Tivoli Gardens", "The Little Mermaid"],
    fact: "Around half of all commutes are made by bicycle, and the bridges have their own rush hour.",
  },
  dc: {
    history:
      "The national capital, sited on the Potomac by compromise in 1790 and burned by British troops in 1814.",
    dishes: ["Half-smoke", "Mumbo sauce", "Ethiopian injera"],
    landmarks: ["The National Mall", "Lincoln Memorial", "The Smithsonian"],
    fact: "Nothing may rise much above the width of the street it faces, which is why the capital has no skyscrapers.",
  },
  delhi: {
    history:
      "Seven cities on one site: the Mughals built Shahjahanabad in the 17th century, the British built New Delhi in the 20th.",
    dishes: ["Chole bhature", "Butter chicken", "Parathe"],
    landmarks: ["Red Fort", "Humayun's Tomb", "Qutub Minar"],
    fact: "The iron pillar at the Qutub complex is about 1,600 years old and has barely rusted.",
  },
  denver: {
    history:
      "A gold-rush camp of 1858 that stayed on as the supply town for the Rockies.",
    dishes: ["Green chili", "Denver omelette", "Rocky Mountain oysters"],
    landmarks: [
      "Red Rocks Amphitheatre",
      "Union Station",
      "Colorado State Capitol",
    ],
    fact: "One step of the Capitol is exactly a mile above sea level, and it's marked.",
  },
  hanoi: {
    history:
      "Founded as Thăng Long in 1010, and capital of the reunified country since 1976.",
    dishes: ["Phở", "Bún chả", "Egg coffee"],
    landmarks: ["Hoàn Kiếm Lake", "Temple of Literature", "The Old Quarter"],
    fact: "A working railway runs down a residential street so narrow that people pull in their chairs as the train passes.",
  },
  hcmc: {
    history:
      "Khmer Prey Nokor, then Saigon under the Nguyễn lords and the French, renamed in 1976.",
    dishes: ["Bánh mì", "Cơm tấm", "Hủ tiếu"],
    landmarks: [
      "Notre-Dame Cathedral Basilica",
      "Bến Thành Market",
      "Independence Palace",
    ],
    fact: "The Củ Chi tunnels on its edge run for some 250 kilometres.",
  },
  hongkong: {
    history:
      "Ceded to Britain in 1842, returned in 1997, and vertical for most of the time between.",
    dishes: ["Dim sum", "Wonton noodles", "Egg tarts"],
    landmarks: ["Victoria Peak", "The Star Ferry", "Tian Tan Buddha"],
    fact: "Skyscrapers here are still built behind scaffolding made of bamboo.",
  },
  honolulu: {
    history:
      "Capital of the Kingdom of Hawai'i from 1845, annexed with the islands in 1898, and bombed at Pearl Harbor in 1941.",
    dishes: ["Poke", "Loco moco", "Spam musubi"],
    landmarks: ["Waikīkī Beach", "Diamond Head", "Pearl Harbor"],
    fact: "ʻIolani is the only royal palace on American soil, and it had electric light before the White House did.",
  },
  ist: {
    history:
      "Byzantium, then Constantinople: capital of the Roman and Ottoman empires for sixteen centuries, though Türkiye's capital is Ankara now.",
    dishes: ["Balık ekmek", "Simit", "Baklava"],
    landmarks: ["Hagia Sophia", "The Blue Mosque", "Grand Bazaar"],
    fact: "Commuters cross between Europe and Asia to get to work.",
  },
  kyoto: {
    history:
      "Japan's capital for over a thousand years until 1869, laid out as Heian-kyō on a grid copied from Chang'an and spared the bombing that flattened other cities.",
    dishes: ["Kaiseki", "Yudofu", "Matcha sweets"],
    landmarks: ["Fushimi Inari", "Kinkaku-ji", "Kiyomizu-dera"],
    fact: "It was on the 1945 shortlist of atomic targets and taken off it, which is why the temples are still standing.",
  },
  la: {
    history:
      "A Spanish pueblo of 1781; the film business arrived in the 1910s for the light and the cheap land.",
    dishes: ["Tacos", "Korean barbecue", "French dip"],
    landmarks: ["The Hollywood Sign", "Griffith Observatory", "Venice Beach"],
    fact: "The Hollywood sign originally read HOLLYWOODLAND and was an advert for a housing development.",
  },
  lisbon: {
    history:
      "Phoenician, Roman and Moorish in turn; the 1755 earthquake levelled it and the Baixa was rebuilt on a grid.",
    dishes: ["Pastel de nata", "Bacalhau à Brás", "Bifana"],
    landmarks: ["Belém Tower", "Jerónimos Monastery", "Tram 28"],
    fact: "Tram 28's wooden cars date from the 1930s: modern trams can't take the hills and the corners.",
  },
  london: {
    history:
      "Roman Londinium, burned in 1666, bombed in the Blitz, and rebuilt each time on the same river.",
    dishes: ["Fish and chips", "Sunday roast", "Chicken tikka masala"],
    landmarks: ["Tower of London", "The British Museum", "Westminster"],
    fact: "The Metropolitan line, opened in 1863, was the first underground railway anywhere.",
  },
  marra: {
    history:
      "Founded by the Almoravids in 1070 as the base for an empire that reached into Spain, and one of Morocco's four imperial cities.",
    dishes: ["Tagine", "Couscous", "Harira"],
    landmarks: ["Jemaa el-Fnaa", "Koutoubia Mosque", "Bahia Palace"],
    fact: "The whole city is painted one shade of ochre by law, which is how it became the Red City.",
  },
  miami: {
    history:
      "Incorporated in 1896 on Julia Tuttle's land deal with the railroad, and remade by Cuban exile after 1959.",
    dishes: ["Cuban sandwich", "Stone crab", "Pastelitos"],
    landmarks: ["The Art Deco District", "Little Havana", "Vizcaya"],
    fact: "It's the only major American city founded by a woman, Julia Tuttle.",
  },
  neworleans: {
    history:
      "French from 1718, Spanish, then American in 1803; jazz was invented here around 1900.",
    dishes: ["Gumbo", "Po'boy", "Beignets"],
    landmarks: [
      "The French Quarter",
      "St. Louis Cathedral",
      "The Garden District",
    ],
    fact: "The dead are buried above ground: the water table is too high to dig.",
  },
  nyc: {
    history:
      "Dutch New Amsterdam from 1624, English from 1664, and the port that took in most of the immigration.",
    dishes: ["A pizza slice", "Bagel with lox", "Pastrami on rye"],
    landmarks: ["Statue of Liberty", "Central Park", "Brooklyn Bridge"],
    fact: "More people live in the city than in any of forty of the fifty states.",
  },
  osaka: {
    history:
      "The country's rice and money market under the Tokugawa — run by merchants, not samurai, and still called the nation's kitchen.",
    dishes: ["Takoyaki", "Okonomiyaki", "Kushikatsu"],
    landmarks: ["Osaka Castle", "Dotonbori", "Shinsekai"],
    fact: "Instant noodles were invented here in 1958, and there's a museum about it.",
  },
  paris: {
    history:
      "A Gaulish island settlement the Romans called Lutetia; Haussmann cut the boulevards through it in the 1850s and 60s.",
    dishes: ["Steak frites", "Croissant", "Soupe à l'oignon"],
    landmarks: ["Eiffel Tower", "The Louvre", "Notre-Dame"],
    fact: "The Eiffel Tower grows about 15cm taller in summer as the iron expands.",
  },
  philly: {
    history:
      "Laid out by William Penn in 1682, and capital of the United States from 1790 to 1800.",
    dishes: ["Cheesesteak", "Roast pork sandwich", "Soft pretzel"],
    landmarks: [
      "Independence Hall",
      "The Liberty Bell",
      "The Art Museum steps",
    ],
    fact: "City Hall was the tallest habitable building in the world when it was finished in 1894.",
  },
  porto: {
    history:
      "Roman Portus Cale gave Portugal its name; the port wine trade built the quays.",
    dishes: ["Francesinha", "Tripas à moda do Porto", "Bifana"],
    landmarks: ["Dom Luís I Bridge", "Livraria Lello", "Ribeira"],
    fact: "The port wine isn't aged in Porto — the lodges are across the river in Vila Nova de Gaia.",
  },
  prague: {
    history:
      "Seat of the Holy Roman Emperor under Charles IV, and one of the few European capitals the war left standing.",
    dishes: ["Svíčková", "Goulash", "Trdelník"],
    landmarks: ["Charles Bridge", "Prague Castle", "The Astronomical Clock"],
    fact: "The astronomical clock has been running since 1410, the oldest one still working.",
  },
  rio: {
    history:
      "Portuguese from 1565 and Brazil's capital until Brasília took over in 1960; the court itself moved here in 1808, fleeing Napoleon.",
    dishes: ["Feijoada", "Pão de queijo", "Açaí"],
    landmarks: ["Christ the Redeemer", "Sugarloaf Mountain", "Copacabana"],
    fact: "Christ the Redeemer is hit by lightning several times a year, so a stock of the original stone is kept for repairs.",
  },
  rome: {
    history:
      "Founded by tradition in 753 BC; capital of an empire, then of the papacy, then of Italy from 1871.",
    dishes: ["Cacio e pepe", "Carbonara", "Supplì"],
    landmarks: ["The Colosseum", "The Pantheon", "Trevi Fountain"],
    fact: "Around a million and a half euros a year is fished out of the Trevi Fountain and given to charity.",
  },
  seattle: {
    history:
      "A timber port named for Chief Si'ahl, remade by Boeing, then by grunge, then by software.",
    dishes: ["Salmon", "Oysters", "Teriyaki"],
    landmarks: [
      "Pike Place Market",
      "The Space Needle",
      "The Puget Sound ferries",
    ],
    fact: "The first Starbucks opened at Pike Place in 1971 and is still there.",
  },
  seoul: {
    history:
      "Capital of the Joseon dynasty from 1394; flattened in the Korean War and rebuilt inside a generation.",
    dishes: ["Bibimbap", "Korean fried chicken", "Tteokbokki"],
    landmarks: [
      "Gyeongbokgung Palace",
      "Bukchon Hanok Village",
      "Namsan Tower",
    ],
    fact: "Its subway is one of the longest networks in the world, and every platform has screen doors.",
  },
  sf: {
    history:
      "A mission village of 1776 that went from a thousand people to twenty-five thousand in the year of the Gold Rush.",
    dishes: ["Sourdough", "Cioppino", "Mission burrito"],
    landmarks: ["Golden Gate Bridge", "Alcatraz", "The cable cars"],
    fact: "The Golden Gate Bridge is painted continuously — the crew finishes one end and starts again at the other.",
  },
  singapore: {
    history:
      "A British trading post from 1819, briefly part of Malaysia, and a city and a country at once since 1965.",
    dishes: ["Hainanese chicken rice", "Chilli crab", "Laksa"],
    landmarks: ["Gardens by the Bay", "Marina Bay Sands", "The hawker centres"],
    fact: "Chewing gum has been restricted since 1992; the therapeutic kind needs a prescription.",
  },
  sydney: {
    history:
      "Gadigal country long before the First Fleet landed in 1788 and made a penal colony of it.",
    dishes: ["Meat pie", "Barramundi", "Lamington"],
    landmarks: ["The Opera House", "Harbour Bridge", "Bondi Beach"],
    fact: "The Opera House roof carries more than a million tiles, in two shades of white.",
  },
  taipei: {
    history:
      "A Qing walled city, then the Japanese colonial capital, then the seat of the Republic of China from 1949.",
    dishes: ["Beef noodle soup", "Xiao long bao", "Bubble tea"],
    landmarks: [
      "Taipei 101",
      "Chiang Kai-shek Memorial",
      "Shilin Night Market",
    ],
    fact: "Taipei 101 hangs a 660-tonne steel ball near the top to damp the sway in a typhoon.",
  },
  tokyo: {
    history:
      "Edo, a fishing village the shoguns made the largest city on earth by 1700, renamed Tokyo in 1868.",
    dishes: ["Sushi", "Monjayaki", "Ramen"],
    landmarks: ["Senso-ji", "Shibuya Crossing", "Meiji Jingū"],
    fact: "Shibuya Crossing takes as many as 3,000 people at a time.",
  },
  toronto: {
    history:
      "York from 1793, burned by American troops in 1813, and renamed Toronto in 1834.",
    dishes: ["Peameal bacon sandwich", "Butter tart", "Roti"],
    landmarks: ["CN Tower", "St. Lawrence Market", "The Distillery District"],
    fact: "The CN Tower was the tallest free-standing structure in the world for 32 years.",
  },
  vegas: {
    history:
      "A railroad water stop that legalised gambling in 1931 and built the Strip on it.",
    dishes: ["Shrimp cocktail", "Buffet prime rib", "Chinatown pho"],
    landmarks: ["The Strip", "Fremont Street", "The Bellagio fountains"],
    fact: "The Luxor's beam is the brightest in the world, and pulls in its own swarm of moths and the bats that eat them.",
  },
};

export function factsFor(id: CityId): CityFacts | undefined {
  return CITY_FACTS[id];
}
