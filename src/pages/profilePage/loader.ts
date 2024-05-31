import { ApiService } from "src/services/api.service.ts";
import { NutrientType } from "src/components/nutrientDetail/NutrientDetail.type.ts";

import { json } from "react-router-dom";
import { IndexRouteObject } from "react-router/dist/lib/context";

const mapDayLabel: Record<number, string> = {
  1: "L",
  2: "M",
  3: "M",
  4: "J",
  5: "V",
  6: "S",
  7: "D",
};

export const loader: IndexRouteObject["loader"] = async () => {
  const userId = Number(import.meta.env.VITE_USER_ID); // TODO: get user id from session

  if (isNaN(userId)) return json({ error: "Invalid user id" }, { status: 400 });

  try {
    const activityData = await ApiService.getActivity(userId);
    const performanceData = await ApiService.getPerformance(userId);
    const sessionsData = await ApiService.getSessions(userId);
    const user = await ApiService.getUser(userId);

    const activity = activityData.map((item) => ({
      day: new Date(item.day),
      kilogram: item.kilogram,
      calories: item.calories,
    }));

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
    if (error instanceof Error)
      return json({ error: error.message }, { status: 500 });
    else return json({ error: "An error occurred" }, { status: 500 });
  }
};
