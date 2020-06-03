export class Drink {
  constructor(
    public readonly timestamp: number,
    public readonly volumeCl: number,
    public readonly alcoholPercent: number,
  ) {
  }

  public gramsOfAlcohol(): number {
    return gramsOfAlcohol(this.volumeCl, this.alcoholPercent);
  }

  public toString(): string {
    return `${this.volumeCl} cl/${this.alcoholPercent} %`
  }
}

export function gramsOfAlcohol(volumeCl: number, alcoholPercent: number) {
  return 7.9 * volumeCl * alcoholPercent / 100.0;
}

export function calculateAlcoholGrams(drinks: Drink[]) {
  if (drinks.length === 0) {
    return 0;
  }

  return drinks.map(d => d.gramsOfAlcohol()).reduce((a, b) => a + b);
}

export function calculateEbac(startTime: number, time: number, gender: string, weight: number, alcoholGrams: number) {
  const bw = gender === 'male' ? 0.55 : 0.49;
  const burnRate = gender === 'male' ? 0.017 : 0.019;
  const peak = 0.806 * alcoholGrams / bw / weight / 1000.0 * 100.0;
  const ebac = 10 * (peak - burnRate * hoursPassed(startTime, time));
  return Math.max(0, ebac);
}

export function hoursPassed(start: number, end: number): number {
  return (end - start) / 1000 / 60 / 60;
}

export function minutesToGreen(ebac: number, gender: string) {
  const burnRate = gender === 'male' ? 0.017 : 0.019;

  return Math.max(0, (ebac - 0.7) / 10 / burnRate * 60)
}