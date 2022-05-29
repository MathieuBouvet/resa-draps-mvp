import { TimePeriod } from "../types/TimePeriod";
import { Reservation } from "../../data/fakeDb";

// borne les dates de la reservation antre *startDate* et *endDate*
function boundReservationDates({ startDate, endDate }: TimePeriod) {
  return (reservation: Reservation) => {
    return {
      ...reservation,
      startDate: Math.max(startDate, reservation.startDate),
      endDate: Math.min(endDate, reservation.endDate),
    };
  };
}

export default boundReservationDates;
