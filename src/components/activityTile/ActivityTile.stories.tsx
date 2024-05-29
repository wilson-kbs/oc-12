import type { Meta, StoryObj } from "@storybook/react";
import { ActivityTile } from "./ActivityTile.tsx";

const meta: Meta = {
  title: "APP/ActivityTile",
  component: ActivityTile,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "none",
      description: "The class name of the component",
    },
    data: {
      control: "object",
      description: "The data for the activity tile",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "800px", height: "500px" }}>
        <Story style={{ width: "800px", height: "500px" }} />
      </div>
    ),
  ],
} satisfies Meta<typeof ActivityTile>;

export default meta;

type Story = StoryObj<typeof meta>;

export const normal: Story = {
  args: {
    data: [
      {
        day: new Date("2020-07-01"),
        kilogram: 80,
        calories: 240,
      },
      {
        day: new Date("2020-07-02"),
        kilogram: 80,
        calories: 220,
      },
      {
        day: new Date("2020-07-03"),
        kilogram: 81,
        calories: 280,
      },
      {
        day: new Date("2020-07-04"),
        kilogram: 81,
        calories: 290,
      },
      {
        day: new Date("2020-07-05"),
        kilogram: 80,
        calories: 160,
      },
      {
        day: new Date("2020-07-06"),
        kilogram: 78,
        calories: 162,
      },
      {
        day: new Date("2020-07-07"),
        kilogram: 76,
        calories: 390,
      },
    ],
  },
};

export const mid: Story = {
  args: {
    data: [
      {
        day: new Date("2020-07-01"),
        kilogram: 80,
        calories: 240,
      },
      {
        day: new Date("2020-07-02"),
        kilogram: 80,
        calories: 220,
      },
      {
        day: new Date("2020-07-03"),
        kilogram: 81,
        calories: 280,
      },
      {
        day: new Date("2020-07-04"),
        kilogram: 81,
        calories: 290,
      },
      {
        day: new Date("2020-07-05"),
        kilogram: 80,
        calories: 160,
      },
      {
        day: new Date("2020-07-06"),
        kilogram: 78,
        calories: 162,
      },
      {
        day: new Date("2020-07-07"),
        kilogram: 76,
        calories: 390,
      },
    ],
  },
};
