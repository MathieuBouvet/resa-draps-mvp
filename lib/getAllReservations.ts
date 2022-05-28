import { reservations, Reservation } from "../data/fakeDb";
import delayRandomly from "../utils/delayRandomly";

function getAllReservations(): Promise<Reservation[]> {
  // pour simuler un appel à la db je delay les données, c'est juste pour l'example
  return delayRandomly(reservations);
}

export default getAllReservations;
