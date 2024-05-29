import styles from "./RadarTile.module.scss";
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Text,
} from "recharts";

import { useMemo, useState } from "react";

type UserPerformance = {
  kind: string;
  value: number;
};

interface RadarTileProps {
  className?: string;
  data?: UserPerformance[];
}

export function RadarTile({ className = "", data }: RadarTileProps) {
  const count = 5;

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const backgroundPoints = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      return (height / 2 / count) * (i + 1);
    });
  }, [width, height, count]);

  const calcFontSize = useMemo(() => {
    return width / 20;
  }, [width]);

  const reversedData = useMemo(() => data?.toReversed(), [data]);

  const mapLabel = {
    cardio: "Cardio",
    energy: "Énergie",
    endurance: "Endurance",
    strength: "Force",
    speed: "Vitesse",
    intensity: "Intensité",
  };

  function renderPolarAngleAxis({ payload, x, y, cx, cy, ...rest }: any) {
    // console.log("payload", payload, x, y, cx, cy, rest);
    return (
      <Text
        {...rest}
        verticalAnchor="middle"
        y={y /* + (y - cy) / (calcFontSize * 5)*/}
        x={x /*+ (x - cx) / (calcFontSize * 5)*/}
      >
        {mapLabel[payload.value as keyof typeof mapLabel]}
      </Text>
    );
  }

  return (
    <div className={`${styles.Component} ${className}`}>
      <div className={styles.Component__container}>
        {/*<div className={styles.Component__background}>*/}
        {/*  <img src={radarBackgroundImage} alt="background radar" />*/}
        {/*</div>*/}
        <ResponsiveContainer
          className={styles.Component__Radar}
          aspect={0.75}
          onResize={(width, height) => {
            setWidth(width);
            setHeight(height);
          }}
        >
          <RadarChart outerRadius={width / 2} data={reversedData}>
            <PolarAngleAxis
              dataKey="kind"
              fontSize={calcFontSize}
              stroke={"white"}
              strokeWidth={0}
              tick={renderPolarAngleAxis}
            />
            <Radar
              name="Performance"
              dataKey="value"
              fill="#FF0101"
              fillOpacity={0.7}
            />
            <PolarGrid
              stroke="black"
              polarRadius={backgroundPoints}
              radialLines={false}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default RadarTile;
