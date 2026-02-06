import { clamp } from '@rn-foundation/shared';

export const getUpdatedValue = ({
  values,
  value,
  index,
  step,
  stepsBetweenThumbs,
  min,
  max,
}: {
  values: number[];
  value: number;
  index: number;
  step: number;
  stepsBetweenThumbs: number;
  min: number;
  max: number;
}) => {
  const newValues = [...values];
  newValues[index] = value;

  for (let i = 0; i < newValues.length; i++) {
    const startOffset = min + i * stepsBetweenThumbs * step;
    const endOffset = max - (values.length - i - 1) * stepsBetweenThumbs * step;
    newValues[i] = clamp(newValues[i], startOffset, endOffset);
  }

  for (let i = index - 1; i >= 0; i--) {
    newValues[i] = Math.min(newValues[i], newValues[i + 1] - stepsBetweenThumbs * step);
  }

  for (let i = index + 1; i < newValues.length; i++) {
    newValues[i] = Math.max(newValues[i], newValues[i - 1] + stepsBetweenThumbs * step);
  }

  return newValues;
};

export const normalizeValue = (value: undefined | number | number[], min: number, max: number) => {
  if (value === undefined) return;
  if (Array.isArray(value)) return value.map((v) => clamp(v, min, max)).sort((a, b) => a - b);
  return [clamp(value, min, max)];
};

export const formatValueToProgress = (value: number, min: number, max: number) =>
  ((value - min) / (max - min)) * 100;

export const getSnappedValue = (value: number[], step: number) =>
  value.map((v) => {
    const f = Math.floor(v / step);
    if (v - f * step < step / 2) {
      return f * step;
    }
    return (f + 1) * step;
  });

export const findClosestValue = (values: number[], value: number) => {
  let closestValue = values[0];
  let closestDistance = Math.abs(value - closestValue);
  for (let i = 1; i < values.length; i++) {
    const distance = Math.abs(value - values[i]);
    if (distance < closestDistance) {
      closestValue = values[i];
      closestDistance = distance;
    }
  }
  return closestValue;
};
