import { reservations, Reservation } from "../data/fakeDb";
import { TimePeriod } from "../utils/types/TimePeriod";
import delayRandomly from "../utils/delayRandomly";

// Renvoi les réservations qui sont incluses dans l'interval de temps donné (startDate, endDate)
function getReservationsOfTimePeriod({
  startDate,
  endDate,
}: TimePeriod): Promise<Reservation[]> {
  // on fait ça ici avec un filter sur les fakes reservations parcequ'il n'y a pas de vraie db,
  // sinon ça se ferait en utilisant l'orm pour faire la requete
  return delayRandomly(
    reservations.filter(reservation => {
      // une reservation est incluse dans l'intervalle
      //  si sa date de fin est incluses dans l'interval
      //  ou si sa date de début est incluses dans l'interval
      //  ou si la reservation commence avant et termine après l'interval
      return (
        (reservation.endDate >= startDate && reservation.endDate <= endDate) ||
        (reservation.startDate >= startDate && reservation.startDate <= endDate) ||
        (reservation.startDate <= startDate && reservation.endDate >= endDate)
      );
    })
  );
}

export default getReservationsOfTimePeriod;
