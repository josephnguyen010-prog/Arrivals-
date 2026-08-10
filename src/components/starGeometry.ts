/** A five-pointed star in a 20x20 box, as raw points. */
const POINTS: [number, number][] = [
  [10, 1.4],
  [12.7, 7.1],
  [19, 8],
  [14.5, 12.4],
  [15.6, 18.6],
  [10, 15.7],
  [4.4, 18.6],
  [5.5, 12.4],
  [1, 8],
  [7.3, 7.1],
];

export const BOX = 20;

/**
 * Path data with the horizontal offset baked in, deliberately not a transform.
 * A `transform` on the path establishes a new user space, and a
 * `userSpaceOnUse` gradient is then resolved against *that* — so each star
 * would get its own full-width gradient and fill entirely with the first
 * colour. Shifting the coordinates keeps all five in one space.
 */
export function starPath(offsetX: number): string {
  const [first, ...rest] = POINTS;
  const move = `M${first[0] + offsetX} ${first[1]}`;
  const lines = rest.map(([x, y]) => `L${x + offsetX} ${y}`).join("");
  return `${move}${lines}Z`;
}

/** Total width of a five-star row for a given gap between stars. */
export function rowWidth(gap: number): number {
  return BOX * 5 + gap * 4;
}

export function offsets(gap: number): number[] {
  return [0, 1, 2, 3, 4].map((index) => index * (BOX + gap));
}
