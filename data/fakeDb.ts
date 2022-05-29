type HumanReadableReservation = {
  id: number;
  startDate: string;
  endDate: string;
  numberOfSheet: number;
};

export type Reservation = {
  id: number;
  startDate: number;
  endDate: number;
  numberOfSheet: number;
};

// pour rentrer les fake données, c'est plus facile quand les date sont lisibles
const humanReadableReservations: HumanReadableReservation[] = [
  {
    id: 1,
    startDate: "2022-05-05",
    endDate: "2022-05-12",
    numberOfSheet: 5,
  },
  {
    id: 2,
    startDate: "2022-05-09",
    endDate: "2022-05-11",
    numberOfSheet: 3,
  },
  {
    id: 3,
    startDate: "2022-05-15",
    endDate: "2022-05-22",
    numberOfSheet: 8,
  },
  {
    id: 4,
    startDate: "2022-05-02",
    endDate: "2022-05-18",
    numberOfSheet: 1,
  },
];

// on convertit les dates en timestamp, c'est plus simple à gérer dans le code,
export const reservations: Reservation[] = humanReadableReservations.map(
  reservation => ({
    ...reservation,
    startDate: new Date(reservation.startDate).getTime(),
    endDate: new Date(reservation.endDate).getTime(),
  })
);

// stocker ça dans la db c'est mieux : si il faut le mettre à jour, pas besoin de changer le code + redéployer l'app
export const totalSheets = 15;
