import getRandom from "./random";

function delayRandomly<T>(value: T): Promise<T> {
  return new Promise(resolve => {
    setTimeout(() => resolve(value), getRandom(1, 50));
  });
}

export default delayRandomly;
