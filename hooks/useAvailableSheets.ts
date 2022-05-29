import { useEffect, useState } from "react";
import { TimePeriod } from "../utils/types/TimePeriod";

type AvailableSheetsState = {
  isFetching: boolean;
  error: string | null;
  availableSheets: number | null;
};

type NullableTimePeriod = { [key in keyof TimePeriod]: TimePeriod[key] | null };

function useAvailableSheets({ startDate, endDate }: NullableTimePeriod) {
  const [state, setState] = useState<AvailableSheetsState>({
    isFetching: false,
    error: null,
    availableSheets: null,
  });

  useEffect(() => {
    async function fetchAvailableSheets() {
      setState(state => ({
        ...state,
        isFetching: true,
        error: null,
      }));
      try {
        const res = await fetch(
          `http://localhost:3000/api/available-sheets?startDate=${startDate}&endDate=${endDate}`
        );
        if (!res.ok) {
          throw res;
        }
        const { availableSheets } = await res.json();
        setState(state => ({
          ...state,
          error: null,
          isFetching: false,
          availableSheets,
        }));
      } catch (err) {
        setState(state => ({
          ...state,
          isFetching: false,
          error: "Une erreur est survenue",
          availableSheets: null,
        }));
      }
    }
    if (startDate != null && endDate != null) {
      fetchAvailableSheets();
    }
  }, [startDate, endDate]);

  return state;
}

export default useAvailableSheets;
