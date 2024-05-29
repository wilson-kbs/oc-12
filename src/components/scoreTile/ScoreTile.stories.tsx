import type { Meta, StoryObj } from "@storybook/react";

import { ScoreTile } from "src/components/scoreTile/ScoreTile.tsx";

const meta: Meta = {
  title: "APP/ScoreTile",
  component: ScoreTile,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "none",
      description: "The class name of the component",
    },
    value: { control: "number", description: "The value of the tile" },
    indicatorWidth: {
      control: "number",
      description: "The width of the indicator circle layer",
    },
    base: {
      control: "number",
      description: "The base percentage of the graph",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "500px", height: "500px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ScoreTile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const inter: Story = {
  args: {
    value: 12,
  },
};

export const zero: Story = {
  args: {
    value: 0,
  },
};

export const mid: Story = {
  args: {
    value: 50,
  },
};

export const full: Story = {
  args: {
    value: 100,
  },
};
