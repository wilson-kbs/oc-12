import { LoaderFunction } from "@remix-run/router/utils.ts";
import { ApiService } from "src/services/api.service.ts";
import { NutrientType } from "src/components/nutrientDetail/NutrientDetail.type.ts";

import { json } from "react-router-dom";

const mapDayLabel = {
  "1": "L",
  "2": "M",
  "3": "M",
  "4": "J",
  "5": "V",
  "6": "S",
  "7": "D",
};

export const loader: LoaderFunction = async () => {
  const userId = 12;
  try {
    const activity = await ApiService.getActivity(userId);
    const performanceData = await ApiService.getPerformance(userId);
    const sessionsData = await ApiService.getSessions(userId);
    const user = await ApiService.getUser(userId);

    const nutrients = Object.entries(user.keyData).map(([key, value]) => ({
      type: key.replace("Count", "").toLowerCase() as NutrientType,
      value: value as number,
    }));

    const performance = performanceData.data.map((item) => ({
      kind: performanceData.kind[item.kind],
      value: item.value,
    }));

    const sessions = sessionsData.map((item) => ({
      time: item.sessionLength,
      day: mapDayLabel[item.day],
    }));

    const score = user.todayScore * 100;

    const data = {
      activity,
      performance,
      sessions,
      userInfo: user.userInfos,
      nutrients,
      score,
    };

    return json(data, { status: 200 });
  } catch (error) {
    return json({ error: error.message }, { status: 500 });
  }
};
