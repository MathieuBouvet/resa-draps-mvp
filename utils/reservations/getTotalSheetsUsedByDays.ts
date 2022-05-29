import range from "../range";
import { ONE_DAY } from "../oneDay";
import { Reservation } from "../../data/fakeDb";

// Renvoi le nombre de draps utilisé par jour pour la liste de reservation en parametre
function getTotalSheetsUsedByDays(
  reservations: Reservation[]
): Record<number, number> {
  // On calcul les draps utilisés pour chaque jour des reservation
  // On stock ça dans un objet (clé, valeure) où la clé est le timestamp d'un jour,
  // et la valeure est la somme des draps utilisés pour ce jour

  // reduce nous permet de parcourir chaque reservations
  return reservations.reduce((acc, reservation) => {
    const reservationDays = range(
      reservation.startDate,
      reservation.endDate + ONE_DAY,
      ONE_DAY
    );
    // on parcourt chaque jour de la réservation pour ajouter son nombre de draps utilisé à notre objet accumulateur
    reservationDays.forEach(day => {
      if (acc[day] == null) {
        // on n'a pas encore vu ce jour, donc on l'initialise à zéro
        acc[day] = 0;
      }
      acc[day] += reservation.numberOfSheet;
    });

    return acc;
  }, {} as Record<number, number>);
}

export default getTotalSheetsUsedByDays;
