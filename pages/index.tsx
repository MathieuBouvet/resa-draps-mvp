import type { InferGetStaticPropsType } from "next";
import { useState } from "react";

import getAllReservations from "../lib/getAllReservations";
import useAvailableSheets from "../hooks/useAvailableSheets";

import range from "../utils/range";

import Head from "next/head";

import styles from "../styles/home.module.css";

const Home = ({
  reservations,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const startDateDay = startDate != null ? new Date(startDate).getDate() : null;
  const endDateDay = endDate != null ? new Date(endDate).getDate() : null;

  const startTimestamp =
    startDate != null ? new Date(startDate).getTime() : null;
  const endTimestamp = endDate != null ? new Date(endDate).getTime() : null;

  const { availableSheets, error, isFetching } = useAvailableSheets({
    startDate: startTimestamp,
    endDate: endTimestamp,
  });

  return (
    <div className={styles.app}>
      <Head>
        <title>Résa draps mvp</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Reservations draps</h1>
        <div className={styles.calendar}>
          {range(1, 32).map(i => {
            return <div key={`day-${i}`}>{i}</div>;
          })}
          {reservations.map(
            ({ id, startDate, endDate, numberOfSheet }, index) => {
              const startDay = new Date(startDate).getDate();
              const endDay = new Date(endDate).getDate();
              return (
                <div
                  key={id}
                  className={styles.reservation}
                  style={{
                    gridColumn: `${startDay}/${endDay}`,
                    gridRow: `${index + 2}`,
                  }}
                >
                  {numberOfSheet}
                </div>
              );
            }
          )}
          {startDateDay != null && endDateDay != null && (
            <div
              className={`${styles.reservation} ${styles.current}`}
              style={{
                gridColumn: `${startDateDay}/${endDateDay}`,
                gridRow: `${reservations.length + 2}`,
              }}
            >
              Réservation en cours
            </div>
          )}
        </div>
        <section className={styles.makeReservation}>
          <div>
            <h2>Réserver</h2>
            <label className={styles.inputGroup}>
              Début réservation{" "}
              <input
                type="date"
                value={startDate ?? ""}
                onChange={e => setStartDate(e.target.value)}
                min="2022-05-01"
                max="2022-05-31"
              />
            </label>
            <label className={styles.inputGroup}>
              Fin réservation{" "}
              <input
                type="date"
                value={endDate ?? ""}
                onChange={e => setEndDate(e.target.value)}
                min="2022-05-01"
                max="2022-05-31"
              />
            </label>
          </div>
          <div className={styles.availableSheetsContainer}>
            {error == null ? (
              <>
                Draps disponibles
                <div className={styles.availableSheets}>
                  {isFetching ? (
                    <div className="spinner"></div>
                  ) : (
                    availableSheets
                  )}
                </div>
              </>
            ) : (
              <div>{error}</div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

const getStaticProps = async () => {
  return {
    props: {
      reservations: await getAllReservations(),
    },
  };
};

export { getStaticProps };

export default Home;
