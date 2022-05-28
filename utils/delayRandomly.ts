import getRandom from "./random";

function delayRandomly<T>(value: T): Promise<T> {
  return new Promise(resolve => {
    setTimeout(() => resolve(value), getRandom(500, 800));
  });
}

export default delayRandomly;
