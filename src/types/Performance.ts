export type Performance = {
  kind: {
    [key: number]: string;
  };
  data: Array<{
    kind: number;
    value: number;
  }>;
};
