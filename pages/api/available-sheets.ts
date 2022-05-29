import type { NextApiRequest, NextApiResponse } from "next";
import isString from "../../utils/isString";

import getTotalSheets from "../../lib/getTotalSheets";
import getUsedSheetsOfTimePeriod from "../../lib/getUsedSheetsOfTimePeriod";

type Data = {
  availableSheets: number;
};

type Error = {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  // la validation des parametres de la requete, ça pourrait etre mieux fait...
  if (!isString(req.query.startDate) || !isString(req.query.endDate)) {
    res.status(400).json({ error: "bad request" });
    return;
  }
  const startDate = parseInt(req.query.startDate);
  const endDate = parseInt(req.query.endDate);

  if (isNaN(startDate) || isNaN(endDate) || startDate > endDate) {
    res.status(400).json({ error: "bad request" });
    return;
  }

  const [totalSheets, usedSheets] = await Promise.all([
    getTotalSheets(),
    getUsedSheetsOfTimePeriod({ startDate, endDate }),
  ]);

  const availableSheets = totalSheets - usedSheets;

  res.status(200).json({ availableSheets });
}
