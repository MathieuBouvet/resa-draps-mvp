import boundReservationDates from "../utils/reservations/boundReservationDates";
import getTotalSheetsUsedByDays from "../utils/reservations/getTotalSheetsUsedByDays";
import getReservationOfTimePeriod from "./getReservationsOfTimePeriod";
import { TimePeriod } from "../utils/types/TimePeriod";

// Renvoi le nombre de draps utilisé par les reservation pour l'interval donné
async function getUsedSheetsOfTimePeriod(
  timePeriod: TimePeriod
): Promise<number> {
  const reservations = await getReservationOfTimePeriod(timePeriod);

  // une reservation peut commencer ou finnir hors de notre interval, donc on les borne à cet interval
  // C'est optionnel (le code bug pas sans ça) mais ça évite des calculs inutiles pour la suite
  const boundedReservations = reservations.map(
    boundReservationDates(timePeriod)
  );

  // On fait calculer le nombre de draps utilisés pour chaque jour
  const totalSheetsUsedByDays = getTotalSheetsUsedByDays(boundedReservations);

  // le nombre de draps utilisé pour l'interval, c'est le maximum parmi les jours de l'interval
  return Object.values(totalSheetsUsedByDays).reduce(
    (max, sheetsUsedForADay) => Math.max(max, sheetsUsedForADay),
    0
  );
}

export default getUsedSheetsOfTimePeriod;
