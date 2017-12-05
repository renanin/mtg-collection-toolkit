export default function price(price: number): number {
  return Math.round(price * 100) / 100;
}
