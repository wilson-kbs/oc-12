import type { Meta, StoryObj } from "@storybook/react";

import { NutrientDetail } from "./NutrientDetail";

const meta: Meta = {
  title: "APP/NutrientDetail",
  component: NutrientDetail,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "none",
      description: "The class name of the component",
    },
    type: {
      options: ["calorie", "protein", "carbohydrate", "lipid"],
      control: { type: "select" },
      description: "The type of nutrient",
    },
    value: { control: "number", description: "The value of nutrient" },
  },
} satisfies Meta<typeof NutrientDetail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Calorie: Story = {
  args: {
    type: "calorie",
    value: 1930,
  },
};

export const Protein: Story = {
  args: {
    type: "protein",
    value: 155,
  },
};

export const Carbohydrate: Story = {
  args: {
    type: "carbohydrate",
    value: 290,
  },
};

export const Lipid: Story = {
  args: {
    type: "lipid",
    value: 50,
  },
};
