import styles from "./ScoreTile.module.scss";
import {
  PieChart,
  Pie,
  Cell,
  Customized,
  Dot,
  ResponsiveContainer,
  Text,
} from "recharts";
import { useEffect, useMemo, useState } from "react";

const INDICATOR_WIDTH = 11;
const BASE_PERCENTAGE = 100;

interface ScoreTileProps {
  /**
   * The class name of the component
   * @default ""
   */
  className?: string;

  /**
   * The value of the tile, in percentage, or use the basePercentage
   * @default 0
   * @minimum 0
   * @maximum 100
   */
  value: number;

  /**
   * The width of the indicator circle layer
   * the percentage of the graph radius
   * @default 13
   */
  indicatorWidth?: number;

  /**
   * The base percentage of the graph
   * @default 100
   */
  base?: number;
}

const calculatePercentage = (num: number, percent: number, base = 100) => {
  return (num / base) * percent;
};

const calculatePercentageOf = (num: number, target: number) => {
  return (target * 100) / num;
};

const graphMargin = {
  top: 10,
  right: 10,
  bottom: 10,
  left: 10,
};

export function ScoreTile({
  className = "",
  indicatorWidth = INDICATOR_WIDTH,
  base = BASE_PERCENTAGE,
  value,
}: ScoreTileProps) {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [graphRadius, setGraphRadius] = useState(0);
  const [circleLayerSize, setCircleLayerSize] = useState(0);

  const data = useMemo(() => {
    const indicator = value;
    const mask = base - value;
    return [{ value: indicator }, { value: mask }];
  }, [base, value]);

  const calculateGraphRadius = (width: number, height: number) => {
    return Math.min(width, height) / 2;
  };
  const calculateCircleLayerSize = (
    graphRadius: number,
    indicatorWidth: number,
  ) => {
    return calculatePercentage(graphRadius, BASE_PERCENTAGE - indicatorWidth);
  };

  useEffect(() => {
    console.log("useEffect", width, height, indicatorWidth);
    const graphRadius = calculateGraphRadius(width, height);
    const circleLayerSize = calculateCircleLayerSize(
      graphRadius,
      indicatorWidth,
    );

    setGraphRadius(graphRadius);
    setCircleLayerSize(circleLayerSize);
  }, [height, width, indicatorWidth]);

  const onResize = (width: number, height: number) => {
    console.log("onResize", width, height);
    setWidth(width - (graphMargin.left + graphMargin.right));
    setHeight(height - (graphMargin.top + graphMargin.bottom));
  };

  const Title = () => {
    return (
      <Text
        x={0}
        y={0}
        textAnchor="start"
        verticalAnchor="start"
        fill="black"
        fontSize={15}
        fontWeight="500"
      >
        Score
      </Text>
    );
  };

  const BackgroundCircleLayer = (props: any) => {
    const { width, height, top, left } = props.offset;

    const circleLayerSize = calculateCircleLayerSize(
      calculateGraphRadius(width, height),
      indicatorWidth,
    );

    const position = {
      x: calculatePercentage(width, 50) + left,
      y: calculatePercentage(height, 50) + top,
    };

    return (
      <Dot
        cx={position.x}
        cy={position.y}
        r={circleLayerSize}
        fill="white"
        stroke="none"
      />
    );
  };

  const ValueIndicator = (props: any) => {
    const { width, height } = props;

    const position = {
      x: calculatePercentage(width, 50),
      y: calculatePercentage(height, 45),
    };

    const content = [
      `${Math.round(calculatePercentageOf(base, value))}%`,
      "de votre objectif",
    ];

    return (
      <g>
        <Text
          x={position.x}
          y={position.y}
          textAnchor="middle"
          verticalAnchor="middle"
          fill="black"
          fontSize={26}
          fontWeight="bold"
        >
          {content[0]}
        </Text>
        <Text
          x={position.x}
          y={position.y}
          width={calculatePercentage(width, 50)}
          style={{ transform: "translateY(32px)" }}
          lineHeight={"2.3rem"}
          textAnchor="middle"
          verticalAnchor="middle"
          fill="#74798C"
          fontSize={16}
        >
          {content[1]}
        </Text>
      </g>
    );
  };

  return (
    <div className={`${styles.Component} ${className}`}>
      <div className={styles.Component__wrapper}>
        <ResponsiveContainer onResize={onResize}>
          <PieChart margin={graphMargin} data={data}>
            <Customized component={Title} />
            <Customized component={BackgroundCircleLayer} />
            <Customized component={ValueIndicator} />
            <Pie
              dataKey="value"
              data={data}
              cx={"50%"}
              cornerRadius={"50%"}
              startAngle={90}
              endAngle={360 + 90}
              stroke="none"
              outerRadius={graphRadius}
              innerRadius={circleLayerSize}
              paddingAngle={0}
            >
              <Cell fill="#FF0000" />
              <Cell fill="none" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ScoreTile;
