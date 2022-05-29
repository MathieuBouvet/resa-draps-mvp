// retourne un tableau de nombres commençant à *start*, finissant à *end* (exclu) et espacé de *step*
function range(start: number, end: number, step: number = 1): number[] {
  let range: number[] = [];
  for (let i = start; i < end; i += step) {
    range.push(i);
  }
  return range;
}

export default range;
