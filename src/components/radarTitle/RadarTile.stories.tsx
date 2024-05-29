import type { Meta, StoryObj } from "@storybook/react";
import { RadarTile } from "./RadarTile.tsx";

const meta: Meta = {
  title: "APP/RadarTile",
  component: RadarTile,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "none",
      description: "The class name of the component",
    },
    data: { control: "object", description: "The data for the radar chart" },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "500px", height: "500px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RadarTile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const mixed: Story = {
  args: {
    data: [
      { kind: "cardio", value: 200 },
      { kind: "energy", value: 20 },
      { kind: "endurance", value: 40 },
      { kind: "strength", value: 60 },
      { kind: "speed", value: 80 },
      { kind: "intensity", value: 100 },
    ],
  },
};

export const mixed_alt: Story = {
  args: {
    data: [
      { kind: "cardio", value: 100 },
      { kind: "energy", value: 80 },
      { kind: "endurance", value: 60 },
      { kind: "strength", value: 40 },
      { kind: "speed", value: 20 },
      { kind: "intensity", value: 10 },
    ],
  },
};

export const zero: Story = {
  args: {
    data: [
      { kind: "cardio", value: 0 },
      { kind: "energy", value: 0 },
      { kind: "endurance", value: 0 },
      { kind: "strength", value: 0 },
      { kind: "speed", value: 0 },
      { kind: "intensity", value: 0 },
    ],
  },
};

export const mid: Story = {
  args: {
    data: [
      { kind: "cardio", value: 50 },
      { kind: "energy", value: 50 },
      { kind: "endurance", value: 50 },
      { kind: "strength", value: 50 },
      { kind: "speed", value: 600 },
      { kind: "intensity", value: 50 },
    ],
  },
};

export const full: Story = {
  args: {
    data: [
      { kind: "cardio", value: 200 },
      { kind: "energy", value: 100 },
      { kind: "endurance", value: 100 },
      { kind: "strength", value: 100 },
      { kind: "speed", value: 100 },
      { kind: "intensity", value: 100 },
    ],
  },
};
