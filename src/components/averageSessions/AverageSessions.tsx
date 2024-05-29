import styles from "./AverageSessions.module.scss";
import {
  Customized,
  Line,
  LineChart,
  Rectangle,
  ResponsiveContainer,
  Text,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useState } from "react";

type Session = {
  day: string;
  time: number;
};

interface AverageSessionsProps {
  className?: string;
  data: Session[];
}

export function AverageSessions({
  className = "",
  data,
}: AverageSessionsProps) {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [perc, setPerc] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const onResize = (width: number, height: number) => {
    setWidth(width);
    setHeight(height);
  };

  const calculateValue = (source: number, pourcent: number) => {
    return (source / 100) * pourcent;
  };

  const onMouseMove = (hoveredData: any) => {
    if (hoveredData && hoveredData.activePayload) {
      setIsHovered(true);
      const hoveredX = hoveredData.activePayload[0].payload.day;
      const index = data.findIndex((d) => d.day === hoveredX);
      const percentage = ((data.length - index - 1) * 100) / (data.length - 1);

      setPerc(100 - percentage);
    }
  };

  const onMouseOut = () => {
    setIsHovered(false);
    setPerc(0);
  };

  const CustomizedTitle = () => {
    return (
      <Text
        // height={9}
        x={calculateValue(width, 10)}
        y={calculateValue(height, 15)}
        width={calculateValue(width, 50)}
        strokeWidth={2}
        fontWeight={500}
        opacity={isHovered ? 0.5 : 1}
        fill={"white"}
        verticalAnchor={"start"}
        textAnchor={"start"}
      >
        {"Durée moyenne des sessions"}
      </Text>
    );
  };

  function CustomLabel(props: any) {
    const { x, y, payload } = props;
    const radius = 10;

    const spaceBetweenMiddle = Number(x.toFixed(0)) - width / 2;
    const radiusX = Math.abs(spaceBetweenMiddle) / radius;
    const offset = Math.sign(spaceBetweenMiddle) === -1 ? radiusX : -radiusX;
    const xPosition = x + offset;

    return (
      <g cy={height} opacity={isHovered ? 0.5 : 1}>
        <text x={xPosition} y={y} textAnchor="middle" fill={"white"}>
          {payload.value}
        </text>
      </g>
    );
  }

  function CustomizedCursor(props: any) {
    const { pointerEvents, points, className } = props;
    const { x } = points[0];

    return (
      <Rectangle
        className={className}
        pointerEvents={pointerEvents}
        fill="black"
        opacity={0.2}
        x={x}
        y={0}
        width={width - x}
        height={height}
      />
    );
  }

  return (
    <div className={`${styles.Component} ${className}`}>
      <div className={styles.Component__content}>
        <ResponsiveContainer
          onResize={onResize}
          style={{
            // aspectRatio: "1:1",
          }}
        >
          <LineChart
            data={data}
            margin={{ right: 0, left: 0 }}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseOut}
          >
            <defs>
              <linearGradient id="colorUv" x1="0%" y1="0" x2="100%" y2="0">
                <stop offset="0%" stopColor="#FFFFFF30" />

                <stop offset={`${perc}%`} stopColor="#FFFFFFA0" />

                <stop offset={`${100}%`} stopColor="#FFFFFF" />
              </linearGradient>
            </defs>

            <Customized component={CustomizedTitle} />

            <Tooltip
              contentStyle={{ border: "none" }}
              labelStyle={{ display: "none" }}
              cursor={<CustomizedCursor />}
              formatter={(value) => {
                return [`${value} min`];
              }}
            />

            <Line
              dataKey="time"
              type="monotone"
              stroke="url(#colorUv)"
              strokeWidth={2}
              dot={false}
              activeDot={{
                fill: "#FFFFFF",
                strokeWidth: 10,
                stroke: "#FFFFFF33",
                r: 5,
              }}
            />

            <XAxis
              interval={0}
              tickMargin={20}
              padding={{ left: -1, right: -1 }}
              dataKey="day"
              mirror={true}
              axisLine={false}
              tickLine={false}
              tick={<CustomLabel />}
            />

            <YAxis
              padding={{ top: 80, bottom: 30 }}
              dataKey="time"
              hide={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default AverageSessions;
