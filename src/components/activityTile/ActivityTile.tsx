import styles from "./ActivityTile.module.scss";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  Text,
  XAxis,
  YAxis,
  Customized,
} from "recharts";

type ActivitySession = {
  day: Date;
  kilogram: number;
  calories: number;
};

interface ActivityTileProps {
  className?: string;
  data: ActivitySession[];
}
export function ActivityTile({ className = "", data }: ActivityTileProps) {
  const xAxisPadding = 15;
  const barSize = 9;
  const cursorWidth = 70;
  const graphMargin = {
    top: 5,
    right: (cursorWidth - xAxisPadding) / 2,
    left: (cursorWidth - xAxisPadding) / 2,
    bottom: 5,
  };

  const CustomizedTitle = () => {
    return (
      <Text
        x={20}
        y={graphMargin.top + 15}
        fill="#20253A"
        strokeWidth={2}
        fontWeight={500}
        color={"black"}
        height={30}
      >
        Activité quotidienne
      </Text>
    );
  };

  const RenderLegend = (props: any) => {
    const { payload } = props;
    const style = {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      width: "100%",
      gap: "40px",
    };

    const itemStyle = {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    };

    const textStyle = {
      fontSize: "14px",
      color: "#74798C",
    };

    return (
      <div style={style}>
        {payload.map((entry: any, index: number) => (
          <div key={`legend-${index}`} style={itemStyle}>
            <div
              style={{
                backgroundColor: entry.color,
                height: "10px",
                width: "10px",
                borderRadius: "50%",
              }}
            />
            <span style={textStyle}>{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={`${styles.Component} ${className}`}>
      <div className={`${styles.Component__wrapper}`}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            margin={graphMargin}
            data={data.map((session, index) => ({
              ...session,
              index: index + 1,
            }))}
          >
            <Customized component={CustomizedTitle} />
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              horizontalCoordinatesGenerator={(props) => {
                const { offset } = props;

                return [
                  (offset.top ?? 0) + 1,
                  (offset.top ?? 0) + (offset.height ? offset.height / 2 : 0),
                ];
              }}
            />
            <Tooltip
              formatter={(value, key) => {
                const unit: Record<string, string> = {
                  kilogram: "kg",
                  calories: "kCal",
                };

                return [`${value}${unit[key]}`];
              }}
              contentStyle={{
                backgroundColor: "#E60000",
                border: "none",
              }}
              itemStyle={{
                color: "white",
                padding: "10px 4px",
                fontSize: "12px",
                textAlign: "center",
              }}
              labelStyle={{
                display: "none",
              }}
              cursor={{
                width: cursorWidth,
                fill: "#C4C4C480",
                style: {
                  height: "100%",
                  transform: `translateX(-${(cursorWidth / 2).toFixed(0)}px)`,
                },
              }}
            />
            <Legend
              verticalAlign="top"
              align="right"
              height={80}
              margin={{
                top: 0,
                left: 0,
                right: 0,
                bottom: 10,
              }}
              content={RenderLegend}
              payload={[
                {
                  dataKey: "kilogram",
                  color: "#282D30",
                  value: "Poids (kg)",
                },
                {
                  dataKey: "calories",
                  color: "#E60000",
                  value: "Calories brûlées (kCal)",
                },
              ]}
            />
            <Bar
              style={{
                transform: "translateX(-2px)",
              }}
              id="kilogram"
              dataKey="kilogram"
              fill={"black"}
              barSize={barSize}
              radius={[20, 20, 0, 0]}
            ></Bar>
            <Bar
              style={{
                transform: "translateX(2px)",
              }}
              id="calories"
              yAxisId="calories"
              dataKey="calories"
              alignmentBaseline="middle"
              fill="red"
              barSize={barSize}
              radius={[20, 20, 0, 0]}
            ></Bar>
            <XAxis
              tickMargin={20}
              tickLine={false}
              padding={{ left: xAxisPadding, right: xAxisPadding }}
              scale={"point"}
              domain={["dataMin - 2", "dataMax + 1"]}
              axisLine={{
                stroke: "#DEDEDE",
                strokeWidth: 1,
              }}
              tick={({ x, y, index }) => {
                return (
                  <g>
                    <text x={x} y={y} textAnchor="middle" fill="#666">
                      {index + 1}
                    </text>
                  </g>
                );
              }}
            />
            <YAxis
              dataKey="kilogram"
              orientation="right"
              axisLine={false}
              tickLine={false}
              tickCount={3}
              tickMargin={35}
              domain={["dataMin - 2", "dataMax + 1"]}
            />
            <YAxis
              yAxisId="calories"
              dataKey="calories"
              hide={true}
              domain={([dataMin, dataMax]) => {
                const range = dataMax - dataMin;
                const padding = range * 0.1;
                return [dataMin - padding, dataMax + padding];
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ActivityTile;
