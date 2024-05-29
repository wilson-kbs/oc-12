import type { Meta, StoryObj } from "@storybook/react";
import { AverageSessions } from "./AverageSessions.tsx";

const meta: Meta = {
  title: "APP/AverageSessions",
  component: AverageSessions,
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
      description: "The data for the average sessions",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "500px", height: "500px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AverageSessions>;

export default meta;

type Story = StoryObj<typeof meta>;

export const normal: Story = {
  args: {
    data: [
      { day: "L", time: 60 },
      { day: "M", time: 120 },
      { day: "M", time: 90 },
      { day: "J", time: 150 },
      { day: "V", time: 180 },
      { day: "S", time: 100 },
      { day: "D", time: 240 },
    ],
  },
};
export const mid: Story = {
  args: {
    data: [
      { day: "L", time: 30 },
      { day: "M", time: 60 },
      { day: "M", time: 45 },
      { day: "J", time: 75 },
      { day: "V", time: 90 },
      { day: "S", time: 105 },
      { day: "D", time: 120 },
    ],
  },
};

export const zero: Story = {
  args: {
    data: [
      { day: "L", time: 0 },
      { day: "M", time: 0 },
      { day: "M", time: 0 },
      { day: "J", time: 0 },
      { day: "V", time: 0 },
      { day: "S", time: 0 },
      { day: "D", time: 0 },
    ],
  },
};
