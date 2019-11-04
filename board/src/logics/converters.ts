export const smooth = (values: number[], weight: number) => {
  if (values.length === 0){return [];}
  const smoothed: number[] = [];
  values.reduce((x, y) => {
    const next = x * weight + (1 - weight) * y;
    smoothed.push(next);
    return next;
  });
  return smoothed;
};
