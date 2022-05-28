function range(start: number, end: number, step: number = 1): number[] {
  let range: number[] = [];
  for (let i = start; i < end; i += step) {
    range.push(i);
  }
  return range;
}

export default range;
