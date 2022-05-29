import { totalSheets } from "../data/fakeDb";
import delayRandomly from "../utils/delayRandomly";

function getTotalSheets(): Promise<number> {
  return delayRandomly(totalSheets);
}

export default getTotalSheets;
