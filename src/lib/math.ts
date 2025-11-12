export function distance(x1: number, y1: number, x2: number, y2: number) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

// Example usages of remap:
// remap(5, 0, 10, 100, 200)     // => 150 (5 is halfway between 0 and 10, so result is halfway between 100 and 200)
// remap(0, 0, 10, 50, 60)       // => 50  (0 is at inMin, so returns outMin)
// remap(10, 0, 10, 50, 60)      // => 60  (10 is at inMax, so returns outMax)
// remap(-5, 0, 10, 100, 200)    // => 50  (without clamp, projects linearly beyond outMin)
// remap(-5, 0, 10, 100, 200, true) // => 100 (with clamp, returns outMin)
export function remap(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
  clamp: boolean = false
) {
  let t = (value - inMin) / (inMax - inMin);
  if (clamp) {
    t = Math.max(0, Math.min(1, t));
  }
  return t * (outMax - outMin) + outMin;
}

// Example usages of lerp:
// lerp(0, 10, 0)    // => 0   (start)
// lerp(0, 10, 0.5)  // => 5   (halfway)
// lerp(0, 10, 1)    // => 10  (end)
// lerp(5, 15, 0.25) // => 7.5 (a quarter of the way from 5 to 15)
export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}