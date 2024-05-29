import { NutrientType } from "src/components/nutrientDetail/NutrientDetail.type.ts";
import { useLoaderData } from "react-router-dom";

import styles from "./ProfilePage.module.scss";

import SideNav from "src/components/layouts/sideNav/SideNav.tsx";
import NutrientDetail from "src/components/nutrientDetail/NutrientDetail.tsx";
import AverageSessions from "src/components/averageSessions/AverageSessions.tsx";
import RadarTile from "src/components/radarTitle/RadarTile.tsx";
import ActivityTile from "src/components/activityTile/ActivityTile.tsx";
import ScoreTile from "src/components/scoreTile/ScoreTile.tsx";
import { User } from "src/types";

function ProfilePage() {
  const data = useLoaderData() as {
    error: unknown;
    userInfo: User["userInfos"];
    activity: Array<{ day: Date; kilogram: number; calories: number }>;
    sessions: Array<{ day: string; time: number }>;
    performance: Array<{
      kind: string;
      value: number;
    }>;
    score: number;
    nutrients: Array<{ type: NutrientType; value: number }>;
  };

  if (data.error) {
    if (typeof data.error === "string") {
      return <div>{data.error}</div>;
    } else if (data.error instanceof Error) {
      return <div>{data.error.message}</div>;
    } else {
      return <div>An error occurred</div>;
    }
  }

  return (
    <div className={styles.PageWrapper}>
      <SideNav className={styles.SideNav} />
      <div className={styles.PageContent}>
        <div className={styles.Header}>
          <h1 className={styles.Header_title}>
            Bonjour{" "}
            <span className={styles.username}>{data.userInfo.firstName}</span>
          </h1>
          <p className={styles.Header_description}>
            Félicitation ! Vous avez explosé vos objectifs hier 👏
          </p>
        </div>
        <div className={styles.Dashboard}>
          <div className={styles.LeftColumn}>
            <ActivityTile
              className={styles.Dashboard_Activity}
              data={data.activity}
            />
            <div className={styles.Dashboard_Cards}>
              <AverageSessions data={data.sessions} />
              <RadarTile data={data.performance} />
              <ScoreTile value={data.score} />
            </div>
          </div>
          <div className={styles.RightColumn}>
            {data.nutrients.map(
              (nutrient: { type: NutrientType; value: number }) => (
                <NutrientDetail
                  className={styles.NutrientDetail}
                  key={nutrient.type}
                  type={nutrient.type}
                  value={nutrient.value}
                />
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export { loader } from "./loader.ts";

export default ProfilePage;
