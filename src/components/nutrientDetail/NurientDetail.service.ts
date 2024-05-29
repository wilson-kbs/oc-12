import fireImage from "public/assets/icons/fire.svg";
import appleImage from "public/assets/icons/apple.svg";
import chickenImage from "public/assets/icons/chicken.svg";
import cheeseburgerImage from "public/assets/icons/cheeseburger.svg";

import type { NutrientType } from "./NutrientDetail.type.ts";

type Nutrient = {
  bgColor: string;
  icon: string;
  name: string;
  metric: string;
};

const nutrients: Record<NutrientType, Nutrient> = {
  calorie: {
    bgColor: "rgba(255, 0, 0, 0.1)",
    icon: fireImage,
    name: "Calories",
    metric: "kcal",
  },
  protein: {
    bgColor: "rgba(74, 184, 255, 0.1)",
    icon: chickenImage,
    name: "Protéines",
    metric: "g",
  },
  carbohydrate: {
    bgColor: "rgba(249, 206, 35, 0.1)",
    icon: appleImage,
    name: "Glucides",
    metric: "g",
  },
  lipid: {
    bgColor: "rgba(253, 81, 129, 0.1)",
    icon: cheeseburgerImage,
    name: "Lipides",
    metric: "g",
  },
};

const numberFormatter = new Intl.NumberFormat("en-US");

export const NutrientDetailService = {
  getNutrientIcon: (name: NutrientType) => nutrients[name].icon,
  getNutrientName: (name: NutrientType) => nutrients[name].name,
  getNutrientMetric: (name: NutrientType) => nutrients[name].metric,
  getNutrientBgColor: (name: NutrientType) => nutrients[name].bgColor,
  formatValue: (value: number, type: NutrientType) =>
    `${numberFormatter.format(value)}${NutrientDetailService.getNutrientMetric(type)}`,
};

// export const NutrientDetailService = {
//   getNutrientIcon: (name: NutrientType) => nutrients[name].icon,
//   getNutrientName: (name: NutrientType) => nutrients[name].name,
//   getNutrientMetric: (name: NutrientType) => nutrients[name].metric,
//   getNutrientBgColor: (name: NutrientType) => nutrients[name].bgColor,
//   formatValue: (value: number, type: NutrientType) =>
//     `${value}${NutrientDetailService.getNutrientMetric(type)}`,
// };
